import { apiFetch } from "@/lib/api";
import { isAccessTokenExpired, refreshSession } from "@/lib/auth-refresh";
import {
  clearStoredUser,
  dashboardPathForRole,
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
  setStoredUser,
} from "@/lib/auth-storage";
import type { AuthUser, UserRole } from "@/types";

interface AuthApiUser {
  id: string;
  email: string;
  role: UserRole | string;
  name?: string | null;
}

interface AuthApiResponse {
  user: AuthApiUser;
  tokens: { accessToken: string; refreshToken: string };
}

function displayName(user: AuthApiUser) {
  const name = user.name?.trim();
  if (name) return name;
  const local = user.email.split("@")[0] ?? "User";
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toAuthUser(user: AuthApiUser): AuthUser {
  const role: UserRole = user.role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "AFFILIATOR";
  return {
    id: user.id,
    email: user.email,
    name: displayName(user),
    role,
  };
}

function persistSession(data: AuthApiResponse): AuthUser {
  setAuthTokens(data.tokens);
  const user = toAuthUser(data.user);
  setStoredUser(user);
  return user;
}

export const authService = {
  async registerAffiliator(input: {
    name: string;
    email: string;
    whatsapp: string;
    password: string;
  }): Promise<{ email: string; message: string; activationToken?: string }> {
    return apiFetch("/auth/register-affiliator", {
      method: "POST",
      body: JSON.stringify(input),
      skipAuth: true,
    });
  },

  async activateAccount(token: string): Promise<{ message: string; email: string }> {
    return apiFetch("/auth/activate", {
      method: "POST",
      body: JSON.stringify({ token }),
      skipAuth: true,
    });
  },

  async resendActivation(
    email: string,
  ): Promise<{ message: string; activationToken?: string }> {
    return apiFetch("/auth/resend-activation", {
      method: "POST",
      body: JSON.stringify({ email }),
      skipAuth: true,
    });
  },

  async login(email: string, password: string): Promise<AuthUser> {
    const data = await apiFetch<AuthApiResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: email.trim(), password }),
      skipAuth: true,
    });
    return persistSession(data);
  },

  async logout(): Promise<void> {
    const refreshToken = getRefreshToken();
    try {
      if (refreshToken) {
        await apiFetch("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
          skipAuth: true,
        });
      }
    } catch {
      // Clear local session even if the API is unreachable.
    } finally {
      clearStoredUser();
    }
  },

  redirectPath(user: AuthUser) {
    return dashboardPathForRole(user.role);
  },

  /**
   * Ensure we have a usable access token (refresh if expired).
   * Returns false only when refresh also fails / no session.
   */
  async ensureAffiliateApiSession(): Promise<boolean> {
    const access = getAccessToken();
    if (access && !isAccessTokenExpired(access)) return true;
    if (!getRefreshToken()) return false;
    const next = await refreshSession();
    return Boolean(next);
  },
};
