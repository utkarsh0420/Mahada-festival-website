import React, { useState } from "react";
import { 
  Calendar, Clock, Building, Sparkles, Share2, 
  ChevronRight, Award, CheckCircle2, Music 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const TEN_DAYS_DATA = [
  {
    day: 1,
    date: "७ सप्टेंबर २०२६ (शनिवार)",
    dateEn: "7 September 2026 (Saturday)",
    tithi: "श्री गणेश चतुर्थी (गणेश आगमन व प्राणप्रतिष्ठा)",
    tithiEn: "Ganesh Chaturthi (Arrival & Murti Sthapana)",
    morningTime: "०८:३० AM",
    eveningTime: "०८:०० PM",
    hostWing: "G - नंदादेवी (Nandadevi)",
    hostWingEn: "G - Nandadevi",
    hostLead: "श्री. सचिन पाटील (फ्लॅट G-402)",
    ritual: "सकाळी ९:३० वाजतगाजत आगमन, प्रतिष्ठापना व काकड आरती",
    ritualEn: "Grand Arrival at 9:30 AM with Dhol-Tasha, Sthapana & Kakad Aarti",
    cultural: "रात्री ९:०० स्थानिक बालगोपाळांचे स्वागत व श्लोक पठण",
    culturalEn: "9:00 PM Welcome ceremony & children's shloka recitation"
  },
  {
    day: 2,
    date: "८ सप्टेंबर २०२६ (रविवार)",
    dateEn: "8 September 2026 (Sunday)",
    tithi: "ऋषी पंचमी विशेष पूजा",
    tithiEn: "Rishi Panchami Special Pooja",
    morningTime: "०८:३० AM",
    eveningTime: "०८:०० PM",
    hostWing: "H - निलगिरी (Nilgiri)",
    hostWingEn: "H - Nilgiri",
    hostLead: "श्री. विजय पवार (फ्लॅट H-301)",
    ritual: "ऋषी पंचमी महापूजा, काकड आरती व पंचखाद्य नैवेद्य",
    ritualEn: "Rishi Panchami Mahapooja, Kakad Aarti & Panchkhadya naivedya",
    cultural: "सायंकाळी ६:०० लहान मुलांची चित्रकला व हस्ताक्षर स्पर्धा",
    culturalEn: "6:00 PM Children's Drawing & Handwriting Competition"
  },
  {
    day: 3,
    date: "९ सप्टेंबर २०२६ (सोमवार)",
    dateEn: "9 September 2026 (Monday)",
    tithi: "श्री महालक्ष्मी / गौरी आवाहन",
    tithiEn: "Shri Mahalakshmi / Gauri Aavahan",
    morningTime: "०८:३० AM",
    eveningTime: "०८:०० PM",
    hostWing: "J - पूर्वांचल (Purvanchal)",
    hostWingEn: "J - Purvanchal",
    hostLead: "श्री. निलेश मोरे (फ्लॅट J-202)",
    ritual: "गौरी आवाहन, विधिवत प्रतिष्ठापना व प्रभात महाआरती",
    ritualEn: "Gauri Aavahan, ceremonial sthapana and morning aarti",
    cultural: "रात्री ८:३० महिला मंडळाचे पारंपारिक खेळ व संगीत खुर्ची",
    culturalEn: "8:30 PM Women's Wing Traditional Games & Musical Chairs"
  },
  {
    day: 4,
    date: "१० सप्टेंबर २०२६ (मंगळवार)",
    dateEn: "10 September 2026 (Tuesday)",
    tithi: "गौरी पूजन व हळदी-कुंकू सोहळा",
    tithiEn: "Gauri Pujan & Haldi-Kunku Ceremony",
    morningTime: "०८:३० AM",
    eveningTime: "०८:०० PM",
    hostWing: "K - गोवर्धन (Govardhan)",
    hostWingEn: "K - Govardhan",
    hostLead: "श्री. गणेश जाधव (फ्लॅट K-603)",
    ritual: "गौरी पूजन, काकड आरती व विशेष गोड बुंदी नैवेद्य",
    ritualEn: "Gauri Pujan, morning aarti and sweet boondi naivedya",
    cultural: "सायंकाळी ५:०० महिला मंडळाचा भव्य हळदी-कुंकू सोहळा",
    culturalEn: "5:00 PM Grand Haldi-Kunku function for all society residents"
  },
  {
    day: 5,
    date: "११ सप्टेंबर २०२६ (बुधवार)",
    dateEn: "11 September 2026 (Wednesday)",
    tithi: "गौरी विसर्जन व विशेष महापूजा",
    tithiEn: "Gauri Visarjan & Special Mahapooja",
    morningTime: "०८:३० AM",
    eveningTime: "०८:०० PM",
    hostWing: "G - नंदादेवी (Nandadevi)",
    hostWingEn: "G - Nandadevi",
    hostLead: "श्री. सतीश कांबळे (फ्लॅट G-101)",
    ritual: "गौरी उत्तरपूजा, विधिवत निरोप व प्रभात महाआरती",
    ritualEn: "Gauri uttarpooja, ceremonial farewell and morning aarti",
    cultural: "रात्री ८:३० स्थानिक भजनी मंडळाचे सुरेल भक्तिगीते गायन",
    culturalEn: "8:30 PM Devotional bhajan recital by local resident group"
  },
  {
    day: 6,
    date: "१२ सप्टेंबर २०२६ (गुरुवार)",
    dateEn: "12 September 2026 (Thursday)",
    tithi: "एकता भजन संध्या व संकीर्तन",
    tithiEn: "Unity Bhajan Sandhya & Sankirtan",
    morningTime: "०८:३० AM",
    eveningTime: "०८:०० PM",
    hostWing: "H - निलगिरी (Nilgiri)",
    hostWingEn: "H - Nilgiri",
    hostLead: "श्री. राहुल गायकवाड (फ्लॅट H-405)",
    ritual: "प्रभात आरती, अथर्वशीर्ष सहस्त्रावर्तन पठण व पेढे वाटप",
    ritualEn: "Morning aarti, Atharvashirsha mass recitation & pedha distribution",
    cultural: "रात्री ८:३० टाळ-मृदुंग व ढोलकीच्या गजरात अखंड हरिनाम",
    culturalEn: "8:30 PM Taal-Mridang sankirtan and community chanting"
  },
  {
    day: 7,
    date: "१३ सप्टेंबर २०२६ (शुक्रवार)",
    dateEn: "13 September 2026 (Friday)",
    tithi: "सामूहिक श्री सत्यविनायक महापूजा",
    tithiEn: "Community Shri Satyavinayak Mahapooja",
    morningTime: "०८:३० AM",
    eveningTime: "०८:०० PM",
    hostWing: "J - पूर्वांचल (Purvanchal)",
    hostWingEn: "J - Purvanchal",
    hostLead: "श्री. निलेश मोरे व जे-विंग समिती",
    ritual: "सकाळी १०:०० सामूहिक सत्यविनायक महापूजा संकल्प व शिरा प्रसाद",
    ritualEn: "10:00 AM Satyavinayak mass pooja sankalp & sheera prasad",
    cultural: "रात्री ८:३० ज्येष्ठ नागरिक सन्मान व अनुभव कथन",
    culturalEn: "8:30 PM Senior citizen felicitation and life experience sharing"
  },
  {
    day: 8,
    date: "१४ सप्टेंबर २०२६ (शनिवार)",
    dateEn: "14 September 2026 (Saturday)",
    tithi: "महिला मंडळ विशेष महाआरती व युवा मंच",
    tithiEn: "Mahila Mandal Aarti & Youth Talent Night",
    morningTime: "०८:३० AM",
    eveningTime: "०८:०० PM",
    hostWing: "K - गोवर्धन (Govardhan)",
    hostWingEn: "K - Govardhan",
    hostLead: "श्रीमती सुनीता जाधव व के-विंग महिला",
    ritual: "प्रभात महाआरती, श्री सूक्त पठण व खिरीचा नैवेद्य",
    ritualEn: "Morning aarti, Shri Sukta chant and divine kheer offering",
    cultural: "सायंकाळी ६:०० सोसायटीच्या मुलांचे फॅन्सी ड्रेस व नृत्य",
    culturalEn: "6:00 PM Society Children Fancy Dress & Cultural Dance"
  },
  {
    day: 9,
    date: "१५ सप्टेंबर २०२६ (रविवार)",
    dateEn: "15 September 2026 (Sunday)",
    tithi: "भव्य दीपोत्सव व गुणगौरव सोहळा",
    tithiEn: "Grand Deepotsav & Student Felicitation",
    morningTime: "०८:३० AM",
    eveningTime: "०८:०० PM",
    hostWing: "G & H WINGS (नंदादेवी व निलगिरी)",
    hostWingEn: "G & H Wings (Nandadevi & Nilgiri)",
    hostLead: "श्री. सचिन पाटील व श्री. विजय पवार",
    ritual: "प्रभात महाआरती व विशेष मोदक नैवेद्य",
    ritualEn: "Morning maha aarti & special fresh modak offering",
    cultural: "रात्री ८:३० १०वी व १२वी गुणवंत विद्यार्थ्यांचा सत्कार सोहळा",
    culturalEn: "8:30 PM SSC & HSC Meritorious Students Felicitation"
  },
  {
    day: 10,
    date: "१६ सप्टेंबर २०२६ (सोमवार)",
    dateEn: "16 September 2026 (Monday)",
    tithi: "श्री अनंत चतुर्दशी (सांगता महाआरती)",
    tithiEn: "Anant Chaturdashi (Concluding Maha Aarti)",
    morningTime: "०८:३० AM",
    eveningTime: "०८:०० PM",
    hostWing: "सर्व ४ इमारती संयुक्त (G • H • J • K WINGS)",
    hostWingEn: "All 4 Buildings Joint (G, H, J, K)",
    hostLead: "समस्त म्हाडा टॉवर्स सोसायटी रहिवासी परिवार",
    ritual: "सकाळी ९:०० उत्तरपूजा संकल्प व सांगता प्रभात महाआरती",
    ritualEn: "9:00 AM Uttarpooja sankalp and grand morning farewell aarti",
    cultural: "रात्री ८:०० सांगता महाआरती, आभार प्रदर्शन व बाप्पांचा जयघोष",
    culturalEn: "8:00 PM Concluding maha aarti, vote of thanks & Bappa slogans"
  }
];

const TenDaysSchedule = ({ onShareWhatsApp }) => {
  const { language, t } = useLanguage();
  const [selectedDay, setSelectedDay] = useState(1);

  const activeItem = TEN_DAYS_DATA.find((d) => d.day === selectedDay) || TEN_DAYS_DATA[0];

  const handleShareDay = (item) => {
    if (onShareWhatsApp) {
      onShareWhatsApp({
        titleMr: `📅 १० दिवस वेळापत्रक - दिवस ${item.day}`,
        time: `${item.date} | सकाळ आरती: ${item.morningTime} | संध्या आरती: ${item.eveningTime}`,
        venue: "मुख्य उत्सव मंडप, म्हाडा टॉवर्स",
        descriptionMr: `तिथी: ${item.tithi}\nयजमान इमारत: ${item.hostWing}\nप्रमुख: ${item.hostLead}\nविधी: ${item.ritual}\nसांस्कृतिक कार्यक्रम: ${item.cultural}\nसर्व भाविकांनी उपस्थित राहावे!`
      });
    }
  };

  return (
    <section id="schedule-section" className="scroll-mt-20 my-8">
      <div className="bg-gradient-to-br from-white via-[#FFFDF9] to-[#FAF5EB] rounded-3xl border-2 border-gold-400 shadow-xl overflow-hidden p-4 sm:p-7 md:p-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-gold-300/60">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-maroon-900 bg-gold-200/90 px-3 py-1 rounded-full border border-gold-400">
              <Calendar className="w-4 h-4 text-maroon-800" />
              <span>{t("scheduleTitle")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-maroon-950 font-heading mt-1.5">
              {language === "mr" ? "१० दिवसांचे तारीखनिहाय वेळापत्रक" : "10-Day Date-Wise Festival Schedule"}
            </h2>
            <p className="text-xs sm:text-sm text-maroon-800 font-medium">
              {t("scheduleSubtitle")}
            </p>
          </div>

          <button
            onClick={() => handleShareDay(activeItem)}
            className="self-start md:self-center inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition"
          >
            <Share2 className="w-4 h-4" />
            <span>{language === "mr" ? "वेळापत्रक शेअर करा" : "Share Day Schedule"}</span>
          </button>
        </div>

        {/* Horizontal 10 Days Tab Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          {TEN_DAYS_DATA.map((item) => {
            const isSelected = item.day === selectedDay;
            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border text-center ${
                  isSelected
                    ? "bg-maroon-850 text-gold-200 border-gold-500 shadow-md transform scale-105"
                    : "bg-white text-maroon-900 hover:bg-gold-100 border-gold-300 shadow-2xs"
                }`}
              >
                <span className="block text-[11px] opacity-80 uppercase tracking-wider">
                  {t("day")} {item.day}
                </span>
                <span className="block font-extrabold whitespace-nowrap">
                  {item.date.split(" ")[0]} {item.date.split(" ")[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Day Spotlight Card */}
        <div className="bg-white rounded-2xl border-2 border-gold-400 p-5 sm:p-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-gold-200">
            <div>
              <span className="text-xs font-black text-amber-900 bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
                {t("day")} {activeItem.day} • {language === "mr" ? activeItem.date : activeItem.dateEn}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-maroon-950 font-heading mt-2">
                {language === "mr" ? activeItem.tithi : activeItem.tithiEn}
              </h3>
            </div>

            {/* Host Wing Badge */}
            <div className="flex items-center gap-2 bg-maroon-900 text-gold-200 px-3.5 py-2 rounded-xl border border-gold-400 shadow-sm flex-shrink-0">
              <Building className="w-4 h-4 text-gold-300" />
              <div className="text-xs">
                <span className="text-[10px] text-gold-300/80 block uppercase">{t("hostWing")}</span>
                <span className="font-bold">{language === "mr" ? activeItem.hostWing : activeItem.hostWingEn}</span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Aarti Times Box */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-gold-300 space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-extrabold text-maroon-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-maroon-700" />
                <span>{language === "mr" ? "महाआरती वेळा" : "Maha Aarti Timings"}</span>
              </h4>
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-gray-800 pt-1">
                <span>{t("morningAarti")}:</span>
                <span className="text-maroon-900 bg-white px-2.5 py-1 rounded-lg border border-amber-300">
                  {activeItem.morningTime}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-gray-800">
                <span>{t("eveningAarti")}:</span>
                <span className="text-maroon-900 bg-white px-2.5 py-1 rounded-lg border border-amber-300">
                  {activeItem.eveningTime}
                </span>
              </div>
            </div>

            {/* Wing Coordinator Box */}
            <div className="p-4 rounded-xl bg-gold-50/60 border border-gold-300 space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-extrabold text-maroon-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{t("hostRepresentative")}</span>
              </h4>
              <p className="text-xs sm:text-sm font-bold text-maroon-950 pt-1">
                {activeItem.hostLead}
              </p>
              <p className="text-[11px] text-gray-600">
                {language === "mr" 
                  ? "आरती व्यवस्था व मोदक नैवेद्य व्यवस्थापन विंग प्रमुख सांभाळतील." 
                  : "Aarti arrangement and prasad coordination by Wing Lead."}
              </p>
            </div>

            {/* Rituals */}
            <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs">
              <span className="text-[11px] uppercase tracking-wider font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                {t("specialRitual")}
              </span>
              <p className="text-xs sm:text-sm font-medium text-gray-800 mt-2">
                {language === "mr" ? activeItem.ritual : activeItem.ritualEn}
              </p>
            </div>

            {/* Cultural Program */}
            <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs">
              <span className="text-[11px] uppercase tracking-wider font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded">
                {t("culturalHighlights")}
              </span>
              <p className="text-xs sm:text-sm font-medium text-gray-800 mt-2">
                {language === "mr" ? activeItem.cultural : activeItem.culturalEn}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default TenDaysSchedule;
