import React, { useState } from "react";
import { Megaphone, Bell, Flame } from "lucide-react";
import { useConfig } from "../context/ConfigContext";

const MarqueeTicker = ({ latestAnnouncement, onSelectAnnouncement }) => {
  const { config } = useConfig();
  const [isPaused, setIsPaused] = useState(false);

  if (!config?.marqueeActive && !latestAnnouncement) return null;

  const displayTicker = latestAnnouncement?.titleMr
    ? `${latestAnnouncement.titleMr} — ${latestAnnouncement.descriptionMr}`
    : config?.marqueeText || "गणपती बाप्पा मोरया! दैनिक महाआरती सकाळी ८:३० व रात्री ८:०० वाजता | महाप्रसाद वाटप ५व्या दिवशी दुपारी १२:३० पासून सुरु | सर्व ५ इमारतींच्या (G, H, I, J, K) भाविकांनी उपस्थित राहावे.";

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 border-b border-gold-500/40 shadow-inner py-2 sm:py-2.5 px-3">
      <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3">
        
        {/* Left Badge with Animated Diya */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-gold-500 to-amber-500 text-maroon-950 font-bold px-2.5 sm:px-3 py-1 rounded-full text-xs shadow-md">
          <Flame className="w-3.5 h-3.5 text-amber-900 animate-diya-flicker fill-amber-300" />
          <span className="hidden sm:inline font-heading">महत्वाचे अपडेट:</span>
          <span className="sm:hidden font-heading">अपडेट:</span>
        </div>

        {/* Marquee Content */}
        <div
          className="relative flex-1 overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={() => latestAnnouncement && onSelectAnnouncement && onSelectAnnouncement(latestAnnouncement)}
        >
          <div
            className={`whitespace-nowrap inline-block text-xs sm:text-sm font-medium text-gold-100 ${
              isPaused ? "" : "animate-marquee"
            }`}
            style={{ animationDuration: "28s" }}
          >
            <span className="inline-flex items-center gap-3">
              <span>{displayTicker}</span>
              <span className="text-gold-400">❖</span>
              <span className="text-festive-saffron font-semibold">५ इमारती (G, H, I, J, K) म्हाडा टॉवर्स</span>
              <span className="text-gold-400">❖</span>
              <span>{displayTicker}</span>
            </span>
          </div>
        </div>

        {/* Action button if announcement clickable */}
        {latestAnnouncement && (
          <button
            onClick={() => onSelectAnnouncement && onSelectAnnouncement(latestAnnouncement)}
            className="flex-shrink-0 hidden md:inline-flex items-center text-[11px] text-gold-300 hover:text-white underline decoration-gold-400 font-semibold"
          >
            पूर्ण वाचा &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

export default MarqueeTicker;
