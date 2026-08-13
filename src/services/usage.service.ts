import { apiFetch } from "@/lib/api";

export type UsagePlanId = "starter" | "growth" | "scale";
export type PaymentMethodId = "qris" | "va" | "ewallet";

export interface UsagePlan {
  id: UsagePlanId;
  name: string;
  priceIdr: number;
  scans: number;
  featured: boolean;
  description: string;
  active: boolean;
}

export interface UsageDashboard {
  planId: UsagePlanId | null;
  planName: string;
  priceIdr: number;
  quota: number;
  used: number;
  remaining: number;
  percent: number;
  matchRate: number;
  avgPerDay: number;
  peakDay: string;
  peakValue: number;
  projectedDays: number;
  periodLabel: string;
  periodStart: string;
  periodEnd: string;
  renewsAt: string;
  history: Array<{ label: string; used: number; matches: number }>;
  daily: Array<{ label: string; date?: string; scans: number; matches: number }>;
  channels: Array<{ label: string; value: number }>;
  plans: UsagePlan[];
}

export interface CheckoutResult {
  invoice: string;
  method: string;
  planId: UsagePlanId;
  planName: string;
  quotaAdded: number;
  totals: { subtotal: number; tax: number; total: number };
  usage: UsageDashboard;
}

export const usageService = {
  getDashboard() {
    return apiFetch<UsageDashboard>("/usage");
  },

  checkout(planId: UsagePlanId, method: PaymentMethodId) {
    return apiFetch<CheckoutResult>("/usage/checkout", {
      method: "POST",
      body: JSON.stringify({ planId, method }),
    });
  },
};
