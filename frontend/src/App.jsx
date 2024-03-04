import RegisterPage from './Pages/RegisterPage'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import OtpVerficiation from './Pages/OtpVerficiation'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'


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
        </Routes>
      </Router>
    </>
  )
}

export default App