import React, { useEffect } from "react";
import { 
  X, LayoutDashboard, Sparkles, Bell, Calendar, Flame,
  BarChart2, Users, Building2, ShieldCheck, Info, Image, 
  PhoneCall, Shield, LogIn, RefreshCw, ChevronRight, CheckCircle2
} from "lucide-react";
import { useConfig } from "../context/ConfigContext";
import { useAuth } from "../context/AuthContext";

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

  const sidebarItems = config?.sidebarMenu || [
    { id: "dashboard", labelMr: "मुख्य पृष्ठ", labelEn: "Dashboard", badge: "", badgeType: "active", enabled: true, order: 1, targetSection: "top", icon: "LayoutDashboard" },
    { id: "liveUpdates", labelMr: "अपडेट्स", labelEn: "Live Updates Scroller", badge: "LIVE", badgeType: "pill-red", enabled: true, order: 2, targetSection: "marquee", icon: "Sparkles" },
    { id: "announcements", labelMr: "सूचना", labelEn: "Announcements", badge: String(announcementCount || 6), badgeType: "badge-count", enabled: true, order: 3, targetSection: "announcements", icon: "Bell" },
    { id: "events", labelMr: "वेळापत्रक", labelEn: "Festival Events", badge: String(eventCount || 10), badgeType: "badge-count", enabled: true, order: 4, targetSection: "events", icon: "Calendar" },
    { id: "aartiSchedule", labelMr: "दैनिक महाआरती व यजमान", labelEn: "Daily Aarti & Host Wings", badge: "आज", badgeType: "badge-gold", enabled: true, order: 5, targetSection: "aarti", icon: "Flame" },
    { id: "polls", labelMr: "मतदान", labelEn: "Resident Polls", badge: "", badgeType: "default", enabled: true, order: 6, targetSection: "polls", icon: "BarChart2" },
    { id: "volunteer", labelMr: "सहभाग", labelEn: "Volunteer Seva", badge: "", badgeType: "default", enabled: true, order: 7, targetSection: "volunteer", icon: "Users" },
    { id: "wings", labelMr: "इमारती", labelEn: "Wing Info", badge: "", badgeType: "default", enabled: true, order: 8, targetSection: "wings", icon: "Building2" },
    { id: "funds", labelMr: "हिशोब", labelEn: "Transparency & Funds", badge: "", badgeType: "default", enabled: true, order: 9, targetSection: "owners", icon: "ShieldCheck" },
    { id: "mandalInfo", labelMr: "मंडळ माहिती", labelEn: "Mandal Info", badge: "", badgeType: "default", enabled: true, order: 10, targetSection: "mandal-info", icon: "Info" },
    { id: "gallery", labelMr: "छायाचित्रे", labelEn: "Festival Gallery", badge: "", badgeType: "default", enabled: true, order: 11, targetSection: "gallery", icon: "Image" },
    { id: "contacts", labelMr: "संपर्क", labelEn: "Helpdesk & Contacts", badge: "", badgeType: "default", enabled: true, order: 12, targetSection: "contacts", icon: "PhoneCall" },
    { id: "adminLogin", labelMr: "व्यवस्थापक लॉगिन", labelEn: "Society Admin Login", badge: "", badgeType: "default", enabled: true, order: 13, targetSection: "admin-login", icon: "Shield" }
  ];

  // Filter only enabled items and sort by order
  const activeItems = [...sidebarItems]
    .filter((item) => item.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

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

  const settings = config?.sidebarSettings || {
    bottomCardTitle: "All 5 Wings",
    bottomCardSubtitle: "Wings G, H, I, J, K",
    bottomCardTagline: "❤️ ५ विंग्स, एकच परिवार",
    bottomCardSubtag: "सहकार्य • शिस्त • अखंड भक्ती"
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark semi-transparent backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Off-canvas sidebar drawer matching the user's reference image */}
      <aside
        className="relative w-full max-w-[320px] sm:max-w-[340px] bg-[#FAF8F5] text-[#2C1810] h-full shadow-2xl flex flex-col z-10 overflow-hidden transform transition-transform duration-300 ease-out border-r border-[#E8DFC8]"
        aria-label="Festival Sidebar Navigation"
      >
        {/* TOP HEADER: Avatar, Location, Mandal Name, Regd No, and Close Button */}
        <div className="p-4 sm:p-5 border-b border-[#E8DFC8]/70 bg-gradient-to-b from-[#FFFDF9] to-[#F7F2E9] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:text-gray-900 hover:bg-[#EADFCA] transition"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 pr-6">
            {/* Round Avatar with Gold Border */}
            <div className="relative flex-shrink-0">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full p-0.5 bg-gradient-to-tr from-gold-600 via-amber-300 to-gold-500 shadow-md">
                <img
                  src="/logo.jpg"
                  alt="म्हाडा टॉवर्स लोगो"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            {/* Header Text */}
            <div className="overflow-hidden">
              <span className="text-[11px] sm:text-xs text-[#8A5A36] font-medium tracking-wide block">
                पिंपरी चिंचवड • {config?.festivalYear || "२०२६"}
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-[#2C1810] font-heading leading-tight truncate">
                {config?.mandalNameMr || "म्हाडा टॉवर्स उत्सव मंडळ"}
              </h2>
              <span className="text-[10px] sm:text-[11px] text-[#7A6B5D] block truncate mt-0.5">
                {config?.regNo ? `Regd No: ${config.regNo}` : "Regd No: १२४३/२०२५"}
              </span>
            </div>
          </div>
        </div>

        {/* MENU ITEMS LIST (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 festive-scrollbar">
          {activeItems.map((item) => {
            const IconComponent = ICON_MAP[item.icon] || LayoutDashboard;
            const isDashboard = item.id === "dashboard";
            const isAdminItem = item.id === "adminLogin";

            // Special styling for Dashboard matching orange pill in screenshot
            if (isDashboard) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white font-bold text-xs sm:text-sm shadow-md transition-all transform active:scale-95 group mb-1.5"
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-white flex-shrink-0" />
                    <span>
                      {item.labelEn ? `${item.labelEn} (${item.labelMr})` : item.labelMr}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-orange-200 opacity-80 group-hover:translate-x-0.5 transition" />
                </button>
              );
            }

            // Standard Menu Item
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs sm:text-sm text-[#3A271D] hover:bg-[#EFE7D8] hover:text-[#1F0E06] transition group ${
                  isAdminItem ? "mt-3 pt-2 border-t border-[#E5DAC4]" : ""
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <IconComponent className="w-4.5 h-4.5 text-[#856342] group-hover:text-[#B45309] transition flex-shrink-0" />
                  <span className="truncate font-medium text-left">
                    {item.labelEn ? `${item.labelEn} (${item.labelMr})` : item.labelMr}
                  </span>
                </div>

                {/* Right Badges */}
                <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                  {/* LIVE badge (Red Pill) */}
                  {item.badge === "LIVE" && (
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#DC2626] text-white rounded-full flex items-center gap-1 shadow-xs animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      LIVE
                    </span>
                  )}

                  {/* Count Badge (e.g. 6, 10) */}
                  {item.badge && item.badge !== "LIVE" && (
                    <span className="min-w-[20px] px-1.5 py-0.5 text-[10px] font-bold text-[#5A3E2B] bg-[#E7DBC6] rounded-full text-center">
                      {item.badge}
                    </span>
                  )}

                  {/* Admin status subtitle / chevron */}
                  {isAdminItem && (
                    <span className="text-[10px] text-gray-400 font-normal">
                      {admin ? "✓ लॉग इन" : "लॉगिन →"}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* BOTTOM WIDGET CARD: "All 5 Wings", "❤️ ५ विंग्स, एकच परिवार" */}
        <div className="p-3 sm:p-4 border-t border-[#E8DFC8] bg-[#F4EDE0]/80">
          <div className="bg-[#FFFDF9] rounded-xl p-3 border border-[#E0D3BC] shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#B45309]" />
                <span className="text-xs font-bold text-[#2C1810]">
                  {settings.bottomCardTitle || "All 5 Wings"}
                </span>
                <span className="text-[10px] text-gray-500">
                  ({settings.bottomCardSubtitle || "Wings G, H, I, J, K"})
                </span>
              </div>
              <RefreshCw className="w-3.5 h-3.5 text-gray-400 hover:text-gray-700 cursor-pointer" title="विंग अपडेट्स" />
            </div>

            <div className="text-center py-1 mt-1 border-t border-dashed border-[#E5DAC4]">
              <p className="text-xs font-bold text-[#8A1526] flex items-center justify-center gap-1">
                <span>{settings.bottomCardTagline || "❤️ ५ विंग्स, एकच परिवार"}</span>
              </p>
              <p className="text-[10px] text-[#7A6B5D] mt-0.5">
                {settings.bottomCardSubtag || "सहकार्य • शिस्त • अखंड भक्ती"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
