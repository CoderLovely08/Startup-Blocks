import axios from "axios";
import cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    if (token) {
        // console.log(token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Ensure credentials are sent with cross-origin requests
instance.defaults.withCredentials = true;

export default instance;
