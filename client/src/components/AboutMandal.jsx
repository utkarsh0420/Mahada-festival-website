import React from "react";
import { 
  Building2, ShieldCheck, HeartHandshake, Leaf, Award, 
  PhoneCall, Mail, MapPin, Sparkles, CheckCircle2, FileText, Share2 
} from "lucide-react";
import { useConfig } from "../context/ConfigContext";

const AboutMandal = ({ onShareWhatsApp }) => {
  const { config } = useConfig();
  const info = config?.mandalInfo || {};

  const handleShareMandal = () => {
    if (onShareWhatsApp) {
      onShareWhatsApp({
        titleMr: "म्हाडा टॉवर्स उत्सव मंडळ - अधिकृत माहिती",
        time: `वर्ष ${config?.festivalYear || "२०२६"}`,
        venue: "पिंपरी वाघेरे, पिंपरी चिंचवड, पुणे - ४११०१७",
        descriptionMr: `नोंदणी क्र: ${config?.regNo || "१२४३/२०२५"}\nध्येय: '५ विंग्स, एकच परिवार'\nपर्यावरणपूरक उत्सव, पारदर्शक हिशोब व अखंड सामाजिक एकता.\nसंपर्क: ${config?.emergencyHelpline || "+91 98220 11223"}`
      });
    }
  };

  const pillars = [
    {
      icon: HeartHandshake,
      titleMr: "सामाजिक एकता व सलोखा",
      titleEn: "Social Unity & Harmony",
      descMr: "५ इमारतींमधील (G, H, I, J, K) सर्व मालक व भाडेकरू कुटुंबांना एका सूत्रात बांधणारा उत्सव."
    },
    {
      icon: Leaf,
      titleMr: "१००% पर्यावरणपूरक संकल्प",
      titleEn: "100% Eco-Friendly Festival",
      descMr: "शाडू मातीची मूर्ती, शून्य प्लास्टिक वापर व संकुलातच उभारलेल्या कृत्रिम हौदात विधिवत विसर्जन."
    },
    {
      icon: ShieldCheck,
      titleMr: "पारदर्शक हिशोब व कारभार",
      titleEn: "Total Financial Transparency",
      descMr: "ऐच्छिक देणग्या व मंडप खर्चाचा प्राथमिक हिशोब दररोज सूचना फलकावर व डिजिटल पोर्टलवर प्रसिद्ध."
    },
    {
      icon: Award,
      titleMr: "सांस्कृतिक व बालसंस्कार",
      titleEn: "Culture, Youth & Women Welfare",
      descMr: "लहान मुलांसाठी चित्रकला व वक्तृत्व स्पर्धा, महिला मंडळाचे भजन व गुणवंत विद्यार्थ्यांचा गौरव."
    }
  ];

  const committeeMembers = [
    { roleMr: "अध्यक्ष", nameMr: "श्री. सतीश कांबळे", wing: "G Wing", phone: "+91 98220 11223" },
    { roleMr: "उपाध्यक्ष", nameMr: "श्री. विजय पवार", wing: "H Wing", phone: "+91 94220 77882" },
    { roleMr: "सचिव", nameMr: "श्री. राहुल गायकवाड", wing: "H Wing", phone: "+91 98220 44556" },
    { roleMr: "खजिनदार", nameMr: "श्री. अमित जोशी", wing: "I Wing", phone: "+91 94220 77883" },
    { roleMr: "सहसचिव", nameMr: "श्री. निलेश मोरे", wing: "J Wing", phone: "+91 94220 77884" },
    { roleMr: "मुख्य संघटक", nameMr: "श्री. गणेश जाधव", wing: "K Wing", phone: "+91 94220 77885" }
  ];

  return (
    <section id="mandal-info-section" className="scroll-mt-20 my-10">
      <div className="bg-gradient-to-br from-white via-[#FFFDF9] to-[#FAF5EC] rounded-3xl border-2 border-gold-400 shadow-xl overflow-hidden p-6 sm:p-10 relative">
        
        {/* Subtle Decorative Aura */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-maroon-900 bg-gold-100 px-4 py-1.5 rounded-full border border-gold-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>अधिकृत मंडळ माहिती व पार्श्वभूमी (About Mandal & Legacy)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-maroon-950 font-heading tracking-tight">
            {config?.mandalNameMr || "म्हाडा टॉवर्स उत्सव मंडळ"}
          </h2>

          <p className="text-sm sm:text-base font-bold text-festive-saffron mt-1.5">
            {info.mottoMr || "॥ ५ विंग्स, एकच परिवार - सहकार्य • शिस्त • अखंड भक्ती ॥"}
          </p>

          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            {config?.regNo ? `नोंदणी क्र: ${config.regNo} - पुणे (धर्मादाय सहआयुक्त मान्यताप्राप्त)` : "नोंदणी क्र: १२४३/२०२५ - पुणे"} • स्थापना: {info.establishedYear || "२०२४"}
          </p>
        </div>

        {/* Story / About Mandal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 relative z-10">
          
          {/* Left: Emblem and Tagline */}
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

            <h3 className="text-lg font-bold text-gold-300 font-heading">
              {config?.mandalNameMr || "म्हाडा टॉवर्स उत्सव मंडळ"}
            </h3>
            <p className="text-xs text-gold-100/80 mt-1">
              {config?.addressMr || "पिंपरी वाघेरे, पिंपरी चिंचवड, पुणे - ४११०१७"}
            </p>

            <div className="mt-4 pt-3 border-t border-gold-500/30 w-full text-center">
              <span className="text-[11px] text-festive-saffron font-bold uppercase tracking-wider block">
                सहभागी ५ विंग्ज परिवार
              </span>
              <div className="flex justify-center gap-1.5 mt-2">
                {["G", "H", "I", "J", "K"].map((w) => (
                  <span key={w} className="bg-maroon-800 text-gold-200 text-xs font-bold px-2 py-0.5 rounded border border-gold-500/40">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: History & Mission Statement */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gold-300/80 shadow-xs">
              <h4 className="text-base sm:text-lg font-bold text-maroon-900 font-heading mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-festive-saffron" />
                <span>मंडळाची संकल्पना व इतिहास (Our Story)</span>
              </h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {info.historyMr || 
                  "पिंपरी चिंचवड मधील म्हाडा टॉवर्स संकुलातील ५ विंग्ज (G, H, I, J, K) मधील सर्व रहिवासी, मालक व भाडेकरू कुटुंबे एकत्र येऊन दरवर्षी अत्यंत उत्साहात, शिस्तबद्ध व भव्य स्वरूपात गणेशोत्सव साजरा करतात. '५ विंग्स, एकच परिवार' या संकल्पनेतून सामाजिक सलोखा व पर्यावरण संवर्धन जपले जाते."
                }
              </p>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mt-2.5">
                उत्सवाचे सर्व नियोजन पारदर्शक पद्धतीने लोकशाही मार्गाने केले जाते. प्रत्येक विंगला आरतीचे यजमानपद देऊन सर्व रहिवाशांचा सन्मान राखला जातो.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-[#FAF5EC] p-2.5 rounded-xl border border-gold-200">
                <span className="text-base font-black text-maroon-900 block">५</span>
                <span className="text-[10px] text-gray-600 font-semibold">इमारतींची एकता</span>
              </div>
              <div className="bg-[#FAF5EC] p-2.5 rounded-xl border border-gold-200">
                <span className="text-base font-black text-emerald-800 block">१००%</span>
                <span className="text-[10px] text-gray-600 font-semibold">पर्यावरणपूरक</span>
              </div>
              <div className="bg-[#FAF5EC] p-2.5 rounded-xl border border-gold-200">
                <span className="text-base font-black text-amber-700 block">१०</span>
                <span className="text-[10px] text-gray-600 font-semibold">दिवस महाआरती</span>
              </div>
              <div className="bg-[#FAF5EC] p-2.5 rounded-xl border border-gold-200">
                <span className="text-base font-black text-maroon-900 block">२४x७</span>
                <span className="text-[10px] text-gray-600 font-semibold">स्वयंसेवक साहाय्य</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Core Pillars */}
        <div className="mb-10 relative z-10">
          <h4 className="text-center text-sm font-bold text-maroon-900 uppercase tracking-widest mb-4">
            मंडळाची मुख्य मार्गदर्शक सूत्रे (Core Principles)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-gold-300 hover:border-gold-500 transition-all shadow-xs hover:shadow-md"
                >
                  <div className="w-9 h-9 rounded-xl bg-gold-100 flex items-center justify-center text-maroon-900 mb-3 border border-gold-300">
                    <Icon className="w-5 h-5 text-festive-saffron" />
                  </div>
                  <h5 className="text-sm font-bold text-maroon-950 font-heading">
                    {p.titleMr}
                  </h5>
                  <span className="text-[10px] text-gray-500 italic block mb-1">
                    {p.titleEn}
                  </span>
                  <p className="text-xs text-gray-600 leading-normal">
                    {p.descMr}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Executive Committee 2025-2026 */}
        <div className="mb-8 relative z-10">
          <div className="flex items-center justify-between mb-4 border-b border-gold-200 pb-2">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-maroon-900 font-heading">
                मंडळ कार्यकारिणी समिती ({config?.festivalYear || "२०२५ - २०२६"})
              </h4>
              <p className="text-xs text-gray-600">
                सर्व ५ विंग्सचे अधिकृत समन्वयक व पदाधिकारी
              </p>
            </div>
            <button
              onClick={handleShareMandal}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>शेअर करा</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {committeeMembers.map((member, i) => (
              <div
                key={i}
                className="bg-white p-3.5 rounded-xl border border-gold-200 flex items-center justify-between gap-2 shadow-2xs"
              >
                <div>
                  <span className="text-[10px] font-bold text-festive-saffron bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {member.roleMr}
                  </span>
                  <h6 className="text-xs sm:text-sm font-bold text-maroon-950 mt-1">
                    {member.nameMr}
                  </h6>
                  <span className="text-[11px] text-gray-500">{member.wing}</span>
                </div>
                <a
                  href={`tel:${member.phone}`}
                  className="p-2 rounded-lg bg-gold-100 hover:bg-gold-200 text-maroon-900 transition"
                  title="कॉल करा"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-maroon-850" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Office Location & Contact Footer */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF5EC] border border-gold-300 flex flex-col md:flex-row items-center justify-between gap-4 text-xs relative z-10">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-festive-saffron flex-shrink-0" />
            <div>
              <strong className="text-maroon-950 block">मंडळ मध्यवर्ती कार्यालय:</strong>
              <span className="text-gray-700">{info.officeAddressMr || config?.addressMr || "पिंपरी वाघेरे, पिंपरी चिंचवड, पुणे - ४११०१७"}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${config?.emergencyHelpline || '+919822011223'}`}
              className="px-4 py-2 rounded-xl bg-maroon-850 hover:bg-maroon-800 text-gold-300 font-bold transition flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>हेल्पलाईन: {config?.emergencyHelpline || "+91 98220 11223"}</span>
            </a>
            
            <a
              href="mailto:mhadatowersutsav@gmail.com"
              className="px-4 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-medium transition flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-gray-600" />
              <span>ईमेल संपर्क</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutMandal;
