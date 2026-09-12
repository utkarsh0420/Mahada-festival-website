import React from "react";
import { 
  Building2, ShieldCheck, HeartHandshake, Leaf, Award, 
  PhoneCall, Mail, MapPin, Sparkles, CheckCircle2, Shield, Share2 
} from "lucide-react";
import { useConfig } from "../context/ConfigContext";
import { useLanguage } from "../context/LanguageContext";

const AboutMandal = ({ onShareWhatsApp }) => {
  const { config } = useConfig();
  const { language, t } = useLanguage();

  const handleShareMandal = () => {
    if (onShareWhatsApp) {
      onShareWhatsApp({
        titleMr: "म्हाडा टॉवर्स उत्सव मंडळ - अधिकृत माहिती",
        time: `वर्ष ${config?.festivalYear || "२०२६"}`,
        venue: "पिंपरी वाघेरे, पिंपरी चिंचवड, पुणे - ४११०१७",
        descriptionMr: `नोंदणी क्र: ${config?.regNo || "१२४३/२०२५"}\nध्येय: '४ विंग्स, एकच परिवार'\nपर्यावरणपूरक उत्सव, चोख सुरक्षा व अखंड सामाजिक एकता.\nसोसायटी ईमेल: mhadatowersutsav@gmail.com\nसंपर्क: ${config?.emergencyHelpline || "+91 98220 11223"}`
      });
    }
  };

  const pillars = [
    {
      icon: HeartHandshake,
      titleMr: "सामाजिक एकता व सलोखा",
      titleEn: "Social Unity & Harmony",
      descMr: "४ इमारतींमधील (G-नंदादेवी, H-निलगिरी, J-पूर्वांचल, K-गोवर्धन) सर्व मालक व भाडेकरू कुटुंबांना एका सूत्रात बांधणारा उत्सव.",
      descEn: "Uniting all owner and tenant families across 4 buildings (G, H, J, K) under one divine family."
    },
    {
      icon: Leaf,
      titleMr: "१००% पर्यावरणपूरक संकल्प",
      titleEn: "100% Eco-Friendly Festival",
      descMr: "शाडू मातीची मूर्ती, शून्य प्लास्टिक वापर व संकुलातच उभारलेल्या कृत्रिम हौदात १००% पर्यावरणपूरक विसर्जन.",
      descEn: "Pure clay idol, zero plastic usage, and eco-friendly immersion in dedicated artificial water tank."
    },
    {
      icon: ShieldCheck,
      titleMr: "चोख सुरक्षा व २४x७ निगराणी",
      titleEn: "Safety, Security & 24x7 Vigilance",
      descMr: "संपूर्ण उत्सव परिसर उच्च दर्जाच्या सीसीटीव्ही निगराणीखाली, २४x७ सुरक्षा रक्षक व शिस्तबद्ध स्वयंसेवक दल.",
      descEn: "High-definition CCTV coverage across the festive premises, 24x7 trained security guards, and volunteer squad."
    },
    {
      icon: Award,
      titleMr: "सांस्कृतिक व बालसंस्कार",
      titleEn: "Culture, Youth & Women Welfare",
      descMr: "लहान मुलांसाठी चित्रकला व वक्तृत्व स्पर्धा, महिला मंडळाचे कार्यक्रम व गुणवंत विद्यार्थ्यांचा गौरव सोहळा.",
      descEn: "Children drawing & speech contests, women cultural activities, and student felicitations."
    }
  ];

  const committeeMembers = [
    { roleMr: "अध्यक्ष", roleEn: "President", nameMr: "श्री. सतीश कांबळे", wing: "G विंग (नंदादेवी)", phone: "+91 98220 11223" },
    { roleMr: "उपाध्यक्ष", roleEn: "Vice President", nameMr: "श्री. विजय पवार", wing: "H विंग (निलगिरी)", phone: "+91 94220 77882" },
    { roleMr: "सचिव", roleEn: "Secretary", nameMr: "श्री. राहुल गायकवाड", wing: "H विंग (निलगिरी)", phone: "+91 98220 44556" },
    { roleMr: "सहसचिव", roleEn: "Joint Secretary", nameMr: "श्री. निलेश मोरे", wing: "J विंग (पूर्वांचल)", phone: "+91 94220 77884" },
    { roleMr: "मुख्य संघटक", roleEn: "Chief Organizer", nameMr: "श्री. गणेश जाधव", wing: "K विंग (गोवर्धन)", phone: "+91 94220 77885" }
  ];

  return (
    <section id="mandal-info-section" className="scroll-mt-20 my-10">
      <div className="bg-gradient-to-br from-white via-[#FFFDF9] to-[#FAF5EB] rounded-3xl border-2 border-gold-400 shadow-xl overflow-hidden p-5 sm:p-8 md:p-10 relative">
        
        {/* Subtle Decorative Aura */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold text-maroon-900 bg-gold-100 px-4 py-1.5 rounded-full border border-gold-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {language === "mr" 
                ? "अधिकृत मंडळ माहिती व पार्श्वभूमी" 
                : "Official Mandal History & Background"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-maroon-950 font-heading tracking-tight">
            {language === "mr" 
              ? (config?.mandalNameMr || "म्हाडा टॉवर्स उत्सव मंडळ")
              : (config?.mandalNameEn || "MHADA Towers Utsav Mandal")}
          </h2>

          <p className="text-sm sm:text-base font-bold text-festive-saffron mt-1.5">
            ॥ ४ विंग्स, एकच परिवार - सहकार्य • शिस्त • अखंड भक्ती ॥
          </p>

          <p className="text-xs sm:text-sm text-gray-700 mt-2 font-medium">
            {config?.regNo ? `नोंदणी क्र: ${config.regNo} - पुणे (धर्मादाय सहआयुक्त मान्यताप्राप्त)` : "नोंदणी क्र: १२४३/२०२५ - पुणे"} • स्थापना: २०२४
          </p>
        </div>

        {/* Story / About Mandal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 relative z-10">
          
          {/* Left: Official Circular Emblem */}
          <div className="lg:col-span-4 flex flex-col items-center text-center p-6 bg-gradient-to-b from-maroon-950 to-maroon-900 text-white rounded-2xl border-2 border-gold-400 shadow-md">
            <div className="relative mb-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-gold-400 via-amber-300 to-gold-500 shadow-xl">
                <img
                  src="/logo.jpg"
                  alt="म्हाडा टॉवर्स लोगो"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            <h3 className="text-lg font-black text-gold-300 font-heading">
              {language === "mr" ? "म्हाडा टॉवर्स उत्सव मंडळ" : "MHADA Towers Utsav Mandal"}
            </h3>
            <p className="text-xs text-gold-100/90 mt-1">
              पिंपरी वाघेरे, पिंपरी चिंचवड, पुणे - ४११०१७
            </p>
            
            <div className="w-full mt-4 pt-4 border-t border-gold-500/30 text-xs text-left space-y-2">
              <div className="flex items-center gap-2 text-gold-200">
                <Mail className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span className="font-mono text-[11px] truncate">mhadatowersutsav@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-gold-200">
                <PhoneCall className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>+91 98220 11223</span>
              </div>
              <div className="flex items-center gap-2 text-gold-200">
                <Building2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>४ विंग्स: G, H, J, K</span>
              </div>
            </div>

            <button
              onClick={handleShareMandal}
              className="mt-4 w-full py-2 bg-gold-400 hover:bg-gold-300 text-maroon-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition transform active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{language === "mr" ? "मंडळ माहिती शेअर करा" : "Share Mandal Profile"}</span>
            </button>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-8 space-y-4 text-gray-800 text-xs sm:text-sm leading-relaxed">
            <div className="p-4 bg-amber-50/80 rounded-2xl border border-gold-300">
              <h4 className="text-sm sm:text-base font-black text-maroon-950 font-heading mb-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{language === "mr" ? "आमचा इतिहास व संकल्प" : "Our Vision & Legacy"}</span>
              </h4>
              <p className="text-xs sm:text-sm text-gray-700">
                {language === "mr" 
                  ? "पिंपरी चिंचवड येथील म्हाडा टॉवर्स गृहनिर्माण संकुलात वसलेल्या ४ मुख्य इमारती - G (नंदादेवी), H (निलगिरी), J (पूर्वांचल) व K (गोवर्धन) मधील शेकडो कुटुंबे दरवर्षी भक्तीभावाने व उत्साहाने एकत्र येऊन श्री गणेशोत्सव साजरा करतात."
                  : "Families residing in the 4 key buildings of MHADA Towers - G (Nandadevi), H (Nilgiri), J (Purvanchal), and K (Govardhan) come together every year with deep devotion to celebrate Ganesh Utsav."}
              </p>
            </div>

            <p>
              {language === "mr"
                ? "हा उत्सव केवळ धार्मिक विधीपुरता मर्यादित नसून, सर्व शेजारी व नागरिकांमध्ये बंधुभाव वाढवणे, बालसंस्कार घडवणे, पर्यावरणपूरक जीवनशैलीचा पुरस्कार करणे आणि संकुलात चोख सुरक्षा व्यवस्था राखणे हा मंडळाचा मूळ उद्देश आहे."
                : "This festival extends beyond rituals—fostering neighborly harmony, cultural values in children, eco-friendly practices, and maintaining top-tier security across the complex."}
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="p-3 bg-white rounded-xl border border-gold-200 shadow-2xs">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-maroon-800 flex-shrink-0" />
                      <h5 className="font-bold text-maroon-950 text-xs sm:text-sm font-heading">
                        {language === "mr" ? p.titleMr : p.titleEn}
                      </h5>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-600">
                      {language === "mr" ? p.descMr : p.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutMandal;
