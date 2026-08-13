import { apiFetch } from "@/lib/api";

export interface AffiliatorAccount {
  id: string;
  email: string;
  role: "AFFILIATOR" | string;
  isActive: boolean;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AffiliatorDashboard {
  account: AffiliatorAccount;
  summary: {
    totalScans: number;
    totalMatches: number;
    matchRate: number;
    productCount: number;
    revenueTotal: number;
    invoiceCount: number;
  };
  products: Array<{
    id: string;
    brand: string;
    name: string;
    category: string;
    subcategory: string | null;
    imageUrl: string | null;
    isActive: boolean;
    createdAt: string;
  }>;
  leads: Array<{
    id: string;
    scanId: string;
    guestName: string;
    summary: string;
    skinTone: string;
    undertone: string;
    faceShape: string;
    confidence: number;
    topProduct: string | null;
    matchedProductCount: number;
    createdAt: string;
  }>;
  subscription: {
    planId: string;
    planName: string;
    priceIdr: number;
    quota: number;
    used: number;
    remaining: number;
    usagePercent: number;
    periodStart: string;
    periodEnd: string;
  } | null;
  invoices: Array<{
    id: string;
    invoiceNumber: string;
    planId: string;
    planName: string;
    method: string;
    subtotal: number;
    tax: number;
    total: number;
    status: string;
    paidAt: string | null;
    createdAt: string;
    periodStart: string | null;
    periodEnd: string | null;
    quota: number | null;
    lines: Array<{
      description: string;
      quantity: number;
      unitAmount: number;
      amount: number;
    }>;
  }>;
  earnings: {
    total: number;
    months: Array<{
      key: string;
      label: string;
      total: number;
      payments: number;
    }>;
  };
}

export const affiliatorService = {
  list() {
    return apiFetch<AffiliatorAccount[]>("/affiliators");
  },

  getById(id: string) {
    return apiFetch<AffiliatorAccount>(`/affiliators/${encodeURIComponent(id)}`);
  },

  getDashboard(id: string) {
    return apiFetch<AffiliatorDashboard>(
      `/affiliators/${encodeURIComponent(id)}/dashboard`,
    );
  },
};
