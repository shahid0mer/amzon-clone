import axios from "axios";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const handleGoogleAuth = async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ error: "Missing access token" });
    }

    // Get user info from Google using the access token
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { sub, email, name, picture, email_verified } = userInfoResponse.data;

    if (!email) {
      return res.status(400).json({ error: "Unable to get email from Google" });
    }

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        authProvider: "google",
        isVerified: email_verified ?? true,
        picture,
      });
    } else if (!user.googleId) {
      user.googleId = sub;
      user.authProvider = "google";
      user.isVerified = email_verified ?? user.isVerified;
      if (picture) user.picture = picture;
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const isNewUser = !user.password;

    res.json({
      token,
      isNewUser,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (err) {
    console.error("Google auth error:", err);
    res.status(500).json({ error: "Google authentication failed" });
  }
};

export const setPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Missing token or password" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password) {
      return res.status(400).json({ message: "Password already set" });
    }

    user.password = newPassword;
    user.authProvider = "local";
    await user.save();

    res.json({
      message: "Password set successfully! Login available via email/password.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Prevent login if account is Google linked & no password
    if (user.authProvider === "google" && !user.password) {
      return res.status(400).json({
        message: "Email registered using Google. Please login with Google.",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const generateToken = (user) => {
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
    };

    // Create user
    const newUser = await User.create({
      name,
      email,
      password,
      authProvider: "local",
      isVerified: false,
    });

    const token = generateToken(newUser);
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
