import React from "react";
import { Building2, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const WINGS_CONFIG = [
  { key: "All", code: "All", nameMr: "सर्व इमारती (All)", nameEn: "All Buildings", sacredName: "सर्व ४ इमारती" },
  { key: "G", code: "G", nameMr: "G - नंदादेवी (Nandadevi)", nameEn: "G - Nandadevi", sacredName: "नंदादेवी (Nandadevi)" },
  { key: "H", code: "H", nameMr: "H - निलगिरी (Nilgiri)", nameEn: "H - Nilgiri", sacredName: "निलगिरी (Nilgiri)" },
  { key: "J", code: "J", nameMr: "J - पूर्वांचल (Purvanchal)", nameEn: "J - Purvanchal", sacredName: "पूर्वांचल (Purvanchal)" },
  { key: "K", code: "K", nameMr: "K - गोवर्धन (Govardhan)", nameEn: "K - Govardhan", sacredName: "गोवर्धन (Govardhan)" },
];

const WingFilter = ({ selectedWing, onSelectWing }) => {
  const { language, t } = useLanguage();

  return (
    <div className="w-full bg-[#FAF5EB] border-y-2 border-gold-400/60 py-3 px-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
        
        <div className="flex items-center gap-2 text-xs sm:text-sm text-maroon-950 font-bold">
          <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-maroon-800 flex-shrink-0" />
          <span>
            {language === "mr" ? "सहभागी इमारती (४ विंग्ज):" : "Participating Buildings (4 Wings):"}
          </span>
          <span className="hidden lg:inline text-maroon-700 font-medium text-xs">
            {language === "mr" 
              ? "आपल्या विंगचे विशेष नियोजन व आरती वेळा पाहण्यासाठी निवडा"
              : "Select building to view specific Aarti schedule & updates"
            }
          </span>
        </div>

        {/* Wing Pills Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {WINGS_CONFIG.map((wing) => {
            const isSelected =
              (wing.code === "All" && (selectedWing === "All" || !selectedWing)) ||
              selectedWing === wing.code;

            return (
              <button
                key={wing.code}
                onClick={() => onSelectWing(wing.code)}
                className={`flex-shrink-0 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full transition-all duration-200 border ${
                  isSelected
                    ? "bg-maroon-850 text-gold-200 border-gold-500 shadow-md transform scale-105"
                    : "bg-white text-maroon-900 hover:bg-gold-100/80 border-gold-300 shadow-2xs"
                }`}
              >
                {language === "mr" ? wing.nameMr : wing.nameEn}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default WingFilter;
