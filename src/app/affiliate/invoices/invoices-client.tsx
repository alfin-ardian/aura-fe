"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Printer } from "lucide-react";
import { toast } from "sonner";
import { InvoicePdfPreviewModal } from "@/components/billing/invoice-pdf-preview-modal";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { localeDateTag, useAffiliateUi } from "@/i18n/affiliate-ui";
import { useLocale } from "@/i18n/locale-provider";
import { cn, formatIdr } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import {
  billingService,
  type InvoiceDetail,
  type InvoiceListItem,
} from "@/services/billing.service";

function statusVariant(status: string) {
  if (status === "paid") return "success" as const;
  if (status === "pending") return "warning" as const;
  if (status === "failed") return "error" as const;
  return "default" as const;
}

export function AffiliateInvoicesClient() {
  const { t, locale } = useLocale();
  const page = t.dashboard.pages.invoices;
  const ui = useAffiliateUi().invoices;
  const dateTag = localeDateTag(locale);
  const searchParams = useSearchParams();
  const selectedFromQuery = searchParams.get("invoice");

  const [items, setItems] = useState<InvoiceListItem[]>([]);
  const [detail, setDetail] = useState<InvoiceDetail | null>(null);
  const [selected, setSelected] = useState<string | null>(selectedFromQuery);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);

  const formatDate = (iso: string | null) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString(dateTag, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const statusLabel = (status: string) => {
    if (status === "paid") return ui.statusPaid;
    if (status === "pending") return ui.statusPending;
    if (status === "failed") return ui.statusFailed;
    return status;
  };

  const localizeLine = (description: string) => {
    if (/^PPN\s*11%/i.test(description)) return ui.vatLine;
    if (/^Paket\s+/i.test(description)) {
      return ui.planLine.replace("{detail}", description.replace(/^Paket\s+/i, ""));
    }
    return description;
  };

  const load = useCallback(async () => {
    const data = await billingService.listInvoices();
    setItems(data.items);
    const initial =
      selectedFromQuery &&
      data.items.some((item) => item.invoiceNumber === selectedFromQuery)
        ? selectedFromQuery
        : data.items[0]?.invoiceNumber ?? null;
    setSelected(initial);
  }, [selectedFromQuery]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await authService.ensureAffiliateApiSession();
      if (cancelled) return;
      setReady(ok);
      if (!ok) {
        setLoading(false);
        toast.error(ui.errorTitle);
        return;
      }
      try {
        await load();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : ui.errorTitle);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load, ui.errorTitle]);

  useEffect(() => {
    if (!selected || !ready) {
      setDetail(null);
      return;
    }
    let cancelled = false;
    setDetailLoading(true);
    (async () => {
      try {
        const data = await billingService.getInvoice(selected);
        if (!cancelled) setDetail(data);
      } catch (error) {
        if (!cancelled) {
          setDetail(null);
          toast.error(error instanceof Error ? error.message : ui.noneSelected);
        }
      } finally {
        if (!cancelled) setDetailLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, selected, ui.noneSelected]);

  const selectedItem = useMemo(
    () => items.find((item) => item.invoiceNumber === selected) ?? null,
    [items, selected],
  );

  if (loading) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {ui.loading}
      </p>
    );
  }

  if (!ready) {
    return (
      <ErrorState
        title={ui.errorTitle}
        description={ui.errorDescription}
        onRetry={() => {
          setLoading(true);
          void load().finally(() => setLoading(false));
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
            {page.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {page.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/affiliate/billing"
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          >
            {ui.billing}
          </Link>
          <Link
            href="/affiliate/usage#upgrade"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            {ui.buyQuota}
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden p-0">
          <div className="border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
            <h2 className="font-semibold text-black dark:text-white">
              {ui.allInvoices}
            </h2>
          </div>
          {items.length === 0 ? (
            <p className="px-5 py-8 text-sm text-neutral-500 dark:text-neutral-400">
              {ui.empty}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                    <th className="px-5 py-3 font-medium">{ui.colNumber}</th>
                    <th className="px-5 py-3 font-medium">{ui.colPlan}</th>
                    <th className="px-5 py-3 font-medium">{ui.colDate}</th>
                    <th className="px-5 py-3 font-medium">{ui.colStatus}</th>
                    <th className="px-5 py-3 font-medium text-right">{ui.colTotal}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const active = item.invoiceNumber === selected;
                    return (
                      <tr
                        key={item.id}
                        className={cn(
                          "cursor-pointer border-b border-neutral-100 last:border-0 dark:border-neutral-800/80",
                          active
                            ? "bg-neutral-50 dark:bg-neutral-800/60"
                            : "hover:bg-neutral-50/80 dark:hover:bg-neutral-900/50",
                        )}
                        onClick={() => setSelected(item.invoiceNumber)}
                      >
                        <td className="px-5 py-3.5 font-medium text-black dark:text-white">
                          {item.invoiceNumber}
                        </td>
                        <td className="px-5 py-3.5 text-neutral-600 dark:text-neutral-300">
                          {item.planName}
                        </td>
                        <td className="px-5 py-3.5 text-neutral-600 dark:text-neutral-300">
                          {formatDate(item.paidAt ?? item.createdAt)}
                        </td>
                        <td className="px-5 py-3.5">
                          <Badge variant={statusVariant(item.status)}>
                            {statusLabel(item.status)}
                          </Badge>
                        </td>
                        <td className="px-5 py-3.5 text-right font-medium text-black dark:text-white">
                          {formatIdr(item.total)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card className="space-y-4 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-black dark:text-white">
                {ui.detailTitle}
              </h2>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {selectedItem?.invoiceNumber ?? ui.selectPrompt}
              </p>
            </div>
            {detail ? (
              <Badge variant={statusVariant(detail.status)}>
                {statusLabel(detail.status)}
              </Badge>
            ) : null}
          </div>

          {detailLoading ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {ui.loadingDetail}
            </p>
          ) : !detail ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {ui.noneSelected}
            </p>
          ) : (
            <>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-neutral-500 dark:text-neutral-400">{ui.labelPlan}</dt>
                  <dd className="mt-0.5 font-medium text-black dark:text-white">
                    {detail.planName}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500 dark:text-neutral-400">{ui.labelMethod}</dt>
                  <dd className="mt-0.5 font-medium uppercase text-black dark:text-white">
                    {detail.method}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500 dark:text-neutral-400">{ui.labelPaidAt}</dt>
                  <dd className="mt-0.5 font-medium text-black dark:text-white">
                    {formatDate(detail.paidAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500 dark:text-neutral-400">{ui.labelPeriod}</dt>
                  <dd className="mt-0.5 font-medium text-black dark:text-white">
                    {formatDate(detail.periodStart)} – {formatDate(detail.periodEnd)}
                  </dd>
                </div>
              </dl>

              <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
                      <th className="px-3 py-2 font-medium">{ui.colDescription}</th>
                      <th className="px-3 py-2 font-medium text-right">{ui.colAmount}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.lines.map((line) => (
                      <tr
                        key={line.description}
                        className="border-b border-neutral-100 last:border-0 dark:border-neutral-800/80"
                      >
                        <td className="px-3 py-2.5 text-neutral-700 dark:text-neutral-300">
                          {localizeLine(line.description)}
                        </td>
                        <td className="px-3 py-2.5 text-right text-black dark:text-white">
                          {formatIdr(line.amount)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="px-3 py-2.5 font-semibold text-black dark:text-white">
                        {ui.total}
                      </td>
                      <td className="px-3 py-2.5 text-right font-semibold text-black dark:text-white">
                        {formatIdr(detail.total)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Button
                type="button"
                size="sm"
                onClick={() => {
                  if (!detail) return;
                  setPdfOpen(true);
                }}
              >
                <Printer className="h-3.5 w-3.5" />
                {ui.printPdf}
              </Button>
            </>
          )}
        </Card>
      </div>

      <InvoicePdfPreviewModal
        open={pdfOpen}
        invoice={detail}
        onClose={() => setPdfOpen(false)}
      />
    </div>
  );
}
