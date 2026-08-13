"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { KpiGrid } from "@/components/ui/kpi-grid";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SimpleBarChart } from "@/components/ui/simple-bar-chart";
import { localeDateTag, useAffiliateUi } from "@/i18n/affiliate-ui";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";
import type { KpiCard, TrendPoint } from "@/types";
import { authService } from "@/services/auth.service";
import {
  analyticsService,
  type AffiliateOverview,
  type AnalyticsDashboard,
  type AnalyticsRange,
} from "@/services/analytics.service";

const RANGE_LABELS: Record<AnalyticsRange, Record<"en" | "id" | "ko", string>> = {
  "7d": { en: "7 days", id: "7 hari", ko: "7일" },
  "30d": { en: "30 days", id: "30 hari", ko: "30일" },
  "90d": { en: "90 days", id: "90 hari", ko: "90일" },
};

function formatTrend(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}%`;
}

export function AffiliateAnalyticsClient() {
  const { t, locale } = useLocale();
  const page = t.dashboard.pages.analytics;
  const o = t.dashboard.overview;
  const ui = useAffiliateUi().analytics;
  const dateTag = localeDateTag(locale);
  const [range, setRange] = useState<AnalyticsRange>("30d");
  const [dashboard, setDashboard] = useState<AnalyticsDashboard | null>(null);
  const [overview, setOverview] = useState<AffiliateOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const formatCount = (value: number) => value.toLocaleString(dateTag);

  const localizeUndertone = (name: string) => {
    const key = name.trim().toLowerCase();
    if (key === "warm") return ui.undertoneWarm;
    if (key === "neutral") return ui.undertoneNeutral;
    if (key === "cool") return ui.undertoneCool;
    return name;
  };

  const load = useCallback(async (nextRange: AnalyticsRange) => {
    const [dashboardData, overviewData] = await Promise.all([
      analyticsService.getDashboard(nextRange),
      analyticsService.getOverview(),
    ]);
    setDashboard(dashboardData);
    setOverview(overviewData);
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
        setLoading(true);
        await load(range);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : ui.errorTitle);
        setDashboard(null);
        setOverview(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load, range, ui.errorTitle]);

  const chartData: TrendPoint[] = useMemo(() => {
    if (!dashboard?.trends.length) return [];
    return dashboard.trends;
  }, [dashboard]);

  const kpis: KpiCard[] = useMemo(() => {
    if (!dashboard || !overview) return [];
    const remaining =
      overview.usage.remaining ??
      Math.max(0, overview.usage.limit - overview.usage.used);
    const matchRate = Math.round(dashboard.summary.matchRate);
    const topPickRate = Math.round(overview.funnel.topPickRate);
    const planHint =
      overview.usage.limit > 0
        ? o.ofPlan
            .replace("{limit}", formatCount(overview.usage.limit))
            .replace("{plan}", overview.usage.plan)
        : overview.usage.plan;
    const rangeHint = RANGE_LABELS[dashboard.range][locale];

    return [
      {
        label: o.totalScans,
        value: formatCount(dashboard.summary.totalScans),
        hint: `${rangeHint} · ${formatTrend(dashboard.summary.scansTrend)}`,
      },
      {
        label: o.productMatches,
        value: formatCount(dashboard.summary.scansWithMatches),
        hint: `${o.matchRate.replace("{rate}", String(matchRate))} · ${formatTrend(dashboard.summary.matchRateTrend)}`,
      },
      {
        label: o.scanCreditsLeft,
        value: formatCount(remaining),
        hint: planHint,
      },
      {
        label: o.topPickRate,
        value: `${topPickRate}%`,
        hint: o.usersWhoClicked,
      },
    ];
  }, [dashboard, dateTag, locale, o, overview]);

  if (loading && !dashboard) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{ui.loading}</p>
    );
  }

  if (!ready || !dashboard || !overview) {
    return (
      <ErrorState
        title={ui.errorTitle}
        description={ui.errorDescription}
        onRetry={() => {
          setLoading(true);
          void load(range).finally(() => setLoading(false));
        }}
      />
    );
  }

  const products = dashboard.products.slice(0, 8);
  const activityTitle =
    range === "7d"
      ? ui.dailyActivity
      : range === "90d"
        ? ui.monthlyActivity
        : ui.weeklyActivity;

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
        <div className="inline-flex rounded-full border border-neutral-200 p-1 dark:border-neutral-700">
          {(["7d", "30d", "90d"] as AnalyticsRange[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRange(item)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition",
                range === item
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white",
              )}
            >
              {RANGE_LABELS[item][locale]}
            </button>
          ))}
        </div>
      </div>

      <KpiGrid items={kpis} />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-semibold text-black dark:text-white">
              {activityTitle}
            </h2>
            <Badge variant="default">
              {range === "7d" ? "7d" : range === "90d" ? "90d" : "30d"}
            </Badge>
          </div>
          {chartData.some((item) => item.scans > 0 || item.matches > 0) ? (
            <SimpleBarChart data={chartData} />
          ) : (
            <p className="py-16 text-center text-sm text-neutral-500 dark:text-neutral-400">
              {ui.emptyActivity}
            </p>
          )}
        </Card>

        <Card className="space-y-5 p-5 sm:p-6">
          <h2 className="font-semibold text-black dark:text-white">
            {ui.referralFunnel}
          </h2>
          <div className="space-y-4">
            <div>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="text-neutral-500 dark:text-neutral-400">
                  {ui.funnelScans}
                </span>
                <span className="font-medium text-black dark:text-white">
                  {formatCount(overview.funnel.scans)}
                </span>
              </div>
              <ProgressBar value={overview.funnel.scanBarPct} />
            </div>
            <div>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="text-neutral-500 dark:text-neutral-400">
                  {ui.funnelWithMatches}
                </span>
                <span className="font-medium text-black dark:text-white">
                  {formatCount(overview.funnel.scansWithMatches)} ·{" "}
                  {Math.round(overview.funnel.matchRate)}%
                </span>
              </div>
              <ProgressBar value={overview.funnel.matchBarPct} />
            </div>
            <div>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="text-neutral-500 dark:text-neutral-400">
                  {ui.funnelTopPicks}
                </span>
                <span className="font-medium text-black dark:text-white">
                  {formatCount(overview.funnel.topPicks)} ·{" "}
                  {Math.round(overview.funnel.topPickRate)}%
                </span>
              </div>
              <ProgressBar value={overview.funnel.topPickBarPct} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <h2 className="font-semibold text-black dark:text-white">
            {ui.topUndertones}
          </h2>
          {dashboard.undertones.length === 0 ? (
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
              {ui.emptyUndertones}
            </p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {dashboard.undertones.slice(0, 5).map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-3 last:border-0 dark:border-neutral-800"
                >
                  <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {localizeUndertone(item.name)}
                  </span>
                  <span className="font-medium text-black dark:text-white">
                    {item.percentage}% · {formatCount(item.count)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="font-semibold text-black dark:text-white">
            {ui.topCategories}
          </h2>
          {dashboard.categories.length === 0 ? (
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
              {ui.emptyCategories}
            </p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {dashboard.categories.slice(0, 5).map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-3 last:border-0 dark:border-neutral-800"
                >
                  <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </span>
                  <span className="font-medium text-black dark:text-white">
                    {item.percentage}% · {formatCount(item.count)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
          <h2 className="font-semibold text-black dark:text-white">
            {ui.topProducts}
          </h2>
        </div>
        {products.length === 0 ? (
          <p className="px-5 py-8 text-sm text-neutral-500 dark:text-neutral-400">
            {ui.emptyProducts}
          </p>
        ) : (
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {products.map((product, index) => (
              <li
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-4 text-sm"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-6 shrink-0 text-neutral-400">{index + 1}</span>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-black dark:text-white">
                      {product.name}
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-400">
                      {product.brand}
                      {product.category ? ` · ${product.category}` : ""}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 font-medium text-black dark:text-white">
                  {ui.matchesCount.replace("{count}", formatCount(product.matches))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
