"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { localeDateTag, useAffiliateUi } from "@/i18n/affiliate-ui";
import { useLocale } from "@/i18n/locale-provider";
import { authService } from "@/services/auth.service";
import { leadService, type ScanLead } from "@/services/lead.service";

export function AffiliateLeadsClient() {
  const { t, locale } = useLocale();
  const pageCopy = t.dashboard.pages.leads;
  const ui = useAffiliateUi().leads;
  const [query, setQuery] = useState("");
  const [leads, setLeads] = useState<ScanLead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<ScanLead | null>(null);
  const limit = 20;

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(localeDateTag(locale), {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const load = useCallback(async (nextPage = 1, q = "") => {
    const data = await leadService.list({
      q: q.trim() || undefined,
      page: nextPage,
      limit,
    });
    setLeads(data.items);
    setTotal(data.total);
    setPage(data.page);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await authService.ensureAffiliateApiSession();
      if (cancelled) return;
      setReady(ok);
      if (!ok) {
        setLoading(false);
        toast.error("Backend belum terhubung. Jalankan API lalu login ulang sebagai Affiliate.");
        return;
      }
      try {
        await load(1, "");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat scan leads");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  const onSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await load(1, query);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Pencarian gagal");
    } finally {
      setLoading(false);
    }
  };

  const openDetail = async (lead: ScanLead) => {
    try {
      const detail = await leadService.getById(lead.scanId);
      setSelected(detail);
    } catch {
      setSelected(lead);
    }
  };

  const pageCount = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight dark:text-white">
          {pageCopy.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {pageCopy.subtitle}
        </p>
      </div>

      <form onSubmit={onSearch} className="flex flex-col gap-2 sm:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={ui.searchPlaceholder}
          className="min-h-11 flex-1 rounded-full border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#F4A7BC] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500"
        />
        <Button type="submit" disabled={!ready || loading} className="rounded-full">
          {ui.search}
        </Button>
      </form>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
              <tr>
                <th className="px-5 py-3 font-medium">{ui.colGuest}</th>
                <th className="px-5 py-3 font-medium">{ui.colSummary}</th>
                <th className="px-5 py-3 font-medium">{ui.colConfidence}</th>
                <th className="px-5 py-3 font-medium">{ui.colTopProduct}</th>
                <th className="px-5 py-3 font-medium">{ui.colDate}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-neutral-500 dark:text-neutral-400">
                    {ui.loading}
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-neutral-500 dark:text-neutral-400">
                    {ui.empty}
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.scanId}
                    className="cursor-pointer border-t border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/60"
                    onClick={() => void openDetail(lead)}
                  >
                    <td className="px-5 py-3 font-medium text-black dark:text-white">
                      {lead.guestName || ui.guest}
                    </td>
                    <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400">
                      {lead.summary}
                    </td>
                    <td className="px-5 py-3">
                      <Badge>{Math.round(lead.confidence * 100)}%</Badge>
                    </td>
                    <td className="px-5 py-3 text-black dark:text-white">
                      {lead.topProduct ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400">
                      {formatDate(lead.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {total > limit ? (
          <div className="flex items-center justify-between border-t border-neutral-200 px-5 py-3 text-sm dark:border-neutral-800">
            <p className="text-neutral-500 dark:text-neutral-400">
              {ui.pagination
                .replace("{total}", String(total))
                .replace("{page}", String(page))
                .replace("{pageCount}", String(pageCount))}
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                disabled={page <= 1 || loading}
                onClick={() => void load(page - 1, query)}
              >
                {ui.prev}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                disabled={page >= pageCount || loading}
                onClick={() => void load(page + 1, query)}
              >
                {ui.next}
              </Button>
            </div>
          </div>
        ) : null}
      </Card>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? selected.guestName || ui.guest : ui.guest}
        className="max-h-[90vh] max-w-xl overflow-y-auto"
      >
        {selected ? (
          <div className="space-y-4 text-sm">
            <p className="text-neutral-500 dark:text-neutral-400">{selected.summary}</p>
            <div className="flex flex-wrap gap-2">
              <Badge>{selected.skinTone}</Badge>
              <Badge>{selected.undertone}</Badge>
              <Badge>{selected.faceShape}</Badge>
              <Badge variant="success">
                {ui.confidenceLabel.replace(
                  "{pct}",
                  String(Math.round(selected.confidence * 100)),
                )}
              </Badge>
            </div>
            <p className="text-xs text-neutral-400">{formatDate(selected.createdAt)}</p>
            <div>
              <p className="font-medium text-black dark:text-white">{ui.matchedProducts}</p>
              {selected.products.length === 0 ? (
                <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                  {ui.noMatchedProducts}
                </p>
              ) : (
                <ul className="mt-2 space-y-3">
                  {selected.products.map((product) => (
                    <li
                      key={product.productId}
                      className="rounded-xl border border-neutral-200 p-3 dark:border-neutral-700"
                    >
                      <p className="font-medium text-black dark:text-white">{product.name}</p>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        {product.brand} · {product.category} ·{" "}
                        {Math.round(product.matchScore * 100)}% match
                      </p>
                      {product.explanations.length > 0 ? (
                        <p className="mt-1 text-xs text-neutral-400">
                          {product.explanations.join(" · ")}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
