import React from 'react';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking if the user is an admin (from localStorage, API, etc.)
    const role = localStorage.getItem('role') === 'admin';

    setIsAdmin(role);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can display a loading indicator while checking
  }

  if (!isAdmin) {
    // Redirect to a different page if the user is not an admin
    return <Navigate to="/main" />;
  }

  return children; // Render the children if the user is an admin
};

export default AdminRoute;