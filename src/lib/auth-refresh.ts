import {
  clearStoredUser,
  getRefreshToken,
  setAuthTokens,
} from "@/lib/auth-storage";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

interface RefreshResponse {
  success: boolean;
  data?: {
    accessToken: string;
    refreshToken: string;
    expiresIn?: string;
    tokenType?: string;
  };
  error?: { message?: string };
}

let refreshInFlight: Promise<string | null> | null = null;

/** Decode JWT exp without verifying signature (client-side expiry check only). */
export function isAccessTokenExpired(
  token: string | null | undefined,
  skewMs = 60_000,
): boolean {
  if (!token) return true;
  try {
    const [, payloadPart] = token.split(".");
    if (!payloadPart) return true;
    const json = atob(payloadPart.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(json) as { exp?: number };
    if (typeof payload.exp !== "number") return false;
    return payload.exp * 1000 <= Date.now() + skewMs;
  } catch {
    return true;
  }
}

/**
 * Rotate access (+ refresh) tokens. Single-flight so parallel 401s share one refresh.
 */
export async function refreshSession(): Promise<string | null> {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      const body = (await response.json().catch(() => null)) as RefreshResponse | null;
      if (!response.ok || !body?.success || !body.data?.accessToken) {
        clearStoredUser();
        return null;
      }
      setAuthTokens({
        accessToken: body.data.accessToken,
        refreshToken: body.data.refreshToken,
      });
      return body.data.accessToken;
    } catch {
      return null;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}
