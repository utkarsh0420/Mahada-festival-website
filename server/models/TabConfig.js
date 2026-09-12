import mongoose from "mongoose";

const tabSettingSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: true },
  labelMr: { type: String, required: true },
  labelEn: { type: String, required: true },
  order: { type: Number, default: 0 },
  approved: { type: Boolean, default: true }
}, { _id: false });

const tabConfigSchema = new mongoose.Schema({
  mandalNameMr: { type: String, default: "म्हाडा टॉवर्स उत्सव मंडळ" },
  mandalNameEn: { type: String, default: "MHADA Towers Utsav Mandal" },
  addressMr: { type: String, default: "पिंपरी वाघेरे, पिंपरी चिंचवड, पुणे - ४११०१७" },
  regNo: { type: String, default: "१२४३/२०२५ - पुणे" },
  festivalYear: { type: String, default: "२०२५ - २०२६" },
  festivalStatus: { type: String, default: "उत्सव सुरू आहे (Festival Live)" },
  marqueeText: {
    type: String,
    default: "गणपती बाप्पा मोरया! दैनिक महाआरती सकाळी ८:३० व रात्री ८:०० वाजता | महाप्रसाद वाटप ५व्या दिवशी दुपारी १२:३० पासून सुरू | सर्व भाविकांनी आरतीला उपस्थित राहावे."
  },
  marqueeActive: { type: Boolean, default: true },
  participatingWings: {
    type: [String],
    default: ["G", "H", "I", "J", "K"]
  },
  whatsAppCommunityLink: {
    type: String,
    default: "https://chat.whatsapp.com/sample-mhada-ganpati-community"
  },
  emergencyHelpline: {
    type: String,
    default: "+91 98765 43210"
  },
  tabs: {
    arrival: {
      type: tabSettingSchema,
      default: { enabled: true, approved: true, labelMr: "श्रींचे आगमन", labelEn: "Ganpati Arrival", order: 1 }
    },
    aarti: {
      type: tabSettingSchema,
      default: { enabled: true, approved: true, labelMr: "दैनिक महाआरती", labelEn: "Aarti Timings", order: 2 }
    },
    cultural: {
      type: tabSettingSchema,
      default: { enabled: true, approved: true, labelMr: "सांस्कृतिक कार्यक्रम", labelEn: "Cultural Programs", order: 3 }
    },
    prasad: {
      type: tabSettingSchema,
      default: { enabled: true, approved: true, labelMr: "महाप्रसाद", labelEn: "Maha Prasad", order: 4 }
    },
    visarjan: {
      type: tabSettingSchema,
      default: { enabled: true, approved: true, labelMr: "विसर्जन सोहळा", labelEn: "Visarjan Timings", order: 5 }
    },
    announcements: {
      type: tabSettingSchema,
      default: { enabled: true, approved: true, labelMr: "महत्वाच्या सूचना", labelEn: "Announcements", order: 6 }
    },
    ownersNotice: {
      type: tabSettingSchema,
      default: { enabled: true, approved: true, labelMr: "वर्गणी व सभा अपडेट", labelEn: "Owners & Mandal Info", order: 7 }
    },
    rules: {
      type: tabSettingSchema,
      default: { enabled: true, approved: true, labelMr: "मंडळ नियमावली", labelEn: "Society Rules", order: 8 }
    },
    whatsapp: {
      type: tabSettingSchema,
      default: { enabled: true, approved: true, labelMr: "व्हॉट्सॲप कम्युनिटी", labelEn: "WhatsApp Group QR", order: 9 }
    },
    contacts: {
      type: tabSettingSchema,
      default: { enabled: true, approved: true, labelMr: "संपर्क व मदत केंद्र", labelEn: "Emergency & Committee", order: 10 }
    }
  },
  updatedAt: { type: Date, default: Date.now }
});

const TabConfig = mongoose.model("TabConfig", tabConfigSchema);
export default TabConfig;
