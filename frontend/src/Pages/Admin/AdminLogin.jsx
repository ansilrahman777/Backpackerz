import login_form from "./../../assets/imageAdmin/login_form.jpg";

import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "./../../Store/AuthContext";

function AdminLogin() {
  const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        base_url+"/api/admin_side/login/",
        {
          email: email,
          password: password,
        }
      );
      const { access, refresh, user } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      setIsAuthenticated(true);
      navigate("/admin/dashboard");
      toast.success("Login successful");
    } catch (error) {
      toast.error("Invalid email or password ");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-cover">
        <div className="container mx-auto mt-24">
          <div className="flex flex-col md:flex-row w-10/12  md:w-8/12 bg-sky-300 bg-opacity-70 mx-auto rounded-md overflow-hidden shadow-lg">
            <div
              className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${login_form})` }}
            >
              <div className="mt-11 mb-auto">
                {/* <h2
                  className="text-black text-4xl font-bold "
                  style={{ fontFamily: "cursive" }}
                >
                  ADMIN LOGIN
                </h2> */}
              </div>
            </div>
            <div className="w-full md:w-3/4 flex flex-col items-center justify-center py-16 px-12">
              <FaUser className="h-8 w-8 mr-2 text-black mt-14" />
              <p className="font-medium text-black">Admin Login </p>
              <form className="px-8 pt-4 pb-8" onSubmit={handleLogin}>
                <div className="mb-2">
                  <input
                    type="email"
                    value={email}
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="password"
                    value={password}
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-teal-800 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded-full w-full focus:outline-none focus:shadow-outline"
                  >
                    LOGIN
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

export default AdminLogin;
