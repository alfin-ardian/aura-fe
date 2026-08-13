"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { KpiGrid } from "@/components/ui/kpi-grid";
import { SimpleBarChart } from "@/components/ui/simple-bar-chart";
import { useLocale } from "@/i18n/locale-provider";
import { API_URL } from "@/lib/api-url";
import { getStoredUser } from "@/lib/auth-storage";
import type { KpiCard, TrendPoint } from "@/types";
import { authService } from "@/services/auth.service";
import {
  analyticsService,
  buildPublicScanLink,
  type AffiliateOverview,
} from "@/services/analytics.service";

function formatCount(value: number, locale: string) {
  return value.toLocaleString(
    locale === "ko" ? "ko-KR" : locale === "id" ? "id-ID" : "en-US",
  );
}

function weekLabels(locale: string): string[] {
  if (locale === "ko") return ["월", "화", "수", "목", "금", "토", "일"];
  if (locale === "id") return ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
}

function localeTag(locale: string) {
  return locale === "ko" ? "ko-KR" : locale === "id" ? "id-ID" : "en-US";
}

export function AffiliateOverviewClient() {
  const { t, locale } = useLocale();
  const o = t.dashboard.overview;
  const [overview, setOverview] = useState<AffiliateOverview | null>(null);
  const [referralLink, setReferralLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const bootstrap = useCallback(async () => {
    setErrorMessage(null);
    setOverview(null);
    const ok = await authService.ensureAffiliateApiSession();
    setReady(ok);
    if (!ok) {
      setErrorMessage(
        `Sesi API tidak valid. Login ulang, pastikan API ${API_URL} dapat dijangkau.`,
      );
      toast.error("Sesi habis. Silakan login ulang sebagai Affiliate.");
      return;
    }
    const stored = getStoredUser();
    if (stored?.id) setReferralLink(buildPublicScanLink(stored.id));
    try {
      const data = await analyticsService.getOverview();
      setOverview(data);
      if (data.affiliatorId) {
        setReferralLink(buildPublicScanLink(data.affiliatorId));
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal memuat overview";
      setErrorMessage(`${message} (API: ${API_URL})`);
      toast.error(message);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await bootstrap();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bootstrap]);

  const kpis: KpiCard[] = useMemo(() => {
    if (!overview) return [];
    const remaining =
      overview.usage.remaining ??
      Math.max(0, overview.usage.limit - overview.usage.used);
    const matchRate = Math.round(overview.summary.matchRate);
    const topPickRate = Math.round(overview.funnel.topPickRate);
    const planHint =
      overview.usage.limit > 0
        ? o.ofPlan
            .replace("{limit}", formatCount(overview.usage.limit, locale))
            .replace("{plan}", overview.usage.plan)
        : overview.usage.plan;

    return [
      {
        label: o.totalScans,
        value: formatCount(overview.summary.totalScans, locale),
        hint: o.last30Days,
      },
      {
        label: o.productMatches,
        value: formatCount(overview.summary.scansWithMatches, locale),
        hint: o.matchRate.replace("{rate}", String(matchRate)),
      },
      {
        label: o.scanCreditsLeft,
        value: formatCount(remaining, locale),
        hint: planHint,
      },
      {
        label: o.topPickRate,
        value: `${topPickRate}%`,
        hint: o.usersWhoClicked,
      },
    ];
  }, [locale, o, overview]);

  const copyLink = async () => {
    if (!referralLink) {
      toast.error("Referral link belum siap");
      return;
    }
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success(o.copied);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  };

  const weekData: TrendPoint[] = useMemo(() => {
    const labels = weekLabels(locale);
    const source = overview?.weekTrends?.length
      ? overview.weekTrends
      : labels.map((label) => ({ label, scans: 0, matches: 0 }));
    return source.map((item, index) => ({
      ...item,
      label: labels[index] ?? item.label,
    }));
  }, [locale, overview]);

  const recentLeads = overview?.recentLeads.slice(0, 5) ?? [];

  const leadSummary = (lead: AffiliateOverview["recentLeads"][number]) => {
    const parts = [lead.detectedSkinTone, lead.detectedUndertone, lead.faceShape].filter(
      Boolean,
    );
    if (parts.length) return parts.join(" · ");
    if (lead.matchedProductCount > 0) {
      return o.productMatchesCount.replace("{count}", String(lead.matchedProductCount));
    }
    return o.scanCompleted;
  };

  if (loading) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {t.workspace.loading}
      </p>
    );
  }

  if (!ready || !overview) {
    return (
      <ErrorState
        title="Overview belum terhubung"
        description={
          errorMessage ??
          `API analytics belum bisa diakses. Periksa koneksi ke ${API_URL}.`
        }
        onRetry={() => {
          setLoading(true);
          void bootstrap().finally(() => setLoading(false));
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
            {o.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {o.subtitle}
          </p>
        </div>
        <Button type="button" onClick={() => void copyLink()}>
          {copied ? o.copied : o.copyReferral}
        </Button>
      </div>

      <KpiGrid items={kpis} />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-black dark:text-white">
              {o.scansThisWeek}
            </h2>
          </div>
          <SimpleBarChart data={weekData} />
        </Card>
        <Card className="space-y-4">
          <h2 className="font-semibold text-black dark:text-white">
            {o.publicScanLink}
          </h2>
          <p className="break-all rounded-lg bg-neutral-50 px-3 py-3 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
            {referralLink || "—"}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {o.publicScanHint}
          </p>
          <Link
            href="/affiliate/usage"
            className="inline-flex text-sm font-medium text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-300"
          >
            {o.checkUsage}
          </Link>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
          <h2 className="font-semibold text-black dark:text-white">{o.recentLeads}</h2>
          <Link
            href="/affiliate/leads"
            className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            {o.viewAll}
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="px-5 py-8 text-sm text-neutral-500 dark:text-neutral-400">
            {o.noLeads}
          </p>
        ) : (
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {recentLeads.map((lead) => (
              <li
                key={lead.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <div>
                  <p className="font-medium text-black dark:text-white">
                    {lead.followerName || o.guest}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {leadSummary(lead)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-black dark:text-white">
                    {lead.topMatchedProduct}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {new Date(lead.scanDate).toLocaleDateString(localeTag(locale), {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
