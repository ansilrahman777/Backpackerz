import React, { useState, useEffect } from "react";
import Header from "../../Components/User/Header/Header";
import register_bg from "./../../assets/Images/register_bg.jpg";
import activate_bg from "./../../assets/Images/activate_bg.jpg";
import profile_img from "./../../assets/imageUser/profile.jpg";
import { IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../Utils/AxiosInstance";
import { FiEdit } from "react-icons/fi";

function Profile() {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;
  const user = JSON.parse(localStorage.getItem("user"));
  const refresh = localStorage.getItem("refresh");
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    mobile: user?.mobile || "",
    email: user?.email || "",
  });

  useEffect(() => {
    const jwt_access = localStorage.getItem("access");
    if (!jwt_access && !user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleLogOut = async () => {
    try {
      const res = await axiosInstance.post("/logout/", {
        refresh_token: refresh,
      });
  
      if (res.status === 204) {
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
      console.error("Logout error:", error);
      if (error.response && error.response.data) {
        console.error("Server response:", error.response.data);
      }
  
      // Clear tokens and redirect to login regardless of the error
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      navigate("/login");
      toast.error("Logout failed: " + (error.response?.data?.detail || error.message));
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.first_name.trim().length < 3) {
      toast.error("First name must be at least 3 characters long.");
      return;
    }
    if (formData.last_name.trim().length < 3) {
      toast.error("Last name must be at least 3 characters long.");
      return;
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Mobile number must be 10 digits long.");
      return;
    }

    try {
      const res = await axiosInstance.patch(
        `${base_url}/api/users/${user.user_id}/`,
        formData
      );
      if (res.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            first_name: formData.first_name,
            last_name: formData.last_name,
            mobile: formData.mobile,
            email: formData.email,
          })
        );
        setEditing(false);
        toast.success("User details updated successfully");
      }
    } catch (error) {
      console.error("Edit user error:", error);
      toast.error("Failed to update user details: " + error.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: `url(${register_bg})` }}
    >
      <Header />
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row w-10/12 mt-32 md:w-8/12 bg-sky-300 bg-opacity-70 mx-auto rounded-md overflow-hidden shadow-lg">
          <div
            className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${activate_bg})` }}
          >
            <div className="bg-white rounded-lg shadow-xl pb-8">
              <div className="flex flex-col rounded-full items-center mt-20">
                <img
                  src={profile_img}
                  className="w-10 border-white rounded-full"
                  alt="Profile"
                />
                <p className="text-gray-700 mr-2">
                  {editing
                    ? formData.first_name + " " + formData.last_name
                    : user?.first_name + " " + user?.last_name}
                </p>
              </div>
              <div className="w-full h-[200px] px-8 mt-4">
                <Link
                  to="/package-booking-list"
                  className="flex items-center my-1 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                >
                  PACKAGE BOOKING
                </Link>
                <Link
                  to="/hotel-booking-list"
                  className="flex items-center my-1 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                >
                  HOTEL BOOKING
                </Link>
              </div>
              <div className="flex-1 flex flex-col items-center px-8 mt-2">
                <div className="flex items-center ">
                  <button
                    className="flex items-center my-1 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
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
              <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
              {editing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled
                    />
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      id="mobile"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-4">
                  <p className="text-gray-600">
                    <span className="font-bold">Email:</span> {user?.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">First Name:</span>{" "}
                    {user?.first_name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">Last Name:</span>{" "}
                    {user?.last_name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">Mobile:</span> {user?.mobile}
                  </p>
                  <button
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    onClick={handleEdit}
                  >
                    <FiEdit className="inline-block mr-2" /> Edit
                  </button>
                </div>
              )}
            </div>
            <div className="border rounded-xl m-2 p-2 bg-green-600">
              <Link to="/chat">chat with us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
