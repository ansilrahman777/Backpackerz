import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import admin page components
import AdminDashboard from './../Pages/Admin/AdminDashboard';
import AdminProfile from './../Pages/Admin/AdminProfile';
import AdminPackage from './../Pages/Admin/AdminPackage';
import AddPackagePage from './../Pages/Admin/AddPackagePage';
import EditPackagePage from './../Pages/Admin/EditPackagePage';
import AdminDestinations from './../Pages/Admin/AdminDestinations';
import AdminDestinationDetail from './../Pages/Admin/AdminDestinationDetail';
import AddDestinations from './../Pages/Admin/AddDestinations';
import EditDestination from './../Pages/Admin/EditDestination';
import AdminHotelDetails from './../Pages/Admin/AdminHotelDetails';
import AdminHotelBooking from './../Pages/Admin/AdminHotelBooking';
import AdminPackageBooking from './../Pages/Admin/AdminPackageBooking';

import PrivateRoute from './../Wrapper/PrivateRoute';
import AdminChat from '../Pages/Admin/AdminChat';


// AdminRoutes component containing all the private routes
const AdminRoutes = () => {
  return (
    <Routes>
      {/* Private routes */}
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="/packages" element={<AdminPackage />} />
      <Route path="/add-package" element={<AddPackagePage />} />
      <Route path="/packages/edit/:id" element={<EditPackagePage />} />
      <Route path="/destinations" element={<AdminDestinations />} />
      <Route path="/destination/:id" element={<AdminDestinationDetail />} />
      <Route path="/add-destination" element={<AddDestinations />} />
      <Route path="/destination/edit/:id" element={<EditDestination />} />
      <Route path="/hotel_details/:id" element={<AdminHotelDetails />} />
      <Route path="/hotel_booking" element={<AdminHotelBooking />} />
      <Route path="/package_booking" element={<AdminPackageBooking />} />
      

      <Route path="/admin_chat" element={<AdminChat />} />
    </Routes>
  );
};

export default AdminRoutes;
