import Header from "../../Components/User/Header/Header";
import register_bg from "./../../assets/Images/register_bg.jpg";
import activate_bg from "./../../assets/Images/activate_bg.jpg";
import profile_img from "./../../assets/imageUser/profile.jpg";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, } from "react";
import axios from "axios";
import axiosInstance from "../../Utils/AxiosInstance";
import { FiEdit } from "react-icons/fi";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const jwt_acess = JSON.parse(localStorage.getItem("access"));
  const refresh = JSON.parse(localStorage.getItem("refresh"));
  const navigate = useNavigate();

  useEffect(() => {
    
  


    if (jwt_acess === null && !user) {
      navigate("/login");
    } else {
      getSomeData();
    }
  }, [jwt_acess, navigate, user]);

  const handleLogOut = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/logout/", {
        refresh_token: refresh,
      });

      if (res.status === 200 || res.status === 204) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        navigate("/login");
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
      <div
        className="min-h-screen bg-cover"
        style={{ backgroundImage: `url(${register_bg})` }}
      >
        <Header />
        <div className="container mx-auto ">
          <div className="flex flex-col md:flex-row w-10/12 mt-32  md:w-8/12 bg-sky-300 bg-opacity-70 mx-auto rounded-md overflow-hidden shadow-lg">
            <div
              className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${activate_bg})` }}
            >
              {/* <div className="mt-20  mb-32">  
                  <h2 className='text-white text-4xl font-bold ' style={{ fontFamily: 'cursive' }}>PROFILE</h2>
                  <p className='text-white' style={{ fontFamily: 'cursive' }}>Are you planning a quick getaway? then you are at theright door.</p>
              </div> */}
              <div className="bg-white rounded-lg shadow-xl pb-8">
                <div className="w-full h-[200px]">
                  <img
                    src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                    className="w-full h-full rounded-tl-lg rounded-tr-lg"
                  />
                </div>
                <div className="flex flex-col rounded-full items-center -mt-20">
                  <img
                    src={profile_img}
                    className="w-40 border-white rounded-full"
                  />

                  <p className="text-gray-700">{user?.name}</p>
                </div>
                <div className="flex-1 flex flex-col items-center px-8 mt-2">
                  <div className="flex items-center ">
                    <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                    onClick={handleLogOut}
                    >
                      <span>Logout</span> <IoLogOut className="inline-block" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/4 flex flex-col items-center justify-center ">
              <div className="flex-2 bg-white rounded-lg shadow-xl p-8">
                <h4 className="text-xl text-gray-900 font-bold">
                  Personal Info
                </h4>
                <ul className="mt-2 text-gray-700">
                  <li className="flex border-y py-2">
                    <span className="font-bold w-24">Full name:</span>
                    <span className="text-gray-700">{user?.name}</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Mobile:</span>
                    <span className="text-gray-700">{user?.mobile}</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Email:</span>
                    <span className="text-gray-700">
                    {user?.email}
                    </span>
                  </li>
                 
                </ul>
                <div className="flex-1 flex flex-col items-center px-8 mt-2">
                  <div className="flex items-center ">
                    <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                    
                    >
                      <span>Edit</span> <FiEdit className="inline-block" />
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
