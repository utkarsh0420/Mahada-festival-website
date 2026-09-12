import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const ConfigContext = createContext();

const DEFAULT_CONFIG = {
  mandalNameMr: "म्हाडा टॉवर्स उत्सव मंडळ",
  mandalNameEn: "MHADA Towers Utsav Mandal",
  addressMr: "पिंपरी वाघेरे, पिंपरी चिंचवड, पुणे - ४११०१७",
  regNo: "१२४३/२०२५ - पुणे",
  festivalYear: "२०२६",
  festivalStatus: "उत्सव सुरू आहे (Festival Live)",
  marqueeText: "गणपती बाप्पा मोरया! दैनिक महाआरती सकाळी ८:३० व रात्री ८:०० वाजता | आजची महाआरती इमारत G विंग यजमान | सर्व भाविकांनी आरतीला उपस्थित राहावे.",
  marqueeActive: true,
  participatingWings: ["G", "H", "J", "K"],
  whatsAppCommunityLink: "https://chat.whatsapp.com/sample-mhada-ganpati-community",
  emergencyHelpline: "+91 98220 11223",
  tabs: {
    arrival: { enabled: true, approved: true, labelMr: "श्रींचे आगमन", labelEn: "Ganpati Arrival", order: 1 },
    aarti: { enabled: true, approved: true, labelMr: "दैनिक महाआरती", labelEn: "Aarti Timings", order: 2 },
    schedule: { enabled: true, approved: true, labelMr: "१० दिवसांचे वेळापत्रक", labelEn: "10-Day Schedule", order: 3 },
    cultural: { enabled: true, approved: true, labelMr: "आगामी कार्यक्रम", labelEn: "Upcoming Events", order: 4 },
    gallery: { enabled: true, approved: true, labelMr: "छायाचित्रे", labelEn: "Photo Gallery", order: 5 },
    prasad: { enabled: false, approved: false, labelMr: "महाप्रसाद", labelEn: "Maha Prasad", order: 6 },
    visarjan: { enabled: false, approved: false, labelMr: "विसर्जन सोहळा", labelEn: "Visarjan Timings", order: 7 },
    announcements: { enabled: true, approved: true, labelMr: "महत्वाच्या सूचना", labelEn: "Announcements", order: 8 },
    ownersNotice: { enabled: false, approved: false, labelMr: "वर्गणी व सभा अपडेट", labelEn: "Owners & Mandal Info", order: 9 },
    rules: { enabled: true, approved: true, labelMr: "मंडळ नियमावली", labelEn: "Society Rules", order: 10 },
    whatsapp: { enabled: true, approved: true, labelMr: "व्हॉट्सॲप कम्युनिटी", labelEn: "WhatsApp Group QR", order: 11 },
    contacts: { enabled: true, approved: true, labelMr: "संपर्क व मदत केंद्र", labelEn: "Emergency & Committee", order: 12 }
  },
  sidebarMenu: [
    { id: "dashboard", labelMr: "मुख्य पृष्ठ", labelEn: "Dashboard", badge: "", badgeType: "active", enabled: true, order: 1, targetSection: "top", icon: "LayoutDashboard" },
    { id: "liveUpdates", labelMr: "दैनिक वृत्तपत्र", labelEn: "Daily Bulletin", badge: "LIVE", badgeType: "pill-red", enabled: true, order: 2, targetSection: "marquee", icon: "Sparkles" },
    { id: "aartiSchedule", labelMr: "दैनिक महाआरती", labelEn: "Daily Maha Aarti", badge: "आरती", badgeType: "badge-gold", enabled: true, order: 3, targetSection: "aarti", icon: "Flame" },
    { id: "schedule", labelMr: "१० दिवसांचे वेळापत्रक", labelEn: "10-Day Schedule", badge: "१० दिवस", badgeType: "badge-gold", enabled: true, order: 4, targetSection: "schedule", icon: "Calendar" },
    { id: "upcoming", labelMr: "आगामी कार्यक्रम", labelEn: "Upcoming Events", badge: "नवीन", badgeType: "badge-gold", enabled: true, order: 5, targetSection: "upcoming", icon: "Calendar" },
    { id: "wings", labelMr: "इमारती (४ विंग्ज)", labelEn: "4 Buildings", badge: "", badgeType: "default", enabled: true, order: 6, targetSection: "wings", icon: "Building2" },
    { id: "polls", labelMr: "मतदान", labelEn: "Resident Polls", badge: "", badgeType: "default", enabled: true, order: 7, targetSection: "polls", icon: "BarChart2" },
    { id: "volunteer", labelMr: "सहभाग", labelEn: "Volunteer Seva", badge: "", badgeType: "default", enabled: true, order: 8, targetSection: "volunteer", icon: "Users" },
    { id: "gallery", labelMr: "छायाचित्रे", labelEn: "Photo Gallery", badge: "", badgeType: "default", enabled: true, order: 9, targetSection: "gallery", icon: "Image" },
    { id: "contacts", labelMr: "संपर्क व ईमेल", labelEn: "Helplines & Email", badge: "", badgeType: "default", enabled: true, order: 10, targetSection: "contacts", icon: "PhoneCall" },
    { id: "mandalInfo", labelMr: "मंडळ माहिती व सुरक्षा", labelEn: "Mandal Info & Security", badge: "", badgeType: "default", enabled: true, order: 11, targetSection: "mandal-info", icon: "Info" },
    { id: "adminLogin", labelMr: "व्यवस्थापक लॉगिन", labelEn: "Society Admin Login", badge: "", badgeType: "default", enabled: true, order: 12, targetSection: "admin-login", icon: "Shield" }
  ],
  sidebarSettings: {
    showFloatingTrigger: true,
    bottomCardTitle: "All 4 Buildings",
    bottomCardSubtitle: "Wings G, H, J, K",
    bottomCardTagline: "❤️ ४ विंग्स, एकच परिवार",
    bottomCardSubtag: "सहकार्य • शिस्त • अखंड भक्ती"
  },
  dailyAartiSchedule: [
    {
      dayNumber: 1,
      dateStr: "दिवस १ (श्री गणेश चतुर्थी - ७ सप्टेंबर)",
      hostWing: "G WING - नंदादेवी (Nandadevi)",
      hostLead: "श्री. सचिन पाटील (फ्लॅट G-402)",
      morningTime: "सकाळी ०८:३० वाजता",
      eveningTime: "रात्री ०८:०० वाजता",
      morningRitual: "श्री गणरायाची विधिवत प्राणप्रतिष्ठा व प्रभात आरती",
      eveningRitual: "संध्याकाळची भव्य धूपारती व मंत्रपुष्पांजली",
      specialPrasad: "ताजे उकडीचे मोदक व पेढे",
      isCurrentDay: true
    },
    {
      dayNumber: 2,
      dateStr: "दिवस २ (ऋषी पंचमी - ८ सप्टेंबर)",
      hostWing: "H WING - निलगिरी (Nilgiri)",
      hostLead: "श्री. विजय पवार (फ्लॅट H-301)",
      morningTime: "सकाळी ०८:३० वाजता",
      eveningTime: "रात्री ०८:०० वाजता",
      morningRitual: "ऋषी पंचमी विशेष पूजा व प्रभात आरती",
      eveningRitual: "धूप आरती व स्थानिक भजनी मंडळ",
      specialPrasad: "पंचखाद्य व केळी प्रसाद",
      isCurrentDay: false
    },
    {
      dayNumber: 3,
      dateStr: "दिवस ३ (गौरी आवाहन - ९ सप्टेंबर)",
      hostWing: "J WING - पूर्वांचल (Purvanchal)",
      hostLead: "श्री. निलेश मोरे (फ्लॅट J-202)",
      morningTime: "सकाळी ०८:३० वाजता",
      eveningTime: "रात्री ०८:०० वाजता",
      morningRitual: "श्री महालक्ष्मी / गौरी आवाहन व प्रभात आरती",
      eveningRitual: "संध्या महाआरती व महिला मंडळाचे पारंपरिक खेळ",
      specialPrasad: "रवा-नारळ लाडू",
      isCurrentDay: false
    },
    {
      dayNumber: 4,
      dateStr: "दिवस ४ (गौरी पूजन - १० सप्टेंबर)",
      hostWing: "K WING - गोवर्धन (Govardhan)",
      hostLead: "श्री. गणेश जाधव (फ्लॅट K-603)",
      morningTime: "सकाळी ०८:३० वाजता",
      eveningTime: "रात्री ०८:०० वाजता",
      morningRitual: "गौरी पूजन व काकड आरती",
      eveningRitual: "भव्य धूपारती व बाल गोपाळांचे सांस्कृतिक कार्यक्रम",
      specialPrasad: "गोड बुंदी व सुकामेवा",
      isCurrentDay: false
    },
    {
      dayNumber: 5,
      dateStr: "दिवस ५ (विशेष आरती दिन - ११ सप्टेंबर)",
      hostWing: "G WING - नंदादेवी (Nandadevi)",
      hostLead: "श्री. सतीश कांबळे (फ्लॅट G-101)",
      morningTime: "सकाळी ०८:३० वाजता",
      eveningTime: "रात्री ०८:०० वाजता",
      morningRitual: "प्रभात महाआरती व अथर्वशीर्ष पठण",
      eveningRitual: "धूप आरती व टाळ-मृदुंग संकीर्तन",
      specialPrasad: "पंचामृत व पेढे",
      isCurrentDay: false
    },
    {
      dayNumber: 6,
      dateStr: "दिवस ६ (एकता भजन संध्या - १२ सप्टेंबर)",
      hostWing: "H WING - निलगिरी (Nilgiri)",
      hostLead: "श्री. राहुल गायकवाड (फ्लॅट H-405)",
      morningTime: "सकाळी ०८:३० वाजता",
      eveningTime: "रात्री ०८:०० वाजता",
      morningRitual: "काकड आरती व श्री गणपती स्तोत्र",
      eveningRitual: "संध्या महाआरती व स्थानिक भजन",
      specialPrasad: "गूळ-खोबरे व लाडू",
      isCurrentDay: false
    },
    {
      dayNumber: 7,
      dateStr: "दिवस ७ (सामूहिक सत्यविनायक पूजा - १३ सप्टेंबर)",
      hostWing: "J WING - पूर्वांचल (Purvanchal)",
      hostLead: "श्री. निलेश मोरे व पूर्वांचल रहिवासी",
      morningTime: "सकाळी ०८:३० वाजता",
      eveningTime: "रात्री ०८:०० वाजता",
      morningRitual: "सत्यविनायक महापूजा संकल्प व काकड आरती",
      eveningRitual: "धूप आरती व ज्येष्ठ नागरिक सन्मान सोहळा",
      specialPrasad: "सत्यनारायण शिरा प्रसाद",
      isCurrentDay: false
    },
    {
      dayNumber: 8,
      dateStr: "दिवस ८ (महिला मंडळ महाआरती - १४ सप्टेंबर)",
      hostWing: "K WING - गोवर्धन (Govardhan)",
      hostLead: "श्रीमती सुनीता जाधव व महिला मंच",
      morningTime: "सकाळी ०८:३० वाजता",
      eveningTime: "रात्री ०८:०० वाजता",
      morningRitual: "प्रभात आरती व श्री सूक्त पठण",
      eveningRitual: "संध्या महाआरती व मंत्रपुष्पांजली",
      specialPrasad: "केसर पेढा व खिरीचा प्रसाद",
      isCurrentDay: false
    },
    {
      dayNumber: 9,
      dateStr: "दिवस ९ (भव्य दीपोत्सव - १५ सप्टेंबर)",
      hostWing: "G & H WING संयुक्त यजमान (नंदादेवी व निलगिरी)",
      hostLead: "श्री. सचिन पाटील व श्री. विजय पवार",
      morningTime: "सकाळी ०८:३० वाजता",
      eveningTime: "रात्री ०८:०० वाजता",
      morningRitual: "प्रभात महाआरती व मोदक नैवेद्य",
      eveningRitual: "भव्य दीप प्रज्वलन व धूप आरती",
      specialPrasad: "काजू कतली व बदाम लाडू",
      isCurrentDay: false
    },
    {
      dayNumber: 10,
      dateStr: "दिवस १० (सांगता महाआरती - १६ सप्टेंबर)",
      hostWing: "सर्व ४ इमारती संयुक्त (G • H • J • K WINGS)",
      hostLead: "समस्त म्हाडा टॉवर्स सोसायटी परिवार",
      morningTime: "सकाळी ०८:३० वाजता",
      eveningTime: "रात्री ०८:०० वाजता",
      morningRitual: "उत्तरपूजा संकल्प व प्रभात महाआरती",
      eveningRitual: "सांगता महाआरती, मंत्रपुष्पांजली व जयघोष",
      specialPrasad: "महाप्रसाद मोदक व नारळ",
      isCurrentDay: false
    }
  ],
  mandalInfo: {
    historyMr: "पिंपरी चिंचवड मधील म्हाडा टॉवर्स संकुलातील ४ विंग्ज (G-नंदादेवी, H-निलगिरी, J-पूर्वांचल, K-गोवर्धन) मधील सर्व रहिवासी, मालक व भाडेकरू कुटुंबे एकत्र येऊन दरवर्षी अत्यंत उत्साहात, शिस्तबद्ध व भव्य स्वरूपात गणेशोत्सव साजरा करतात. '४ विंग्स, एकच परिवार' या संकल्पनेतून सामाजिक सलोखा, चोख सुरक्षा व पर्यावरण संवर्धन जपले जाते.",
    establishedYear: "२०२४",
    regDetails: "नोंदणी क्र: १२४३/२०२५ - पुणे (धर्मादाय सहआयुक्त मान्यताप्राप्त)",
    mottoMr: "४ विंग्स, एकच परिवार (सहकार्य • शिस्त • अखंड भक्ती)",
    officeAddressMr: "मध्यवर्ती उत्सव मंडप, म्हाडा टॉवर्स संकुल, पिंपरी वाघेरे, पिंपरी चिंचवड, पुणे - ४११०१७",
    helpline: "+91 98220 11223",
    email: "mhadatowersutsav@gmail.com",
    bankDetails: {
      accountName: "MHADA TOWERS UTSAV MANDAL",
      bankName: "Bank of Maharashtra - Pimpri Branch",
      accountNo: "60459821034",
      ifsc: "MAHB0000123",
      upiId: "mhadatowers@upi"
    }
  }
};

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    try {
      const cached = localStorage.getItem("mhada_utsav_config");
      if (cached) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(cached) };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_CONFIG;
  });
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const res = await API.get("/config");
      if (res.data?.success && res.data.config) {
        const merged = {
          ...DEFAULT_CONFIG,
          ...res.data.config,
          sidebarMenu: res.data.config.sidebarMenu?.length ? res.data.config.sidebarMenu : DEFAULT_CONFIG.sidebarMenu,
          sidebarSettings: res.data.config.sidebarSettings?.bottomCardTagline ? res.data.config.sidebarSettings : DEFAULT_CONFIG.sidebarSettings,
          dailyAartiSchedule: res.data.config.dailyAartiSchedule?.length ? res.data.config.dailyAartiSchedule : DEFAULT_CONFIG.dailyAartiSchedule,
          mandalInfo: res.data.config.mandalInfo?.mottoMr ? res.data.config.mandalInfo : DEFAULT_CONFIG.mandalInfo
        };
        setConfig(merged);
        localStorage.setItem("mhada_utsav_config", JSON.stringify(merged));
      }
    } catch (err) {
      console.warn("Using default festival config:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const saveLocal = (newConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem("mhada_utsav_config", JSON.stringify(newConfig));
    } catch (e) {
      console.error(e);
    }
  };

  const updateTabs = async (tabs) => {
    try {
      const res = await API.put("/config/tabs", { tabs });
      if (res.data.success) {
        const updated = { ...config, tabs: res.data.tabs };
        saveLocal(updated);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      // Local fallback
      const updated = { ...config, tabs };
      saveLocal(updated);
      return { success: true, message: "स्थानिकरित्या जतन झाले" };
    }
  };

  const updateGeneral = async (generalData) => {
    try {
      const res = await API.put("/config/general", generalData);
      if (res.data.success) {
        const updated = { ...config, ...res.data.config };
        saveLocal(updated);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      const updated = { ...config, ...generalData };
      saveLocal(updated);
      return { success: true, message: "स्थानिकरित्या जतन झाले" };
    }
  };

  const updateSidebar = async (sidebarData) => {
    try {
      const res = await API.put("/config/sidebar", sidebarData);
      if (res.data.success) {
        const updated = {
          ...config,
          sidebarMenu: res.data.sidebarMenu || sidebarData.sidebarMenu,
          sidebarSettings: res.data.sidebarSettings || sidebarData.sidebarSettings
        };
        saveLocal(updated);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      const updated = {
        ...config,
        ...(sidebarData.sidebarMenu ? { sidebarMenu: sidebarData.sidebarMenu } : {}),
        ...(sidebarData.sidebarSettings ? { sidebarSettings: sidebarData.sidebarSettings } : {})
      };
      saveLocal(updated);
      return { success: true, message: "स्थानिकरित्या जतन झाले" };
    }
  };

  const updateAartiSchedule = async (dailyAartiSchedule) => {
    try {
      const res = await API.put("/config/aarti-schedule", { dailyAartiSchedule });
      if (res.data.success) {
        const updated = { ...config, dailyAartiSchedule: res.data.dailyAartiSchedule };
        saveLocal(updated);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      const updated = { ...config, dailyAartiSchedule };
      saveLocal(updated);
      return { success: true, message: "स्थानिकरित्या जतन झाले" };
    }
  };

  const updateMandalInfo = async (mandalInfo) => {
    try {
      const res = await API.put("/config/mandal-info", { mandalInfo });
      if (res.data.success) {
        const updated = { ...config, mandalInfo: res.data.mandalInfo };
        saveLocal(updated);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      const updated = { ...config, mandalInfo };
      saveLocal(updated);
      return { success: true, message: "स्थानिकरित्या जतन झाले" };
    }
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        loading,
        refreshConfig: fetchConfig,
        updateTabs,
        updateGeneral,
        updateSidebar,
        updateAartiSchedule,
        updateMandalInfo
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
