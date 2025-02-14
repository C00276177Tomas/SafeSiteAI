from db import db

# Company Model
class Company(db.Model):
    __tablename__ = 'Company'  # Explicitly defining table name (if necessary)
    
    company_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    company_name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    
    # Relationships with other tables
    settings = db.relationship('Settings', backref='company_reference', uselist=False)
    users = db.relationship('Users', backref='company_reference')
    cameras = db.relationship('Camera', backref='company_reference')

# Settings Model
class Settings(db.Model):
    __tablename__ = 'Settings'
    
    settings_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    company_id = db.Column(db.Integer, db.ForeignKey('Company.company_id'), unique=True, nullable=False)
    confidence_threshold = db.Column(db.Float)
    onoff_email = db.Column(db.Boolean)
    onoff_sms = db.Column(db.Boolean)
    notification_email = db.Column(db.String(255))
    notification_sms = db.Column(db.String(255))
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    
    # Relationship with Company
    company = db.relationship('Company', backref='settings_reference')

# Users Model
class Users(db.Model):
    __tablename__ = 'Users'
    
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    company_id = db.Column(db.Integer, db.ForeignKey('Company.company_id'), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    role = db.Column(db.Enum('admin', 'normal', name='role_enum'), default='normal')
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    is_active = db.Column(db.Boolean, nullable=False, default=True) 
    
    # Relationship with Company
    company = db.relationship('Company', backref='users_reference')

# Camera Model
class Camera(db.Model):
    __tablename__ = 'Camera'
    
    camera_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    company_id = db.Column(db.Integer, db.ForeignKey('Company.company_id'), nullable=False)
    camera_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255))
    
    # Relationship with Company
    company = db.relationship('Company', backref='cameras_reference')

# Detection Model
class Detection(db.Model):
    __tablename__ = 'Detection'
    
    detection_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    camera_id = db.Column(db.Integer, db.ForeignKey('Camera.camera_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.user_id'), nullable=False)
    detection_type = db.Column(db.String(100))
    detection_datetime = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    confidence = db.Column(db.Float)
    image_data = db.Column(db.LargeBinary)  # Storing image as BLOB
    
    # Relationships with Camera and Users
    camera = db.relationship('Camera', backref='detections_reference')
    user = db.relationship('Users', backref='detections_reference')
