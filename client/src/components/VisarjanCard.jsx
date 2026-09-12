import React from "react";
import { Waves, Clock, MapPin, Shield, Sparkles } from "lucide-react";

const VisarjanCard = ({ onShareWhatsApp }) => {
  return (
    <div className="bg-gradient-to-br from-rose-950 via-maroon-900 to-maroon-950 text-white rounded-2xl border-2 border-gold-400/80 p-5 sm:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-gold-500/30">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-200 bg-rose-900/60 px-3 py-1 rounded-full border border-rose-500/40">
            <Waves className="w-3.5 h-3.5 text-rose-300" /> भावपूर्ण निरोप व विसर्जन मिरवणूक
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gold-300 mt-1 font-heading">
            विसर्जन सोहळा व मिरवणूक मार्ग (Visarjan Procession)
          </h3>
          <p className="text-xs sm:text-sm text-gold-100/80">
            अनंत चतुर्दशी - लाडक्या बाप्पाला पर्यावरणपूरक व शिस्तबद्ध निरोप
          </p>
        </div>

        <div className="bg-maroon-950/80 px-3.5 py-2 rounded-xl border border-gold-500/40 text-xs">
          <div className="font-bold text-gold-300 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-festive-saffron" /> दुपारी ०३:३० वाजता
          </div>
          <div className="text-[11px] text-gray-300">मिरवणूक प्रस्थान</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
        
        {/* Step 1 */}
        <div className="bg-maroon-950/70 p-4 rounded-xl border border-gold-500/20">
          <div className="text-gold-400 font-bold text-xs mb-1 uppercase tracking-wider">टप्पा १: उत्तरपूजा व आरती</div>
          <div className="text-base font-bold text-white font-heading mb-1">दुपारी ०२:३० वाजता</div>
          <p className="text-gray-300 text-xs leading-relaxed">
            मुख्य मंडपात सर्व भाविकांच्या उपस्थितीत अखेरची निरोप आरती व मंत्रपुष्पांजली.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-maroon-950/70 p-4 rounded-xl border border-gold-500/20">
          <div className="text-gold-400 font-bold text-xs mb-1 uppercase tracking-wider">टप्पा २: भव्य मिरवणूक मार्ग</div>
          <div className="text-base font-bold text-white font-heading mb-1">दुपारी ०३:३० वाजता</div>
          <p className="text-gray-300 text-xs leading-relaxed">
            मंडप &rarr; इमारत G, H &rarr; I, J &rarr; इमारत K &rarr; मुख्य प्रवेशद्वार परिक्रमा.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-maroon-950/70 p-4 rounded-xl border border-gold-500/20">
          <div className="text-gold-400 font-bold text-xs mb-1 uppercase tracking-wider">टप्पा ३: पर्यावरणपूरक विसर्जन</div>
          <div className="text-base font-bold text-white font-heading mb-1">संध्याकाळी ०६:३० वाजता</div>
          <p className="text-gray-300 text-xs leading-relaxed">
            सोसायटी आवारात तयार करण्यात आलेल्या कृत्रिम हौदात १००% पर्यावरणपूरक विसर्जन.
          </p>
        </div>

      </div>

      {/* Safety & WhatsApp Notice */}
      <div className="mt-5 pt-4 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-gold-200">
          <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>सुरक्षा नियम: लहान मुलांची काळजी घ्या, गर्दीत शिस्त पाळा, फटाके वाजवणे वर्ज्य आहे.</span>
        </div>

        <button
          onClick={() =>
            onShareWhatsApp({
              titleMr: "म्हाडा टॉवर्स बाप्पा विसर्जन मिरवणूक",
              time: "दुपारी ०३:३० पासून",
              venue: "म्हाडा टॉवर्स अंतर्गत मार्ग ते कृत्रिम हौद",
              descriptionMr: "अनंत चतुर्दशी विसर्जन मिरवणूक दुपारी ३:३० वा. सुरू होईल. सर्व ५ इमारतींच्या रहिवाशांनी सपरिवार उपस्थित राहावे."
            })
          }
          className="w-full sm:w-auto px-4 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg shadow transition"
        >
          विसर्जन वेळ शेअर करा
        </button>
      </div>
    </div>
  );
};

export default VisarjanCard;
