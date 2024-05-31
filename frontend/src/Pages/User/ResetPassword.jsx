import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/User/Header/Header";
import register_bg from "./../../assets/Images/register_bg.jpg";
import login_form_bg from "./../../assets/Images/login_form_bg.jpg";
import axiosInstance from "../../Utils/AxiosInstance";
import { toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirm_password: "",
  });
  const { password, confirm_password } = newPassword;

  const handleOnChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = {
      password: password,
      confirm_password: confirm_password,
      uidb64: uid,
      token: token,
    };
    try {
      const response = await axiosInstance.patch("set-new-password/", data);
      const result = response.data;
      if (response.status === 200) {
        navigate("/login");
        toast.success(result.message);
      }
    } catch (error) {
      console.error("Error setting new password:", error);
      toast.error("Error setting new password.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: `url(${register_bg})` }}
    >
      <Header />
      <div className="container mx-auto mt-10">
        <div className="flex flex-col md:flex-row w-10/12  md:w-8/12 bg-sky-300 bg-opacity-70 mx-auto rounded-md overflow-hidden shadow-lg">
          <div
            className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${login_form_bg})` }}
          >
            <div className="mt-11 mb-auto">
              <h2
                className="text-white text-4xl font-bold "
                style={{ fontFamily: "cursive" }}
              >
                Forgot Password
              </h2>
              <p className="text-white" style={{ fontFamily: "cursive" }}>
                Are you planning a quick getaway? then you are at the right
                door.
              </p>
            </div>
          </div>
          <div className="w-full md:w-3/4 flex flex-col items-center justify-center py-16 px-12">
            <FaUser className="h-8 w-8 mr-2 text-white mt-14" />
            <p className="font-medium text-white">User Login </p>
            <form className="px-8 pt-4 pb-8" onSubmit={handleOnSubmit}>
              <div className="mb-2">
                <input
                  type="password"
                  placeholder=" Password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="password"
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
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
