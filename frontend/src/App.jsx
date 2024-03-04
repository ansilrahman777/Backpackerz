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
import AdminPackageAdd from './Pages/Admin/AdminPackageAdd'
import TripPage from './Pages/User/TripPage'
import TripdetailsPage from './Pages/User/TripdetailsPage'

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
          <Route path="/trip-details/:id" element={<TripdetailsPage />} />


          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/packages" element={<AdminPackage />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/edit" element={<AdminPackageAdd />} />



        </Routes>
      </Router>
    </>
  )
}

export default App