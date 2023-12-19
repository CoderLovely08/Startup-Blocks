# Startup Blocks

Welcome to Startup Blocks, a directory for all startup details!

## Table of Contents

1. [Database](#database)
   - [UserInfo](#userinfo)
   - [StartupInfo](#startupinfo)
2. [Routes](#routes)
   - [Startup Routes](#startup-routes)
   - [Authentication Routes](#authentication-routes)
3. [Controllers](#controllers)
   - [Auth Controller](#auth-controller)
   - [Startup Controller](#startup-controller)
4. [Middleware](#middleware)
   - [Token Handler](#token-handler)

## Database

### UserInfo

```sql
CREATE TABLE UserInfo(
  user_id SERIAL PRIMARY KEY,
  user_full_name VARCHAR NOT NULL,
  user_email VARCHAR NOT NULL UNIQUE,
  user_password VARCHAR(20) NOT NULL
);
```

### StartupInfo

```sql
CREATE TABLE StartupInfo(
  startup_id SERIAL PRIMARY KEY,
  startup_name VARCHAR NOT NULL,
  startup_industry_vertical VARCHAR,
  startup_sub_vertical VARCHAR(20),
  startup_city VARCHAR,
  startup_investor_name VARCHAR,
  startup_investment_type VARCHAR NOT NULL DEFAULT 'Private Equity',
  startup_funding MONEY NOT NULL DEFAULT 0,
  startup_date DATE NOT NULL,
  startup_remarks VARCHAR,
  user_id INT NOT NULL DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES UserInfo(user_id)
);
```

## Routes

### Startup Routes

- `/api/startup/startups`: Fetch the first 10 startups and further filtering.
- `/api/startup/investments`: Fetch all unique investment types for startups.

### Authentication Routes

- `/api/auth/register`: Register a new user.
- `/api/auth/login`: Log in a user.

## Controllers

1. ### Auth Controller

   Handle user registration and login.

- #### Register User

  ```javascript
  /**
   * Controller function to handle user registration.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  export const registerUser = async (req, res) => {
    try {
      // Placeholder response for user registration route
      res.json({
        route: "Registration",
      });
    } catch (error) {
      // Handle errors and respond with an error message
      res.json({
        error: "Error occurred in registration route",
      });
    }
  };
  ```

- #### Login User

  ```javascript
  /**
   * Controller function to handle user login.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  export const loginUser = async (req, res) => {
    try {
      // Logic for user login
    } catch (error) {
      // Handle errors and respond with an error message
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  ```

2. ### Startup Controller

   Handle startup-related operations.

- #### Fetch All Startups

  ```javascript
  /**
   * Fetch all startups based on search, pagination, and filter criteria.
   * @route GET /startups
   * @param {string} search - The search string for filtering startup names.
   * @param {number} page - The page number for pagination (default: 1).
   * @param {number} pageSize - The number of startups per page (default: 10).
   * @param {string} filter - The filter criteria for startup investment types.
   * @returns {object} - The response JSON containing startup data.
   */
  export const fetchAllStartups = async (req, res) => {
    try {
      // Logic for fetching startups
    } catch (error) {
      // Handle errors and respond with an error message
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  ```

- #### Fetch All Investments

  ```javascript
  /**
   * Fetch all unique investment types for startups.
   * @route GET /investments
   * @returns {object} - The response JSON containing investment type data.
   */
  export const fetchAllInvestments = async (req, res) => {
    try {
      // Logic for fetching investment types
    } catch (error) {
      // Handle errors and respond with an error message
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  ```

## Middleware

1. ### Token Handler

   Handle JWT token generation and verification.

   ```javascript
   import jwt from "jsonwebtoken";

   // Constants for HTTP status codes
   const HTTP_UNAUTHORIZED = 401;

   // Constants for token configuration
   const TOKEN_EXPIRATION = "1h";

   /**
    * Generate a JWT token.
    * @param {object} payload - The payload to be included in the token.
    * @returns {string} - The generated JWT token.
    */
   export const generateJwtToken = async (payload) => {
     try {
       // Logic for token generation
     } catch (error) {
       console.error(`Error in token generation: ${error.message}`);
       return null;
     }
   };

   /**
    * Verify a JWT token.
    * @param {Object} req - Express request object.
    * @param {Object} res - Express response object.
    * @param {Function} next  - Express next function.
    */
   export const verifyToken = async (req, res, next) => {
     try {
       // Logic for token verification
     } catch (error) {
       console.error(`Error in token validation: ${error.message}`);
       res.status(HTTP_UNAUTHORIZED).json({
         statusCode: HTTP_UNAUTHORIZED,
         message: "Unauthorized: Token expired or invalid",
       });
     }
   };
   ```
