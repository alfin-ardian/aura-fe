import type {
  Affiliator,
  AffiliateProduct,
  AuthUser,
  KpiCard,
  ScanLead,
  TrendPoint,
} from "@/types";

export const DEMO_USERS: AuthUser[] = [
  {
    id: "admin-001",
    email: "admin@auraai.local",
    name: "Super Admin",
    role: "SUPER_ADMIN",
  },
  {
    id: "aff-001",
    email: "affiliator@auraai.local",
    name: "Rina Beauty",
    role: "AFFILIATOR",
  },
];

export const DUMMY_AFFILIATORS: Affiliator[] = [
  {
    id: "aff-001",
    name: "Rina Beauty",
    email: "affiliator@auraai.local",
    isActive: true,
    totalScans: 1284,
    totalMatches: 976,
    createdAt: "2026-01-12T08:00:00.000Z",
  },
  {
    id: "aff-002",
    name: "Glow Studio",
    email: "glow@studio.id",
    isActive: true,
    totalScans: 842,
    totalMatches: 611,
    createdAt: "2026-02-03T08:00:00.000Z",
  },
  {
    id: "aff-003",
    name: "Skin Lab ID",
    email: "hello@skinlab.id",
    isActive: true,
    totalScans: 520,
    totalMatches: 401,
    createdAt: "2026-03-18T08:00:00.000Z",
  },
  {
    id: "aff-004",
    name: "Aura Partner",
    email: "partner@aura.ai",
    isActive: false,
    totalScans: 96,
    totalMatches: 54,
    createdAt: "2026-04-22T08:00:00.000Z",
  },
];

export const DUMMY_ADMIN_KPI: KpiCard[] = [
  { label: "Total Affiliators", value: "24", hint: "+3 this month" },
  { label: "Active Affiliators", value: "19", hint: "79% active" },
  { label: "Platform Scans", value: "12.4k", hint: "+18% vs last month" },
  { label: "Match Rate", value: "76%", hint: "Across all partners" },
];

export const DUMMY_ADMIN_TRENDS: TrendPoint[] = [
  { label: "Mon", scans: 420, matches: 310 },
  { label: "Tue", scans: 510, matches: 390 },
  { label: "Wed", scans: 480, matches: 360 },
  { label: "Thu", scans: 620, matches: 470 },
  { label: "Fri", scans: 700, matches: 540 },
  { label: "Sat", scans: 860, matches: 650 },
  { label: "Sun", scans: 790, matches: 600 },
];

export const DUMMY_AFFILIATE_KPI: KpiCard[] = [
  { label: "Total Scans", value: "1,284", hint: "Last 30 days" },
  { label: "Product Matches", value: "976", hint: "76% match rate" },
  { label: "Scan credits left", value: "1,716", hint: "of 3,000 Growth plan" },
  { label: "Top Pick Rate", value: "41%", hint: "Users who clicked View" },
];

export const DUMMY_AFFILIATE_TRENDS: TrendPoint[] = [
  { label: "Mon", scans: 32, matches: 24 },
  { label: "Tue", scans: 41, matches: 30 },
  { label: "Wed", scans: 38, matches: 29 },
  { label: "Thu", scans: 52, matches: 40 },
  { label: "Fri", scans: 61, matches: 48 },
  { label: "Sat", scans: 74, matches: 58 },
  { label: "Sun", scans: 68, matches: 51 },
];

export const DUMMY_PRODUCTS: AffiliateProduct[] = [
  {
    id: "p1",
    brand: "Somethinc",
    name: "Niacinamide Serum 10%",
    category: "Serum",
    matchCount: 214,
    isActive: true,
    minPrice: 89000,
    maxPrice: 99000,
  },
  {
    id: "p2",
    brand: "Wardah",
    name: "Lightening Day Cream",
    category: "Moisturizer",
    matchCount: 168,
    isActive: true,
    minPrice: 45000,
    maxPrice: 52000,
  },
  {
    id: "p3",
    brand: "Local Brand",
    name: "Gentle BHA Toner",
    category: "Toner",
    matchCount: 142,
    isActive: true,
    minPrice: 72000,
    maxPrice: 80000,
  },
  {
    id: "p4",
    brand: "Clarity Co",
    name: "Oil Control Gel",
    category: "Treatment",
    matchCount: 97,
    isActive: false,
    minPrice: 110000,
    maxPrice: 125000,
  },
];

export const DUMMY_LEADS: ScanLead[] = [
  {
    id: "l1",
    guestName: "Ayla",
    summary: "Light · Warm undertone · Oval",
    skinTone: "Light",
    undertone: "Warm",
    faceShape: "Oval",
    confidence: 0.91,
    topProduct: "Niacinamide Serum 10%",
    createdAt: "2026-08-10T09:20:00.000Z",
  },
  {
    id: "l2",
    guestName: "Bima",
    summary: "Medium · Cool undertone · Heart",
    skinTone: "Medium",
    undertone: "Cool",
    faceShape: "Heart",
    confidence: 0.87,
    topProduct: "Gentle BHA Toner",
    createdAt: "2026-08-09T16:40:00.000Z",
  },
  {
    id: "l3",
    guestName: "Citra",
    summary: "Light · Neutral undertone · Round",
    skinTone: "Light",
    undertone: "Neutral",
    faceShape: "Round",
    confidence: 0.93,
    topProduct: "Lightening Day Cream",
    createdAt: "2026-08-08T11:05:00.000Z",
  },
  {
    id: "l4",
    guestName: "Dina",
    summary: "Tan · Warm undertone · Square",
    skinTone: "Tan",
    undertone: "Warm",
    faceShape: "Square",
    confidence: 0.84,
    topProduct: "Oil Control Gel",
    createdAt: "2026-08-07T14:22:00.000Z",
  },
];

export const AFFILIATE_PUBLIC_LINK =
  "http://localhost:3001/scan?affiliator=aff-001";

/** Dummy usage for the logged-in affiliator (Growth plan) */
export const DUMMY_AFFILIATE_USAGE = {
  planId: "growth",
  planName: "Growth",
  priceIdr: 100_000,
  quota: 3_000,
  used: 1_284,
  matchRate: 76,
  avgPerDay: 41,
  peakDay: "Sabtu",
  peakValue: 74,
  projectedDays: 42,
  periodLabel: "Agustus 2026",
  renewsAt: "2026-09-01T00:00:00.000Z",
  history: [
    { label: "Minggu 1", used: 210, matches: 158 },
    { label: "Minggu 2", used: 340, matches: 255 },
    { label: "Minggu 3", used: 390, matches: 298 },
    { label: "Minggu 4", used: 344, matches: 265 },
  ],
  daily: [
    { label: "29 Jul", scans: 48, matches: 36 },
    { label: "30 Jul", scans: 55, matches: 41 },
    { label: "31 Jul", scans: 62, matches: 47 },
    { label: "1 Agu", scans: 38, matches: 29 },
    { label: "2 Agu", scans: 45, matches: 34 },
    { label: "3 Agu", scans: 52, matches: 40 },
    { label: "4 Agu", scans: 58, matches: 44 },
    { label: "5 Agu", scans: 71, matches: 55 },
    { label: "6 Agu", scans: 84, matches: 64 },
    { label: "7 Agu", scans: 76, matches: 58 },
    { label: "8 Agu", scans: 49, matches: 37 },
    { label: "9 Agu", scans: 54, matches: 41 },
    { label: "10 Agu", scans: 67, matches: 51 },
    { label: "11 Agu", scans: 61, matches: 48 },
  ],
  weekday: [
    { label: "Sen", scans: 32, matches: 24 },
    { label: "Sel", scans: 41, matches: 30 },
    { label: "Rab", scans: 38, matches: 29 },
    { label: "Kam", scans: 52, matches: 40 },
    { label: "Jum", scans: 61, matches: 48 },
    { label: "Sab", scans: 74, matches: 58 },
    { label: "Min", scans: 68, matches: 51 },
  ],
  channels: [
    { label: "Link referral", value: 812 },
    { label: "QR code", value: 472 },
  ],
} as const;
