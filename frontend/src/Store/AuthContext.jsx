import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import dayjs from 'dayjs';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

        if (!isExpired) {
          setIsAuthenticated(true);
        } else if (refreshToken) {
          // Attempt to refresh the token
          // This part will require additional logic to handle token refresh
        }
      } catch (e) {
        console.error("Token validation error:", e);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
