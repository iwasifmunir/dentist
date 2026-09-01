/* =============================================================
   CLIENT DATA — for a new client, change ONLY this file.
   ============================================================= */

var PX = 'https://images.pexels.com/photos/';
function px(id, w) { return PX + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + (w || 900); }

window.CLINIC = {
  /* --- Basic --- */
  name: "SmileLab",
  tagline: "Cosmetic & Implant Dentistry",
  city: "Lahore",

  /* --- Contact --- */
  phone: "+92 300 1234567",
  phoneRaw: "+923001234567",
  whatsapp: "923001234567",          // country code + number, no + and no spaces
  email: "hello@smilelab.pk",
  address: "24-C, Main Boulevard, Gulberg III, Lahore",
  mapQuery: "Main Boulevard Gulberg III Lahore",

  /* Emergency line — answered outside clinic hours */
  emergency: {
    phone: "+92 300 7654321",
    phoneRaw: "+923007654321",
    note: "Tooth pain after hours or on Sunday? Call this number — we answer 8am to 11pm, every day."
  },

  hours: [
    { day: "Monday – Thursday", time: "11:00 AM – 9:00 PM" },
    { day: "Friday",            time: "3:00 PM – 9:00 PM" },
    { day: "Saturday",          time: "11:00 AM – 7:00 PM" },
    { day: "Sunday",            time: "Closed — emergency line open" }
  ],

  socials: [
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "Facebook",  url: "https://facebook.com/" },
    { label: "Google",    url: "https://www.google.com/maps" }
  ],

  /* Link to the clinic's real Google reviews page */
  googleReviewsUrl: "https://www.google.com/maps",

  /* --- Hero --- */
  hero: {
    line1: "Restore",
    line2: "Your True",
    line3: "Smile",              // this line renders in italic serif
    text: "Comprehensive dental care with advanced technology — clear pricing and treatment without the pain.",
    patientCount: "+2k"
  },

  /* --- Photos --- */
  photos: {
    /* Hero cut-out — transparent background, shipped in assets/img */
    heroResult:   "assets/img/hero-before-after.webp",
    /* Review avatars — still Pexels demo images, swap for delivery */
    patientWoman: px(4584568, 900),    // South Asian woman, studio
    avatar1:      px(4584566, 400),
    avatar2:      px(17261596, 400),
    avatar3:      px(9969335, 400)
  },

  /* --- Stats strip --- */
  stats: [
    { value: 11,   suffix: "+", label: "Years of practice" },
    { value: 4800, suffix: "+", label: "Treatments completed" },
    { value: 4.9,  suffix: "",  label: "Google rating", decimals: 1 },
    { value: 3,    suffix: "",  label: "Dentists on the team" }
  ],

  /* --- Why choose us — trust factors --- */
  whyUs: {
    title: "Why patients choose us",
    text: "The four things people ask about most, answered before you walk in.",
    items: [
      { icon: "shield", title: "Genuinely painless",  text: "Modern anaesthetic protocol and rotary endodontics. Most patients feel pressure, not pain." },
      { icon: "sparkle", title: "Sterilisation you can watch", text: "Class B autoclave, single-use needles, sealed instrument pouches opened in front of you." },
      { icon: "scan",   title: "Digital diagnostics",  text: "In-house digital X-ray and intraoral camera — you see what we see, on screen." },
      { icon: "wallet", title: "Written prices, instalments", text: "Every plan is priced in writing. Treatments over Rs 50,000 can be split across 3 monthly payments, interest free." }
    ]
  },

  /* --- Services --- */
  servicesNote: "Every mouth is different, so we do not quote a number before we have seen yours. You get the full price in writing after your first check-up — never after treatment has begun.",
  services: [
    { n: "01", title: "Teeth Whitening",   text: "Four to six shades brighter in a single session, with no sensitivity.", price: "15,000",  slug: null },
    { n: "02", title: "Dental Implants",   text: "Titanium implants that look and work like the tooth you lost.",         price: "85,000",  slug: "services/dental-implants.html" },
    { n: "03", title: "Braces & Aligners", text: "Metal, ceramic or fully invisible. Easy monthly plans.",                price: "120,000", slug: null },
    { n: "04", title: "Root Canal",        text: "Done in one visit, pain-free, using rotary endodontics.",               price: "18,000",  slug: null },
    { n: "05", title: "Smile Makeover",    text: "Veneers and crowns — see the digital preview before we begin.",         price: "45,000",  slug: null },
    { n: "06", title: "Scaling & Polish",  text: "Ultrasonic cleaning. Once every six months keeps it simple.",           price: "5,000",   slug: null }
  ],

  /* --- Results / before-after --- */
  results: {
    title: "See the result first,\nthen decide",
    text: "Every smile makeover starts with a digital preview, so you know exactly what you are getting before any work begins. Drag the handle up and down to compare.",
    /* SAMPLE case photo pair. Swap for the clinic's own cases before
       delivery — the patient's written consent is required. See README. */
    real: true,
    beforeImg: "assets/img/case-1-before.webp",
    afterImg:  "assets/img/case-1-after.webp",
    caption: "Sample case — whitening and alignment. Replace with the clinic's own consented case photos before going live.",
    points: [
      "Digital smile design before treatment",
      "Veneers, crowns and whitening in one plan",
      "Most cases finish in two to three visits",
      "Five-year written warranty"
    ]
  },

  /* --- Clinic / doctor --- */
  clinic: {
    doctor: "Dr. Ayesha Rahman",
    role: "Principal Dentist · Cosmetic & Implantology",
    bio: "Eleven years in practice in Lahore, specialising in implants and smile design — and experienced with patients who are genuinely afraid of the dentist.",
    facts: [
      { v: "11", l: "years in practice" },
      { v: "600+", l: "implants placed" },
      { v: "4,800+", l: "treatments completed" },
      { v: "3", l: "dentists on the team" }
    ],
    credentials: [
      "BDS — University of Health Sciences, Lahore (2014)",
      "MFDS RCPS — Royal College of Physicians and Surgeons, Glasgow",
      "Fellowship in Implantology — ICOI",
      "Member, Pakistan Dental Association",
      "PMDC Registered · 12345-D"
    ]
  },

  /* --- Process --- */
  process: [
    { title: "Send one WhatsApp",  text: "Tap the button, send your name and what is bothering you. We reply within 30 minutes during clinic hours — no forms, no call centre." },
    { title: "Free consultation",  text: "A full examination and digital X-ray, explained on screen as we go. The consultation itself costs nothing." },
    { title: "Written plan & price", text: "You leave with the plan and the total on paper. Anything over Rs 50,000 can be split into 3 interest-free monthly payments." },
    { title: "Treatment & aftercare", text: "We book around your schedule, and three follow-up visits are included at no extra cost." }
  ],

  /* --- Reviews --- */
  reviews: [
    { name: "Hina Farooq", treatment: "Root Canal", stars: 5, text: "I used to dread the dentist. This was the first time nobody rushed me. The root canal was completely painless." },
    { name: "Bilal Ahmed", treatment: "Implants",   stars: 5, text: "Two implants. The price was written down up front and not a rupee was added. Eight months on, they feel like my own teeth." },
    { name: "Sana Malik",  treatment: "Whitening",  stars: 5, text: "I had whitening done before my wedding. The result was so good that my whole family comes here now." },
    { name: "Usman Tariq", treatment: "Braces",     stars: 5, text: "My daughter got her braces here. They explain what is happening at every visit, and the staff are lovely." }
  ],

  /* --- FAQ --- */
  faq: {
    title: "Questions people ask before booking",
    items: [
      { q: "Does a root canal hurt?",
        a: "No. With modern local anaesthetic and rotary instruments the tooth is numb throughout — most patients report pressure rather than pain. The pain people remember is usually the infection before treatment, not the treatment itself." },
      { q: "How much does a dental implant cost in Lahore?",
        a: "It depends on your bone, so we do not put a figure on it before we have seen an X-ray. What we can tell you is what the quote covers — implant, abutment, crown, every review visit and a five-year warranty — and that you get the total in writing at the consultation, before anything begins." },
      { q: "Can I pay in instalments?",
        a: "Yes. Any treatment plan over Rs 50,000 can be split into three monthly payments with no interest and no third-party financing. You pay the first instalment when treatment starts." },
      { q: "How long do braces take?",
        a: "Most cases run 14 to 24 months. Clear aligners can be faster for mild crowding. We give you an estimated timeline at the consultation, based on your X-ray rather than a guess." },
      { q: "What if I have a dental emergency at night or on Sunday?",
        a: "Call our emergency line on +92 300 7654321. It is answered 8am to 11pm every day, including Sunday when the clinic is closed. For severe swelling or trauma we will open the clinic." },
      { q: "Is teeth whitening safe for my enamel?",
        a: "Yes, when it is done in a clinic with controlled concentration and gum protection. Over-the-counter kits and 'whitening' powders are what damage enamel. We check for cracks and exposed roots first — if whitening is not right for you, we say so." },
      { q: "Do you see nervous or phobic patients?",
        a: "Often. Tell us when you book and we will schedule a longer first appointment with no treatment at all — just a look, a conversation and a plan. Many of our regular patients started that way." }
    ]
  },

  /* --- Booking form: short by design (Name, Phone, Treatment, Time) --- */
  bookingServices: [
    "Check-up / Consultation", "Teeth Whitening", "Dental Implants",
    "Braces / Aligners", "Root Canal", "Smile Makeover",
    "Scaling & Polish", "Emergency — tooth pain"
  ],

  /* --- Repeated call-to-action band --- */
  cta: {
    title: "Not sure what you need?",
    text: "Send one message. We will tell you what it is, what it costs, and whether it is urgent — before you book anything.",
    button: "WhatsApp the dentist"
  }
};
