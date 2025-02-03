from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO  # Import SocketIO
from db import db  # Import db from db.py
from routes import routes_bp  # Import routes blueprint
from config import DevelopmentConfig, TestingConfig
import base64
import cv2
import numpy as np

def create_app(config_class=DevelopmentConfig):
    # Initialize Flask app
    app = Flask(__name__)
    CORS(app)
    
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
            print('Received frame:', data)

            if isinstance(data, dict) and 'image' in data:
                image_data = data['image'].split(',')[1]  # Remove base64 prefix
                image_data = base64.b64decode(image_data)

                # Process the image (example: convert to grayscale)
                nparr = np.frombuffer(image_data, np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                

                top_left = (50, 50)  # Coordinates of the top-left corner of the rectangle
                bottom_right = (200, 200)  # Coordinates of the bottom-right corner of the rectangle
                color = (0, 0, 255)  # Red color in BGR format
                thickness = 3  # Line thickness
                img_with_rectangle = cv2.rectangle(img, top_left, bottom_right, color, thickness)

                # Processed image (convert to grayscale)
                processed_img = cv2.cvtColor(img_with_rectangle, cv2.COLOR_BGR2GRAY)
                _, buffer = cv2.imencode('.jpg', processed_img)
                processed_image_data = base64.b64encode(buffer).decode('utf-8')

                # Emit the processed frame back to the client
                print("frame_processed@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                socketio.emit('frame_processed', {'image': processed_image_data})

            else:
                print("Errorrrrrrrrrrrrrrrr@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
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