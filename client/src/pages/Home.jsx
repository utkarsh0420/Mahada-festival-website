import React, { useState, useEffect } from "react";
import { 
  Sparkles, Flame, Clock, Calendar, MapPin, Building, QrCode, 
  Share2, ShieldCheck, Heart, AlertCircle, PhoneCall
} from "lucide-react";
import { useConfig } from "../context/ConfigContext";
import { useLanguage } from "../context/LanguageContext";
import API from "../services/api";

import MarqueeTicker from "../components/MarqueeTicker";
import DailyNewsletter from "../components/DailyNewsletter";
import EventScroller from "../components/EventScroller";
import AartiCard from "../components/AartiCard";
import TenDaysSchedule from "../components/TenDaysSchedule";
import UpcomingEvents from "../components/UpcomingEvents";
import PhotoGallery from "../components/PhotoGallery";
import MandalRules from "../components/MandalRules";
import EmergencyContacts from "../components/EmergencyContacts";
import AboutMandal from "../components/AboutMandal";

const Home = ({ onOpenWhatsAppQR, onOpenSidebar, onOpenUpcomingCalendar }) => {
  const { config } = useConfig();
  const { language, t } = useLanguage();

  const [selectedWing, setSelectedWing] = useState("All");
  const [activeCategory, setActiveCategory] = useState("all");
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
    fetchContacts();
  }, [selectedWing, activeCategory]);

  const fetchEvents = async () => {
    try {
      const params = {};
      if (activeCategory !== "all") params.category = activeCategory;
      const res = await API.get("/events", { params });
      if (res.data.success) {
        setEvents(res.data.data);
      }
    } catch (err) {
      console.error("Events fetch error:", err);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await API.get("/announcements", {
        params: { wing: selectedWing }
      });
      if (res.data.success) {
        setAnnouncements(res.data.data);
      }
    } catch (err) {
      console.error("Announcements fetch error:", err);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await API.get("/contacts");
      if (res.data.success) {
        setContacts(res.data.data);
      }
    } catch (err) {
      console.error("Contacts fetch error:", err);
    }
  };

  // WhatsApp Share helper
  const handleShareWhatsApp = (item) => {
    const text = encodeURIComponent(
      `🚩 *${language === "mr" ? (config?.mandalNameMr || "म्हाडा टॉवर्स उत्सव मंडळ, पिंपरी वाघेरे") : (config?.mandalNameEn || "MHADA Towers Utsav Mandal")}*\n\n` +
      `📌 *${item.titleMr || item.titleEn || "कार्यक्रम"}*\n` +
      `⏰ *वेळ/तारीख:* ${item.time || ""}\n` +
      `📍 *ठिकाण:* ${item.venue || "मुख्य मंडप, म्हाडा टॉवर्स"}\n` +
      (item.descriptionMr ? `📝 *तपशील:* ${item.descriptionMr}\n\n` : "\n") +
      `सहभागी ४ इमारती: G (नंदादेवी) • H (निलगिरी) • J (पूर्वांचल) • K (गोवर्धन)\n` +
      `गणपती बाप्पा मोरया! 🌸`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const latestPinned = announcements.find((a) => a.isPinned) || announcements[0];

  return (
    <div id="top-section" className="w-full">
      
      {/* 1. Breaking Marquee Scroller */}
      {config?.tabs?.announcements?.enabled !== false && (
        <div id="marquee-section" className="scroll-mt-16">
          <MarqueeTicker
            latestAnnouncement={latestPinned}
            onSelectAnnouncement={(ann) => setSelectedAnnouncement(ann)}
            onOpenSidebar={onOpenSidebar}
          />
        </div>
      )}

      {/* 2. DAILY DIGITAL NEWSLETTER BANNER */}
      {config?.tabs?.newsletter?.enabled !== false && (
        <DailyNewsletter />
      )}



      {/* 4. Event Scroller */}
      {config?.tabs?.cultural?.enabled !== false && (
        <div id="events-section" className="scroll-mt-16">
          <EventScroller
            events={events}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => setActiveCategory(cat)}
            onShareWhatsApp={handleShareWhatsApp}
          />
        </div>
      )}

      {/* 5. Main Content Sections */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* DAILY MAHA AARTI & LIVE COUNTDOWN */}
        {config?.tabs?.aarti?.enabled !== false && (
          <AartiCard onShareWhatsApp={handleShareWhatsApp} />
        )}

        {/* 10-DAY FESTIVAL SCHEDULE */}
        {config?.tabs?.schedule?.enabled !== false && (
          <TenDaysSchedule onShareWhatsApp={handleShareWhatsApp} />
        )}

        {/* UPCOMING & YEARLY EVENTS */}
        {(config?.tabs?.cultural?.enabled !== false || config?.tabs?.upcoming?.enabled !== false) && (
          <UpcomingEvents 
            onShareWhatsApp={handleShareWhatsApp} 
            onOpenUpcomingCalendar={onOpenUpcomingCalendar} 
          />
        )}

        {/* PAST EVENT PHOTOS GALLERY */}
        {config?.tabs?.gallery?.enabled !== false && (
          <PhotoGallery onShareWhatsApp={handleShareWhatsApp} />
        )}

        {/* SOCIETY RULES */}
        {config?.tabs?.rules?.enabled !== false && (
          <div id="rules-section">
            <MandalRules />
          </div>
        )}

        {/* EMERGENCY CONTACTS & SOCIETY EMAIL */}
        {config?.tabs?.contacts?.enabled !== false && (
          <EmergencyContacts contacts={contacts} />
        )}

        {/* ABOUT MANDAL & COMMUNITY SECURITY AT THE END */}
        {config?.tabs?.mandalInfo?.enabled !== false && (
          <AboutMandal onShareWhatsApp={handleShareWhatsApp} />
        )}

      </div>

      {/* Announcement Detail Modal if clicked */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border-2 border-gold-400 p-6 shadow-2xl relative animate-fadeIn">
            <div className="flex items-center justify-between mb-3 border-b pb-2">
              <span className="text-xs font-black text-maroon-800 bg-gold-100 px-2.5 py-0.5 rounded-full">
                {selectedAnnouncement.category}
              </span>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="text-gray-400 hover:text-gray-700 font-bold"
              >
                ✕
              </button>
            </div>
            <h3 className="text-base sm:text-lg font-black text-maroon-950 font-heading mb-2">
              {selectedAnnouncement.titleMr}
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-5">
              {selectedAnnouncement.descriptionMr}
            </p>
            <button
              onClick={() => {
                handleShareWhatsApp({
                  titleMr: selectedAnnouncement.titleMr,
                  time: "ताजी सूचना",
                  venue: "म्हाडा टॉवर्स",
                  descriptionMr: selectedAnnouncement.descriptionMr
                });
              }}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow transition"
            >
              व्हॉट्सॲपवर पाठवा
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
