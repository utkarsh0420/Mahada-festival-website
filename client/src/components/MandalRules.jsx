import React from "react";
import { ShieldCheck, Volume2, Car, Sparkles, AlertTriangle } from "lucide-react";

const MandalRules = () => {
  const rules = [
    {
      title: "ध्वनी मर्यादा व शांतता नियम",
      desc: "शासकीय नियमांनुसार रात्री १०:०० नंतर ध्वनिक्षेपक (लाऊडस्पीकर) पूर्णपणे बंद राहील. कृपया मंडप परिसरात शांतता राखावी.",
      icon: Volume2,
    },
    {
      title: "वाहने पार्किंग व आपत्कालीन रस्ता",
      desc: "मुख्य मंडपाच्या समोरील आपत्कालीन रस्ता कायम रिकामा ठेवावा. सर्व वाहने ठरवून दिलेल्या विंग पार्किंगमध्येच लावावीत.",
      icon: Car,
    },
    {
      title: "स्वच्छता व कचरा व्यवस्थापन",
      desc: "प्रसादाच्या पत्रावळ्या, द्रोण व प्लास्टिक बाटल्या कचराकुंडीतच टाकाव्यात. ओला व सुका कचरा वेगळा ठेवण्यास सहकार्य करावे.",
      icon: Sparkles,
    },
    {
      title: "१००% पर्यावरणपूरक उत्सव",
      desc: "सोसायटीमध्ये १००% शाडू मातीच्या मूर्तीचे कृत्रिम हौदात विसर्जन केले जाईल. रासायनिक रंगांचा वापर टाळण्यात आला आहे.",
      icon: ShieldCheck,
    }
  ];

  return (
    <div className="bg-white rounded-2xl border-2 border-gold-300 p-5 sm:p-7 shadow-md">
      <div className="mb-4 pb-3 border-b border-gold-200 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-800 bg-gold-100 px-3 py-1 rounded-full border border-gold-400">
            <ShieldCheck className="w-3.5 h-3.5" /> मंडळ अधिकृत नियमावली
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-maroon-900 mt-1 font-heading">
            सोसायटी व उत्सव आचारसंहिता (Common Rules)
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rules.map((rule, idx) => {
          const Icon = rule.icon;
          return (
            <div key={idx} className="p-4 rounded-xl bg-gold-50/50 border border-gold-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-maroon-850 text-gold-300 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-maroon-950 font-heading mb-1">
                  {rule.title}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MandalRules;
