import type { LocaleCode } from "@/i18n/locales";

export type Messages = {
  nav: {
    home: string;
    howItWorks: string;
    philosophy: string;
    pricing: string;
    faq: string;
    docs: string;
    login: string;
    becomeAffiliate: string;
  };
  hero: {
    titleLine1: string;
    titleLine2Before: string;
    titleLine2Accent: string;
    subtitle: string;
    haveScanCode: string;
    scanNow: string;
    becomeAffiliate: string;
    startEarning: string;
    scanCodePlaceholder: string;
    scanCodeAria: string;
    trusted: string;
    heroAlt: string;
  };
  trust: {
    title: string;
    analyses: string;
    partners: string;
    helpful: string;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stepLabel: string;
    steps: Array<{ title: string; body: string }>;
    aiEyebrow: string;
    aiTitle: string;
    aiBody: string;
    demoAlt: string;
    demo: Array<{ title: string; body: string }>;
    skinScore: string;
    topConcerns: string;
  };
  philosophy: {
    eyebrow: string;
    title: string;
    principles: Array<{ letter: string; title: string; body: string }>;
  };
  affiliates: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    steps: Array<{ title: string; body: string }>;
    dashboard: string;
    overview: string;
    thisMonth: string;
    totalScans: string;
    activeFollowers: string;
    scanCredits: string;
    earnings: string;
    scanActivity: string;
    topReferrals: string;
    scansUnit: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    mostPopular: string;
    perScan: string;
    getStarted: string;
    talkToUs: string;
    customVolume: string;
    footnote: string;
    features: Record<string, string[]>;
  };
  social: {
    eyebrow: string;
    title: string;
    quote: string;
    attribution: string;
    quotes: Array<{ quote: string; name: string; role: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{ q: string; a: string }>;
  };
  cta: {
    title: string;
    body: string;
    button: string;
  };
  footer: {
    tagline: string;
    disclaimer: string;
    rights: string;
  };
  scan: {
    title: string;
    subtitle: string;
    guestName: string;
    guestNamePlaceholder: string;
    choosePhoto: string;
    takeSelfie: string;
    analyze: string;
    analyzing: string;
    analyzingHint: string;
    analyzingSteps: string[];
    results: string;
    skinTone: string;
    undertone: string;
    faceShape: string;
    confidence: string;
    matches: string;
    noMatches: string;
    scanAgain: string;
    missingTitle: string;
    missingHint: string;
    codePlaceholder: string;
    continue: string;
    invalidCode: string;
    needPhoto: string;
    error: string;
    viewProduct: string;
    capture: string;
    closeCamera: string;
    cameraError: string;
    cameraDenied: string;
    stepsLabel: string;
    stepScan: string;
    stepResults: string;
    stepProducts: string;
    seeProducts: string;
    backToResults: string;
    trainingConsent: string;
    trainingConsentHint: string;
    skinType: string;
    concerns: string;
    concernLabels: Record<string, string>;
    concernHints: Record<string, string>;
    undertoneLabels: Record<string, string>;
    resultsInsightWithType: string;
    resultsInsightFallback: string;
    resultsFocus: string;
    makeupProfile: string;
    skinProfile: string;
    scanQuality: string;
    scanQualityGood: string;
    scanQualityFair: string;
    scanQualityLow: string;
    scanQualityHint: string;
    previewTitle: string;
    previewHint: string;
  };
  language: string;
  workspace: {
    loading: string;
    signOut: string;
    profile: string;
    collapseSidebar: string;
    expandSidebar: string;
    openMenu: string;
    closeMenu: string;
  };
  dashboard: {
    affiliate: string;
    admin: string;
    nav: {
      overview: string;
      referralLink: string;
      products: string;
      scanLeads: string;
      analytics: string;
      apiKeys: string;
      usage: string;
      spending: string;
      billing: string;
      invoices: string;
      affiliators: string;
      finance: string;
      settings: string;
      profile: string;
    };
    overview: {
      title: string;
      subtitle: string;
      copyReferral: string;
      copied: string;
      totalScans: string;
      productMatches: string;
      scanCreditsLeft: string;
      topPickRate: string;
      last30Days: string;
      matchRate: string;
      ofPlan: string;
      usersWhoClicked: string;
      scansThisWeek: string;
      publicScanLink: string;
      publicScanHint: string;
      checkUsage: string;
      recentLeads: string;
      viewAll: string;
      noLeads: string;
      guest: string;
      scanCompleted: string;
      productMatchesCount: string;
    };
    pages: {
      link: { title: string; subtitle: string };
      products: { title: string; subtitle: string };
      leads: { title: string; subtitle: string };
      analytics: { title: string; subtitle: string };
      usage: { title: string; subtitle: string };
      spending: { title: string; subtitle: string };
      billing: { title: string; subtitle: string };
      invoices: { title: string; subtitle: string };
      finance: { title: string; subtitle: string };
      profile: { title: string; subtitle: string };
    };
  };
};

const en: Messages = {
  nav: {
    home: "Home",
    howItWorks: "How it Works",
    philosophy: "Philosophy",
    pricing: "Pricing",
    faq: "FAQ",
    docs: "Docs",
    login: "Login",
    becomeAffiliate: "Become Affiliate",
  },
  hero: {
    titleLine1: "Personalized Beauty.",
    titleLine2Before: "Made for",
    titleLine2Accent: "You.",
    subtitle:
      "AI analyzes your skin, understands what it needs, and recommends the right skincare for you.",
    haveScanCode: "Have a Scan Code?",
    scanNow: "Scan Now →",
    becomeAffiliate: "Become an Affiliate",
    startEarning: "Start earning today →",
    scanCodePlaceholder: "Enter your scan code",
    scanCodeAria: "Scan code",
    trusted: "Trusted by beauty partners",
    heroAlt:
      "AuraAI skin analysis on a smartphone — scanning face with AI insights",
  },
  trust: {
    title: "Trusted by beauty partners",
    analyses: "Skin Analyses",
    partners: "Beauty Partners",
    helpful: "Users found our results helpful",
  },
  howItWorks: {
    eyebrow: "How it Works",
    title: "See. Understand. Pick products.",
    subtitle: "From one selfie to clear next steps — in three simple moments.",
    stepLabel: "STEP",
    steps: [
      { title: "Scan", body: "Take a clear selfie." },
      {
        title: "Understand",
        body: "AI analyzes visible skin characteristics.",
      },
      {
        title: "Personalize",
        body: "Receive insights and skincare recommendations.",
      },
    ],
    aiEyebrow: "AI Skin Analysis",
    aiTitle: "Advanced AI. Real skin understanding.",
    aiBody:
      "Our AI looks at multiple skin factors to give you accurate, personalized insights you can trust.",
    demoAlt:
      "How AuraAI works: scan a selfie, AI analyzing a 3D face map, then skin score and top concerns",
    demo: [
      { title: "1. Scan", body: "Capture a clear selfie to begin." },
      {
        title: "2. AI Analyzing",
        body: "Visible skin signals are mapped in seconds.",
      },
      {
        title: "3. Get Your Results",
        body: "Skin score, concerns, and next steps — made readable.",
      },
    ],
    skinScore: "Skin Score",
    topConcerns: "Top concerns: Dehydration · Texture",
  },
  philosophy: {
    eyebrow: "Philosophy",
    title: "The Aura Principle",
    principles: [
      {
        letter: "A",
        title: "Accurate",
        body: "Insights grounded in data, not assumptions.",
      },
      {
        letter: "U",
        title: "Understandable",
        body: "Complex analysis, made simple.",
      },
      {
        letter: "R",
        title: "Reliable",
        body: "Consistent experiences you can trust.",
      },
      {
        letter: "A",
        title: "Adaptive",
        body: "Intelligence that evolves with every insight.",
      },
    ],
  },
  affiliates: {
    eyebrow: "For Affiliates",
    title: "Turn every scan into opportunity.",
    subtitle:
      "Help your audience understand their skin — and grow a more personal beauty business with every analysis.",
    cta: "Become an Affiliate Now →",
    steps: [
      { title: "Register", body: "Create your partner account." },
      { title: "Get Credits", body: "Choose a scan credit pack." },
      { title: "Share Link / QR", body: "Send it to your audience." },
      { title: "They Scan", body: "Followers get AI skin insights." },
      { title: "You Grow", body: "Track leads and engagement." },
    ],
    dashboard: "AFFILIATE DASHBOARD",
    overview: "Performance overview",
    thisMonth: "This month +238",
    totalScans: "Total Scans",
    activeFollowers: "Active Followers",
    scanCredits: "Scan Credits",
    earnings: "Earnings",
    scanActivity: "Scan Activity",
    topReferrals: "Top Referrals",
    scansUnit: "scans",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Simple credits. Flexible growth.",
    subtitle:
      "Buy scan credits and share them with your audience. No monthly commitment.",
    mostPopular: "Most Popular",
    perScan: "/scan",
    getStarted: "Get started",
    talkToUs: "Talk to us",
    customVolume: "Custom volume · tailored SLA",
    footnote: "The more you grow, the lower your cost per scan.",
    features: {
      starter: [
        "1,000 scan credits",
        "Valid for 30 days",
        "Public referral link",
        "Basic lead history",
      ],
      growth: [
        "3,000 scan credits",
        "Valid for 30 days",
        "Lead history & analytics",
        "Best value per scan",
      ],
      scale: [
        "7,000 scan credits",
        "Valid for 30 days",
        "Full analytics suite",
        "Priority support",
      ],
      custom: [
        "Scan volume tailored to you",
        "Custom branding & white-label options",
        "Dedicated success manager",
        "Custom API / SLA & onboarding",
      ],
    },
  },
  social: {
    eyebrow: "Social Proof",
    title: "What Our Partners Say",
    quote:
      "“AuraAI helps me give better recommendations and my followers love it!”",
    attribution: "— Sarah, Beauty Creator",
    quotes: [
      {
        quote:
          "“AuraAI helps me give better recommendations and my followers love it!”",
        name: "Sarah",
        role: "Beauty Creator",
      },
      {
        quote:
          "“Now I can recommend skincare based on each customer’s skin profile — not guesswork.”",
        name: "Dewi",
        role: "Clinic Owner",
      },
      {
        quote:
          "“Sharing a scan link made my product advice feel personal, not generic.”",
        name: "Raka",
        role: "Beauty Partner",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
    subtitle: "Everything you need to know before joining as a beauty partner.",
    items: [
      {
        q: "Is AuraAI a medical diagnosis?",
        a: "No. AuraAI provides beauty intelligence from visible skin characteristics — insights for understanding, not medical advice.",
      },
      {
        q: "How do scan credits work?",
        a: "Affiliates purchase credit packs, then share a referral link or QR. Each completed follower scan uses one credit.",
      },
      {
        q: "Can customers scan without an account?",
        a: "Yes. Followers can scan through an affiliate link or scan code without creating their own account.",
      },
      {
        q: "Can I upgrade my plan later?",
        a: "Yes. You can buy additional credit packs anytime — there is no monthly lock-in.",
      },
    ],
  },
  cta: {
    title: "Ready to make beauty personal?",
    body: "Join thousands of beauty partners who trust AuraAI.",
    button: "Become an Affiliate Now →",
  },
  footer: {
    tagline: "Personalized Beauty, Made for You",
    disclaimer:
      "Insights for understanding — not medical diagnosis.",
    rights: "All rights reserved.",
  },
  scan: {
    title: "Scan your face",
    subtitle: "Upload a clear selfie. No account needed.",
    guestName: "Your name (optional)",
    guestNamePlaceholder: "e.g. Ayla",
    choosePhoto: "Choose photo",
    takeSelfie: "Take selfie",
    analyze: "Analyze",
    analyzing: "Analyzing your face…",
    analyzingHint: "This usually takes a few seconds.",
    analyzingSteps: [
      "Detecting your face",
      "Reading skin tone & undertone",
      "Analyzing skin condition",
      "Matching the right products",
    ],
    results: "Your results",
    skinTone: "Skin tone",
    undertone: "Undertone",
    faceShape: "Face shape",
    confidence: "Confidence",
    matches: "Product matches",
    noMatches: "No product matches yet.",
    scanAgain: "Scan again",
    missingTitle: "This scan needs a referral link",
    missingHint: "Open the link from your affiliate, or enter their scan code below.",
    codePlaceholder: "Affiliate scan code",
    continue: "Continue",
    invalidCode: "Invalid scan code",
    needPhoto: "Please choose a selfie first",
    error: "Scan failed. Try another photo.",
    viewProduct: "View product",
    capture: "Capture",
    closeCamera: "Close camera",
    cameraError: "Camera is not available on this device",
    cameraDenied: "Camera permission denied. Allow camera access, then try again.",
    stepsLabel: "Scan steps",
    stepScan: "Scan",
    stepResults: "Results",
    stepProducts: "Product picks",
    seeProducts: "See product recommendations",
    backToResults: "Back to results",
    trainingConsent: "I agree to help Aura get better",
    trainingConsentHint:
      "If checked, your selfie may be saved to improve Aura’s adaptive AI. Uncheck to analyze without keeping the photo.",
    skinType: "Skin type",
    concerns: "Skin concerns",
    concernLabels: {
      acne: "Acne",
      oily: "Oily",
      dry: "Dry",
      sensitive: "Sensitive",
      dullness: "Dullness",
      aging: "Aging",
      pores: "Pores",
      "dark spots": "Dark spots",
    },
    concernHints: {
      acne: "Look for calming, non-comedogenic formulas that help clear breakouts.",
      oily: "Lightweight, oil-control products keep shine down without stripping.",
      dry: "Prioritize hydration and barrier-repair ingredients.",
      sensitive: "Choose gentle, fragrance-light formulas to reduce irritation.",
      dullness: "Brightening and exfoliating care can revive a tired look.",
      aging: "Support firmness with antioxidants and gentle retinol alternatives.",
      pores: "Niacinamide and light textures help refine enlarged pores.",
      "dark spots": "Consistent brightening care helps even out tone over time.",
    },
    undertoneLabels: {
      Warm: "warm",
      Cool: "cool",
      Neutral: "neutral",
    },
    resultsInsightWithType:
      "Your skin looks {skinType} with a {undertone} undertone.",
    resultsInsightFallback: "Here’s what Aura found from your selfie.",
    resultsFocus: "Main focus: {concerns}.",
    makeupProfile: "Makeup profile",
    skinProfile: "Skin profile",
    scanQuality: "Scan quality",
    scanQualityGood: "Clear photo",
    scanQualityFair: "Fair photo",
    scanQualityLow: "Try better lighting",
    scanQualityHint: "Reflects photo clarity — not how healthy your skin is.",
    previewTitle: "First picks for you",
    previewHint: "Matched from your skin profile",
  },
  language: "Language",
  workspace: {
    loading: "Loading workspace...",
    signOut: "Sign out",
    profile: "Profile",
    collapseSidebar: "Collapse sidebar",
    expandSidebar: "Expand sidebar",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  dashboard: {
    affiliate: "Affiliate",
    admin: "Super Admin",
    nav: {
      overview: "Overview",
      referralLink: "Referral Link",
      products: "Products",
      scanLeads: "Scan Leads",
      analytics: "Analytics",
      apiKeys: "API Keys",
      usage: "Usage",
      spending: "Spending",
      billing: "Billing",
      invoices: "Invoices",
      affiliators: "Affiliators",
      finance: "Finance",
      settings: "Settings",
      profile: "Profile",
    },
    overview: {
      title: "Overview",
      subtitle: "Your referral performance from the last 30 days.",
      copyReferral: "Copy referral link",
      copied: "Copied",
      totalScans: "Total Scans",
      productMatches: "Product Matches",
      scanCreditsLeft: "Scan credits left",
      topPickRate: "Top Pick Rate",
      last30Days: "Last 30 days",
      matchRate: "{rate}% match rate",
      ofPlan: "of {limit} {plan} plan",
      usersWhoClicked: "Users who clicked View",
      scansThisWeek: "Scans this week",
      publicScanLink: "Public scan link",
      publicScanHint: "Share this link with followers. They can scan without logging in.",
      checkUsage: "Check usage quota →",
      recentLeads: "Recent scan leads",
      viewAll: "View all",
      noLeads: "No scan leads yet.",
      guest: "Guest",
      scanCompleted: "Scan completed",
      productMatchesCount: "{count} product matches",
    },
    pages: {
      link: {
        title: "Referral Link",
        subtitle: "Share your public scan page with followers.",
      },
      products: {
        title: "Products",
        subtitle: "Manage your makeup catalog and product matches.",
      },
      leads: {
        title: "Scan Leads",
        subtitle: "Followers who scanned via your referral link.",
      },
      analytics: {
        title: "Analytics",
        subtitle: "Referral funnel and product matches from real scan data.",
      },
      usage: {
        title: "Usage",
        subtitle: "Scan quota statistics and usage trends from the API.",
      },
      spending: {
        title: "Spending",
        subtitle: "Spending summary for scan credit packages.",
      },
      billing: {
        title: "Billing",
        subtitle: "Manage plan, payment method, and period quota.",
      },
      invoices: {
        title: "Invoices",
        subtitle: "Payment invoice history. Print or download PDF.",
      },
      finance: {
        title: "Finance",
        subtitle: "Package revenue and usage across all affiliators.",
      },
      profile: {
        title: "Profile",
        subtitle: "Your affiliate account details.",
      },
    },
  },
};

const id: Messages = {
  nav: {
    home: "Beranda",
    howItWorks: "Cara Kerja",
    philosophy: "Filosofi",
    pricing: "Harga",
    faq: "FAQ",
    docs: "Docs",
    login: "Masuk",
    becomeAffiliate: "Jadi Afiliator",
  },
  hero: {
    titleLine1: "Personalized Beauty.",
    titleLine2Before: "Made for",
    titleLine2Accent: "You.",
    subtitle:
      "AI menganalisis kulit Anda, memahami kebutuhannya, dan merekomendasikan skincare yang tepat.",
    haveScanCode: "Punya Kode Scan?",
    scanNow: "Scan Sekarang →",
    becomeAffiliate: "Jadi Afiliator",
    startEarning: "Mulai hasilkan hari ini →",
    scanCodePlaceholder: "Masukkan kode scan Anda",
    scanCodeAria: "Kode scan",
    trusted: "Dipercaya partner beauty",
    heroAlt:
      "Analisis kulit AuraAI di smartphone — memindai wajah dengan insight AI",
  },
  trust: {
    title: "Dipercaya partner beauty",
    analyses: "Analisis Kulit",
    partners: "Partner Beauty",
    helpful: "Pengguna merasa hasil kami bermanfaat",
  },
  howItWorks: {
    eyebrow: "Cara Kerja",
    title: "Lihat. Pahami. Pilih produk.",
    subtitle:
      "Dari satu selfie ke langkah jelas berikutnya — dalam tiga momen sederhana.",
    stepLabel: "LANGKAH",
    steps: [
      { title: "Scan", body: "Ambil selfie yang jelas." },
      {
        title: "Pahami",
        body: "AI menganalisis karakteristik kulit yang terlihat.",
      },
      {
        title: "Personalisasi",
        body: "Terima insight dan rekomendasi skincare.",
      },
    ],
    aiEyebrow: "Analisis Kulit AI",
    aiTitle: "AI canggih. Pemahaman kulit yang nyata.",
    aiBody:
      "AI kami meninjau berbagai faktor kulit untuk memberikan insight personal yang akurat dan bisa Anda percayai.",
    demoAlt:
      "Cara kerja AuraAI: scan selfie, AI menganalisis peta wajah 3D, lalu skor kulit dan concern utama",
    demo: [
      { title: "1. Scan", body: "Ambil selfie jelas untuk memulai." },
      {
        title: "2. AI Menganalisis",
        body: "Sinyal kulit dipetakan dalam hitungan detik.",
      },
      {
        title: "3. Lihat Hasil",
        body: "Skor kulit, concern, dan langkah berikutnya — mudah dibaca.",
      },
    ],
    skinScore: "Skor Kulit",
    topConcerns: "Concern utama: Dehidrasi · Tekstur",
  },
  philosophy: {
    eyebrow: "Filosofi",
    title: "The Aura Principle",
    principles: [
      {
        letter: "A",
        title: "Accurate",
        body: "Insight berbasis data, bukan asumsi.",
      },
      {
        letter: "U",
        title: "Understandable",
        body: "Analisis kompleks, dibuat sederhana.",
      },
      {
        letter: "R",
        title: "Reliable",
        body: "Pengalaman konsisten yang bisa dipercaya.",
      },
      {
        letter: "A",
        title: "Adaptive",
        body: "Kecerdasan yang berkembang di setiap insight.",
      },
    ],
  },
  affiliates: {
    eyebrow: "Untuk Afiliator",
    title: "Ubah setiap scan jadi peluang.",
    subtitle:
      "Bantu audiens memahami kulit mereka — dan kembangkan bisnis beauty yang lebih personal di setiap analisis.",
    cta: "Jadi Afiliator Sekarang →",
    steps: [
      { title: "Daftar", body: "Buat akun partner Anda." },
      { title: "Beli Kredit", body: "Pilih paket kredit scan." },
      { title: "Bagikan Link / QR", body: "Kirim ke audiens Anda." },
      { title: "Mereka Scan", body: "Follower dapat insight kulit AI." },
      { title: "Anda Tumbuh", body: "Pantau lead dan engagement." },
    ],
    dashboard: "DASHBOARD AFILIATOR",
    overview: "Ringkasan performa",
    thisMonth: "Bulan ini +238",
    totalScans: "Total Scan",
    activeFollowers: "Follower Aktif",
    scanCredits: "Kredit Scan",
    earnings: "Pendapatan",
    scanActivity: "Aktivitas Scan",
    topReferrals: "Referral Teratas",
    scansUnit: "scan",
  },
  pricing: {
    eyebrow: "Harga",
    title: "Kredit sederhana. Pertumbuhan fleksibel.",
    subtitle:
      "Beli kredit scan dan bagikan ke audiens Anda. Tanpa komitmen bulanan.",
    mostPopular: "Paling Populer",
    perScan: "/scan",
    getStarted: "Mulai",
    talkToUs: "Talk to us",
    customVolume: "Kuota custom · SLA disesuaikan",
    footnote: "Semakin besar paket Anda, semakin hemat biaya per scan.",
    features: {
      starter: [
        "1.000 kredit scan",
        "Berlaku 30 hari",
        "Link referral publik",
        "Riwayat lead dasar",
      ],
      growth: [
        "3.000 kredit scan",
        "Berlaku 30 hari",
        "Riwayat lead & analitik",
        "Nilai terbaik per scan",
      ],
      scale: [
        "7.000 kredit scan",
        "Berlaku 30 hari",
        "Suite analitik lengkap",
        "Dukungan prioritas",
      ],
      custom: [
        "Kuota scan sesuai kebutuhan",
        "Custom branding & white-label",
        "Dedicated success manager",
        "Custom API / SLA & onboarding",
      ],
    },
  },
  social: {
    eyebrow: "Bukti Sosial",
    title: "Apa Kata Partner Kami",
    quote:
      "“AuraAI membantu saya memberi rekomendasi yang lebih tepat, dan follower saya menyukainya!”",
    attribution: "— Sarah, Beauty Creator",
    quotes: [
      {
        quote:
          "“AuraAI membantu saya memberi rekomendasi yang lebih tepat, dan follower saya menyukainya!”",
        name: "Sarah",
        role: "Beauty Creator",
      },
      {
        quote:
          "“Sekarang saya merekomendasikan skincare berdasarkan profil kulit tiap pelanggan — bukan tebak-tebakan.”",
        name: "Dewi",
        role: "Pemilik Klinik",
      },
      {
        quote:
          "“Membagikan link scan membuat saran produk terasa personal, bukan generik.”",
        name: "Raka",
        role: "Partner Beauty",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Pertanyaan, terjawab.",
    subtitle: "Semua yang perlu Anda tahu sebelum bergabung sebagai partner beauty.",
    items: [
      {
        q: "Apakah AuraAI diagnosis medis?",
        a: "Tidak. AuraAI memberi beauty intelligence dari karakteristik kulit yang terlihat — untuk pemahaman, bukan saran medis.",
      },
      {
        q: "Bagaimana cara kerja kredit scan?",
        a: "Afiliator membeli paket kredit, lalu membagikan link atau QR. Setiap scan follower memakai satu kredit.",
      },
      {
        q: "Bisa scan tanpa akun?",
        a: "Ya. Follower bisa scan lewat link atau kode afiliator tanpa membuat akun sendiri.",
      },
      {
        q: "Bisakah upgrade paket nanti?",
        a: "Ya. Anda bisa membeli paket kredit tambahan kapan saja — tanpa ikatan bulanan.",
      },
    ],
  },
  cta: {
    title: "Siap membuat beauty lebih personal?",
    body: "Bergabunglah dengan ribuan partner beauty yang percaya AuraAI.",
    button: "Jadi Afiliator Sekarang →",
  },
  footer: {
    tagline: "Personalized Beauty, Made for You",
    disclaimer: "Insight untuk pemahaman — bukan diagnosis medis.",
    rights: "Hak cipta dilindungi.",
  },
  scan: {
    title: "Scan wajahmu",
    subtitle: "Unggah selfie yang jelas. Tidak perlu akun.",
    guestName: "Nama kamu (opsional)",
    guestNamePlaceholder: "contoh: Ayla",
    choosePhoto: "Pilih foto",
    takeSelfie: "Ambil selfie",
    analyze: "Analisis",
    analyzing: "Sedang menganalisis wajah…",
    analyzingHint: "Biasanya hanya beberapa detik.",
    analyzingSteps: [
      "Mendeteksi wajah",
      "Membaca skin tone & undertone",
      "Menganalisis kondisi kulit",
      "Mencocokkan produk yang pas",
    ],
    results: "Hasil analisis",
    skinTone: "Skin tone",
    undertone: "Undertone",
    faceShape: "Bentuk wajah",
    confidence: "Keyakinan",
    matches: "Produk yang cocok",
    noMatches: "Belum ada produk yang cocok.",
    scanAgain: "Scan lagi",
    missingTitle: "Scan ini butuh link referral",
    missingHint: "Buka link dari afiliator, atau masukkan kode scan mereka di bawah.",
    codePlaceholder: "Kode scan afiliator",
    continue: "Lanjut",
    invalidCode: "Kode scan tidak valid",
    needPhoto: "Pilih selfie dulu",
    error: "Scan gagal. Coba foto lain.",
    viewProduct: "Lihat produk",
    capture: "Ambil foto",
    closeCamera: "Tutup kamera",
    cameraError: "Kamera tidak tersedia di perangkat ini",
    cameraDenied: "Izin kamera ditolak. Izinkan akses kamera, lalu coba lagi.",
    stepsLabel: "Langkah scan",
    stepScan: "Scan",
    stepResults: "Hasil",
    stepProducts: "Rekomendasi produk",
    seeProducts: "Lihat rekomendasi produk",
    backToResults: "Kembali ke hasil",
    trainingConsent: "Saya setuju bantu Aura lebih baik lagi",
    trainingConsentHint:
      "Jika dicentang, foto selfie bisa disimpan untuk melatih AI adaptif Aura. Hapus centang jika hanya ingin dianalisis tanpa menyimpan foto.",
    skinType: "Tipe kulit",
    concerns: "Masalah kulit",
    concernLabels: {
      acne: "Jerawat",
      oily: "Berminyak",
      dry: "Kering",
      sensitive: "Sensitif",
      dullness: "Kusam",
      aging: "Penuaan",
      pores: "Pori-pori",
      "dark spots": "Flek hitam",
    },
    concernHints: {
      acne: "Pilih formula menenangkan, non-comedogenic yang membantu meredakan jerawat.",
      oily: "Produk ringan dengan oil-control menahan kilap tanpa membuat kulit kering.",
      dry: "Utamakan hidrasi dan bahan yang memperbaiki skin barrier.",
      sensitive: "Pilih formula lembut, minim fragrance agar kurang iritasi.",
      dullness: "Perawatan brightening dan eksfoliasi lembut bisa menghidupkan kembali wajah kusam.",
      aging: "Dukung kekencangan dengan antioksidan dan alternatif retinol yang lembut.",
      pores: "Niacinamide dan tekstur ringan membantu memperhalus pori-pori.",
      "dark spots": "Perawatan brightening konsisten membantu meratakan warna kulit.",
    },
    undertoneLabels: {
      Warm: "Hangat",
      Cool: "Dingin",
      Neutral: "Netral",
    },
    resultsInsightWithType:
      "Kulitmu terlihat {skinType} dengan undertone {undertone}.",
    resultsInsightFallback: "Ini yang ditemukan Aura dari selfiemu.",
    resultsFocus: "Fokus utama: {concerns}.",
    makeupProfile: "Profil makeup",
    skinProfile: "Profil kulit",
    scanQuality: "Kualitas scan",
    scanQualityGood: "Foto jelas",
    scanQualityFair: "Foto cukup",
    scanQualityLow: "Coba pencahayaan lebih baik",
    scanQualityHint: "Mengukur kejernihan foto — bukan skor kesehatan kulit.",
    previewTitle: "Pilihan awal untukmu",
    previewHint: "Dicocokkan dari profil kulitmu",
  },
  language: "Bahasa",
  workspace: {
    loading: "Memuat workspace...",
    signOut: "Keluar",
    profile: "Profil",
    collapseSidebar: "Ciutkan sidebar",
    expandSidebar: "Perluas sidebar",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
  },
  dashboard: {
    affiliate: "Afiliasi",
    admin: "Super Admin",
    nav: {
      overview: "Ringkasan",
      referralLink: "Link Referral",
      products: "Produk",
      scanLeads: "Scan Leads",
      analytics: "Analitik",
      apiKeys: "API Keys",
      usage: "Penggunaan",
      spending: "Pengeluaran",
      billing: "Tagihan",
      invoices: "Invoice",
      affiliators: "Afiliator",
      finance: "Keuangan",
      settings: "Pengaturan",
      profile: "Profil",
    },
    overview: {
      title: "Ringkasan",
      subtitle: "Performa referral Anda dalam 30 hari terakhir.",
      copyReferral: "Salin link referral",
      copied: "Tersalin",
      totalScans: "Total Scan",
      productMatches: "Produk Cocok",
      scanCreditsLeft: "Sisa kredit scan",
      topPickRate: "Rasio Top Pick",
      last30Days: "30 hari terakhir",
      matchRate: "Tingkat cocok {rate}%",
      ofPlan: "dari {limit} paket {plan}",
      usersWhoClicked: "Pengguna yang klik Lihat",
      scansThisWeek: "Scan minggu ini",
      publicScanLink: "Link scan publik",
      publicScanHint:
        "Bagikan link ini ke follower. Mereka bisa scan tanpa login.",
      checkUsage: "Cek usage kuota →",
      recentLeads: "Scan leads terbaru",
      viewAll: "Lihat semua",
      noLeads: "Belum ada scan leads.",
      guest: "Tamu",
      scanCompleted: "Scan selesai",
      productMatchesCount: "{count} produk cocok",
    },
    pages: {
      link: {
        title: "Link Referral",
        subtitle: "Bagikan halaman scan publik ke follower Anda.",
      },
      products: {
        title: "Produk",
        subtitle: "Kelola katalog makeup dan product match.",
      },
      leads: {
        title: "Scan Leads",
        subtitle: "Follower yang scan lewat link referral Anda.",
      },
      analytics: {
        title: "Analitik",
        subtitle: "Funnel referral dan product match dari data scan nyata.",
      },
      usage: {
        title: "Penggunaan",
        subtitle: "Statistik kuota scan dan tren pemakaian dari API.",
      },
      spending: {
        title: "Pengeluaran",
        subtitle: "Ringkasan pengeluaran paket kredit scan.",
      },
      billing: {
        title: "Tagihan",
        subtitle: "Kelola paket, metode pembayaran, dan kuota periode.",
      },
      invoices: {
        title: "Invoice",
        subtitle: "Riwayat invoice pembayaran. Cetak atau unduh PDF.",
      },
      finance: {
        title: "Keuangan",
        subtitle: "Pendapatan paket dan usage dari semua afiliator.",
      },
      profile: {
        title: "Profil",
        subtitle: "Detail akun afiliator Anda.",
      },
    },
  },
};

const ko: Messages = {
  ...en,
  language: "언어",
  nav: {
    home: "홈",
    howItWorks: "이용 방법",
    philosophy: "철학",
    pricing: "요금",
    faq: "FAQ",
    docs: "Docs",
    login: "로그인",
    becomeAffiliate: "파트너 되기",
  },
  scan: {
    ...en.scan,
    title: "얼굴을 스캔하세요",
    subtitle: "선명한 셀카를 올려주세요. 계정은 필요 없어요.",
    guestName: "이름 (선택)",
    guestNamePlaceholder: "예: 아일라",
    choosePhoto: "사진 선택",
    takeSelfie: "셀카 촬영",
    analyze: "분석하기",
    analyzing: "얼굴을 분석하는 중…",
    analyzingHint: "보통 몇 초면 끝나요.",
    analyzingSteps: [
      "얼굴 감지 중",
      "피부톤·언더톤 읽는 중",
      "피부 상태 분석 중",
      "맞는 제품 매칭 중",
    ],
    results: "분석 결과",
    skinTone: "피부톤",
    undertone: "언더톤",
    faceShape: "얼굴형",
    confidence: "신뢰도",
    matches: "추천 제품",
    noMatches: "아직 맞는 제품이 없어요.",
    scanAgain: "다시 스캔",
    missingTitle: "이 스캔에는 추천 링크가 필요해요",
    missingHint: "파트너 링크를 열거나, 아래에 스캔 코드를 입력하세요.",
    codePlaceholder: "파트너 스캔 코드",
    continue: "계속",
    invalidCode: "잘못된 스캔 코드예요",
    needPhoto: "먼저 셀카를 선택해 주세요",
    error: "스캔에 실패했어요. 다른 사진으로 시도해 보세요.",
    viewProduct: "제품 보기",
    capture: "촬영",
    closeCamera: "카메라 닫기",
    cameraError: "이 기기에서는 카메라를 사용할 수 없어요",
    cameraDenied: "카메라 권한이 거부됐어요. 허용한 뒤 다시 시도해 주세요.",
    stepsLabel: "스캔 단계",
    stepScan: "스캔",
    stepResults: "결과",
    stepProducts: "제품 추천",
    seeProducts: "제품 추천 보기",
    backToResults: "결과로 돌아가기",
    trainingConsent: "Aura가 더 나아지도록 도울게요",
    trainingConsentHint:
      "체크하면 셀카가 Aura 적응형 AI 학습에 쓰일 수 있어요. 저장 없이 분석만 원하면 체크를 해제하세요.",
    skinType: "피부 타입",
    concerns: "피부 고민",
    concernLabels: {
      acne: "여드름",
      oily: "지성",
      dry: "건성",
      sensitive: "민감",
      dullness: "칙기 부족",
      aging: "노화",
      pores: "모공",
      "dark spots": "잡티",
    },
    concernHints: {
      acne: "진정·논코메도제닉 포뮬러로 트러블을 가라앉혀 보세요.",
      oily: "가벼운 오일 컨트롤 제품이 번들거림을 줄여줘요.",
      dry: "수분과 장벽 케어 성분을 우선하세요.",
      sensitive: "향료가 적고 순한 포뮬러로 자극을 줄이세요.",
      dullness: "브라이트닝·부드러운 각질 케어가 생기를 살려줘요.",
      aging: "항산화·순한 레티놀 대체 성분으로 탄력을 도와요.",
      pores: "나이아신아마이드와 가벼운 텍스처가 모공을 정돈해요.",
      "dark spots": "꾸준한 브라이트닝 케어가 톤을 고르게 해요.",
    },
    undertoneLabels: {
      Warm: "웜",
      Cool: "쿨",
      Neutral: "뉴트럴",
    },
    resultsInsightWithType: "피부는 {skinType}이고 언더톤은 {undertone}에 가까워요.",
    resultsInsightFallback: "셀카에서 Aura가 찾은 결과예요.",
    resultsFocus: "주요 고민: {concerns}.",
    makeupProfile: "메이크업 프로필",
    skinProfile: "피부 프로필",
    scanQuality: "스캔 품질",
    scanQualityGood: "선명한 사진",
    scanQualityFair: "보통 사진",
    scanQualityLow: "조명을 더 밝게 해보세요",
    scanQualityHint: "사진 선명도 기준이에요 — 피부 건강 점수가 아니에요.",
    previewTitle: "우선 추천",
    previewHint: "피부 프로필에 맞춰 골랐어요",
  },
  workspace: {
    loading: "워크스페이스 불러오는 중...",
    signOut: "로그아웃",
    profile: "프로필",
    collapseSidebar: "사이드바 접기",
    expandSidebar: "사이드바 펼치기",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
  },
  dashboard: {
    affiliate: "파트너",
    admin: "슈퍼 관리자",
    nav: {
      overview: "개요",
      referralLink: "추천 링크",
      products: "제품",
      scanLeads: "스캔 리드",
      analytics: "분석",
      apiKeys: "API 키",
      usage: "사용량",
      spending: "지출",
      billing: "결제",
      invoices: "청구서",
      affiliators: "파트너 목록",
      finance: "재무",
      settings: "설정",
      profile: "프로필",
    },
    overview: {
      title: "개요",
      subtitle: "최근 30일 추천 성과입니다.",
      copyReferral: "추천 링크 복사",
      copied: "복사됨",
      totalScans: "총 스캔",
      productMatches: "제품 매칭",
      scanCreditsLeft: "남은 스캔 크레딧",
      topPickRate: "탑픽 비율",
      last30Days: "최근 30일",
      matchRate: "매칭률 {rate}%",
      ofPlan: "{limit} · {plan} 플랜",
      usersWhoClicked: "보기 클릭 사용자",
      scansThisWeek: "이번 주 스캔",
      publicScanLink: "공개 스캔 링크",
      publicScanHint:
        "이 링크를 팔로워와 공유하세요. 로그인 없이 스캔할 수 있습니다.",
      checkUsage: "사용량 확인 →",
      recentLeads: "최근 스캔 리드",
      viewAll: "전체 보기",
      noLeads: "아직 스캔 리드가 없습니다.",
      guest: "게스트",
      scanCompleted: "스캔 완료",
      productMatchesCount: "제품 매칭 {count}개",
    },
    pages: {
      link: {
        title: "추천 링크",
        subtitle: "팔로워와 공개 스캔 페이지를 공유하세요.",
      },
      products: {
        title: "제품",
        subtitle: "메이크업 카탈로그와 제품 매칭을 관리하세요.",
      },
      leads: {
        title: "스캔 리드",
        subtitle: "추천 링크로 스캔한 팔로워입니다.",
      },
      analytics: {
        title: "분석",
        subtitle: "실제 스캔 데이터 기반 추천 퍼널과 제품 매칭입니다.",
      },
      usage: {
        title: "사용량",
        subtitle: "스캔 할당량 통계와 API 사용 추세입니다.",
      },
      spending: {
        title: "지출",
        subtitle: "스캔 크레딧 패키지 지출 요약입니다.",
      },
      billing: {
        title: "결제",
        subtitle: "플랜, 결제 수단, 기간 할당량을 관리하세요.",
      },
      invoices: {
        title: "청구서",
        subtitle: "결제 청구서 내역. PDF를 인쇄하거나 다운로드하세요.",
      },
      finance: {
        title: "재무",
        subtitle: "전체 파트너의 패키지 매출과 사용률입니다.",
      },
      profile: {
        title: "프로필",
        subtitle: "파트너 계정 정보입니다.",
      },
    },
  },
};

export const messages: Record<LocaleCode, Messages> = {
  en,
  id,
  ko,
};
