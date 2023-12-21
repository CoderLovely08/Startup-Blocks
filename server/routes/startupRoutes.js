import express from "express";
import {
  createNewStartupItem,
  fetchAllDomain,
  fetchAllStartups,
} from "../controllers/startupController.js";
import { verifyToken } from "../middlewares/tokenHandler.js";

const router = express.Router();

// Route to get all startups
router.route("/startups").get(fetchAllStartups);

// Route to get all investment domains
router.route("/investments").get(fetchAllDomain);

// Route to add a new startup item, requires token verification
router.route("/add").post(verifyToken, createNewStartupItem);

export default router;
