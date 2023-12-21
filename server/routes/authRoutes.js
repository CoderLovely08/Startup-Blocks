import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  validateUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/tokenHandler.js";

const router = express.Router();

// Route to register a new user
router.route("/register").post(registerUser);

// Route to login an existing user
router.route("/login").post(loginUser);

// Route to validate and get information about an authenticated user, requires token verification
router.route("/validate").get(verifyToken, validateUser);

// Route to log out the currently authenticated user
router.route("/logout").post(logoutUser);

export default router;
