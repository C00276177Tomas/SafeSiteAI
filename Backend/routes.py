from flask import Blueprint, jsonify, request
from models import Users, Company, Camera, Settings, Detection, db  # Import the Users model and database instance
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
import jwt, os

# Create a Blueprint for the routes
routes_bp = Blueprint('routes', __name__)

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

# Users Routes

# Route to get all users
@routes_bp.route('/get_users', methods=['GET'])
def get_users():
    all_users = Users.query.all()  # Query Users table
    user_list = [
        {
            "user_id": user.user_id,
            "company_id": user.company_id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role,
            "created_at": user.created_at.strftime('%Y-%m-%d %H:%M:%S') if user.created_at else None,
            "updated_at": user.updated_at.strftime('%Y-%m-%d %H:%M:%S') if user.updated_at else None,
            "is_active": user.is_active,
            "company": {
                "company_id": user.company.company_id,
                "company_name": user.company.company_name,
            } if user.company else None
        }
        for user in all_users
    ]
    return jsonify({"users": user_list})

@routes_bp.route('/add_user', methods=['POST'])
def add_user():
    try:
        # Get data from the request
        data = request.get_json()

        # Check if all required fields are present
        if not all(key in data for key in ['company_id', 'first_name', 'last_name', 'email', 'password_hash']):
            return jsonify({"error": "Missing required fields"}), 400

        # Check if the email already exists
        existing_user = Users.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({"error": "Email already exists"}), 400

        # Hash the password
        hashed_password = generate_password_hash(data['password_hash'], method='pbkdf2:sha256', salt_length=12)

        # Create new user
        new_user = Users(
            company_id=data['company_id'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password_hash=hashed_password,  # Use the hashed password here
            role=data.get('role', 'normal')  # Default to 'normal' if no role is provided
        )

        # Add user to the session and commit
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully", "user_id": new_user.user_id}), 201

    except IntegrityError:
        db.session.rollback()  # Rollback in case of error
        return jsonify({"error": "Duplicate email address"}), 400  # Handle unique constraint error

    except Exception as e:
        db.session.rollback()  # Rollback in case of any other error
        return jsonify({"error": str(e)}), 500
    
# Route to update user details
@routes_bp.route('/update_user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        # Fetch the user from the database
        user = Users.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Get the data from the request
        data = request.get_json()

        # Update fields
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'email' in data:
            user.email = data['email']
        if 'role' in data:
            user.role = data['role']

        # Commit changes to the database
        db.session.commit()

        return jsonify({"message": "User updated successfully", "user_id": user.user_id}), 200

    except IntegrityError as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({"error": "Duplicate email address"}), 400  # Custom error message

    except Exception as e:
        db.session.rollback()  # Rollback in case of any other error
        return jsonify({"error": str(e)}), 500
    
# Route to delete a user
@routes_bp.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        # Fetch the user from the database
        user = Users.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Delete the user from the database
        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "User deleted successfully", "user_id": user_id}), 200
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return jsonify({"error": str(e)}), 500
    
# Route to make a user inactive
@routes_bp.route('/deactivate_user/<int:user_id>', methods=['PATCH'])
def deactivate_user(user_id):
    try:
        # Fetch the user from the database
        user = Users.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Check if the user is already inactive
        if not user.is_active:
            return jsonify({"error": "User is already inactive"}), 400  # Return an error if already inactive

        # Mark the user as inactive
        user.is_active = False
        db.session.commit()

        return jsonify({"message": "User marked as inactive successfully", "user_id": user_id}), 200
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return jsonify({"error": str(e)}), 500

# Route to activate a user
@routes_bp.route('/activate_user/<int:user_id>', methods=['PATCH'])
def activate_user(user_id):
    try:
        # Fetch the user from the database
        user = Users.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Check if the user is already active
        if user.is_active:
            return jsonify({"error": "User is already active"}), 400  # Return an error if already active

        # Mark the user as active
        user.is_active = True
        db.session.commit()

        return jsonify({"message": "User activated successfully", "user_id": user_id}), 200
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return jsonify({"error": str(e)}), 500
    
# Company Routes

# Route to get all companies
@routes_bp.route('/get_companies', methods=['GET'])
def get_companies():
    all_companies = Company.query.all()
    company_list = [
        {
            "company_id": company.company_id,
            "company_name": company.company_name,
            "created_at": company.created_at.strftime('%Y-%m-%d %H:%M:%S') if company.created_at else None,
            "settings": {
                "settings_id": company.settings.settings_id if company.settings else None,
            },
            "users": [{"user_id": user.user_id, "first_name": user.first_name, "last_name": user.last_name} for user in company.users],
            "cameras": [{"camera_id": camera.camera_id, "camera_name": camera.camera_name} for camera in company.cameras]
        }
        for company in all_companies
    ]
    return jsonify({"companies": company_list})

# Route to add a new company
@routes_bp.route('/add_company', methods=['POST'])
def add_company():
    try:
        data = request.get_json()

        if 'company_name' not in data:
            return jsonify({"error": "Missing required fields"}), 400

        existing_company = Company.query.filter_by(company_name=data['company_name']).first()
        if existing_company:
            return jsonify({"error": "Company name already exists"}), 400

        new_company = Company(
            company_name=data['company_name'],
        )

        db.session.add(new_company)
        db.session.commit()

        return jsonify({"message": "Company created successfully", "company_id": new_company.company_id}), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Duplicate company name"}), 400

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Route to update company details
@routes_bp.route('/update_company/<int:company_id>', methods=['PUT'])
def update_company(company_id):
    try:
        company = Company.query.get(company_id)
        if not company:
            return jsonify({"error": "Company not found"}), 404

        data = request.get_json()

        if 'company_name' in data:
            company.company_name = data['company_name']

        db.session.commit()

        return jsonify({"message": "Company updated successfully", "company_id": company.company_id}), 200

    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Duplicate company name"}), 400

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Route to delete a company
@routes_bp.route('/delete_company/<int:company_id>', methods=['DELETE'])
def delete_company(company_id):
    try:
        company = Company.query.get(company_id)
        if not company:
            return jsonify({"error": "Company not found"}), 404

        db.session.delete(company)
        db.session.commit()

        return jsonify({"message": "Company deleted successfully", "company_id": company_id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
# Camera Routes

# Route to get all cameras
@routes_bp.route('/get_cameras', methods=['GET'])
def get_cameras():
    all_cameras = Camera.query.all()
    camera_list = [
        {
            "camera_id": camera.camera_id,
            "camera_name": camera.camera_name,
            "location": camera.location,
            "company_id": camera.company_id
        }
        for camera in all_cameras
    ]
    return jsonify({"cameras": camera_list})

# Route to add a new camera
@routes_bp.route('/add_camera', methods=['POST'])
def add_camera():
    try:
        data = request.get_json()

        if 'camera_name' not in data or 'company_id' not in data:
            return jsonify({"error": "Missing required fields"}), 400

        company = Company.query.get(data['company_id'])
        if not company:
            return jsonify({"error": "Company not found"}), 404

        new_camera = Camera(
            camera_name=data['camera_name'],
            location=data.get('location'),  # Optional field
            company_id=data['company_id']
        )

        db.session.add(new_camera)
        db.session.commit()

        return jsonify({"message": "Camera created successfully", "camera_id": new_camera.camera_id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Route to update camera details
@routes_bp.route('/update_camera/<int:camera_id>', methods=['PUT'])
def update_camera(camera_id):
    try:
        camera = Camera.query.get(camera_id)
        if not camera:
            return jsonify({"error": "Camera not found"}), 404

        data = request.get_json()

        if 'camera_name' in data:
            camera.camera_name = data['camera_name']
        if 'location' in data:
            camera.location = data['location']
        if 'company_id' in data:
            company = Company.query.get(data['company_id'])
            if not company:
                return jsonify({"error": "Company not found"}), 404
            camera.company_id = data['company_id']

        db.session.commit()

        return jsonify({"message": "Camera updated successfully", "camera_id": camera.camera_id}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Route to delete a camera
@routes_bp.route('/delete_camera/<int:camera_id>', methods=['DELETE'])
def delete_camera(camera_id):
    try:
        camera = Camera.query.get(camera_id)
        if not camera:
            return jsonify({"error": "Camera not found"}), 404

        db.session.delete(camera)
        db.session.commit()

        return jsonify({"message": "Camera deleted successfully", "camera_id": camera_id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
# Settings Routes

# Route to get all settings
@routes_bp.route('/get_settings', methods=['GET'])
def get_settings():
    all_settings = Settings.query.all()
    settings_list = [
        {
            "settings_id": setting.settings_id,
            "company_id": setting.company_id,
            "confidence_threshold": setting.confidence_threshold,
            "onoff_email": setting.onoff_email,
            "onoff_sms": setting.onoff_sms,
            "notification_email": setting.notification_email,
            "notification_sms": setting.notification_sms,
            "updated_at": setting.updated_at
        }
        for setting in all_settings
    ]
    return jsonify({"settings": settings_list})

# Route to add new settings
@routes_bp.route('/add_settings', methods=['POST'])
def add_settings():
    try:
        data = request.get_json()

        if 'company_id' not in data:
            return jsonify({"error": "Missing required fields"}), 400

        company = Company.query.get(data['company_id'])
        if not company:
            return jsonify({"error": "Company not found"}), 404

        existing_settings = Settings.query.filter_by(company_id=data['company_id']).first()
        if existing_settings:
            return jsonify({"error": "Settings for this company already exist"}), 400

        new_settings = Settings(
            company_id=data['company_id'],
            confidence_threshold=data.get('confidence_threshold'),
            onoff_email=data.get('onoff_email', False),
            onoff_sms=data.get('onoff_sms', False),
            notification_email=data.get('notification_email'),
            notification_sms=data.get('notification_sms')
        )

        db.session.add(new_settings)
        db.session.commit()

        return jsonify({"message": "Settings created successfully", "settings_id": new_settings.settings_id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Route to update settings
@routes_bp.route('/update_settings/<int:settings_id>', methods=['PUT'])
def update_settings(settings_id):
    try:
        settings = Settings.query.get(settings_id)
        if not settings:
            return jsonify({"error": "Settings not found"}), 404

        data = request.get_json()

        if 'confidence_threshold' in data:
            settings.confidence_threshold = data['confidence_threshold']
        if 'onoff_email' in data:
            settings.onoff_email = data['onoff_email']
        if 'onoff_sms' in data:
            settings.onoff_sms = data['onoff_sms']
        if 'notification_email' in data:
            settings.notification_email = data['notification_email']
        if 'notification_sms' in data:
            settings.notification_sms = data['notification_sms']

        db.session.commit()

        return jsonify({"message": "Settings updated successfully", "settings_id": settings.settings_id}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Route to delete settings
@routes_bp.route('/delete_settings/<int:settings_id>', methods=['DELETE'])
def delete_settings(settings_id):
    try:
        settings = Settings.query.get(settings_id)
        if not settings:
            return jsonify({"error": "Settings not found"}), 404

        db.session.delete(settings)
        db.session.commit()

        return jsonify({"message": "Settings deleted successfully", "settings_id": settings_id}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
# Detection Routes

# Route to get all detections
@routes_bp.route('/get_detections', methods=['GET'])
def get_detections():
    all_detections = Detection.query.all()
    detections_list = [
        {
            "detection_id": detection.detection_id,
            "camera_id": detection.camera_id,
            "user_id": detection.user_id,
            "detection_type": detection.detection_type,
            "detection_datetime": detection.detection_datetime,
            "confidence": detection.confidence,
            "image_data": detection.image_data.hex() if detection.image_data else None  # Convert binary to hex string
        }
        for detection in all_detections
    ]
    return jsonify({"detections": detections_list})


# Route to add a new detection
@routes_bp.route('/add_detection', methods=['POST'])
def add_detection():
    try:
        data = request.get_json()

        if 'camera_id' not in data or 'user_id' not in data:
            return jsonify({"error": "Missing required fields"}), 400

        camera = Camera.query.get(data['camera_id'])
        user = Users.query.get(data['user_id'])

        if not camera:
            return jsonify({"error": "Camera not found"}), 404
        if not user:
            return jsonify({"error": "User not found"}), 404

        new_detection = Detection(
            camera_id=data['camera_id'],
            user_id=data['user_id'],
            detection_type=data.get('detection_type'),
            detection_datetime=data.get('detection_datetime', db.func.current_timestamp()),
            confidence=data.get('confidence'),
            image_data=bytes.fromhex(data['image_data']) if 'image_data' in data else None
        )

        db.session.add(new_detection)
        db.session.commit()

        return jsonify({"message": "Detection created successfully", "detection_id": new_detection.detection_id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Route to update detection details
@routes_bp.route('/update_detection/<int:detection_id>', methods=['PUT'])
def update_detection(detection_id):
    try:
        detection = Detection.query.get(detection_id)
        if not detection:
            return jsonify({"error": "Detection not found"}), 404

        data = request.get_json()

        if 'camera_id' in data:
            camera = Camera.query.get(data['camera_id'])
            if not camera:
                return jsonify({"error": "Camera not found"}), 404
            detection.camera_id = data['camera_id']

        if 'user_id' in data:
            user = Users.query.get(data['user_id'])
            if not user:
                return jsonify({"error": "User not found"}), 404
            detection.user_id = data['user_id']

        if 'detection_type' in data:
            detection.detection_type = data['detection_type']
        if 'detection_datetime' in data:
            detection.detection_datetime = data['detection_datetime']
        if 'confidence' in data:
            detection.confidence = data['confidence']
        if 'image_data' in data:
            detection.image_data = bytes.fromhex(data['image_data'])

        db.session.commit()

        return jsonify({"message": "Detection updated successfully", "detection_id": detection.detection_id}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Route to delete a detection
@routes_bp.route('/delete_detection/<int:detection_id>', methods=['DELETE'])
def delete_detection(detection_id):
    try:
        detection = Detection.query.get(detection_id)
        if not detection:
            return jsonify({"error": "Detection not found"}), 404

        db.session.delete(detection)
        db.session.commit()

        return jsonify({"message": "Detection deleted successfully", "detection_id": detection_id}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Route to login and provide a token
@routes_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Retrieve the user by email
        user = Users.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({"error": "Invalid email or password"}), 401

        # Generate the token (JWT)
        token = jwt.encode({
            'user_id': user.user_id,  # Store user id or other useful data in the token
            'exp': datetime.now(timezone.utc) + timedelta(hours=1)  # Use timezone-aware datetime
        }, SECRET_KEY, algorithm='HS256')

        # Send the token and user_id in the response
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user_id': user.user_id,  # Include user_id in the response
						'company_id': user.company_id
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Get name and surname

@routes_bp.route('/get_user_name', methods=['GET'])
def get_user_name():
    user_id = request.args.get('user_id')  # Get user_id from query parameters
    
    if not user_id:
        return jsonify({"message": "User ID is required"}), 400
    
    user = Users.query.get(user_id)  # Query the user by user_id

    if not user:
        return jsonify({"message": "User not found"}), 404

    # Return only first_name and last_name
    return jsonify({
        "firstName": user.first_name,
        "lastName": user.last_name
    }), 200

# Get users based on company id

# Route to get users by company_id
@routes_bp.route('/get_users/<int:company_id>', methods=['GET'])
def get_users_by_company(company_id):
    # Query Users table for users with the given company_id
    users_by_company = Users.query.filter_by(company_id=company_id).all()
    
    # Create a list of users with their details
    user_list = [
        {
            "user_id": user.user_id,
            "company_id": user.company_id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role,
            "created_at": user.created_at.strftime('%Y-%m-%d %H:%M:%S') if user.created_at else None,
            "updated_at": user.updated_at.strftime('%Y-%m-%d %H:%M:%S') if user.updated_at else None,
            "is_active": user.is_active,
            "company": {
                "company_id": user.company.company_id,
                "company_name": user.company.company_name,
            } if user.company else None
        }
        for user in users_by_company
    ]

    # Return the filtered user list as JSON
    return jsonify({"users": user_list})

# Route to the root URL (/)
@routes_bp.route('/')
def home():
    return "Hello, World!"
