import express from "express";
import { config } from "dotenv";
config();

const app = express();

app.get("/", (req, res) => {
  try {
    res.json({
      message: "Hey there",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

app.listen(process.env.PORT || 3000, (err) => {
  if (err) console.error(err);
  console.log(
    `Server is running on port ${process.env.PORT} -> http://127.0.0.1:3000`
  );
});
