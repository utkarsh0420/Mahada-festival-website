import React from "react";
import { Sparkles, Clock, Flame, MapPin, Building, Users } from "lucide-react";

const AartiCard = ({ onShareWhatsApp }) => {
  const aartis = [
    {
      titleMr: "दैनिक प्रभात महाआरती",
      titleEn: "Morning Daily Aarti",
      time: "सकाळी ०८:३० वाजता",
      hostMr: "इमारत G व H विंग यजमान",
      ritual: "मंत्रपुष्पांजली, काकड आरती व मोदक नैवेद्य",
      type: "morning",
    },
    {
      titleMr: "दैनिक सायंकाळची महाआरती व धूपारती",
      titleEn: "Evening Grand Maha Aarti",
      time: "रात्री ०८:०० वाजता",
      hostMr: "इमारत I, J व K विंग यजमान",
      ritual: "१०१ दीप प्रज्वलन, महिला मंडळाचे भजन व महाप्रसाद",
      type: "evening",
    }
  ];

  return (
    <div className="bg-gradient-to-br from-maroon-900 via-maroon-850 to-maroon-950 text-white rounded-2xl border-2 border-gold-400/80 p-5 sm:p-7 shadow-xl relative overflow-hidden">
      {/* Background Mandala Glow */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gold-500/30">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-festive-saffron bg-maroon-950/80 px-3 py-1 rounded-full border border-gold-500/40">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-diya-flicker" /> दैनिक वेळापत्रक
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gold-300 mt-1 font-heading">
              दैनिक महाआरती वेळा (Daily Aarti Schedule)
            </h3>
            <p className="text-xs sm:text-sm text-gold-100/80">
              सर्व ५ इमारतींमधील (G, H, I, J, K) रहिवाशांनी कुटुंबीयांसह वेळेवर उपस्थित राहावे
            </p>
          </div>

          <div className="flex items-center gap-2 bg-maroon-950/90 px-3 py-2 rounded-xl border border-gold-500/30 text-xs">
            <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
            <span className="text-gold-100">मध्यवर्ती मंडप, म्हाडा टॉवर्स प्रांगण</span>
          </div>
        </div>

        {/* 2 Aarti Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {aartis.map((aarti, idx) => (
            <div
              key={idx}
              className="bg-maroon-950/70 rounded-xl p-4 sm:p-5 border border-gold-400/50 hover:border-gold-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-maroon-950 bg-gradient-to-r from-gold-300 to-gold-500 px-2.5 py-0.5 rounded-full">
                    {aarti.type === "morning" ? "प्रभात आरती" : "संध्या आरती"}
                  </span>
                  <div className="flex items-center gap-1 text-gold-300 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-festive-saffron" />
                    <span>{aarti.time}</span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-gold-200 font-heading mb-1">
                  {aarti.titleMr}
                </h4>
                <p className="text-xs text-gold-100/70 italic mb-3">
                  {aarti.titleEn}
                </p>

                <div className="space-y-2 text-xs text-gray-200 mb-4">
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span className="font-medium">{aarti.hostMr}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>{aarti.ritual}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  onShareWhatsApp({
                    titleMr: aarti.titleMr,
                    time: aarti.time,
                    venue: "मध्यवर्ती उत्सव मंडप, म्हाडा टॉवर्स",
                    descriptionMr: `दैनिक आरती वेळ: ${aarti.time}. यजमान: ${aarti.hostMr}. सर्व रहिवाशांनी उपस्थित राहावे.`
                  })
                }
                className="w-full text-center text-xs font-semibold py-2 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white rounded-lg shadow transition"
              >
                आरती वेळ व्हॉट्सॲपवर पाठवा
              </button>
            </div>
          ))}
        </div>

        {/* Gentle Notice */}
        <div className="mt-5 p-3 rounded-lg bg-maroon-950/60 border border-gold-500/20 text-center text-xs text-gold-200/90">
          🔔 कृपया आरतीच्या वेळेपूर्वी १० मिनिटे आधी उपस्थित राहून मंडळ व्यवस्थापनास सहकार्य करावे.
        </div>
      </div>
    </div>
  );
};

export default AartiCard;
