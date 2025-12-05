import express from "express";
import {
  handleGoogleAuth,
  loginUser,
  registerUser,
  setPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/google", handleGoogleAuth);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/setpass", setPassword);

export default router;
