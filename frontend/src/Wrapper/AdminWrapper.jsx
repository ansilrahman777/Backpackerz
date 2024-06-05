import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './../Routes/AdminRoutes';
import AdminLogin from './../Pages/Admin/AdminLogin';
import PrivateRoute from './../Wrapper/PrivateRoute';

const AdminWrapper = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/*" element={<PrivateRoute element={AdminRoutes} />} />
    </Routes>
  );
};

export default AdminWrapper;
