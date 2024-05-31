import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import dayjs from 'dayjs';

const PrivateRoute = ({ element: Component }) => {
  const token = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');
  let isAuthenticated = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

      if (!isExpired) {
        isAuthenticated = true;
      } else if (refreshToken) {
        // Attempt to refresh the token
        // This part will require additional logic to handle token refresh
      }
    } catch (e) {
      console.error("Token validation error:", e);
    }
  }

  return isAuthenticated ? Component : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;


