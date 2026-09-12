import React, { useState } from "react";
import { Plus, Trash2, Megaphone } from "lucide-react";
import API from "../../services/api";

const AnnouncementManager = ({ announcements, onRefresh, onNotify }) => {
  const [form, setForm] = useState({
    titleMr: "",
    titleEn: "",
    descriptionMr: "",
    category: "general",
    priority: "normal",
    isPinned: false,
    targetWings: ["All"]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titleMr || !form.descriptionMr) {
      onNotify("कृपया शीर्षक आणि माहिती भरा", "error");
      return;
    }

    try {
      const res = await API.post("/announcements", form);
      if (res.data.success) {
        onNotify("नवीन सूचना प्रसिद्ध केली!", "success");
        setForm({
          titleMr: "",
          titleEn: "",
          descriptionMr: "",
          category: "general",
          priority: "normal",
          isPinned: false,
          targetWings: ["All"]
        });
        onRefresh();
      }
    } catch (err) {
      onNotify("सूचना जोडताना त्रुटी आली", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("ही सूचना नक्की हटवायची आहे का?")) return;
    try {
      const res = await API.delete(`/announcements/${id}`);
      if (res.data.success) {
        onNotify("सूचना हटवली गेली", "success");
        onRefresh();
      }
    } catch (err) {
      onNotify("हटवताना त्रुटी आली", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Form */}
      <div className="bg-white rounded-2xl border-2 border-gold-300 p-5 sm:p-6 shadow-md">
        <h3 className="text-base sm:text-lg font-bold text-maroon-900 font-heading mb-3 flex items-center gap-2">
          <Plus className="w-5 h-5 text-festive-saffron" />
          <span>नवीन महत्वाची सूचना प्रसिद्ध करा</span>
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="sm:col-span-2">
            <label className="block font-semibold mb-1">मराठी शीर्षक *</label>
            <input
              type="text"
              value={form.titleMr}
              onChange={(e) => setForm({ ...form, titleMr: e.target.value })}
              placeholder="उदा. आरतीच्या वेळेत बदल / महाप्रसाद टोकन वाटप"
              required
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold mb-1">सविस्तर माहिती *</label>
            <textarea
              rows={3}
              value={form.descriptionMr}
              onChange={(e) => setForm({ ...form, descriptionMr: e.target.value })}
              placeholder="सूचनेचे संपूर्ण तपशील प्रविष्ट करा..."
              required
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">वर्गवारी (Category)</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            >
              <option value="general">सर्वसाधारण (General)</option>
              <option value="aarti">आरती विषयक (Aarti)</option>
              <option value="prasad">महाप्रसाद (Prasad)</option>
              <option value="cultural">सांस्कृतिक (Cultural)</option>
              <option value="visarjan">विसर्जन (Visarjan)</option>
              <option value="urgent">तातडीचे (Urgent Alert)</option>
              <option value="owners">सभासद/फ्लॅटधारक (Owners)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">प्राधान्य (Priority)</label>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            >
              <option value="normal">सामान्य</option>
              <option value="medium">मध्यम</option>
              <option value="high">अति महत्वाचे (High Priority)</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="isPinned"
              checked={form.isPinned}
              onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
              className="w-4 h-4 rounded text-gold-600 focus:ring-gold-500"
            />
            <label htmlFor="isPinned" className="font-semibold text-xs text-maroon-900 cursor-pointer">
              सूचना स्क्रोलर व सर्वात वर पिन करा (Pin to Top & Marquee)
            </label>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-maroon-850 hover:bg-maroon-800 text-gold-300 font-bold rounded-xl border border-gold-500/50 shadow transition"
            >
              सूचना प्रसिद्ध करा (Publish)
            </button>
          </div>
        </form>
      </div>

      {/* Announcements List */}
      <div className="bg-white rounded-2xl border border-gold-300 p-5 shadow-sm">
        <h4 className="font-bold text-sm text-maroon-900 mb-3 font-heading">
          सध्या सक्रिय असलेल्या सूचना ({announcements.length})
        </h4>
        <div className="space-y-3">
          {announcements.map((ann) => (
            <div key={ann._id} className="p-3 rounded-xl border border-gray-200 flex items-start justify-between gap-3 bg-gold-50/30">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {ann.isPinned && (
                    <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">
                      पिन केलेली
                    </span>
                  )}
                  <span className="text-[10px] uppercase font-bold text-maroon-700 bg-gray-100 px-2 py-0.5 rounded">
                    {ann.category}
                  </span>
                </div>
                <h5 className="font-bold text-xs sm:text-sm text-maroon-950">{ann.titleMr}</h5>
                <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{ann.descriptionMr}</p>
              </div>

              <button
                onClick={() => handleDelete(ann._id)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                title="हटवा"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementManager;
