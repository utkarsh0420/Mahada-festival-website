import React, { useState } from "react";
import { Plus, Trash2, Calendar } from "lucide-react";
import API from "../../services/api";

const EventManager = ({ events, onRefresh, onNotify }) => {
  const [form, setForm] = useState({
    category: "aarti",
    titleMr: "",
    titleEn: "",
    time: "",
    dateStr: "दररोज",
    dayNumber: 1,
    venue: "मध्यवर्ती मंडप, म्हाडा टॉवर्स",
    hostWing: "सर्व विंग्ज (G, H, I, J, K)",
    descriptionMr: "",
    status: "upcoming"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titleMr || !form.time) {
      onNotify("कृपया कार्यक्रमाचे नाव आणि वेळ भरा", "error");
      return;
    }

    try {
      const res = await API.post("/events", form);
      if (res.data.success) {
        onNotify("कार्यक्रम यशस्वीरीत्या जोडला गेला!", "success");
        setForm({
          category: "aarti",
          titleMr: "",
          titleEn: "",
          time: "",
          dateStr: "दररोज",
          dayNumber: 1,
          venue: "मध्यवर्ती मंडप, म्हाडा टॉवर्स",
          hostWing: "सर्व विंग्ज (G, H, I, J, K)",
          descriptionMr: "",
          status: "upcoming"
        });
        onRefresh();
      }
    } catch (err) {
      onNotify("कार्यक्रम जोडताना त्रुटी आली", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("हा कार्यक्रम नक्की हटवायचा आहे का?")) return;
    try {
      const res = await API.delete(`/events/${id}`);
      if (res.data.success) {
        onNotify("कार्यक्रम हटवला गेला", "success");
        onRefresh();
      }
    } catch (err) {
      onNotify("हटवताना त्रुटी आली", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border-2 border-gold-300 p-5 sm:p-6 shadow-md">
        <h3 className="text-base sm:text-lg font-bold text-maroon-900 font-heading mb-3 flex items-center gap-2">
          <Plus className="w-5 h-5 text-festive-saffron" />
          <span>नवीन कार्यक्रम / आरती वेळ जोडा</span>
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold mb-1">वर्गवारी (Category) *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            >
              <option value="aarti">दैनिक आरती (Aarti)</option>
              <option value="arrival">श्रींचे आगमन (Arrival)</option>
              <option value="cultural">सांस्कृतिक कार्यक्रम (Cultural)</option>
              <option value="prasad">महाप्रसाद (Maha Prasad)</option>
              <option value="visarjan">विसर्जन (Visarjan)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">वेळ (Time) *</label>
            <input
              type="text"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              placeholder="उदा. सकाळी ८:३० वाजता / संध्याकाळी ७:००"
              required
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold mb-1">कार्यक्रमाचे नाव (मराठी) *</label>
            <input
              type="text"
              value={form.titleMr}
              onChange={(e) => setForm({ ...form, titleMr: e.target.value })}
              placeholder="उदा. प्रभात महाआरती / लहान मुलांची गायन स्पर्धा"
              required
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">वार / दिवस</label>
            <input
              type="text"
              value={form.dateStr}
              onChange={(e) => setForm({ ...form, dateStr: e.target.value })}
              placeholder="उदा. दररोज / ५वा दिवस / अनंत चतुर्दशी"
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">यजमान विंग (Host Wing)</label>
            <input
              type="text"
              value={form.hostWing}
              onChange={(e) => setForm({ ...form, hostWing: e.target.value })}
              placeholder="उदा. G & H Wing / सर्व विंग्ज"
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold mb-1">वर्णन / माहिती</label>
            <textarea
              rows={2}
              value={form.descriptionMr}
              onChange={(e) => setForm({ ...form, descriptionMr: e.target.value })}
              placeholder="कार्यक्रमाविषयी अधिक माहिती..."
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-maroon-850 hover:bg-maroon-800 text-gold-300 font-bold rounded-xl border border-gold-500/50 shadow transition"
            >
              कार्यक्रम जतन करा (Save Event)
            </button>
          </div>
        </form>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-2xl border border-gold-300 p-5 shadow-sm">
        <h4 className="font-bold text-sm text-maroon-900 mb-3 font-heading">
          नोंदवलेले कार्यक्रम व आरती सूची ({events.length})
        </h4>
        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev._id} className="p-3 rounded-xl border border-gray-200 flex items-center justify-between gap-3 bg-white">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                    {ev.category}
                  </span>
                  <span className="text-xs text-maroon-800 font-bold">{ev.time}</span>
                  <span className="text-xs text-gray-500">• {ev.dateStr}</span>
                </div>
                <h5 className="font-bold text-xs sm:text-sm text-maroon-950">{ev.titleMr}</h5>
                <p className="text-[11px] text-gray-600">यजमान: {ev.hostWing} | {ev.venue}</p>
              </div>

              <button
                onClick={() => handleDelete(ev._id)}
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

export default EventManager;
