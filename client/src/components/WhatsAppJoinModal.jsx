import React, { useState, useEffect } from "react";
import { X, QrCode, Check, Copy, ExternalLink, ShieldCheck, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useConfig } from "../context/ConfigContext";
import { useLanguage } from "../context/LanguageContext";

const WhatsAppJoinModal = ({ isOpen, onClose }) => {
  const { config } = useConfig();
  const { language } = useLanguage();
  const isEn = language === "en";
  const [copied, setCopied] = useState(false);

  // Handle ESC key press and body scroll locking
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const joinLink = config?.whatsAppCommunityLink || "https://chat.whatsapp.com/sample-mhada-towers-ganpati";

  const handleCopy = () => {
    navigator.clipboard.writeText(joinLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-community-modal-title"
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full border-2 border-emerald-500 shadow-2xl overflow-hidden relative max-h-[92dvh] flex flex-col animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold & Green Accent Stripe */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600 w-full flex-shrink-0" />

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-850 text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-700/50 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 bg-emerald-900/80 rounded-xl border border-emerald-500/40 text-emerald-300 flex-shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 id="whatsapp-community-modal-title" className="text-sm sm:text-base font-bold font-heading text-white truncate">
                {isEn ? "MHADA Towers WhatsApp Community" : "म्हाडा टॉवर्स व्हॉट्सॲप कम्युनिटी"}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-emerald-200 line-clamp-1">
                {isEn ? "Join for instant daily festival updates" : "दैनिक अपडेट्स थेट मोबाईलवर मिळवण्यासाठी सामील व्हा"}
              </p>
            </div>
          </div>

          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-500/40 transition active:scale-95 flex-shrink-0 cursor-pointer"
            aria-label="Close"
            title={isEn ? "Close Window" : "पॉप-अप बंद करा"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Scrollable if needed on small screens) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex flex-col items-center text-center space-y-3.5">
          
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-850 bg-emerald-50 font-bold px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> 
            <span>{isEn ? "Official Community for 4 Wings (G, H, J, K)" : "केवळ म्हाडा ४ इमारती (G, H, J, K) साठी अधिकृत"}</span>
          </div>

          {/* QR Code Container */}
          <div className="p-4 bg-gradient-to-br from-white to-emerald-50/40 rounded-2xl border-2 border-emerald-300 shadow-inner flex items-center justify-center">
            <QRCodeSVG
              value={joinLink}
              size={190}
              bgColor="#ffffff"
              fgColor="#064e3b"
              level="Q"
              includeMargin={false}
            />
          </div>

          <p className="text-xs text-gray-600 max-w-xs leading-relaxed">
            {isEn 
              ? "Scan the QR code with your mobile camera or click below to join directly." 
              : "मोबाईल कॅमेऱ्याने वरील QR कोड स्कॅन करा किंवा खालील बटणावर क्लिक करून थेट ग्रुपमध्ये सामील व्हा."}
          </p>

          {/* Direct Join Action */}
          <div className="w-full space-y-2 pt-1">
            <a
              href={joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition active:scale-95 text-xs sm:text-sm cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>{isEn ? "Join WhatsApp Group Now" : "व्हॉट्सॲप ग्रुपमध्ये सामील व्हा (Join Now)"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold py-2 px-3 rounded-xl border border-emerald-300 transition active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">{isEn ? "Link Copied!" : "लिंक कॉपी झाली (Copied)!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{isEn ? "Copy Group Link" : "ग्रुप लिंक कॉपी करा"}</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[10px] sm:text-[11px] text-gray-500 leading-snug">
            {isEn 
              ? "Note: Only official announcements & important notices are posted by the Mandal organizers."
              : "टीप: ग्रुपवर फक्त अधिकृत मंडळ व्यवस्थापक व कमिटीद्वारेच महत्वाच्या सूचना पाठवल्या जातात."}
          </p>
        </div>

        {/* Modal Footer with Dedicated Close Button */}
        <div className="p-3.5 sm:p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 flex-shrink-0">
          <span className="text-[11px] text-stone-500 font-medium hidden sm:inline">
            {isEn ? "MHADA Towers Utsav Mandal" : "म्हाडा टॉवर्स उत्सव मंडळ"}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto ml-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 hover:text-stone-950 font-bold text-xs transition active:scale-95 cursor-pointer shadow-2xs border border-stone-300"
          >
            <X className="w-3.5 h-3.5" />
            <span>{isEn ? "Close" : "बंद करा (Close)"}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default WhatsAppJoinModal;
