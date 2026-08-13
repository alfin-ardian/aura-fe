"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { useLocale } from "@/i18n/locale-provider";
import { localeDateTag, useAffiliateUi } from "@/i18n/affiliate-ui";
import { cn } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import {
  productService,
  type CatalogProduct,
  type CatalogReview,
  type ProductResearchSource,
  type ProductWriteInput,
} from "@/services/product.service";

function sourceLabel(
  source: ProductResearchSource | null,
  labels: { resultAi: string; resultSoco: string; resultDb: string },
) {
  if (source === "ai_research") return labels.resultAi;
  if (source === "soco") return labels.resultSoco;
  return labels.resultDb;
}

/** Ratings arrive as raw averages such as 4.560224215246636. */
function reviewHeadline(
  review: CatalogReview | undefined,
  template: string,
  localeTag: string,
) {
  if (!review) return null;
  const rating =
    review.rating != null
      ? review.rating.toLocaleString(localeTag, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })
      : null;
  const count =
    review.count > 0
      ? template.replace("{count}", review.count.toLocaleString(localeTag))
      : null;
  return [rating, count].filter(Boolean).join(" · ") || null;
}

function localizeCategory(
  value: string,
  labels: { catFaceSerum: string; catLipCream: string },
) {
  const key = value.trim().toLowerCase();
  if (key === "face serum") return labels.catFaceSerum;
  if (key === "lip cream") return labels.catLipCream;
  return value;
}

function isDraftProduct(id: string | undefined) {
  if (!id) return true;
  return id === "draft" || id.startsWith("draft-") || id.startsWith("soco-");
}

function visibleBrand(brand: string | null | undefined) {
  const value = brand?.trim();
  if (!value || /^(unknown|n\/?a|none|-)$/i.test(value)) return null;
  return value;
}

const emptyForm: ProductWriteInput = {
  brand: "",
  name: "",
  description: "",
  imageUrl: "",
  category: "Skincare",
  ingredients: [],
  uses: [],
};

function toForm(product: CatalogProduct): ProductWriteInput {
  return {
    brand: product.brand,
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl ?? product.image ?? "",
    category: product.category,
    subcategory: product.subcategory,
    ingredients: product.ingredients,
    uses: product.uses,
    reviewSummary: product.reviews[0]?.summary ?? null,
    sources: product.sources,
  };
}

export function AffiliateProductsClient() {
  const { t, locale } = useLocale();
  const page = t.dashboard.pages.products;
  const ui = useAffiliateUi().products;
  const dateTag = localeDateTag(locale);
  const sourceLabels = {
    resultAi: ui.resultAi,
    resultSoco: ui.resultSoco,
    resultDb: ui.resultDb,
  };
  const categoryLabels = {
    catFaceSerum: ui.catFaceSerum,
    catLipCream: ui.catLipCream,
  };
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [researchHits, setResearchHits] = useState<CatalogProduct[] | null>(null);
  const [researchSource, setResearchSource] = useState<ProductResearchSource | null>(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState<CatalogProduct | "new" | null>(null);
  const [form, setForm] = useState<ProductWriteInput>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupOptions, setLookupOptions] = useState<CatalogProduct[]>([]);
  const [lookupSource, setLookupSource] = useState<ProductResearchSource | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [selectedLookup, setSelectedLookup] = useState("");
  const lastLookedUp = useRef("");

  const loadMine = useCallback(async () => {
    const items = await productService.listMine();
    setProducts(items);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await authService.ensureAffiliateApiSession();
      if (cancelled) return;
      setReady(ok);
      if (!ok) {
        setLoading(false);
        toast.error(ui.backendOffline);
        return;
      }
      try {
        await loadMine();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : ui.loadFail);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadMine, ui.backendOffline, ui.loadFail]);

  const onSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    if (q.length < 2) {
      toast.error(ui.minChars);
      return;
    }
    setSearching(true);
    try {
      const result = await productService.research(q, true);
      setResearchHits(result.products);
      setResearchSource(result.source);
      if (result.products.length === 0) {
        toast.error(ui.notFound.replace("{q}", q));
        return;
      }
      if (result.source === "ai_research") {
        toast.success(result.saved ? ui.savedAi : ui.foundAi);
        await loadMine();
      } else if (result.source === "soco") {
        toast.message(
          ui.foundSoco.replace("{count}", String(result.products.length)),
        );
      } else {
        toast.message(
          ui.foundDb.replace("{count}", String(result.products.length)),
        );
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : ui.researchFail);
    } finally {
      setSearching(false);
    }
  };

  const resetLookup = () => {
    setLookupQuery("");
    setLookupOptions([]);
    setLookupSource(null);
    setSelectedLookup("");
    lastLookedUp.current = "";
  };

  const applyLookup = (product: CatalogProduct, index: number) => {
    lastLookedUp.current = lookupQuery.trim().toLowerCase();
    setForm(toForm(product));
    setSelectedLookup(String(index));
  };

  const lookupName = async (name: string) => {
    const q = name.trim();
    if (q.length < 2) {
      setLookupOptions([]);
      setLookupSource(null);
      return;
    }
    if (lastLookedUp.current === q.toLowerCase()) return;
    lastLookedUp.current = q.toLowerCase();
    setLookupLoading(true);
    setSelectedLookup("");
    try {
      const result = await productService.research(q, false);
      setLookupOptions(result.products);
      setLookupSource(result.source);
    } catch (error) {
      lastLookedUp.current = "";
      setLookupOptions([]);
      toast.error(error instanceof Error ? error.message : ui.researchFail);
    } finally {
      setLookupLoading(false);
    }
  };

  useEffect(() => {
    if (editing !== "new") return;
    const q = lookupQuery.trim();
    if (q.length < 2) {
      setLookupOptions([]);
      setLookupSource(null);
      return;
    }
    const timer = window.setTimeout(() => {
      void lookupName(q);
    }, 700);
    return () => window.clearTimeout(timer);
    // Only re-run when the search query changes in create mode.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, lookupQuery]);

  const openCreate = () => {
    setForm(emptyForm);
    resetLookup();
    setEditing("new");
  };

  const openEdit = (product: CatalogProduct) => {
    resetLookup();
    setForm(toForm(product));
    setEditing(product);
  };

  const saveForm = async () => {
    if (!form.brand.trim() || !form.name.trim()) {
      toast.error(ui.brandNameRequired);
      return;
    }
    setSaving(true);
    try {
      const payload: ProductWriteInput = {
        ...form,
        imageUrl: form.imageUrl?.trim() ? form.imageUrl : null,
        ingredients: form.ingredients?.filter(Boolean),
        uses: form.uses?.filter(Boolean),
      };
      if (editing === "new") {
        const picked = lookupOptions[Number(selectedLookup)];
        if (picked && !isDraftProduct(picked.id) && !picked.owned) {
          await productService.adopt(picked.id);
        } else {
          await productService.create(payload);
        }
        toast.success(ui.added);
      } else if (editing) {
        await productService.update(editing.id, payload);
        toast.success(ui.updated);
      }
      setEditing(null);
      resetLookup();
      await loadMine();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : ui.saveFail);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (product: CatalogProduct) => {
    if (!confirm(ui.confirmDelete.replace("{name}", product.name))) return;
    try {
      await productService.remove(product.id);
      toast.success(ui.deleted);
      await loadMine();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : ui.deleteFail);
    }
  };

  const adopt = async (product: CatalogProduct) => {
    try {
      if (isDraftProduct(product.id) || product.owned) {
        await productService.create(toForm(product));
      } else {
        await productService.adopt(product.id);
      }
      toast.success(ui.adopted);
      setResearchHits(null);
      await loadMine();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : ui.adoptFail);
    }
  };

  const visible = researchHits ?? products;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight dark:text-white">
            {page.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            {page.subtitle}
          </p>
        </div>
        <Button type="button" onClick={openCreate} disabled={!ready}>
          {ui.addManual}
        </Button>
      </div>

      <form onSubmit={onSearch} className="flex flex-col gap-2 sm:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={ui.searchPlaceholder}
          className="min-h-11 flex-1 rounded-full border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#F4A7BC] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500"
        />
        <Button type="submit" disabled={!ready || searching} className="rounded-full">
          {searching ? ui.searching : ui.searchAi}
        </Button>
      </form>

      {researchHits ? (
        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="text-neutral-500 dark:text-neutral-400">
            {ui.resultPrefix} {sourceLabel(researchSource, sourceLabels)}
          </p>
          <button
            type="button"
            className="text-sm font-medium underline-offset-4 hover:underline dark:text-white"
            onClick={() => {
              setResearchHits(null);
              setResearchSource(null);
            }}
          >
            {ui.showMyCatalog}
          </button>
        </div>
      ) : null}

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
              <tr>
                <th className="px-5 py-3 font-medium">{ui.colProduct}</th>
                <th className="px-5 py-3 font-medium">{ui.colBrand}</th>
                <th className="px-5 py-3 font-medium">{ui.colCategory}</th>
                <th className="px-5 py-3 font-medium">{ui.colReviews}</th>
                <th className="px-5 py-3 font-medium">{ui.colSource}</th>
                <th className="px-5 py-3 font-medium text-right">{ui.colActions}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-neutral-500 dark:text-neutral-400">
                    {ui.loading}
                  </td>
                </tr>
              ) : visible.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-neutral-500 dark:text-neutral-400">
                    {ui.empty}
                  </td>
                </tr>
              ) : (
                visible.map((product) => {
                  const review = product.reviews[0];
                  const headline = reviewHeadline(review, ui.reviewsAtSoco, dateTag);
                  const image = product.image || product.imageUrl;
                  const source = product.sources[0];
                  return (
                    <tr key={product.id} className="border-t border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/60">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <ProductThumb src={image} alt={product.name} />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-[#1D1D1F] dark:text-white">
                              {product.name}
                            </p>
                            <div className="mt-1 flex flex-wrap gap-1.5">
                              {product.owned ? (
                                <Badge variant="success">{ui.myCatalog}</Badge>
                              ) : (
                                <Badge>
                                  {researchHits
                                    ? sourceLabel(researchSource, sourceLabels)
                                    : ui.database}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-neutral-600 dark:text-neutral-300">
                        {visibleBrand(product.brand) ?? "—"}
                      </td>
                      <td className="px-5 py-3">
                        <Badge>
                          {localizeCategory(
                            product.subcategory || product.category,
                            categoryLabels,
                          )}
                        </Badge>
                      </td>
                      <td className="max-w-[240px] px-5 py-3 text-neutral-500 dark:text-neutral-400">
                        {headline ? (
                          <p className="font-medium text-[#1D1D1F] dark:text-white">
                            {headline}
                          </p>
                        ) : null}
                        {review?.summary ? (
                          <p className="line-clamp-2">{review.summary}</p>
                        ) : null}
                        {!headline && !review?.summary ? "—" : null}
                      </td>
                      <td className="max-w-[200px] px-5 py-3">
                        {source ? (
                          <a
                            href={source}
                            target="_blank"
                            rel="noreferrer"
                            className="block truncate text-xs text-neutral-500 underline-offset-4 hover:underline dark:text-neutral-400"
                          >
                            {source.replace(/^https?:\/\//, "")}
                          </a>
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-2">
                          {product.owned ? (
                            <>
                              <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                onClick={() => openEdit(product)}
                              >
                                {ui.edit}
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => void remove(product)}
                              >
                                {ui.remove}
                              </Button>
                            </>
                          ) : (
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => void adopt(product)}
                            >
                              {ui.add}
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={editing !== null}
        onClose={() => {
          setEditing(null);
          resetLookup();
        }}
        title={editing === "new" ? ui.modalAdd : ui.modalEdit}
        className="max-h-[90vh] max-w-xl overflow-y-auto"
      >
        <div className="space-y-3">
          {editing === "new" ? (
            <div className="space-y-2">
              <label className="block text-sm">
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  {ui.fieldName}
                </span>
                <input
                  value={lookupQuery}
                  onChange={(event) => {
                    setLookupQuery(event.target.value);
                    setSelectedLookup("");
                  }}
                  placeholder={ui.lookupPlaceholder}
                  className="mt-1 min-h-11 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#F4A7BC] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                />
              </label>
              <p className="text-xs text-neutral-400">
                {lookupLoading
                  ? ui.lookupLoading
                  : lookupOptions.length > 0
                    ? ui.lookupPick
                        .replace("{count}", String(lookupOptions.length))
                        .replace(
                          "{source}",
                          sourceLabel(lookupSource, sourceLabels),
                        )
                    : lookupSource
                      ? ui.lookupEmpty
                      : ui.lookupHint}
              </p>
              {lookupOptions.length > 0 ? (
                <ul className="max-h-72 divide-y divide-neutral-100 overflow-y-auto rounded-2xl border border-neutral-200">
                  {lookupOptions.map((product, index) => {
                    const selected = selectedLookup === String(index);
                    const image = product.image || product.imageUrl;
                    const brand = visibleBrand(product.brand);
                    return (
                      <li key={`${product.id}-${index}`}>
                        <button
                          type="button"
                          onClick={() => applyLookup(product, index)}
                          className={cn(
                            "flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-[#FCE7EF]/60",
                            selected && "bg-[#FCE7EF] ring-1 ring-inset ring-[#F4A7BC]",
                          )}
                        >
                          <ProductThumb src={image} alt={product.name} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium text-[#1D1D1F]">
                              {product.name}
                            </span>
                            {brand ? (
                              <span className="mt-0.5 block truncate text-xs text-neutral-500">
                                {brand}
                              </span>
                            ) : null}
                          </span>
                          <Badge>{sourceLabel(lookupSource, sourceLabels)}</Badge>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          ) : (
            <Field
              label={ui.fieldName}
              value={form.name}
              onChange={(value) => setForm((current) => ({ ...current, name: value }))}
            />
          )}
          <Field
            label={ui.fieldBrand}
            value={form.brand}
            onChange={(value) => setForm((current) => ({ ...current, brand: value }))}
          />
          <Field
            label={ui.fieldDescription}
            value={form.description ?? ""}
            onChange={(value) => setForm((current) => ({ ...current, description: value }))}
            multiline
          />
          <Field
            label={ui.fieldImageUrl}
            value={form.imageUrl ?? ""}
            onChange={(value) => setForm((current) => ({ ...current, imageUrl: value }))}
          />
          <Field
            label={ui.fieldIngredients}
            value={(form.ingredients ?? []).join(", ")}
            onChange={(value) =>
              setForm((current) => ({
                ...current,
                ingredients: value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
          />
          <Field
            label={ui.fieldUses}
            value={(form.uses ?? []).join("\n")}
            onChange={(value) =>
              setForm((current) => ({
                ...current,
                uses: value
                  .split("\n")
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
            multiline
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setEditing(null);
                resetLookup();
              }}
            >
              {ui.cancel}
            </Button>
            <Button type="button" disabled={saving} onClick={() => void saveForm()}>
              {saving ? ui.saving : ui.save}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ProductThumb({ src, alt }: { src: string | null; alt: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [src]);
  if (!src || failed) {
    const initials = alt
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
    return (
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F8E7EF] to-[#EDE4F5] text-[11px] font-semibold text-[#9B6B8A]">
        {initials || "—"}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-14 w-14 shrink-0 rounded-xl object-cover bg-neutral-100"
    />
  );
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  const className =
    "mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#F4A7BC]";
  return (
    <label className="block text-sm">
      <span className="font-medium text-neutral-700">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}
