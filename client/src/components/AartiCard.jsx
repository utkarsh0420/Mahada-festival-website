import React, { useState } from "react";
import { 
  Flame, Clock, Building, Sparkles, Share2, Calendar, 
  ChevronRight, MapPin, Award, CheckCircle2, HeartHandshake
} from "lucide-react";
import { useConfig } from "../context/ConfigContext";

const AartiCard = ({ onShareWhatsApp }) => {
  const { config } = useConfig();

  const schedule = config?.dailyAartiSchedule || [
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
  ];

  // Default selected day is today or Day 1
  const currentDayItem = schedule.find((item) => item.isCurrentDay) || schedule[0];
  const [selectedDayNumber, setSelectedDayNumber] = useState(currentDayItem?.dayNumber || 1);
  const [showFullTable, setShowFullTable] = useState(false);

  const activeDay = schedule.find((d) => d.dayNumber === selectedDayNumber) || currentDayItem;

  const handleShareDayAarti = (day) => {
    if (!onShareWhatsApp) return;
    onShareWhatsApp({
      titleMr: `दैनिक महाआरती वेळापत्रक - ${day.dateStr}`,
      time: `सकाळी: ${day.morningTime} | रात्री: ${day.eveningTime}`,
      venue: "मध्यवर्ती उत्सव मंडप, म्हाडा टॉवर्स",
      descriptionMr: `यजमान इमारत: ${day.hostWing} (${day.hostLead || ""})\nसकाळची पूजा: ${day.morningRitual}\nसंध्याकाळची आरती: ${day.eveningRitual}\nनैवेद्य/प्रसाद: ${day.specialPrasad}\nसर्व ५ विंग्जच्या रहिवाशांनी उपस्थित राहावे.`
    });
  };

  return (
    <div className="bg-gradient-to-br from-maroon-950 via-maroon-900 to-[#1f0206] text-white rounded-2xl border-2 border-gold-400/80 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      {/* Background festive aura */}
      <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6 pb-4 border-b border-gold-500/30">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-festive-saffron bg-maroon-950/90 px-3 py-1 rounded-full border border-gold-500/40">
              <Flame className="w-4 h-4 text-amber-400 animate-diya-flicker" /> 
              <span>दैनिक महाआरती व यजमान इमारत (Daily Aarti & Host Building)</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gold-200 mt-1 font-heading">
              दैनिक महाआरती वेळ व विंग यजमानपद
            </h3>
            <p className="text-xs sm:text-sm text-gold-100/80">
              श्री गणेशोत्सवातील प्रत्येक दिवसाचे यजमानपद व आरतीची वेळ खालीलप्रमाणे आहे
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-maroon-950/90 px-3 py-1.5 rounded-xl border border-gold-500/30 text-xs text-gold-200">
              <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
              <span>मध्यवर्ती मंडप, म्हाडा टॉवर्स प्रांगण</span>
            </div>

            <button
              onClick={() => setShowFullTable(!showFullTable)}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 border border-gold-400/50 transition flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{showFullTable ? "तक्ता लपवा" : "१० दिवसांचा तक्ता पहा"}</span>
            </button>
          </div>
        </div>

        {/* 10-DAY SELECTOR TABS */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gold-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              दिवस निवडा (Select Festival Day):
            </span>
            <span className="text-[11px] text-gray-300">
              आजची आरती: <strong className="text-gold-300">{currentDayItem?.hostWing}</strong>
            </span>
          </div>

          {/* Horizontal scrollable pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {schedule.map((day) => {
              const isSelected = day.dayNumber === selectedDayNumber;
              const isToday = day.isCurrentDay;
              return (
                <button
                  key={day.dayNumber}
                  onClick={() => setSelectedDayNumber(day.dayNumber)}
                  className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all border flex flex-col items-center gap-0.5 min-w-[95px] ${
                    isSelected
                      ? "bg-gradient-to-r from-gold-500 to-amber-500 text-maroon-950 border-gold-300 shadow-lg scale-[1.03]"
                      : isToday
                      ? "bg-maroon-800 text-gold-200 border-amber-400 shadow-md ring-2 ring-amber-400/40"
                      : "bg-maroon-950/70 text-gray-300 hover:bg-maroon-900 border-gold-500/30 hover:border-gold-400"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span>दिवस {day.dayNumber}</span>
                    {isToday && (
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" title="आजचा दिवस" />
                    )}
                  </div>
                  <span className={`text-[10px] font-semibold truncate max-w-[85px] ${
                    isSelected ? "text-maroon-900" : "text-gold-400/90"
                  }`}>
                    {day.hostWing.split("(")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE SELECTED DAY SPOTLIGHT CARD */}
        {activeDay && (
          <div className="bg-gradient-to-b from-maroon-950/90 to-maroon-900/90 rounded-2xl p-5 sm:p-6 border-2 border-gold-400/60 shadow-xl mb-6">
            
            {/* Top row with Host Wing Badge and Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gold-500/30">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-gradient-to-r from-gold-400 to-amber-500 text-maroon-950 uppercase tracking-wide">
                    {activeDay.dateStr}
                  </span>
                  {activeDay.isCurrentDay && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span> आजची विशेष आरती
                    </span>
                  )}
                </div>
                
                {/* Host Building Highlight */}
                <div className="flex items-center gap-2 mt-1">
                  <Building className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <h4 className="text-lg sm:text-xl md:text-2xl font-black text-gold-300 font-heading">
                    यजमान इमारत: <span className="text-white underline decoration-gold-400">{activeDay.hostWing}</span>
                  </h4>
                </div>
                {activeDay.hostLead && (
                  <p className="text-xs text-gold-100/70 mt-0.5 ml-7">
                    विंग प्रमुख / प्रतिनिधी: <strong className="text-gold-200">{activeDay.hostLead}</strong>
                  </p>
                )}
              </div>

              {/* WhatsApp Share Button */}
              <button
                onClick={() => handleShareDayAarti(activeDay)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md border border-emerald-400/50 transition transform hover:scale-[1.02] flex-shrink-0"
              >
                <Share2 className="w-4 h-4" />
                <span>आरती वेळा व्हॉट्सॲपवर पाठवा</span>
              </button>
            </div>

            {/* Timings: Morning & Evening Aarti Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              
              {/* Morning Aarti */}
              <div className="bg-maroon-950/80 rounded-xl p-4 border border-gold-500/40 relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-maroon-950 bg-gold-300 px-2.5 py-0.5 rounded-full">
                    🌅 सकाळची प्रभात महाआरती
                  </span>
                  <div className="flex items-center gap-1 text-gold-300 font-bold text-xs">
                    <Clock className="w-3.5 h-3.5 text-festive-saffron" />
                    <span>{activeDay.morningTime}</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white mt-2">
                  {activeDay.morningRitual}
                </p>
                <p className="text-xs text-gold-200/80 mt-1">
                  सर्व रहिवाशांनी स्नान करून पवित्र वातावरणात उपस्थित राहावे.
                </p>
              </div>

              {/* Evening Aarti */}
              <div className="bg-maroon-950/80 rounded-xl p-4 border border-gold-500/40 relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-maroon-950 bg-amber-400 px-2.5 py-0.5 rounded-full">
                    🪔 संध्याकाळची भव्य धूपारती
                  </span>
                  <div className="flex items-center gap-1 text-gold-300 font-bold text-xs">
                    <Clock className="w-3.5 h-3.5 text-festive-saffron" />
                    <span>{activeDay.eveningTime}</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white mt-2">
                  {activeDay.eveningRitual}
                </p>
                <p className="text-xs text-gold-200/80 mt-1">
                  १०१ दीप प्रज्वलन व महिला मंडळाचे भक्तिगीत गायन.
                </p>
              </div>

            </div>

            {/* Special Prasad & naivedya footer for selected day */}
            <div className="mt-4 p-3 rounded-xl bg-amber-950/50 border border-gold-500/30 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gold-400" />
                <span className="text-gold-200 font-medium">दिवसाचा विशेष प्रसाद व नैवेद्य:</span>
                <strong className="text-white">{activeDay.specialPrasad}</strong>
              </div>
              <span className="text-[11px] text-gray-300 italic">
                (यजमान विंग परिवारातर्फे सादर)
              </span>
            </div>

          </div>
        )}

        {/* FULL 10-DAY BUILDING HOST SCHEDULE TABLE (Toggled or visible) */}
        {showFullTable && (
          <div className="bg-maroon-950/90 rounded-xl p-4 border border-gold-400/50 mb-4 overflow-x-auto">
            <h4 className="text-sm sm:text-base font-bold text-gold-300 mb-3 font-heading flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>श्री गणेशोत्सव २०२६: १० दिवसांचे संपूर्ण आरती व यजमान वेळापत्रक</span>
            </h4>

            <table className="w-full text-left text-xs text-gray-200 border-collapse">
              <thead>
                <tr className="border-b border-gold-500/30 text-gold-300 bg-maroon-900/60">
                  <th className="p-2.5">दिवस व तारीख</th>
                  <th className="p-2.5">यजमान इमारत (Host Building)</th>
                  <th className="p-2.5">सकाळची आरती</th>
                  <th className="p-2.5">सायंकाळची महाआरती</th>
                  <th className="p-2.5">विशेष नैवेद्य</th>
                  <th className="p-2.5 text-center">कृती</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-500/20">
                {schedule.map((item) => (
                  <tr
                    key={item.dayNumber}
                    className={`hover:bg-gold-500/10 transition ${
                      item.dayNumber === selectedDayNumber ? "bg-gold-500/20 font-semibold text-white" : ""
                    }`}
                  >
                    <td className="p-2.5 font-medium whitespace-nowrap">
                      {item.dateStr}
                      {item.isCurrentDay && (
                        <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-red-600 text-white rounded font-bold">
                          आज
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 text-gold-200 font-bold whitespace-nowrap">
                      {item.hostWing}
                    </td>
                    <td className="p-2.5">{item.morningTime}</td>
                    <td className="p-2.5">{item.eveningTime}</td>
                    <td className="p-2.5 text-gray-300">{item.specialPrasad}</td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => setSelectedDayNumber(item.dayNumber)}
                        className="px-2 py-1 bg-maroon-800 hover:bg-gold-500 hover:text-maroon-950 text-gold-200 rounded text-[10px] font-bold border border-gold-500/40 transition"
                      >
                        पहा
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Gentle Notice */}
        <div className="p-3 rounded-lg bg-maroon-950/70 border border-gold-500/20 text-center text-xs text-gold-200/90 flex items-center justify-center gap-2">
          <span>🔔</span>
          <span>
            सर्व इमारतींमधील (G, H, I, J, K) रहिवाशांनी आरती वेळेच्या १० मिनिटे आधी उपस्थित राहून मंडळ व्यवस्थापनास सहकार्य करावे.
          </span>
        </div>

      </div>
    </div>
  );
};

export default AartiCard;
