import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import dayjs from 'dayjs';
import { AuthContext } from './../Store/AuthContext';
import axios from 'axios';

const PrivateRoute = ({ element: Component }) => {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;
  const { isAuthenticated, setIsAuthenticated, handleLogout } = useContext(AuthContext);
  const [isAuthChecked, setIsAuthChecked] = useState(false); 
  const token = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

          if (isExpired && refreshToken) {
            await refreshAuthToken();
          } else {
            if (user && user.admin) {
              setIsAuthenticated(true);
            } else {
              handleLogout();
            }
          }
        } catch (e) {
          console.error("Token validation error:", e);
          handleLogout();
        }
      } else {
        handleLogout();
      }
      setIsAuthChecked(true); // Set the auth check as completed
    };

    verifyToken();
  }, [token, refreshToken]);

  const refreshAuthToken = async () => {
    try {
      const response = await axios.post(`${base_url}/api/token/refresh/`, {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        const newToken = response.data.access;
        localStorage.setItem('access', newToken);
        const decodedToken = jwtDecode(newToken);
        if (user && user.admin && dayjs.unix(decodedToken.exp).diff(dayjs()) >= 1) {
          setIsAuthenticated(true);
        } else {
          handleLogout();
        }
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      handleLogout();
    }
  };

  if (!isAuthChecked) {
    // Render a loading spinner or placeholder while the auth check is in progress
    return <div>Loading...</div>;
  }

  return isAuthenticated && user?.admin ? <Component /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
