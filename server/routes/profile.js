import express from "express";
import auth from "../middlewares/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password -__v");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user });
});

export default router;
