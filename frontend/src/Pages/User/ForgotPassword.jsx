import register_bg from "./../../assets/Images/register_bg.jpg";
import login_form_bg from "./../../assets/Images/login_form_bg.jpg";
import Header from "../../Components/User/Header/Header";
import { FaUser } from "react-icons/fa";
// import Spinner from '../../Components/Spinner';
import { useState } from "react";
import axiosInstance from "../../Utils/AxiosInstance";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState(" ");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      const res = await axiosInstance.post("password-reset/", { email: email });
      if (res.status == 200) {
        toast.success("a link is reset password has sent to your email");
      }
      console.log(res);
      setEmail("");
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
              {/* {isLoading && <Spinner />} */}
              <div className="mb-2">
                <input
                  type="email"
                  placeholder=" Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-teal-800 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded-full w-full focus:outline-none focus:shadow-outline"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
