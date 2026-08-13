const PROD_API_URL = "https://api.auraai.site";
const DEV_API_URL = "http://localhost:3000";

/** Resolve API base URL; empty env must not become same-origin relative requests. */
export function resolveApiUrl() {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "") ?? "";
  if (raw) return raw;
  return process.env.NODE_ENV === "production" ? PROD_API_URL : DEV_API_URL;
}

export const API_URL = resolveApiUrl();
