import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/tokenHandler.js";
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/test").get(verifyToken, (req, res) => res.json({ hi: "hi" }));

export default router;
