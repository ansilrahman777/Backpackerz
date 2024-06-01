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

import PrivateRoute from './../Wrapper/PrivateRoute';
import AdminChat from '../Pages/Admin/AdminChat';

import AdminHotelBooking from '../Pages/Admin/AdminHotelBooking';
import AdminPackageBooking from '../Pages/Admin/AdminPackageBooking';
import AddPackageItinerary from '../Pages/Admin/AddPackageItinerary';
import AddPackageInclusion from '../Pages/Admin/AddPackageInclusion';
import AddPackageExclusion from '../Pages/Admin/AddPackageExclusion';
import AddPackageImages from '../Pages/Admin/AddPackageImages';
import AdminPackageDetails from '../Pages/Admin/AdminPackageDetails';
import AdminDestinationHotels from '../Pages/Admin/AdminDestinationHotels';
import AddHotelPage from '../Pages/Admin/AddHotelPage';
import AddHotelItinerary from '../Pages/Admin/AddHotelItinerary';
import AddHotelDetail from '../Pages/Admin/AddHotelDetail';
import AddHotelImage from '../Pages/Admin/AddHotelImage';
import UserList from '../Pages/Admin/UserList';



const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="/packages" element={<AdminPackage />} />
      <Route path="/package/package-details/:id" element={<AdminPackageDetails />} />

      <Route path="/add-package" element={<AddPackagePage />} />
  
      <Route path="/add-package-itinerary/:id" element={<AddPackageItinerary />} />
      <Route path="/add-package-inclusion/:id" element={<AddPackageInclusion />} />
      <Route path="/add-package-exclusion/:id" element={<AddPackageExclusion />} />
      <Route path="/add-package-images/:id" element={<AddPackageImages />} />

      <Route path="/packages/edit/:id" element={<EditPackagePage />} />


      <Route path="/destinations" element={<AdminDestinations />} />
      <Route path="/destinations/:destination_id/hotels" element={<AdminDestinationHotels />} />
      <Route path="/hotel/hotel-details/:hotel_id" element={<AdminHotelDetails />} />

      <Route path="/hotels/add-hotel/:destinationId" element={<AddHotelPage />} />

      <Route path="/add-hotel-itinerary/:id" element={<AddHotelItinerary />} />
      <Route path="/add-hotel-detail/:id" element={<AddHotelDetail />} />
      <Route path="/add-hotel-image/:id" element={<AddHotelImage />} />

      <Route path="/add-destination" element={<AddDestinations />} />
      <Route path="/destination/edit/:id" element={<EditDestination />} />

      <Route path="/hotel-booking" element={<AdminHotelBooking />} />
      <Route path="/package-booking" element={<AdminPackageBooking />} />
 
      

      <Route path="/users" element={<UserList />} />
      <Route path="/admin_chat" element={<AdminChat />} />
    </Routes>
  );
};

export default AdminRoutes;
