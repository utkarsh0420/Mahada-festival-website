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
// Admin updates Sidebar Menu Items & Floating settings
router.put("/sidebar", protectAdmin, async (req, res) => {
  try {
    const { sidebarMenu, sidebarSettings } = req.body;
    let config = await TabConfig.findOne();
    if (!config) {
      config = new TabConfig();
    }

    if (sidebarMenu) {
      config.sidebarMenu = sidebarMenu;
    }
    if (sidebarSettings) {
      config.sidebarSettings = { ...config.sidebarSettings.toObject(), ...sidebarSettings };
    }
    config.updatedAt = Date.now();
    await config.save();

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
    let config = await TabConfig.findOne();
    if (!config) {
      config = new TabConfig();
    }

    if (dailyAartiSchedule && Array.isArray(dailyAartiSchedule)) {
      config.dailyAartiSchedule = dailyAartiSchedule;
    }
    config.updatedAt = Date.now();
    await config.save();

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
    let config = await TabConfig.findOne();
    if (!config) {
      config = new TabConfig();
    }

    if (mandalInfo) {
      config.mandalInfo = { ...config.mandalInfo.toObject(), ...mandalInfo };
    }
    config.updatedAt = Date.now();
    await config.save();

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
