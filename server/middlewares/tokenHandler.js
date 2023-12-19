import jwt from "jsonwebtoken";

// Constants for HTTP status codes
const HTTP_UNAUTHORIZED = 401;

// Constants for token configuration
const TOKEN_EXPIRATION = "1h";

export const generateJwtToken = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });
    return token;
  } catch (error) {
    console.error(`Error in token generation: ${error.message}`);
    return null;
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.token;

    if (accessToken) {
      // Verify the access token
      const decodedToken = await jwt.verify(
        accessToken,
        process.env.TOKEN_SECRET
      );

      // Continue to the next middleware or route handler
      next();
    } else {
      // No token provided
      res.status(HTTP_UNAUTHORIZED).json({
        statusCode: HTTP_UNAUTHORIZED,
        message: "Unauthorized: Token not provided",
      });
    }
  } catch (error) {
    console.error(`Error in token validation: ${error.message}`);
    res.status(HTTP_UNAUTHORIZED).json({
      statusCode: HTTP_UNAUTHORIZED,
      message: "Unauthorized: Token expired or invalid",
    });
  }
};
