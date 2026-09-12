import React from "react";
import { Phone, Shield, User, Building, HeartHandshake, Ambulance } from "lucide-react";

const EmergencyContacts = ({ contacts }) => {
  return (
    <div className="bg-white rounded-2xl border-2 border-gold-300 p-5 sm:p-7 shadow-lg">
      <div className="mb-5 pb-4 border-b border-gold-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-800 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            <Shield className="w-3.5 h-3.5 text-red-600" /> मदत व संपर्क कक्ष
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-maroon-900 mt-1 font-heading">
            कार्यकारिणी व आपत्कालीन संपर्क (Helplines)
          </h3>
          <p className="text-xs sm:text-sm text-maroon-700">
            ५ विंग्स समन्वयक, अध्यक्ष, सचिव व २४x७ सुरक्षा मदत कक्ष
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts && contacts.length > 0 ? (
          contacts.map((c, i) => {
            const isEmergency = c.type === "emergency" || c.type === "security";

            return (
              <div
                key={c._id || i}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isEmergency
                    ? "bg-rose-50/60 border-rose-200"
                    : "bg-white border-gold-200 hover:border-gold-400 shadow-xs"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-maroon-700 bg-gold-100 px-2 py-0.5 rounded">
                      {c.wing || "सर्व विंग्ज"}
                    </span>
                    {isEmergency && (
                      <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                        तातडीची मदत
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-maroon-950 font-heading truncate">
                    {c.nameMr}
                  </h4>
                  <p className="text-xs text-gray-600 truncate">
                    {c.roleMr}
                  </p>
                </div>

                <a
                  href={`tel:${c.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex-shrink-0 p-2.5 rounded-xl bg-maroon-850 hover:bg-maroon-700 text-gold-300 shadow transition flex items-center justify-center"
                  title={`${c.nameMr} यांना कॉल करा`}
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            );
          })
        ) : (
          <p className="text-xs text-gray-500 col-span-full">संपर्क माहिती लोड होत आहे...</p>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;
