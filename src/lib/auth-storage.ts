import { TOKEN_KEYS } from "@/constants";
import type { AuthUser } from "@/types";

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(TOKEN_KEYS.user);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser) {
  localStorage.setItem(TOKEN_KEYS.user, JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem(TOKEN_KEYS.user);
  localStorage.removeItem(TOKEN_KEYS.accessToken);
  localStorage.removeItem(TOKEN_KEYS.refreshToken);
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEYS.accessToken);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEYS.refreshToken);
}

export function setAuthTokens(tokens: { accessToken: string; refreshToken?: string }) {
  localStorage.setItem(TOKEN_KEYS.accessToken, tokens.accessToken);
  if (tokens.refreshToken) {
    localStorage.setItem(TOKEN_KEYS.refreshToken, tokens.refreshToken);
  }
}

export function dashboardPathForRole(role: AuthUser["role"]) {
  return role === "SUPER_ADMIN" ? "/admin" : "/affiliate";
}
