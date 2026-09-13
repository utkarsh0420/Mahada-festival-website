import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { seedInitialData } from "./seed/seedData.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import configRoutes from "./routes/configRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/config", configRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/contacts", contactRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "MHADA Towers Utsav Mandal API",
    time: new Date().toISOString()
  });
});

// Start Server and Database Connection
const startServer = async () => {
  const isConnected = await connectDB();
  if (isConnected) {
    await seedInitialData();
  }

  const server = app.listen(PORT, () => {
    console.log(`[MHADA Utsav Server] Running on http://localhost:${PORT}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`[MHADA Utsav Server] Notice: Port ${PORT} is already in use by another instance.`);
      console.warn(`[MHADA Utsav Server] To free port ${PORT}, run: Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force`);
    } else {
      console.error("[MHADA Utsav Server Error]:", err.message);
    }
  });
};

startServer();
