import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './../Routes/AdminRoutes';
import AdminLogin from './../Pages/Admin/AdminLogin';
import PrivateRoute from './../Wrapper/PrivateRoute';
import { AuthContext } from './../Store/AuthContext';
import { useContext } from 'react';

const AdminWrapper = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/*" element={<PrivateRoute element={<AdminRoutes />} />} />
    </Routes>
  );
};

export default AdminWrapper;