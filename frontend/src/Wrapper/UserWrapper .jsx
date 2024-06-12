import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes along with Route

import HomePage from './../Pages/User/HomePage'
import RegisterPage from './../Pages/User/RegisterPage'
import OtpVerification from './../Pages/User/OtpVerficiation'
import LoginPage from './../Pages/User/LoginPage'
import Profile from './../Pages/User/Profile'
import TripPage from './../Pages/User/TripPage'
import Destinations from './../Pages/User/Destinations'
import TripDetailsPage from './../Pages/User/TripdetailsPage'
import DestinationDetails from './../Pages/User/DestinationDetails'
import HotelDetails from './../Pages/User/HotelDetails'
import ForgotPassword from './../Pages/User/ForgotPassword'
import ResetPassword from './../Pages/User/ResetPassword'
import PackageBooking from '../Pages/User/PackageBooking';
import Chat from '../Pages/User/Chat';
import HotelBooking from '../Pages/User/HotelBooking';
import HotelConfirmBooking from '../Pages/User/HotelConfirmBooking';
import HotelBookingSuccess from '../Pages/User/HotelBookingSuccess';
import PackageBookingConfirmed from '../Pages/User/PackageBookingConfirmed';
import PackageBookingList from '../Pages/User/PackageBookingList';
import HotelBookingList from '../Pages/User/HotelBookingList';
import HotelBookingDetails from '../Pages/User/HotelBookingDetails';
import PackageBookingDetails from '../Pages/User/PackageBookingDetails';
import ErrorPage from '../Components/ErrorPage';
import PrivacyPolicy from '../Pages/User/PrivacyPolicy';

const UserWrapper = () => {
  return (
    <>
      <Routes> {/* Wrap all Route components inside Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp/verify" element={<OtpVerification />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trip" element={<TripPage />} />
        <Route path="/destination" element={<Destinations />} />
        <Route path="/trip-details/:id" element={<TripDetailsPage />} />
        <Route path="/destination-details/:id" element={<DestinationDetails />} />


        <Route path="/hotel-detail/:id" element={<HotelDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/api/password-reset-confirm/:uid/:token/" element={<ResetPassword />} />

        <Route path="/chat" element={<Chat />} />

        <Route path="/hotel-booking" element={<HotelBooking/>} />
        <Route path="/hotel-booking-details/:bookingId" element={<HotelConfirmBooking/>} />
        <Route path="/hotelBookingSuccess" element={<HotelBookingSuccess/>} />
        <Route path="/hotel-booking-list" element={<HotelBookingList />} />
        <Route path="/hotel-booking-view/:id" element={<HotelBookingDetails/>} />

        <Route path="/package-booking" element={<PackageBooking />} />
        <Route path="/package-booking-confirmed/:booking_id" element={<PackageBookingConfirmed />} />
        <Route path="/package-booking-list" element={<PackageBookingList />} />
        <Route path="/package-booking-view/:id" element={<PackageBookingDetails />} />

        <Route path="*" element={<ErrorPage />}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
      </Routes>
    </>
  );
}

export default UserWrapper;
