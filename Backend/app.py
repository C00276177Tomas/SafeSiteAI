from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO  # Import SocketIO
from db import db  # Import db from db.py
from routes import routes_bp  # Import routes blueprint
from config import DevelopmentConfig, TestingConfig
from ultralytics import YOLO
import base64
import cv2
import numpy as np

# Define the file to store the counter
counter_file = 'counter.txt'

def get_counter():
    try:
        with open(counter_file, 'r') as f:
            return int(f.read())
    except (FileNotFoundError, ValueError):
        return 0

def save_counter(counter):
    with open(counter_file, 'w') as f:
        f.write(str(counter))

def create_app(config_class=DevelopmentConfig):
    # Initialize Flask app
    app = Flask(__name__)
    CORS(app)

		# Load the YOLOv11 model
    model = YOLO("bestV17.pt")

		# Define specific colors for each class
    class_colors = {
				"person": (255, 0, 0),  # Blue
				"helmet": (0, 255, 0),  # Green
				"noHelmet": (0, 0, 255),  # Red
				"vest": (0, 255, 255)  # Yellow
		}
    
    # Apply configuration
    app.config.from_object(config_class)
    
    # Initialize SQLAlchemy with the app
    db.init_app(app)
    
    socketio = SocketIO(app, cors_allowed_origins="*")
    
    # Register blueprint for routes
    app.register_blueprint(routes_bp)
    
    @socketio.on('send_frame')
    def handle_send_frame(data):
        try:

            if isinstance(data, dict) and 'image' in data:
                image_data = data['image'].split(',')[1]  # Remove base64 prefix
                image_data = base64.b64decode(image_data)

                # Convert byte data to image
                nparr = np.frombuffer(image_data, np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

                # Run YOLO detection
                results = model(img)  # Run YOLO on the image
                detections = results[0].boxes.data  # Get bounding box data
                
								# Assuming 'noHelmet' corresponds to class ID 1 (adjust accordingly)
                no_helmet_class_id = 1

								# Initialize the counter
                no_helmet_count = 0

								# Loop through each detection and check if it matches the 'noHelmet' class
                for detection in detections:
                    class_id = detection[5]  # Assuming the class ID is at index 5
                    if class_id == no_helmet_class_id:
                      counter = get_counter()
                      counter += 1
                      save_counter(counter)

                

                print(counter)

                # Draw bounding boxes on the image
                for detection in detections:
                    x1, y1, x2, y2, confidence, cls = detection
                    confidence = float(confidence)
                    if confidence > 0.6:
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
                socketio.emit('frame_processed', {'image': processed_image_data})

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
    
# from flask import Flask
# from flask_cors import CORS
# from db import db  # Import db from db.py
# from routes import routes_bp  # Import routes blueprint
# from config import DevelopmentConfig, TestingConfig

# def create_app(config_class=DevelopmentConfig):
#     # Initialize Flask app
#     app = Flask(__name__)
#     CORS(app)
    
#     # Apply configuration
#     app.config.from_object(config_class)
    
#     # Initialize SQLAlchemy with the app
#     db.init_app(app)
    
#     # Register blueprint for routes
#     app.register_blueprint(routes_bp)
    
#     return app

# if __name__ == '__main__':
#     app = create_app()
#     app.run()






# from flask import Flask
# from flask_cors import CORS
# from flask_socketio import SocketIO  # Import SocketIO
# from db import db  # Import db from db.py
# from routes import routes_bp  # Import routes blueprint
# from config import DevelopmentConfig, TestingConfig
# from ultralytics import YOLO
# import base64
# import cv2
# import numpy as np

# def create_app(config_class=DevelopmentConfig):
#     # Initialize Flask app
#     app = Flask(__name__)
#     CORS(app)

# 		# Load the YOLOv11 model
#     model = YOLO("bestV17.pt")

# 		# Define specific colors for each class
#     class_colors = {
# 				"person": (255, 0, 0),  # Blue
# 				"helmet": (0, 255, 0),  # Green
# 				"noHelmet": (0, 0, 255),  # Red
# 				"vest": (0, 255, 255)  # Yellow
# 		}
    
#     # Apply configuration
#     app.config.from_object(config_class)
    
#     # Initialize SQLAlchemy with the app
#     db.init_app(app)
    
#     socketio = SocketIO(app, cors_allowed_origins="*")
    
#     @socketio.on('send_frame')
#     def handle_send_frame(data):
#         try:
#             print('Received frame:', data)

#             if isinstance(data, dict) and 'image' in data:
#                 image_data = data['image'].split(',')[1]  # Remove base64 prefix
#                 image_data = base64.b64decode(image_data)

#                 # Convert byte data to image
#                 nparr = np.frombuffer(image_data, np.uint8)
#                 img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#                 # Run YOLO detection
#                 results = model(img)  # Run YOLO on the image
#                 detections = results[0].boxes.data  # Get bounding box data

#                 # Draw bounding boxes on the image
#                 for detection in detections:
#                     x1, y1, x2, y2, confidence, cls = detection
#                     confidence = float(confidence)
#                     if confidence > 0.6:
#                         x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
#                         class_id = int(cls)
#                         class_name = model.names[class_id]
                        
#                         color = class_colors.get(class_name, (255, 255, 255))  # Default to white if class not found

#                         # Draw the bounding box
#                         cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
#                         label = f"{class_name} {confidence:.2f}"
#                         cv2.putText(img, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

#                 # Encode the processed image to base64
#                 _, buffer = cv2.imencode('.jpg', img)
#                 processed_image_data = base64.b64encode(buffer).decode('utf-8')

#                 # Emit the processed frame back to the client
#                 print("frame_processed")
#                 socketio.emit('frame_processed', {'image': processed_image_data})

#             else:
#                 print("Error: Invalid data structure or missing image data")
#                 socketio.emit('frame_processed', {'error': 'Invalid data structure or missing image data'})

#         except Exception as e:
#             print(f"Error processing frame: {e}")
#             socketio.emit('frame_processed', {'error': str(e)})

#     return app, socketio  # Return both app and socketio

# if __name__ == '__main__':
#     app, socketio = create_app()  # Get both app and socketio
#     socketio.run(app, debug=True)  # Run the app with SocketIO