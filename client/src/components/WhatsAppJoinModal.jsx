import React, { useState } from "react";
import { X, QrCode, Check, Copy, ExternalLink, ShieldCheck, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useConfig } from "../context/ConfigContext";

const WhatsAppJoinModal = ({ isOpen, onClose }) => {
  const { config } = useConfig();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const joinLink = config?.whatsAppCommunityLink || "https://chat.whatsapp.com/sample-mhada-towers-ganpati";

  const handleCopy = () => {
    navigator.clipboard.writeText(joinLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full border-2 border-emerald-500 shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-850 to-emerald-700 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-900 rounded-lg">
              <QrCode className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-heading">
                म्हाडा टॉवर्स व्हॉट्सॲप कम्युनिटी
              </h3>
              <p className="text-xs text-emerald-100">
                दैनिक अपडेट्स थेट मोबाईलवर मिळवण्यासाठी सामील व्हा
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-100 hover:text-white hover:bg-emerald-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-1 text-xs text-emerald-800 bg-emerald-50 font-semibold px-3 py-1 rounded-full border border-emerald-200 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> केवळ म्हाडा ५ विंग्ज (G, H, I, J, K) साठी अधिकृत
          </div>

          {/* QR Code Container */}
          <div className="p-4 bg-white rounded-2xl border-2 border-emerald-200 shadow-inner mb-4 flex items-center justify-center">
            <QRCodeSVG
              value={joinLink}
              size={190}
              bgColor="#ffffff"
              fgColor="#064e3b"
              level="Q"
              includeMargin={false}
            />
          </div>

          <p className="text-xs text-gray-600 mb-4 max-w-xs">
            मोबाईल कॅमेऱ्याने वरील QR कोड स्कॅन करा किंवा खालील बटणावर क्लिक करून थेट ग्रुपमध्ये सामील व्हा.
          </p>

          {/* Direct Join Action */}
          <div className="w-full space-y-2">
            <a
              href={joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl shadow transition"
            >
              <Users className="w-4 h-4" />
              <span>व्हॉट्सॲप ग्रुपमध्ये सामील व्हा (Join Now)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2 px-3 rounded-xl border border-gray-300 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">लिंक कॉपी झाली (Copied)!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-500" />
                  <span>ग्रुप लिंक कॉपी करा</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-gray-500 mt-4">
            टीप: ग्रुपवर फक्त अधिकृत मंडळ व्यवस्थापक व कमिटीद्वारेच महत्वाच्या सूचना पाठवल्या जातात.
          </p>
        </div>

      </div>
    </div>
  );
};

export default WhatsAppJoinModal;
