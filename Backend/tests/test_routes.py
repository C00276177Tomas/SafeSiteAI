from models import Company, Camera

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

def test_delete_company_not_found(client):
    response = client.delete('/delete_company/9999')
    assert response.status_code == 404
    assert "Company not found" in response.json['error']