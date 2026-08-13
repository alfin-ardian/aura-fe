import { apiFetch } from "@/lib/api";

export interface CatalogReview {
  rating: number | null;
  count: number;
  summary: string | null;
}

export interface CatalogProduct {
  id: string;
  brand: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  imageUrl: string | null;
  category: string;
  subcategory: string | null;
  ingredients: string[];
  uses: string[];
  reviews: CatalogReview[];
  sources: string[];
  isActive: boolean;
  ownerId: string | null;
  owned: boolean;
}

export type ProductResearchSource = "database" | "soco" | "ai_research";

export interface ProductResearchResult {
  source: ProductResearchSource;
  query: string;
  saved?: boolean;
  products: CatalogProduct[];
}

export interface ProductWriteInput {
  brand: string;
  name: string;
  description?: string;
  imageUrl?: string | null;
  category?: string;
  subcategory?: string | null;
  ingredients?: string[];
  uses?: string[];
  reviewSummary?: string | null;
  sources?: string[];
}

export const productService = {
  listMine(q?: string) {
    const query = q ? `?q=${encodeURIComponent(q)}` : "";
    return apiFetch<CatalogProduct[]>(`/products/mine${query}`);
  },

  research(query: string, save = true) {
    return apiFetch<ProductResearchResult>("/products/research", {
      method: "POST",
      body: JSON.stringify({ query, save }),
      timeoutMs: 90_000,
    });
  },

  create(input: ProductWriteInput) {
    return apiFetch<CatalogProduct>("/products", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  update(id: string, input: ProductWriteInput) {
    return apiFetch<CatalogProduct>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    });
  },

  remove(id: string) {
    return apiFetch<{ message: string }>(`/products/${id}`, {
      method: "DELETE",
    });
  },

  adopt(id: string) {
    return apiFetch<CatalogProduct>(`/products/${id}/adopt`, {
      method: "POST",
    });
  },
};
