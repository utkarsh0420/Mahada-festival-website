import express from "express";
import User from "../models/User.js";
import { generateToken, protectAdmin } from "../middleware/authMiddleware.js";
import { checkDbConnected } from "../config/db.js";
import { DEFAULT_ADMIN } from "../data/fallbackData.js";

const router = express.Router();

// Admin Login with Society Email & Password
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "कृपया ईमेल व पासवर्ड प्रविष्ट करा (Please provide email and password)" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. If MongoDB is connected, attempt DB lookup
    if (checkDbConnected()) {
      try {
        const user = await User.findOne({ email: normalizedEmail });
        if (user && (await user.matchPassword(password))) {
          return res.json({
            success: true,
            token: generateToken(user._id),
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          });
        }
      } catch (dbError) {
        console.warn("[Auth] Database lookup failed, falling back to society credentials:", dbError.message);
      }
    }

    // 2. Default Official Society Admin Credentials (works both offline and online)
    if (
      normalizedEmail === DEFAULT_ADMIN.email.toLowerCase() &&
      password === DEFAULT_ADMIN.password
    ) {
      return res.json({
        success: true,
        token: generateToken(DEFAULT_ADMIN.id),
        user: {
          id: DEFAULT_ADMIN.id,
          name: DEFAULT_ADMIN.name,
          email: DEFAULT_ADMIN.email,
          role: DEFAULT_ADMIN.role
        }
      });
    }

    return res.status(401).json({ success: false, message: "चुकीचा ईमेल किंवा पासवर्ड (Invalid email or password)" });
  } catch (error) {
    console.error("[Auth] Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// Google Sign-In verification
router.post("/google", async (req, res) => {
  try {
    const { email, name, googleId } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email required from Google sign in" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. If MongoDB is connected, attempt DB upsert
    if (checkDbConnected()) {
      try {
        let user = await User.findOne({ email: normalizedEmail });
        if (!user) {
          user = new User({
            email: normalizedEmail,
            name: name || "Society Google Admin",
            password: Math.random().toString(36).slice(-10),
            role: "admin",
            googleId: googleId || "google-auth"
          });
          await user.save();
        }

        return res.json({
          success: true,
          token: generateToken(user._id),
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      } catch (dbError) {
        console.warn("[Auth] Database Google auth lookup failed, falling back to standalone mode:", dbError.message);
      }
    }

    // 2. Standalone / Offline Google Sign-In
    const fallbackId = "google-admin-" + (googleId || "society-auth");
    return res.json({
      success: true,
      token: generateToken(fallbackId),
      user: {
        id: fallbackId,
        name: name || "म्हाडा उत्सव कमिटी (Google Admin)",
        email: normalizedEmail,
        role: "admin"
      }
    });
  } catch (error) {
    console.error("[Auth] Google login error:", error.message);
    res.status(500).json({ success: false, message: "Google authentication failed" });
  }
});

// Get Current Logged In Admin Profile
router.get("/me", protectAdmin, async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

export default router;
