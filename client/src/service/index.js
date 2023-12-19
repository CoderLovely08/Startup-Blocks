import axios from "axios";

export const BASE_AUTH_URL = "http://127.0.0.1:3000/api/auth";
export const BASE_STARTUP_URL = "http://localhost:3000/api/startup";

export const registerUser = async (userName, userEmail, userPassword) => {
  try {
    if (userName && userEmail && userPassword) {
      const response = await axios.post(`${BASE_AUTH_URL}/register`, {
        userFullName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
      });
      return {
        success: response.status === 200,
        data: response.data,
        response: response,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Service Down",
    };
  }
};
