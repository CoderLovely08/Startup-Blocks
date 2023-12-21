import { generateJwtToken } from "../middlewares/tokenHandler.js";
import { authenticateUser, createNewUser } from "../modules/authModule.js";

/**
 * Controller function to handle user registration.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const registerUser = async (req, res) => {
  try {
    const { userFullName, userEmail, userPassword } = req.body;

    const isCreated = await createNewUser(
      userFullName,
      userEmail,
      userPassword
    );
    // Response for user registration route
    res.json({
      success: isCreated.success,
      message: isCreated.message,
    });
  } catch (error) {
    console.error(`Error in POST /registration route: ${error}`);
    // Handle errors and respond with an error message
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Controller function to handle user login.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    // Use a service function to authenticate the user
    const authenticationResult = await authenticateUser(
      userEmail,
      userPassword
    );

    if (authenticationResult.authenticated) {
      // If the user is authenticated, generate a JWT token
      const token = await generateJwtToken({
        userId: authenticationResult.userId,
        userName: authenticationResult.userFullName,
      });

      // Set the JWT as an HttpOnly cookie for better security
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      // Respond with success and the token
      res.json({
        success: true,
        message: "Login Successful",
        userName: authenticationResult.userFullName,
      });
    } else {
      // If authentication fails, respond with an error message
      res.status(200).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error in POST /login route:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Logout the user by clearing the authentication token cookie.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const logoutUser = async (req, res) => {
  try {
    // Clear the authentication token cookie
    res.clearCookie("token", {
      expires: new Date(Date.now() + 0),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // Respond with a successful logout message
    res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    // Log the error and respond with a 500 Internal Server Error
    console.error("Error in POST /logout route:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Validate and respond with the authenticated user information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const validateUser = async (req, res) => {
  try {
    // Respond with the authenticated user information
    res.json({ success: true, user: req.user });
  } catch (error) {
    // Log the error and respond with a 500 Internal Server Error
    console.error("Error in GET /validate route:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
