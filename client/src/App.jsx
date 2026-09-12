import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ConfigProvider, useConfig } from "./context/ConfigContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLoginModal from "./components/AdminLoginModal";
import WhatsAppJoinModal from "./components/WhatsAppJoinModal";

const MainApp = () => {
  const { admin } = useAuth();
  const { config, loading } = useConfig();

  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isWhatsAppQROpen, setIsWhatsAppQROpen] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      
      {/* Top Header with Logo and Top-Right Admin Button */}
      <Header
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

      {/* Admin Login Modal (Triggered from Top Right Button) */}
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
