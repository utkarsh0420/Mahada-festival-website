import express from "express";
import TabConfig from "../models/TabConfig.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { checkDbConnected } from "../config/db.js";

const router = express.Router();

let memoryConfig = new TabConfig();

const getConfigDocument = async () => {
  if (checkDbConnected()) {
    try {
      let config = await TabConfig.findOne();
      if (!config) {
        config = new TabConfig();
        await config.save();
      }
      return config;
    } catch (err) {
      console.warn("[Config] DB read failed, falling back to memory config:", err.message);
    }
  }
  return memoryConfig;
};

const saveConfigDocument = async (config) => {
  config.updatedAt = Date.now();
  if (checkDbConnected() && typeof config.save === "function") {
    try {
      await config.save();
      return true;
    } catch (err) {
      console.warn("[Config] DB save failed, persisting to memory config:", err.message);
    }
  }
  memoryConfig = config;
  return true;
};

// GET Public Config
router.get("/", async (req, res) => {
  try {
    const config = await getConfigDocument();
    res.json({ success: true, config });
  } catch (error) {
    console.warn("[Config] Offline mode active, returning memory config:", error.message);
    res.json({ success: true, config: memoryConfig });
  }
});

// Admin updates Tab Approvals / Screen Visibility
router.put("/tabs", protectAdmin, async (req, res) => {
  try {
    const { tabs } = req.body;
    let config = await getConfigDocument();

    if (tabs) {
      const existingTabs = config.tabs?.toObject ? config.tabs.toObject() : config.tabs;
      config.tabs = { ...existingTabs, ...tabs };
    }
    await saveConfigDocument(config);

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

    let config = await getConfigDocument();

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

    await saveConfigDocument(config);

    res.json({ success: true, message: "General configuration saved", config });
  } catch (error) {
    console.error("[Config] Error updating general settings:", error.message);
    res.status(500).json({ success: false, message: "Failed to update general configuration" });
  }
});

// Admin updates Daily Newsletter
router.put("/newsletter", protectAdmin, async (req, res) => {
  try {
    const { newsletter } = req.body;
    let config = await getConfigDocument();

    if (newsletter) {
      const existing = config.newsletter?.toObject ? config.newsletter.toObject() : config.newsletter;
      config.newsletter = { ...existing, ...newsletter };
    }
    await saveConfigDocument(config);

    res.json({
      success: true,
      message: "Daily newsletter updated successfully",
      newsletter: config.newsletter
    });
  } catch (error) {
    console.error("[Config] Error updating newsletter:", error.message);
    res.status(500).json({ success: false, message: "Failed to update daily newsletter" });
  }
});

// Admin updates Participating Wings
router.put("/wings", protectAdmin, async (req, res) => {
  try {
    const { wings } = req.body;
    let config = await getConfigDocument();

    if (Array.isArray(wings)) {
      config.wings = wings;
      config.participatingWings = wings.map(w => w.code);
    }
    await saveConfigDocument(config);

    res.json({
      success: true,
      message: "Participating wings updated successfully",
      wings: config.wings
    });
  } catch (error) {
    console.error("[Config] Error updating wings:", error.message);
    res.status(500).json({ success: false, message: "Failed to update participating wings" });
  }
});

// Admin updates Society Rules
router.put("/rules", protectAdmin, async (req, res) => {
  try {
    const { rules } = req.body;
    let config = await getConfigDocument();

    if (Array.isArray(rules)) {
      config.rules = rules;
    }
    await saveConfigDocument(config);

    res.json({
      success: true,
      message: "Mandal rules updated successfully",
      rules: config.rules
    });
  } catch (error) {
    console.error("[Config] Error updating rules:", error.message);
    res.status(500).json({ success: false, message: "Failed to update mandal rules" });
  }
});

// Admin updates Photo Gallery
router.put("/gallery", protectAdmin, async (req, res) => {
  try {
    const { gallery } = req.body;
    let config = await getConfigDocument();

    if (Array.isArray(gallery)) {
      config.gallery = gallery;
    }
    await saveConfigDocument(config);

    res.json({
      success: true,
      message: "Gallery updated successfully",
      gallery: config.gallery
    });
  } catch (error) {
    console.error("[Config] Error updating gallery:", error.message);
    res.status(500).json({ success: false, message: "Failed to update photo gallery" });
  }
});

// Admin updates Poll
router.put("/poll", protectAdmin, async (req, res) => {
  try {
    const { poll } = req.body;
    let config = await getConfigDocument();

    if (poll) {
      const existing = config.poll?.toObject ? config.poll.toObject() : config.poll;
      config.poll = { ...existing, ...poll };
    }
    await saveConfigDocument(config);

    res.json({
      success: true,
      message: "Poll updated successfully",
      poll: config.poll
    });
  } catch (error) {
    console.error("[Config] Error updating poll:", error.message);
    res.status(500).json({ success: false, message: "Failed to update resident poll" });
  }
});

// Public Cast Vote in Poll
router.post("/poll/vote", async (req, res) => {
  try {
    const { optionId } = req.body;
    let config = await getConfigDocument();
    if (!config || !config.poll || !config.poll.options) {
      return res.status(404).json({ success: false, message: "Active poll not found" });
    }

    const opt = config.poll.options.find(o => o.id === Number(optionId));
    if (!opt) {
      return res.status(400).json({ success: false, message: "Invalid option selected" });
    }

    opt.votes = (opt.votes || 0) + 1;
    if (typeof config.markModified === "function") {
      config.markModified("poll");
    }
    await saveConfigDocument(config);

    res.json({
      success: true,
      message: "Vote recorded successfully",
      poll: config.poll
    });
  } catch (error) {
    console.error("[Config] Error recording vote:", error.message);
    res.status(500).json({ success: false, message: "Failed to record vote" });
  }
});

// Admin updates Volunteer Seva
router.put("/volunteer", protectAdmin, async (req, res) => {
  try {
    const { volunteerSeva } = req.body;
    let config = await getConfigDocument();

    if (volunteerSeva) {
      const existing = config.volunteerSeva?.toObject ? config.volunteerSeva.toObject() : config.volunteerSeva;
      config.volunteerSeva = { ...existing, ...volunteerSeva };
    }
    await saveConfigDocument(config);

    res.json({
      success: true,
      message: "Volunteer seva settings updated successfully",
      volunteerSeva: config.volunteerSeva
    });
  } catch (error) {
    console.error("[Config] Error updating volunteer settings:", error.message);
    res.status(500).json({ success: false, message: "Failed to update volunteer settings" });
  }
});

// Admin updates Sidebar Menu Items & Floating settings
router.put("/sidebar", protectAdmin, async (req, res) => {
  try {
    const { sidebarMenu, sidebarSettings } = req.body;
    let config = await getConfigDocument();

    if (sidebarMenu) {
      config.sidebarMenu = sidebarMenu;
    }
    if (sidebarSettings) {
      const existing = config.sidebarSettings?.toObject ? config.sidebarSettings.toObject() : config.sidebarSettings;
      config.sidebarSettings = { ...existing, ...sidebarSettings };
    }
    await saveConfigDocument(config);

    res.json({
      success: true,
      message: "Sidebar configuration updated successfully",
      sidebarMenu: config.sidebarMenu,
      sidebarSettings: config.sidebarSettings
    });
  } catch (error) {
    console.error("[Config] Error updating sidebar:", error.message);
    res.status(500).json({ success: false, message: "Failed to update sidebar configuration" });
  }
});

// Admin updates 10-day Aarti schedule & host buildings
router.put("/aarti-schedule", protectAdmin, async (req, res) => {
  try {
    const { dailyAartiSchedule } = req.body;
    let config = await getConfigDocument();

    if (dailyAartiSchedule && Array.isArray(dailyAartiSchedule)) {
      config.dailyAartiSchedule = dailyAartiSchedule;
    }
    await saveConfigDocument(config);

    res.json({
      success: true,
      message: "Daily Aarti schedule updated successfully",
      dailyAartiSchedule: config.dailyAartiSchedule
    });
  } catch (error) {
    console.error("[Config] Error updating aarti schedule:", error.message);
    res.status(500).json({ success: false, message: "Failed to update aarti schedule" });
  }
});

// Admin updates Mandal info
router.put("/mandal-info", protectAdmin, async (req, res) => {
  try {
    const { mandalInfo } = req.body;
    let config = await getConfigDocument();

    if (mandalInfo) {
      const existing = config.mandalInfo?.toObject ? config.mandalInfo.toObject() : config.mandalInfo;
      config.mandalInfo = { ...existing, ...mandalInfo };
    }
    await saveConfigDocument(config);

    res.json({
      success: true,
      message: "Mandal information updated successfully",
      mandalInfo: config.mandalInfo
    });
  } catch (error) {
    console.error("[Config] Error updating mandal info:", error.message);
    res.status(500).json({ success: false, message: "Failed to update mandal information" });
  }
});

export default router;
