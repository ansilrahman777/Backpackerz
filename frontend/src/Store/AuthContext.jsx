import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import dayjs from 'dayjs';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

        if (!isExpired) {
          setIsAuthenticated(true);
          setIsAdmin(user.admin);
        } else if (refreshToken) {
          refreshAuthToken(refreshToken, user);
        }
      } catch (e) {
        console.error("Token validation error:", e);
      }
    }
  }, []);

  const refreshAuthToken = async (refreshToken, user) => {
    try {
      const response = await axios.post(base_url + '/api/token/refresh/', {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        const newToken = response.data.access;
        localStorage.setItem('access', newToken);
        const decodedToken = jwtDecode(newToken);
        setIsAuthenticated(true);
        setIsAdmin(user.admin);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, setIsAuthenticated, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
