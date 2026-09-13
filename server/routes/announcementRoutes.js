import express from "express";
import Announcement from "../models/Announcement.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { checkDbConnected } from "../config/db.js";
import { FALLBACK_ANNOUNCEMENTS } from "../data/fallbackData.js";

const router = express.Router();

// Memory store for offline operations
let memoryAnnouncements = [...FALLBACK_ANNOUNCEMENTS];

// GET all active announcements (public)
router.get("/", async (req, res) => {
  try {
    const { category, wing } = req.query;

    if (checkDbConnected()) {
      try {
        let filter = { isActive: true };
        if (category && category !== "all") {
          filter.category = category;
        }
        if (wing && wing !== "All") {
          filter.targetWings = { $in: [wing, "All"] };
        }

        const announcements = await Announcement.find(filter).sort({ isPinned: -1, createdAt: -1 });
        return res.json({ success: true, count: announcements.length, data: announcements });
      } catch (dbErr) {
        console.warn("[Announcements] DB read failed, falling back to memory store:", dbErr.message);
      }
    }

    // Offline / Standalone filtering
    let filtered = memoryAnnouncements.filter(a => a.isActive !== false);
    if (category && category !== "all") {
      filtered = filtered.filter(a => a.category === category);
    }
    if (wing && wing !== "All") {
      filtered = filtered.filter(a => !a.targetWings || a.targetWings.includes(wing) || a.targetWings.includes("All"));
    }

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    console.error("[Announcements] Error fetching:", error.message);
    res.status(500).json({ success: false, message: "Error loading announcements" });
  }
});

// Admin: GET all announcements including inactive
router.get("/admin/all", protectAdmin, async (req, res) => {
  try {
    if (checkDbConnected()) {
      try {
        const announcements = await Announcement.find().sort({ isPinned: -1, createdAt: -1 });
        return res.json({ success: true, count: announcements.length, data: announcements });
      } catch (dbErr) {
        console.warn("[Announcements] DB admin read failed, falling back to memory:", dbErr.message);
      }
    }
    res.json({ success: true, count: memoryAnnouncements.length, data: memoryAnnouncements });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error loading admin announcements" });
  }
});

// Admin: Create announcement
router.post("/", protectAdmin, async (req, res) => {
  try {
    const { titleMr, titleEn, descriptionMr, descriptionEn, category, priority, isPinned, targetWings, badgeText } = req.body;

    if (!titleMr || !descriptionMr) {
      return res.status(400).json({ success: false, message: "मराठी शीर्षक व माहिती आवश्यक आहे (Marathi title and description required)" });
    }

    const newAnnouncementData = {
      _id: "ann-" + Date.now(),
      titleMr,
      titleEn: titleEn || "",
      descriptionMr,
      descriptionEn: descriptionEn || "",
      category: category || "general",
      priority: priority || "normal",
      isPinned: isPinned || false,
      isActive: true,
      targetWings: targetWings || ["All"],
      badgeText: badgeText || "नवीन सूचना",
      createdAt: new Date().toISOString()
    };

    if (checkDbConnected()) {
      try {
        const announcement = new Announcement(newAnnouncementData);
        await announcement.save();
        memoryAnnouncements.unshift(announcement.toObject());
        return res.status(201).json({ success: true, message: "Announcement created", data: announcement });
      } catch (dbErr) {
        console.warn("[Announcements] DB save failed, saving to memory:", dbErr.message);
      }
    }

    memoryAnnouncements.unshift(newAnnouncementData);
    res.status(201).json({ success: true, message: "Announcement created", data: newAnnouncementData });
  } catch (error) {
    console.error("[Announcements] Create error:", error.message);
    res.status(500).json({ success: false, message: "Failed to create announcement" });
  }
});

// Admin: Update announcement
router.put("/:id", protectAdmin, async (req, res) => {
  try {
    if (checkDbConnected()) {
      try {
        const announcement = await Announcement.findById(req.params.id);
        if (announcement) {
          Object.assign(announcement, req.body);
          await announcement.save();
          return res.json({ success: true, message: "Announcement updated", data: announcement });
        }
      } catch (dbErr) {
        console.warn("[Announcements] DB update failed, falling back to memory:", dbErr.message);
      }
    }

    const idx = memoryAnnouncements.findIndex(a => String(a._id) === String(req.params.id));
    if (idx !== -1) {
      memoryAnnouncements[idx] = { ...memoryAnnouncements[idx], ...req.body };
      return res.json({ success: true, message: "Announcement updated", data: memoryAnnouncements[idx] });
    }

    res.status(404).json({ success: false, message: "Announcement not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update announcement" });
  }
});

// Admin: Delete announcement
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    if (checkDbConnected()) {
      try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        if (announcement) {
          memoryAnnouncements = memoryAnnouncements.filter(a => String(a._id) !== String(req.params.id));
          return res.json({ success: true, message: "Announcement deleted successfully" });
        }
      } catch (dbErr) {
        console.warn("[Announcements] DB delete failed, falling back to memory:", dbErr.message);
      }
    }

    const initialLen = memoryAnnouncements.length;
    memoryAnnouncements = memoryAnnouncements.filter(a => String(a._id) !== String(req.params.id));
    if (memoryAnnouncements.length < initialLen) {
      return res.json({ success: true, message: "Announcement deleted successfully" });
    }

    res.status(404).json({ success: false, message: "Announcement not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete announcement" });
  }
});

export default router;
