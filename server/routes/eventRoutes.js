import express from "express";
import FestivalEvent from "../models/FestivalEvent.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { checkDbConnected } from "../config/db.js";
import { FALLBACK_FESTIVAL_EVENTS, FALLBACK_YEARLY_EVENTS } from "../data/fallbackData.js";

const router = express.Router();

let memoryEvents = [...FALLBACK_FESTIVAL_EVENTS, ...FALLBACK_YEARLY_EVENTS];

// GET all events (public)
router.get("/", async (req, res) => {
  try {
    const { category, day, eventType } = req.query;

    if (checkDbConnected()) {
      try {
        let filter = {};
        if (category && category !== "all") {
          filter.category = category;
        }
        if (day && day !== "all") {
          filter.dayNumber = Number(day);
        }
        if (eventType && eventType !== "all") {
          filter.eventType = eventType;
        }

        const events = await FestivalEvent.find(filter).sort({ dayNumber: 1, order: 1, createdAt: -1 });
        return res.json({ success: true, count: events.length, data: events });
      } catch (dbErr) {
        console.warn("[Events] DB read error, falling back to memory events:", dbErr.message);
      }
    }

    // Offline filtering
    let filtered = [...memoryEvents];
    if (category && category !== "all") {
      filtered = filtered.filter(e => e.category === category);
    }
    if (day && day !== "all") {
      filtered = filtered.filter(e => Number(e.dayNumber) === Number(day));
    }
    if (eventType && eventType !== "all") {
      filtered = filtered.filter(e => e.eventType === eventType);
    }

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    console.error("[Events] Error fetching events:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch events" });
  }
});

// Admin: Create Event
router.post("/", protectAdmin, async (req, res) => {
  try {
    const {
      category,
      categoryEn,
      eventType,
      titleMr,
      titleEn,
      time,
      dateStr,
      dateStrEn,
      dayNumber,
      venue,
      venueEn,
      hostWing,
      hostWingEn,
      descriptionMr,
      descriptionEn,
      isHighlight,
      imageUrl,
      status
    } = req.body;

    if (!titleMr || !time || !dateStr) {
      return res.status(400).json({ success: false, message: "आवश्यक माहिती अपूर्ण आहे (Missing required fields)" });
    }

    const newEventData = {
      _id: "evt-" + Date.now(),
      category: category || "cultural",
      categoryEn: categoryEn || "",
      eventType: eventType || "festival",
      titleMr,
      titleEn: titleEn || "",
      time,
      dateStr,
      dateStrEn: dateStrEn || "",
      dayNumber: Number(dayNumber) || 1,
      venue: venue || "मुख्य मंडप, म्हाडा टॉवर्स",
      venueEn: venueEn || "",
      hostWing: hostWing || "सर्व विंग्ज (G, H, J, K)",
      hostWingEn: hostWingEn || "",
      descriptionMr: descriptionMr || "",
      descriptionEn: descriptionEn || "",
      isHighlight: Boolean(isHighlight),
      imageUrl: imageUrl || "",
      status: status || "upcoming"
    };

    if (checkDbConnected()) {
      try {
        const event = new FestivalEvent(newEventData);
        await event.save();
        memoryEvents.push(event.toObject());
        return res.status(201).json({ success: true, message: "Event created", data: event });
      } catch (dbErr) {
        console.warn("[Events] DB save failed, persisting to memory:", dbErr.message);
      }
    }

    memoryEvents.push(newEventData);
    res.status(201).json({ success: true, message: "Event created", data: newEventData });
  } catch (error) {
    console.error("[Events] Create error:", error.message);
    res.status(500).json({ success: false, message: "Failed to create event" });
  }
});

// Admin: Bulk Import Events
router.post("/bulk", protectAdmin, async (req, res) => {
  try {
    const { events } = req.body;
    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ success: false, message: "No events provided for import" });
    }

    const validEvents = events
      .filter((ev) => ev.titleMr && ev.time && ev.dateStr)
      .map((ev, idx) => ({
        _id: "bulk-evt-" + Date.now() + "-" + idx,
        category: ev.category || "cultural",
        categoryEn: ev.categoryEn || "",
        eventType: ev.eventType === "yearly" ? "yearly" : "festival",
        titleMr: ev.titleMr,
        titleEn: ev.titleEn || ev.titleMr,
        time: ev.time,
        dateStr: ev.dateStr,
        dateStrEn: ev.dateStrEn || ev.dateStr,
        dayNumber: Number(ev.dayNumber) || 1,
        venue: ev.venue || "मुख्य मंडप, म्हाडा टॉवर्स",
        venueEn: ev.venueEn || "",
        hostWing: ev.hostWing || "सर्व विंग्ज (G, H, J, K)",
        hostWingEn: ev.hostWingEn || "",
        descriptionMr: ev.descriptionMr || "",
        descriptionEn: ev.descriptionEn || "",
        isHighlight: Boolean(ev.isHighlight),
        imageUrl: ev.imageUrl || "",
        status: ev.status || "upcoming"
      }));

    if (validEvents.length === 0) {
      return res.status(400).json({ success: false, message: "No valid events with title, time, and date found" });
    }

    if (checkDbConnected()) {
      try {
        const inserted = await FestivalEvent.insertMany(validEvents);
        memoryEvents.push(...inserted.map(e => e.toObject()));
        return res.status(201).json({
          success: true,
          message: `Successfully imported ${inserted.length} events`,
          count: inserted.length,
          data: inserted
        });
      } catch (dbErr) {
        console.warn("[Events] DB bulk import failed, saving to memory:", dbErr.message);
      }
    }

    memoryEvents.push(...validEvents);
    res.status(201).json({
      success: true,
      message: `Successfully imported ${validEvents.length} events`,
      count: validEvents.length,
      data: validEvents
    });
  } catch (error) {
    console.error("[Events] Bulk import error:", error.message);
    res.status(500).json({ success: false, message: "Failed to bulk import events" });
  }
});

// Admin: Update Event
router.put("/:id", protectAdmin, async (req, res) => {
  try {
    if (checkDbConnected()) {
      try {
        const event = await FestivalEvent.findById(req.params.id);
        if (event) {
          Object.assign(event, req.body);
          await event.save();
          return res.json({ success: true, message: "Event updated", data: event });
        }
      } catch (dbErr) {
        console.warn("[Events] DB update failed, falling back to memory:", dbErr.message);
      }
    }

    const idx = memoryEvents.findIndex(e => String(e._id) === String(req.params.id));
    if (idx !== -1) {
      memoryEvents[idx] = { ...memoryEvents[idx], ...req.body };
      return res.json({ success: true, message: "Event updated", data: memoryEvents[idx] });
    }

    res.status(404).json({ success: false, message: "Event not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update event" });
  }
});

// Admin: Delete Event
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    if (checkDbConnected()) {
      try {
        const event = await FestivalEvent.findByIdAndDelete(req.params.id);
        if (event) {
          memoryEvents = memoryEvents.filter(e => String(e._id) !== String(req.params.id));
          return res.json({ success: true, message: "Event deleted successfully" });
        }
      } catch (dbErr) {
        console.warn("[Events] DB delete failed, falling back to memory:", dbErr.message);
      }
    }

    const initialLen = memoryEvents.length;
    memoryEvents = memoryEvents.filter(e => String(e._id) !== String(req.params.id));
    if (memoryEvents.length < initialLen) {
      return res.json({ success: true, message: "Event deleted successfully" });
    }

    res.status(404).json({ success: false, message: "Event not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete event" });
  }
});

export default router;
