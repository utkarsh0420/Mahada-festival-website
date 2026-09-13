import React from "react";
import { Flame } from "lucide-react";
import { useConfig } from "../context/ConfigContext";

const MarqueeTicker = ({ latestAnnouncement, onSelectAnnouncement, onOpenSidebar }) => {
  const { config } = useConfig();

  if (!config?.marqueeActive && !latestAnnouncement) return null;

  const displayTicker = latestAnnouncement?.titleMr
    ? `${latestAnnouncement.titleMr} — ${latestAnnouncement.descriptionMr}`
    : config?.marqueeText || "गणपती बाप्पा मोरया! दैनिक महाआरती सकाळी ८:३० व रात्री ८:०० वाजता | महाप्रसाद वाटप ५व्या दिवशी दुपारी १२:३० पासून सुरु | सर्व ५ इमारतींच्या (G, H, I, J, K) भाविकांनी उपस्थित राहावे.";

  // Render content items helper so Track 1 and Track 2 are 100% mathematically identical
  const renderTickerContent = () => (
    <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6 whitespace-nowrap text-xs sm:text-sm font-medium text-gold-100">
      <span className="hover:text-gold-300 transition-colors">{displayTicker}</span>
      <span className="text-gold-400/80">❖</span>
      <span className="text-festive-saffron font-semibold">५ इमारती (G, H, I, J, K) म्हाडा टॉवर्स</span>
      <span className="text-gold-400/80">❖</span>
      <span className="hover:text-gold-300 transition-colors">{displayTicker}</span>
      <span className="text-gold-400/80">❖</span>
      <span className="text-amber-200">दैनिक महाआरती: सकाळी ८:३० व रात्री ८:०० वाजता</span>
      <span className="text-gold-400/80">❖</span>
      <span className="text-gold-200 font-semibold">श्री गणेशोत्सव २०२६ • डिजिटल माहिती केंद्र</span>
      <span className="text-gold-400/80">❖</span>
    </div>
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 border-b border-gold-500/40 shadow-inner py-1.5 sm:py-2 px-3">
      <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3">

        {/* Left Badge with Animated Diya */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-gold-500 to-amber-500 text-maroon-950 font-bold px-2.5 sm:px-3 py-1 rounded-full text-xs shadow-md z-20">
          <Flame className="w-3.5 h-3.5 text-amber-900 animate-diya-flicker fill-amber-300" />
          <span className="hidden sm:inline font-heading">महत्वाचे अपडेट:</span>
          <span className="sm:hidden font-heading">अपडेट:</span>
        </div>

        {/* Marquee Content - Continuous Infinite Stream without Mouse Fluctuation */}
        <div
          className="relative flex-1 overflow-hidden group cursor-pointer"
          onClick={() => latestAnnouncement && onSelectAnnouncement && onSelectAnnouncement(latestAnnouncement)}
          title={latestAnnouncement ? "तपशील पाहण्यासाठी क्लिक करा (Click to view notice)" : "महत्वाचे अपडेट"}
        >
          {/* Edge fade masks for smooth entrance/exit blend */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-maroon-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-maroon-950 to-transparent z-10 pointer-events-none" />

          {/* Seamless infinite double-track with hardware accelerated CSS animation */}
          <div className="flex w-max animate-marquee-continuous group-hover:[animation-play-state:paused]">
            {/* Track 1 */}
            {renderTickerContent()}
            {/* Track 2 (exact clone for 100% seamless infinite loop with zero jump cuts) */}
            {renderTickerContent()}
          </div>
        </div>

        {/* Action button if announcement clickable */}
        {latestAnnouncement && (
          <button
            onClick={() => onSelectAnnouncement && onSelectAnnouncement(latestAnnouncement)}
            className="flex-shrink-0 hidden md:inline-flex items-center text-[11px] text-gold-300 hover:text-white underline decoration-gold-400 font-semibold z-20"
          >
            पूर्ण वाचा &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

export default MarqueeTicker;
