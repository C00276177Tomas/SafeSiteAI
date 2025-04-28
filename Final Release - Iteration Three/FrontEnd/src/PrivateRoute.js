import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken"); // Check for the token

  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;