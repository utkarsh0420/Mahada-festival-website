import React, { useState, useEffect } from "react";
import { 
  Menu, Eye, EyeOff, Save, Sparkles, Check, 
  SlidersHorizontal, CheckCircle2, RotateCcw 
} from "lucide-react";

const SidebarManager = ({ config, onSaveSidebar, onNotify }) => {
  const [items, setItems] = useState([]);
  const [showFloatingTrigger, setShowFloatingTrigger] = useState(true);
  const [bottomCardTagline, setBottomCardTagline] = useState("❤️ ५ विंग्स, एकच परिवार");
  const [bottomCardSubtag, setBottomCardSubtag] = useState("सहकार्य • शिस्त • अखंड भक्ती");

  useEffect(() => {
    if (config?.sidebarMenu?.length) {
      setItems(JSON.parse(JSON.stringify(config.sidebarMenu)));
    }
    if (config?.sidebarSettings) {
      setShowFloatingTrigger(config.sidebarSettings.showFloatingTrigger !== false);
      if (config.sidebarSettings.bottomCardTagline) {
        setBottomCardTagline(config.sidebarSettings.bottomCardTagline);
      }
      if (config.sidebarSettings.bottomCardSubtag) {
        setBottomCardSubtag(config.sidebarSettings.bottomCardSubtag);
      }
    }
  }, [config]);

  const handleToggleItem = (index) => {
    const updated = [...items];
    updated[index].enabled = !updated[index].enabled;
    setItems(updated);
  };

  const handleChangeField = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      sidebarMenu: items,
      sidebarSettings: {
        showFloatingTrigger,
        bottomCardTitle: "All 5 Wings",
        bottomCardSubtitle: "Wings G, H, I, J, K",
        bottomCardTagline,
        bottomCardSubtag
      }
    };
    const res = await onSaveSidebar(payload);
    if (res.success) {
      onNotify("साइडबार मेनू व सेटिंग्ज यशस्वीरीत्या जतन केल्या!", "success");
    } else {
      onNotify(res.message || "जतन करताना त्रुटी आली", "error");
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gold-300 p-5 sm:p-7 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-gold-200">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-festive-saffron" />
            <h2 className="text-lg sm:text-xl font-bold text-maroon-900 font-heading">
              साइडबार मेनू नियंत्रण (Sidebar Menu Control)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            येथून आपण युजरला दिसणाऱ्या साइडबारमधील प्रत्येक पर्यायाची दृश्यमानता (Show/Hide), नाव व बॅज नियंत्रित करू शकता.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-maroon-850 hover:bg-maroon-800 text-gold-300 font-bold rounded-xl border border-gold-500/50 shadow transition text-xs sm:text-sm"
        >
          <Save className="w-4 h-4" />
          <span>बदल जतन करा (Save Changes)</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Floating Trigger & Bottom Card Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#FAF5EC] rounded-2xl border border-gold-300">
          <div>
            <label className="block text-xs font-bold text-maroon-950 mb-1">
              स्क्रीनवरील फ्लोटिंग मेनू बटण (Side Floating Button)
            </label>
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowFloatingTrigger(!showFloatingTrigger)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
                  showFloatingTrigger
                    ? "bg-emerald-700 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {showFloatingTrigger ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showFloatingTrigger ? "चालू (Visible)" : "बंद (Hidden)"}</span>
              </button>
              <span className="text-[11px] text-gray-500">
                स्क्रीनच्या बाजूला दिसणारे मेनू बटण
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-maroon-950 mb-1">
              साइडबार तळपट्टी संदेश (Tagline)
            </label>
            <input
              type="text"
              value={bottomCardTagline}
              onChange={(e) => setBottomCardTagline(e.target.value)}
              className="w-full p-2 text-xs rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
              placeholder="❤️ ५ विंग्स, एकच परिवार"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-maroon-950 mb-1">
              तळपट्टी उपसंदेश (Subtag)
            </label>
            <input
              type="text"
              value={bottomCardSubtag}
              onChange={(e) => setBottomCardSubtag(e.target.value)}
              className="w-full p-2 text-xs rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
              placeholder="सहकार्य • शिस्त • अखंड भक्ती"
            />
          </div>
        </div>

        {/* Sidebar Items Table / List */}
        <div>
          <h3 className="text-sm font-bold text-maroon-900 mb-3 uppercase tracking-wider">
            साइडबारमधील पर्याय व घटक सूची ({items.length})
          </h3>

          <div className="space-y-2.5">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                  item.enabled
                    ? "bg-white border-gold-300/80 shadow-2xs"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                {/* Left: ID & Labels */}
                <div className="flex items-center gap-3 min-w-[240px]">
                  <span className="w-6 h-6 rounded-full bg-gold-100 font-black text-maroon-900 flex items-center justify-center text-[10px] flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-maroon-950 text-xs sm:text-sm">
                      {item.labelEn}
                    </span>
                    <span className="text-[11px] text-gray-500 block">
                      मराठी: {item.labelMr}
                    </span>
                  </div>
                </div>

                {/* Center: Edit Marathi Label & Badge */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 flex-1 max-w-md">
                  <div>
                    <span className="text-[10px] text-gray-500 block mb-0.5">मराठी नाव:</span>
                    <input
                      type="text"
                      value={item.labelMr}
                      onChange={(e) => handleChangeField(idx, "labelMr", e.target.value)}
                      className="w-full p-1.5 rounded-lg border border-gray-300 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block mb-0.5">बॅज (उदा. LIVE, 6, १०):</span>
                    <input
                      type="text"
                      value={item.badge || ""}
                      onChange={(e) => handleChangeField(idx, "badge", e.target.value)}
                      placeholder="रिकामे ठेवा किंवा लिहा"
                      className="w-full p-1.5 rounded-lg border border-gray-300 text-xs font-bold"
                    />
                  </div>
                </div>

                {/* Right: Toggle Button */}
                <div className="flex items-center justify-end gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleItem(idx)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                      item.enabled
                        ? "bg-emerald-700 hover:bg-emerald-800 text-white"
                        : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                    }`}
                  >
                    {item.enabled ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>सुरू आहे (Visible)</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>बंद (Hidden)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Save Button */}
        <div className="pt-4 border-t border-gold-200 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-maroon-850 hover:bg-maroon-800 text-gold-300 font-bold rounded-xl border border-gold-500/50 shadow transition flex items-center gap-2 text-xs sm:text-sm"
          >
            <Save className="w-4 h-4" />
            <span>साइडबार बदल जतन करा (Save Settings)</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default SidebarManager;
