import React from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

const TabApprovals = ({ config, onToggleTab }) => {
  return (
    <div className="bg-white rounded-2xl border-2 border-gold-300 shadow-lg p-5 sm:p-7">
      <div className="mb-5 pb-3 border-b border-gold-200">
        <h2 className="text-lg sm:text-xl font-bold text-maroon-900 font-heading">
          वेबसाईट टॅब व विभाग मान्यता व्यवस्थापक (Website Tabs Approval)
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          येथून आपण मुख्य वेबसाईटवरील प्रत्येक टॅब चालू (Approve / Publish) किंवा बंद (Hide) करू शकता. बदल थेट रिअल-टाइममध्ये लागू होतात.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {config?.tabs &&
          Object.entries(config.tabs).map(([key, tab]) => (
            <div
              key={key}
              className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${
                tab.enabled
                  ? "bg-emerald-50/70 border-emerald-400 shadow-xs"
                  : "bg-gray-50 border-gray-300 opacity-75"
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-maroon-950 font-heading">
                    {tab.labelMr}
                  </span>
                  <span className="text-xs text-gray-500 italic">({tab.labelEn})</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-full text-[10px] ${
                      tab.enabled
                        ? "bg-emerald-200 text-emerald-900"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {tab.enabled ? "मान्य व प्रकाशित (Active & Approved)" : "अप्रकाशित / बंद (Hidden)"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onToggleTab(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs transition ${
                  tab.enabled
                    ? "bg-emerald-700 hover:bg-emerald-800 text-white"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                }`}
              >
                {tab.enabled ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>सुरू आहे</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>सुरू करा</span>
                  </>
                )}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TabApprovals;
