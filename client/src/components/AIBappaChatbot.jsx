import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, Sparkles, Send, X, Bot, 
  Flame, Calendar, Mail, Phone, Building, Heart, ChevronDown 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const BAPPA_KNOWLEDGE = {
  aarti: {
    mr: "🪔 *दैनिक महाआरती वेळा:*\n• सकाळची महाआरती: **सकाळी ०८:३० वाजता**\n• संध्याकाळची महाआरती: **रात्री ०८:०० वाजता**\n\nआजची आरती मुख्य उत्सव मंडपात संपन्न होईल. सर्व ४ इमारतींच्या (G, H, J, K) भाविकांनी वेळेवर उपस्थित राहावे!",
    en: "🪔 *Daily Maha Aarti Timings:*\n• Morning Aarti: **08:30 AM**\n• Evening Aarti: **08:00 PM**\n\nDaily Aarti takes place at the Central Festive Pandal. Residents from all 4 buildings (G, H, J, K) are cordially invited!"
  },
  wings: {
    mr: "🏢 *सहभागी ४ इमारतींची नावे:*\n• **G विंग:** नंदादेवी (Nandadevi)\n• **H विंग:** निलगिरी (Nilgiri)\n• **J विंग:** पूर्वांचल (Purvanchal)\n• **K विंग:** गोवर्धन (Govardhan)\n\n'४ विंग्स, एकच परिवार' या भावनेने सर्व इमारती उत्सव साजरा करतात!",
    en: "🏢 *Participating 4 Buildings:*\n• **G Wing:** Nandadevi\n• **H Wing:** Nilgiri\n• **J Wing:** Purvanchal\n• **K Wing:** Govardhan\n\nCelebrated with unity under the motto: '4 Wings, One Family'!"
  },
  email: {
    mr: "📧 *सोसायटी अधिकृत ईमेल:*\n**mhadatowersutsav@gmail.com**\n\nनोंदणी क्र: १२४३/२०२५ - पुणे. आपण कोणत्याही सूचना किंवा चौकशीसाठी या ईमेलवर थेट संपर्क करू शकता.",
    en: "📧 *Official Society Email:*\n**mhadatowersutsav@gmail.com**\n\nRegd No: 1243/2025 - Pune. Feel free to write to us for any queries or feedback."
  },
  schedule: {
    mr: "📅 *१० दिवसांचे वेळापत्रक (७ ते १६ सप्टेंबर):*\n• दिवस १ (७ सप्टें): श्री गणेश आगमन व प्राणप्रतिष्ठा (G विंग)\n• दिवस २ (८ सप्टें): ऋषी पंचमी व चित्रकला स्पर्धा (H विंग)\n• दिवस ३ (९ सप्टें): गौरी आवाहन (J विंग)\n• दिवस ४ (१० सप्टें): गौरी पूजन व हळदी-कुंकू (K विंग)\n• दिवस ५ (११ सप्टें): विशेष आरती (G विंग)\n• दिवस ६ (१२ सप्टें): एकता भजन संध्या (H विंग)\n• दिवस ७ (१३ सप्टें): सत्यविनायक पूजा (J विंग)\n• दिवस ८ (१४ सप्टें): महिला मंडळ आरती (K विंग)\n• दिवस ९ (१५ सप्टें): दीपोत्सव व सत्कार (G & H विंग)\n• दिवस १० (१६ सप्टें): सांगता महाआरती (सर्व ४ विंग्ज संयुक्त)",
    en: "📅 *10-Day Festival Schedule (7 to 16 September):*\n• Day 1 (7 Sep): Bappa Arrival & Sthapana (G Wing)\n• Day 2 (8 Sep): Rishi Panchami & Drawing Contest (H Wing)\n• Day 3 (9 Sep): Gauri Aavahan (J Wing)\n• Day 4 (10 Sep): Gauri Pujan & Haldi-Kunku (K Wing)\n• Day 5 (11 Sep): Special Aarti Day (G Wing)\n• Day 6 (12 Sep): Bhajan Sandhya (H Wing)\n• Day 7 (13 Sep): Satyavinayak Pooja (J Wing)\n• Day 8 (14 Sep): Mahila Mandal Aarti (K Wing)\n• Day 9 (15 Sep): Deepotsav & Felicitations (G & H)\n• Day 10 (16 Sep): Concluding Maha Aarti (All 4 Wings)"
  },
  contacts: {
    mr: "📞 *महत्वाचे संपर्क:*\n• अध्यक्ष: श्री. सतीश कांबळे (+91 98220 11223) - G विंग\n• उपाध्यक्ष: श्री. विजय पवार (+91 94220 77882) - H विंग\n• सचिव: श्री. राहुल गायकवाड (+91 98220 44556) - H विंग\n• सहसचिव: श्री. निलेश मोरे (+91 94220 77884) - J विंग\n• मुख्य संघटक: श्री. गणेश जाधव (+91 94220 77885) - K विंग\n• २४x७ सुरक्षा मदत: +91 98220 99999",
    en: "📞 *Important Contacts:*\n• President: Mr. Satish Kamble (+91 98220 11223) - G Wing\n• Vice President: Mr. Vijay Pawar (+91 94220 77882) - H Wing\n• Secretary: Mr. Rahul Gaikwad (+91 98220 44556) - H Wing\n• Joint Secretary: Mr. Nilesh More (+91 94220 77884) - J Wing\n• Chief Organizer: Mr. Ganesh Jadhav (+91 94220 77885) - K Wing\n• 24x7 Security Helpdesk: +91 98220 99999"
  },
  blessing: {
    mr: "॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥ 🌸\n\nगणपती बाप्पा आपल्या आणि आपल्या कुटुंबावर सुख, समृद्धी, उत्तम आरोग्य व अखंड आनंदाचा वर्षाव करोत! गणपती बाप्पा मोरया, मंगलमूर्ती मोरया!",
    en: "॥ Vakratunda Mahakaya Suryakoti Samaprabha ।\nNirvighnam Kuru Me Deva Sarvakaryeshu Sarvada ॥ 🌸\n\nMay Lord Ganesha bless you and your family with boundless joy, prosperity, peace and good health! Ganpati Bappa Morya!"
  }
};

const AIBappaChatbot = () => {
  const { language, t } = useLanguage();
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

  // AI response resolver
  const getBappaResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes("आरती") || q.includes("aarti") || q.includes("time") || q.includes("वेळ") || q.includes("morning") || q.includes("evening")) {
      return BAPPA_KNOWLEDGE.aarti[language];
    }
    if (q.includes("विंग") || q.includes("wing") || q.includes("इमारत") || q.includes("building") || q.includes("यजमान") || q.includes("host") || q.includes("nandadevi") || q.includes("govardhan")) {
      return BAPPA_KNOWLEDGE.wings[language];
    }
    if (q.includes("ईमेल") || q.includes("email") || q.includes("mail") || q.includes("पत्र") || q.includes("सोसायटी")) {
      return BAPPA_KNOWLEDGE.email[language];
    }
    if (q.includes("वेळापत्रक") || q.includes("schedule") || q.includes("तारीख") || q.includes("date") || q.includes("१० दिवस") || q.includes("10 day") || q.includes("चतुर्थी") || q.includes("अनंत")) {
      return BAPPA_KNOWLEDGE.schedule[language];
    }
    if (q.includes("फोन") || q.includes("phone") || q.includes("संपर्क") || q.includes("contact") || q.includes("अध्यक्ष") || q.includes("सचिव") || q.includes("मदत") || q.includes("help") || q.includes("security")) {
      return BAPPA_KNOWLEDGE.contacts[language];
    }
    if (q.includes("आशीर्वाद") || q.includes("blessing") || q.includes("श्लोक") || q.includes("shloka") || q.includes("मंत्र") || q.includes("मंत्रपुष्पांजली") || q.includes("moraya") || q.includes("मोरया")) {
      return BAPPA_KNOWLEDGE.blessing[language];
    }

    return language === "mr"
      ? "गणपती बाप्पा मोरया! 🙏 मी म्हाडा टॉवर्स गणेशोत्सव संबंधी माहिती देण्यास सदैव तयार आहे. आपण आरती वेळा, विंग यजमान, १० दिवसांचे वेळापत्रक, किंवा सोसायटी ईमेल विचारू शकता."
      : "Ganpati Bappa Morya! 🙏 I am here to help you with MHADA Towers Ganesh Festival updates. You can ask about Aarti timings, host wings, 10-day schedule, or society email.";
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage.trim();
    if (!text) return;

    const userMsg = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const bappaReply = {
        sender: "bappa",
        text: getBappaResponse(text),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, bappaReply]);
      setIsTyping(false);
    }, 600);
  };

  const quickChips = [
    { label: language === "mr" ? "🪔 आजची आरती वेळ?" : "🪔 Today's Aarti?", query: "आरती वेळ सांगा" },
    { label: language === "mr" ? "🏢 इमारतींची नावे?" : "🏢 Building Names?", query: "इमारतींची नावे आणि विंग यजमान" },
    { label: language === "mr" ? "📅 १० दिवसांचे वेळापत्रक" : "📅 10-Day Schedule", query: "१० दिवसांचे वेळापत्रक दाखवा" },
    { label: language === "mr" ? "📧 सोसायटी ईमेल?" : "📧 Society Email?", query: "सोसायटी अधिकृत ईमेल" },
    { label: language === "mr" ? "📞 आपत्कालीन संपर्क" : "📞 Contacts & Help", query: "समिती व मदत संपर्क" },
    { label: language === "mr" ? "🌸 बाप्पांचे आशीर्वाद" : "🌸 Bappa's Blessings", query: "बाप्पांचे आशीर्वाद व श्लोक" },
  ];

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-maroon-900 via-maroon-850 to-maroon-900 hover:from-maroon-800 hover:to-maroon-800 text-gold-200 rounded-full shadow-2xl border-2 border-gold-400 group transition-all duration-300 transform hover:scale-105 active:scale-95"
            title="AI बाप्पा सहाय्यक उघडा"
          >
            {/* Pulsing Aura */}
            <span className="absolute -inset-1 rounded-full bg-gold-400/40 blur-sm group-hover:bg-gold-400/60 animate-pulse"></span>

            <div className="relative w-8 h-8 rounded-full bg-gold-400 text-maroon-950 flex items-center justify-center font-black shadow">
              <span className="text-base">ॐ</span>
            </div>

            <div className="relative text-left hidden sm:block">
              <div className="text-xs font-black text-gold-300 leading-tight">
                {t("bappaAssistant")}
              </div>
              <div className="text-[10px] text-gold-100/80 font-medium">
                {language === "mr" ? "काहीही विचारा • AI Bot" : "Ask anything • AI Bot"}
              </div>
            </div>

            <Sparkles className="w-4 h-4 text-gold-300 animate-spin" />
          </button>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-3 sm:right-6 z-50 w-[94vw] sm:w-[400px] h-[540px] max-h-[85vh] bg-white rounded-3xl border-2 border-gold-400 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white p-3.5 sm:p-4 border-b-2 border-gold-400 flex items-center justify-between shadow-md flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-500 via-amber-300 to-gold-400 text-maroon-950 flex items-center justify-center font-black text-lg border border-gold-200 shadow-inner">
                ॐ
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-gold-300 font-heading leading-tight flex items-center gap-1.5">
                  <span>{t("bappaAssistant")}</span>
                  <span className="text-[9px] bg-gold-400 text-maroon-950 font-bold px-1.5 py-0.2 rounded-full uppercase">
                    AI 2.0
                  </span>
                </h3>
                <p className="text-[11px] text-gold-100/80 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>{t("bappaOnline")}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-gold-300 hover:text-white hover:bg-maroon-800 transition"
              title="चॅट बंद करा"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="bg-[#FAF5EB] px-3 py-2 border-b border-gold-300/60 overflow-x-auto no-scrollbar flex items-center gap-1.5 flex-shrink-0">
            {quickChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(chip.query)}
                className="flex-shrink-0 text-[11px] font-bold text-maroon-900 bg-white hover:bg-gold-100 px-2.5 py-1 rounded-full border border-gold-300 shadow-2xs transition active:scale-95"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FFFDF9]">
            {messages.map((m, idx) => {
              const isBappa = m.sender === "bappa";
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-2 ${isBappa ? "justify-start" : "justify-end"}`}
                >
                  {isBappa && (
                    <div className="w-7 h-7 rounded-full bg-gold-400 text-maroon-950 font-black text-xs flex items-center justify-center flex-shrink-0 border border-gold-500 shadow-xs">
                      ॐ
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed shadow-xs whitespace-pre-line ${
                      isBappa
                        ? "bg-white text-maroon-950 border border-gold-300 rounded-tl-xs"
                        : "bg-maroon-850 text-gold-100 rounded-tr-xs"
                    }`}
                  >
                    {m.text}
                    <span className="block text-[9px] opacity-60 text-right mt-1">
                      {m.time}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-maroon-800 font-semibold bg-gold-50 p-2 rounded-xl border border-gold-200 w-fit">
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-bounce [animation-delay:0.4s]"></span>
                <span>बाप्पा विचार करत आहेत...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 sm:p-3 bg-white border-t border-gold-300 flex items-center gap-2 flex-shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={t("askBappa")}
              className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none text-maroon-950"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-maroon-850 hover:bg-maroon-800 disabled:opacity-50 text-gold-200 transition shadow-md flex items-center justify-center flex-shrink-0"
              title="प्रश्न विचारा"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

export default AIBappaChatbot;
