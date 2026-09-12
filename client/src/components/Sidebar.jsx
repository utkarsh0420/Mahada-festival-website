import React, { useEffect } from "react";
import { 
  X, LayoutDashboard, Sparkles, Bell, Calendar, Flame,
  BarChart2, Users, Building2, ShieldCheck, Info, Image, 
  PhoneCall, Shield, LogIn, RefreshCw, ChevronRight, CheckCircle2
} from "lucide-react";
import { useConfig } from "../context/ConfigContext";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const ICON_MAP = {
  LayoutDashboard,
  Sparkles,
  Bell,
  Calendar,
  Flame,
  BarChart2,
  Users,
  Building2,
  ShieldCheck,
  Info,
  Image,
  PhoneCall,
  Shield,
  LogIn
};

const Sidebar = ({
  isOpen,
  onClose,
  activeItem = "dashboard",
  onSelectAction,
  onOpenAdminLogin,
  onOpenAdminDashboard,
  announcementCount = 6,
  eventCount = 10
}) => {
  const { config } = useConfig();
  const { admin } = useAuth();
  const { language, t } = useLanguage();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sidebarItems = [
    { id: "dashboard", labelMr: "मुख्य पृष्ठ", labelEn: "Home Dashboard", badge: "", badgeType: "active", enabled: true, order: 1, targetSection: "top", icon: "LayoutDashboard" },
    { id: "liveUpdates", labelMr: "दैनिक वृत्तपत्र", labelEn: "Daily Bulletin", badge: "LIVE", badgeType: "pill-red", enabled: true, order: 2, targetSection: "marquee", icon: "Sparkles" },
    { id: "aartiSchedule", labelMr: "दैनिक महाआरती", labelEn: "Daily Maha Aarti", badge: "आरती", badgeType: "badge-gold", enabled: true, order: 3, targetSection: "aarti", icon: "Flame" },
    { id: "schedule", labelMr: "१० दिवसांचे वेळापत्रक", labelEn: "10-Day Schedule", badge: "१० दिवस", badgeType: "badge-gold", enabled: true, order: 4, targetSection: "schedule", icon: "Calendar" },
    { id: "upcoming", labelMr: "आगामी कार्यक्रम", labelEn: "Upcoming Events", badge: "नवीन", badgeType: "badge-gold", enabled: true, order: 5, targetSection: "upcoming", icon: "Sparkles" },
    { id: "wings", labelMr: "इमारती (४ विंग्ज)", labelEn: "4 Buildings Info", badge: "", badgeType: "default", enabled: true, order: 6, targetSection: "wings", icon: "Building2" },
    { id: "polls", labelMr: "मतदान कट्टा", labelEn: "Resident Polls", badge: "", badgeType: "default", enabled: true, order: 7, targetSection: "polls", icon: "BarChart2" },
    { id: "volunteer", labelMr: "स्वयंसेवक सेवा", labelEn: "Volunteer Seva", badge: "", badgeType: "default", enabled: true, order: 8, targetSection: "volunteer", icon: "Users" },
    { id: "gallery", labelMr: "छायाचित्रे", labelEn: "Photo Gallery", badge: "", badgeType: "default", enabled: true, order: 9, targetSection: "gallery", icon: "Image" },
    { id: "contacts", labelMr: "संपर्क व ईमेल", labelEn: "Helplines & Email", badge: "", badgeType: "default", enabled: true, order: 10, targetSection: "contacts", icon: "PhoneCall" },
    { id: "mandalInfo", labelMr: "मंडळ माहिती व सुरक्षा", labelEn: "About Mandal & Security", badge: "", badgeType: "default", enabled: true, order: 11, targetSection: "mandal-info", icon: "Info" },
    { id: "adminLogin", labelMr: "व्यवस्थापक कक्ष", labelEn: "Admin Portal", badge: "", badgeType: "default", enabled: true, order: 12, targetSection: "admin-login", icon: "Shield" }
  ];

  const handleItemClick = (item) => {
    onClose();
    if (item.id === "adminLogin") {
      if (admin) {
        onOpenAdminDashboard();
      } else {
        onOpenAdminLogin();
      }
      return;
    }
    if (onSelectAction) {
      onSelectAction(item.id, item.targetSection);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark semi-transparent backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Off-canvas sidebar drawer */}
      <aside
        className="relative w-full max-w-[320px] sm:max-w-[340px] bg-[#FAF8F5] text-[#2C1810] h-full shadow-2xl flex flex-col z-10 overflow-hidden transform transition-transform duration-300 ease-out border-r border-[#E8DFC8]"
        aria-label="Festival Sidebar Navigation"
      >
        {/* Header with Title and Close X */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8DFC8] bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-600 animate-ping" />
            <h2 className="font-heading font-extrabold text-base tracking-wide text-maroon-950 uppercase">
              {language === "mr" ? "उत्सव मेनू" : "Festival Menu"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7A6B5D] hover:text-[#2C1810] hover:bg-[#F3EFE6] transition-colors"
            aria-label="मेनू बंद करा"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = ICON_MAP[item.icon] || Sparkles;
            const isCurrent = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-bold transition-all ${
                  isCurrent
                    ? "bg-maroon-850 text-gold-200 font-extrabold shadow-sm"
                    : "text-[#2C1810] hover:bg-[#F3EFE6]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isCurrent ? "text-gold-300" : "text-[#780C1E]"}`} />
                  <span>{language === "mr" ? item.labelMr : item.labelEn}</span>
                </div>

                {/* Badge rendering */}
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      item.badgeType === "pill-red"
                        ? "bg-red-700 text-white animate-pulse"
                        : item.badgeType === "badge-gold"
                        ? "bg-gold-200 text-maroon-900 border border-gold-400"
                        : "bg-[#E8DFC8] text-[#2C1810]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Card for 4 Participating Buildings */}
        <div className="p-4 border-t border-[#E8DFC8] bg-white">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#FAF5EC] border border-gold-300 shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-maroon-800 flex-shrink-0" />
              <span className="font-heading font-extrabold text-xs text-maroon-950">
                {language === "mr" ? "सहभागी ४ इमारती" : "4 Participating Buildings"}
              </span>
            </div>
            <p className="text-[11px] font-bold text-maroon-900 mt-1">
              G (नंदादेवी) • H (निलगिरी) • J (पूर्वांचल) • K (गोवर्धन)
            </p>
            <p className="text-[10px] text-gray-600 mt-0.5">
              ॥ ४ विंग्स, एकच परिवार - सहकार्य • शिस्त • अखंड भक्ती ॥
            </p>
          </div>
        </div>

      </aside>
    </div>
  );
};

export default Sidebar;
