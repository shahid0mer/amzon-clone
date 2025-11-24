import express from "express";
import { handleGoogleCallback, loginUser, registerUser, setPassword } from "../controllers/authController.js";

const router = express.Router();

router.get("/google", (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent"
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  res.redirect(url);
});

router.get("/google/callback", handleGoogleCallback);
router.post("/register", registerUser)
router.post("/login",loginUser)
router.post("/setpass", setPassword)


export default router;
