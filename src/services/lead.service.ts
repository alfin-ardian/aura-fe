import { apiFetch } from "@/lib/api";

export interface ScanLeadProduct {
  productId: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string | null;
  matchScore: number;
  explanations: string[];
}

export interface ScanLead {
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
  products: ScanLeadProduct[];
  createdAt: string;
}

export interface ScanLeadList {
  items: ScanLead[];
  page: number;
  limit: number;
  total: number;
}

export const leadService = {
  list(params: { q?: string; page?: number; limit?: number } = {}) {
    const search = new URLSearchParams();
    if (params.q) search.set("q", params.q);
    if (params.page) search.set("page", String(params.page));
    if (params.limit) search.set("limit", String(params.limit));
    const query = search.toString();
    return apiFetch<ScanLeadList>(`/scan/leads${query ? `?${query}` : ""}`);
  },

  getById(scanId: string) {
    return apiFetch<ScanLead>(`/scan/leads/${scanId}`);
  },
};
