import React from "react";
import { 
  Newspaper, Sparkles, Clock, Building, Flame, 
  Share2, ShieldCheck, CheckCircle2, AlertCircle 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const DailyNewsletter = ({ onShareWhatsApp }) => {
  const { language, t } = useLanguage();

  const todayData = {
    edition: "अंक १ (दिवस १ - श्री गणेश चतुर्थी)",
    editionEn: "Edition 1 (Day 1 - Ganesh Chaturthi)",
    date: "७ सप्टेंबर २०२६",
    dateEn: "7 September 2026",
    headline: "श्री गणरायाचे भव्य आगमन व प्राणप्रतिष्ठा सोहळा संपन्न!",
    headlineEn: "Grand Arrival & Murti Sthapana Ceremony Completed!",
    summary: "सर्व ४ इमारतींमधील (G-नंदादेवी, H-निलगिरी, J-पूर्वांचल, K-गोवर्धन) भाविकांच्या उत्स्फूर्त उपस्थितीत बाप्पांचे वाजतगाजत आगमन झाले. आज संध्याकाळची महाआरती रात्री ८:०० वाजता संपन्न होईल.",
    summaryEn: "With enthusiastic participation from residents across all 4 buildings (G-Nandadevi, H-Nilgiri, J-Purvanchal, K-Govardhan), Bappa arrived to rhythmic Dhol-Tasha beats. Evening Maha Aarti will take place at 8:00 PM.",
    todayHost: "G WING - नंदादेवी (Nandadevi)",
    todayHostEn: "G Wing - Nandadevi",
    morningAarti: "०८:३० AM",
    eveningAarti: "०८:०० PM",
    safetyTip: "कृपया वाहने नियुक्त पार्किंगमध्येच लावावीत. संकुल २४x७ सीसीटीव्ही निगराणीखाली आहे.",
    safetyTipEn: "Please park vehicles only in designated spots. Complex is monitored 24x7 by CCTV."
  };

  const handleShareNewsletter = () => {
    if (onShareWhatsApp) {
      onShareWhatsApp({
        titleMr: `📰 दैनिक डिजिटल उत्सव पत्रिका - ${todayData.edition}`,
        time: todayData.date,
        venue: "म्हाडा टॉवर्स, पिंपरी वाघेरे",
        descriptionMr: `मुख्यालय बातमी: ${todayData.headline}\n${todayData.summary}\n\n🪔 आजची महाआरती: संध्याकाळी ८:०० वाजता\nयजमान: ${todayData.todayHost}\nसुरक्षा सूचना: ${todayData.safetyTip}\nगणपती बाप्पा मोरया!`
      });
    }
  };

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
              {language === "mr" ? todayData.edition : todayData.editionEn} • {language === "mr" ? todayData.date : todayData.dateEn}
            </span>
          </div>

          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gold-100 font-heading">
            {language === "mr" ? todayData.headline : todayData.headlineEn}
          </h3>

          <p className="text-xs sm:text-sm text-gold-100/80 line-clamp-2 mt-0.5 font-normal">
            {language === "mr" ? todayData.summary : todayData.summaryEn}
          </p>

          {/* Quick Highlight Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 bg-maroon-950/80 text-gold-300 px-2.5 py-1 rounded-lg border border-gold-500/30">
              <Flame className="w-3 h-3 text-orange-400" />
              <span>{t("eveningAarti")}: <strong>{todayData.eveningAarti}</strong></span>
            </span>
            <span className="inline-flex items-center gap-1 bg-maroon-950/80 text-gold-300 px-2.5 py-1 rounded-lg border border-gold-500/30">
              <Building className="w-3 h-3 text-gold-400" />
              <span>{t("hostWing")}: <strong>{language === "mr" ? todayData.todayHost : todayData.todayHostEn}</strong></span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 bg-maroon-950/80 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" />
              <span>{language === "mr" ? "२४x७ सीसीटीव्ही सुरक्षा" : "24x7 CCTV Security"}</span>
            </span>
          </div>
        </div>

        {/* Right: WhatsApp Share Button */}
        <button
          onClick={handleShareNewsletter}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition transform active:scale-95"
          title="वृत्तपत्र व्हॉट्सॲपवर शेअर करा"
        >
          <Share2 className="w-4 h-4" />
          <span>{language === "mr" ? "वृत्तपत्र शेअर करा" : "Share Bulletin"}</span>
        </button>

      </div>
    </div>
  );
};

export default DailyNewsletter;
