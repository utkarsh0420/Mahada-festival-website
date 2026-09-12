import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, ShieldCheck, Megaphone, Calendar, Phone, Settings, Check, AlertTriangle
} from "lucide-react";
import { useConfig } from "../context/ConfigContext";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

import TabApprovals from "./admin/TabApprovals";
import AnnouncementManager from "./admin/AnnouncementManager";
import EventManager from "./admin/EventManager";
import ContactManager from "./admin/ContactManager";
import GeneralSettings from "./admin/GeneralSettings";

const AdminDashboard = ({ onClose }) => {
  const { config, refreshConfig, updateTabs, updateGeneral } = useConfig();
  const { admin, logout } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState("tabs");
  const [notification, setNotification] = useState({ message: "", type: "success" });

  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [contacts, setContacts] = useState([]);

  const notify = (msg, type = "success") => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification({ message: "", type: "success" }), 3500);
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await API.get("/announcements/admin/all");
      if (res.data.success) setAnnouncements(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      if (res.data.success) setEvents(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await API.get("/contacts");
      if (res.data.success) setContacts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    fetchEvents();
    fetchContacts();
  }, []);

  const handleToggleTab = async (tabKey) => {
    if (!config?.tabs || !config.tabs[tabKey]) return;
    const currentTab = config.tabs[tabKey];
    const updatedTabs = {
      ...config.tabs,
      [tabKey]: {
        ...currentTab,
        enabled: !currentTab.enabled,
        approved: !currentTab.enabled
      }
    };

    const res = await updateTabs(updatedTabs);
    if (res.success) {
      notify(`टॅब स्थिती अद्ययावत केली (${currentTab.labelMr})`);
      refreshConfig();
    } else {
      notify("टॅब अद्ययावत करताना त्रुटी आली", "error");
    }
  };

  const handleSaveGeneral = async (generalData) => {
    const res = await updateGeneral(generalData);
    if (res.success) {
      notify("सर्वसाधारण सेटिंग्ज व स्क्रोलर मजकूर जतन केला!");
    } else {
      notify("सेटिंग्ज जतन करताना त्रुटी आली", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF5EC] via-[#FFFDF9] to-[#FAF5EC] text-[#2D060B]">
      
      {/* Top Admin Nav */}
      <nav className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-850 text-white border-b-2 border-gold-500 shadow-lg px-4 py-3 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs bg-maroon-800 hover:bg-maroon-700 text-gold-300 px-3 py-1.5 rounded-lg border border-gold-500/40 transition font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>वेबसाईट पहा (View Website)</span>
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-bold text-gold-200 font-heading leading-tight">
                व्यवस्थापक नियंत्रण कक्ष (Admin Panel)
              </h1>
              <p className="text-[11px] text-gold-100/70">
                लॉगिन: <span className="text-gold-300 font-semibold">{admin?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="text-xs bg-red-900/80 hover:bg-red-800 text-red-100 px-3 py-1.5 rounded-lg border border-red-500/40 transition font-semibold"
            >
              लॉगआउट (Logout)
            </button>
          </div>

        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        
        {/* Notification Toast */}
        {notification.message && (
          <div
            className={`mb-4 p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm ${
              notification.type === "error"
                ? "bg-red-100 border border-red-300 text-red-900"
                : "bg-emerald-100 border border-emerald-300 text-emerald-900"
            }`}
          >
            {notification.type === "error" ? (
              <AlertTriangle className="w-4 h-4 text-red-700" />
            ) : (
              <Check className="w-4 h-4 text-emerald-700" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Subtab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-gold-300">
          {[
            { id: "tabs", label: "टॅब मान्यता व नियंत्रण (Tab Approvals)", icon: ShieldCheck },
            { id: "announcements", label: "महत्वाच्या सूचना (Announcements)", icon: Megaphone },
            { id: "events", label: "आरती व कार्यक्रम (Events)", icon: Calendar },
            { id: "contacts", label: "५ विंग्ज प्रतिनिधी (Contacts)", icon: Phone },
            { id: "general", label: "स्क्रोलर व सामान्य सेटिंग्ज", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 flex-shrink-0 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all border ${
                  isActive
                    ? "bg-maroon-850 text-gold-300 border-gold-500 shadow-md scale-[1.02]"
                    : "bg-white text-maroon-900 hover:bg-gold-50 border-gold-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Views */}
        {activeSubTab === "tabs" && (
          <TabApprovals config={config} onToggleTab={handleToggleTab} />
        )}

        {activeSubTab === "announcements" && (
          <AnnouncementManager
            announcements={announcements}
            onRefresh={fetchAnnouncements}
            onNotify={notify}
          />
        )}

        {activeSubTab === "events" && (
          <EventManager
            events={events}
            onRefresh={fetchEvents}
            onNotify={notify}
          />
        )}

        {activeSubTab === "contacts" && (
          <ContactManager
            contacts={contacts}
            onRefresh={fetchContacts}
            onNotify={notify}
          />
        )}

        {activeSubTab === "general" && (
          <GeneralSettings
            config={config}
            onSaveGeneral={handleSaveGeneral}
          />
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;
