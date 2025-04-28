from models import Company, Camera, Settings, Detection

# User Tests

# Get users tests
def test_get_users(client):
    response = client.get('/get_users')
    assert response.status_code == 200
    assert 'users' in response.json
    assert isinstance(response.json['users'], list)
    
# Add user tests   
def test_add_user(client):
    new_user = {
        "company_id": 1,
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane.doe@example.com",
        "role": "normal",
        "password_hash": "hashed_password"
    }
    response = client.post('/add_user', json=new_user)
    print(response.status_code)  # Check the actual status code
    print(response.json)
    
    assert response.status_code == 201
    assert response.json['message'] == "User created successfully"
    
def test_add_user_duplicate_email(client):
    new_user = {
        "company_id": 1,
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane.doe@example.com",
        "role": "normal",
        "password_hash": "hashed_password"
    }
    # First insert
    client.post('/add_user', json=new_user)
    # Duplicate insert
    response = client.post('/add_user', json=new_user)
    assert response.status_code == 400
    assert "Email already exists" in response.json['error']
    
def test_add_user_missing_fields(client):
    # Missing required fields
    new_user = {
        "company_id": 1,
        "first_name": "John",
        "email": "john.doe@example.com"
    }
    response = client.post('/add_user', json=new_user)
    assert response.status_code == 400
    assert "Missing required fields" in response.json['error']
    
# Update user tests  
def test_update_user(client):
    # Add a user
    new_user = {
        "company_id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john12.doe@example.com",
        "password_hash": "hashed_password"
    }
    response = client.post('/add_user', json=new_user)
    user_id = response.json['user_id']

    # Update user details
    updated_data = {
        "first_name": "Updated John",
        "last_name": "Updated Doe"
    }
    response = client.put(f'/update_user/{user_id}', json=updated_data)
    assert response.status_code == 200
    assert response.json['message'] == "User updated successfully"

def test_update_user_not_found(client):
    # Try updating a non-existing user
    response = client.put('/update_user/9999', json={"first_name": "Updated"})
    assert response.status_code == 404
    assert "User not found" in response.json['error']

def test_update_user_duplicate_email(client):
    # Add two users
    user1 = {
        "company_id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "password_hash": "hashed_password"
    }
    user2 = {
        "company_id": 1,
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane.doe@example.com",
        "password_hash": "hashed_password"
    }
    client.post('/add_user', json=user1)
    response = client.post('/add_user', json=user2)
    user2_id = response.json['user_id']

    # Try to update user2 with user1's email
    response = client.put(f'/update_user/{user2_id}', json={"email": "john.doe@example.com"})
    assert response.status_code == 400
    assert "Duplicate email address" in response.json['error'] 
    
# Delete user tests
def test_delete_user(client):
    # Add a user
    new_user = {
        "company_id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john15.doe@example.com",
        "password_hash": "hashed_password"
    }
    response = client.post('/add_user', json=new_user)
    user_id = response.json['user_id']

    # Delete the user
    response = client.delete(f'/delete_user/{user_id}')
    assert response.status_code == 200
    assert response.json['message'] == "User deleted successfully"

def test_delete_user_not_found(client):
    # Try deleting a non-existing user
    response = client.delete('/delete_user/9999')
    assert response.status_code == 404
    assert "User not found" in response.json['error']
    
# Company Tests

# Get companies tests
def test_get_companies(client):
    response = client.get('/get_companies')
    assert response.status_code == 200
    assert 'companies' in response.json
    assert isinstance(response.json['companies'], list)

# Add company tests
def test_add_company(client):
    new_company = {
        "company_name": "New Company"
    }
    response = client.post('/add_company', json=new_company)
    assert response.status_code == 201
    assert response.json['message'] == "Company created successfully"

def test_add_company_missing_fields(client):
    response = client.post('/add_company', json={})
    assert response.status_code == 400
    assert "Missing required fields" in response.json['error']

# Update company tests
def test_update_company(client):
    with client.application.app_context():  # Ensure application context is available
        company = Company.query.first()  # Accessing the database with the app context
        updated_data = {
            "company_name": "Updated Company Name"
        }
        response = client.put(f'/update_company/{company.company_id}', json=updated_data)
        assert response.status_code == 200
        assert response.json['message'] == "Company updated successfully"

def test_update_company_not_found(client):
    response = client.put('/update_company/9999', json={"company_name": "Updated Company"})
    assert response.status_code == 404
    assert "Company not found" in response.json['error']

# Delete company tests
def test_delete_company(client):
    # Add a company
    new_company = {
        "company_name": "Test Company for Deletion"
    }
    response = client.post('/add_company', json=new_company)
    company_id = response.json['company_id']

    # Delete the company
    response = client.delete(f'/delete_company/{company_id}')
    assert response.status_code == 200
    assert response.json['message'] == "Company deleted successfully"
    
# Camera Tests

# Get cameras tests
def test_get_cameras(client):
    response = client.get('/get_cameras')
    assert response.status_code == 200
    assert 'cameras' in response.json
    assert isinstance(response.json['cameras'], list)

# Add camera tests
def test_add_camera(client):
    new_camera = {
        "company_id": 1,
        "camera_name": "New Camera",
        "location": "Building A, Floor 3"
    }
    response = client.post('/add_camera', json=new_camera)
    assert response.status_code == 201
    assert response.json['message'] == "Camera created successfully"

def test_add_camera_missing_fields(client):
    response = client.post('/add_camera', json={})
    assert response.status_code == 400
    assert "Missing required fields" in response.json['error']

# Update camera tests
def test_update_camera(client):
    with client.application.app_context():  # Ensure application context is available
        camera = Camera.query.first()  # Accessing the database with the app context
        updated_data = {
            "camera_name": "Updated Camera Name",
            "location": "Updated Location, Floor 5"
        }
        response = client.put(f'/update_camera/{camera.camera_id}', json=updated_data)
        assert response.status_code == 200
        assert response.json['message'] == "Camera updated successfully"

def test_update_camera_not_found(client):
    response = client.put('/update_camera/9999', json={
        "camera_name": "Nonexistent Camera",
        "location": "Unknown Location"
    })
    assert response.status_code == 404
    assert "Camera not found" in response.json['error']

# Delete camera tests
def test_delete_camera(client):
    # Add a camera
    new_camera = {
        "company_id": 1,
        "camera_name": "Test Camera for Deletion",
        "location": "Temporary Location"
    }
    response = client.post('/add_camera', json=new_camera)
    camera_id = response.json['camera_id']

    # Delete the camera
    response = client.delete(f'/delete_camera/{camera_id}')
    assert response.status_code == 200
    assert response.json['message'] == "Camera deleted successfully"
    
# Settings tests

# Get settings tests
def test_get_settings(client):
    response = client.get('/get_settings')
    assert response.status_code == 200
    assert 'settings' in response.json
    assert isinstance(response.json['settings'], list)
    
# Add settings tests (and create a company first)
def test_add_settings(client):
    # Step 1: Create a new company
    new_company = {
        "company_name": "New Company for Settings"
    }
    response = client.post('/add_company', json=new_company)
    assert response.status_code == 201
    company_id = response.json['company_id']  # Get the ID of the newly created company

    # Step 2: Add settings for the created company
    new_settings = {
        "company_id": company_id,
        "confidence_threshold": 0.8,
        "onoff_email": True,
        "onoff_sms": False,
        "notification_email": "notify@company.com",
        "notification_sms": "+1234567890"
    }
    response = client.post('/add_settings', json=new_settings)
    assert response.status_code == 201
    assert response.json['message'] == "Settings created successfully"

def test_add_settings_missing_fields(client):
    response = client.post('/add_settings', json={})
    assert response.status_code == 400
    assert "Missing required fields" in response.json['error']

# Update settings tests
def test_update_settings(client):
    with client.application.app_context():
        settings = Settings.query.first()  # Accessing the database to get settings
        updated_data = {
            "confidence_threshold": 0.85,
            "onoff_email": False,
            "onoff_sms": True,
            "notification_email": "new_notify@company.com",
            "notification_sms": "+0987654321"
        }
        response = client.put(f'/update_settings/{settings.settings_id}', json=updated_data)
        assert response.status_code == 200
        assert response.json['message'] == "Settings updated successfully"

def test_update_settings_not_found(client):
    response = client.put('/update_settings/9999', json={
        "confidence_threshold": 0.9,
        "onoff_email": True,
        "onoff_sms": True,
        "notification_email": "nonexistent@company.com",
        "notification_sms": "+1112223333"
    })
    assert response.status_code == 404
    assert "Settings not found" in response.json['error']
    
# Delete settings tests
def test_delete_settings(client):
		# Step 1: Create a new company
    new_company = {
        "company_name": "New Company for Settings"
    }
    response = client.post('/add_company', json=new_company)
    assert response.status_code == 201
    company_id = response.json['company_id']  # Get the ID of the newly created company
    # Add settings for a company
    new_settings = {
        "company_id": company_id,
        "confidence_threshold": 0.8,
        "onoff_email": True,
        "onoff_sms": False,
        "notification_email": "notify@company.com",
        "notification_sms": "+1234567890"
    }
    response = client.post('/add_settings', json=new_settings)
    settings_id = response.json['settings_id']

    # Delete the settings
    response = client.delete(f'/delete_settings/{settings_id}')
    assert response.status_code == 200
    assert response.json['message'] == "Settings deleted successfully"
    
# Detection tests

# Get detections tests
def test_get_detections(client):
    response = client.get('/get_detections')
    assert response.status_code == 200
    assert 'detections' in response.json
    assert isinstance(response.json['detections'], list)

# Add detection tests (and create necessary dependencies first)
def test_add_detection(client):
    # Step 1: Create a new company
    new_company = {"company_name": "New Company for Detection"}
    company_response = client.post('/add_company', json=new_company)
    assert company_response.status_code == 201
    company_id = company_response.json['company_id']

    # Step 2: Create a new camera for the company
    new_camera = {
        "company_id": company_id,
        "camera_name": "Test Camera",
        "location": "Building A, Floor 1"
    }
    camera_response = client.post('/add_camera', json=new_camera)
    assert camera_response.status_code == 201
    camera_id = camera_response.json['camera_id']

    # Step 3: Create a new user
    new_user = {
        
        "company_id": company_id,
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane.doe@example.com",
        "role": "normal",
        "password_hash": "hashed_password"
    }
    user_response = client.post('/add_user', json=new_user)
    assert user_response.status_code == 201
    user_id = user_response.json['user_id']

    # Step 4: Add a new detection
    new_detection = {
        "camera_id": camera_id,
        "user_id": user_id,
        "detection_type": "Person",
        "confidence": 0.92,
        "image_data": "ffd8ffe000104a46494600010101006000600000"
    }
    response = client.post('/add_detection', json=new_detection)
    assert response.status_code == 201
    assert response.json['message'] == "Detection created successfully"

def test_add_detection_missing_fields(client):
    response = client.post('/add_detection', json={})
    assert response.status_code == 400
    assert "Missing required fields" in response.json['error']

# Update detection tests
def test_update_detection(client):
    with client.application.app_context():
        detection = Detection.query.first()  # Accessing the database to get a detection
        updated_data = {
            "detection_type": "Vehicle",
            "confidence": 0.85,
            "image_data": "ffd8ffe000104a46494600010101006000600000"
        }
        response = client.put(f'/update_detection/{detection.detection_id}', json=updated_data)
        assert response.status_code == 200
        assert response.json['message'] == "Detection updated successfully"

def test_update_detection_not_found(client):
    response = client.put('/update_detection/9999', json={
        "detection_type": "Nonexistent Type",
        "confidence": 0.5,
        "image_data": "0000000000000000"
    })
    assert response.status_code == 404
    assert "Detection not found" in response.json['error']

# Delete detection tests
def test_delete_detection(client):
    # Step 1: Create a new company
    new_company = {"company_name": "New Company for Deletion"}
    company_response = client.post('/add_company', json=new_company)
    assert company_response.status_code == 201
    company_id = company_response.json['company_id']

    # Step 2: Create a new camera
    new_camera = {
        "company_id": company_id,
        "camera_name": "Test Camera",
        "location": "Building B, Floor 2"
    }
    camera_response = client.post('/add_camera', json=new_camera)
    assert camera_response.status_code == 201
    camera_id = camera_response.json['camera_id']

    # Step 3: Create a new user
    new_user = {
        "company_id": company_id,
        "first_name": "JaneDetection",
        "last_name": "Doe",
        "email": "DetectionTest@example.com",
        "role": "normal",
        "password_hash": "hashed_password"
    }
    user_response = client.post('/add_user', json=new_user)
    assert user_response.status_code == 201
    user_id = user_response.json['user_id']

    # Step 4: Add a new detection
    new_detection = {
        "camera_id": camera_id,
        "user_id": user_id,
        "detection_type": "Person",
        "confidence": 0.95,
        "image_data": "ffd8ffe000104a46494600010101006000600000"
    }
    detection_response = client.post('/add_detection', json=new_detection)
    detection_id = detection_response.json['detection_id']

    # Step 5: Delete the detection
    response = client.delete(f'/delete_detection/{detection_id}')
    assert response.status_code == 200
    assert response.json['message'] == "Detection deleted successfully"


def test_delete_company_not_found(client):
    response = client.delete('/delete_company/9999')
    assert response.status_code == 404
    assert "Company not found" in response.json['error']