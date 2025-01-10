import pytest
from app import create_app, db
from models import Users, Company, Settings, Camera, Detection
from config import TestingConfig

@pytest.fixture
def client():
    # Create the Flask app using the TestingConfig
    app = create_app(config_class=TestingConfig)
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()  # Create tables in the in-memory database

            # Add some initial data to the database

            # Create Company
            company = Company(company_name="Test Company")
            db.session.add(company)
            db.session.commit()

            # Create Settings for the company
            settings = Settings(company_id=company.company_id, confidence_threshold=0.8, 
                                onoff_email=True, onoff_sms=False, notification_email="test@example.com",
                                notification_sms="1234567890")
            db.session.add(settings)
            db.session.commit()

            # Create User for the company
            user = Users(company_id=company.company_id, first_name="John", last_name="Doe",
                          email="john.doe@example.com", role="admin", password_hash="hashed_password")
            db.session.add(user)
            db.session.commit()

            # Create Camera for the company
            camera = Camera(company_id=company.company_id, camera_name="Camera 1", location="Building 1")
            db.session.add(camera)
            db.session.commit()

            # Create Detection for the camera and user
            detection = Detection(camera_id=camera.camera_id, user_id=user.user_id, detection_type="Motion",
                                  confidence=0.95, image_data=b'fake_image_data')
            db.session.add(detection)
            db.session.commit()
            
            # Print table contents after setup
            print("\n--- Tables Content After Setup ---")

            print("\nCompany Table:")
            for comp in Company.query.all():
                print(f"ID: {comp.company_id}, Name: {comp.company_name}, Created At: {comp.created_at}")

            print("\nSettings Table:")
            for sett in Settings.query.all():
                print(f"ID: {sett.settings_id}, Company ID: {sett.company_id}, Confidence Threshold: {sett.confidence_threshold}, Email: {sett.notification_email}")

            print("\nUsers Table:")
            for usr in Users.query.all():
                print(f"ID: {usr.user_id}, Company ID: {usr.company_id}, Name: {usr.first_name} {usr.last_name}, Email: {usr.email}")

            print("\nCamera Table:")
            for cam in Camera.query.all():
                print(f"ID: {cam.camera_id}, Company ID: {cam.company_id}, Name: {cam.camera_name}, Location: {cam.location}")

            print("\nDetection Table:")
            for det in Detection.query.all():
                print(f"ID: {det.detection_id}, Camera ID: {det.camera_id}, User ID: {det.user_id}, Type: {det.detection_type}, Confidence: {det.confidence}")

        yield client

        with app.app_context():
            db.drop_all()
            print("Database URI during tests:", app.config['SQLALCHEMY_DATABASE_URI'])

