import { apiFetch } from "@/lib/api";

export type ApiKeyRow = {
  id: string;
  name: string;
  keyPrefix: string;
  lastUsedAt: string | null;
  createdAt: string;
};

export type CreatedApiKey = ApiKeyRow & {
  apiKey: string;
  warning: string;
};

export const apiKeysService = {
  list() {
    return apiFetch<ApiKeyRow[]>("/api-keys");
  },
  create(name: string) {
    return apiFetch<CreatedApiKey>("/api-keys", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  },
  revoke(id: string) {
    return apiFetch<{ message: string }>(`/api-keys/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },
};
