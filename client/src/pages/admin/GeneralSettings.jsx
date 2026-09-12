import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";

const GeneralSettings = ({ config, onSaveGeneral }) => {
  const [form, setForm] = useState({
    marqueeText: "",
    festivalStatus: "",
    emergencyHelpline: "",
    whatsAppCommunityLink: ""
  });

  useEffect(() => {
    if (config) {
      setForm({
        marqueeText: config.marqueeText || "",
        festivalStatus: config.festivalStatus || "उत्सव सुरू आहे",
        emergencyHelpline: config.emergencyHelpline || "+91 98220 11223",
        whatsAppCommunityLink: config.whatsAppCommunityLink || ""
      });
    }
  }, [config]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveGeneral(form);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gold-300 p-5 sm:p-7 shadow-lg">
      <h2 className="text-lg sm:text-xl font-bold text-maroon-900 font-heading mb-4 pb-2 border-b border-gold-200">
        स्क्रोलर टिकर व सर्वसाधारण माहिती
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div>
          <label className="block font-semibold mb-1">
            वेबसाईटच्या वर धावणारा स्क्रोलर मजकूर (Marquee Ticker Text)
          </label>
          <textarea
            rows={3}
            value={form.marqueeText}
            onChange={(e) => setForm({ ...form, marqueeText: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">उत्सव सद्यस्थिती (Status Badge)</label>
            <input
              type="text"
              value={form.festivalStatus}
              onChange={(e) => setForm({ ...form, festivalStatus: e.target.value })}
              placeholder="उदा. उत्सव सुरू आहे / आगमन पूर्व तयारी"
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">तातडीचा मुख्य संपर्क क्रमांक</label>
            <input
              type="text"
              value={form.emergencyHelpline}
              onChange={(e) => setForm({ ...form, emergencyHelpline: e.target.value })}
              placeholder="+91 98220 11223"
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            अधिकृत व्हॉट्सॲप ग्रुप / कम्युनिटी लिंक (WhatsApp Group Link)
          </label>
          <input
            type="text"
            value={form.whatsAppCommunityLink}
            onChange={(e) => setForm({ ...form, whatsAppCommunityLink: e.target.value })}
            placeholder="https://chat.whatsapp.com/..."
            className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            ही लिंक बदलल्यास वेबसाईटवरील QR कोड आपोआप नवीन ग्रुपसाठी अपडेट होईल.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-maroon-850 hover:bg-maroon-800 text-gold-300 font-bold rounded-xl border border-gold-500/50 shadow transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>बदल जतन करा (Save Settings)</span>
        </button>
      </form>
    </div>
  );
};

export default GeneralSettings;
