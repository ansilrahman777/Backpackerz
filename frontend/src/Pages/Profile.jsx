import { FaUser } from "react-icons/fa"
import Header from "../Components/User/Header/Header"
import register_bg from './../assets/Images/register_bg.jpg';
import activate_bg from './../assets/Images/activate_bg.jpg';
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';
import axiosInstance from "../Utils/AxiosInstance";

function Profile() {

    const user = JSON.parse(localStorage.getItem('user'));
    const jwt_acess = JSON.parse(localStorage.getItem('access'));
    const refresh = JSON.parse(localStorage.getItem('refresh'));
    const navigate = useNavigate();

    useEffect(() => {
        if (jwt_acess === null && !user) {
            navigate('/login')
        } else {
            getSomeData();
        }
    }, [jwt_acess,navigate, user]);

    const handleLogOut = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/logout/", { "refresh_token": refresh });
    
            if (res.status === 200 || res.status === 204) {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                localStorage.removeItem('user');
                navigate('/login');
                toast.success("Logout successful");
            } else {
                console.error("Unexpected status code:", res.status);
                toast.error("Logout failed: Unexpected status code");
            }
        } catch (error) {
            if (error.response) {
                console.error("Error response from server:", error.response.data);
                toast.error("Logout failed: " + error.response.data.detail);
            } else if (error.request) {
                console.error("No response received:", error.request);
                toast.error("Logout failed: No response received");
            } else {
                console.error("Error setting up request:", error.message);
                toast.error("Logout failed: Error setting up request");
            }
        }
    };
    

    const getSomeData = async () => {
        try {
            const res = await axiosInstance.get("logintest/");
            if (res.status === 200) {
                console.log(res.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


  return (
    
    <>
      <div className='min-h-screen bg-cover' style={{ backgroundImage: `url(${register_bg})` }}>
      <Header/>
        <div className='container mx-auto mt-5'>
          <div className="flex flex-col md:flex-row w-10/12 mt-32  md:w-8/12 bg-sky-300 bg-opacity-70 mx-auto rounded-md overflow-hidden shadow-lg">
            <div className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${activate_bg})` }}>
              <div className="mt-20  mb-32">  
                  <h2 className='text-white text-4xl font-bold ' style={{ fontFamily: 'cursive' }}>PROFILE</h2>
                  <p className='text-white' style={{ fontFamily: 'cursive' }}>Are you planning a quick getaway? then you are at theright door.</p>
              </div>
            </div>
            <div className="w-full md:w-3/4 flex flex-col items-center justify-center ">
                <FaUser className="h-8 w-8 mr-2 text-black mt-5" />
                <p className='font-medium text-black'> </p>
                <button className="text-white hover:text-gray-500" onClick={handleLogOut}>
                    <span>Logout</span> <IoLogOut className="inline-block" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile