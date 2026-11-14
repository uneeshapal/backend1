import express from "express";
import router from "./approuter/routing.js";
import "./backconnection/db.js";
import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

configDotenv();

const app = express();

const myport = process.env.PORT || 9000;
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL || "https://clint11-1.onrender.com",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    success: connected,
    database: connected ? "connected" : "disconnected",
  });
});

app.use(router);

app.listen(myport, () => {
  console.log(`Server is running on port ${myport}`);
});
