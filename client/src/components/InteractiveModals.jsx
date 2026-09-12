import React, { useState } from "react";
import { 
  X, BarChart2, Users, Building2, Image as ImageIcon, 
  CheckCircle2, Sparkles, Send, Heart, MapPin, PhoneCall 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const ResidentPollsModal = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
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
          <h3 className="text-lg font-bold font-heading">
            {language === "mr" ? "रहिवासी मतदान (Resident Polls)" : "Resident Polls"}
          </h3>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          {language === "mr"
            ? "म्हाडा टॉवर्स उत्सव मंडळाचे निर्णय सर्व ४ विंग्जच्या रहिवाशांच्या मताने होतात."
            : "Decisions are made with resident votes across all 4 buildings."}
        </p>

        {hasVoted ? (
          <div className="p-5 text-center bg-emerald-50 rounded-2xl border border-emerald-300">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-emerald-900">
              {language === "mr" ? "आपले मत नोंदवले गेले आहे!" : "Your vote has been recorded!"}
            </h4>
            <p className="text-xs text-emerald-700 mt-1">
              {language === "mr" ? "उत्सवाच्या नियोजनात सहभाग घेतल्याबद्दल धन्यवाद." : "Thank you for actively participating in festival planning."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200">
              <span className="text-[11px] font-bold text-amber-900 uppercase">
                {language === "mr" ? "चालू मतदान प्रश्न:" : "Active Poll Question:"}
              </span>
              <p className="text-sm font-bold text-maroon-950 mt-1">
                {language === "mr"
                  ? "संध्याकाळच्या महाआरतीची कोणती वेळ सर्वात सोयीस्कर आहे?"
                  : "Which evening Maha Aarti timing is most convenient for residents?"}
              </p>
            </div>

            <div className="space-y-2">
              {[
                { id: 1, text: "संध्याकाळी ०७:३० वाजता (Early Evening - 07:30 PM)" },
                { id: 2, text: "रात्री ०८:०० वाजता (Regular - 08:00 PM)" },
                { id: 3, text: "रात्री ०८:३० वाजता (Late Evening - 08:30 PM)" }
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
              <Send className="w-4 h-4" /> 
              <span>{language === "mr" ? "मत नोंदवा (Submit Vote)" : "Submit Vote"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const VolunteerSevaModal = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", wing: "G", phone: "", seva: "मंडप व्यवस्था व आरती मदत" });

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
          <h3 className="text-lg font-bold font-heading">
            {language === "mr" ? "स्वयंसेवक सेवा नोंदणी (Volunteer Registration)" : "Volunteer Registration"}
          </h3>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          बाप्पांच्या उत्सवात सेवा करण्याची सुवर्णसंधी. सर्व ४ इमारतींच्या उत्साही तरुणांनी नाव नोंदवावे.
        </p>

        {submitted ? (
          <div className="p-5 text-center bg-emerald-50 rounded-2xl border border-emerald-300">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-emerald-900">नोंदणी यशस्वी झाली!</h4>
            <p className="text-xs text-emerald-700 mt-1">
              मंडळ कार्यकारिणीचे स्वयंसेवक समन्वयक लवकरच आपल्याशी संपर्क साधतील.
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
                placeholder="उदा. अमित पाटील"
                className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">इमारत (Building) *</label>
                <select
                  value={formData.wing}
                  onChange={(e) => setFormData({ ...formData, wing: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-amber-500 outline-none"
                >
                  <option value="G">G - नंदादेवी (Nandadevi)</option>
                  <option value="H">H - निलगिरी (Nilgiri)</option>
                  <option value="J">J - पूर्वांचल (Purvanchal)</option>
                  <option value="K">K - गोवर्धन (Govardhan)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">मोबाईल क्र. *</label>
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
                <option value="मंडप व्यवस्था व आरती मदत">मंडप व्यवस्था व आरती मदत</option>
                <option value="सांस्कृतिक कार्यक्रम संयोजन">सांस्कृतिक कार्यक्रम संयोजन</option>
                <option value="सीसीटीव्ही व सुरक्षा मदत">सीसीटीव्ही व सुरक्षा मदत</option>
                <option value="माहिती व डिजिटल प्रसिद्धी">माहिती व डिजिटल प्रसिद्धी</option>
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
  const { language } = useLanguage();
  if (!isOpen) return null;

  // The 4 official buildings from the handwritten note:
  // G -> नंदादेवी (Nandadevi)
  // H -> निलगिरी (Nilgiri)
  // J -> पूर्वांचल (Purvanchal)
  // K -> गोवर्धन (Govardhan)
  const wings = [
    { wing: "G विंग - नंदादेवी (Nandadevi)", flats: "४० फ्लॅट्स", lead: "श्री. सचिन पाटील", phone: "+91 98220 11223", day: "दिवस १ व ५" },
    { wing: "H विंग - निलगिरी (Nilgiri)", flats: "४० फ्लॅट्स", lead: "श्री. विजय पवार", phone: "+91 94220 77882", day: "दिवस २ व ६" },
    { wing: "J विंग - पूर्वांचल (Purvanchal)", flats: "४० फ्लॅट्स", lead: "श्री. निलेश मोरे", phone: "+91 94220 77884", day: "दिवस ३ व ७" },
    { wing: "K विंग - गोवर्धन (Govardhan)", flats: "४० फ्लॅट्स", lead: "श्री. गणेश जाधव", phone: "+91 94220 77885", day: "दिवस ४ व ८" }
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
          <h3 className="text-lg font-bold font-heading">
            {language === "mr" ? "सहभागी ४ इमारतींची माहिती" : "4 Buildings Information"}
          </h3>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          म्हाडा टॉवर्स मधील चारही विंग्स, समन्वयक व आरक्षित आरती दिवस.
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
                <span className="text-[10px] text-amber-800 font-bold">आरती यजमान: {w.day}</span>
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
  const { language } = useLanguage();
  if (!isOpen) return null;

  const photos = [
    { title: "श्री गणरायाची भव्य शाडू मातीची मूर्ती प्रतिष्ठापना", tag: "उत्सव मूर्ती" },
    { title: "१०१ दीप प्रज्वलन व सायं महाआरती सोहळा", tag: "महाआरती" },
    { title: "बाल गोपाळांची चित्रकला व निबंध स्पर्धा", tag: "सांस्कृतिक" },
    { title: "पारंपरिक लेझीम व ढोल-ताशा पथक मिरवणूक", tag: "मिरवणूक" },
    { title: "महिला मंडळाचा पारंपरिक हळदी-कुंकू सोहळा", tag: "सांस्कृतिक" },
    { title: "कृत्रिम हौदातील १००% पर्यावरणपूरक संकल्प", tag: "पर्यावरण" }
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
          <h3 className="text-lg font-bold font-heading">
            {language === "mr" ? "उत्सव छायाचित्रे (Festival Gallery)" : "Festival Photo Gallery"}
          </h3>
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
