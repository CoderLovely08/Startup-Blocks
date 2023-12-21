import jwt from "jsonwebtoken";

// Constants for HTTP status codes
const HTTP_UNAUTHORIZED = 401;

// Constants for token configuration
const TOKEN_EXPIRATION = "1h";

/**
 * Generate a JWT token with the provided payload.
 * @param {object} payload - The data to be included in the JWT token.
 * @returns {string | null} - The generated JWT token or null if an error occurs.
 */
export const generateJwtToken = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });
    return token;
  } catch (error) {
    console.error(`Error in token generation: ${error.message}`);
    return null;
  }
};

/**
 * Middleware to verify the JWT token in the request.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware or route handler.
 * @returns {void}
 */
export const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.token;

    if (accessToken) {
      // Verify the access token
      const decodedToken = await jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );

      req.user = {
        userId: decodedToken.userId,
        userName: decodedToken.userName,
      };

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
