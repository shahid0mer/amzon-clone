import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import router from "./routes/indexRoutes.js"
// import profileRouter from "./routes/profile.js";
import dotenv from 'dotenv'
import { connectDb } from "./config/db.js";

dotenv.config()

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

 await connectDb()

 app.use('/api',router)

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// app.use("/profile", profileRouter);

app.get("/", (req, res) => res.send(" server up"));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
