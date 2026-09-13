import express from "express";
import Contact from "../models/Contact.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { checkDbConnected } from "../config/db.js";
import { FALLBACK_CONTACTS } from "../data/fallbackData.js";

const router = express.Router();

let memoryContacts = [...FALLBACK_CONTACTS];

// GET all contacts (public)
router.get("/", async (req, res) => {
  try {
    const { type, wing } = req.query;

    if (checkDbConnected()) {
      try {
        let filter = {};
        if (type && type !== "all") {
          filter.type = type;
        }
        if (wing && wing !== "all") {
          filter.wing = { $regex: wing, $options: "i" };
        }

        const contacts = await Contact.find(filter).sort({ order: 1, type: 1 });
        return res.json({ success: true, count: contacts.length, data: contacts });
      } catch (dbErr) {
        console.warn("[Contacts] DB read error, falling back to memory contacts:", dbErr.message);
      }
    }

    // Offline filtering
    let filtered = [...memoryContacts];
    if (type && type !== "all") {
      filtered = filtered.filter(c => c.type === type);
    }
    if (wing && wing !== "all") {
      filtered = filtered.filter(c => (c.wing || "").toLowerCase().includes(wing.toLowerCase()));
    }

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    console.error("[Contacts] Error fetching:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch contacts" });
  }
});

// Admin: Create contact
router.post("/", protectAdmin, async (req, res) => {
  try {
    const { nameMr, nameEn, roleMr, roleEn, wing, phone, type, order } = req.body;
    if (!nameMr || !roleMr) {
      return res.status(400).json({ success: false, message: "नाव आणि पद आवश्यक आहे" });
    }

    const newContactData = {
      _id: "contact-" + Date.now(),
      nameMr,
      nameEn: nameEn || "",
      roleMr,
      roleEn: roleEn || "",
      wing: wing || "सर्व विंग्ज",
      phone: phone || "",
      type: type || "committee",
      order: Number(order) || 0
    };

    if (checkDbConnected()) {
      try {
        const contact = new Contact(newContactData);
        await contact.save();
        memoryContacts.push(contact.toObject());
        return res.status(201).json({ success: true, message: "Contact created", data: contact });
      } catch (dbErr) {
        console.warn("[Contacts] DB save error, saving to memory:", dbErr.message);
      }
    }

    memoryContacts.push(newContactData);
    res.status(201).json({ success: true, message: "Contact created", data: newContactData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create contact" });
  }
});

// Admin: Update contact
router.put("/:id", protectAdmin, async (req, res) => {
  try {
    if (checkDbConnected()) {
      try {
        const contact = await Contact.findById(req.params.id);
        if (contact) {
          Object.assign(contact, req.body);
          await contact.save();
          return res.json({ success: true, message: "Contact updated", data: contact });
        }
      } catch (dbErr) {
        console.warn("[Contacts] DB update error, falling back to memory:", dbErr.message);
      }
    }

    const idx = memoryContacts.findIndex(c => String(c._id) === String(req.params.id));
    if (idx !== -1) {
      memoryContacts[idx] = { ...memoryContacts[idx], ...req.body };
      return res.json({ success: true, message: "Contact updated", data: memoryContacts[idx] });
    }

    res.status(404).json({ success: false, message: "Contact not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update contact" });
  }
});

// Admin: Delete contact
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    if (checkDbConnected()) {
      try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (contact) {
          memoryContacts = memoryContacts.filter(c => String(c._id) !== String(req.params.id));
          return res.json({ success: true, message: "Contact deleted successfully" });
        }
      } catch (dbErr) {
        console.warn("[Contacts] DB delete error, falling back to memory:", dbErr.message);
      }
    }

    const initialLen = memoryContacts.length;
    memoryContacts = memoryContacts.filter(c => String(c._id) !== String(req.params.id));
    if (memoryContacts.length < initialLen) {
      return res.json({ success: true, message: "Contact deleted successfully" });
    }

    res.status(404).json({ success: false, message: "Contact not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete contact" });
  }
});

export default router;
