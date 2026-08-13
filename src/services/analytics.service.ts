import { apiFetch } from "@/lib/api";
import type { TrendPoint } from "@/types";

export type AnalyticsRange = "7d" | "30d" | "90d";

export interface OverviewLead {
  id: string;
  scanId: string;
  followerName: string;
  scanDate: string;
  selfieUrl: string | null;
  detectedSkinTone: string;
  detectedUndertone: string;
  faceShape: string;
  topMatchedProduct: string;
  matchedProductCount: number;
  clickedAffiliate: boolean;
}

export interface AffiliateOverview {
  affiliatorId: string;
  period: "30d";
  summary: {
    totalScans: number;
    totalMatches: number;
    scansWithMatches: number;
    matchRate: number;
    scansTrend: number;
    matchesTrend: number;
    matchRateTrend: number;
  };
  weekTrends: TrendPoint[];
  recentLeads: OverviewLead[];
  topProducts: Array<{
    productId: string;
    name: string;
    brand: string;
    category: string;
    imageUrl: string | null;
    matches: number;
    topPickCount: number;
  }>;
  funnel: {
    scans: number;
    scansWithMatches: number;
    topPicks: number;
    scanBarPct: number;
    matchBarPct: number;
    topPickBarPct: number;
    matchRate: number;
    topPickRate: number;
  };
  usage: {
    plan: string;
    used: number;
    limit: number;
    remaining: number;
    resetsInDays: number;
  };
}

export interface AnalyticsDashboard {
  range: AnalyticsRange;
  periodStart: string;
  periodEnd: string;
  summary: AffiliateOverview["summary"];
  trends: TrendPoint[];
  undertones: Array<{
    name: string;
    count: number;
    percentage: number;
    color: string;
  }>;
  skinTones: Array<{ name: string; count: number; percentage: number }>;
  categories: Array<{
    name: string;
    count: number;
    percentage: number;
    color: string;
  }>;
  products: Array<{
    productId: string;
    name: string;
    brand: string;
    category: string;
    imageUrl: string | null;
    matches: number;
    topPickCount: number;
  }>;
}

export function buildPublicScanLink(affiliatorId: string, origin = "") {
  const base =
    origin || (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}/scan?affiliator=${encodeURIComponent(affiliatorId)}`;
}

export interface PlatformOverview {
  summary: {
    totalAffiliators: number;
    activeAffiliators: number;
    newAffiliatorsThisMonth: number;
    activeRate: number;
    totalScans: number;
    matchedScans: number;
    matchRate: number;
    scansTrend: number;
  };
  weekTrends: TrendPoint[];
  recentAffiliators: Array<{
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    totalScans: number;
    createdAt: string;
  }>;
}

export const analyticsService = {
  getOverview(affiliatorId?: string) {
    const q = affiliatorId
      ? `?affiliatorId=${encodeURIComponent(affiliatorId)}`
      : "";
    return apiFetch<AffiliateOverview>(`/analytics/overview${q}`);
  },

  getPlatformOverview() {
    return apiFetch<PlatformOverview>("/analytics/platform");
  },

  getDashboard(range: AnalyticsRange = "30d", affiliatorId?: string) {
    const params = new URLSearchParams({ range });
    if (affiliatorId) params.set("affiliatorId", affiliatorId);
    return apiFetch<AnalyticsDashboard>(`/analytics?${params.toString()}`);
  },
};
