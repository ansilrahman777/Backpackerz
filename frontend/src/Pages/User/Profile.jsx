import React, { useState, useEffect } from "react";
import Header from "../../Components/User/Header/Header";
import Footer from "../../Components/User/Footer/Footer";
import { IoLogOut } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../Utils/AxiosInstance";

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

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      navigate("/login");
      toast.error("Logout ");
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
    <>
      <div className="min-h-screen bg-cover">
        <Header />
        <div className="flex h-auto mt-44 gap-3 p-8">
          <div className="w-2/5 h-auto border-2 rounded-lg">
            <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700 h-full">
              <Link
                role="button"
                to='/profile'
                tabIndex="0"
                className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              >
                <div className="grid place-items-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Profile
              </Link>
              <Link
                to='/hotel-booking-list'
                role="button"
                tabIndex="0"
                className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              >
                <div className="grid place-items-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Hotel Booking
              </Link>
              <Link
                to="/package-booking-list"
                role="button"
                tabIndex="0"
                className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              >
                <div className="grid place-items-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Package Booking
              </Link>
              <div className="flex-grow"></div>
              <div
                onClick={handleLogOut}
                role="button"
                tabIndex="0"
                className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none mt-auto"
              >
                <div className="grid place-items-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Log Out
              </div>
            </nav>
          </div>
          <div className="border-2 w-full h-full rounded-lg p-8">
            <h3 className="text-2xl text-center font-semibold mb-4">
              My Profile
            </h3>
            <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
            {editing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      className="w-full border border-gray-300 p-2 rounded mt-1"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      className="w-full border border-gray-300 p-2 rounded mt-1"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Phone Number</label>
                    <input
                      type="text"
                      name="mobile"
                      className="w-full border border-gray-300 p-2 rounded mt-1"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full border border-gray-300 p-2 rounded mt-1"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled
                    />
                  </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700">First Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                    value={formData.first_name}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Last Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                    value={formData.last_name}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                    value={formData.mobile}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                    value={formData.email}
                    readOnly
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    onClick={handleEdit}
                  >
                    <FiEdit className="inline-block mr-2" /> Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
