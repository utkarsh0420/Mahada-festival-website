import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ConfigProvider, useConfig } from "./context/ConfigContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLoginModal from "./components/AdminLoginModal";
import WhatsAppJoinModal from "./components/WhatsAppJoinModal";
import Sidebar from "./components/Sidebar";
import FloatingMenuTrigger from "./components/FloatingMenuTrigger";
import { 
  ResidentPollsModal, 
  VolunteerSevaModal, 
  WingInfoModal, 
  FestivalGalleryModal 
} from "./components/InteractiveModals";

const MainApp = () => {
  const { admin } = useAuth();
  const { config, loading } = useConfig();

  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isWhatsAppQROpen, setIsWhatsAppQROpen] = useState(false);

  // Sidebar & Interactive Feature Modals State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPollsOpen, setIsPollsOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isWingsOpen, setIsWingsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] flex flex-col items-center justify-center text-maroon-900">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gold-300 border-t-maroon-800 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-maroon-850">
            ॐ
          </div>
        </div>
        <p className="mt-4 font-heading font-bold text-sm tracking-wide">
          म्हाडा टॉवर्स उत्सव मंडळ माहिती केंद्र लोड होत आहे...
        </p>
      </div>
    );
  }

  // If Admin opened dashboard view
  if (isAdminDashboardOpen && admin) {
    return (
      <AdminDashboard
        onClose={() => setIsAdminDashboardOpen(false)}
      />
    );
  }

  const handleSidebarAction = (itemId, targetSection) => {
    if (itemId === "polls") {
      setIsPollsOpen(true);
      return;
    }
    if (itemId === "volunteer") {
      setIsVolunteerOpen(true);
      return;
    }
    if (itemId === "wings") {
      setIsWingsOpen(true);
      return;
    }
    if (itemId === "gallery") {
      setIsGalleryOpen(true);
      return;
    }
    if (itemId === "adminLogin") {
      if (admin) setIsAdminDashboardOpen(true);
      else setIsAdminLoginModalOpen(true);
      return;
    }

    // Smooth scroll to target section
    let elementId = null;
    if (targetSection === "top") elementId = "top-section";
    else if (targetSection === "marquee") elementId = "marquee-section";
    else if (targetSection === "announcements") elementId = "marquee-section";
    else if (targetSection === "events") elementId = "events-section";
    else if (targetSection === "aarti") elementId = "aarti-section";
    else if (targetSection === "owners") elementId = "owners-section";
    else if (targetSection === "mandal-info") elementId = "mandal-info-section";
    else if (targetSection === "contacts") elementId = "contacts-section";

    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (targetSection === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] relative">
      
      {/* Off-canvas Festive Sidebar matching user screenshot */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectAction={handleSidebarAction}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Floating Side Button for quick sidebar access */}
      <FloatingMenuTrigger
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />

      {/* Top Header with Logo, Main Menu Button, and Admin Access */}
      <Header
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        onOpenWhatsAppQR={() => setIsWhatsAppQROpen(true)}
      />

      {/* Main Public Festival Portal */}
      <main className="flex-1">
        <Home
          onOpenWhatsAppQR={() => setIsWhatsAppQROpen(true)}
        />
      </main>

      {/* Official Footer */}
      <Footer
        onOpenAdminLogin={() => {
          if (admin) setIsAdminDashboardOpen(true);
          else setIsAdminLoginModalOpen(true);
        }}
      />

      {/* Admin Login Modal (Triggered from Top Right Button or Sidebar) */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccess={() => {
          setIsAdminLoginModalOpen(false);
          setIsAdminDashboardOpen(true);
        }}
      />

      {/* WhatsApp Community QR Modal */}
      <WhatsAppJoinModal
        isOpen={isWhatsAppQROpen}
        onClose={() => setIsWhatsAppQROpen(false)}
      />

      {/* Interactive Feature Modals Triggered from Sidebar */}
      <ResidentPollsModal
        isOpen={isPollsOpen}
        onClose={() => setIsPollsOpen(false)}
      />

      <VolunteerSevaModal
        isOpen={isVolunteerOpen}
        onClose={() => setIsVolunteerOpen(false)}
      />

      <WingInfoModal
        isOpen={isWingsOpen}
        onClose={() => setIsWingsOpen(false)}
      />

      <FestivalGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ConfigProvider>
        <MainApp />
      </ConfigProvider>
    </AuthProvider>
  );
};

export default App;
