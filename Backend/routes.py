from flask import Blueprint, jsonify, request
from models import Users, db  # Import the Users model and database instance
from sqlalchemy.exc import IntegrityError

# Create a Blueprint for the routes
routes_bp = Blueprint('routes', __name__)

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
            "password_hash": user.password_hash,
            "created_at": user.created_at.strftime('%Y-%m-%d %H:%M:%S') if user.created_at else None,
            "updated_at": user.updated_at.strftime('%Y-%m-%d %H:%M:%S') if user.updated_at else None,
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

        # Create new user
        new_user = Users(
            company_id=data['company_id'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password_hash=data['password_hash'],
            role=data.get('role', 'normal')  # Default to 'normal' if no role is provided
        )

        # Add user to the session and commit
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully", "user_id": new_user.user_id}), 201

    except IntegrityError as e:
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

        # Delete the user
        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "User deleted successfully", "user_id": user_id}), 200
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return jsonify({"error": str(e)}), 500

# Route to the root URL (/)
@routes_bp.route('/')
def home():
    return "Hello, World!"
