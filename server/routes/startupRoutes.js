import express from "express";
import { fetchAllDomain, fetchAllStartups } from "../controllers/startupController.js";
const router = express.Router();

router.route("/startups").get(fetchAllStartups);

router.route("/investments").get(fetchAllDomain);

export default router;
