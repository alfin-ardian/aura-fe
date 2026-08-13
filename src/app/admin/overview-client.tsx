"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { KpiGrid } from "@/components/ui/kpi-grid";
import { SimpleBarChart } from "@/components/ui/simple-bar-chart";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";
import type { KpiCard, TrendPoint } from "@/types";
import { authService } from "@/services/auth.service";
import {
  analyticsService,
  type PlatformOverview,
} from "@/services/analytics.service";

function localeTag(locale: string) {
  return locale === "ko" ? "ko-KR" : locale === "id" ? "id-ID" : "en-US";
}

function formatCount(value: number, locale: string) {
  const tag = localeTag(locale);
  if (value >= 1000) {
    return value.toLocaleString(tag, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
  }
  return value.toLocaleString(tag);
}

function weekLabels(locale: string): string[] {
  if (locale === "ko") return ["월", "화", "수", "목", "금", "토", "일"];
  if (locale === "id") return ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
}

export function AdminOverviewClient() {
  const { locale } = useLocale();
  const [data, setData] = useState<PlatformOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const labels =
    locale === "ko"
      ? {
          title: "개요",
          subtitle: "플랫폼 현황 (실시간 API).",
          weekly: "주간 스캔 vs 매칭",
          recent: "최근 파트너",
          loading: "불러오는 중...",
          errorTitle: "개요를 연결할 수 없습니다",
          errorDescription: "플랫폼 분석 API에 접근할 수 없습니다.",
          totalAffiliators: "총 파트너",
          activeAffiliators: "활성 파트너",
          platformScans: "플랫폼 스캔",
          matchRate: "매칭률",
          newThisMonth: "+{n} 이번 달",
          activePct: "{n}% 활성",
          vsLastMonth: "{n}% 지난달 대비",
          acrossPartners: "전체 파트너 기준",
          colName: "이름",
          colEmail: "이메일",
          colScans: "스캔",
          colStatus: "상태",
          active: "활성",
          inactive: "비활성",
          detail: "상세",
          empty: "파트너가 없습니다.",
          live: "Live",
        }
      : locale === "en"
        ? {
            title: "Overview",
            subtitle: "Platform snapshot from live API data.",
            weekly: "Weekly scans vs matches",
            recent: "Recent affiliators",
            loading: "Loading...",
            errorTitle: "Overview not connected",
            errorDescription: "Platform analytics API is unavailable.",
            totalAffiliators: "Total Affiliators",
            activeAffiliators: "Active Affiliators",
            platformScans: "Platform Scans",
            matchRate: "Match Rate",
            newThisMonth: "+{n} this month",
            activePct: "{n}% active",
            vsLastMonth: "{n}% vs last month",
            acrossPartners: "Across all partners",
            colName: "Name",
            colEmail: "Email",
            colScans: "Scans",
            colStatus: "Status",
            active: "Active",
            inactive: "Inactive",
            detail: "Detail",
            empty: "No affiliators yet.",
            live: "Live",
          }
        : {
            title: "Ringkasan",
            subtitle: "Snapshot platform dari data API langsung.",
            weekly: "Scan vs match mingguan",
            recent: "Afiliator terbaru",
            loading: "Memuat...",
            errorTitle: "Ringkasan belum terhubung",
            errorDescription: "API analitik platform tidak tersedia.",
            totalAffiliators: "Total Afiliator",
            activeAffiliators: "Afiliator Aktif",
            platformScans: "Scan Platform",
            matchRate: "Tingkat Match",
            newThisMonth: "+{n} bulan ini",
            activePct: "{n}% aktif",
            vsLastMonth: "{n}% vs bulan lalu",
            acrossPartners: "Semua partner",
            colName: "Nama",
            colEmail: "Email",
            colScans: "Scan",
            colStatus: "Status",
            active: "Aktif",
            inactive: "Nonaktif",
            detail: "Detail",
            empty: "Belum ada afiliator.",
            live: "Live",
          };

  const load = useCallback(async () => {
    const result = await analyticsService.getPlatformOverview();
    setData(result);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await authService.ensureAffiliateApiSession();
      if (cancelled) return;
      setReady(ok);
      if (!ok) {
        setLoading(false);
        toast.error(
          locale === "ko"
            ? "백엔드가 연결되지 않았습니다."
            : locale === "en"
              ? "Backend is not connected."
              : "Backend belum terhubung.",
        );
        return;
      }
      try {
        await load();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : locale === "ko"
              ? "개요를 불러오지 못했습니다"
              : locale === "en"
                ? "Failed to load overview"
                : "Gagal memuat ringkasan",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load, locale]);

  const kpis: KpiCard[] = useMemo(() => {
    if (!data) return [];
    const { summary } = data;
    const trend = summary.scansTrend;
    const trendText = labels.vsLastMonth.replace(
      "{n}",
      `${trend > 0 ? "+" : ""}${trend}`,
    );
    const matchDisplay =
      Number.isInteger(summary.matchRate)
        ? String(summary.matchRate)
        : summary.matchRate.toFixed(1);
    const activeDisplay =
      Number.isInteger(summary.activeRate)
        ? String(summary.activeRate)
        : summary.activeRate.toFixed(1);

    return [
      {
        label: labels.totalAffiliators,
        value: formatCount(summary.totalAffiliators, locale),
        hint: labels.newThisMonth.replace(
          "{n}",
          String(summary.newAffiliatorsThisMonth),
        ),
      },
      {
        label: labels.activeAffiliators,
        value: formatCount(summary.activeAffiliators, locale),
        hint: labels.activePct.replace("{n}", activeDisplay),
      },
      {
        label: labels.platformScans,
        value: formatCount(summary.totalScans, locale),
        hint: trendText,
      },
      {
        label: labels.matchRate,
        value: `${matchDisplay}%`,
        hint: labels.acrossPartners,
      },
    ];
  }, [data, labels, locale]);

  const chartData: TrendPoint[] = useMemo(() => {
    if (!data) return [];
    const days = weekLabels(locale);
    return data.weekTrends.map((point, index) => ({
      ...point,
      label: days[index] ?? point.label,
    }));
  }, [data, locale]);

  if (loading) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {labels.loading}
      </p>
    );
  }

  if (!ready || !data) {
    return (
      <ErrorState
        title={labels.errorTitle}
        description={labels.errorDescription}
        onRetry={() => {
          setLoading(true);
          void load().finally(() => setLoading(false));
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          {labels.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {labels.subtitle}
        </p>
      </div>

      <KpiGrid items={kpis} />

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-black dark:text-white">
            {labels.weekly}
          </h2>
          <Badge variant="success">{labels.live}</Badge>
        </div>
        <SimpleBarChart data={chartData} />
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
          <h2 className="font-semibold text-black dark:text-white">
            {labels.recent}
          </h2>
        </div>
        {data.recentAffiliators.length === 0 ? (
          <p className="px-5 py-8 text-sm text-neutral-500 dark:text-neutral-400">
            {labels.empty}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                <tr>
                  <th className="px-5 py-3 font-medium">{labels.colName}</th>
                  <th className="px-5 py-3 font-medium">{labels.colEmail}</th>
                  <th className="px-5 py-3 font-medium">{labels.colScans}</th>
                  <th className="px-5 py-3 font-medium">{labels.colStatus}</th>
                  <th className="px-5 py-3 font-medium text-right">
                    {labels.detail}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.recentAffiliators.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-neutral-200 dark:border-neutral-800"
                  >
                    <td className="px-5 py-3 font-medium text-black dark:text-white">
                      {row.name}
                    </td>
                    <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400">
                      {row.email}
                    </td>
                    <td className="px-5 py-3">
                      {row.totalScans.toLocaleString(localeTag(locale))}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={row.isActive ? "success" : "default"}>
                        {row.isActive ? labels.active : labels.inactive}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/affiliators/${row.id}`}
                        className={cn(
                          buttonVariants({ variant: "secondary", size: "sm" }),
                        )}
                      >
                        {labels.detail}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
