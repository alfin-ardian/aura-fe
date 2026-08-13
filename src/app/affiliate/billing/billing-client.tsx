"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Gift, X } from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { localeDateTag, useAffiliateUi } from "@/i18n/affiliate-ui";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import {
  billingService,
  type BillingOverview,
} from "@/services/billing.service";

export function AffiliateBillingClient() {
  const { t, locale } = useLocale();
  const page = t.dashboard.pages.billing;
  const ui = useAffiliateUi().billing;
  const dateTag = localeDateTag(locale);
  const [billing, setBilling] = useState<BillingOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [promoOpen, setPromoOpen] = useState(true);

  const formatNumber = (value: number) => value.toLocaleString(dateTag);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(dateTag, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatRange = (start: string, end: string) => {
    const opts: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const s = new Date(start).toLocaleDateString(dateTag, opts);
    const e = new Date(end).toLocaleDateString(dateTag, opts);
    return `${s} – ${e}`;
  };

  const priceOnly = billing?.priceLabel.replace(/\/.*$/, "") ?? "";

  const load = useCallback(async () => {
    const data = await billingService.getBilling();
    setBilling(data);
  }, []);

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

  if (loading) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {ui.loading}
      </p>
    );
  }

  if (!ready || !billing) {
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

  const includedRows = [
    {
      item: ui.scanCredits,
      allowance: ui.scansAllowance.replace("{quota}", formatNumber(billing.quota)),
      usage: `${formatNumber(billing.used)} / ${formatNumber(billing.quota)}`,
      percent: billing.percent,
    },
    {
      item: ui.productMatches,
      allowance: ui.unlimited,
      usage: ui.included,
      percent: 0,
    },
    {
      item: ui.referralAnalytics,
      allowance: ui.included,
      usage: ui.included,
      percent: 0,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
            {page.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {page.subtitle}
          </p>
        </div>
        <Link
          href="/affiliate/invoices"
          className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
        >
          {ui.viewInvoices}
        </Link>
      </div>

      {promoOpen && billing.annualPromo.enabled ? (
        <div className="flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-emerald-900/60 dark:bg-emerald-950/40">
          <div className="flex items-start gap-3">
            <Gift className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
            <div>
              <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
                {ui.promoTitle}
              </p>
              <p className="mt-0.5 text-xs text-emerald-800/80 dark:text-emerald-300/80">
                {ui.promoBody}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Link
              href={billing.annualPromo.ctaHref}
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "border-emerald-300 bg-transparent text-emerald-900 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-100 dark:hover:bg-emerald-900/50",
              )}
            >
              {ui.promoCta}
            </Link>
            <button
              type="button"
              aria-label={ui.promoClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-emerald-800/70 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
              onClick={() => setPromoOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}

      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            {billing.planName} · {ui.pricePerMonth.replace("{price}", priceOnly)}
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {ui.creditsPerPeriod.replace("{quota}", formatNumber(billing.quota))}{" "}
            {billing.autoRenew
              ? ui.autoRenew.replace("{date}", formatDate(billing.renewsAt))
              : ui.endsOn.replace("{date}", formatDate(billing.renewsAt))}
          </p>
        </div>
        <Link
          href="/affiliate/usage#upgrade"
          className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "shrink-0")}
        >
          {ui.adjustPlan}
        </Link>
      </Card>

      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-black dark:text-white">
            {ui.payment}
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {ui.paymentProvider} · {ui.paymentMethods}
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() =>
            toast.message(ui.paymentToastTitle, {
              description: ui.paymentToastBody,
            })
          }
        >
          {ui.managePayment}
        </Button>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="flex flex-col gap-1 border-b border-neutral-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            {ui.includedUsage}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {formatRange(billing.periodStart, billing.periodEnd)}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                <th className="px-5 py-3 font-medium">{ui.colItem}</th>
                <th className="px-5 py-3 font-medium">{ui.colAllowance}</th>
                <th className="px-5 py-3 font-medium">{ui.colUsage}</th>
              </tr>
            </thead>
            <tbody>
              {includedRows.map((row) => (
                <tr
                  key={row.item}
                  className="border-b border-neutral-100 last:border-0 dark:border-neutral-800/80"
                >
                  <td className="px-5 py-3.5 font-medium text-black dark:text-white">
                    {row.item}
                  </td>
                  <td className="px-5 py-3.5 text-neutral-600 dark:text-neutral-300">
                    {row.allowance}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="space-y-1.5">
                      <p className="text-neutral-600 dark:text-neutral-300">{row.usage}</p>
                      {row.percent > 0 ? (
                        <ProgressBar value={row.percent} className="h-1.5 max-w-[10rem]" />
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200 px-5 py-3 dark:border-neutral-800">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {ui.remainingQuota
              .replace("{remaining}", formatNumber(billing.remaining))
              .replace("{quota}", formatNumber(billing.quota))}
          </p>
          <Link
            href="/affiliate/invoices"
            className="text-sm font-medium text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-300"
          >
            {ui.viewInvoicesArrow}
          </Link>
        </div>
      </Card>
    </div>
  );
}
