import express from "express";
import TabConfig from "../models/TabConfig.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET Public Config
router.get("/", async (req, res) => {
  try {
    let config = await TabConfig.findOne();
    if (!config) {
      config = new TabConfig();
      await config.save();
    }
    res.json({ success: true, config });
  } catch (error) {
    console.error("[Config] Error fetching config:", error.message);
    res.status(500).json({ success: false, message: "Error fetching configuration" });
  }
});

// Admin updates Tab Approvals / Visibility
router.put("/tabs", protectAdmin, async (req, res) => {
  try {
    const { tabs } = req.body;
    let config = await TabConfig.findOne();
    if (!config) {
      config = new TabConfig();
    }

    if (tabs) {
      config.tabs = { ...config.tabs.toObject(), ...tabs };
    }
    config.updatedAt = Date.now();
    await config.save();

    res.json({ success: true, message: "Tabs updated successfully", tabs: config.tabs });
  } catch (error) {
    console.error("[Config] Error updating tabs:", error.message);
    res.status(500).json({ success: false, message: "Failed to update tabs" });
  }
});

// Admin updates general festival information / Marquee scroller text
router.put("/general", protectAdmin, async (req, res) => {
  try {
    const {
      mandalNameMr,
      mandalNameEn,
      addressMr,
      regNo,
      festivalYear,
      festivalStatus,
      marqueeText,
      marqueeActive,
      participatingWings,
      whatsAppCommunityLink,
      emergencyHelpline
    } = req.body;

    let config = await TabConfig.findOne();
    if (!config) {
      config = new TabConfig();
    }

    if (mandalNameMr !== undefined) config.mandalNameMr = mandalNameMr;
    if (mandalNameEn !== undefined) config.mandalNameEn = mandalNameEn;
    if (addressMr !== undefined) config.addressMr = addressMr;
    if (regNo !== undefined) config.regNo = regNo;
    if (festivalYear !== undefined) config.festivalYear = festivalYear;
    if (festivalStatus !== undefined) config.festivalStatus = festivalStatus;
    if (marqueeText !== undefined) config.marqueeText = marqueeText;
    if (marqueeActive !== undefined) config.marqueeActive = marqueeActive;
    if (participatingWings !== undefined) config.participatingWings = participatingWings;
    if (whatsAppCommunityLink !== undefined) config.whatsAppCommunityLink = whatsAppCommunityLink;
    if (emergencyHelpline !== undefined) config.emergencyHelpline = emergencyHelpline;

    config.updatedAt = Date.now();
    await config.save();

    res.json({ success: true, message: "General configuration saved", config });
  } catch (error) {
    console.error("[Config] Error updating general settings:", error.message);
    res.status(500).json({ success: false, message: "Failed to update general settings" });
  }
});

export default router;
