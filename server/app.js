import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { config } from "dotenv";

// Setting up env file
config();

const app = express();

// setting up middlewares
const corsOptions = {
  origin:
    process.env.NODE_ENV == "production"
      ? `${process.env.CLIENT_HOST_URL}`
      : "http://localhost:5173",
  credentials: true,
};

// app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

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
// API routes for Startup data
app.use("/api/startup", startupRouter);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) console.error(err);
  console.log(
    `Server is running on port ${process.env.PORT} -> http://127.0.0.1:3000`
  );
});
