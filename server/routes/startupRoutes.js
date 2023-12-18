import express from "express";
import { fetchAllStartups } from "../controllers/startupController.js";
const router = express.Router();

router.route("/startups").get(fetchAllStartups);

export default router;
