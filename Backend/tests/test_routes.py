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