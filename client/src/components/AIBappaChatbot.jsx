import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, Sparkles, Send, X, Bot, 
  Flame, Calendar, Mail, Phone, Building, Heart 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useConfig } from "../context/ConfigContext";

const AIBappaChatbot = () => {
  const { language, t } = useLanguage();
  const { config } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bappa",
      text: language === "mr" 
        ? "गणपती बाप्पा मोरया! 🙏 मी म्हाडा टॉवर्स गणेशोत्सवाचा AI सहाय्यक आहे. मी आपल्याला आरती वेळा, १० दिवसांचे वेळापत्रक, विंग यजमान, सोसायटी ईमेल किंवा बाप्पांचे आशीर्वाद याबद्दल माहिती देऊ शकतो. विचारून पहा!"
        : "Ganpati Bappa Morya! 🙏 I am your MHADA Towers Ganesh Utsav AI Assistant. Ask me about Aarti timings, 10-day schedule, host wings, society email, or divine blessings!",
      time: "आत्ता"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Lock body scroll on mobile while chat is open
  useEffect(() => {
    if (isOpen && typeof window !== "undefined" && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Dynamically resolve AI responses based on live config
  const getBappaResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Aarti timings
    if (q.includes("आरती") || q.includes("aarti") || q.includes("time") || q.includes("वेळ") || q.includes("morning") || q.includes("evening")) {
      const todayAarti = config?.dailyAartiSchedule?.[0];
      const morning = todayAarti?.morningTime || "सकाळी ०८:३० वाजता";
      const evening = todayAarti?.eveningTime || "रात्री ०८:०० वाजता";
      const host = todayAarti?.hostWing ? `\nयजमान विंग: **${todayAarti.hostWing}**` : "";
      
      return language === "mr"
        ? `🪔 *दैनिक महाआरती वेळा:*\n• सकाळची महाआरती: **${morning}**\n• संध्याकाळची महाआरती: **${evening}**${host}\n\nआजची आरती मुख्य उत्सव मंडपात संपन्न होईल. सर्व भाविकांनी वेळेवर उपस्थित राहावे!`
        : `🪔 *Daily Maha Aarti Timings:*\n• Morning Aarti: **${todayAarti?.morningTimeEn || morning}**\n• Evening Aarti: **${todayAarti?.eveningTimeEn || evening}**\n\nDaily Aarti takes place at the Central Festive Pandal. All society residents are cordially invited!`;
    }

    // 2. Wings
    if (q.includes("विंग") || q.includes("wing") || q.includes("इमारत") || q.includes("building") || q.includes("यजमान") || q.includes("host")) {
      const wings = config?.wings || [];
      if (wings.length > 0) {
        const wingListMr = wings.map(w => `• **${w.code} विंग:** ${w.nameMr || w.sacredNameMr || w.code} (प्रमुख: ${w.coordinatorLead || "समिती"})`).join("\n");
        const wingListEn = wings.map(w => `• **${w.code} Wing:** ${w.nameEn || w.sacredNameEn || w.code} (Lead: ${w.coordinatorLead || "Committee"})`).join("\n");
        return language === "mr"
          ? `🏢 *सहभागी इमारतींची माहिती:*\n${wingListMr}\n\n'४ विंग्स, एकच परिवार' या भावनेने सर्व इमारती उत्सव साजरा करतात!`
          : `🏢 *Participating Buildings:*\n${wingListEn}\n\nCelebrated with unity under the motto: '4 Wings, One Family'!`;
      }
      return language === "mr"
        ? `🏢 म्हाडा टॉवर्स मधील सर्व ४ विंग्ज (G, H, J, K) संयुक्तपणे गणेशोत्सव साजरा करतात.`
        : `🏢 All buildings of MHADA Towers jointly celebrate the festival.`;
    }

    // 3. Email & Society office
    if (q.includes("ईमेल") || q.includes("email") || q.includes("mail") || q.includes("पत्र") || q.includes("सोसायटी")) {
      const email = config?.mandalInfo?.email || config?.email || "mhadatowersutsavmandal@gmail.com";
      const reg = config?.regNo ? `\nनोंदणी क्र: ${config.regNo}` : "";
      return language === "mr"
        ? `📧 *सोसायटी अधिकृत ईमेल:*\n**${email}**${reg}\n\nआपण कोणत्याही सूचना किंवा चौकशीसाठी या ईमेलवर थेट संपर्क करू शकता.`
        : `📧 *Official Society Email:*\n**${email}**\n\nFeel free to write to us for any queries or feedback.`;
    }

    // 4. Schedule
    if (q.includes("वेळापत्रक") || q.includes("schedule") || q.includes("तारीख") || q.includes("date") || q.includes("१० दिवस") || q.includes("10 day")) {
      const schedule = config?.dailyAartiSchedule || [];
      if (schedule.length > 0) {
        const itemsMr = schedule.slice(0, 5).map(s => `• दिवस ${s.dayNumber || s.day}: ${s.dateStr || s.date} - ${s.hostWing || ""}`).join("\n");
        return language === "mr"
          ? `📅 *उत्सव वेळापत्रक (पहिले ५ दिवस):*\n${itemsMr}\n\nसंपूर्ण १० दिवसांचे वेळापत्रक पाहण्यासाठी 'वेळापत्रक' सेक्शन तपासा!`
          : `📅 *Festival Schedule Preview:*\n${itemsMr}\n\nPlease check the Schedule section for the complete 10-day timetable!`;
      }
    }

    // 5. Contacts / Helplines
    if (q.includes("फोन") || q.includes("phone") || q.includes("संपर्क") || q.includes("contact") || q.includes("अध्यक्ष") || q.includes("सचिव") || q.includes("मदत") || q.includes("help") || q.includes("security")) {
      const helpline = config?.emergencyHelpline || config?.mandalInfo?.helpline || "+91 98220 11223";
      const committee = config?.mandalInfo?.committeeMembers || [];
      const memLines = committee.slice(0, 3).map(m => `• ${m.roleMr}: ${m.nameMr} (${m.phone || helpline})`).join("\n");
      return language === "mr"
        ? `📞 *महत्वाचे संपर्क:*\n${memLines || `• २४x७ आपत्कालीन मदत कक्ष: ${helpline}`}\n• मुख्य सुरक्षा कक्ष: ${helpline}`
        : `📞 *Important Contacts:*\n${memLines || `• 24x7 Helpline: ${helpline}`}\n• Society Desk: ${helpline}`;
    }

    // 6. Blessings
    if (q.includes("आशीर्वाद") || q.includes("blessing") || q.includes("श्लोक") || q.includes("shloka") || q.includes("मंत्र") || q.includes("moraya") || q.includes("मोरया")) {
      return language === "mr"
        ? "॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥ 🌸\n\nगणपती बाप्पा आपल्या आणि आपल्या कुटुंबावर सुख, समृद्धी, उत्तम आरोग्य व अखंड आनंदाचा वर्षाव करोत! गणपती बाप्पा मोरया, मंगलमूर्ती मोरया!"
        : "॥ Vakratunda Mahakaya Suryakoti Samaprabha ।\nNirvighnam Kuru Me Deva Sarvakaryeshu Sarvada ॥ 🌸\n\nMay Lord Ganesha bless you and your family with boundless joy, prosperity, peace and good health! Ganpati Bappa Morya!";
    }

    return language === "mr"
      ? `गणपती बाप्पा मोरया! 🙏 मी ${config?.mandalNameMr || "म्हाडा टॉवर्स उत्सव मंडळ"} माहिती केंद्र सहाय्यक आहे. आपण आरती वेळा, विंग यजमान, १० दिवसांचे वेळापत्रक, किंवा सोसायटी ईमेल विचारू शकता.`
      : `Ganpati Bappa Morya! 🙏 I am here to help you with festival updates. You can ask about Aarti timings, host wings, 10-day schedule, or society email.`;
  };

  const handleSendMessage = (textToSend = null) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg = {
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBappaResponse(query);
      const bappaMsg = {
        sender: "bappa",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, bappaMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Trigger Diya Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-amber-600 via-orange-600 to-red-700 text-white shadow-2xl hover:shadow-orange-500/50 border-2 border-gold-300 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
          title="AI बाप्पा सहाय्यकाशी बोला"
        >
          <div className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-gold-300 text-[9px] font-black text-maroon-950 items-center justify-center">
              ॐ
            </span>
          </div>

          <Bot className="w-6 h-6 text-gold-200 group-hover:rotate-12 transition-transform" />
          <span className="hidden md:inline-block ml-2 text-xs font-bold text-gold-100 pr-1">
            {language === "mr" ? "AI बाप्पा सहाय्यक" : "AI Bappa Help"}
          </span>
        </button>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed inset-x-2 bottom-2 sm:inset-auto sm:bottom-20 sm:right-6 z-50 w-auto sm:w-96 max-w-lg bg-white rounded-3xl border-2 border-gold-400 shadow-2xl overflow-hidden flex flex-col h-[520px] max-h-[85vh] animate-fadeIn">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white p-3.5 sm:p-4 border-b-2 border-gold-400 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-maroon-800 border border-gold-400 flex items-center justify-center text-gold-300 shadow-inner">
                <Flame className="w-5 h-5 text-orange-400 animate-diya" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gold-100 font-heading">
                  {language === "mr" ? "AI बाप्पा सहाय्यक" : "AI Bappa Assistant"}
                </h3>
                <p className="text-[11px] text-gold-300/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{language === "mr" ? "सक्रिय • २४x७ माहिती केंद्र" : "Online • 24x7 Helpdesk"}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-gold-300 hover:text-white hover:bg-maroon-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Questions Scroller */}
          <div className="bg-gold-50/80 p-2 border-b border-gold-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { label: "🪔 आरती वेळा", text: "महाआरती वेळा काय आहेत?" },
              { label: "🏢 विंग यजमान", text: "इमारतींची नावे व यजमान विंग सांगा" },
              { label: "📅 वेळापत्रक", text: "१० दिवसांचे वेळापत्रक सांगा" },
              { label: "📧 ईमेल पत्ता", text: "सोसायटीचा अधिकृत ईमेल सांगा" },
              { label: "🌸 आशीर्वाद", text: "बाप्पांचे आशीर्वाद" }
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q.text)}
                className="flex-shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-gold-300 text-maroon-950 hover:bg-gold-200 transition shadow-2xs whitespace-nowrap"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FFFDF9]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-maroon-850 text-gold-100 rounded-br-none border border-gold-500/40 shadow-sm"
                      : "bg-white text-gray-800 rounded-bl-none border border-gold-300/80 shadow-xs"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
                <span className="text-[9px] text-gray-400 mt-0.5 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 text-xs text-maroon-800 bg-gold-100/60 rounded-xl w-fit">
                <span className="w-2 h-2 rounded-full bg-maroon-700 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-maroon-700 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-maroon-700 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-2.5 bg-white border-t border-gold-300 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === "mr" ? "आरती, विंग्ज किंवा वेळापत्रक विचारा..." : "Ask about aarti, wings or schedule..."}
              className="flex-1 text-xs p-2.5 rounded-xl border border-gold-300 focus:border-maroon-800 outline-none bg-[#FFFDF9]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-maroon-850 hover:bg-maroon-700 disabled:opacity-50 text-gold-300 shadow transition flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default AIBappaChatbot;
