export type UserRole = "SUPER_ADMIN" | "AFFILIATOR";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Affiliator {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  totalScans: number;
  totalMatches: number;
  createdAt: string;
}

export interface AffiliateProduct {
  id: string;
  brand: string;
  name: string;
  category: string;
  matchCount: number;
  isActive: boolean;
  minPrice: number;
  maxPrice: number;
}

export interface ScanLead {
  id: string;
  guestName: string;
  summary: string;
  skinTone: string;
  undertone: string;
  faceShape: string;
  confidence: number;
  topProduct: string;
  createdAt: string;
}

export interface TrendPoint {
  label: string;
  scans: number;
  matches: number;
}

export interface KpiCard {
  label: string;
  value: string;
  hint: string;
}
