import React, { useRef, useState } from "react";
import { 
  ChevronLeft, ChevronRight, Clock, Calendar, MapPin, 
  Sparkles, Share2, Flame, Bell, Music, UtensilsCrossed, Waves, Building
} from "lucide-react";

const CATEGORY_META = {
  arrival: {
    icon: Flame,
    color: "bg-amber-600 text-white",
    border: "border-amber-500",
    badge: "श्रींचे आगमन (Arrival)",
  },
  aarti: {
    icon: Sparkles,
    color: "bg-maroon-800 text-gold-300",
    border: "border-gold-500",
    badge: "दैनिक महाआरती (Aarti)",
  },
  cultural: {
    icon: Music,
    color: "bg-indigo-900 text-gold-200",
    border: "border-indigo-400",
    badge: "सांस्कृतिक कार्यक्रम (Cultural)",
  },
  prasad: {
    icon: UtensilsCrossed,
    color: "bg-emerald-800 text-emerald-100",
    border: "border-emerald-500",
    badge: "महाप्रसाद वाटप (Prasad)",
  },
  visarjan: {
    icon: Waves,
    color: "bg-rose-900 text-rose-100",
    border: "border-rose-400",
    badge: "विसर्जन सोहळा (Visarjan)",
  },
  other: {
    icon: Bell,
    color: "bg-maroon-700 text-white",
    border: "border-gold-400",
    badge: "विशेष सूचना",
  }
};

const EventScroller = ({ events, activeCategory, onSelectCategory, onShareWhatsApp }) => {
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

  const categories = [
    { id: "all", label: "सर्व कार्यक्रम (All Updates)" },
    { id: "aarti", label: "🪔 दैनिक आरती (Aarti)" },
    { id: "arrival", label: "🚩 आगमन (Arrival)" },
    { id: "prasad", label: "🍲 महाप्रसाद (Prasad)" },
    { id: "cultural", label: "🎭 सांस्कृतिक (Cultural)" },
    { id: "visarjan", label: "🌺 विसर्जन (Visarjan)" },
  ];

  return (
    <section className="w-full py-6 sm:py-8 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-festive-saffron bg-orange-100 px-3 py-1 rounded-full border border-orange-300/60 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> डिजिटल वृत्तपत्र व कार्यक्रम पत्रिका
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-maroon-900 mt-1 font-heading">
              उत्सव कार्यक्रम व वेळापत्रक (Event Scroller)
            </h2>
            <p className="text-xs sm:text-sm text-maroon-700">
              आरती वेळ, आगमन सोहळा, सांस्कृतिक कार्यक्रम, महाप्रसाद आणि विसर्जन माहिती
            </p>
          </div>

          {/* Desktop Next/Prev Navigation */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full border transition-all ${
                canScrollLeft
                  ? "bg-maroon-850 hover:bg-maroon-800 text-gold-300 border-gold-500/50 shadow-md"
                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`p-2 rounded-full border transition-all ${
                canScrollRight
                  ? "bg-maroon-850 hover:bg-maroon-800 text-gold-300 border-gold-500/50 shadow-md"
                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-shrink-0 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-full transition-all duration-200 border ${
                activeCategory === cat.id
                  ? "bg-maroon-900 text-gold-300 border-gold-400 shadow-md scale-105"
                  : "bg-white text-maroon-800 hover:bg-gold-50 border-gold-300/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Horizontal Card Scroller */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-1"
        >
          {events && events.length > 0 ? (
            events.map((event) => {
              const meta = CATEGORY_META[event.category] || CATEGORY_META.other;
              const Icon = meta.icon;

              return (
                <div
                  key={event._id || event.titleMr}
                  className="flex-shrink-0 w-[290px] sm:w-[340px] md:w-[380px] bg-white rounded-2xl border-2 border-gold-300/70 hover:border-gold-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Top Color Banner */}
                  <div className={`px-4 py-2.5 flex items-center justify-between ${meta.color} border-b ${meta.border}`}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gold-300 flex-shrink-0" />
                      <span className="text-xs font-bold tracking-wide font-heading">
                        {meta.badge}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold bg-black/25 px-2 py-0.5 rounded-full border border-white/20">
                      {event.dateStr}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Time Pill */}
                      <div className="inline-flex items-center gap-1.5 bg-amber-50 text-maroon-900 border border-amber-200 px-3 py-1 rounded-lg text-xs font-bold mb-3 shadow-xs">
                        <Clock className="w-3.5 h-3.5 text-festive-saffron" />
                        <span>{event.time}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-maroon-950 font-heading leading-snug group-hover:text-maroon-700 transition-colors mb-1">
                        {event.titleMr}
                      </h3>
                      {event.titleEn && (
                        <p className="text-xs text-maroon-700/80 italic font-medium mb-3">
                          {event.titleEn}
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-3 mb-4">
                        {event.descriptionMr || event.descriptionEn}
                      </p>
                    </div>

                    {/* Venue & Host Wing Footer */}
                    <div className="pt-3 border-t border-gold-200/70 flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-maroon-800">
                        <MapPin className="w-3.5 h-3.5 text-maroon-600 flex-shrink-0" />
                        <span className="truncate">{event.venue || "मुख्य मंडप, म्हाडा टॉवर्स"}</span>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-1 text-[11px] text-festive-saffron font-semibold truncate">
                          <Building className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{event.hostWing || "सर्व विंग्ज"}</span>
                        </div>

                        {/* WhatsApp Share Button */}
                        <button
                          onClick={() => onShareWhatsApp(event)}
                          className="flex items-center gap-1 text-xs bg-emerald-700 hover:bg-emerald-600 text-white font-medium px-2.5 py-1 rounded-lg transition shadow-xs flex-shrink-0"
                          title="व्हॉट्सॲपवर शेअर करा"
                        >
                          <Share2 className="w-3 h-3" />
                          <span>शेअर</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full py-12 text-center text-maroon-800 bg-white rounded-xl border border-gold-300">
              <Sparkles className="w-8 h-8 text-gold-500 mx-auto mb-2 animate-bounce" />
              <p className="font-semibold text-sm">या वर्गवारीत सध्या कोणतेही कार्यक्रम उपलब्ध नाहीत.</p>
              <p className="text-xs text-gray-500 mt-1">सर्व कार्यक्रम पाहण्यासाठी "सर्व कार्यक्रम" निवडा.</p>
            </div>
          )}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden flex items-center justify-center gap-2 mt-2 text-[11px] text-maroon-600 font-medium">
          <span>डावीकडे व उजवीकडे स्वाइप करा</span>
          <span className="text-gold-600">&larr; &rarr;</span>
        </div>

      </div>
    </section>
  );
};

export default EventScroller;
