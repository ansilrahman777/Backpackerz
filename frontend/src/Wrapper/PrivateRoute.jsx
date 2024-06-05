import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import dayjs from 'dayjs';
import { AuthContext } from './../Store/AuthContext';
import axios from 'axios';

const PrivateRoute = ({ element: Component }) => {
  const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG
  const { isAuthenticated, isAdmin, setIsAuthenticated, handleLogout } = useContext(AuthContext);
  const token = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');

  useEffect(() => {
    if (!isAuthenticated && token) {
      try {
        const decodedToken = jwtDecode(token);
        const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

        if (isExpired && refreshToken) {
          refreshAuthToken();
        }
      } catch (e) {
        console.error("Token validation error:", e);
      }
    }
  }, [isAuthenticated, token, refreshToken]);

  const refreshAuthToken = async () => {
    try {
      const response = await axios.post(base_url+'/api/token/refresh/', {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        const newToken = response.data.access;
        localStorage.setItem('access', newToken);
        setIsAuthenticated(true);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      handleLogout();
    }
  };

  return isAuthenticated && isAdmin ? Component : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
