import React, { useState } from "react";
import { 
  Image as ImageIcon, Sparkles, X, Share2, 
  Eye, Calendar, MapPin, ZoomIn 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const PAST_PHOTOS_DATA = [
  {
    id: 1,
    titleMr: "श्री गणरायाची भव्य शाडू मातीची मूर्ती प्राणप्रतिष्ठा",
    titleEn: "Grand Eco-Friendly Bappa Murti Sthapana",
    category: "मूर्ती व प्रतिष्ठापना",
    categoryEn: "Murti & Sthapana",
    year: "२०२५",
    yearEn: "2025",
    descMr: "म्हाडा टॉवर्स मुख्य मंडपातील बाप्पांचे विलोभनीय रूप. आकर्षक फुलांची आरास व सुवर्ण मुकुट दर्शन.",
    descEn: "Splendid darshan of Bappa adorned with fragrant flowers and golden crown in the main pandal.",
    accentColor: "from-amber-700 to-maroon-900"
  },
  {
    id: 2,
    titleMr: "१०१ समई व दीप प्रज्वलन महाआरती सोहळा",
    titleEn: "Grand Deepotsav Maha Aarti Ceremony",
    category: "महाआरती",
    categoryEn: "Maha Aarti",
    year: "२०२५",
    yearEn: "2025",
    descMr: "सर्व ४ इमारतींमधील शेकडो भाविकांनी एकत्र येऊन केलेली अखंड सायं महाआरती व मंत्रपुष्पांजली.",
    descEn: "Hundreds of residents gathered for the grand evening maha aarti illuminated with sacred lamps.",
    accentColor: "from-orange-700 to-amber-900"
  },
  {
    id: 3,
    titleMr: "बाल गोपाळांची भव्य चित्रकला व वेशभूषा स्पर्धा",
    titleEn: "Children's Drawing & Fancy Dress Competitions",
    category: "सांस्कृतिक",
    categoryEn: "Cultural & Kids",
    year: "२०२४",
    yearEn: "2024",
    descMr: "सोसायटीतील ७० हून अधिक मुलांचा उत्स्फूर्त सहभाग व बक्षीस वितरण समारंभ.",
    descEn: "Over 70 children participated enthusiastically in fancy dress and drawing competitions.",
    accentColor: "from-indigo-800 to-maroon-900"
  },
  {
    id: 4,
    titleMr: "पारंपरिक ढोल-ताशा पथक व लेझीम मिरवणूक",
    titleEn: "Traditional Dhol-Tasha & Lezim Procession",
    category: "मिरवणूक",
    categoryEn: "Procession",
    year: "२०२५",
    yearEn: "2025",
    descMr: "युवा मंडळाच्या तालबद्ध वादनाने म्हाडा टॉवर्स संकुल दुमदुमले. अभूतपूर्व उत्साह व आनंद.",
    descEn: "Rhythmic beats of Dhol-Tasha echoed through the MHADA Towers complex during the grand welcome.",
    accentColor: "from-rose-800 to-maroon-950"
  },
  {
    id: 5,
    titleMr: "महिला मंडळाचा पारंपरिक खेळ व मंगळागौर",
    titleEn: "Women's Wing Mangalagaur & Folk Games",
    category: "सांस्कृतिक",
    categoryEn: "Cultural & Kids",
    year: "२०२५",
    yearEn: "2025",
    descMr: "गौरी पूजनाच्या शुभमुहूर्तावर सर्व विंग्समधील भगिनींचा सहभाग, फुगडी व पारंपरिक लोककला.",
    descEn: "Celebration of traditional folk games, Fugdi, and cultural heritage on the eve of Gauri Pujan.",
    accentColor: "from-purple-800 to-maroon-900"
  },
  {
    id: 6,
    titleMr: "पर्यावरणपूरक कृत्रिम हौद संकल्प व सांगता",
    titleEn: "Eco-Friendly Water Tank Farewell & Slogans",
    category: "मूर्ती व प्रतिष्ठापना",
    categoryEn: "Murti & Sthapana",
    year: "२०२४",
    yearEn: "2024",
    descMr: "संकुलातच उभारलेल्या १००% पर्यावरणपूरक कृत्रिम हौदात बाप्पांचे सन्मानपूर्वक भावपूर्ण विसर्जन.",
    descEn: "Dignified and 100% eco-friendly water tank immersion ceremony within the complex premises.",
    accentColor: "from-emerald-800 to-maroon-950"
  }
];

const PhotoGallery = ({ onShareWhatsApp }) => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activePhoto, setActivePhoto] = useState(null);

  const categories = [
    { id: "all", labelMr: "सर्व फोटो", labelEn: "All Photos" },
    { id: "मूर्ती व प्रतिष्ठापना", labelMr: "मूर्ती व प्रतिष्ठापना", labelEn: "Murti & Sthapana" },
    { id: "महाआरती", labelMr: "महाआरती", labelEn: "Maha Aarti" },
    { id: "सांस्कृतिक", labelMr: "सांस्कृतिक", labelEn: "Cultural" },
    { id: "मिरवणूक", labelMr: "मिरवणूक", labelEn: "Procession" }
  ];

  const filteredPhotos = selectedCategory === "all"
    ? PAST_PHOTOS_DATA
    : PAST_PHOTOS_DATA.filter((p) => p.category === selectedCategory);

  const handleSharePhoto = (photo) => {
    if (onShareWhatsApp) {
      onShareWhatsApp({
        titleMr: `📸 उत्सव छायाचित्र - ${photo.titleMr}`,
        time: `वर्ष ${photo.year}`,
        venue: "म्हाडा टॉवर्स, पिंपरी वाघेरे",
        descriptionMr: `${photo.descMr}\nगणपती बाप्पा मोरया, मंगलमूर्ती मोरया!`
      });
    }
  };

  return (
    <section id="gallery-section" className="scroll-mt-20 my-8">
      <div className="bg-gradient-to-br from-white via-[#FFFDF9] to-[#FAF5EB] rounded-3xl border-2 border-gold-400 shadow-xl overflow-hidden p-4 sm:p-7 md:p-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-gold-300/60">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-maroon-900 bg-gold-200/90 px-3 py-1 rounded-full border border-gold-400">
              <ImageIcon className="w-4 h-4 text-maroon-800" />
              <span>{t("galleryTitle")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-maroon-950 font-heading mt-1.5">
              {language === "mr" ? "मागील उत्सवांची अविस्मरणीय छायाचित्रे" : "Past Festival Moments & Photo Gallery"}
            </h2>
            <p className="text-xs sm:text-sm text-maroon-800 font-medium">
              {t("gallerySubtitle")}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  selectedCategory === cat.id
                    ? "bg-maroon-850 text-gold-200 border-gold-500 shadow-sm"
                    : "bg-white text-maroon-900 hover:bg-gold-100 border-gold-300"
                }`}
              >
                {language === "mr" ? cat.labelMr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="bg-white rounded-2xl border-2 border-gold-300 overflow-hidden shadow-sm hover:shadow-xl hover:border-gold-500 transition-all duration-300 cursor-pointer group flex flex-col"
            >
              {/* Photo Visual Box */}
              <div className={`h-48 bg-gradient-to-br ${photo.accentColor} relative flex flex-col items-center justify-center text-white p-4 overflow-hidden`}>
                
                {/* Visual Decorative Mandala Aura */}
                <div className="absolute inset-0 opacity-15 flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-40 border-4 border-dashed border-gold-300 rounded-full animate-spin"></div>
                </div>

                <Sparkles className="w-10 h-10 text-gold-300 mb-2 transform group-hover:scale-125 transition duration-300" />
                
                <h4 className="text-sm sm:text-base font-extrabold text-gold-100 text-center font-heading leading-tight drop-shadow-md z-10 px-2">
                  {language === "mr" ? photo.titleMr : photo.titleEn}
                </h4>

                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-xs text-gold-300 border border-gold-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  वर्ष {photo.year}
                </div>

                <div className="absolute top-3 right-3 bg-gold-400 text-maroon-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                  {language === "mr" ? photo.category : photo.categoryEn}
                </div>

                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200">
                  <ZoomIn className="w-3.5 h-3.5 text-gold-300" />
                  <span>पहा</span>
                </div>
              </div>

              {/* Photo Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-[#FAF5EC]">
                <p className="text-xs text-gray-700 leading-relaxed">
                  {language === "mr" ? photo.descMr : photo.descEn}
                </p>

                <div className="mt-3 pt-2.5 border-t border-gold-200 flex items-center justify-between text-xs text-maroon-800 font-semibold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>वर्ष {photo.year}</span>
                  </span>
                  <span className="text-gold-700 font-bold group-hover:text-maroon-900 transition flex items-center gap-1">
                    <span>विस्तारित पहा</span>
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Full-screen Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full border-2 border-gold-400 shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between p-4 bg-maroon-950 text-white border-b border-gold-500/40">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-gold-400 text-maroon-950 font-black px-2.5 py-0.5 rounded-full">
                  {language === "mr" ? activePhoto.category : activePhoto.categoryEn}
                </span>
                <span className="text-xs text-gold-300 font-bold">
                  वर्ष {activePhoto.year}
                </span>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-1.5 rounded-full text-gold-300 hover:text-white hover:bg-maroon-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Photo Visual Box */}
            <div className={`h-64 bg-gradient-to-br ${activePhoto.accentColor} flex flex-col items-center justify-center text-white p-6 relative`}>
              <Sparkles className="w-16 h-16 text-gold-300 mb-3 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-black text-gold-100 text-center font-heading leading-tight drop-shadow-lg">
                {language === "mr" ? activePhoto.titleMr : activePhoto.titleEn}
              </h3>
              <p className="text-xs text-gold-200 mt-2 font-medium">
                म्हाडा टॉवर्स गणेशोत्सव संकुल, पिंपरी वाघेरे
              </p>
            </div>

            {/* Modal Description & Actions */}
            <div className="p-6 bg-gradient-to-b from-white to-[#FAF5EC]">
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed mb-6 font-medium">
                {language === "mr" ? activePhoto.descMr : activePhoto.descEn}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gold-200">
                <button
                  onClick={() => handleSharePhoto(activePhoto)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span>व्हॉट्सॲपवर शेअर करा</span>
                </button>

                <button
                  onClick={() => setActivePhoto(null)}
                  className="w-full sm:w-auto px-4 py-2 bg-maroon-850 hover:bg-maroon-800 text-gold-200 font-bold text-xs rounded-xl transition"
                >
                  {t("close")}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
