import React, { useState, useEffect } from "react";
import { 
  Flame, Save, Calendar, CheckCircle2, Clock, 
  Building, Check, Sparkles, MapPin 
} from "lucide-react";

const AartiScheduleManager = ({ config, onSaveAartiSchedule, onNotify }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    if (config?.dailyAartiSchedule?.length) {
      setSchedule(JSON.parse(JSON.stringify(config.dailyAartiSchedule)));
    }
  }, [config]);

  const handleFieldChange = (index, field, value) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  const handleSetCurrentDay = (index) => {
    const updated = schedule.map((item, idx) => ({
      ...item,
      isCurrentDay: idx === index
    }));
    setSchedule(updated);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    const res = await onSaveAartiSchedule(schedule);
    if (res.success) {
      onNotify("दैनिक आरती व यजमान इमारत वेळापत्रक यशस्वीरीत्या जतन केले!", "success");
    } else {
      onNotify(res.message || "जतन करताना त्रुटी आली", "error");
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gold-300 p-5 sm:p-7 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-gold-200">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-festive-saffron" />
            <h2 className="text-lg sm:text-xl font-bold text-maroon-900 font-heading">
              दैनिक महाआरती व यजमान इमारत व्यवस्थापन (10-Day Aarti & Host Wings)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            प्रत्येक दिवशी कोणती इमारत (विंग) आरतीचे यजमानपद भूषवणार आहे आणि सकाळ-संध्याकाळच्या वेळा येथे संपादित करा.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-maroon-850 hover:bg-maroon-800 text-gold-300 font-bold rounded-xl border border-gold-500/50 shadow transition text-xs sm:text-sm"
        >
          <Save className="w-4 h-4" />
          <span>वेळापत्रक जतन करा (Save Schedule)</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {schedule.map((item, idx) => (
          <div
            key={item.dayNumber}
            className={`p-4 rounded-2xl border-2 transition-all ${
              item.isCurrentDay
                ? "bg-amber-50/80 border-amber-500 shadow-sm ring-2 ring-amber-400/30"
                : "bg-white border-gold-200"
            }`}
          >
            {/* Header of each day */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-maroon-900 text-gold-200 font-bold text-xs">
                  {item.dateStr}
                </span>
                {item.isCurrentDay && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white animate-pulse">
                    ★ आजचा दिवस (Today Active)
                  </span>
                )}
              </div>

              {/* Toggle Today Button */}
              <button
                type="button"
                onClick={() => handleSetCurrentDay(idx)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition border ${
                  item.isCurrentDay
                    ? "bg-amber-600 text-white border-amber-700"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gold-100"
                }`}
              >
                {item.isCurrentDay ? "✓ आजचा दिवस म्हणून निवडले आहे" : "आजचा दिवस बनवा"}
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">यजमान इमारत (Host Wing) *</label>
                <input
                  type="text"
                  value={item.hostWing}
                  onChange={(e) => handleFieldChange(idx, "hostWing", e.target.value)}
                  placeholder="उदा. G WING (इमारत G)"
                  required
                  className="w-full p-2 rounded-xl border border-gray-300 font-bold text-maroon-950 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">विंग समन्वयक / संपर्क</label>
                <input
                  type="text"
                  value={item.hostLead || ""}
                  onChange={(e) => handleFieldChange(idx, "hostLead", e.target.value)}
                  placeholder="उदा. श्री. सचिन पाटील (फ्लॅट G-402)"
                  className="w-full p-2 rounded-xl border border-gray-300 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">सकाळची आरती वेळ</label>
                <input
                  type="text"
                  value={item.morningTime}
                  onChange={(e) => handleFieldChange(idx, "morningTime", e.target.value)}
                  placeholder="उदा. सकाळी ०८:३० वाजता"
                  className="w-full p-2 rounded-xl border border-gray-300 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">संध्याकाळची महाआरती वेळ</label>
                <input
                  type="text"
                  value={item.eveningTime}
                  onChange={(e) => handleFieldChange(idx, "eveningTime", e.target.value)}
                  placeholder="उदा. रात्री ०८:०० वाजता"
                  className="w-full p-2 rounded-xl border border-gray-300 focus:border-amber-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1 text-gray-700">सकाळची पूजा / विधी</label>
                <input
                  type="text"
                  value={item.morningRitual}
                  onChange={(e) => handleFieldChange(idx, "morningRitual", e.target.value)}
                  placeholder="उदा. काकड आरती, मंत्रपुष्पांजली व मोदक नैवेद्य"
                  className="w-full p-2 rounded-xl border border-gray-300 focus:border-amber-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1 text-gray-700">संध्याकाळची महाआरती विधी व विशेष नैवेद्य</label>
                <input
                  type="text"
                  value={item.eveningRitual}
                  onChange={(e) => handleFieldChange(idx, "eveningRitual", e.target.value)}
                  placeholder="उदा. १०१ दीप प्रज्वलन व सुवासिनींचे भजन"
                  className="w-full p-2 rounded-xl border border-gray-300 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

          </div>
        ))}

        <div className="pt-4 border-t border-gold-200 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-maroon-850 hover:bg-maroon-800 text-gold-300 font-bold rounded-xl border border-gold-500/50 shadow transition flex items-center gap-2 text-xs sm:text-sm"
          >
            <Save className="w-4 h-4" />
            <span>वेळापत्रक जतन करा (Save Schedule)</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AartiScheduleManager;
