import React from "react";
import { 
  Newspaper, Building, Flame, ShieldCheck 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useConfig } from "../context/ConfigContext";

const DailyNewsletter = ({ onShareWhatsApp }) => {
  const { language, t } = useLanguage();
  const { config } = useConfig();

  // If newsletter tab is disabled by admin, return null
  if (config?.tabs?.newsletter && !config.tabs.newsletter.enabled) {
    return null;
  }

  const nl = config?.newsletter || {};
  if (!nl.headline && !nl.edition) {
    return null;
  }

  const edition = language === "mr" ? (nl.edition || "दैनिक डिजिटल उत्सव पत्रिका") : (nl.editionEn || nl.edition || "Daily Festival Bulletin");
  const dateStr = language === "mr" ? (nl.dateStr || config.festivalYear) : (nl.dateStrEn || nl.dateStr || config.festivalYear);
  const headline = language === "mr" ? nl.headline : (nl.headlineEn || nl.headline);
  const summary = language === "mr" ? (nl.subheadline || nl.specialNote) : (nl.subheadlineEn || nl.subheadline || nl.specialNote);
  const hostWing = language === "mr" ? nl.todaysHostWing : (nl.todaysHostWingEn || nl.todaysHostWing);
  const eveningAarti = nl.eveningAartiTime || "०८:०० PM";
  const safetyTip = language === "mr" ? (nl.safetyTip || "संकुल २४x७ सीसीटीव्ही निगराणीखाली आहे.") : (nl.safetyTipEn || nl.safetyTip || "24x7 CCTV Monitored");



  return (
    <div className="w-full bg-gradient-to-r from-maroon-900 via-maroon-850 to-maroon-900 text-white py-4 px-3 sm:px-6 border-y-2 border-gold-400 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left: Newsletter Tag & Headlines */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-maroon-950 bg-gold-400 px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              <Newspaper className="w-3.5 h-3.5" />
              <span>{language === "mr" ? "दैनिक डिजिटल वृत्तपत्र" : "Daily Digital Bulletin"}</span>
            </span>
            <span className="text-xs text-gold-200 font-semibold">
              {edition} • {dateStr}
            </span>
          </div>

          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gold-100 font-heading">
            {headline}
          </h3>

          {summary && (
            <p className="text-xs sm:text-sm text-gold-100/80 line-clamp-2 mt-0.5 font-normal">
              {summary}
            </p>
          )}

          {/* Quick Highlight Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] sm:text-xs">
            {eveningAarti && (
              <span className="inline-flex items-center gap-1 bg-maroon-950/80 text-gold-300 px-2.5 py-1 rounded-lg border border-gold-500/30">
                <Flame className="w-3 h-3 text-orange-400" />
                <span>{t("eveningAarti")}: <strong>{eveningAarti}</strong></span>
              </span>
            )}
            {hostWing && (
              <span className="inline-flex items-center gap-1 bg-maroon-950/80 text-gold-300 px-2.5 py-1 rounded-lg border border-gold-500/30">
                <Building className="w-3 h-3 text-gold-400" />
                <span>{t("hostWing")}: <strong>{hostWing}</strong></span>
              </span>
            )}
            <span className="hidden sm:inline-flex items-center gap-1 bg-maroon-950/80 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" />
              <span>{safetyTip}</span>
            </span>
          </div>
        </div>


      </div>
    </div>
  );
};

export default DailyNewsletter;
