import RegisterPage from './Pages/User/RegisterPage'
import HomePage from './Pages/User/HomePage'
import LoginPage from './Pages/User/LoginPage'
import OtpVerficiation from './Pages/User/OtpVerficiation'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import Profile from './Pages/User/Profile'
import AdminLogin from './Pages/Admin/AdminLogin'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminPackage from './Pages/Admin/AdminPackage'
import AdminProfile from './Pages/Admin/AdminProfile'
import TripPage from './Pages/User/TripPage'
import TripdetailsPage from './Pages/User/TripdetailsPage'
import AddPackagePage from './Pages/Admin/AddPackagePage'
import ForgotPassword from './Pages/User/ForgotPassword'
import ResetPassword from './Pages/User/ResetPassword'
import EditPackagePage from './Pages/Admin/EditPackagePage'
import Destinations from './Pages/User/Destinations'
import DestinationDetails from './Pages/User/DestinationDetails'

function App() {
  return (
    <>
      <Router>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/otp/verify" element={<OtpVerficiation />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trip" element={<TripPage />} />
          <Route path="/destination" element={<Destinations />} />
          <Route path="/trip-details/:id" element={<TripdetailsPage />} />
          <Route path="/destination-details/:id" element={<DestinationDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset-confirm/:uid/:token/" element={<ResetPassword />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/packages" element={<AdminPackage />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/add-package" element={<AddPackagePage />} />
          <Route path="/admin/packages/edit/:id" element={<EditPackagePage />} />

          
        </Routes>
      </Router>
    </>
  )
}

export default App