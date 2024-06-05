import axios from "axios";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";

const token = localStorage.getItem("access") || "";
const refresh_token = localStorage.getItem("refresh") || "";
const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG

const baseUrl = base_url+"/api/";
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : null,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
    const user = jwtDecode(token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) {
      return req;
    } else {
      try {
        const res = await axios.post(`${baseUrl}/token/refresh/`, {
          refresh: refresh_token,
        });
        if (res.status === 200) {
          localStorage.setItem("access", res.data.access);
          req.headers.Authorization = `Bearer ${res.data.access}`;
          return req;
        } else {
          const logoutRes = await axios.post(`${baseUrl}/logout/`, {
            refresh_token: refresh_token,
          });
          if (logoutRes.status === 200) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
      }
    }
  }
  return req;
});

export default axiosInstance;
