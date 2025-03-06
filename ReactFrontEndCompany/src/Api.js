import axios from 'axios';

const API_URL = 'http://localhost:5000'; // API base URL

// Create an axios instance with a base URL for easier reuse
const API = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to add the token to headers (if available)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Attach the token to the request headers
  }
  return req;
}, (error) => {
  return Promise.reject(error);
});

// Function to get all users
export const getUsers = async () => {
  const response = await API.get('/get_users');
  return response.data;
};

// Function for user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    // If login is successful, store the session token
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token); // Store token in localStorage
    }

    return response.data; // Return the response (e.g., success message, user_id, etc.)
  } catch (error) {
    // Handle error response
    if (error.response) {
      return { error: error.response.data.error, status: error.response.status };
    } else if (error.request) {
      return { error: 'No response from server', status: null };
    } else {
      return { error: error.message, status: null };
    }
  }
};

export const fetchUserName = async () => {
  const userId = localStorage.getItem("userId"); // Get the userId from localStorage

  if (!userId) {
    throw new Error("User ID not found. Please log in.");
  }

  try {
    const response = await fetch(`${API_URL}/get_user_name?user_id=${userId}`);
    const data = await response.json();

    if (response.ok) {
      return `${data.firstName} ${data.lastName}`;
    } else {
      throw new Error(data.message || "An error occurred");
    }
  } catch (err) {
    throw new Error("An error occurred while fetching user data");
  }
};

// Get users for table based on admin id

export const fetchUsersByCompany = async (companyId) => {
  try {
    const response = await fetch(`${API_URL}/get_users/${companyId}`); // Pass companyId in the URL
    if (!response.ok) {
      throw new Error(`Failed to fetch users for company ID ${companyId}: ${response.statusText}`);
    }
    const data = await response.json(); // Assuming the API returns a JSON object with a "users" array
    return data.users; // Return the users array from the response
  } catch (error) {
    console.error(`Error fetching users for company ID ${companyId}:`, error);
    throw error; // Re-throw the error so it can be handled in the component
  }
};

// Add user

export const addUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/add_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add user");
    }

    const data = await response.json();
    return data; // Return success message or created user ID
  } catch (error) {
    console.error("Error adding user:", error);
    throw error; // Re-throw error to be handled in the calling code
  }
};

// Delete user

export const deleteUser = async (userId) => {
  try {
    // Get the currently logged-in user's ID from localStorage
    const loggedInUserId = localStorage.getItem('userId'); // Replace 'userId' with the key you're using

    // Check if the logged-in user is attempting to delete themselves
    if (loggedInUserId && parseInt(loggedInUserId, 10) === userId) {
      throw new Error('You cannot delete your own account.');
    }

    const response = await fetch(`${API_URL}/delete_user/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    const data = await response.json();
    return data; // You can return the response or just log the success message
  } catch (error) {
    console.error('Error in API call for deleting user:', error);
    throw error; // Throwing the error so it can be caught in the component
  }
};

// Edit user

export const editUser = async (userId, updatedData) => {
  try {
    // Destructure to avoid sending user_id in the update request
    const { user_id, ...dataToUpdate } = updatedData; 

    // Ensure only editable fields are sent (first_name, last_name, email, role)
    const allowedFields = ['first_name', 'last_name', 'email', 'role'];
    const filteredData = Object.keys(dataToUpdate)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = dataToUpdate[key];
        return obj;
      }, {});

    // Send the PUT request to update the user profile
    const response = await fetch(`${API_URL}/update_user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filteredData), // Send the updated data without user_id
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    const data = await response.json();
    return data; // Return the response or log the success message
  } catch (error) {
    console.error('Error in API call for editing user:', error);
    throw error; // Throwing the error so it can be caught in the component
  }
};

// Get Settings By ID

export const fetchSettingsById = async (companyId) => {
  try {
    const response = await fetch(`${API_URL}/get_settings/${companyId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch settings for company ID ${companyId}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.settings; // Return the settings object from the response
  } catch (error) {
    console.error(`Error fetching settings for company ID ${companyId}:`, error);
    throw error;
  }
};

// Get Detections By ID

export const fetchDetectionsById = async (companyId) => {
  try {
    const response = await fetch(`${API_URL}/get_detections_by_company/${companyId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch detections for company ID ${companyId}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.detections; // Return the detections object from the response
  } catch (error) {
    console.error(`Error fetching detection for company ID ${companyId}:`, error);
    throw error;
  }
};

// Register Company

export const createCompany = async (companyData) => {
  try {
    const response = await fetch(`${API_URL}/create_company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create company: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

// Get Cameras by id

// Get cameras for a company based on company ID
export const fetchCamerasByCompany = async (companyId) => {
  try {
    const response = await fetch(`${API_URL}/get_cameras/${companyId}`); // Pass companyId in the URL
    if (!response.ok) {
      throw new Error(`Failed to fetch cameras for company ID ${companyId}: ${response.statusText}`);
    }
    const data = await response.json(); // Assuming the API returns a JSON object with a "cameras" array
    return data.cameras; // Return the cameras array from the response
  } catch (error) {
    console.error(`Error fetching cameras for company ID ${companyId}:`, error);
    throw error; // Re-throw the error so it can be handled in the component
  }
};


// Add Camera

export const addCamera = async (camera) => {
  try {
    const response = await fetch(`${API_URL}/add_camera`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(camera),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add camera");
    }

    const data = await response.json();
    return data; // Return success message or created camera ID
  } catch (error) {
    console.error("Error adding camera:", error);
    throw error; // Re-throw error to be handled in the calling code
  }
};

// Delete camera

export const deleteCamera = async (cameraId) => {
  try {
    const response = await fetch(`${API_URL}/delete_camera/${cameraId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete camera');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in API call for deleting camera:', error);
    throw error;
  }
};

// Edit camera

export const editCamera = async (cameraId, updatedData) => {
  try {
    // Destructure to avoid sending camera_id in the update request
    const { camera_id, ...dataToUpdate } = updatedData; 

    // Ensure only editable fields are sent (camera_name, location)
    const allowedFields = ['camera_name', 'location'];
    const filteredData = Object.keys(dataToUpdate)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = dataToUpdate[key];
        return obj;
      }, {});

    // Send the PUT request to update the camera profile
    const response = await fetch(`${API_URL}/update_camera/${cameraId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filteredData), // Send the updated data without camera_id
    });

    if (!response.ok) {
      throw new Error('Failed to update camera');
    }

    const data = await response.json();
    return data; // Return the response or log the success message
  } catch (error) {
    console.error('Error in API call for editing camera:', error);
    throw error; // Throwing the error so it can be caught in the component
  }
};




// Export other functions like addUser, updateUser, etc., if needed
// export const addUser = async (user) => {
//   const response = await API.post('/users', user);
//   return response.data;
// };
// export const updateUser = async (id, user) => {
//   const response = await API.put(`/users/${id}`, user);
//   return response.data;
// };
// export const deleteUser = async (id) => {
//   const response = await API.delete(`/users/${id}`);
//   return response.data;
// };