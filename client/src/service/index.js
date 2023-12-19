import axios from "axios";

/**
 * Base URL for authentication-related API endpoints.
 */
export const BASE_AUTH_URL = "http://127.0.0.1:3000/api/auth";

/**
 * Base URL for startup-related API endpoints.
 */
export const BASE_STARTUP_URL = "http://localhost:3000/api/startup";

/**
 * Register a new user.
 * @param {string} userName - The full name of the user.
 * @param {string} userEmail - The email of the user.
 * @param {string} userPassword - The password of the user.
 * @returns {Object} - Object containing success status, data, and response.
 */
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

/**
 * Log in an existing user.
 * @param {string} userEmail - The email of the user.
 * @param {string} userPassword - The password of the user.
 * @returns {Object} - Object containing success status, data, and response.
 */
export const loginUser = async (userEmail, userPassword) => {
  try {
    if (userEmail && userPassword) {
      const response = await axios.post(`${BASE_AUTH_URL}/login`, {
        userEmail: userEmail,
        userPassword: userPassword,
      });
      return {
        success: response.status === 200,
        loginTrue: response.data.success,
        data: response.data,
        response: response,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Network Error",
    };
  }
};
