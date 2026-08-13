export const PPN_RATE = 0.11;

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    priceIdr: 50_000,
    scans: 1_000,
    featured: false,
    validityDays: 30,
    description: "Cocok untuk uji coba dan audiens kecil.",
    features: [
      "1.000 scan credits",
      "Berlaku 30 hari",
      "Public referral link",
      "Basic lead history",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    priceIdr: 100_000,
    scans: 3_000,
    featured: true,
    validityDays: 30,
    description: "Paling hemat untuk partner yang aktif setiap minggu.",
    features: [
      "3.000 scan credits",
      "Berlaku 30 hari",
      "Lead history & analytics",
      "Best value per scan",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    priceIdr: 200_000,
    scans: 7_000,
    featured: false,
    validityDays: 30,
    description: "Untuk klinik, studio, dan partner volume tinggi.",
    features: [
      "7.000 scan credits",
      "Berlaku 30 hari",
      "Full analytics suite",
      "Priority support",
    ],
  },
] as const;

export type PricingPlanId = (typeof PRICING_PLANS)[number]["id"];
export type PricingPlan = (typeof PRICING_PLANS)[number];

export function getPricingPlan(id: string | null | undefined) {
  return PRICING_PLANS.find((plan) => plan.id === id) ?? PRICING_PLANS[1];
}

export function costPerScan(priceIdr: number, scans: number) {
  return Math.round(priceIdr / scans);
}

export function planTotals(priceIdr: number) {
  const tax = Math.round(priceIdr * PPN_RATE);
  return {
    subtotal: priceIdr,
    tax,
    total: priceIdr + tax,
  };
}
