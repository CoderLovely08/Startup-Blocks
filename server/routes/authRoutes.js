import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  validateUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/tokenHandler.js";
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/validate").get(verifyToken, validateUser);

router.route("/logout").post(logoutUser);
export default router;
