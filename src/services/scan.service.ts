import { apiFetch } from "@/lib/api";

export interface ScanAnalysis {
  skinTone: string;
  undertone: string;
  faceShape: string;
  confidence: number;
  skinType?: string | null;
  concerns?: string[];
}

export interface ScanMatchedProduct {
  id: string;
  brand: string;
  name: string;
  category: string;
  subcategory: string | null;
  imageUrl: string | null;
  description: string;
  matchScore: number;
  explanations: string[];
  affiliateUrl: string | null;
  sourceUrl: string | null;
}

export interface PublicScanResult {
  scanId: string;
  affiliatorId?: string;
  analysis: ScanAnalysis;
  recommendationId?: string;
  recommendation?: {
    makeupTypes: Array<{ id: string; name: string; slug: string }>;
    products: ScanMatchedProduct[];
  };
}

export const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isAffiliatorId(value: string) {
  return UUID_RE.test(value.trim());
}

function previewKey(scanId: string) {
  return `auraai.scan.preview.${scanId}`;
}

export function loadScanPreview(scanId: string) {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(previewKey(scanId));
}

export function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read photo"));
    reader.readAsDataURL(file);
  });
}

export async function saveScanPreview(scanId: string, file: File) {
  const dataUrl = await fileToDataUrl(file);
  sessionStorage.setItem(previewKey(scanId), dataUrl);
}

export const scanService = {
  publicScan(input: {
    affiliatorId: string;
    image: File;
    guestName?: string;
    channel?: "referral" | "qr";
    trainingConsent?: boolean;
  }) {
    const body = new FormData();
    body.append("image", input.image);
    body.append("affiliatorId", input.affiliatorId);
    body.append("channel", input.channel ?? "referral");
    body.append(
      "trainingConsent",
      input.trainingConsent === false ? "false" : "true",
    );
    const name = input.guestName?.trim();
    if (name) body.append("guestName", name);

    return apiFetch<PublicScanResult>("/scan/public", {
      method: "POST",
      body,
      skipAuth: true,
      timeoutMs: 90_000,
    });
  },

  getPublicResult(scanId: string, affiliatorId?: string) {
    const search = new URLSearchParams();
    if (affiliatorId) search.set("affiliatorId", affiliatorId);
    const query = search.toString();
    return apiFetch<PublicScanResult>(
      `/scan/public/${scanId}${query ? `?${query}` : ""}`,
      { skipAuth: true },
    );
  },
};
