import React, { useState } from "react";
import { 
  X, BarChart2, Users, Building2, Image as ImageIcon, 
  CheckCircle2, Sparkles, Send, Heart, MapPin, PhoneCall 
} from "lucide-react";

export const ResidentPollsModal = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  if (!isOpen) return null;

  const handleVote = () => {
    if (selectedOption !== null) {
      setHasVoted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full border-2 border-gold-400 p-6 shadow-2xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-maroon-900">
          <BarChart2 className="w-5 h-5 text-festive-saffron" />
          <h3 className="text-lg font-bold font-heading">रहिवासी मतदान (Resident Polls)</h3>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          म्हाडा टॉवर्स उत्सव मंडळाचे निर्णय सर्व ५ विंग्जच्या रहिवाशांच्या मताने होतात.
        </p>

        {hasVoted ? (
          <div className="p-5 text-center bg-emerald-50 rounded-2xl border border-emerald-300">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-emerald-900">आपले मत नोंदवले गेले आहे!</h4>
            <p className="text-xs text-emerald-700 mt-1">
              उत्सवाच्या नियोजनात सहभाग घेतल्याबद्दल धन्यवाद.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200">
              <span className="text-[11px] font-bold text-amber-900 uppercase">चालू मतदान प्रश्न:</span>
              <p className="text-sm font-bold text-maroon-950 mt-1">
                ५व्या दिवसाच्या महाप्रसाद भोजनाची वेळ कोणती सोयीस्कर आहे?
              </p>
            </div>

            <div className="space-y-2">
              {[
                { id: 1, text: "दुपारी १२:३० ते दुपारी २:३० (पहिली बॅच)" },
                { id: 2, text: "दुपारी १:०० ते दुपारी ३:३० (दुसरी बॅच)" },
                { id: 3, text: "संध्याकाळी ६:३० ते रात्री ८:३० (संध्याकाळ स्लॉट)" }
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition text-xs font-semibold ${
                    selectedOption === opt.id
                      ? "border-amber-500 bg-amber-50 text-maroon-950"
                      : "border-gray-200 hover:border-gold-300 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="poll"
                    checked={selectedOption === opt.id}
                    onChange={() => setSelectedOption(opt.id)}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </div>

            <button
              onClick={handleVote}
              disabled={selectedOption === null}
              className="w-full py-2.5 bg-maroon-850 hover:bg-maroon-800 disabled:opacity-50 text-gold-200 font-bold rounded-xl shadow transition text-xs flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> मत नोंदवा (Submit Vote)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const VolunteerSevaModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", wing: "G", phone: "", seva: "मंडप व्यवस्था" });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full border-2 border-gold-400 p-6 shadow-2xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-maroon-900">
          <Users className="w-5 h-5 text-festive-saffron" />
          <h3 className="text-lg font-bold font-heading">स्वयंसेवक सहभाग नोंदणी (Volunteer Seva)</h3>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          बाप्पांच्या उत्सवात आरती व्यवस्था, महाप्रसाद वाटप व शिस्त पालनासाठी सहकार्य करा.
        </p>

        {submitted ? (
          <div className="p-5 text-center bg-emerald-50 rounded-2xl border border-emerald-300">
            <Heart className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-emerald-900">सहभागासाठी मनःपूर्वक धन्यवाद!</h4>
            <p className="text-xs text-emerald-700 mt-1">
              आपल्या विंगचे प्रमुख आपल्याशी लवकरच व्हॉट्सॲपवर संपर्क साधतील.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-gray-700">पूर्ण नाव (Full Name) *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="उदा. राहुल पवार"
                className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">विंग (Wing) *</label>
                <select
                  value={formData.wing}
                  onChange={(e) => setFormData({ ...formData, wing: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-amber-500 outline-none"
                >
                  <option value="G">G Wing</option>
                  <option value="H">H Wing</option>
                  <option value="I">I Wing</option>
                  <option value="J">J Wing</option>
                  <option value="K">K Wing</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">मोबाईल क्रमांक *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98220..."
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">इच्छित सेवा (Seva Preference)</label>
              <select
                value={formData.seva}
                onChange={(e) => setFormData({ ...formData, seva: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-amber-500 outline-none"
              >
                <option value="मंडप व्यवस्था व आरती">मंडप व्यवस्था व आरती मदत</option>
                <option value="महाप्रसाद वाटप">महाप्रसाद वाटप व नियोजन</option>
                <option value="सांस्कृतिक कार्यक्रम">सांस्कृतिक कार्यक्रम संयोजन</option>
                <option value="विसर्जन मिरवणूक">विसर्जन मिरवणूक व पर्यावरण हौद</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl shadow transition text-xs mt-2"
            >
              सहभाग नोंदवा (Register Volunteer)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const WingInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const wings = [
    { wing: "G WING", flats: "४० फ्लॅट्स", lead: "श्री. सचिन पाटील", phone: "+91 94220 77881", day: "दिवस १ व ६" },
    { wing: "H WING", flats: "४० फ्लॅट्स", lead: "श्री. विजय पवार", phone: "+91 94220 77882", day: "दिवस २ व ६" },
    { wing: "I WING", flats: "४० फ्लॅट्स", lead: "श्री. अमित जोशी", phone: "+91 94220 77883", day: "दिवस ३ व ७" },
    { wing: "J WING", flats: "४० फ्लॅट्स", lead: "श्री. निलेश मोरे", phone: "+91 94220 77884", day: "दिवस ४ व ८" },
    { wing: "K WING", flats: "४० फ्लॅट्स", lead: "श्री. गणेश जाधव", phone: "+91 94220 77885", day: "दिवस ५ व ९" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full border-2 border-gold-400 p-6 shadow-2xl relative animate-fadeIn max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-maroon-900">
          <Building2 className="w-5 h-5 text-festive-saffron" />
          <h3 className="text-lg font-bold font-heading">५ इमारतींचा तपशील (All 5 Wings Info)</h3>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          म्हाडा टॉवर्स मधील सर्व ५ विंग्स, समन्वयक व आरक्षित आरती दिवस.
        </p>

        <div className="space-y-3">
          {wings.map((w, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-maroon-950 text-sm font-heading">{w.wing}</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-amber-300 font-semibold text-gray-700">
                    {w.flats}
                  </span>
                </div>
                <p className="text-gray-700 mt-1 font-medium">विंग प्रमुख: <strong>{w.lead}</strong></p>
                <span className="text-[10px] text-amber-800 font-bold">यजमान आरती: {w.day}</span>
              </div>
              <a
                href={`tel:${w.phone}`}
                className="p-2 rounded-xl bg-gold-200 hover:bg-gold-300 text-maroon-900 transition flex items-center gap-1"
                title="कॉल करा"
              >
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FestivalGalleryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const photos = [
    { title: "श्री गणरायाची भव्य मूर्ती प्राणप्रतिष्ठा", tag: "उत्सव मूर्ती" },
    { title: "१०१ दीप प्रज्वलन महाआरती सोहळा", tag: "महाआरती" },
    { title: "बाल गोपाळांची चित्रकला स्पर्धा", tag: "सांस्कृतिक" },
    { title: "भव्य महाप्रसाद वाटप मंडप", tag: "महाप्रसाद" },
    { title: "लेझीम व ढोल-ताशा पथक मिरवणूक", tag: "मिरवणूक" },
    { title: "कृत्रिम हौदातील १००% पर्यावरणपूरक विसर्जन", tag: "विसर्जन" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full border-2 border-gold-400 p-6 shadow-2xl relative animate-fadeIn max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-maroon-900">
          <ImageIcon className="w-5 h-5 text-festive-saffron" />
          <h3 className="text-lg font-bold font-heading">उत्सव छायाचित्रे (Festival Gallery)</h3>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          म्हाडा टॉवर्स गणेशोत्सवातील काही अविस्मरणीय क्षणचित्रे.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {photos.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-gold-300 p-3 bg-gradient-to-br from-[#FFFDF9] to-[#FAF5EC] shadow-xs">
              <div className="h-32 rounded-xl bg-maroon-950 flex flex-col items-center justify-center text-gold-300 mb-2 relative overflow-hidden">
                <Sparkles className="w-8 h-8 text-gold-400 mb-1 animate-pulse" />
                <span className="text-[11px] font-bold text-center px-2">{item.title}</span>
                <span className="absolute top-2 right-2 text-[9px] bg-amber-500 text-maroon-950 font-black px-2 py-0.5 rounded-full">
                  {item.tag}
                </span>
              </div>
              <p className="text-xs font-bold text-maroon-950 truncate">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
