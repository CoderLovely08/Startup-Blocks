import { generateJwtToken } from "../middlewares/tokenHandler.js";
import { authenticateUser } from "../modules/auth.js";

export const registerUser = async (req, res) => {
  try {
    res.json({
      route: "Registration",
    });
  } catch (error) {
    res.json({
      error: "Error occured in registration route",
    });
  }
};

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
        // httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
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
    console.error("Error in login route:", error);

    // Handle other errors and respond with an appropriate message
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
