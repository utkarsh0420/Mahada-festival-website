import React, { useState } from "react";
import { Plus, Trash2, Phone } from "lucide-react";
import API from "../../services/api";

const ContactManager = ({ contacts, onRefresh, onNotify }) => {
  const [form, setForm] = useState({
    nameMr: "",
    roleMr: "",
    wing: "G Wing",
    phone: "",
    type: "committee"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nameMr || !form.phone) {
      onNotify("कृपया नाव व फोन नंबर प्रविष्ट करा", "error");
      return;
    }

    try {
      const res = await API.post("/contacts", form);
      if (res.data.success) {
        onNotify("संपर्क क्रमांक जोडला गेला!", "success");
        setForm({
          nameMr: "",
          roleMr: "",
          wing: "G Wing",
          phone: "",
          type: "committee"
        });
        onRefresh();
      }
    } catch (err) {
      onNotify("संपर्क जोडताना त्रुटी आली", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("हा संपर्क नक्की हटवायचा आहे का?")) return;
    try {
      const res = await API.delete(`/contacts/${id}`);
      if (res.data.success) {
        onNotify("संपर्क हटवला गेला", "success");
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
          <span>नवीन पदाधिकारी किंवा ५ विंग्ज समन्वयक जोडा</span>
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold mb-1">नाव (मराठी) *</label>
            <input
              type="text"
              value={form.nameMr}
              onChange={(e) => setForm({ ...form, nameMr: e.target.value })}
              placeholder="उदा. श्री. राहुल पाटील"
              required
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">पद / भूमिका *</label>
            <input
              type="text"
              value={form.roleMr}
              onChange={(e) => setForm({ ...form, roleMr: e.target.value })}
              placeholder="उदा. विंग G समन्वयक / उपाध्यक्ष"
              required
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">फोन नंबर *</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 98XXX XXXXX"
              required
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">इमारत विंग</label>
            <select
              value={form.wing}
              onChange={(e) => setForm({ ...form, wing: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            >
              <option value="सर्व विंग्ज">सर्व विंग्ज</option>
              <option value="G Wing">G Wing</option>
              <option value="H Wing">H Wing</option>
              <option value="I Wing">I Wing</option>
              <option value="J Wing">J Wing</option>
              <option value="K Wing">K Wing</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">प्रकार</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-gold-500 outline-none"
            >
              <option value="wing_lead">विंग प्रतिनिधी (Wing Lead)</option>
              <option value="committee">कार्यकारिणी समिती (Committee)</option>
              <option value="security">सुरक्षा नियंत्रण (Security)</option>
              <option value="emergency">तातडीची मदत (Emergency)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 bg-maroon-850 hover:bg-maroon-800 text-gold-300 font-bold rounded-xl border border-gold-500/50 shadow transition"
            >
              संपर्क जोडा
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-gold-300 p-5 shadow-sm">
        <h4 className="font-bold text-sm text-maroon-900 mb-3 font-heading">
          विद्यमान संपर्क सूची ({contacts.length})
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {contacts.map((c) => (
            <div key={c._id} className="p-3 rounded-xl border border-gray-200 flex items-center justify-between gap-2 bg-gray-50">
              <div>
                <span className="text-[10px] font-bold text-maroon-700 bg-gold-100 px-1.5 py-0.5 rounded">
                  {c.wing}
                </span>
                <h5 className="font-bold text-xs text-maroon-950 mt-1">{c.nameMr}</h5>
                <p className="text-[11px] text-gray-600">{c.roleMr}</p>
                <p className="text-xs font-semibold text-maroon-800">{c.phone}</p>
              </div>

              <button
                onClick={() => handleDelete(c._id)}
                className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition"
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

export default ContactManager;
