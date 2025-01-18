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