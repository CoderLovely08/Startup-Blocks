import pool from "../config/dbConfig.js";
import bcrypt from "bcrypt";

/**
 * Authenticate a user based on email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<{ authenticated: boolean, userId?: number }>} A promise that resolves to an object with the authentication result and, if successful, the user ID.
 */
export const authenticateUser = async (email, password) => {
  try {
    // Query to retrieve user information based on email
    const query = {
      text: `SELECT * FROM UserInfo 
            WHERE user_email = $1`,
      values: [email],
    };

    // Execute the query
    const { rows, rowCount } = await pool.query(query);

    // Check if exactly one user is found
    if (rowCount === 1) {
      // Compare the provided password with the hashed password in the database
      const result = await bcrypt.compare(password, rows[0].user_password);

      // Return the result of the comparison along with the user ID if successful
      return {
        authenticated: result,
        userId: result ? rows[0].user_id : undefined,
        userFullName: result ? rows[0].user_full_name : undefined,
      };
    } else {
      // If no user or multiple users are found, authentication fails
      return { authenticated: false };
    }
  } catch (error) {
    // Handle errors and log them
    console.error(`Error in authenticateUser() call: ${error}`);
    return { authenticated: false };
  }
};
