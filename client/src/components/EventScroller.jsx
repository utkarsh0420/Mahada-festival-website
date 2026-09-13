import React, { useRef, useState } from "react";
import { 
  ChevronLeft, ChevronRight, Clock, Calendar, MapPin, 
  Sparkles, Share2, Flame, Bell, Music, Building 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const CATEGORY_META = {
  arrival: {
    icon: Flame,
    color: "bg-amber-700 text-white",
    border: "border-amber-500",
    badge: "श्रींचे आगमन (Arrival)",
  },
  aarti: {
    icon: Sparkles,
    color: "bg-maroon-850 text-gold-300",
    border: "border-gold-500",
    badge: "दैनिक महाआरती (Aarti)",
  },
  cultural: {
    icon: Music,
    color: "bg-indigo-900 text-gold-200",
    border: "border-indigo-400",
    badge: "सांस्कृतिक कार्यक्रम (Cultural)",
  },
  other: {
    icon: Bell,
    color: "bg-maroon-700 text-white",
    border: "border-gold-400",
    badge: "विशेष सूचना",
  }
};

const EventScroller = ({ events, activeCategory, onSelectCategory, onShareWhatsApp }) => {
  const { language, t } = useLanguage();
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  // Removed Prasad and Visarjan categories as requested
  const categories = [
    { id: "all", labelMr: "सर्व ठळक घडामोडी", labelEn: "All Highlights" },
    { id: "aarti", labelMr: "🪔 दैनिक महाआरती", labelEn: "🪔 Daily Aarti" },
    { id: "arrival", labelMr: "🚩 आगमन व प्राणप्रतिष्ठा", labelEn: "🚩 Arrival" },
    { id: "cultural", labelMr: "🎭 सांस्कृतिक स्पर्धा", labelEn: "🎭 Cultural" },
  ];

  // Filter out any events that belong to prasad or visarjan if they exist in DB
  const sanitizedEvents = (events || []).filter(
    (ev) => ev.category !== "prasad" && ev.category !== "visarjan"
  );

  return (
    <section className="w-full py-6 sm:py-8 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EB] to-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-festive-saffron bg-orange-100 px-3 py-1 rounded-full border border-orange-300/60 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === "mr" ? "डिजिटल कार्यक्रम वृत्त" : "Festival Event Highlights"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-maroon-950 mt-1 font-heading">
              {language === "mr" ? "उत्सव ठळक कार्यक्रम (Festival Updates)" : "Festival Updates & Highlights"}
            </h2>
            <p className="text-xs sm:text-sm text-maroon-800 font-medium">
              {language === "mr" 
                ? "श्रींचे आगमन, दैनिक महाआरती वेळा, विंग यजमान व सांस्कृतिक कार्यक्रम" 
                : "Lord Ganesha's arrival, daily aarti timings, host wings and cultural competitions"}
            </p>
          </div>

          {/* Desktop Next/Prev Navigation */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full border transition-all ${
                canScrollLeft
                  ? "bg-white text-maroon-900 border-gold-400 hover:bg-gold-50 shadow-sm"
                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              }`}
              aria-label="मागे स्क्रोल करा"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`p-2 rounded-full border transition-all ${
                canScrollRight
                  ? "bg-white text-maroon-900 border-gold-400 hover:bg-gold-50 shadow-sm"
                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              }`}
              aria-label="पुढे स्क्रोल करा"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pills Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-shrink-0 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full transition-all border ${
                activeCategory === cat.id
                  ? "bg-maroon-850 text-gold-200 border-gold-500 shadow-sm"
                  : "bg-white text-maroon-900 hover:bg-gold-100/60 border-gold-300"
              }`}
            >
              {language === "mr" ? cat.labelMr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Event Cards Scroller */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth -mx-3 px-3 sm:mx-0 sm:px-0"
        >
          {sanitizedEvents.length > 0 ? (
            sanitizedEvents.map((event) => {
              const meta = CATEGORY_META[event.category] || CATEGORY_META.other;
              const Icon = meta.icon;

              return (
                <div
                  key={event._id || event.order}
                  className="flex-shrink-0 w-[290px] sm:w-[330px] rounded-2xl bg-white border-2 border-gold-300/80 p-4 shadow-sm hover:shadow-lg hover:border-gold-500 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Badge & Date */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full ${meta.color}`}>
                        <Icon className="w-3 h-3" />
                        <span>{language === "mr" ? meta.badge : event.category}</span>
                      </span>

                      <span className="text-[11px] font-bold text-gray-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gold-600" />
                        <span>{event.dateStr}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-maroon-950 font-heading mb-1.5 leading-snug">
                      {language === "mr" ? event.titleMr : (event.titleEn || event.titleMr)}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-700 line-clamp-3 mb-3 leading-relaxed">
                      {language === "mr" ? event.descriptionMr : (event.descriptionEn || event.descriptionMr)}
                    </p>
                  </div>

                  {/* Footer with Time & WhatsApp */}
                  <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-maroon-900 font-bold">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{event.time}</span>
                    </div>

                    <button
                      onClick={() => onShareWhatsApp(event)}
                      className="p-1.5 text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition"
                      title="व्हॉट्सॲपवर पाठवा"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full text-center py-8 text-xs text-gray-500">
              या श्रेणीत सध्या कोणतेही कार्यक्रम उपलब्ध नाहीत.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default EventScroller;
