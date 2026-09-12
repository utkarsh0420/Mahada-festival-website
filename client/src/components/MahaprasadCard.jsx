import React from "react";
import { UtensilsCrossed, Clock, MapPin, CheckCircle, Ticket, Users } from "lucide-react";

const MahaprasadCard = ({ onShareWhatsApp }) => {
  const wingSlots = [
    { wing: "G Wing & H Wing", slot: "दुपारी १२:३० ते ०१:३०" },
    { wing: "I Wing & J Wing", slot: "दुपारी ०१:३० ते ०२:३०" },
    { wing: "K Wing व उर्वरित अतिथी", slot: "दुपारी ०२:३० ते ०३:३०" },
  ];

  return (
    <div className="bg-white rounded-2xl border-2 border-gold-300 shadow-lg p-5 sm:p-7 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-gold-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            <UtensilsCrossed className="w-3.5 h-3.5" /> महाप्रसाद वाटप विशेष दिन
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-maroon-900 mt-1 font-heading">
            भव्य महाप्रसाद व भोजन (Maha Prasad Feast)
          </h3>
          <p className="text-xs sm:text-sm text-maroon-700">
            ५ व्या दिवशी सर्व ५ विंग्समधील मालक, भाडेकरू व कुटुंबीयांसाठी स्नेहभोजन
          </p>
        </div>

        <div className="flex-shrink-0 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs px-3 py-2 rounded-xl">
          <div className="font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-700" /> दुपारी १२:३० ते ०३:३०
          </div>
          <div className="text-[11px] text-gray-600">५वा दिवस (महाप्रसाद वार)</div>
        </div>
      </div>

      {/* Grid: Menu & Wing Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Satvik Menu */}
        <div className="bg-[#FAF5EC] rounded-xl p-4 border border-gold-300/70">
          <h4 className="text-sm font-bold text-maroon-900 font-heading mb-2 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            शुद्ध सात्विक महाप्रसाद मेनू:
          </h4>
          <ul className="space-y-1.5 text-xs sm:text-sm text-gray-800">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
              <span>गरमागरम पुरी व रस्सा बटाटा भाजी</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
              <span>सुगंधी पारंपरिक मसालेभात व वरण</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
              <span>तुपातील रवा शिरा नैवेद्य व गोड बुंदी</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
              <span>ताक, पापड, लोणचे व शुद्ध पिण्याचे पाणी</span>
            </li>
          </ul>

          <div className="mt-4 pt-3 border-t border-gold-200 text-xs text-maroon-800 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-maroon-600 flex-shrink-0" />
            <span>विशेष भोजन मंडप: J व K विंग समोरील प्रांगण</span>
          </div>
        </div>

        {/* Wing-wise Time Allocation to prevent crowd */}
        <div className="bg-white rounded-xl p-4 border border-gold-300/70 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-maroon-900 font-heading mb-2 flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-maroon-700" />
              गर्दी टाळण्यासाठी विंगनुसार वेळापत्रक:
            </h4>
            <div className="space-y-2">
              {wingSlots.map((ws, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-amber-50/70 border border-amber-200/60 text-xs">
                  <span className="font-bold text-maroon-950">{ws.wing}</span>
                  <span className="font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                    {ws.slot}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              onShareWhatsApp({
                titleMr: "५ व्या दिवसाचा भव्य महाप्रसाद वाटप",
                time: "दुपारी १२:३० ते ०३:३०",
                venue: "म्हाडा टॉवर्स विशेष भोजन मंडप",
                descriptionMr: "म्हाडा टॉवर्स उत्सव मंडळातर्फे महाप्रसाद वाटप होणार आहे. सर्व रहिवाशांनी विंगच्या वेळेनुसार उपस्थित राहून प्रसादाचा लाभ घ्यावा."
              })
            }
            className="mt-4 w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg shadow transition text-center"
          >
            महाप्रसाद वेळ व्हॉट्सॲपवर शेअर करा
          </button>
        </div>

      </div>
    </div>
  );
};

export default MahaprasadCard;
