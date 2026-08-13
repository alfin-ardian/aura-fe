import { API_URL } from "@/lib/api-url";
import { getAccessToken } from "@/lib/auth-storage";
import { isAccessTokenExpired, refreshSession } from "@/lib/auth-refresh";

export { API_URL, resolveApiUrl } from "@/lib/api-url";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  error?: { code?: string; message?: string };
}

type ApiFetchOptions = RequestInit & {
  timeoutMs?: number;
  skipAuth?: boolean;
  /** Internal: prevent infinite refresh retry loops. */
  _retried?: boolean;
};

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const {
    timeoutMs = 20_000,
    skipAuth = false,
    headers,
    _retried = false,
    ...rest
  } = options;

  let token = skipAuth ? null : getAccessToken();
  if (!skipAuth && isAccessTokenExpired(token)) {
    token = await refreshSession();
  }

  const isFormData = typeof FormData !== "undefined" && rest.body instanceof FormData;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...rest,
      signal: rest.signal ?? controller.signal,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });

    const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

    if (response.status === 401 && !skipAuth && !_retried) {
      const nextToken = await refreshSession();
      if (nextToken) {
        return apiFetch<T>(path, { ...options, _retried: true });
      }
    }

    if (!response.ok || !body?.success) {
      throw new ApiError(
        body?.error?.message ?? `Request failed (${response.status})`,
        response.status,
        body?.error?.code,
      );
    }
    return body.data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("Request timed out", 408);
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Network error",
      0,
    );
  } finally {
    clearTimeout(timer);
  }
}
