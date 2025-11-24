import axios from "axios";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const handleGoogleCallback = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).send("Missing code");

    
    const tokenResp = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { id_token } = tokenResp.data;

   
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email)
      return res.status(400).send("Unable to verify Google token");

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        authProvider: "google",
        isVerified: payload.email_verified ?? true,
        picture: payload.picture,
      });
    } else if (!user.googleId) {
      
      user.googleId = payload.sub;
      user.authProvider = "google";
      user.isVerified = payload.email_verified ?? user.isVerified;
      await user.save();
    }

    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const isNewGoogleUser = !user.password;

   res.send(`
      <script>
        window.opener.postMessage(
          {
            token: "${token}",
            isNewUser: ${isNewGoogleUser},
            user: {
              id: "${user._id}",
              name: "${user.name}",
              email: "${user.email}",
              
            }
          },
          "${process.env.FRONTEND_URL}"
        );
        window.close();
      </script>
    `);

  } catch (err) {
    console.error(err);
    res.send(`
      <script>
        window.opener.postMessage(
          { error: "Google authentication failed" },
          "${process.env.FRONTEND_URL}"
        );
        window.close();
      </script>
    `);
  }
};

export const setPassword  = async (req, res) => {
  try {
    const { token, newPassword } = req.body
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Missing token or password" })
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" })

    
    if (user.password) {
      return res.status(400).json({ message: "Password already set" })
    }

    user.password = newPassword;   
    user.authProvider = "local";   
    await user.save();

    res.json({ message: "Password set successfully! Login available via email/password." })

  } catch (err) {
    res.status(500).json({ error: err.message })
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

    // Compare password
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

    // Check existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const generateToken = (user) => {
     return jwt.sign(
    { id: user._id }, 
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

    // Create user
    const newUser = await User.create({
      name,
      email,
      password,
      authProvider: "local",
      isVerified: false, // can switch later if using OTP
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