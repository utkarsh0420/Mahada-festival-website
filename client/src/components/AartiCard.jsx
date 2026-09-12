import React, { useState, useEffect } from "react";
import { 
  Flame, Clock, Building, Sparkles, Share2, Calendar, 
  ChevronRight, MapPin, CheckCircle2, Bell, Timer
} from "lucide-react";
import { useConfig } from "../context/ConfigContext";
import { useLanguage } from "../context/LanguageContext";

// Daily 10-day Aarti schedule with simplified rituals (messy 101 lamps removed)
export const DEFAULT_AARTI_SCHEDULE = [
  {
    dayNumber: 1,
    dateStr: "दिवस १ (श्री गणेश चतुर्थी - ७ सप्टेंबर)",
    dateStrEn: "Day 1 (Ganesh Chaturthi - 7 Sep)",
    hostWing: "G WING - नंदादेवी (Nandadevi)",
    hostWingEn: "G Wing - Nandadevi",
    hostLead: "श्री. सचिन पाटील (फ्लॅट G-402)",
    hostLeadEn: "Mr. Sachin Patil (Flat G-402)",
    morningTime: "सकाळी ०८:३० वाजता",
    morningTimeEn: "08:30 AM",
    eveningTime: "रात्री ०८:०० वाजता",
    eveningTimeEn: "08:00 PM",
    morningRitual: "श्री गणरायाची विधिवत प्रतिष्ठापना व प्रभात आरती",
    morningRitualEn: "Pranpratishtha pooja and morning aarti",
    eveningRitual: "संध्याकाळची भव्य धूपारती व मंत्रपुष्पांजली",
    eveningRitualEn: "Grand evening dhupaarti and sacred chants",
    specialPrasad: "ताजे उकडीचे मोदक व पेढे",
    specialPrasadEn: "Fresh steamed modak & pedhe",
    isCurrentDay: true
  },
  {
    dayNumber: 2,
    dateStr: "दिवस २ (ऋषी पंचमी - ८ सप्टेंबर)",
    dateStrEn: "Day 2 (Rishi Panchami - 8 Sep)",
    hostWing: "H WING - निलगिरी (Nilgiri)",
    hostWingEn: "H Wing - Nilgiri",
    hostLead: "श्री. विजय पवार (फ्लॅट H-301)",
    hostLeadEn: "Mr. Vijay Pawar (Flat H-301)",
    morningTime: "सकाळी ०८:३० वाजता",
    morningTimeEn: "08:30 AM",
    eveningTime: "रात्री ०८:०० वाजता",
    eveningTimeEn: "08:00 PM",
    morningRitual: "ऋषी पंचमी विशेष पूजा व प्रभात आरती",
    morningRitualEn: "Rishi Panchami pooja and morning aarti",
    eveningRitual: "धूप आरती व स्थानिक भजनी मंडळ",
    eveningRitualEn: "Dhupaarti and resident devotional bhajan",
    specialPrasad: "पंचखाद्य व केळी प्रसाद",
    specialPrasadEn: "Panchkhadya & banana prasad",
    isCurrentDay: false
  },
  {
    dayNumber: 3,
    dateStr: "दिवस ३ (गौरी आवाहन - ९ सप्टेंबर)",
    dateStrEn: "Day 3 (Gauri Aavahan - 9 Sep)",
    hostWing: "J WING - पूर्वांचल (Purvanchal)",
    hostWingEn: "J Wing - Purvanchal",
    hostLead: "श्री. निलेश मोरे (फ्लॅट J-202)",
    hostLeadEn: "Mr. Nilesh More (Flat J-202)",
    morningTime: "सकाळी ०८:३० वाजता",
    morningTimeEn: "08:30 AM",
    eveningTime: "रात्री ०८:०० वाजता",
    eveningTimeEn: "08:00 PM",
    morningRitual: "श्री महालक्ष्मी / गौरी आवाहन व प्रभात आरती",
    morningRitualEn: "Gauri aavahan and morning aarti",
    eveningRitual: "संध्या महाआरती व पारंपरिक खेळ",
    eveningRitualEn: "Evening maha aarti and traditional games",
    specialPrasad: "रवा-नारळ लाडू",
    specialPrasadEn: "Rawa coconut laddu",
    isCurrentDay: false
  },
  {
    dayNumber: 4,
    dateStr: "दिवस ४ (गौरी पूजन - १० सप्टेंबर)",
    dateStrEn: "Day 4 (Gauri Pujan - 10 Sep)",
    hostWing: "K WING - गोवर्धन (Govardhan)",
    hostWingEn: "K Wing - Govardhan",
    hostLead: "श्री. गणेश जाधव (फ्लॅट K-603)",
    hostLeadEn: "Mr. Ganesh Jadhav (Flat K-603)",
    morningTime: "सकाळी ०८:३० वाजता",
    morningTimeEn: "08:30 AM",
    eveningTime: "रात्री ०८:०० वाजता",
    eveningTimeEn: "08:00 PM",
    morningRitual: "गौरी पूजन व काकड आरती",
    morningRitualEn: "Gauri pujan and kakad aarti",
    eveningRitual: "भव्य धूपारती व बाल सांस्कृतिक कार्यक्रम",
    eveningRitualEn: "Grand dhupaarti and youth cultural show",
    specialPrasad: "गोड बुंदी व सुकामेवा",
    specialPrasadEn: "Sweet boondi & dry fruits",
    isCurrentDay: false
  },
  {
    dayNumber: 5,
    dateStr: "दिवस ५ (विशेष आरती दिन - ११ सप्टेंबर)",
    dateStrEn: "Day 5 (Special Aarti Day - 11 Sep)",
    hostWing: "G WING - नंदादेवी (Nandadevi)",
    hostWingEn: "G Wing - Nandadevi",
    hostLead: "श्री. सतीश कांबळे (फ्लॅट G-101)",
    hostLeadEn: "Mr. Satish Kamble (Flat G-101)",
    morningTime: "सकाळी ०८:३० वाजता",
    morningTimeEn: "08:30 AM",
    eveningTime: "रात्री ०८:०० वाजता",
    eveningTimeEn: "08:00 PM",
    morningRitual: "प्रभात महाआरती व अथर्वशीर्ष पठण",
    morningRitualEn: "Morning aarti & Atharvashirsha chanting",
    eveningRitual: "धूप आरती व टाळ-मृदुंग संकीर्तन",
    eveningRitualEn: "Dhupaarti and community bhajan",
    specialPrasad: "पंचामृत व पेढे",
    specialPrasadEn: "Panchamrut & pedhe",
    isCurrentDay: false
  },
  {
    dayNumber: 6,
    dateStr: "दिवस ६ (एकता भजन संध्या - १२ सप्टेंबर)",
    dateStrEn: "Day 6 (Unity Bhajan Sandhya - 12 Sep)",
    hostWing: "H WING - निलगिरी (Nilgiri)",
    hostWingEn: "H Wing - Nilgiri",
    hostLead: "श्री. राहुल गायकवाड (फ्लॅट H-405)",
    hostLeadEn: "Mr. Rahul Gaikwad (Flat H-405)",
    morningTime: "सकाळी ०८:३० वाजता",
    morningTimeEn: "08:30 AM",
    eveningTime: "रात्री ०८:०० वाजता",
    eveningTimeEn: "08:00 PM",
    morningRitual: "काकड आरती व श्री गणपती स्तोत्र पठण",
    morningRitualEn: "Kakad aarti and Ganpati stotra",
    eveningRitual: "संध्या महाआरती व भजन",
    eveningRitualEn: "Evening maha aarti & devotional songs",
    specialPrasad: "गूळ-खोबरे व लाडू",
    specialPrasadEn: "Jaggery coconut & laddu",
    isCurrentDay: false
  },
  {
    dayNumber: 7,
    dateStr: "दिवस ७ (सामूहिक सत्यविनायक पूजा - १३ सप्टेंबर)",
    dateStrEn: "Day 7 (Satyavinayak Pooja - 13 Sep)",
    hostWing: "J WING - पूर्वांचल (Purvanchal)",
    hostWingEn: "J Wing - Purvanchal",
    hostLead: "श्री. निलेश मोरे व पूर्वांचल रहिवासी",
    hostLeadEn: "Mr. Nilesh More & Purvanchal residents",
    morningTime: "सकाळी ०८:३० वाजता",
    morningTimeEn: "08:30 AM",
    eveningTime: "रात्री ०८:०० वाजता",
    eveningTimeEn: "08:00 PM",
    morningRitual: "सत्यविनायक महापूजा व प्रभात आरती",
    morningRitualEn: "Satyavinayak mahapooja & morning aarti",
    eveningRitual: "धूप आरती व ज्येष्ठ नागरिक सन्मान",
    eveningRitualEn: "Dhupaarti and senior citizen felicitation",
    specialPrasad: "सत्यनारायण शिरा प्रसाद",
    specialPrasadEn: "Satyavinayak sheera prasad",
    isCurrentDay: false
  },
  {
    dayNumber: 8,
    dateStr: "दिवस ८ (महिला मंडळ महाआरती - १४ सप्टेंबर)",
    dateStrEn: "Day 8 (Mahila Mandal Aarti - 14 Sep)",
    hostWing: "K WING - गोवर्धन (Govardhan)",
    hostWingEn: "K Wing - Govardhan",
    hostLead: "श्रीमती सुनीता जाधव व महिला मंच",
    hostLeadEn: "Mrs. Sunita Jadhav & Women's Wing",
    morningTime: "सकाळी ०८:३० वाजता",
    morningTimeEn: "08:30 AM",
    eveningTime: "रात्री ०८:०० वाजता",
    eveningTimeEn: "08:00 PM",
    morningRitual: "प्रभात आरती व श्री सूक्त पठण",
    morningRitualEn: "Morning aarti & Shri Sukta recitation",
    eveningRitual: "संध्या महाआरती व मंत्रपुष्पांजली",
    eveningRitualEn: "Evening maha aarti & sacred mantras",
    specialPrasad: "केसर पेढा व खिरीचा प्रसाद",
    specialPrasadEn: "Kesar pedha & kheer prasad",
    isCurrentDay: false
  },
  {
    dayNumber: 9,
    dateStr: "दिवस ९ (भव्य दीपोत्सव - १५ सप्टेंबर)",
    dateStrEn: "Day 9 (Grand Deepotsav - 15 Sep)",
    hostWing: "G & H WING संयुक्त यजमान (नंदादेवी व निलगिरी)",
    hostWingEn: "G & H Joint Host (Nandadevi & Nilgiri)",
    hostLead: "श्री. सचिन पाटील व श्री. विजय पवार",
    hostLeadEn: "Mr. Sachin Patil & Mr. Vijay Pawar",
    morningTime: "सकाळी ०८:३० वाजता",
    morningTimeEn: "08:30 AM",
    eveningTime: "रात्री ०८:०० वाजता",
    eveningTimeEn: "08:00 PM",
    morningRitual: "प्रभात महाआरती व मोदक नैवेद्य",
    morningRitualEn: "Morning maha aarti & modak offering",
    eveningRitual: "भव्य दीप प्रज्वलन व धूप आरती",
    eveningRitualEn: "Grand diya lighting & evening dhupaarti",
    specialPrasad: "काजू कतली व बदाम लाडू",
    specialPrasadEn: "Kaju katli & almond laddu",
    isCurrentDay: false
  },
  {
    dayNumber: 10,
    dateStr: "दिवस १० (सांगता महाआरती - १६ सप्टेंबर)",
    dateStrEn: "Day 10 (Concluding Maha Aarti - 16 Sep)",
    hostWing: "सर्व ४ इमारती संयुक्त (G • H • J • K WINGS)",
    hostWingEn: "All 4 Buildings Joint (G, H, J, K)",
    hostLead: "समस्त म्हाडा टॉवर्स सोसायटी रहिवासी",
    hostLeadEn: "All MHADA Towers Society Residents",
    morningTime: "सकाळी ०८:३० वाजता",
    morningTimeEn: "08:30 AM",
    eveningTime: "रात्री ०८:०० वाजता",
    eveningTimeEn: "08:00 PM",
    morningRitual: "उत्तरपूजा संकल्प व प्रभात महाआरती",
    morningRitualEn: "Uttarpooja and morning maha aarti",
    eveningRitual: "सांगता महाआरती, मंत्रपुष्पांजली व जयघोष",
    eveningRitualEn: "Final concluding maha aarti and sacred chants",
    specialPrasad: "महाप्रसाद मोदक व नारळ",
    specialPrasadEn: "Special modak and fresh coconut",
    isCurrentDay: false
  }
];

const AartiCard = ({ onShareWhatsApp }) => {
  const { config } = useConfig();
  const { language, t } = useLanguage();
  const schedule = config?.dailyAartiSchedule && config.dailyAartiSchedule.length > 0 
    ? config.dailyAartiSchedule 
    : DEFAULT_AARTI_SCHEDULE;

  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const activeDay = schedule[activeDayIndex] || schedule[0];

  // Daily Countdown Logic for Morning & Evening Aarti
  const [countdown, setCountdown] = useState({
    targetName: "संध्याकाळची महाआरती (Evening Aarti)",
    hours: "00",
    minutes: "00",
    seconds: "00",
    targetTime: "रात्री ०८:०० वाजता (08:00 PM)"
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      
      // Target times: Morning 08:30 AM, Evening 08:00 PM (20:00)
      const morningTarget = new Date();
      morningTarget.setHours(8, 30, 0, 0);

      const eveningTarget = new Date();
      eveningTarget.setHours(20, 0, 0, 0);

      let targetDate;
      let nextAartiName;
      let nextAartiTime;

      if (now < morningTarget) {
        targetDate = morningTarget;
        nextAartiName = language === "mr" ? "सकाळची महाआरती" : "Morning Maha Aarti";
        nextAartiTime = language === "mr" ? "सकाळी ०८:३० वाजता" : "08:30 AM";
      } else if (now < eveningTarget) {
        targetDate = eveningTarget;
        nextAartiName = language === "mr" ? "संध्याकाळची महाआरती" : "Evening Maha Aarti";
        nextAartiTime = language === "mr" ? "रात्री ०८:०० वाजता" : "08:00 PM";
      } else {
        // Next day morning aarti
        const tomorrowMorning = new Date();
        tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
        tomorrowMorning.setHours(8, 30, 0, 0);
        targetDate = tomorrowMorning;
        nextAartiName = language === "mr" ? "उद्याची सकाळची आरती" : "Tomorrow's Morning Aarti";
        nextAartiTime = language === "mr" ? "सकाळी ०८:३० वाजता" : "08:30 AM";
      }

      const diffMs = targetDate - now;
      if (diffMs > 0) {
        const totalSeconds = Math.floor(diffMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setCountdown({
          targetName: nextAartiName,
          targetTime: nextAartiTime,
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0")
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const handleShare = () => {
    if (onShareWhatsApp) {
      onShareWhatsApp({
        titleMr: `🪔 दैनिक महाआरती - ${activeDay.dateStr}`,
        time: `सकाळी: ${activeDay.morningTime} | संध्याकाळी: ${activeDay.eveningTime}`,
        venue: "मुख्य उत्सव मंडप, म्हाडा टॉवर्स संकुल",
        descriptionMr: `यजमान इमारत: ${activeDay.hostWing}\nप्रमुख: ${activeDay.hostLead}\nसकाळची आरती: ${activeDay.morningRitual}\nसंध्याकाळची आरती: ${activeDay.eveningRitual}\nप्रसाद: ${activeDay.specialPrasad}\nसर्व ४ इमारतींच्या रहिवाशांनी उपस्थित राहावे.\nगणपती बाप्पा मोरया!`
      });
    }
  };

  return (
    <section id="aarti-section" className="scroll-mt-20 my-6">
      <div className="bg-gradient-to-br from-white via-[#FFFDF9] to-[#FAF5EB] rounded-3xl border-2 border-gold-400/80 shadow-xl overflow-hidden p-4 sm:p-7 md:p-8">
        
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-gold-300/60">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-maroon-900 bg-gold-200/90 px-3 py-1 rounded-full border border-gold-400">
              <Flame className="w-4 h-4 text-orange-600 animate-diya" />
              <span>{t("aartiTitle")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-maroon-950 font-heading mt-1.5">
              {language === "mr" ? "दैनिक महाआरती व विंग यजमान" : "Daily Maha Aarti & Host Wings"}
            </h2>
            <p className="text-xs sm:text-sm text-maroon-800 font-medium">
              {language === "mr" 
                ? "दररोज सकाळी ०८:३० व रात्री ०८:०० वाजता मुख्य मंडपात महाआरती" 
                : "Every day at 08:30 AM and 08:00 PM at Central Festive Pandal"}
            </p>
          </div>

          {/* WhatsApp Share Button */}
          <button
            onClick={handleShare}
            className="self-start md:self-center inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition"
          >
            <Share2 className="w-4 h-4" />
            <span>{t("shareTimings")}</span>
          </button>
        </div>

        {/* 1. DAILY COUNTDOWN TICKER FOR NEXT AARTI (Image 1 Requirement) */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white border-2 border-gold-400/90 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-maroon-800/90 border border-gold-400 flex items-center justify-center shadow-inner flex-shrink-0">
                <Flame className="w-6 h-6 text-gold-300 animate-diya" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-gold-300 bg-maroon-800 px-2 py-0.5 rounded-full border border-gold-500/30">
                  <Timer className="w-3 h-3" />
                  <span>{t("nextAartiCountdown")}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gold-100 mt-0.5">
                  {countdown.targetName} • <span className="text-gold-300">{countdown.targetTime}</span>
                </h3>
              </div>
            </div>

            {/* Countdown Digits Clock */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center bg-maroon-800/90 border border-gold-400/70 rounded-xl px-3 py-1.5 min-w-[58px] shadow-sm">
                <span className="text-xl sm:text-2xl font-black text-gold-300 tracking-wider">
                  {countdown.hours}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-gold-200/80 font-bold">
                  {t("hours")}
                </span>
              </div>

              <span className="text-gold-400 font-bold text-xl animate-pulse">:</span>

              <div className="flex flex-col items-center bg-maroon-800/90 border border-gold-400/70 rounded-xl px-3 py-1.5 min-w-[58px] shadow-sm">
                <span className="text-xl sm:text-2xl font-black text-gold-300 tracking-wider">
                  {countdown.minutes}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-gold-200/80 font-bold">
                  {t("minutes")}
                </span>
              </div>

              <span className="text-gold-400 font-bold text-xl animate-pulse">:</span>

              <div className="flex flex-col items-center bg-maroon-800/90 border border-gold-400/70 rounded-xl px-3 py-1.5 min-w-[58px] shadow-sm">
                <span className="text-xl sm:text-2xl font-black text-gold-300 tracking-wider">
                  {countdown.seconds}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-gold-200/80 font-bold">
                  {t("seconds")}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 2. DAY-WISE SELECTOR PILLS */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-maroon-900 uppercase tracking-wide">
              {language === "mr" ? "दिवस निवडा (१० दिवस वेळापत्रक):" : "Select Day (10 Days):"}
            </span>
            <span className="text-xs font-bold text-maroon-700">
              {activeDay.dateStr}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {schedule.map((item, idx) => {
              const isSelected = idx === activeDayIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveDayIndex(idx)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? "bg-maroon-850 text-gold-200 border-gold-500 shadow-sm transform scale-105"
                      : "bg-white text-maroon-950 hover:bg-gold-100 border-gold-300"
                  }`}
                >
                  <span>{t("day")} {item.dayNumber}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. SIMPLIFIED TWO-COLUMN AARTI CARDS (Clean, readable, uncluttered) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Morning Aarti Card */}
          <div className="bg-white rounded-2xl border-2 border-gold-300 p-4 sm:p-5 shadow-sm hover:border-gold-500 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <Flame className="w-3.5 h-3.5 text-orange-600" />
                  <span>{t("morningAarti")}</span>
                </span>
                <div className="flex items-center gap-1 text-xs font-black text-maroon-900 bg-gold-100 px-2.5 py-1 rounded-lg border border-gold-300">
                  <Clock className="w-3.5 h-3.5 text-maroon-800" />
                  <span>{language === "mr" ? activeDay.morningTime : activeDay.morningTimeEn}</span>
                </div>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-maroon-950 font-heading mb-1.5">
                {language === "mr" ? activeDay.morningRitual : activeDay.morningRitualEn}
              </h4>

              <div className="space-y-1.5 text-xs sm:text-sm text-gray-700 mt-3 pt-3 border-t border-gray-100">
                <p className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-maroon-700 flex-shrink-0" />
                  <span>
                    <strong>{t("hostWing")}:</strong> {language === "mr" ? activeDay.hostWing : (activeDay.hostWingEn || activeDay.hostWing)}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>
                    <strong>{t("hostRepresentative")}:</strong> {language === "mr" ? activeDay.hostLead : (activeDay.hostLeadEn || activeDay.hostLead)}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gold-200/60 flex items-center justify-between text-xs text-maroon-900 font-semibold bg-gold-50/60 p-2.5 rounded-xl">
              <span>नैवेद्य / प्रसाद:</span>
              <span className="font-bold text-maroon-950">
                {language === "mr" ? activeDay.specialPrasad : activeDay.specialPrasadEn}
              </span>
            </div>
          </div>

          {/* Evening Aarti Card (Sub-note respected: removed 101 lamps & hymns of suvasini) */}
          <div className="bg-white rounded-2xl border-2 border-gold-300 p-4 sm:p-5 shadow-sm hover:border-gold-500 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-maroon-900 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
                  <Sparkles className="w-3.5 h-3.5 text-rose-700" />
                  <span>{t("eveningAarti")}</span>
                </span>
                <div className="flex items-center gap-1 text-xs font-black text-maroon-900 bg-gold-100 px-2.5 py-1 rounded-lg border border-gold-300">
                  <Clock className="w-3.5 h-3.5 text-maroon-800" />
                  <span>{language === "mr" ? activeDay.eveningTime : activeDay.eveningTimeEn}</span>
                </div>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-maroon-950 font-heading mb-1.5">
                {language === "mr" ? activeDay.eveningRitual : activeDay.eveningRitualEn}
              </h4>

              <div className="space-y-1.5 text-xs sm:text-sm text-gray-700 mt-3 pt-3 border-t border-gray-100">
                <p className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-maroon-700 flex-shrink-0" />
                  <span>
                    <strong>{t("hostWing")}:</strong> {language === "mr" ? activeDay.hostWing : (activeDay.hostWingEn || activeDay.hostWing)}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>
                    <strong>{t("hostRepresentative")}:</strong> {language === "mr" ? activeDay.hostLead : (activeDay.hostLeadEn || activeDay.hostLead)}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gold-200/60 flex items-center justify-between text-xs text-maroon-900 font-semibold bg-gold-50/60 p-2.5 rounded-xl">
              <span>नैवेद्य / प्रसाद:</span>
              <span className="font-bold text-maroon-950">
                {language === "mr" ? activeDay.specialPrasad : activeDay.specialPrasadEn}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AartiCard;
