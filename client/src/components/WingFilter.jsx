import React from "react";
import { Building2, Sparkles } from "lucide-react";

const WINGS = ["सर्व इमारती (All)", "G Wing", "H Wing", "I Wing", "J Wing", "K Wing"];

const WingFilter = ({ selectedWing, onSelectWing }) => {
  return (
    <div className="w-full bg-[#FAF5EC] border-y border-gold-300/60 py-2.5 px-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        
        <div className="flex items-center gap-1.5 text-xs text-maroon-900 font-semibold">
          <Building2 className="w-4 h-4 text-maroon-800 flex-shrink-0" />
          <span>सहभागी इमारती (५ विंग्ज):</span>
          <span className="hidden md:inline text-maroon-600 font-normal">आपल्या विंगचे विशेष नियोजन पाहण्यासाठी निवडा</span>
        </div>

        {/* Wing Pills Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {WINGS.map((wing) => {
            const isSelected =
              (wing === "सर्व इमारती (All)" && (selectedWing === "All" || !selectedWing)) ||
              selectedWing === wing.split(" ")[0];

            return (
              <button
                key={wing}
                onClick={() => onSelectWing(wing === "सर्व इमारती (All)" ? "All" : wing.split(" ")[0])}
                className={`flex-shrink-0 text-xs font-semibold px-3 py-1 rounded-full transition-all duration-200 border ${
                  isSelected
                    ? "bg-maroon-800 text-gold-200 border-gold-500 shadow-sm"
                    : "bg-white text-maroon-900 hover:bg-gold-100/60 border-gold-200"
                }`}
              >
                {wing}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default WingFilter;
