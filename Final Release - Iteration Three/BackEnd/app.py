from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO  # Import SocketIO
from db import db  # Import db from db.py
from routes import routes_bp  # Import routes blueprint
from config import DevelopmentConfig, TestingConfig
from ultralytics import YOLO
from collections import deque
import base64
import cv2
import numpy as np
import time
from models import Detection, db
from datetime import datetime
from flask_mail import Mail, Message

# Define the file to store the counter
counter_file = 'counter.txt'

# Initialize the counter from the file
def get_counter():
    try:
        with open(counter_file, 'r') as f:
            return int(f.read())
    except (FileNotFoundError, ValueError):
        return 0  # Return 0 if file not found or invalid data

def save_counter(counter):
    with open(counter_file, 'w') as f:
        f.write(str(counter))
        
# Initialize global frame history to store results across frames
frame_history = deque(maxlen=10)
frame_history_confidence = deque(maxlen=10)

# Initialize a global variable to track the last incident addition time
last_incident_time = 0
current_time = 0

def create_app(config_class=DevelopmentConfig):
    # Initialize Flask app
    app = Flask(__name__)
    CORS(app)

		# Load the YOLOv11 model
    model = YOLO("bestV18.pt")

		# Define specific colors for each class
    class_colors = {
				"person": (255, 0, 0),  # Blue
				"helmet": (0, 255, 0),  # Green
				"noHelmet": (0, 0, 255),  # Red
				"vest": (0, 255, 255)  # Yellow
		}
    
    # Apply configuration
    app.config.from_object(config_class)
    
    db.init_app(app)
    
		# Mail configuration
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587  # TLS
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = 'sitesafeai123@gmail.com'
    app.config['MAIL_PASSWORD'] = 'bxjs boic ebya lceu'
    
    mail = Mail(app)

    def send_email(camera_id, user_id, detection_type, detection_confidence, recipients_email):
      from datetime import datetime
  
      # Get current timestamp for the email body
      detection_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
      
      # Create the email message
      msg = Message(
          subject=f"{detection_type} Detected on Construction Site",
          sender='sitesafeai123@gmail.com',
          recipients=[recipients_email],  # Use the passed-in recipients list
          body=f"""
          A {detection_type} detection has occurred on the construction site.
  
          Detection Details:
          - Camera ID: {camera_id}
          - User ID: {user_id}
          - Detection Type: {detection_type}
          - Detection Confidence: {detection_confidence}
          - Detection Time: {detection_time}
  
          Please review the situation as soon as possible.
          """
      )
      
      # Send the email
      try:
          mail.send(msg)
          return "Email sent successfully!"
      except Exception as e:
          return f"Error: {str(e)}", 500

    
    socketio = SocketIO(app, cors_allowed_origins="*")
    
    # Register blueprint for routes
    app.register_blueprint(routes_bp)
    
    @socketio.on('send_frame')
    def handle_send_frame(data):
        global last_incident_time
        global current_time
        try:

            if isinstance(data, dict) and 'image' in data:
                image_data = data['image'].split(',')[1]  # Remove base64 prefix
                image_data = base64.b64decode(image_data)

                user_id = data['userId']
                camera_id = data['cameraId']
                email = data['email']
                autoEmail = data['autoEmail']
                sensitivity = data['sensitivity']

                # Convert byte data to image
                nparr = np.frombuffer(image_data, np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

                results = model(img)  # Run YOLO on the image
                detections = results[0].boxes.data  # Get bounding box data

                # Initialize a flag to track if "NoHelmet" is detected
                no_helmet_detected = False
                confidence = 0

                # Loop through each detection and check if "NoHelmet" is detected
                for detection in detections:
                    x1, y1, x2, y2, confidence, class_id = detection  # Unpack the detection

                    # Get the class name from the class ID
                    class_name = model.names[int(class_id)]  # Map class_id to class name

                    # Check if it's the "NoHelmet" class
                    if class_name == "noHelmet" and confidence > sensitivity:
                        no_helmet_detected = True
                        break  # Exit loop once "NoHelmet" is found in this frame
                    
                
                  

                # Update the frame history with the detection result (True for "NoHelmet", False otherwise)
                frame_history.append(no_helmet_detected)
                frame_history_confidence.append(confidence)

                # Initialise no_helmet_count (in case frame_history is less than 10)
                no_helmet_count = sum(frame_history)

                # After 10 frames, check the condition
                if len(frame_history) == 10:
                    # If 8 or more frames out of the last 10 detected "NoHelmet", print the message
                    if no_helmet_count >= 8:
                        current_time = time.time()  # Get current time in seconds

                    # Check if enough time has passed since last incident addition
                    if current_time - last_incident_time >= 30:
                        print("Make database incident addition")
                        
												# Get the current camera_id, user_id, and other necessary information
                        camera_id = camera_id
                        user_id = user_id
                        detection_type = "No Helmet"
                        detection_confidence = float(sum(frame_history_confidence)) / len(frame_history_confidence) 
                        
												# Use a default BLOB (image data) for now
                        image_data = image_data  # Simple placeholder for image data as BLOB
                        
                        # Send email    
                        print("Send Email")
                        print("Camera ID:" + str(camera_id))      
                        print("user_id:" + str(user_id))  
                        print("detection_type:" + detection_type)   
                        print("detection_confidence:" + str(detection_confidence))   
                        #if (autoEmail):
                          #send_email(camera_id, user_id, detection_type, detection_confidence, email)
                        
                        # Add the detection to the database
                        new_detection = Detection(
                            camera_id=camera_id,
                            user_id=user_id,
                            detection_type=detection_type,
                            detection_datetime = datetime.now(),  # Use current time if not provided
                            confidence=detection_confidence,
                            image_data=image_data  # Store the image as BLOB
                        )
                        
                        db.session.add(new_detection)
                        db.session.commit()
                        # Update the last incident time to the current time
                        last_incident_time = current_time
												# Clear the queue
                        frame_history.clear()
                        frame_history_confidence.clear()
                        
                    else:
                        print(f"Cooldown active. Please wait {30 - (current_time - last_incident_time):.1f} more seconds.")

                # Optionally, print the current state of frame history and the "NoHelmet" count
                print(f"Frame history: {list(frame_history)}")
                print(f"NoHelmet detected in {no_helmet_count} out of the last 10 frames.")

                counter = get_counter()
                print(counter)

                # Draw bounding boxes on the image
                for detection in detections:
                    x1, y1, x2, y2, confidence, cls = detection
                    confidence = float(confidence)
                    if confidence > sensitivity:
                        x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                        class_id = int(cls)
                        class_name = model.names[class_id]
                        
                        color = class_colors.get(class_name, (255, 255, 255))  # Default to white if class not found

                        # Draw the bounding box
                        cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
                        label = f"{class_name} {confidence:.2f}"
                        cv2.putText(img, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

                # Encode the processed image to base64
                _, buffer = cv2.imencode('.jpg', img)
                processed_image_data = base64.b64encode(buffer).decode('utf-8')

                # Emit the processed frame back to the client
                socketio.emit('frame_processed', {'image': processed_image_data, 'cameraId': camera_id})

            else:
                print("Error: Invalid data structure or missing image data")
                socketio.emit('frame_processed', {'error': 'Invalid data structure or missing image data'})

        except Exception as e:
            print(f"Error processing frame: {e}")
            socketio.emit('frame_processed', {'error': str(e)})

    return app, socketio  # Return both app and socketio

if __name__ == '__main__':
    app, socketio = create_app()  # Get both app and socketio
    socketio.run(app, debug=True)  # Run the app with SocketIO