# Startup Blocks

Welcome to Startup Blocks, a directory for all startup details!

- ## Backend

## Table of Contents for Backend

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
  user_password VARCHAR NOT NULL
);
```

### StartupInfo

```sql
CREATE TABLE StartupInfo(
  startup_id SERIAL PRIMARY KEY,
  startup_name VARCHAR NOT NULL,
  startup_industry_vertical VARCHAR,
  startup_sub_vertical VARCHAR,
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
- `/api/startup/add`: To add a new startup info.

### Authentication Routes

- `/api/auth/register`: Register a new user.
- `/api/auth/login`: Log in a user.
- `/api/auth/logout`: Logout a user.
- `/api/auth/validate`: Check token validity.

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

- #### Logout User

  ```javascript
  /**
   * Logout the user by clearing the authentication token cookie.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  export const logoutUser = async (req, res) => {
    try {
      // Logic for user logout
    } catch (error) {
      // Log the error and respond with a 500 Internal Server Error
      console.error("Error in POST /logout route:", error);

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  ```

- ### Validate User

  ```javascript
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
      console.error("Error in POST /validate route:", error);

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
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

- ### Create New Startup Card

```javascript
/**
 * Create a new startup item based on the provided information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const createNewStartupItem = async (req, res) => {
  try {
    // Logic for adding a new card item
  } catch (error) {
    console.error(`Error in POST /add route: ${error}`);
    // Log the error and respond with a 500 Internal Server Error
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
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


- ## Frontend 


### Table of Contents for Frontend

1. [React App Structure](#react-app-structure)
2. [Navigation](#navigation)
3. [Pages](#pages)
   - [Home Page](#home-page)
   - [Login Page](#login-page)
   - [Register Page](#register-page)
   - [Post Startup Page](#post-startup-page)
   - [404 Page](#not-found-page)
4. [Service Functions](#service-functions)
   - [Authentication Service](#authentication-service)
   - [Startup Service](#startup-service)

### React App Structure

The frontend of Startup Blocks is built using React. The app structure includes components for navigation, pages, and services for making API calls.

### Navigation

Navigation is handled by the `Nav` component, which is included in the `App` component. It provides links to navigate between different pages.

  ```jsx
  // Nav.jsx
  import { UserCircleIcon } from "@heroicons/react/24/solid";
  import axios from "axios";
  import { enqueueSnackbar } from "notistack";
  import React, { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { useAuth } from "../context/AuthContext";
  import { BASE_AUTH_URL, logoutUser } from "../service";

  import Button from "./Button";
  import SearchBar from "./SearchBar";

  const Nav = () => {
    const { user, logout, login } = useAuth();
    const navigateTo = useNavigate();

    // Validate user accessibility
    useEffect(() => {
      axios
        .get(BASE_AUTH_URL + "/validate", { withCredentials: true })
        .then((res) => login(res.data?.user?.userName))
        .catch((err) => null);
    }, []);

    // Handle logout operation for user
    const handleLogout = async () => {
      const result = await logoutUser();
      if (result.success) {
        navigateTo("/login");
        logout();
        enqueueSnackbar(result.message, { variant: "warning" });
      } else {
        enqueueSnackbar("Logout Rejected", { variant: "warning" });
      }
    };

    // Render component
    return (
      <header className="px-2 py-2 sticky top-0 z-50 w-full shadow-md bg-white-400 max-sm:h-20">
        <nav className="flex flex-1 justify-between items-center max-container">
          {/* Logo */}

          <Link to={"/"}>
            <p className="font-bold text-xl bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-white border-cyan-500 border hover:text-cyan-500 max-sm:text-sm max-sm:py-1 max-sm:px-2">
              Startup Blocks
            </p>
          </Link>

          <div className="flex flex-grow justify-center max-sm:absolute bottom-0 left-0 max-sm:w-screen px-2 mb-1">
            <SearchBar />
          </div>
          {user ? (
            <span className=" text-gray-600 text-sm flex items-center cursor-pointer">
              <UserCircleIcon className="h-8 text-cyan-500" />
              <span className="font-bold text-md underline"> {user}</span>
              <Button label={"Logout"} onClick={handleLogout} />
            </span>
          ) : (
            <div className="flex">
              <Link to={"/login"}>
                <Button label={"Login"} variant="outlined" />
              </Link>
              <Link to={"/register"}>
                <Button label={"Signup"} variant="contained" />
              </Link>
            </div>
          )}
        </nav>
      </header>
    );
  };

  export default Nav;
  ```

### Pages

- #### Home Page

  The `Home` component represents the main landing page of the application.

  ```jsx
  // Home.js
  import React from "react";

  const Home = () => {
    return (
      <div>
        <h1>Welcome to Startup Blocks!</h1>
        {/* Other content for the home page */}
      </div>
    );
  };

  export default Home;
  ```

- #### Login Page

  The `LoginPage` component represents the page for user login.

  ```jsx
  // LoginPage.js
  import React from "react";

  const LoginPage = () => {
    // Logic for user login
    return (
      <div>
        <h2>Login</h2>
        {/* Login form and logic */}
      </div>
    );
  };

  export default LoginPage;
  ```

- #### Register Page

  The `RegisterPage` component represents the page for user registration.

  ```jsx
  // RegisterPage.js
  import React from "react";

  const RegisterPage = () => {
    // Logic for user registration
    return (
      <div>
        <h2>Register</h2>
        {/* Registration form and logic */}
      </div>
    );
  };

  export default RegisterPage;
  ```

- #### Post Startup Page

  The `PostStartup` component represents the page for posting new startup information.

  ```jsx
  // PostStartup.js
  import React from "react";

  const PostStartup = () => {
    // Logic for posting new startup information
    return (
      <div>
        <h2>Post a New Startup</h2>
        {/* Form for posting new startup information */}
      </div>
    );
  };

  export default PostStartup;
  ```

- #### Not Found Page

  The `NotFoundPage` component represents the page for handling 404 errors.

  ```jsx
  // NotFoundPage.js
  import React from "react";

  const NotFoundPage = () => {
    return (
      <div>
        <h2>404 Not Found</h2>
        {/* Content for the 404 Not Found page */}
      </div>
    );
  };

  export default NotFoundPage;
  ```

### Service Functions

- #### Authentication Service

  The `authenticationService` provides functions for user authentication, including registration, login, logout, and validation.

  ```jsx
  // authenticationService.js
  import axios from "../config/axiosConfig";

  export const BASE_AUTH_URL =
    "https://combative-bat-life-jacket.cyclic.app/api/auth";

  export const registerUser = async (userName, userEmail, userPassword) => {
    try {
      // Logic for user registration
    } catch (error) {
      // Handle errors and respond
    }
  };

  export const loginUser = async (userEmail, userPassword) => {
    try {
      // Logic for user login
    } catch (error) {
      // Handle errors and respond
    }
  };

  export const logoutUser = async () => {
    try {
      // Logic for user logout
    } catch (error) {
      // Handle errors and respond
    }
  };

  export const validateUser = async () => {
    try {
      // Logic for user validation
    } catch (error) {
      // Handle errors and respond
    }
  };
  ```

#### Startup Service

The `startupService` provides functions for interacting with startup-related APIs, including fetching startups and posting new startup information.

```jsx
// startupService.js
import axios from "../config/axiosConfig";

export const BASE_STARTUP_URL =
  "https://combative-bat-life-jacket.cyclic.app/api/startup";

export const fetchAllStartups = async (search, page, pageSize, filter) => {
  try {
    // Logic for fetching startups
  } catch (error) {
    // Handle errors and respond
  }
};

export const fetchAllInvestments = async () => {
  try {
    // Logic for fetching investment types
  } catch (error) {
    // Handle errors and respond
  }
};

export const postNewStartup = async (startupInfo) => {
  try {
    // Logic for posting new startup information
  } catch (error) {
    // Handle errors and respond
  }
};
```

### Additional Notes

- The app uses the `react-router-dom` library for navigation and routing.
- The `SnackbarProvider` is used from the `notistack` library for displaying notifications.
- The `axios` library is used for making HTTP requests to the backend APIs.
- The app structure follows a modular approach, with components organized by their functionality.

This documentation provides an overview of the frontend structure and key components of the Startup Blocks application. 