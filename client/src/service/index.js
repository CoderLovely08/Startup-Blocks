import axios from "../config/axiosConfig";

/**
 * Base URL for authentication-related API endpoints.
 */
export const BASE_AUTH_URL =
  import.meta.env.VITE_ENV == "production"
    ? import.meta.env.VITE_PROD_BASE_AUTH_URL
    : import.meta.env.VITE_DEV_BASE_AUTH_URL;

/**
 * Base URL for startup-related API endpoints.
 */
export const BASE_STARTUP_URL =
  import.meta.env.VITE_ENV == "production"
    ? import.meta.env.VITE_PROD_BASE_STARTUP_URL
    : import.meta.env.VITE_DEV_BASE_STARTUP_URL;

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
      message: "Request Failed",
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
      const response = await axios.post(
        `${BASE_AUTH_URL}/login`,
        {
          userEmail: userEmail,
          userPassword: userPassword,
        },
        {
          withCredentials: true,
        }
      );
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
      message: "Request Failed",
    };
  }
};

/**
 * Logout the currently authenticated user.
 * @returns {Object} An object with the result of the logout operation.
 */
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      BASE_AUTH_URL + "/logout",
      {},
      { withCredentials: true }
    );

    return {
      success: response.status === 200,
      logoutTrue: response.data.success,
      message: response.data.message,
      response: response,
    };
  } catch (error) {
    return {
      success: false,
      message: "Request Failed",
    };
  }
};

/**
 * Validate the authentication status of the user.
 * @returns {Object} An object with the result of the user validation.
 */
export const validateUser = async () => {
  try {
    const response = await axios.get(BASE_AUTH_URL + "/validate", {
      withCredentials: true,
    });

    return {
      success: response.status == 200,
      userName: response.data?.user?.userName,
      message: "Good to go captain",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message:
        error.response?.status == 401
          ? "Kindly login to add new post"
          : "Request Failed",
    };
  }
};

/**
 * Create a new startup item based on the provided information.
 * @param {Object} startupInfo - Information about the new startup.
 * @returns {Object} An object with the result of the new startup item creation.
 */
export const postNewStartup = async (startupInfo) => {
  try {
    const pattern = /^[a-zA-Z0-9]+$/;

    if (!pattern.test(startupInfo.startupName)) {
      return {
        success: false,
        message: "Startup Name is not valid, use Alphanumeric characters only",
      };
    }

    if (!pattern.test(startupInfo.startupCity)) {
      return {
        success: false,
        message:
          "Investment type is not valid, use Alphanumeric characters only",
      };
    }

    if (!isFinite(parseInt(startupInfo.startupFundingAmount))) {
      return {
        success: false,
        message: "Funding amount is not valid, use numbers only",
      };
    }

    if (new Date(startupInfo.startupDate) > new Date()) {
      return {
        success: false,
        message: "Future date is not allowed",
      };
    }

    const response = await axios.post(
      `${BASE_STARTUP_URL}/add`,
      { startupInfo },
      { withCredentials: true }
    );

    return {
      success: response.status === 201,
      isPosted: response.data.success,
      message: response.data.message,
      response: response,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message:
        err?.response?.status == 401
          ? "Action not authorized"
          : err.response.data?.message,
    };
  }
};
