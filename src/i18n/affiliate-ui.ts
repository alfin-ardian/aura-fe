import type { LocaleCode } from "@/i18n/locales";
import { useLocale } from "@/i18n/locale-provider";

type AffiliateUi = {
  link: {
    publicLink: string;
    loginRequired: string;
    copyLink: string;
    copied: string;
    howItWorks: string;
    steps: [string, string, string];
    loginAgain: string;
    copySuccess: string;
    copyFail: string;
  };
  products: {
    addManual: string;
    searchPlaceholder: string;
    searchAi: string;
    searching: string;
    colProduct: string;
    colBrand: string;
    colCategory: string;
    colReviews: string;
    colSource: string;
    colActions: string;
    myCatalog: string;
    database: string;
    loading: string;
    empty: string;
    edit: string;
    remove: string;
    add: string;
    showMyCatalog: string;
    resultPrefix: string;
    resultAi: string;
    resultSoco: string;
    resultDb: string;
    modalAdd: string;
    modalEdit: string;
    cancel: string;
    save: string;
    saving: string;
    reviewsAtSoco: string;
    catFaceSerum: string;
    catLipCream: string;
    fieldName: string;
    fieldBrand: string;
    fieldDescription: string;
    fieldImageUrl: string;
    fieldIngredients: string;
    fieldUses: string;
    lookupPlaceholder: string;
    lookupLoading: string;
    lookupPick: string;
    lookupEmpty: string;
    lookupHint: string;
    minChars: string;
    backendOffline: string;
    loadFail: string;
    researchFail: string;
    notFound: string;
    savedAi: string;
    foundAi: string;
    foundSoco: string;
    foundDb: string;
    brandNameRequired: string;
    added: string;
    updated: string;
    saveFail: string;
    confirmDelete: string;
    deleted: string;
    deleteFail: string;
    adopted: string;
    adoptFail: string;
  };
  leads: {
    searchPlaceholder: string;
    search: string;
    colGuest: string;
    colSummary: string;
    colConfidence: string;
    colTopProduct: string;
    colDate: string;
    loading: string;
    empty: string;
    guest: string;
    pagination: string;
    prev: string;
    next: string;
    matchedProducts: string;
    noMatchedProducts: string;
    confidenceLabel: string;
  };
  billing: {
    viewInvoices: string;
    viewInvoicesArrow: string;
    loading: string;
    errorTitle: string;
    errorDescription: string;
    promoTitle: string;
    promoBody: string;
    promoCta: string;
    promoClose: string;
    pricePerMonth: string;
    creditsPerPeriod: string;
    autoRenew: string;
    endsOn: string;
    adjustPlan: string;
    payment: string;
    paymentProvider: string;
    paymentMethods: string;
    managePayment: string;
    paymentToastTitle: string;
    paymentToastBody: string;
    includedUsage: string;
    colItem: string;
    colAllowance: string;
    colUsage: string;
    scanCredits: string;
    productMatches: string;
    referralAnalytics: string;
    scansAllowance: string;
    unlimited: string;
    included: string;
    remainingQuota: string;
  };
  invoices: {
    billing: string;
    buyQuota: string;
    loading: string;
    errorTitle: string;
    errorDescription: string;
    allInvoices: string;
    empty: string;
    colNumber: string;
    colPlan: string;
    colDate: string;
    colStatus: string;
    colTotal: string;
    detailTitle: string;
    selectPrompt: string;
    noneSelected: string;
    loadingDetail: string;
    labelPlan: string;
    labelMethod: string;
    labelPaidAt: string;
    labelPeriod: string;
    colDescription: string;
    colAmount: string;
    total: string;
    printPdf: string;
    statusPaid: string;
    statusPending: string;
    statusFailed: string;
    planLine: string;
    vatLine: string;
    close: string;
    print: string;
    downloadPdf: string;
    preparingPdf: string;
    pdfPreviewTitle: string;
  };
  spending: {
    openBilling: string;
    loading: string;
    errorTitle: string;
    errorDescription: string;
    monthToDate: string;
    projectedMonth: string;
    averageMonth: string;
    previousMonth: string;
    vsLastMonth: string;
    vsLastMonthDelta: string;
    projectedHint: string;
    averageHint: string;
    previousHint: string;
    trendTitle: string;
    recentCharges: string;
    emptyCharges: string;
    colInvoice: string;
    colPlan: string;
    colDate: string;
    colStatus: string;
    colAmount: string;
  };
  usage: {
    viewPlans: string;
    loading: string;
    errorTitle: string;
    errorDescription: string;
    activePlan: string;
    used: string;
    period: string;
    renew: string;
    quotaUsage: string;
    remainingScans: string;
    projectedDays: string;
    quota: string;
    planOf: string;
    avgPerDay: string;
    last14Days: string;
    peak: string;
    matchRate: string;
    matchRateHint: string;
    trendTitle: string;
    trendSubtitle: string;
    sourceTitle: string;
    sourceSubtitle: string;
    channelReferral: string;
    channelQr: string;
    weeklyTitle: string;
    weekLabel: string;
    upgradeTitle: string;
    upgradeSubtitle: string;
    popular: string;
    active: string;
    buyAgain: string;
    choosePlan: string;
    scansPerScan: string;
    noPlan: string;
    planDescStarter: string;
    planDescGrowth: string;
    planDescScale: string;
    chartScan: string;
    chartMatch: string;
  };
  analytics: {
    loading: string;
    errorTitle: string;
    errorDescription: string;
    dailyActivity: string;
    weeklyActivity: string;
    monthlyActivity: string;
    emptyActivity: string;
    referralFunnel: string;
    funnelScans: string;
    funnelWithMatches: string;
    funnelTopPicks: string;
    topUndertones: string;
    emptyUndertones: string;
    topCategories: string;
    emptyCategories: string;
    topProducts: string;
    emptyProducts: string;
    matchesCount: string;
    undertoneWarm: string;
    undertoneNeutral: string;
    undertoneCool: string;
  };
};

const en: AffiliateUi = {
  link: {
    publicLink: "Your public link",
    loginRequired: "Login required",
    copyLink: "Copy link",
    copied: "Copied",
    howItWorks: "How it works",
    steps: [
      "Copy and share your referral link",
      "Follower uploads a selfie (no login)",
      "Lead appears in Scan Leads with product matches",
    ],
    loginAgain: "Log in again to get your referral link",
    copySuccess: "Referral link copied",
    copyFail: "Could not copy link",
  },
  products: {
    addManual: "Add manually",
    searchPlaceholder: "Search products, e.g. skintific 5x ceramide",
    searchAi: "Search / AI Research",
    searching: "Searching...",
    colProduct: "Product",
    colBrand: "Brand",
    colCategory: "Category",
    colReviews: "Reviews",
    colSource: "Source",
    colActions: "Actions",
    myCatalog: "My catalog",
    database: "Database",
    loading: "Loading catalog...",
    empty: "No products yet. Search a product name for AI to fill the catalog, or add manually.",
    edit: "Edit",
    remove: "Delete",
    add: "Add",
    showMyCatalog: "Show my catalog",
    resultPrefix: "Results from",
    resultAi: "AI research",
    resultSoco: "SOCO",
    resultDb: "database",
    modalAdd: "Add product",
    modalEdit: "Edit product",
    cancel: "Cancel",
    save: "Save",
    saving: "Saving...",
    reviewsAtSoco: "{count} reviews on SOCO/Sociolla",
    catFaceSerum: "Face Serum",
    catLipCream: "Lip Cream",
    fieldName: "Product name",
    fieldBrand: "Brand",
    fieldDescription: "Description",
    fieldImageUrl: "Image URL",
    fieldIngredients: "Ingredients (comma-separated)",
    fieldUses: "Uses (one per line)",
    lookupPlaceholder: "Search product, e.g. azarine hydrasoothe",
    lookupLoading: "Searching database / SOCO / AI...",
    lookupPick: "{count} results from {source} — pick one",
    lookupEmpty: "Not found. Try the official brand/product spelling.",
    lookupHint: "Type at least 2 characters. Results show as a list with images.",
    minChars: "Enter at least 2 characters",
    backendOffline: "Backend is not connected. Start the API and log in again as Affiliate.",
    loadFail: "Failed to load products",
    researchFail: "Product research failed",
    notFound: "No products found for \"{q}\". Try the official brand/product name.",
    savedAi: "Not in the database — AI research results were saved to your catalog",
    foundAi: "Product found via AI research",
    foundSoco: "{count} products found on SOCO/Sociolla",
    foundDb: "{count} products found in the database",
    brandNameRequired: "Brand and name are required",
    added: "Product added",
    updated: "Product updated",
    saveFail: "Failed to save",
    confirmDelete: "Delete {name}?",
    deleted: "Product deleted",
    deleteFail: "Failed to delete",
    adopted: "Added to your catalog",
    adoptFail: "Failed to add",
  },
  leads: {
    searchPlaceholder: "Search name, undertone, or product",
    search: "Search",
    colGuest: "Guest",
    colSummary: "Summary",
    colConfidence: "Confidence",
    colTopProduct: "Top product",
    colDate: "Date",
    loading: "Loading scan leads...",
    empty: "No leads yet. Share your referral link so followers can scan.",
    guest: "Guest",
    pagination: "{total} leads · page {page}/{pageCount}",
    prev: "Prev",
    next: "Next",
    matchedProducts: "Matched products",
    noMatchedProducts: "No matched products yet.",
    confidenceLabel: "{pct}% confident",
  },
  billing: {
    viewInvoices: "View invoices",
    viewInvoicesArrow: "View invoices →",
    loading: "Loading billing...",
    errorTitle: "Billing not connected",
    errorDescription:
      "Billing API is unavailable. Make sure the backend is running on localhost:3000.",
    promoTitle: "Save 20% with annual billing",
    promoBody:
      "Pay once a year for Growth or Scale and save up to 20%.",
    promoCta: "Upgrade now",
    promoClose: "Close promo",
    pricePerMonth: "{price}/mo",
    creditsPerPeriod: "{quota} scan credits per period.",
    autoRenew: "Subscription renews automatically on {date}.",
    endsOn: "Ends on {date}.",
    adjustPlan: "Adjust plan",
    payment: "Payment",
    paymentProvider: "Aura Pay (simulation)",
    paymentMethods: "QRIS · VA · E-wallet",
    managePayment: "Manage payment",
    paymentToastTitle: "Simulated payment portal",
    paymentToastBody:
      "Gateway is not connected yet. Plan checkout is still available on the Usage page.",
    includedUsage: "Included Usage",
    colItem: "Item",
    colAllowance: "Allowance",
    colUsage: "Usage",
    scanCredits: "Scan credits",
    productMatches: "Product matches",
    referralAnalytics: "Referral analytics",
    scansAllowance: "{quota} scans",
    unlimited: "Unlimited",
    included: "Included",
    remainingQuota: "Remaining: {remaining} / {quota} scans",
  },
  invoices: {
    billing: "Billing",
    buyQuota: "Buy quota",
    loading: "Loading invoices...",
    errorTitle: "Invoices not connected",
    errorDescription:
      "Invoices API is unavailable. Make sure the backend is running on localhost:3000.",
    allInvoices: "All invoices",
    empty: "No invoices yet. After checkout, invoices will appear here.",
    colNumber: "Number",
    colPlan: "Plan",
    colDate: "Date",
    colStatus: "Status",
    colTotal: "Total",
    detailTitle: "Invoice detail",
    selectPrompt: "Select an invoice from the list",
    noneSelected: "No invoice selected.",
    loadingDetail: "Loading detail...",
    labelPlan: "Plan",
    labelMethod: "Method",
    labelPaidAt: "Paid at",
    labelPeriod: "Period",
    colDescription: "Description",
    colAmount: "Amount",
    total: "Total",
    printPdf: "Print / Preview PDF",
    statusPaid: "paid",
    statusPending: "pending",
    statusFailed: "failed",
    planLine: "Plan {detail}",
    vatLine: "VAT 11%",
    close: "Close",
    print: "Print",
    downloadPdf: "Download PDF",
    preparingPdf: "Preparing PDF...",
    pdfPreviewTitle: "Invoice PDF preview",
  },
  spending: {
    openBilling: "Open Billing →",
    loading: "Loading spending...",
    errorTitle: "Spending not connected",
    errorDescription:
      "Spending API is unavailable. Make sure the backend is running on localhost:3000.",
    monthToDate: "Month to date",
    projectedMonth: "Projected month",
    averageMonth: "Average / month",
    previousMonth: "Previous month",
    vsLastMonth: "vs last month",
    vsLastMonthDelta: "{delta} vs last month",
    projectedHint: "End-of-month estimate",
    averageHint: "Last 6 months",
    previousHint: "Total payments",
    trendTitle: "6-month trend",
    recentCharges: "Recent charges",
    emptyCharges: "No payments yet. Checkout a plan on the Usage page to get started.",
    colInvoice: "Invoice",
    colPlan: "Plan",
    colDate: "Date",
    colStatus: "Status",
    colAmount: "Amount",
  },
  usage: {
    viewPlans: "View plans",
    loading: "Loading quota stats...",
    errorTitle: "Usage not connected",
    errorDescription:
      "Quota API is unavailable. Make sure the backend is running on localhost:3000.",
    activePlan: "Active plan",
    used: "Used",
    period: "Period {period}",
    renew: "Renews {date}",
    quotaUsage: "Quota usage",
    remainingScans: "{remaining} scans left",
    projectedDays: "projected to last {days} more days",
    quota: "Quota",
    planOf: "Plan {name}",
    avgPerDay: "Average / day",
    last14Days: "Last 14 days",
    peak: "Peak",
    matchRate: "Match rate",
    matchRateHint: "Scans with recommendations",
    trendTitle: "Last 14 days trend",
    trendSubtitle: "Daily scans vs matches",
    sourceTitle: "Scan sources",
    sourceSubtitle: "Referral link vs QR code",
    channelReferral: "Referral link",
    channelQr: "QR code",
    weeklyTitle: "Weekly usage",
    weekLabel: "Week {n}",
    upgradeTitle: "Upgrade quota",
    upgradeSubtitle: "Choose a credit plan, then continue to checkout.",
    popular: "Popular",
    active: "Active",
    buyAgain: "Buy again",
    choosePlan: "Choose plan",
    scansPerScan: "{scans} scans · ~{perScan}/scan",
    noPlan: "No active plan",
    planDescStarter: "Good for trials and small audiences.",
    planDescGrowth: "Best value for partners active every week.",
    planDescScale: "For clinics, studios, and high-volume partners.",
    chartScan: "Scan",
    chartMatch: "Match",
  },
  analytics: {
    loading: "Loading analytics...",
    errorTitle: "Analytics not connected",
    errorDescription:
      "Analytics API is unavailable. Make sure the backend is running on localhost:3000.",
    dailyActivity: "Daily activity",
    weeklyActivity: "Weekly activity",
    monthlyActivity: "Monthly activity",
    emptyActivity: "No scan activity in this period.",
    referralFunnel: "Referral funnel",
    funnelScans: "Scans",
    funnelWithMatches: "With matches",
    funnelTopPicks: "Top picks clicked",
    topUndertones: "Top undertones",
    emptyUndertones: "No undertone data yet.",
    topCategories: "Top categories matched",
    emptyCategories: "No category data yet.",
    topProducts: "Top matched products",
    emptyProducts: "No product matches in this period.",
    matchesCount: "{count} matches",
    undertoneWarm: "Warm",
    undertoneNeutral: "Neutral",
    undertoneCool: "Cool",
  },
};

const id: AffiliateUi = {
  link: {
    publicLink: "Link publik Anda",
    loginRequired: "Perlu login",
    copyLink: "Salin link",
    copied: "Tersalin",
    howItWorks: "Cara kerja",
    steps: [
      "Salin dan bagikan link referral Anda",
      "Follower unggah selfie (tanpa login)",
      "Lead muncul di Scan Leads beserta produk yang cocok",
    ],
    loginAgain: "Login ulang untuk mendapatkan referral link",
    copySuccess: "Referral link disalin",
    copyFail: "Gagal menyalin link",
  },
  products: {
    addManual: "Tambah manual",
    searchPlaceholder: "Cari produk, contoh: skintific 5x ceramide",
    searchAi: "Cari / Riset AI",
    searching: "Mencari...",
    colProduct: "Produk",
    colBrand: "Brand",
    colCategory: "Kategori",
    colReviews: "Ulasan",
    colSource: "Sumber",
    colActions: "Aksi",
    myCatalog: "Katalog saya",
    database: "Database",
    loading: "Memuat katalog...",
    empty:
      "Belum ada produk. Cari nama produk agar AI mengisi katalog, atau tambah manual.",
    edit: "Edit",
    remove: "Hapus",
    add: "Tambah",
    showMyCatalog: "Tampilkan katalog saya",
    resultPrefix: "Hasil",
    resultAi: "riset AI",
    resultSoco: "SOCO",
    resultDb: "database",
    modalAdd: "Tambah produk",
    modalEdit: "Edit produk",
    cancel: "Batal",
    save: "Simpan",
    saving: "Menyimpan...",
    reviewsAtSoco: "{count} ulasan di SOCO/Sociolla",
    catFaceSerum: "Face Serum",
    catLipCream: "Lip Cream",
    fieldName: "Nama produk",
    fieldBrand: "Brand",
    fieldDescription: "Deskripsi",
    fieldImageUrl: "URL gambar",
    fieldIngredients: "Ingredients (pisah koma)",
    fieldUses: "Kegunaan (satu baris satu item)",
    lookupPlaceholder: "Cari produk, contoh: azarine hydrasoothe",
    lookupLoading: "Mencari di database / SOCO / AI...",
    lookupPick: "{count} hasil {source} — pilih salah satu",
    lookupEmpty: "Tidak ditemukan. Coba ejaan resmi brand/produk.",
    lookupHint: "Ketik minimal 2 karakter. Hasil tampil sebagai daftar dengan gambar.",
    minChars: "Ketik minimal 2 karakter",
    backendOffline:
      "Backend belum terhubung. Jalankan API lalu login ulang sebagai Affiliate.",
    loadFail: "Gagal memuat produk",
    researchFail: "Riset produk gagal",
    notFound: "Tidak menemukan produk untuk \"{q}\". Coba nama resmi brand/produk.",
    savedAi: "Produk tidak ada di database, hasil riset AI disimpan ke katalog Anda",
    foundAi: "Produk ditemukan via riset AI",
    foundSoco: "{count} produk ditemukan di SOCO/Sociolla",
    foundDb: "{count} produk ditemukan di database",
    brandNameRequired: "Brand dan nama wajib diisi",
    added: "Produk ditambahkan",
    updated: "Produk diperbarui",
    saveFail: "Gagal menyimpan",
    confirmDelete: "Hapus {name}?",
    deleted: "Produk dihapus",
    deleteFail: "Gagal menghapus",
    adopted: "Ditambahkan ke katalog Anda",
    adoptFail: "Gagal menambahkan",
  },
  leads: {
    searchPlaceholder: "Cari nama, undertone, atau produk",
    search: "Cari",
    colGuest: "Tamu",
    colSummary: "Ringkasan",
    colConfidence: "Keyakinan",
    colTopProduct: "Produk teratas",
    colDate: "Tanggal",
    loading: "Memuat scan leads...",
    empty: "Belum ada lead. Bagikan referral link agar follower bisa scan.",
    guest: "Tamu",
    pagination: "{total} lead · halaman {page}/{pageCount}",
    prev: "Sebelumnya",
    next: "Berikutnya",
    matchedProducts: "Produk yang cocok",
    noMatchedProducts: "Belum ada produk ter-match.",
    confidenceLabel: "{pct}% yakin",
  },
  billing: {
    viewInvoices: "Lihat invoices",
    viewInvoicesArrow: "Lihat invoices →",
    loading: "Memuat billing...",
    errorTitle: "Billing belum terhubung",
    errorDescription:
      "API billing belum bisa diakses. Pastikan backend berjalan di localhost:3000.",
    promoTitle: "Hemat 20% dengan billing tahunan",
    promoBody:
      "Bayar sekali setahun untuk paket Growth atau Scale dan hemat hingga 20%.",
    promoCta: "Upgrade sekarang",
    promoClose: "Tutup promo",
    pricePerMonth: "{price}/bln",
    creditsPerPeriod: "{quota} scan credits per periode.",
    autoRenew: "Langganan diperpanjang otomatis pada {date}.",
    endsOn: "Berakhir pada {date}.",
    adjustPlan: "Sesuaikan paket",
    payment: "Pembayaran",
    paymentProvider: "Aura Pay (simulasi)",
    paymentMethods: "QRIS · VA · E-wallet",
    managePayment: "Kelola pembayaran",
    paymentToastTitle: "Portal pembayaran simulasi",
    paymentToastBody:
      "Gateway belum terhubung. Checkout paket tetap tersedia di halaman Usage.",
    includedUsage: "Kuota termasuk",
    colItem: "Item",
    colAllowance: "Kuota",
    colUsage: "Pemakaian",
    scanCredits: "Scan credits",
    productMatches: "Product matches",
    referralAnalytics: "Referral analytics",
    scansAllowance: "{quota} scans",
    unlimited: "Unlimited",
    included: "Termasuk",
    remainingQuota: "Sisa kuota: {remaining} / {quota} scans",
  },
  invoices: {
    billing: "Billing",
    buyQuota: "Beli kuota",
    loading: "Memuat invoices...",
    errorTitle: "Invoices belum terhubung",
    errorDescription:
      "API invoices belum bisa diakses. Pastikan backend berjalan di localhost:3000.",
    allInvoices: "Semua invoice",
    empty: "Belum ada invoice. Setelah checkout, invoice akan muncul di sini.",
    colNumber: "Nomor",
    colPlan: "Paket",
    colDate: "Tanggal",
    colStatus: "Status",
    colTotal: "Total",
    detailTitle: "Detail invoice",
    selectPrompt: "Pilih invoice dari daftar",
    noneSelected: "Tidak ada invoice yang dipilih.",
    loadingDetail: "Memuat detail...",
    labelPlan: "Paket",
    labelMethod: "Metode",
    labelPaidAt: "Dibayar pada",
    labelPeriod: "Periode",
    colDescription: "Deskripsi",
    colAmount: "Jumlah",
    total: "Total",
    printPdf: "Cetak / Preview PDF",
    statusPaid: "dibayar",
    statusPending: "pending",
    statusFailed: "gagal",
    planLine: "Paket {detail}",
    vatLine: "PPN 11%",
    close: "Tutup",
    print: "Cetak",
    downloadPdf: "Download PDF",
    preparingPdf: "Menyiapkan PDF...",
    pdfPreviewTitle: "Preview PDF invoice",
  },
  spending: {
    openBilling: "Buka Billing →",
    loading: "Memuat spending...",
    errorTitle: "Spending belum terhubung",
    errorDescription:
      "API spending belum bisa diakses. Pastikan backend berjalan di localhost:3000.",
    monthToDate: "Bulan berjalan",
    projectedMonth: "Proyeksi bulan ini",
    averageMonth: "Rata-rata / bulan",
    previousMonth: "Bulan lalu",
    vsLastMonth: "vs bulan lalu",
    vsLastMonthDelta: "{delta} vs bulan lalu",
    projectedHint: "Estimasi akhir bulan",
    averageHint: "6 bulan terakhir",
    previousHint: "Total pembayaran",
    trendTitle: "Tren 6 bulan",
    recentCharges: "Pembayaran terbaru",
    emptyCharges:
      "Belum ada pembayaran. Checkout paket di halaman Usage untuk mulai.",
    colInvoice: "Invoice",
    colPlan: "Paket",
    colDate: "Tanggal",
    colStatus: "Status",
    colAmount: "Jumlah",
  },
  usage: {
    viewPlans: "Lihat paket",
    loading: "Memuat statistik kuota...",
    errorTitle: "Usage belum terhubung",
    errorDescription:
      "API kuota belum bisa diakses. Pastikan backend berjalan di localhost:3000.",
    activePlan: "Paket aktif",
    used: "Terpakai",
    period: "Periode {period}",
    renew: "Renew {date}",
    quotaUsage: "Penggunaan kuota",
    remainingScans: "Sisa {remaining} scan",
    projectedDays: "proyeksi cukup {days} hari lagi",
    quota: "Kuota",
    planOf: "Paket {name}",
    avgPerDay: "Rata-rata / hari",
    last14Days: "14 hari terakhir",
    peak: "Puncak",
    matchRate: "Match rate",
    matchRateHint: "Scan yang dapat rekomendasi",
    trendTitle: "Tren 14 hari terakhir",
    trendSubtitle: "Scan vs match harian",
    sourceTitle: "Sumber scan",
    sourceSubtitle: "Link referral vs QR code",
    channelReferral: "Link referral",
    channelQr: "QR code",
    weeklyTitle: "Pemakaian per minggu",
    weekLabel: "Minggu {n}",
    upgradeTitle: "Upgrade kuota",
    upgradeSubtitle: "Pilih paket kredit, lalu lanjut ke checkout.",
    popular: "Populer",
    active: "Aktif",
    buyAgain: "Beli lagi",
    choosePlan: "Pilih paket",
    scansPerScan: "{scans} scan · ~{perScan}/scan",
    noPlan: "Belum berlangganan",
    planDescStarter: "Cocok untuk uji coba dan audiens kecil.",
    planDescGrowth: "Paling hemat untuk partner yang aktif setiap minggu.",
    planDescScale: "Untuk klinik, studio, dan partner volume tinggi.",
    chartScan: "Scan",
    chartMatch: "Match",
  },
  analytics: {
    loading: "Memuat analytics...",
    errorTitle: "Analytics belum terhubung",
    errorDescription:
      "API analytics belum bisa diakses. Pastikan backend berjalan di localhost:3000.",
    dailyActivity: "Aktivitas harian",
    weeklyActivity: "Aktivitas mingguan",
    monthlyActivity: "Aktivitas bulanan",
    emptyActivity: "Belum ada aktivitas scan pada periode ini.",
    referralFunnel: "Funnel referral",
    funnelScans: "Scan",
    funnelWithMatches: "Dengan match",
    funnelTopPicks: "Top pick diklik",
    topUndertones: "Undertone teratas",
    emptyUndertones: "Belum ada data undertone.",
    topCategories: "Kategori match teratas",
    emptyCategories: "Belum ada data kategori.",
    topProducts: "Produk match teratas",
    emptyProducts: "Belum ada product match pada periode ini.",
    matchesCount: "{count} match",
    undertoneWarm: "Warm",
    undertoneNeutral: "Neutral",
    undertoneCool: "Cool",
  },
};

const ko: AffiliateUi = {
  link: {
    publicLink: "공개 링크",
    loginRequired: "로그인이 필요합니다",
    copyLink: "링크 복사",
    copied: "복사됨",
    howItWorks: "이용 방법",
    steps: [
      "추천 링크를 복사해 공유하세요",
      "팔로워가 셀피를 업로드합니다 (로그인 불필요)",
      "스캔 리드에 제품 매칭과 함께 표시됩니다",
    ],
    loginAgain: "추천 링크를 받으려면 다시 로그인하세요",
    copySuccess: "추천 링크가 복사되었습니다",
    copyFail: "링크를 복사할 수 없습니다",
  },
  products: {
    addManual: "수동 추가",
    searchPlaceholder: "제품 검색 예: skintific 5x ceramide",
    searchAi: "검색 / AI 리서치",
    searching: "검색 중...",
    colProduct: "제품",
    colBrand: "브랜드",
    colCategory: "카테고리",
    colReviews: "리뷰",
    colSource: "출처",
    colActions: "작업",
    myCatalog: "내 카탈로그",
    database: "데이터베이스",
    loading: "카탈로그 불러오는 중...",
    empty: "제품이 없습니다. 제품명을 검색해 AI가 채우게 하거나 수동으로 추가하세요.",
    edit: "수정",
    remove: "삭제",
    add: "추가",
    showMyCatalog: "내 카탈로그 보기",
    resultPrefix: "결과",
    resultAi: "AI 리서치",
    resultSoco: "SOCO",
    resultDb: "데이터베이스",
    modalAdd: "제품 추가",
    modalEdit: "제품 수정",
    cancel: "취소",
    save: "저장",
    saving: "저장 중...",
    reviewsAtSoco: "SOCO/Sociolla 리뷰 {count}개",
    catFaceSerum: "페이스 세럼",
    catLipCream: "립 크림",
    fieldName: "제품명",
    fieldBrand: "브랜드",
    fieldDescription: "설명",
    fieldImageUrl: "이미지 URL",
    fieldIngredients: "성분 (쉼표로 구분)",
    fieldUses: "용도 (줄마다 하나)",
    lookupPlaceholder: "제품 검색 예: azarine hydrasoothe",
    lookupLoading: "데이터베이스 / SOCO / AI 검색 중...",
    lookupPick: "{source} 결과 {count}개 — 하나를 선택하세요",
    lookupEmpty: "찾을 수 없습니다. 공식 브랜드/제품명 철자를 확인하세요.",
    lookupHint: "최소 2자를 입력하세요. 결과가 이미지와 함께 목록으로 표시됩니다.",
    minChars: "최소 2자를 입력하세요",
    backendOffline: "백엔드가 연결되지 않았습니다. API를 실행한 뒤 Affiliate로 다시 로그인하세요.",
    loadFail: "제품을 불러오지 못했습니다",
    researchFail: "제품 리서치에 실패했습니다",
    notFound: "\"{q}\"에 대한 제품을 찾지 못했습니다. 공식 브랜드/제품명을 시도하세요.",
    savedAi: "데이터베이스에 없어 AI 리서치 결과가 카탈로그에 저장되었습니다",
    foundAi: "AI 리서치로 제품을 찾았습니다",
    foundSoco: "SOCO/Sociolla에서 제품 {count}개를 찾았습니다",
    foundDb: "데이터베이스에서 제품 {count}개를 찾았습니다",
    brandNameRequired: "브랜드와 제품명은 필수입니다",
    added: "제품이 추가되었습니다",
    updated: "제품이 업데이트되었습니다",
    saveFail: "저장에 실패했습니다",
    confirmDelete: "{name}을(를) 삭제할까요?",
    deleted: "제품이 삭제되었습니다",
    deleteFail: "삭제에 실패했습니다",
    adopted: "내 카탈로그에 추가되었습니다",
    adoptFail: "추가에 실패했습니다",
  },
  leads: {
    searchPlaceholder: "이름, 언더톤 또는 제품 검색",
    search: "검색",
    colGuest: "게스트",
    colSummary: "요약",
    colConfidence: "신뢰도",
    colTopProduct: "추천 제품",
    colDate: "날짜",
    loading: "스캔 리드 불러오는 중...",
    empty: "리드가 없습니다. 추천 링크를 공유해 팔로워가 스캔하게 하세요.",
    guest: "게스트",
    pagination: "리드 {total}개 · {page}/{pageCount}페이지",
    prev: "이전",
    next: "다음",
    matchedProducts: "매칭된 제품",
    noMatchedProducts: "매칭된 제품이 없습니다.",
    confidenceLabel: "신뢰도 {pct}%",
  },
  billing: {
    viewInvoices: "청구서 보기",
    viewInvoicesArrow: "청구서 보기 →",
    loading: "결제 정보 불러오는 중...",
    errorTitle: "결제를 연결할 수 없습니다",
    errorDescription:
      "결제 API에 접근할 수 없습니다. 백엔드가 localhost:3000에서 실행 중인지 확인하세요.",
    promoTitle: "연간 결제로 20% 절약",
    promoBody:
      "Growth 또는 Scale 플랜을 연간으로 결제하면 최대 20%를 절약할 수 있습니다.",
    promoCta: "지금 업그레이드",
    promoClose: "프로모션 닫기",
    pricePerMonth: "{price}/월",
    creditsPerPeriod: "기간당 스캔 크레딧 {quota}개.",
    autoRenew: "{date}에 자동으로 갱신됩니다.",
    endsOn: "{date}에 종료됩니다.",
    adjustPlan: "플랜 변경",
    payment: "결제",
    paymentProvider: "Aura Pay (시뮬레이션)",
    paymentMethods: "QRIS · VA · E-wallet",
    managePayment: "결제 수단 관리",
    paymentToastTitle: "시뮬레이션 결제 포털",
    paymentToastBody:
      "게이트웨이가 아직 연결되지 않았습니다. 사용량 페이지에서 플랜 체크아웃은 가능합니다.",
    includedUsage: "포함된 사용량",
    colItem: "항목",
    colAllowance: "한도",
    colUsage: "사용량",
    scanCredits: "스캔 크레딧",
    productMatches: "제품 매칭",
    referralAnalytics: "추천 분석",
    scansAllowance: "스캔 {quota}회",
    unlimited: "무제한",
    included: "포함",
    remainingQuota: "남은 한도: {remaining} / {quota} 스캔",
  },
  invoices: {
    billing: "결제",
    buyQuota: "쿼터 구매",
    loading: "청구서 불러오는 중...",
    errorTitle: "청구서를 연결할 수 없습니다",
    errorDescription:
      "청구서 API에 접근할 수 없습니다. 백엔드가 localhost:3000에서 실행 중인지 확인하세요.",
    allInvoices: "전체 청구서",
    empty: "청구서가 없습니다. 결제 후 여기에 표시됩니다.",
    colNumber: "번호",
    colPlan: "플랜",
    colDate: "날짜",
    colStatus: "상태",
    colTotal: "합계",
    detailTitle: "청구서 상세",
    selectPrompt: "목록에서 청구서를 선택하세요",
    noneSelected: "선택된 청구서가 없습니다.",
    loadingDetail: "상세 불러오는 중...",
    labelPlan: "플랜",
    labelMethod: "결제 수단",
    labelPaidAt: "결제일",
    labelPeriod: "기간",
    colDescription: "설명",
    colAmount: "금액",
    total: "합계",
    printPdf: "인쇄 / PDF 미리보기",
    statusPaid: "결제됨",
    statusPending: "대기 중",
    statusFailed: "실패",
    planLine: "플랜 {detail}",
    vatLine: "부가세 11%",
    close: "닫기",
    print: "인쇄",
    downloadPdf: "PDF 다운로드",
    preparingPdf: "PDF 준비 중...",
    pdfPreviewTitle: "청구서 PDF 미리보기",
  },
  spending: {
    openBilling: "결제 열기 →",
    loading: "지출 불러오는 중...",
    errorTitle: "지출을 연결할 수 없습니다",
    errorDescription:
      "지출 API에 접근할 수 없습니다. 백엔드가 localhost:3000에서 실행 중인지 확인하세요.",
    monthToDate: "이번 달 누적",
    projectedMonth: "이번 달 예상",
    averageMonth: "월평균",
    previousMonth: "지난달",
    vsLastMonth: "지난달 대비",
    vsLastMonthDelta: "{delta} 지난달 대비",
    projectedHint: "월말 예상액",
    averageHint: "최근 6개월",
    previousHint: "결제 합계",
    trendTitle: "6개월 추이",
    recentCharges: "최근 결제",
    emptyCharges: "결제가 없습니다. 사용량 페이지에서 플랜을 결제하세요.",
    colInvoice: "청구서",
    colPlan: "플랜",
    colDate: "날짜",
    colStatus: "상태",
    colAmount: "금액",
  },
  usage: {
    viewPlans: "플랜 보기",
    loading: "할당량 통계 불러오는 중...",
    errorTitle: "사용량을 연결할 수 없습니다",
    errorDescription:
      "할당량 API에 접근할 수 없습니다. 백엔드가 localhost:3000에서 실행 중인지 확인하세요.",
    activePlan: "활성 플랜",
    used: "사용량",
    period: "기간 {period}",
    renew: "갱신 {date}",
    quotaUsage: "할당량 사용",
    remainingScans: "남은 스캔 {remaining}회",
    projectedDays: "약 {days}일 더 사용 가능",
    quota: "할당량",
    planOf: "플랜 {name}",
    avgPerDay: "일평균",
    last14Days: "최근 14일",
    peak: "최고",
    matchRate: "매칭률",
    matchRateHint: "추천이 나온 스캔",
    trendTitle: "최근 14일 추이",
    trendSubtitle: "일별 스캔 vs 매칭",
    sourceTitle: "스캔 출처",
    sourceSubtitle: "추천 링크 vs QR 코드",
    channelReferral: "추천 링크",
    channelQr: "QR 코드",
    weeklyTitle: "주간 사용량",
    weekLabel: "{n}주차",
    upgradeTitle: "할당량 업그레이드",
    upgradeSubtitle: "크레딧 플랜을 선택한 뒤 결제로 진행하세요.",
    popular: "인기",
    active: "활성",
    buyAgain: "다시 구매",
    choosePlan: "플랜 선택",
    scansPerScan: "스캔 {scans}회 · ~{perScan}/스캔",
    noPlan: "구독 없음",
    planDescStarter: "시험용 및 소규모 오디언스에 적합합니다.",
    planDescGrowth: "매주 활동하는 파트너에게 가장 경제적입니다.",
    planDescScale: "클리닉, 스튜디오, 대량 파트너용입니다.",
    chartScan: "스캔",
    chartMatch: "매칭",
  },
  analytics: {
    loading: "분석 불러오는 중...",
    errorTitle: "분석을 연결할 수 없습니다",
    errorDescription:
      "분석 API에 접근할 수 없습니다. 백엔드가 localhost:3000에서 실행 중인지 확인하세요.",
    dailyActivity: "일별 활동",
    weeklyActivity: "주간 활동",
    monthlyActivity: "월간 활동",
    emptyActivity: "이 기간에 스캔 활동이 없습니다.",
    referralFunnel: "추천 퍼널",
    funnelScans: "스캔",
    funnelWithMatches: "매칭됨",
    funnelTopPicks: "탑픽 클릭",
    topUndertones: "주요 언더톤",
    emptyUndertones: "언더톤 데이터가 없습니다.",
    topCategories: "주요 매칭 카테고리",
    emptyCategories: "카테고리 데이터가 없습니다.",
    topProducts: "주요 매칭 제품",
    emptyProducts: "이 기간에 매칭된 제품이 없습니다.",
    matchesCount: "매칭 {count}회",
    undertoneWarm: "웜",
    undertoneNeutral: "뉴트럴",
    undertoneCool: "쿨",
  },
};

const byLocale: Record<LocaleCode, AffiliateUi> = { en, id, ko };

export function useAffiliateUi() {
  const { locale } = useLocale();
  return byLocale[locale] ?? en;
}

export function localeDateTag(locale: LocaleCode) {
  return locale === "ko" ? "ko-KR" : locale === "id" ? "id-ID" : "en-US";
}
