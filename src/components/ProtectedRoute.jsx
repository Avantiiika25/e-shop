import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

//// Wrapper component for private routes
const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);            // Get authentication token from Redux store
  const location = useLocation();                                  // Get current route location

  if (!token) {                        // If not logged in, redirect to login page 
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // Pass current location to return after login
      />
    );
  }
// If logged in, render the protected content
  return children;
};

export default ProtectedRoute;
