import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { checkDbConnected } from "../config/db.js";
import { DEFAULT_ADMIN } from "../data/fallbackData.js";

const JWT_SECRET = process.env.JWT_SECRET || "mhada_utsav_mandal_secret_key_2025_pune";

export const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      // Check if this is an offline or standalone admin session
      if (
        !checkDbConnected() ||
        String(decoded.id).startsWith("offline-admin") ||
        String(decoded.id).startsWith("google-admin")
      ) {
        req.user = {
          _id: decoded.id || DEFAULT_ADMIN.id,
          id: decoded.id || DEFAULT_ADMIN.id,
          name: DEFAULT_ADMIN.name,
          email: DEFAULT_ADMIN.email,
          role: DEFAULT_ADMIN.role
        };
        return next();
      }

      // MongoDB is online: lookup in DB
      try {
        req.user = await User.findById(decoded.id).select("-password");
      } catch (dbErr) {
        req.user = null;
      }

      if (!req.user) {
        // Fallback to default admin object so admin never gets locked out
        req.user = {
          _id: decoded.id || DEFAULT_ADMIN.id,
          id: decoded.id || DEFAULT_ADMIN.id,
          name: DEFAULT_ADMIN.name,
          email: DEFAULT_ADMIN.email,
          role: DEFAULT_ADMIN.role
        };
      }

      return next();
    } catch (error) {
      console.error("[Auth] Token verification failed:", error.message);
      return res.status(401).json({ success: false, message: "Not authorized, token invalid or expired" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token provided" });
  }
};

export const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d"
  });
};
