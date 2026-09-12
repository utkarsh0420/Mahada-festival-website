import React, { useState, useEffect } from "react";
import { 
  Home, Flame, Calendar, Sparkles, Image, Phone,
  LayoutDashboard, LogIn, LogOut, 
  Menu, X, QrCode, Globe, Mail, ChevronRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useConfig } from "../context/ConfigContext";
import { useLanguage } from "../context/LanguageContext";
import { ExpandableTabs } from "./ui/expandable-tabs";

const Header = ({ onOpenAdminLogin, onOpenAdminDashboard, onOpenWhatsAppQR, onOpenSidebar }) => {
  const { admin, logout } = useAuth();
  const { config } = useConfig();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top-section");

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        "top-section",
        "aarti-section",
        "schedule-section",
        "upcoming-section",
        "gallery-section",
        "contacts-section",
      ];
      const scrollPosition = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (id === "top-section") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navTabs = [
    {
      id: "top-section",
      title: language === "mr" ? "मुख्य पृष्ठ" : "Home",
      icon: Home,
      iconColor: "text-gold-300",
      isActive: activeSection === "top-section",
      onClick: () => scrollToSection("top-section"),
    },
    {
      id: "aarti-section",
      title: language === "mr" ? "दैनिक महाआरती" : "Daily Aarti",
      icon: Flame,
      iconColor: "text-amber-400",
      isActive: activeSection === "aarti-section",
      onClick: () => scrollToSection("aarti-section"),
    },
    {
      id: "schedule-section",
      title: language === "mr" ? "१० दिवसांचे वेळापत्रक" : "10-Day Schedule",
      icon: Calendar,
      iconColor: "text-gold-300",
      isActive: activeSection === "schedule-section",
      onClick: () => scrollToSection("schedule-section"),
    },
    {
      id: "upcoming-section",
      title: language === "mr" ? "आगामी कार्यक्रम" : "Upcoming Events",
      icon: Sparkles,
      iconColor: "text-amber-300",
      isActive: activeSection === "upcoming-section",
      onClick: () => scrollToSection("upcoming-section"),
    },
    {
      id: "gallery-section",
      title: language === "mr" ? "छायाचित्रे" : "Photo Gallery",
      icon: Image,
      iconColor: "text-yellow-300",
      isActive: activeSection === "gallery-section",
      onClick: () => scrollToSection("gallery-section"),
    },
    {
      id: "contacts-section",
      title: language === "mr" ? "संपर्क कक्ष" : "Contacts",
      icon: Phone,
      iconColor: "text-emerald-400",
      isActive: activeSection === "contacts-section",
      onClick: () => scrollToSection("contacts-section"),
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white shadow-xl border-b-2 border-gold-500/80">
      {/* Top micro gold highlight line */}
      <div className="h-1 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-3">
          
          {/* 1. Left-aligned Logo & Mandal Title lockup */}
          <div 
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group flex-shrink-0" 
            onClick={() => scrollToSection("top-section")}
            title="मुख्य पृष्ठावर जा (Scroll to top)"
          >
            <div className="relative flex-shrink-0">
              {/* Gold Ring Aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-amber-300 to-gold-600 rounded-full blur-xs opacity-80 group-hover:opacity-100 transition duration-300"></div>
              <img
                src="/logo.jpg"
                alt="म्हाडा टॉवर्स उत्सव मंडळ लोगो"
                className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-gold-400 shadow-xl"
                onError={(e) => {
                  console.error("Logo failed to load");
                }}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-gold-300 bg-maroon-800/90 px-2.5 py-0.5 rounded-full border border-gold-500/40">
                  {config?.regNo ? `नोंदणी: ${config.regNo}` : "Regd No: १२४३/२०२५ - पुणे"}
                </span>
                
                {/* Official Society Email in Header */}
                <a 
                  href="mailto:mhadatowersutsav@gmail.com"
                  onClick={(e) => e.stopPropagation()}
                  className="hidden lg:inline-flex items-center gap-1 text-[11px] text-gold-200 hover:text-white bg-maroon-850/90 hover:bg-maroon-800 px-2.5 py-0.5 rounded-full border border-gold-500/30 transition"
                  title="सोसायटी अधिकृत ईमेल"
                >
                  <Mail className="w-3 h-3 text-gold-400" />
                  <span>mhadatowersutsav@gmail.com</span>
                </a>
              </div>

              <h1 className="text-base sm:text-xl md:text-2xl font-black text-gold-300 tracking-tight leading-snug drop-shadow-sm font-heading">
                {language === "mr" 
                  ? (config?.mandalNameMr || "म्हाडा टॉवर्स उत्सव मंडळ")
                  : (config?.mandalNameEn || "MHADA Towers Utsav Mandal")
                }
              </h1>

              <p className="text-[11px] sm:text-xs text-gold-100/90 hidden sm:flex items-center gap-1 font-medium">
                <span>{config?.addressMr || "पिंपरी वाघेरे, पिंपरी चिंचवड, पुणे - ४११०१७"}</span>
              </p>
            </div>
          </div>

          {/* 2. Desktop Navigation Links (Expandable Tabs: only show name when mouse pointer points) */}
          <nav className="hidden lg:flex items-center">
            <ExpandableTabs tabs={navTabs} />
          </nav>

          {/* 3. Action Buttons (Language Switcher, WhatsApp, Admin) */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            
            {/* Language Switcher Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-maroon-950 font-black text-xs sm:text-sm shadow-md transition transform active:scale-95"
              title="Change Language (भाषा बदला)"
            >
              <Globe className="w-3.5 h-3.5 text-maroon-900" />
              <span>{language === "mr" ? "English" : "मराठी"}</span>
            </button>

            {/* WhatsApp Community Quick Button */}
            <button
              onClick={onOpenWhatsAppQR}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
              title="व्हॉट्सॲप कम्युनिटी QR कोड"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t("whatsappGroup")}</span>
            </button>

            {/* Admin Dashboard / Login Button */}
            {admin ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={onOpenAdminDashboard}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-maroon-800 hover:bg-maroon-700 text-gold-300 font-bold text-xs border border-gold-500/40 shadow transition"
                  title="व्यवस्थापक डॅशबोर्ड"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-gold-400" />
                  <span className="hidden lg:inline">{t("adminDashboard")}</span>
                </button>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-xl bg-maroon-850 hover:bg-rose-900 text-rose-300 font-bold text-xs border border-rose-500/30 transition"
                  title="लॉगआउट"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-maroon-850 hover:bg-maroon-800 text-gold-300 font-bold text-xs border border-gold-500/40 transition"
                title="व्यवस्थापक लॉगिन"
              >
                <LogIn className="w-3.5 h-3.5 text-gold-400" />
                <span className="hidden lg:inline">{t("adminLogin")}</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-maroon-850 hover:bg-maroon-800 text-gold-300 border border-gold-500/40 transition flex items-center justify-center"
              aria-label="मेनू उघडा"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* 4. Mobile Slide-down Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-maroon-950/98 border-t border-gold-500/40 backdrop-blur-md px-4 py-4 space-y-3 animate-fadeIn">
          
          {/* Society Email badge on mobile */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-maroon-900/90 border border-gold-500/30 text-xs text-gold-200">
            <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
            <a href="mailto:mhadatowersutsav@gmail.com" className="font-semibold underline truncate">
              mhadatowersutsav@gmail.com
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navTabs.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-bold border transition ${
                    item.isActive 
                      ? "bg-maroon-800 text-gold-300 border-gold-500/50 shadow-xs" 
                      : "bg-maroon-900/80 hover:bg-maroon-850 text-gold-200 border-gold-500/20"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${item.iconColor || "text-gold-400"}`} />
                    <span className="truncate">{item.title}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gold-500/20 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsAppQR();
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
            >
              <QrCode className="w-4 h-4" />
              <span>{t("whatsappGroup")}</span>
            </button>

            {admin ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminDashboard();
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-maroon-800 text-gold-300 font-bold text-xs border border-gold-500/40"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{t("adminDashboard")}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-maroon-800 text-gold-300 font-bold text-xs border border-gold-500/40"
              >
                <LogIn className="w-4 h-4" />
                <span>{t("adminLogin")}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
