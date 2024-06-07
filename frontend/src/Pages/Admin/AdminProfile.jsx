import axios from "axios";
import login_form from "./../../assets/imageAdmin/login_form.jpg";

import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminProfile() {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        base_url + "/api/admin_side/logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Logout successful");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      navigate("/admin/login");
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-cover">
      <div className="container mx-auto mt-5">
        <div className="flex flex-col md:flex-row w-10/12 mt-32  md:w-8/12 bg-sky-300 bg-opacity-70 mx-auto rounded-md overflow-hidden shadow-lg">
          <div
            className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${login_form})` }}
          >
            <div className="mt-20  mb-32">
              <h2
                className="text-white text-4xl font-bold "
                style={{ fontFamily: "cursive" }}
              >
                PROFILE
              </h2>
              <p className="text-white" style={{ fontFamily: "cursive" }}>
                Are you planning a quick getaway? then you are at the right door.
              </p>
            </div>
          </div>
          <div className="w-full md:w-3/4 flex flex-col items-center justify-center ">
            <FaUser className="h-8 w-8 mr-2 text-black mt-5" />
            <p className="font-medium text-black"> </p>
            <button
              className="text-white hover:text-gray-500"
              onClick={handleLogout}
            >
              <span>Logout</span> <IoLogOut className="inline-block" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
