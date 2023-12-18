import express from "express";
import cors from "cors";

import { config } from "dotenv";

// Setting up env file
config();

const app = express();
app.use(cors());
// Import routes
import authRouter from "./routes/authRoutes.js";
import startupRouter from "./routes/startupRoutes.js";

// Default route
app.get("/", (req, res) => {
  try {
    res.status(200).json({
      statusCode: 200,
      message: "Hey there",
    });
  } catch (error) {
    console.error(`Error in GET / route: ${error}`);
    res.status(501).json({
      statusCode: 501,
      message: "Internal Server Error",
    });
  }
});

// Authentication routes
app.use("/api/auth", authRouter);
app.use("/api/startup", startupRouter);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) console.error(err);
  console.log(
    `Server is running on port ${process.env.PORT} -> http://127.0.0.1:3000`
  );
});
