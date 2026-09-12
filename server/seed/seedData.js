import TabConfig from "../models/TabConfig.js";
import Announcement from "../models/Announcement.js";
import FestivalEvent from "../models/FestivalEvent.js";
import Contact from "../models/Contact.js";
import User from "../models/User.js";

export const seedInitialData = async () => {
  try {
    // 1. Seed Admin User
    const existingAdmin = await User.findOne({ email: "mhadatowersutsav@gmail.com" });
    if (!existingAdmin) {
      const admin = new User({
        email: "mhadatowersutsav@gmail.com",
        password: "MhadaGanpati@2025",
        name: "म्हाडा उत्सव समिती अध्यक्ष (Admin)",
        role: "admin"
      });
      await admin.save();
      console.log("[Seed] Admin user seeded: mhadatowersutsav@gmail.com / MhadaGanpati@2025");
    }

    // 2. Seed TabConfig
    let existingConfig = await TabConfig.findOne();
    if (!existingConfig) {
      const config = new TabConfig({
        mandalNameMr: "म्हाडा टॉवर्स उत्सव मंडळ",
        mandalNameEn: "MHADA Towers Utsav Mandal",
        addressMr: "पिंपरी वाघेरे, पिंपरी चिंचवड, पुणे - ४११०१७",
        regNo: "१२४३/२०२५ - पुणे",
        festivalYear: "२०२६",
        festivalStatus: "उत्सव सुरू आहे (Festival Live)",
        marqueeText: "गणपती बाप्पा मोरया! दैनिक महाआरती सकाळी ८:३० व रात्री ८:०० वाजता | आजची महाआरती इमारत G विंग यजमान | सर्व भाविकांनी आरतीला उपस्थित राहावे.",
        marqueeActive: true,
        participatingWings: ["G", "H", "I", "J", "K"],
        whatsAppCommunityLink: "https://chat.whatsapp.com/sample-mhada-towers-ganpati",
        emergencyHelpline: "+91 98220 11223"
      });
      await config.save();
      console.log("[Seed] TabConfig initialized with sidebar and daily aarti schedule.");
    } else if (!existingConfig.sidebarMenu || existingConfig.sidebarMenu.length === 0) {
      existingConfig.set("sidebarMenu", undefined);
      existingConfig.set("sidebarSettings", undefined);
      existingConfig.set("dailyAartiSchedule", undefined);
      existingConfig.set("mandalInfo", undefined);
      await existingConfig.save();
      console.log("[Seed] TabConfig refreshed with default sidebar and aarti schedule.");
    }

    // 3. Seed Events if empty
    const eventCount = await FestivalEvent.countDocuments();
    if (eventCount === 0) {
      const events = [
        {
          category: "arrival",
          titleMr: "श्री गणरायाचे वाजतगाजत आगमन व प्राणप्रतिष्ठा",
          titleEn: "Grand Ganpati Bappa Arrival & Murti Sthapana",
          time: "सकाळी ९:३० वाजता",
          dateStr: "दिवस १ (गणेश चतुर्थी)",
          dayNumber: 1,
          venue: "म्हाडा टॉवर्स मुख्य प्रवेशद्वार ते मध्यवर्ती मंडप",
          hostWing: "सर्व ५ विंग्ज (G, H, I, J, K)",
          descriptionMr: "ढोल-ताशांच्या गजरात व लेझीम पथकासह बाप्पांचे आगमन. मुख्य प्रवेशद्वारावर सुवासिनींकडून औक्षण व त्यानंतर विधिवत प्राणप्रतिष्ठा पूजा.",
          descriptionEn: "Arrival procession with traditional Dhol-Tasha and Pranpratishtha pooja at the central festive pandal.",
          isHighlight: true,
          status: "completed",
          order: 1
        },
        {
          category: "aarti",
          titleMr: "दैनिक सकाळची मंगल आरती व प्रार्थना",
          titleEn: "Daily Morning Aarti & Morning Prayers",
          time: "सकाळी ०८:३० वाजता",
          dateStr: "दररोज (Daily Schedule)",
          dayNumber: 1,
          venue: "मध्यवर्ती उत्सव मंडप, म्हाडा टॉवर्स",
          hostWing: "G & H Wing यजमान",
          descriptionMr: "सर्व ५ विंग्समधील रहिवाशांनी सपरिवार आरतीसाठी उपस्थित राहावे. आरतीनंतर मोदक व पेढ्यांचा नैवेद्य वाटप होईल.",
          descriptionEn: "Daily morning aarti followed by prasad distribution for all building residents.",
          isHighlight: true,
          status: "upcoming",
          order: 2
        },
        {
          category: "aarti",
          titleMr: "दैनिक संध्याकाळची महाआरती व धूप आरती",
          titleEn: "Grand Evening Maha Aarti & Bhajan",
          time: "रात्री ०८:०० वाजता",
          dateStr: "दररोज (Daily Schedule)",
          dayNumber: 1,
          venue: "मध्यवर्ती उत्सव मंडप",
          hostWing: "I, J & K Wing यजमान",
          descriptionMr: "संध्याकाळची भव्य महाआरती, मंत्रपुष्पांजली व महिला मंडळाचे भक्तिगीते व भजन गायन. सर्वांना उपस्थित राहण्याचे आवाहन.",
          descriptionEn: "Grand evening aarti with holy chants, devotional songs, and deepotsav.",
          isHighlight: true,
          status: "upcoming",
          order: 3
        },
        {
          category: "cultural",
          titleMr: "बाल गोपाळांची चित्रकला व निबंध स्पर्धा",
          titleEn: "Kids Drawing & Essay Writing Competition",
          time: "दुपारी ०४:०० ते ०६:००",
          dateStr: "दिवस ३ (रविवार)",
          dayNumber: 3,
          venue: "म्हाडा क्लब हाऊस / कम्युनिटी हॉल",
          hostWing: "सर्व मुले (वयोगट ५ ते १५ वर्षे)",
          descriptionMr: "विषय: 'माझा पर्यावरणपूरक बाप्पा' व 'स्वच्छ म्हाडा टॉवर्स परिसर'. रेखाटन साहित्य मंडळातर्फे पुरविले जाईल. आकर्षक बक्षिसे!",
          descriptionEn: "Theme: Eco-friendly Ganpati and Clean MHADA Society. Exciting gifts for all participants.",
          isHighlight: false,
          status: "upcoming",
          order: 4
        },
        {
          category: "cultural",
          titleMr: "भव्य सांस्कृतिक संध्या (नृत्य, नाटक व गायन)",
          titleEn: "Grand Cultural Night (Dance, Drama & Musical Evening)",
          time: "संध्याकाळी ०६:३० वाजता",
          dateStr: "दिवस ४",
          dayNumber: 4,
          venue: "ओपन एअर स्टेज, मुख्य प्रांगण",
          hostWing: "सर्व ५ विंग्ज परिवार",
          descriptionMr: "म्हाडा टॉवर्समधील लहान मुले, तरुण व ज्येष्ठांचे विविध गुणदर्शन कार्यक्रम. पारंपरिक लावणी, समूह नृत्य व समाजप्रबोधनात्मक लघुनाट्य.",
          descriptionEn: "Exciting stage performances by society talent across G, H, I, J, K wings.",
          isHighlight: true,
          status: "upcoming",
          order: 5
        },
        {
          category: "prasad",
          titleMr: "भव्य महाप्रसाद वाटप व सामूहिक भोजन",
          titleEn: "Grand Maha Prasad Feast (All Residents & Guests)",
          time: "दुपारी १२:३० ते दुपारी ३:३०",
          dateStr: "दिवस ५ (महाप्रसाद विशेष दिन)",
          dayNumber: 5,
          venue: "विशेष भोजन मंडप, विंग J व K समोरील परिसर",
          hostWing: "सर्व इमारती (G, H, I, J, K)",
          descriptionMr: "शुद्ध सात्विक पुरी-भाजी, गरमागरम मसालेभात, शिरा-प्रसाद व बुंदी. गर्दी टाळण्यासाठी कृपया विंगनुसार दिलेल्या वेळेत उपस्थित राहावे.",
          descriptionEn: "Delicious traditional satvik feast for all owners, tenants, and families. Wing-wise slots to ensure zero wait time.",
          isHighlight: true,
          status: "upcoming",
          order: 6
        },
        {
          category: "visarjan",
          titleMr: "भावपूर्ण विसर्जन मिरवणूक व पर्यावरणपूरक निरोप",
          titleEn: "Emotional Visarjan Procession & Eco-Immersion",
          time: "दुपारी ०३:३० पासून मिरवणूक सुरू",
          dateStr: "अनंत चतुर्दशी (दिवस १० / अंतिम दिवस)",
          dayNumber: 10,
          venue: "परिसरात उभारण्यात आलेला कृत्रिम विसर्जन हौद",
          hostWing: "समस्त म्हाडा टॉवर्स नागरिक",
          descriptionMr: "गुलाल व फुलांच्या वर्षावात टाळ-मृदुंगाच्या नादात लाडक्या बाप्पाला भावपूर्ण निरोप. पर्यावरण संवर्धनासाठी मंडळातर्फे १००% कृत्रिम हौदातच विसर्जन करण्यात येईल.",
          descriptionEn: "Grand farewell procession followed by 100% eco-friendly immersion in society's designated artificial water tank.",
          isHighlight: true,
          status: "upcoming",
          order: 7
        }
      ];
      await FestivalEvent.insertMany(events);
      console.log("[Seed] Festival events initialized.");
    }

    // 4. Seed Announcements if empty
    const announcementCount = await Announcement.countDocuments();
    if (announcementCount === 0) {
      const announcements = [
        {
          titleMr: "दैनिक महाआरती वेळेबाबत सर्व रहिवाशांना नम्र विनंती",
          titleEn: "Gentle reminder regarding Daily Aarti Timings",
          descriptionMr: "सकाळची आरती ठीक ८:३० वा. व संध्याकाळची महाआरती ठीक ८:०० वा. सुरू होईल. सर्वांनी १० मिनिटे आधी मंडपात हजर राहावे.",
          descriptionEn: "Morning Aarti starts promptly at 8:30 AM and Evening Aarti at 8:00 PM. Kindly arrive 10 minutes earlier.",
          category: "aarti",
          priority: "high",
          isPinned: true,
          badgeText: "आरती वेळ (Aarti Alert)"
        },
        {
          titleMr: "५ व्या दिवसाच्या महाप्रसाद कूपन व टोकन वाटप",
          titleEn: "Day 5 Mahaprasad Token Distribution",
          descriptionMr: "महाप्रसादाचे नियोजन सुरळीत होण्यासाठी प्रत्येक विंगच्या (G, H, I, J, K) प्रतिनिधींकडून मोफत टोकन घेतले जातील. कृपया सहकार्य करा.",
          descriptionEn: "Free dining tokens will be distributed by building wing heads to prevent congestion.",
          category: "prasad",
          priority: "medium",
          isPinned: true,
          badgeText: "महाप्रसाद (Prasad Notice)"
        },
        {
          titleMr: "मंडप परिसरातील शांतता व पार्किंग नियमावली",
          titleEn: "Society Parking & Noise Rules around Pandal",
          descriptionMr: "मुख्य मंडपाच्या समोरील रस्ता पादचाऱ्यांसाठी राखीव आहे. कृपया दोनचाकी व चारचाकी वाहने आपापल्या पार्किंग स्लॉटमध्येच लावावीत.",
          descriptionEn: "Please park all vehicles in designated resident slots. Emergency access path must remain clear at all times.",
          category: "general",
          priority: "normal",
          isPinned: false,
          badgeText: "पार्किंग सूचना (Rules)"
        },
        {
          titleMr: "फ्लॅट धारकांसाठी: उत्सव जमा-खर्च व देणगी तपशील",
          titleEn: "Owners Corner: Utsav Accounts & Mandal Meeting Updates",
          descriptionMr: "उत्सवासाठी जमा झालेली ऐच्छिक वर्गणी व मंडप खर्चाचा प्राथमिक हिशेब व्यवस्थापकीय सूचना फलकावर दररोज संध्याकाळी अद्ययावत केला जात आहे.",
          descriptionEn: "Voluntary collections and daily festival expense balance sheet is transparently reviewed by the committee.",
          category: "owners",
          priority: "normal",
          isPinned: false,
          badgeText: "सभासद कट्टा (Owners Info)"
        }
      ];
      await Announcement.insertMany(announcements);
      console.log("[Seed] Announcements initialized.");
    }

    // 5. Seed Contacts if empty
    const contactCount = await Contact.countDocuments();
    if (contactCount === 0) {
      const contacts = [
        {
          nameMr: "श्री. सतीश कांबळे",
          nameEn: "Satish Kamble",
          roleMr: "अध्यक्ष - म्हाडा उत्सव मंडळ",
          roleEn: "Mandal President",
          wing: "G Wing",
          phone: "+91 98220 11223",
          type: "committee",
          order: 1
        },
        {
          nameMr: "श्री. राहुल गायकवाड",
          nameEn: "Rahul Gaikwad",
          roleMr: "सचिव - म्हाडा उत्सव मंडळ",
          roleEn: "Mandal Secretary",
          wing: "H Wing",
          phone: "+91 98220 44556",
          type: "committee",
          order: 2
        },
        {
          nameMr: "श्री. सचिन पाटील",
          nameEn: "Sachin Patil",
          roleMr: "इमारत प्रतिनिधी (Wing Lead)",
          roleEn: "Wing G Coordinator",
          wing: "G Wing",
          phone: "+91 94220 77881",
          type: "wing_lead",
          order: 3
        },
        {
          nameMr: "श्री. विजय पवार",
          nameEn: "Vijay Pawar",
          roleMr: "इमारत प्रतिनिधी (Wing Lead)",
          roleEn: "Wing H Coordinator",
          wing: "H Wing",
          phone: "+91 94220 77882",
          type: "wing_lead",
          order: 4
        },
        {
          nameMr: "श्री. अमित जोशी",
          nameEn: "Amit Joshi",
          roleMr: "इमारत प्रतिनिधी (Wing Lead)",
          roleEn: "Wing I Coordinator",
          wing: "I Wing",
          phone: "+91 94220 77883",
          type: "wing_lead",
          order: 5
        },
        {
          nameMr: "श्री. निलेश मोरे",
          nameEn: "Nilesh More",
          roleMr: "इमारत प्रतिनिधी (Wing Lead)",
          roleEn: "Wing J Coordinator",
          wing: "J Wing",
          phone: "+91 94220 77884",
          type: "wing_lead",
          order: 6
        },
        {
          nameMr: "श्री. गणेश जाधव",
          nameEn: "Ganesh Jadhav",
          roleMr: "इमारत प्रतिनिधी (Wing Lead)",
          roleEn: "Wing K Coordinator",
          wing: "K Wing",
          phone: "+91 94220 77885",
          type: "wing_lead",
          order: 7
        },
        {
          nameMr: "म्हाडा टॉवर्स मुख्य सुरक्षा चौकी",
          nameEn: "Main Security Gate & Intercom",
          roleMr: "२४x७ सुरक्षा नियंत्रण कक्ष",
          roleEn: "24x7 Security Control",
          wing: "मुख्य प्रवेशद्वार (Main Gate)",
          phone: "+91 020 2742 0000",
          type: "security",
          order: 8
        },
        {
          nameMr: "पिंपरी पोलीस नियंत्रण कक्ष व रुग्णवाहिका",
          nameEn: "Pimpri Police Helpline & Ambulance",
          roleMr: "तातडीची शासकीय मदत",
          roleEn: "Emergency Services",
          wing: "पिंपरी चिंचवड",
          phone: "112 / 108",
          type: "emergency",
          order: 9
        }
      ];
      await Contact.insertMany(contacts);
      console.log("[Seed] Contacts initialized.");
    }

  } catch (error) {
    console.error("[Seed] Error seeding data:", error.message);
  }
};
