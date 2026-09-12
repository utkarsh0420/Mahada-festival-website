import React, { useState, useEffect } from "react";
import { 
  Sparkles, Flame, Clock, Calendar, MapPin, Building, QrCode, 
  Share2, ShieldCheck, Heart, AlertCircle, PhoneCall
} from "lucide-react";
import { useConfig } from "../context/ConfigContext";
import API from "../services/api";

import MarqueeTicker from "../components/MarqueeTicker";
import WingFilter from "../components/WingFilter";
import EventScroller from "../components/EventScroller";
import AartiCard from "../components/AartiCard";
import MahaprasadCard from "../components/MahaprasadCard";
import VisarjanCard from "../components/VisarjanCard";
import OwnersNotice from "../components/OwnersNotice";
import MandalRules from "../components/MandalRules";
import EmergencyContacts from "../components/EmergencyContacts";
import AboutMandal from "../components/AboutMandal";

const Home = ({ onOpenWhatsAppQR }) => {
  const { config, loading: configLoading } = useConfig();

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
      console.error(err);
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
      console.error(err);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await API.get("/contacts");
      if (res.data.success) {
        setContacts(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // WhatsApp Share helper for timings
  const handleShareWhatsApp = (item) => {
    const text = encodeURIComponent(
      `🚩 *${config?.mandalNameMr || "म्हाडा टॉवर्स उत्सव मंडळ, पिंपरी वाघेरे"}*\n\n` +
      `📌 *${item.titleMr || "कार्यक्रम"}*\n` +
      `⏰ *वेळ:* ${item.time || ""}\n` +
      `📍 *ठिकाण:* ${item.venue || "मुख्य मंडप, म्हाडा टॉवर्स"}\n` +
      (item.descriptionMr ? `📝 *तपशील:* ${item.descriptionMr}\n\n` : "\n") +
      `सर्व ५ इमारतींच्या (G, H, I, J, K) भाविकांनी उपस्थित राहावे.\n` +
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
          />
        </div>
      )}

      {/* 2. Grand Hero Festival Showcase */}
      <section className="relative overflow-hidden bg-gradient-to-b from-maroon-950 via-maroon-900 to-maroon-850 text-white py-8 sm:py-12 px-4 border-b-2 border-gold-500">
        {/* Ornate Gold Background Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] bg-radial from-gold-500/10 via-transparent to-transparent pointer-events-none rounded-full blur-2xl"></div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          
          {/* Official Emblem */}
          <div className="relative mb-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}>
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 rounded-full blur-md opacity-80 group-hover:opacity-100 transition duration-500"></div>
            <img
              src="/logo.jpg"
              alt="म्हाडा टॉवर्स उत्सव मंडळ लोगो"
              className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-gold-400 shadow-2xl"
            />
          </div>

          {/* Registration Tag */}
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-gold-300 bg-maroon-850/90 px-3.5 py-1 rounded-full border border-gold-500/40 mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>{config?.regNo ? `नोंदणी क्र: ${config.regNo}` : "नोंदणी क्र: १२४३/२०२५ - पुणे"}</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-gold-200 tracking-tight font-heading leading-tight drop-shadow-md max-w-4xl">
            {config?.mandalNameMr || "म्हाडा टॉवर्स उत्सव मंडळ"}
          </h1>
          
          <p className="text-sm sm:text-lg text-gold-100/90 font-medium mt-1">
            {config?.addressMr || "पिंपरी वाघेरे, पिंपरी चिंचवड, पुणे - ४११०१७"}
          </p>

          <p className="text-xs sm:text-sm text-festive-saffron font-bold tracking-widest uppercase mt-2 bg-maroon-950/80 px-4 py-1 rounded-full border border-amber-500/30">
            श्री गणेशोत्सव {config?.festivalYear || "२०२५ - २०२६"} • डिजिटल माहिती केंद्र
          </p>

          {/* 5 Participating Buildings Highlight */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-gold-300 font-semibold mr-1">सहभागी ५ इमारती:</span>
            {["G WING", "H WING", "I WING", "J WING", "K WING"].map((w) => (
              <span
                key={w}
                className="bg-maroon-800/90 text-gold-200 text-xs font-bold px-3 py-1 rounded-lg border border-gold-500/40 shadow-xs"
              >
                {w}
              </span>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById("aarti-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-maroon-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg border border-gold-300 transition transform hover:-translate-y-0.5"
            >
              <Clock className="w-4 h-4 text-maroon-950" />
              <span>दैनिक महाआरती वेळा</span>
            </button>

            <button
              onClick={onOpenWhatsAppQR}
              className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg border border-emerald-500/40 transition transform hover:-translate-y-0.5"
            >
              <QrCode className="w-4 h-4 text-emerald-300" />
              <span>व्हॉट्सॲप कम्युनिटी QR</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. Participating Wing Selector */}
      <div id="wings-section" className="scroll-mt-16">
        <WingFilter
          selectedWing={selectedWing}
          onSelectWing={(wing) => setSelectedWing(wing)}
        />
      </div>

      {/* 4. PRIME REQUIREMENT: EVENT SCROLLER (Arrival, Aarti, Cultural, Prasad, Visarjan) */}
      <div id="events-section" className="scroll-mt-16">
        <EventScroller
          events={events}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onShareWhatsApp={handleShareWhatsApp}
        />
      </div>

      {/* 5. Main Content Container for Approved Tabs */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* AARTI TIMINGS TAB */}
        {config?.tabs?.aarti?.enabled !== false && (
          <div id="aarti-section">
            <AartiCard onShareWhatsApp={handleShareWhatsApp} />
          </div>
        )}

        {/* MAHA PRASAD TAB */}
        {config?.tabs?.prasad?.enabled !== false && (
          <div id="prasad-section">
            <MahaprasadCard onShareWhatsApp={handleShareWhatsApp} />
          </div>
        )}

        {/* VISARJAN TAB */}
        {config?.tabs?.visarjan?.enabled !== false && (
          <div id="visarjan-section">
            <VisarjanCard onShareWhatsApp={handleShareWhatsApp} />
          </div>
        )}

        {/* OWNERS CORNER TAB (Approved by Admin) */}
        {config?.tabs?.ownersNotice?.enabled !== false && (
          <div id="owners-section">
            <OwnersNotice />
          </div>
        )}

        {/* SOCIETY RULES TAB */}
        {config?.tabs?.rules?.enabled !== false && (
          <div id="rules-section">
            <MandalRules />
          </div>
        )}

        {/* EMERGENCY & COMMITTEE HELPLINES TAB */}
        {config?.tabs?.contacts?.enabled !== false && (
          <div id="contacts-section">
            <EmergencyContacts contacts={contacts} />
          </div>
        )}

        {/* PRIME REQUIREMENT: ABOUT MANDAL INFORMATION AT THE END OF THE PAGE */}
        <div id="mandal-info-section">
          <AboutMandal onShareWhatsApp={handleShareWhatsApp} />
        </div>

      </div>

      {/* Announcement Detail Modal if clicked */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border-2 border-gold-400 p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-3 border-b pb-2">
              <span className="text-xs font-bold text-maroon-800 bg-gold-100 px-2 py-0.5 rounded">
                {selectedAnnouncement.category}
              </span>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="text-gray-400 hover:text-gray-700 font-bold"
              >
                ✕
              </button>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-maroon-950 font-heading mb-2">
              {selectedAnnouncement.titleMr}
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
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
              className="w-full py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
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
