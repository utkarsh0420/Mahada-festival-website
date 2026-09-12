import mongoose from "mongoose";

const tabSettingSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: true },
  labelMr: { type: String, required: true },
  labelEn: { type: String, required: true },
  order: { type: Number, default: 0 },
  approved: { type: Boolean, default: true }
}, { _id: false });

const sidebarItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  labelMr: { type: String, required: true },
  labelEn: { type: String, required: true },
  badge: { type: String, default: "" },
  badgeType: { type: String, default: "default" },
  enabled: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  targetSection: { type: String, default: "" },
  icon: { type: String, default: "layout" }
}, { _id: false });

const dailyAartiItemSchema = new mongoose.Schema({
  dayNumber: { type: Number, required: true },
  dateStr: { type: String, required: true },
  hostWing: { type: String, required: true },
  hostLead: { type: String, default: "" },
  morningTime: { type: String, default: "सकाळी ०८:३० वाजता" },
  eveningTime: { type: String, default: "रात्री ०८:०० वाजता" },
  morningRitual: { type: String, default: "काकड आरती, मंत्रपुष्पांजली व नैवेद्य" },
  eveningRitual: { type: String, default: "१०१ दीप प्रज्वलन, धूप आरती व भजन" },
  specialPrasad: { type: String, default: "मोदक व पेढे" },
  isCurrentDay: { type: Boolean, default: false }
}, { _id: false });

const mandalInfoSchema = new mongoose.Schema({
  historyMr: {
    type: String,
    default: "पिंपरी चिंचवड मधील म्हाडा टॉवर्स संकुलातील ५ विंग्ज (G, H, I, J, K) मधील सर्व रहिवासी, मालक व भाडेकरू कुटुंबे एकत्र येऊन दरवर्षी अत्यंत उत्साहात, शिस्तबद्ध व भव्य स्वरूपात गणेशोत्सव साजरा करतात. '५ विंग्स, एकच परिवार' या संकल्पनेतून सामाजिक सलोखा व पर्यावरण संवर्धन जपले जाते."
  },
  establishedYear: { type: String, default: "२०२४" },
  regDetails: { type: String, default: "नोंदणी क्र: १२४३/२०२५ - पुणे (धर्मादाय सहआयुक्त मान्यताप्राप्त)" },
  mottoMr: { type: String, default: "५ विंग्स, एकच परिवार (सहकार्य • शिस्त • अखंड भक्ती)" },
  officeAddressMr: { type: String, default: "मध्यवर्ती उत्सव मंडप, म्हाडा टॉवर्स संकुल, पिंपरी वाघेरे, पिंपरी चिंचवड, पुणे - ४११०१७" },
  helpline: { type: String, default: "+91 98220 11223" },
  email: { type: String, default: "mhadatowersutsav@gmail.com" },
  bankDetails: {
    accountName: { type: String, default: "MHADA TOWERS UTSAV MANDAL" },
    bankName: { type: String, default: "Bank of Maharashtra - Pimpri Branch" },
    accountNo: { type: String, default: "60459821034" },
    ifsc: { type: String, default: "MAHB0000123" },
    upiId: { type: String, default: "mhadatowers@upi" }
  }
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
    default: "+91 98220 11223"
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
  sidebarMenu: {
    type: [sidebarItemSchema],
    default: [
      { id: "dashboard", labelMr: "मुख्य पृष्ठ", labelEn: "Dashboard", badge: "", badgeType: "active", enabled: true, order: 1, targetSection: "top", icon: "LayoutDashboard" },
      { id: "liveUpdates", labelMr: "अपडेट्स", labelEn: "Live Updates Scroller", badge: "LIVE", badgeType: "pill-red", enabled: true, order: 2, targetSection: "marquee", icon: "Sparkles" },
      { id: "announcements", labelMr: "सूचना", labelEn: "Announcements", badge: "6", badgeType: "badge-count", enabled: true, order: 3, targetSection: "announcements", icon: "Bell" },
      { id: "events", labelMr: "वेळापत्रक", labelEn: "Festival Events", badge: "10", badgeType: "badge-count", enabled: true, order: 4, targetSection: "events", icon: "Calendar" },
      { id: "aartiSchedule", labelMr: "दैनिक महाआरती व यजमान", labelEn: "Daily Aarti & Host Wings", badge: "आज", badgeType: "badge-gold", enabled: true, order: 5, targetSection: "aarti", icon: "Flame" },
      { id: "polls", labelMr: "मतदान", labelEn: "Resident Polls", badge: "", badgeType: "default", enabled: true, order: 6, targetSection: "polls", icon: "BarChart2" },
      { id: "volunteer", labelMr: "सहभाग", labelEn: "Volunteer Seva", badge: "", badgeType: "default", enabled: true, order: 7, targetSection: "volunteer", icon: "Users" },
      { id: "wings", labelMr: "इमारती", labelEn: "Wing Info", badge: "", badgeType: "default", enabled: true, order: 8, targetSection: "wings", icon: "Building2" },
      { id: "funds", labelMr: "हिशोब", labelEn: "Transparency & Funds", badge: "", badgeType: "default", enabled: true, order: 9, targetSection: "owners", icon: "ShieldCheck" },
      { id: "mandalInfo", labelMr: "मंडळ माहिती", labelEn: "Mandal Info", badge: "", badgeType: "default", enabled: true, order: 10, targetSection: "mandal-info", icon: "Info" },
      { id: "gallery", labelMr: "छायाचित्रे", labelEn: "Festival Gallery", badge: "", badgeType: "default", enabled: true, order: 11, targetSection: "gallery", icon: "Image" },
      { id: "contacts", labelMr: "संपर्क", labelEn: "Helpdesk & Contacts", badge: "", badgeType: "default", enabled: true, order: 12, targetSection: "contacts", icon: "PhoneCall" },
      { id: "adminLogin", labelMr: "व्यवस्थापक लॉगिन", labelEn: "Society Admin Login", badge: "", badgeType: "default", enabled: true, order: 13, targetSection: "admin-login", icon: "Shield" }
    ]
  },
  sidebarSettings: {
    showFloatingTrigger: { type: Boolean, default: true },
    bottomCardTitle: { type: String, default: "All 5 Wings" },
    bottomCardSubtitle: { type: String, default: "Wings G, H, I, J, K" },
    bottomCardTagline: { type: String, default: "❤️ ५ विंग्स, एकच परिवार" },
    bottomCardSubtag: { type: String, default: "सहकार्य • शिस्त • अखंड भक्ती" }
  },
  dailyAartiSchedule: {
    type: [dailyAartiItemSchema],
    default: [
      {
        dayNumber: 1,
        dateStr: "दिवस १ (श्री गणेश चतुर्थी)",
        hostWing: "G WING (इमारत G)",
        hostLead: "श्री. सचिन पाटील (फ्लॅट G-402)",
        morningTime: "सकाळी ०८:३० वाजता",
        eveningTime: "रात्री ०८:०० वाजता",
        morningRitual: "श्री गणरायाची विधिवत प्राणप्रतिष्ठा, काकड आरती व मोदक नैवेद्य",
        eveningRitual: "भव्य महाआरती, १०१ दीप प्रज्वलन व सुवासिनींचे भजन",
        specialPrasad: "ताजे उकडीचे मोदक व पेढे",
        isCurrentDay: true
      },
      {
        dayNumber: 2,
        dateStr: "दिवस २ (ऋषी पंचमी)",
        hostWing: "H WING (इमारत H)",
        hostLead: "श्री. विजय पवार (फ्लॅट H-301)",
        morningTime: "सकाळी ०८:३० वाजता",
        eveningTime: "रात्री ०८:०० वाजता",
        morningRitual: "ऋषी पंचमी विशेष पूजा, प्रभात महाआरती",
        eveningRitual: "धूप आरती, मंत्रपुष्पांजली व स्थानिक भजनी मंडळ",
        specialPrasad: "पंचखाद्य व केळी प्रसाद",
        isCurrentDay: false
      },
      {
        dayNumber: 3,
        dateStr: "दिवस ३ (गौरी आवाहन)",
        hostWing: "I WING (इमारत I)",
        hostLead: "श्री. अमित जोशी (फ्लॅट I-504)",
        morningTime: "सकाळी ०८:३० वाजता",
        eveningTime: "रात्री ०८:०० वाजता",
        morningRitual: "श्री महालक्ष्मी / गौरी आवाहन व प्रभात आरती",
        eveningRitual: "संध्या महाआरती, महिला मंडळाचे पारंपरिक खेळ व फुगडी",
        specialPrasad: "रवा-नारळ लाडू",
        isCurrentDay: false
      },
      {
        dayNumber: 4,
        dateStr: "दिवस ४ (गौरी पूजन)",
        hostWing: "J WING (इमारत J)",
        hostLead: "श्री. निलेश मोरे (फ्लॅट J-202)",
        morningTime: "सकाळी ०८:३० वाजता",
        eveningTime: "रात्री ०८:०० वाजता",
        morningRitual: "गौरी पूजन, सौभाग्यवतींचे हळदी-कुंकू व काकड आरती",
        eveningRitual: "भव्य धूपारती व बाल गोपाळांचे सांस्कृतिक कार्यक्रम",
        specialPrasad: "गोड बुंदी व सुकामेवा",
        isCurrentDay: false
      },
      {
        dayNumber: 5,
        dateStr: "दिवस ५ (भव्य महाप्रसाद दिन)",
        hostWing: "K WING (इमारत K)",
        hostLead: "श्री. गणेश जाधव (फ्लॅट K-603)",
        morningTime: "सकाळी ०८:०० वाजता",
        eveningTime: "रात्री ०८:०० वाजता",
        morningRitual: "महाप्रसाद नैवेद्य आरती व सत्यनारायण संकल्प",
        eveningRitual: "महाप्रसाद सांगता आरती व १०१ समई दीप दीपोत्सव",
        specialPrasad: "संपूर्ण महाप्रसाद (पुरी-भाजी, मसालेभात, शिरा, बुंदी)",
        isCurrentDay: false
      },
      {
        dayNumber: 6,
        dateStr: "दिवस ६ (एकता भजन संध्या)",
        hostWing: "G & H WING संयुक्त यजमान",
        hostLead: "श्री. सचिन पाटील व श्री. विजय पवार",
        morningTime: "सकाळी ०८:३० वाजता",
        eveningTime: "रात्री ०८:०० वाजता",
        morningRitual: "प्रभात आरती व अथर्वशीर्ष पठण",
        eveningRitual: "सोसायटी भजन मंडळ व टाळ-मृदुंग महाआरती",
        specialPrasad: "खोबरे-गूळ व साखरफुटाणे प्रसाद",
        isCurrentDay: false
      },
      {
        dayNumber: 7,
        dateStr: "दिवस ७ (सामूहिक सत्यविनायक पूजा)",
        hostWing: "I WING (इमारत I)",
        hostLead: "श्री. अमित जोशी व I विंग रहिवासी",
        morningTime: "सकाळी ०८:३० वाजता",
        eveningTime: "रात्री ०८:०० वाजता",
        morningRitual: "सत्यविनायक महापूजा संकल्प व काकड आरती",
        eveningRitual: "सायं आरती व ज्येष्ठ नागरिकांचा गुणगौरव सोहळा",
        specialPrasad: "सत्यनारायण शिरा प्रसाद",
        isCurrentDay: false
      },
      {
        dayNumber: 8,
        dateStr: "दिवस ८ (महिला मंडळ महाआरती)",
        hostWing: "J WING (इमारत J)",
        hostLead: "श्रीमती सुनीता मोरे व J विंग महिला मंडळ",
        morningTime: "सकाळी ०८:३० वाजता",
        eveningTime: "रात्री ०८:०० वाजता",
        morningRitual: "प्रभात आरती व श्री सूक्त पठण",
        eveningRitual: "१०१ महिलांच्या हस्ते भव्य दीप प्रज्वलन व महाआरती",
        specialPrasad: "केसर पेढा व खिरीचा प्रसाद",
        isCurrentDay: false
      },
      {
        dayNumber: 9,
        dateStr: "दिवस ९ (भव्य दीपोत्सव विशेष)",
        hostWing: "K WING (इमारत K)",
        hostLead: "श्री. गणेश जाधव व युवा मंच",
        morningTime: "सकाळी ०८:३० वाजता",
        eveningTime: "रात्री ०८:०० वाजता",
        morningRitual: "प्रभात महाआरती व मोदक नैवेद्य",
        eveningRitual: "५०१ दिव्यांचा भव्य महादीपोत्सव व मंत्रपुष्पांजली",
        specialPrasad: "काजू कतली व बदाम लाडू",
        isCurrentDay: false
      },
      {
        dayNumber: 10,
        dateStr: "दिवस १० (अनंत चतुर्दशी विसर्जन महाआरती)",
        hostWing: "सर्व ५ विंग्ज संयुक्त (G, H, I, J, K)",
        hostLead: "समस्त म्हाडा टॉवर्स उत्सव मंडळ कार्यकारिणी",
        morningTime: "सकाळी ०८:०० वाजता",
        eveningTime: "दुपारी ०२:३० वाजता (अंतिम निरोप आरती)",
        morningRitual: "सकाळी उत्तरपूजा व महाआरती",
        eveningRitual: "अंतिम निरोप महाआरती, लेझीम पथक, गुलाल व कृत्रिम हौद विसर्जन",
        specialPrasad: "मोदक, लाडू व दहीहंडी प्रसाद",
        isCurrentDay: false
      }
    ]
  },
  mandalInfo: {
    type: mandalInfoSchema,
    default: () => ({})
  },
  updatedAt: { type: Date, default: Date.now }
});

const TabConfig = mongoose.model("TabConfig", tabConfigSchema);
export default TabConfig;
