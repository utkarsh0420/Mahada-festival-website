import React, { useState } from "react";
import { 
  Phone, Shield, User, Building, Mail, 
  Copy, Check, HeartHandshake, Sparkles, ExternalLink 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const DEFAULT_CONTACTS = [
  {
    nameMr: "श्री. सतीश कांबळे",
    nameEn: "Mr. Satish Kamble",
    roleMr: "मंडळ अध्यक्ष (G विंग प्रमुख)",
    roleEn: "President (G Wing Lead)",
    wing: "G - नंदादेवी (Nandadevi)",
    phone: "+91 98220 11223",
    type: "committee"
  },
  {
    nameMr: "श्री. विजय पवार",
    nameEn: "Mr. Vijay Pawar",
    roleMr: "मंडळ उपाध्यक्ष (H विंग प्रमुख)",
    roleEn: "Vice President (H Wing Lead)",
    wing: "H - निलगिरी (Nilgiri)",
    phone: "+91 94220 77882",
    type: "committee"
  },
  {
    nameMr: "श्री. राहुल गायकवाड",
    nameEn: "Mr. Rahul Gaikwad",
    roleMr: "कार्यकारी सचिव (कार्यक्रम संयोजन)",
    roleEn: "Secretary (Event Coordination)",
    wing: "H - निलगिरी (Nilgiri)",
    phone: "+91 98220 44556",
    type: "committee"
  },
  {
    nameMr: "श्री. निलेश मोरे",
    nameEn: "Mr. Nilesh More",
    roleMr: "सहसचिव (J विंग प्रमुख)",
    roleEn: "Joint Secretary (J Wing Lead)",
    wing: "J - पूर्वांचल (Purvanchal)",
    phone: "+91 94220 77884",
    type: "committee"
  },
  {
    nameMr: "श्री. गणेश जाधव",
    nameEn: "Mr. Ganesh Jadhav",
    roleMr: "मुख्य संघटक (K विंग प्रमुख)",
    roleEn: "Chief Organizer (K Wing Lead)",
    wing: "K - गोवर्धन (Govardhan)",
    phone: "+91 94220 77885",
    type: "committee"
  },
  {
    nameMr: "म्हाडा टॉवर्स मुख्य सुरक्षा कक्ष",
    nameEn: "MHADA Towers Security Desk",
    roleMr: "२४x७ सुरक्षा व आपत्कालीन मदत कक्ष",
    roleEn: "24x7 Security & Emergency Desk",
    wing: "सर्व ४ विंग्ज (मुख्य गेट)",
    phone: "+91 98220 99999",
    type: "emergency"
  }
];

const EmergencyContacts = ({ contacts }) => {
  const { language, t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const displayContacts = contacts && contacts.length > 0 ? contacts : DEFAULT_CONTACTS;
  const societyEmail = "mhadatowersutsav@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(societyEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contacts-section" className="scroll-mt-20 my-8">
      <div className="bg-gradient-to-br from-white via-[#FFFDF9] to-[#FAF5EB] rounded-3xl border-2 border-gold-400 shadow-xl overflow-hidden p-4 sm:p-7 md:p-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-gold-300/60">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-rose-900 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
              <Shield className="w-4 h-4 text-rose-700" />
              <span>{t("helplineTitle")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-maroon-950 font-heading mt-1.5">
              {language === "mr" ? "कार्यकारिणी, आपत्कालीन संपर्क व ईमेल" : "Committee, Emergency Helplines & Email"}
            </h2>
            <p className="text-xs sm:text-sm text-maroon-800 font-medium">
              {t("helplineSubtitle")}
            </p>
          </div>
        </div>

        {/* 1. SOCIETY OFFICIAL EMAIL HIGHLIGHT CARD (Image 1 Requirement) */}
        <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white border-2 border-gold-400 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gold-400 text-maroon-950 flex items-center justify-center flex-shrink-0 shadow-md">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-gold-300 font-bold block">
                {t("officialEmail")}
              </span>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-white font-mono mt-0.5">
                {societyEmail}
              </h3>
              <p className="text-xs text-gold-200/80">
                {language === "mr" 
                  ? "नोंदणी क्र: १२४३/२०२५ - पुणे • कोणत्याही सूचना किंवा मदतीसाठी ईमेल करा" 
                  : "Regd: 1243/2025 - Pune • Email us for queries, suggestions or support"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
            <a
              href={`mailto:${societyEmail}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-maroon-950 font-black text-xs sm:text-sm shadow-md transition transform active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t("emailUs")}</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-700 text-gold-200 font-bold text-xs sm:text-sm border border-gold-500/40 transition"
              title="ईमेल पत्ता कॉपी करा"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedEmail ? t("copied") : t("copyEmail")}</span>
            </button>
          </div>
        </div>

        {/* 2. CONTACTS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {displayContacts.map((c, idx) => {
            const isEmergency = c.type === "emergency" || c.type === "security";

            return (
              <div
                key={c._id || idx}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 shadow-xs ${
                  isEmergency
                    ? "bg-rose-50/80 border-rose-300 hover:border-rose-400"
                    : "bg-white border-gold-300 hover:border-gold-500"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-maroon-800 bg-gold-100 px-2 py-0.5 rounded border border-gold-200 truncate">
                      {c.wing || "सर्व विंग्ज"}
                    </span>
                    {isEmergency && (
                      <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded border border-red-200">
                        तातडीची मदत
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm sm:text-base font-black text-maroon-950 font-heading truncate">
                    {language === "mr" ? c.nameMr : (c.nameEn || c.nameMr)}
                  </h4>

                  <p className="text-xs text-gray-700 font-medium truncate mt-0.5">
                    {language === "mr" ? c.roleMr : (c.roleEn || c.roleMr)}
                  </p>

                  <p className="text-xs font-mono font-bold text-maroon-800 mt-1">
                    {c.phone}
                  </p>
                </div>

                <a
                  href={`tel:${c.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex-shrink-0 p-3 rounded-2xl bg-maroon-850 hover:bg-maroon-700 text-gold-300 shadow-md transition flex items-center justify-center transform active:scale-90"
                  title={`${c.nameMr} यांना कॉल करा`}
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EmergencyContacts;
