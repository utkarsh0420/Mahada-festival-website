import express from "express";
import FestivalEvent from "../models/FestivalEvent.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all events (public)
router.get("/", async (req, res) => {
  try {
    const { category, day } = req.query;
    let filter = {};
    if (category && category !== "all") {
      filter.category = category;
    }
    if (day && day !== "all") {
      filter.dayNumber = Number(day);
    }

    const events = await FestivalEvent.find(filter).sort({ dayNumber: 1, order: 1 });
    res.json({ success: true, count: events.length, data: events });
  } catch (error) {
    console.error("[Events] Error fetching events:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch events" });
  }
});

// Admin: Create Event
router.post("/", protectAdmin, async (req, res) => {
  try {
    const { category, titleMr, titleEn, time, dateStr, dayNumber, venue, hostWing, descriptionMr, descriptionEn, isHighlight, status } = req.body;

    if (!category || !titleMr || !time || !dateStr) {
      return res.status(400).json({ success: false, message: "आवश्यक माहिती अपूर्ण आहे (Missing required fields)" });
    }

    const event = new FestivalEvent({
      category,
      titleMr,
      titleEn: titleEn || "",
      time,
      dateStr,
      dayNumber: dayNumber || 1,
      venue: venue || "मुख्य मंडप, म्हाडा टॉवर्स",
      hostWing: hostWing || "सर्व विंग्ज (G, H, I, J, K)",
      descriptionMr: descriptionMr || "",
      descriptionEn: descriptionEn || "",
      isHighlight: isHighlight || false,
      status: status || "upcoming"
    });

    await event.save();
    res.status(201).json({ success: true, message: "Event created", data: event });
  } catch (error) {
    console.error("[Events] Create error:", error.message);
    res.status(500).json({ success: false, message: "Failed to create event" });
  }
});

// Admin: Update Event
router.put("/:id", protectAdmin, async (req, res) => {
  try {
    const event = await FestivalEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    Object.assign(event, req.body);
    await event.save();
    res.json({ success: true, message: "Event updated", data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update event" });
  }
});

// Admin: Delete Event
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const event = await FestivalEvent.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete event" });
  }
});

export default router;
