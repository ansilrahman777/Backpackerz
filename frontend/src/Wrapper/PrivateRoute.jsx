import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  // Check if user is authenticated, you may replace this with your own authentication logic
  const isAuthenticated = true; // Example: You can replace this with your actual authentication check
  return isAuthenticated ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

export default PrivateRoute;
