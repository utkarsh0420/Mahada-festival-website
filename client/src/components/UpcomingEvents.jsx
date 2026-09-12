import React, { useState } from "react";
import { 
  Calendar, Clock, MapPin, Sparkles, Share2, 
  Music, Trophy, Users, HeartHandshake, ChevronRight, Building
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const UPCOMING_FESTIVAL_EVENTS = [
  {
    id: "comp1",
    titleMr: "बाल गोपाळ चित्रकला व वक्तृत्व स्पर्धा",
    titleEn: "Children's Drawing & Elocution Competition",
    dateMr: "८ सप्टेंबर २०२६ (सायंकाळी ५:०० ते ७:००)",
    dateEn: "8 September 2026 (5:00 PM to 7:00 PM)",
    venueMr: "क्लब हाऊस / उत्सव मंडप",
    venueEn: "Club House / Festive Pandal",
    category: "सांस्कृतिक",
    categoryEn: "Cultural",
    hostWing: "सर्व ४ इमारती (वय वर्षे ५ ते १५)",
    hostWingEn: "All 4 Buildings (Age 5-15)",
    descMr: "विषय: 'माझा लाडका बाप्पा' व 'पर्यावरणपूरक गणेशोत्सव'. सर्व सहभागी मुलांना आकर्षक भेटवस्तू व विजेत्यांना सन्मानचिन्ह दिले जाईल.",
    descEn: "Themes: 'My Beloved Bappa' & 'Eco-Friendly Ganesh Utsav'. Participation gifts for all, trophies for winners."
  },
  {
    id: "comp2",
    titleMr: "महिला मंडळाचा पारंपरिक हळदी-कुंकू व खेळ",
    titleEn: "Women's Wing Haldi-Kunku & Traditional Games",
    dateMr: "१० सप्टेंबर २०२६ (सायंकाळी ५:३० वाजता)",
    dateEn: "10 September 2026 (5:30 PM onwards)",
    venueMr: "मध्यवर्ती उत्सव मंडप, म्हाडा टॉवर्स",
    venueEn: "Central Festive Pandal",
    category: "महिला विशेष",
    categoryEn: "Women Special",
    hostWing: "सर्व ४ विंग्स महिला भगिनी",
    hostWingEn: "All 4 Wings Women Residents",
    descMr: "पारंपरिक खेळ, संगीत खुर्ची, उखाणे स्पर्धा व वाण वाटप. सर्व ४ इमारतींच्या महिलांनी मोठ्या संख्येने उपस्थित राहावे.",
    descEn: "Musical chairs, traditional games, and gift distribution for all resident families."
  },
  {
    id: "comp3",
    titleMr: "एकता भजन संध्या व टाळ-मृदुंग संकीर्तन",
    titleEn: "Unity Bhajan Sandhya & Taal-Mridang",
    dateMr: "१२ सप्टेंबर २०२६ (रात्री ८:३० वाजता)",
    dateEn: "12 September 2026 (8:30 PM onwards)",
    venueMr: "मुख्य बाप्पा मंडप",
    venueEn: "Main Bappa Pandal",
    category: "भक्तिसंगीत",
    categoryEn: "Devotional",
    hostWing: "H विंग - निलगिरी व स्थानिक भजनी मंडळ",
    hostWingEn: "H Wing - Nilgiri & Resident Bhajan Group",
    descMr: "स्थानिक वारकरी व भजनी कलाकारांचे सुरेल अभंग, गवळणी व भारुडे. सर्वांसाठी भक्तिमय मेजवानी.",
    descEn: "Soulful Marathi abhangs and devotional singing by resident artists."
  },
  {
    id: "comp4",
    titleMr: "गुणवंत विद्यार्थी सत्कार व बक्षीस वितरण",
    titleEn: "Meritorious Students Felicitation & Prizes",
    dateMr: "१५ सप्टेंबर २०२६ (रात्री ८:३० वाजता)",
    dateEn: "15 September 2026 (8:30 PM onwards)",
    venueMr: "मुख्य उत्सव व्यासपीठ",
    venueEn: "Main Festive Stage",
    category: "सत्कार सोहळा",
    categoryEn: "Felicitation",
    hostWing: "G, H, J, K विंग्ज समिती",
    hostWingEn: "G, H, J, K Wings Committee",
    descMr: "१०वी, १२वी, पदवी व क्रीडा क्षेत्रात उल्लेखनीय यश मिळवलेल्या म्हाडा टॉवर्समधील विद्यार्थ्यांचा विशेष सन्मानचिन्ह देऊन गौरव.",
    descEn: "Honoring 10th, 12th, degree and sports achievers from MHADA Towers with mementos."
  }
];

export const YEARLY_EVENTS = [
  {
    id: "yr1",
    titleMr: "शिवजयंती भव्य उत्सव व पोवाडा",
    titleEn: "Chhatrapati Shivaji Maharaj Jayanti",
    dateMr: "१९ फेब्रुवारी (दरवर्षी)",
    dateEn: "19 February (Annually)",
    venueMr: "म्हाडा टॉवर्स मुख्य प्रांगण",
    venueEn: "MHADA Towers Main Courtyard",
    category: "ऐतिहासिक",
    categoryEn: "Historic",
    descMr: "छत्रपती शिवाजी महाराज यांच्या प्रतिमेची पालखी मिरवणूक, शिवकालीन व्याख्यान व शाहीर पोवाडा सादरीकरण.",
    descEn: "Palkhi procession, inspiring historic lecture, and traditional Powada performance."
  },
  {
    id: "yr2",
    titleMr: "रक्तदान व मोफत आरोग्य तपासणी शिबिर",
    titleEn: "Mega Blood Donation & Health Camp",
    dateMr: "१ मे - महाराष्ट्र दिन (दरवर्षी)",
    dateEn: "1 May - Maharashtra Day (Annually)",
    venueMr: "सोसायटी क्लब हाऊस",
    venueEn: "Society Club House",
    category: "सामाजिक सेवा",
    categoryEn: "Social Welfare",
    descMr: "पिंपरी चिंचवड रक्तपेढी व तज्ज्ञ डॉक्टरांच्या सहकार्याने भव्य रक्तदान व बीपी, शुगर, नेत्र तपासणी शिबिर.",
    descEn: "Community blood drive and free health screening in association with PCMC Blood Bank."
  },
  {
    id: "yr3",
    titleMr: "पर्यावरण दिन वृक्षारोपण व स्वच्छता मोहीम",
    titleEn: "Environment Day Tree Plantation & Cleanliness",
    dateMr: "५ जून (दरवर्षी)",
    dateEn: "5 June (Annually)",
    venueMr: "म्हाडा टॉवर्स बाह्य परिसर व उद्यान",
    venueEn: "Society Garden & Perimeter",
    category: "पर्यावरण",
    categoryEn: "Environment",
    descMr: "संकुलात ५० हून अधिक औषधी व सावली देणाऱ्या झाडांची लागवड व 'स्वच्छ म्हाडा टॉवर्स' परिसर स्वच्छता मोहीम.",
    descEn: "Planting 50+ medicinal trees and comprehensive cleanliness drive across all buildings."
  },
  {
    id: "yr4",
    titleMr: "दिवाळी स्नेहसंमेलन व किल्ले स्पर्धा",
    titleEn: "Diwali Snehasammelan & Fort Making",
    dateMr: "दिवाळी पाडवा (दरवर्षी)",
    dateEn: "Diwali Padwa (Annually)",
    venueMr: "मध्यवर्ती उद्यान प्रांगण",
    venueEn: "Central Garden Lawn",
    category: "स्नेहसंमेलन",
    categoryEn: "Festival Gathering",
    descMr: "लहान मुलांची पारंपरिक किल्ले बनवण्याची स्पर्धा, दीपोत्सव आणि सर्व ४ विंग्जच्या रहिवाशांसाठी दिवाळी फराळ मेळावा.",
    descEn: "Historical fort-making contest for kids, 1000-diya deepotsav, and community gathering."
  }
];

const UpcomingEvents = ({ onShareWhatsApp }) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("festival"); // "festival" or "yearly"

  const eventsList = activeTab === "festival" ? UPCOMING_FESTIVAL_EVENTS : YEARLY_EVENTS;

  const handleShareEvent = (ev) => {
    if (onShareWhatsApp) {
      onShareWhatsApp({
        titleMr: `🚩 आगामी कार्यक्रम: ${ev.titleMr}`,
        time: ev.dateMr,
        venue: ev.venueMr,
        descriptionMr: `${ev.descMr}\nठिकाण: ${ev.venueMr}\nसर्व ४ इमारतींच्या रहिवाशांना आग्रहाचे निमंत्रण!\nम्हाडा टॉवर्स उत्सव मंडळ, पिंपरी वाघेरे.`
      });
    }
  };

  return (
    <section id="upcoming-section" className="scroll-mt-20 my-8">
      <div className="bg-gradient-to-br from-white via-[#FFFDF9] to-[#FAF5EB] rounded-3xl border-2 border-gold-400 shadow-xl overflow-hidden p-4 sm:p-7 md:p-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-gold-300/60">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-maroon-900 bg-gold-200/90 px-3 py-1 rounded-full border border-gold-400">
              <Calendar className="w-4 h-4 text-maroon-800" />
              <span>{t("upcomingTitle")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-maroon-950 font-heading mt-1.5">
              {language === "mr" ? "आगामी व वार्षिक कार्यक्रम पत्रिका" : "Upcoming & Yearly Events Calendar"}
            </h2>
            <p className="text-xs sm:text-sm text-maroon-800 font-medium">
              {t("upcomingSubtitle")}
            </p>
          </div>

          {/* Tab Switcher Buttons */}
          <div className="flex items-center gap-2 bg-maroon-950 p-1.5 rounded-2xl border border-gold-500/40">
            <button
              onClick={() => setActiveTab("festival")}
              className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "festival"
                  ? "bg-gold-400 text-maroon-950 shadow-md font-black"
                  : "text-gold-200 hover:text-white"
              }`}
            >
              {t("festivalEventsTab")}
            </button>
            <button
              onClick={() => setActiveTab("yearly")}
              className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "yearly"
                  ? "bg-gold-400 text-maroon-950 shadow-md font-black"
                  : "text-gold-200 hover:text-white"
              }`}
            >
              {t("yearlyEventsTab")}
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {eventsList.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl border-2 border-gold-300 p-5 shadow-sm hover:border-gold-500 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-black uppercase text-maroon-900 bg-gold-100 px-2.5 py-0.5 rounded-md border border-gold-300">
                    {language === "mr" ? ev.category : ev.categoryEn}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{language === "mr" ? ev.dateMr : ev.dateEn}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-maroon-950 font-heading mb-2">
                  {language === "mr" ? ev.titleMr : ev.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                  {language === "mr" ? ev.descMr : ev.descEn}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 pt-2 border-t border-gray-100">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                    <span>{language === "mr" ? ev.venueMr : ev.venueEn}</span>
                  </span>
                  {ev.hostWing && (
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-maroon-700 flex-shrink-0" />
                      <span>{language === "mr" ? ev.hostWing : ev.hostWingEn}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gold-100 flex items-center justify-end">
                <button
                  onClick={() => handleShareEvent(ev)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300 transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{language === "mr" ? "व्हॉट्सॲपवर पाठवा" : "Share on WhatsApp"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default UpcomingEvents;
