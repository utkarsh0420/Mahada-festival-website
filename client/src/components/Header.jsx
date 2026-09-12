import React, { useState } from "react";
import { Sparkles, ShieldCheck, LogIn, LayoutDashboard, LogOut, Menu, X, PhoneCall, QrCode } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useConfig } from "../context/ConfigContext";

const Header = ({ onOpenAdminLogin, onOpenAdminDashboard, onOpenWhatsAppQR, onOpenSidebar }) => {
  const { admin, logout } = useAuth();
  const { config } = useConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-maroon-950 via-maroon-900 to-maroon-850 text-white shadow-xl border-b-2 border-gold-500/80">
      {/* Top micro gold stripe */}
      <div className="h-1 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Sidebar Trigger & Logo & Mandal Title */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* PRIME REQUIREMENT: Prominent Menu Sidebar Trigger Button */}
            <button
              onClick={onOpenSidebar}
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-900/90 to-maroon-800 hover:from-gold-400 hover:to-gold-500 text-gold-200 hover:text-maroon-950 font-bold text-xs sm:text-sm px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-gold-400/60 transition-all shadow-md group transform active:scale-95"
              title="उत्सव मेनू उघडा (Open Festival Sidebar)"
              aria-label="Open Sidebar Menu"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gold-300 group-hover:text-maroon-950 transition-colors" />
              <span className="hidden sm:inline font-heading">मेनू (Menu)</span>
            </button>

            <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative group flex-shrink-0">
                {/* Gold Ring Aura */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <img
                  src="/logo.jpg"
                  alt="म्हाडा टॉवर्स उत्सव मंडळ लोगो"
                  className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-gold-400 shadow-lg"
                  onError={(e) => {
                    console.error("Logo failed to load");
                  }}
                />
              </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-gold-300 bg-maroon-800/80 px-2 py-0.5 rounded-full border border-gold-500/30">
                  {config?.regNo ? `नोंदणी क्र: ${config.regNo}` : "Regd No: १२४३/२०२५ - पुणे"}
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-festive-saffron bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30 font-medium">
                  <Sparkles className="w-2.5 h-2.5 animate-spin" /> ५ विंग्ज उत्सव (G, H, I, J, K)
                </span>
              </div>

              <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gold-300 tracking-tight leading-tight drop-shadow-sm font-heading">
                {config?.mandalNameMr || "म्हाडा टॉवर्स उत्सव मंडळ"}
              </h1>
              <p className="text-[11px] sm:text-xs md:text-sm text-gold-100/90 flex items-center gap-1 font-normal line-clamp-1">
                <span>{config?.addressMr || "पिंपरी वाघेरे, पिंपरी चिंचवड, पुणे - ४११०१७"}</span>
              </p>
            </div>
          </div>
        </div>

          {/* Right Action Items: Live Status & Admin Access in Top Right Corner */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Festival Live Badge (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-950/80 to-maroon-800/90 px-3 py-1.5 rounded-full border border-gold-400/40 shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-festive-saffron opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-festive-saffron"></span>
              </span>
              <span className="text-xs font-semibold text-gold-200">
                {config?.festivalStatus || "उत्सव सुरू आहे"}
              </span>
            </div>

            {/* Quick WhatsApp QR Button */}
            <button
              onClick={onOpenWhatsAppQR}
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs px-3 py-1.5 rounded-lg border border-emerald-500/40 transition shadow-sm font-medium"
              title="अधिकृत व्हॉट्सॲप ग्रुप / WhatsApp Community"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-300" />
              <span>व्हॉट्सॲप ग्रुप</span>
            </button>

            {/* Admin Portal Button - Top Right Corner Requirement */}
            {admin ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenAdminDashboard}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-maroon-950 font-bold text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md border border-gold-300 transition-all transform hover:scale-[1.02]"
                >
                  <LayoutDashboard className="w-4 h-4 text-maroon-950" />
                  <span className="hidden sm:inline">व्यवस्थापक डॅशबोर्ड</span>
                  <span className="sm:hidden">डॅशबोर्ड</span>
                </button>

                <button
                  onClick={logout}
                  className="p-1.5 sm:p-2 bg-maroon-800 hover:bg-maroon-700 text-gold-200 rounded-lg border border-gold-500/30 transition"
                  title="लॉगआउट (Logout)"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1.5 bg-gradient-to-r from-maroon-800 to-maroon-700 hover:from-gold-500 hover:to-gold-600 text-gold-300 hover:text-maroon-950 font-semibold text-xs sm:text-sm px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-gold-500/50 transition-all duration-200 shadow-md group"
              >
                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400 group-hover:text-maroon-950 transition-colors" />
                <span>व्यवस्थापक लॉगिन</span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-md text-gold-300 hover:text-white hover:bg-maroon-800 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-gold-500/30 flex flex-col gap-2 pb-2">
            <div className="flex items-center justify-between text-xs text-gold-200 px-2 py-1 bg-maroon-850 rounded">
              <span>उत्सव स्थिती: <strong>{config?.festivalStatus || "उत्सव सुरू आहे"}</strong></span>
              <span className="text-[10px] bg-festive-saffron text-white px-2 py-0.5 rounded-full">G, H, I, J, K</span>
            </div>
            
            <button
              onClick={() => {
                onOpenSidebar();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white py-2 rounded-xl text-xs font-bold shadow"
            >
              <Menu className="w-4 h-4" /> संपूर्ण उत्सव मेनू उघडा (Open Sidebar)
            </button>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  onOpenWhatsAppQR();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 py-2 rounded border border-emerald-500/40"
              >
                <QrCode className="w-3.5 h-3.5" /> व्हॉट्सॲप QR कोड
              </button>
              
              <a
                href={`tel:${config?.emergencyHelpline || '+919822011223'}`}
                className="flex items-center justify-center gap-1.5 bg-maroon-800 hover:bg-maroon-700 text-gold-200 py-2 rounded border border-gold-500/30"
              >
                <PhoneCall className="w-3.5 h-3.5 text-gold-400" /> तातडीची मदत
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
