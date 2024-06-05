import { FaUser } from "react-icons/fa";
import Header from "../../Components/User/Header/Header";
import register_bg from "./../../assets/Images/register_bg.jpg";
import activate_bg from "./../../assets/Images/activate_bg.jpg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function OtpVerficiation() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp) {
      const response = await axios.post(
        base_url+"/api/verify-email/",
        { otp: otp }
      );
      if (response.status === 200) {
        navigate("/login");
        toast.success(response.data.message);
      }
    }
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover"
        style={{ backgroundImage: `url(${register_bg})` }}
      >
        <Header />
        <div className="container mx-auto mt-5">
          <div className="flex flex-col md:flex-row w-10/12 mt-32  md:w-8/12 bg-sky-300 bg-opacity-70 mx-auto rounded-md overflow-hidden shadow-lg">
            <div
              className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${activate_bg})` }}
            >
              <div className="mt-20  mb-32">
                <h2
                  className="text-white text-4xl font-bold "
                  style={{ fontFamily: "cursive" }}
                >
                  Verify
                </h2>
                <p className="text-white" style={{ fontFamily: "cursive" }}>
                  Are you planning a quick getaway? then you are at theright
                  door.
                </p>
              </div>
            </div>
            <div className="w-full md:w-3/4 flex flex-col items-center justify-center ">
              <FaUser className="h-8 w-8 mr-2 text-black mt-5" />
              <p className="font-medium text-black">Verify Your Account </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder=" OTP"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="flex items-center mt-4 justify-center">
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
    </>
  );
}

export default OtpVerficiation;
