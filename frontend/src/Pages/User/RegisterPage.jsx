import Header from '../../Components/User/Header/Header';
import register_bg from './../../assets/Images/register_bg.jpg';
import register_form_bg from './../../assets/Images/register_form_bg.jpg';
import { FaUser } from 'react-icons/fa';
// import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from '../../Components/Spinner';
import { useEffect } from 'react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
  });

  const handleSigninWithGoogle = async (response) => {
    const payload = response.credential;
    try {
      const server_res = await axios.post("http://127.0.0.1:8000/api/google/", { 'access_token': payload });
      console.log(server_res);
      // const {email,full_name}=server_res
      // console.log(access_token.email);
      console.log(server_res.data.access_token.access_token);
      console.log(server_res.data.access_token.refresh_token);
      
      // Check if response data exists and contains the expected properties
      if (server_res) {
        const user = {
          email: server_res.data.access_token.email,
          name: server_res.data.access_token.full_name
        };
  
        if (server_res.status === 200) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("access", JSON.stringify(server_res.data.access_token.access_token
            ));
          localStorage.setItem("refresh", JSON.stringify(server_res.data.access_token.refresh_token
            )); // If available
          navigate('/');
          toast.success("Login successful");
        }
      } else {
        toast.error("An error occurred while signing in with Google. Please try again later.");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("An error occurred while signing in with Google. Please try again later.");
    }
  };
  

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleSigninWithGoogle
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "medium", text: "continue_with", shape: "circle", width: "250" }
    );
  }, []);
  

  const { first_name, last_name, email, mobile, password, confirm_password } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email || !first_name || !last_name || !mobile || !password || !confirm_password) {
      toast.error("All fields are required");
      
    } else if (first_name.length < 3) {
      toast.error("First name must be at least 3 characters long");
    } else if (!validateEmail(email)) {
      toast.error("Invalid email address");
    } else if (!validateMobile(mobile)) {
      toast.error("Invalid mobile number");
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
    } else if (password !== confirm_password) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/register/", formData);
        const response = res.data;
        if (res.status === 201) {
          navigate("/otp/verify");
          toast.success(response.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.email) {
          toast.error("Email already exists. Please use a different email address.");
        }else if (error.response && error.response.status === 400 && error.response.data.mobile) {
          toast.error("mobile already exists. Please use a different mobile Number.");
        } else {
          console.error("Registration error:", error);
          toast.error("Registration failed. Please try again later.");
        }
      }finally {
        setIsLoading(false); // Set isLoading back to false after submission
      }
    }
  };
  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validateMobile = (mobile) => {
    // Regular expression for mobile number validation
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };
  
  

  return (
    <>
      <div className='min-h-screen bg-cover' style={{ backgroundImage: `url(${register_bg})` }}>
        <Header />
        <div className='container mx-auto mt-10'>
          <div className="flex flex-col md:flex-row w-10/12 md:w-8/12 bg-sky-950 bg-opacity-90 mx-auto rounded-md overflow-hidden shadow-lg">
            <div className="w-full md:w-3/4 flex flex-col items-center justify-center py-16 px-12">
              <FaUser className="h-8 w-8 mr-2 text-white" />
              <p className='font-medium text-white'>Signup to Register</p>
              {isLoading && <Spinner/>}
              <form className="px-8 pt-4 pb-8" onSubmit={handleOnSubmit}>
                <div className="mb-2">
                  <input
                    type='text'
                    placeholder=' First Name'
                    name='first_name'
                    value={first_name}
                    onChange={handleOnChange}
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type='text'
                    placeholder=' Last Name'
                    name='last_name'
                    value={last_name}
                    onChange={handleOnChange}
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type='email'
                    placeholder=' Email'
                    name='email'
                    value={email}
                    onChange={handleOnChange}
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type='tel'
                    placeholder=' Mobile (10 digits)'
                    name='mobile'
                    value={mobile}
                    onChange={handleOnChange}
                    pattern="[0-9]{10}"
                    title="Mobile number must be 10 digits"
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type='password'
                    placeholder="Password (min. 6 characters)"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    minLength="6"
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type='password'
                    placeholder="Confirm Password"
                    name="confirm_password"
                    value={confirm_password}
                    onChange={handleOnChange}
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-teal-800 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded-full w-full focus:outline-none focus:shadow-outline"
                  >
                    SIGN UP
                  </button>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <hr className="border-t border-gray-300 w-full" />
                  <span className="px-3 text-white text-xs">OR</span>
                  <hr className="border-t border-gray-300 w-full" />
                </div>

                <div className="relative mt-2" id="signInDiv"></div>

                <div className="flex items-center justify-center mt-4">
                  <div className="text-center">
                    <p className="text-white">Already Have a account?</p>
                    <p>
                      <Link to="/login" className="text-blue-500 hover:text-blue-700">
                        Login Here
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${register_form_bg})` }}>
              <div className="mt-11 mb-auto">
                <h2 className='text-white text-4xl font-bold ' style={{ fontFamily: 'cursive' }}>SIGNUP</h2>
                <p className='text-white' style={{ fontFamily: 'cursive' }}>Are you planning a quick getaway? then you are at theright door.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
