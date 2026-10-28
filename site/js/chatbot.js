/**
 * Dhanalaxmi Bridal Studio — Intelligent Bridal Assistant Chatbot (Dhana AI)
 * Bilingual (EN & TA) with quick inquiry chips, keyword matching, and WhatsApp dispatch.
 */
(() => {
  "use strict";

  const C = window.SITE_CONFIG || {};
  const D = window.I18N || {};

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Active language detector
  const getLang = () => document.documentElement.lang || "en";
  const t = k => {
    const l = getLang();
    return (D[l] && D[l][k]) || (D.en && D.en[k]) || k;
  };

  const waUrl = (msg = "") => {
    const num = C.whatsappNumber || "919791230730";
    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  };

  /* ---------------- Knowledge Base (English & Tamil) ---------------- */
  const KB = [
    {
      id: "packages",
      keywords: ["package", "packages", "service", "services", "bridal makeup", "makeup", "look", "looks", "சேவை", "சேவைகள்", "மேக்கப்", "பேக்கேஜ்"],
      reply: {
        en: `We offer bespoke bridal beauty packages tailored for your special day:
• <strong>Muhurtham Bridal Glam:</strong> Sweat-proof, HD makeup that lasts through rituals.
• <strong>Reception Glam:</strong> Modern, radiant looks with soft glam & contouring.
• <strong>Engagement & Sangeet:</strong> Fresh, vibrant styling customized to your outfit.
• <strong>Complete Bridal Combos:</strong> Makeup, Saree Draping, Hair Art, Mehendi & Nails.`,
        ta: `எங்கள் பிரைடல் ஸ்டுடியோவின் சிறப்பு சேவைகள்:
• <strong>முகூர்த்த மேக்கப்:</strong> நீண்ட நேரம் கலையாத, வியர்வையைத் தாங்கும் HD மேக்கப்.
• <strong>வரவேற்பு அலங்காரம் (Reception):</strong> நவீனம் மற்றும் பளபளப்பான கவர்ச்சிகர தோற்றம்.
• <strong>நிச்சயதார்த்தம் & சங்கீத்:</strong> உடைகளுக்குப் பொருத்தமான துடிப்பான அலங்காரம்.
• <strong>முழுமையான காம்போ:</strong> மேக்கப், புடவை கட்டுதல், கூந்தல் கலை, மருதாணி மற்றும் நகங்கள்.`
      },
      actions: [
        { label: "View Services", target: "#services" },
        { label: "Get Quote on WhatsApp", wa: "Hello Dhana, I would like to know your bridal makeup package details and pricing." }
      ]
    },
    {
      id: "pricing",
      keywords: ["price", "pricing", "cost", "rate", "rates", "how much", "charges", "budget", "fee", "fees", "விலை", "கட்டணம்", "ரேட்"],
      reply: {
        en: `Our pricing is customized based on your event requirements:
• <strong>Service Combinations:</strong> (Makeup only vs. Complete Bridal Combos).
• <strong>Venue Location:</strong> (Studio session vs. traveling to your wedding mandapam).
• <strong>Number of Events:</strong> (Muhurtham, Reception, Engagement).

Click below to share your date & venue for an instant personalized quote!`,
        ta: `எங்கள் கட்டண விவரங்கள் உங்கள் தேவைகளுக்கு ஏற்ப நிர்ணயிக்கப்படுகின்றன:
• <strong>சேவை சேர்க்கைகள்:</strong> (மேக்கப் மட்டும் அல்லது புடவை, கூந்தல், மருதாணி இணைந்த காம்போ).
• <strong>இடம்:</strong> (ஸ்டுடியோவில் அல்லது மண்டபத்திற்கு வந்து செய்தல்).
• <strong>நிகழ்வுகள்:</strong> (முகூர்த்தம், வரவேற்பு, நிச்சயதார்த்தம்).

உங்கள் திருமண தேதி மற்றும் இடத்தை WhatsApp-ல் தெரிவித்து உடனே விலையைத் தெரிந்து கொள்ளுங்கள்!`
      },
      actions: [
        { label: "Request Exact Quote", wa: "Hello Dhana, can you please share the pricing and package details for my wedding?" },
        { label: "Enquiry Form", target: "#contact" }
      ]
    },
    {
      id: "saree",
      keywords: ["saree", "sari", "draping", "drape", "pleat", "pleats", "iron", "box fold", "folding", "புடவை", "மடிப்பு", "கட்டுதல்"],
      reply: {
        en: `<strong>Flawless Saree Draping & Pre-Pleating:</strong>
• Clean, razor-sharp pleats that hold securely through all wedding rituals.
• Pre-pleating and box-folding available for Kanchipuram silk sarees and designer drapes.
• Designed for all-day comfort without slipping or feeling heavy.`,
        ta: `<strong>நேர்த்தியான புடவை கட்டுதல் & மடிப்பு (Draping):</strong>
• நாள் முழுவதும் கலையாமல், வசதியாக இருக்கும் பட்டுப் புடவை மடிப்புகள்.
• காஞ்சிபுரம் பட்டு மற்றும் டிசைனர் புடவைகளுக்கு Pre-pleating & Box folding வசதி உண்டு.
• சடங்குகள் முடியும் வரை உடலுக்கு பாரமின்றி இலகுவாக பொருந்தும்.`
      },
      actions: [
        { label: "Saree Draping Enquiry", wa: "Hello Dhana, I need saree draping and pre-pleating services for my event." },
        { label: "View Portfolio", target: "#portfolio" }
      ]
    },
    {
      id: "hair",
      keywords: ["hair", "hairstyle", "hairstyling", "braid", "jada", "poola jada", "flower", "flowers", "jasmine", "mallipoo", "கூந்தல்", "ஜடை", "பூ", "பூலா ஜடை"],
      reply: {
        en: `<strong>Traditional & Modern Bridal Hair Art:</strong>
• <strong>Poola Jada:</strong> Fresh jasmine (மல்லிப்பூ), floral veni, and traditional hair attachments.
• <strong>Reception Buns:</strong> Textured messy buns, royal crown buns, and accessories setting.
• <strong>Open Waves & Curls:</strong> Soft floral braids and romantic half-up styles.`,
        ta: `<strong>பாரம்பரிய மற்றும் நவீன கூந்தல் அலங்காரம்:</strong>
• <strong>பூலா ஜடை:</strong> மணக்கும் மல்லிகைப் பூ, மலர் வேணி மற்றும் ஜடை அலங்காரம்.
• <strong>வரவேற்பு கொண்டைகள்:</strong> மெஸ்ஸி பன் (Messy bun), கிரீட கொண்டை மற்றும் அணிகலன் அலங்காரம்.
• <strong>திறந்த கூந்தல் அலைகள்:</strong> மென்மையான சுருள் மற்றும் பூக்கள் பதித்த பின்னல்.`
      },
      actions: [
        { label: "Hair Art Enquiry", wa: "Hello Dhana, I would like to book hair styling and floral Poola Jada for my wedding." },
        { label: "See Photos", target: "#portfolio" }
      ]
    },
    {
      id: "mehendi",
      keywords: ["mehendi", "mehndi", "henna", "maruthani", "மருதாணி"],
      reply: {
        en: `<strong>Bridal & Guest Mehendi Artistry:</strong>
• 100% natural, chemical-free henna delivering a deep, rich mahogany stain.
• Intricate bridal designs including Radha-Krishna, bridal figures, peacocks & floral mandalas.
• Speed and precision for bride & family mehendi sessions.`,
        ta: `<strong>மணப்பெண் மருதாணி கலை:</strong>
• 100% இயற்கை மருதாணி — கருஞ்சிவப்பு நிறம் தரும் தரம்.
• ராதா-கிருஷ்ணர், மயில் மற்றும் பூக்கள் நிறைந்த நுணுக்கமான வடிவமைப்பு.
• மணப்பெண் மற்றும் குடும்பத்தினருக்கு விரைவான நேர்த்தியான மருதாணி சேவை.`
      },
      actions: [
        { label: "Book Mehendi", wa: "Hello Dhana, I want to book bridal mehendi for my wedding." }
      ]
    },
    {
      id: "nails",
      keywords: ["nail", "nails", "nail art", "extensions", "gel nails", "நகங்கள்", "நெயில் ஆர்ட்"],
      reply: {
        en: `<strong>Bridal Nail Art & Extensions:</strong>
• Long-lasting gel extensions, French ombré, and bridal stone embellishments.
• Color-coordinated designs perfectly matched with your Muhurtham silk saree and reception gown!`,
        ta: `<strong>மணப்பெண் நெயில் ஆர்ட் & நீட்டிப்பு:</strong>
• நீடித்து உழைக்கும் ஜெல் நெயில்ஸ், பிரெஞ்ச் ஓம்ப்ரே மற்றும் மணப்பெண் கற்கள் பதித்த வேலைப்பாடுகள்.
• உங்கள் பட்டுப் புடவை மற்றும் வரவேற்பு ஆடைக்கு ஏற்ற வண்ணங்களில் வடிவமைக்கப்படும்!`
      },
      actions: [
        { label: "Nails Enquiry", wa: "Hello Dhana, I am inquiring about bridal nail art and extensions." }
      ]
    },
    {
      id: "jewellery",
      keywords: ["jewel", "jewellery", "jewelry", "rent", "rental", "necklace", "bangles", "bangle", "sparklenest", "நகை", "நகைகள்", "வளையல்", "வாடகை"],
      reply: {
        en: `<strong>Rental Bridal Jewellery & Bangles:</strong>
• <strong>Rental Sets:</strong> Antique matte finish, temple jewellery, Kundan, and choker sets with matching earrings and hip belts (Oddiyanam).
• <strong>Custom Bangles:</strong> Handcrafted silk thread bridal bangle sets decorated with gold beads and pearls.`,
        ta: `<strong>வாடகை நகைகள் & அலங்கார வளையல்கள்:</strong>
• <strong>வாடகை நகைகள்:</strong> ஆன்டிக் மேட் பினிஷ், கோவில் நகைகள் (Temple jewellery), குந்தன் சோக்கர் மற்றும் ஒட்டியாணம்.
• <strong>பட்டு நூல் வளையல்கள்:</strong> உடைகளின் வண்ணத்திற்கு ஏற்ப முத்து மற்றும் மணிகள் பதிக்கப்பட்ட வளையல் செட்கள்.`
      },
      actions: [
        { label: "View Jewellery Rental", wa: "Hello Dhana, I want to check bridal rental jewellery and bangle sets." }
      ]
    },
    {
      id: "location",
      keywords: ["location", "address", "where", "studio", "sankarankovil", "travel", "hall", "venue", "mandapam", "tirunelveli", "tenkasi", "rajapalayam", "இடம்", "முகவரி", "எங்கு"],
      reply: {
        en: `<strong>Studio Location & Travel:</strong>
• <strong>Studio Address:</strong> Sankarankovil, Tenkasi District, Tamil Nadu.
• <strong>Venue Travel:</strong> Yes! Artist Dhanalaxmi travels directly to wedding halls and homes across Sankarankovil, Tenkasi, Tirunelveli, Rajapalayam, Kovilpatti, and nearby regions.`,
        ta: `<strong>ஸ்டுடியோ இருப்பிடம் & மண்டபப் பயணம்:</strong>
• <strong>முகவரி:</strong> சங்கரன்கோவில், தென்காசி மாவட்டம், தமிழ்நாடு.
• <strong>மண்டபத்திற்கு வருதல்:</strong> ஆம்! சங்கரன்கோவில், தென்காசி, திருநெல்வேலி, ராஜபாளையம், கோவில்பட்டி மற்றும் சுற்றியுள்ள ஊர்களுக்கு நேரில் வந்து சேவை வழங்குகிறோம்.`
      },
      actions: [
        { label: "Get Directions (Maps)", link: C.directionsUrl || "https://maps.google.com" },
        { label: "Check Travel Availability", wa: "Hello Dhana, do you travel to my wedding venue for makeup?" }
      ]
    },
    {
      id: "trial",
      keywords: ["trial", "trials", "test", "practice", "முன் சோதனை", "ட்ரையல்"],
      reply: {
        en: `<strong>Bridal Makeup Consultation & Trial:</strong>
Yes, bridal makeup trials can be scheduled at the studio. During your trial, we test foundation shade matching, skin suitability, saree pleating style, and discuss hair accessories to lock in your exact look in advance.`,
        ta: `<strong>மணப்பெண் மேக்கப் ட்ரையல் (Trial):</strong>
ஆம்! ஸ்டுடியோவில் முன்கூட்டியே மேக்கப் ட்ரையல் பார்க்கலாம். இதன் மூலம் உங்கள் சருமத்திற்கு ஏற்ற மேக்கப், புடவை மடிப்பு மற்றும் ஹேர் ஸ்டைலை இறுதி செய்து உங்கள் திருமண நாளில் 100% திருப்தியைப் பெறலாம்.`
      },
      actions: [
        { label: "Book a Trial Session", wa: "Hello Dhana, I would like to book a bridal makeup trial session." }
      ]
    },
    {
      id: "booking",
      keywords: ["book", "booking", "reserve", "date", "dates", "available", "availability", "advance", "முன்பதிவு", "தேதி", "புக்"],
      reply: {
        en: `<strong>How to Reserve Your Wedding Date:</strong>
Auspicious Muhurtham dates fill up very quickly! To reserve your date:
1. Contact us with your wedding date, venue, and services needed.
2. An advance deposit secures your date exclusively on our calendar.
3. We do not double-book main muhurtham slots.`,
        ta: `<strong>திருமண தேதியை முன்பதிவு செய்வது எப்படி?</strong>
முகூர்த்த தேதிகள் மிக வேகமாக நிரம்பிவிடும்! உங்கள் தேதியை உறுதிப்படுத்த:
1. உங்கள் திருமண தேதி, இடம் மற்றும் தேவையான சேவைகளை எங்களிடம் பகிருங்கள்.
2. அட்வான்ஸ் செலுத்தி உங்கள் தேதியை உறுதி செய்து கொள்ளுங்கள்.
3. ஒரே முகூர்த்த நேரத்தில் மற்றொருவருக்கு பதிவு செய்வதில்லை.`
      },
      actions: [
        { label: "Check Date on WhatsApp", wa: "Hello Dhana, I would like to check availability for my wedding date." },
        { label: "Fill Enquiry Form", target: "#contact" }
      ]
    },
    {
      id: "classes",
      keywords: ["class", "classes", "learn", "course", "courses", "training", "masterclass", "self makeup", "படிப்பு", "பயிற்சி", "கற்றல்"],
      reply: {
        en: `<strong>Makeup Masterclasses & Self-Makeup Workshops:</strong>
• <strong>Personal Self-Makeup Classes:</strong> Learn day-to-day glam, foundation blending, eyeliner, and quick saree draping.
• <strong>Professional Bridal Courses:</strong> Complete hands-on training for aspiring bridal makeup artists.`,
        ta: `<strong>மேக்கப் பயிற்சி & சுய-அலங்கார வகுப்புகள் (Classes):</strong>
• <strong>சுய மேக்கப் பயிற்சி (Self-Makeup):</strong> தினசரி மேக்கப், ஐலைனர், மற்றும் எளிதாக புடவை கட்டும் முறைகள்.
• <strong>தொழில்முறை மேக்கப் படிப்பு:</strong> புதிய மணப்பெண் மேக்கப் கலைஞர்களுக்கான முழுமையான நேரடிப் பயிற்சி.`
      },
      actions: [
        { label: "Class Details on WhatsApp", wa: "Hello Dhana, I am interested in joining your self-makeup / bridal training classes." }
      ]
    },
    {
      id: "greetings",
      keywords: ["hi", "hello", "hey", "vanakkam", "good morning", "good evening", "good afternoon", "namaste", "வணக்கம்", "ஹலோ", "ஹாய்"],
      reply: {
        en: `Hello and a warm welcome to <strong>Dhanalaxmi Bridal Studio</strong>! 🌸✨
I am Dhana AI, your personal bridal assistant. How can I assist you with your wedding preparations today?`,
        ta: `வணக்கம்! <strong>தனலட்சுமி பிரைடல் ஸ்டுடியோ</strong>விற்கு தங்களை அன்போடு வரவேற்கிறோம்! 🌸✨
நான் உங்கள் தனலட்சுமி AI உதவியாளர். உங்கள் திருமண அலங்காரத்திற்கு நான் எவ்வாறு உதவட்டும்?`
      },
      actions: [
        { label: "👰 Bridal Packages" },
        { label: "💰 Pricing & Quotes" },
        { label: "📍 Studio Location" }
      ]
    },
    {
      id: "thanks",
      keywords: ["thank", "thanks", "thank you", "tq", "nandri", "நன்றி", "super"],
      reply: {
        en: `You're very welcome! 💖 We would be honored to be part of your special day. Feel free to chat with us on WhatsApp anytime!`,
        ta: `மிக்க மகிழ்ச்சி! 💖 உங்கள் திருமண நாளில் உங்களை பேரழகாக அலங்கரிப்பதில் நாங்கள் பெருமைப்படுகிறோம். எப்போது வேண்டுமானாலும் WhatsApp-ல் தொடர்பு கொள்ளுங்கள்!`
      },
      actions: [
        { label: "Open WhatsApp", wa: "Hello Dhana, thank you for the information! Let's talk." }
      ]
    }
  ];

  /* ---------------- Default Suggested Chips ---------------- */
  const DEFAULT_CHIPS = {
    en: [
      { text: "👰 Bridal Packages", query: "bridal packages" },
      { text: "💰 Pricing & Quotes", query: "how much is pricing" },
      { text: "🌸 Saree & Hair Art", query: "saree draping and hair" },
      { text: "📍 Location & Travel", query: "where is your location" },
      { text: "📅 Book My Date", query: "how to book wedding date" },
      { text: "🎓 Self-Makeup Classes", query: "self makeup classes" }
    ],
    ta: [
      { text: "👰 மேக்கப் பேக்கேஜ்", query: "மணப்பெண் மேக்கப் பேக்கேஜ்" },
      { text: "💰 கட்டண விவரம்", query: "விலை விவரம் என்ன" },
      { text: "🌸 புடவை & கூந்தல் கலை", query: "புடவை கட்டுதல் மற்றும் ஜடை" },
      { text: "📍 ஸ்டுடியோ முகவரி", query: "ஸ்டுடியோ எங்கு உள்ளது" },
      { text: "📅 தேதி முன்பதிவு", query: "தேதி முன்பதிவு செய்வது எப்படி" },
      { text: "🎓 மேக்கப் பயிற்சி", query: "மேக்கப் பயிற்சி வகுப்புகள்" }
    ]
  };

  /* ---------------- Welcome Messages ---------------- */
  const WELCOME_MSG = {
    en: `Hello gorgeous bride-to-be! 🌸✨<br>I am <strong>Dhana AI</strong>, your personal bridal concierge.<br>Ask me anything about bridal makeup, saree draping, poola jada, pricing, or reserving your wedding date!`,
    ta: `வணக்கம் மணப்பெண்ணே! 🌸✨<br>நான் <strong>தனலட்சுமி AI</strong>, உங்கள் தனிப்பட்ட அலங்கார உதவியாளர்.<br>மணப்பெண் மேக்கப், புடவை கட்டுதல், பூலா ஜடை, கட்டணம் அல்லது திருமண நாள் முன்பதிவு பற்றி என்னிடம் தாராளமாகக் கேட்கலாம்!`
  };

  /* ---------------- Core Chatbot Controller ---------------- */
  class BridalChatbot {
    constructor() {
      this.wrap = $("#chatbotWrap");
      this.launcher = $("#chatLauncher");
      this.window = $("#chatWindow");
      this.body = $("#chatBody");
      this.msgs = $("#chatMsgs");
      this.chipsContainer = $("#chatChips");
      this.form = $("#chatForm");
      this.input = $("#chatInput");
      this.typing = $("#chatTyping");
      this.closeBtn = $("#chatCloseBtn");
      this.resetBtn = $("#chatResetBtn");
      this.badge = $(".chat-badge", this.launcher);

      this.isOpen = false;
      this.history = [];
      this.init();
    }

    init() {
      if (!this.launcher || !this.window) return;

      // Click to toggle chat window
      this.launcher.addEventListener("click", () => this.toggle());
      if (this.closeBtn) this.closeBtn.addEventListener("click", () => this.close());
      if (this.resetBtn) this.resetBtn.addEventListener("click", () => this.resetChat());

      // Form submit
      if (this.form) {
        this.form.addEventListener("submit", e => {
          e.preventDefault();
          this.handleUserSubmit();
        });
      }

      // Close on Escape key
      window.addEventListener("keydown", e => {
        if (e.key === "Escape" && this.isOpen) {
          this.close();
          this.launcher.focus();
        }
      });

      // Close on click outside (mobile backdrop effect)
      document.addEventListener("click", e => {
        if (this.isOpen && !this.window.contains(e.target) && !this.launcher.contains(e.target)) {
          // On desktop, keep open or close; let's close on mobile or when clicked far outside
          if (window.innerWidth <= 640) this.close();
        }
      });

      // Update when language changes
      $$(".lang button").forEach(b => {
        b.addEventListener("click", () => {
          setTimeout(() => this.onLanguageChange(), 100);
        });
      });

      // Render initial welcome
      this.renderWelcome();
    }

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    open() {
      this.isOpen = true;
      this.window.classList.add("is-open");
      this.launcher.classList.add("is-open");
      this.launcher.setAttribute("aria-expanded", "true");
      this.window.setAttribute("aria-hidden", "false");
      if (this.badge) this.badge.style.display = "none";

      setTimeout(() => {
        if (this.input) this.input.focus();
        this.scrollToBottom();
      }, 300);
    }

    close() {
      this.isOpen = false;
      this.window.classList.remove("is-open");
      this.launcher.classList.remove("is-open");
      this.launcher.setAttribute("aria-expanded", "false");
      this.window.setAttribute("aria-hidden", "true");
    }

    onLanguageChange() {
      const l = getLang();
      // Update quick chips
      this.renderChips();
      // If only welcome message exists, update it to current language
      if (this.history.length === 0) {
        this.msgs.innerHTML = "";
        this.renderWelcome();
      }
    }

    renderWelcome() {
      const lang = getLang();
      const welcome = WELCOME_MSG[lang] || WELCOME_MSG.en;
      this.appendBotMessage(welcome, false, [
        { label: lang === "ta" ? "👰 மேக்கப் சேவைகள்" : "👰 Bridal Packages", query: "bridal packages" },
        { label: lang === "ta" ? "💰 விலை விவரம்" : "💰 Pricing & Quotes", query: "pricing details" },
        { label: lang === "ta" ? "📍 ஸ்டுடியோ முகவரி" : "📍 Studio Location", query: "studio location" }
      ]);
      this.renderChips();
    }

    renderChips() {
      if (!this.chipsContainer) return;
      const lang = getLang();
      const chips = DEFAULT_CHIPS[lang] || DEFAULT_CHIPS.en;

      this.chipsContainer.innerHTML = chips.map(c => 
        `<button type="button" class="chat-chip" data-query="${c.query}">${c.text}</button>`
      ).join("");

      $$(".chat-chip", this.chipsContainer).forEach(btn => {
        btn.addEventListener("click", () => {
          const q = btn.dataset.query || btn.textContent;
          this.processUserMessage(q, btn.textContent);
        });
      });
    }

    resetChat() {
      this.msgs.innerHTML = "";
      this.history = [];
      this.renderWelcome();
      if (this.input) this.input.focus();
    }

    handleUserSubmit() {
      const text = this.input.value.trim();
      if (!text) return;
      this.input.value = "";
      this.processUserMessage(text);
    }

    processUserMessage(text, displayText = null) {
      // 1. Append user message to chat UI
      this.appendUserMessage(displayText || text);
      this.history.push({ role: "user", text });

      // 2. Show typing indicator
      this.showTyping(true);

      // 3. Intelligent Matcher with slight realistic delay (400ms - 700ms)
      setTimeout(() => {
        const match = this.findAnswer(text);
        this.showTyping(false);

        const lang = getLang();
        const replyHtml = match.reply[lang] || match.reply.en;
        this.appendBotMessage(replyHtml, true, match.actions);
        this.history.push({ role: "bot", text: replyHtml });
      }, 500);
    }

    findAnswer(query) {
      const q = query.toLowerCase().trim();

      // Check against our knowledge base keywords
      for (const item of KB) {
        for (const kw of item.keywords) {
          if (q.includes(kw.toLowerCase())) {
            return item;
          }
        }
      }

      // Default fallback if no exact intent matched
      const lang = getLang();
      return {
        reply: {
          en: `Thank you for asking! 🌸 For your specific query, artist <strong>Dhanalaxmi</strong> can discuss dates, customize packages, and send exact sample looks directly on WhatsApp.`,
          ta: `தங்கள் கேள்விக்கு நன்றி! 🌸 உங்கள் விருப்பத்திற்கு ஏற்ப சிறந்த மேக்கப் மற்றும் சரியான கட்டண விவரங்களை மேக்கப் கலைஞர் <strong>தனலட்சுமி</strong>யிடம் நேரடியாக WhatsApp-ல் பேசி உறுதி செய்து கொள்ளலாம்.`
        },
        actions: [
          { label: "Chat with Dhanalaxmi on WhatsApp", wa: `Hello Dhanalaxmi, I have an enquiry: "${query}"` },
          { label: "View Portfolio Gallery", target: "#portfolio" }
        ]
      };
    }

    appendUserMessage(text) {
      const time = this.getCurrentTime();
      const div = document.createElement("div");
      div.className = "chat-msg user";
      div.innerHTML = `
        <div class="chat-bubble user-bubble">${this.escapeHtml(text)}</div>
        <span class="chat-time">${time}</span>
      `;
      this.msgs.appendChild(div);
      this.scrollToBottom();
    }

    appendBotMessage(html, animate = true, actions = []) {
      const time = this.getCurrentTime();
      const div = document.createElement("div");
      div.className = `chat-msg bot ${animate ? "pop-in" : ""}`;

      let actionsHtml = "";
      if (actions && actions.length) {
        actionsHtml = `<div class="chat-actions">` + actions.map(act => {
          if (act.wa) {
            return `<a class="chat-action-btn chat-action-wa" href="${waUrl(act.wa)}" target="_blank" rel="noopener noreferrer">
              <svg class="ico" viewBox="0 0 24 24" width="13" height="13"><use href="#wa"/></svg>
              <span>${act.label}</span>
            </a>`;
          } else if (act.link) {
            return `<a class="chat-action-btn" href="${act.link}" target="_blank" rel="noopener noreferrer">
              <span>${act.label} ↗</span>
            </a>`;
          } else if (act.target) {
            return `<a class="chat-action-btn chat-nav-link" href="${act.target}">
              <span>${act.label} ↓</span>
            </a>`;
          } else if (act.query) {
            return `<button type="button" class="chat-action-btn chat-query-btn" data-query="${act.query}">
              <span>${act.label}</span>
            </button>`;
          } else {
            return `<button type="button" class="chat-action-btn chat-query-btn" data-query="${act.label}">
              <span>${act.label}</span>
            </button>`;
          }
        }).join("") + `</div>`;
      }

      div.innerHTML = `
        <div class="chat-avatar-mini" aria-hidden="true">🌸</div>
        <div class="chat-bubble-wrap">
          <div class="chat-bubble bot-bubble">${html}</div>
          ${actionsHtml}
          <span class="chat-time">${time}</span>
        </div>
      `;

      this.msgs.appendChild(div);

      // Bind in-chat navigation and chip buttons
      $$(".chat-nav-link", div).forEach(a => {
        a.addEventListener("click", () => {
          if (window.innerWidth <= 640) this.close();
        });
      });

      $$(".chat-query-btn", div).forEach(btn => {
        btn.addEventListener("click", () => {
          const q = btn.dataset.query || btn.textContent;
          this.processUserMessage(q, btn.textContent);
        });
      });

      this.scrollToBottom();
    }

    showTyping(show) {
      if (!this.typing) return;
      this.typing.hidden = !show;
      if (show) this.scrollToBottom();
    }

    scrollToBottom() {
      if (this.body) {
        this.body.scrollTop = this.body.scrollHeight;
      }
    }

    getCurrentTime() {
      const d = new Date();
      let h = d.getHours(), m = d.getMinutes();
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return `${h}:${m < 10 ? "0" + m : m} ${ampm}`;
    }

    escapeHtml(str) {
      const div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => new BridalChatbot());
  } else {
    new BridalChatbot();
  }
})();
