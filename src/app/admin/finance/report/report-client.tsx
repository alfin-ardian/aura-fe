"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { localeDateTag } from "@/i18n/affiliate-ui";
import { useLocale } from "@/i18n/locale-provider";
import { cn, formatIdr } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import {
  billingService,
  type PlatformFinanceReport,
} from "@/services/billing.service";
import { FinanceTabs } from "../finance-tabs";

const PLAN_COLORS = ["#0a0a0a", "#E879A9", "#737373", "#F4A7BC", "#404040"];

type RangeMode = "month" | "year";

export function AdminFinanceReportClient() {
  const { locale } = useLocale();
  const dateTag = localeDateTag(locale);
  const [data, setData] = useState<PlatformFinanceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<RangeMode>("month");

  const labels =
    locale === "ko"
      ? {
          title: "재무 리포트",
          subtitle: "월별·연별 패키지 매출 통계입니다.",
          loading: "리포트 불러오는 중...",
          errorTitle: "리포트를 연결할 수 없습니다",
          errorDescription: "재무 리포트 API에 접근할 수 없습니다.",
          thisMonth: "이번 달",
          thisYear: "올해",
          monthly: "월별",
          yearly: "연별",
          trendTitle: "매출 추이",
          byPlan: "패키지별 매출",
          empty: "결제 데이터가 없습니다.",
          payments: "결제 {count}건",
        }
      : locale === "en"
        ? {
            title: "Finance report",
            subtitle: "Monthly and yearly package revenue statistics.",
            loading: "Loading report...",
            errorTitle: "Report not connected",
            errorDescription: "Finance report API is unavailable.",
            thisMonth: "This month",
            thisYear: "This year",
            monthly: "Monthly",
            yearly: "Yearly",
            trendTitle: "Revenue trend",
            byPlan: "Revenue by package",
            empty: "No payment data yet.",
            payments: "{count} payments",
          }
        : {
            title: "Laporan keuangan",
            subtitle: "Statistik pendapatan paket per bulan dan per tahun.",
            loading: "Memuat laporan...",
            errorTitle: "Laporan belum terhubung",
            errorDescription: "API laporan keuangan belum bisa diakses.",
            thisMonth: "Bulan ini",
            thisYear: "Tahun ini",
            monthly: "Per bulan",
            yearly: "Per tahun",
            trendTitle: "Tren pendapatan",
            byPlan: "Pendapatan per paket",
            empty: "Belum ada data pembayaran.",
            payments: "{count} pembayaran",
          };

  const load = useCallback(async () => {
    const result = await billingService.getPlatformFinanceReport();
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
        toast.error(labels.errorTitle);
        return;
      }
      try {
        await load();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : labels.errorTitle);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load, labels.errorTitle]);

  const chartData = useMemo(() => {
    if (!data) return [];
    const source = mode === "month" ? data.months : data.years;
    return source.map((item) => {
      let label = item.label;
      if (mode === "month" && /^\d{4}-\d{2}$/.test(item.key)) {
        label = new Date(`${item.key}-01T00:00:00`).toLocaleDateString(dateTag, {
          month: "short",
          year: "numeric",
        });
      }
      return {
        label,
        total: item.total,
        payments: item.payments,
      };
    });
  }, [data, dateTag, mode]);

  const maxTotal = Math.max(...chartData.map((item) => item.total), 1);

  if (loading) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{labels.loading}</p>
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
            {labels.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {labels.subtitle}
          </p>
        </div>
        <FinanceTabs />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {labels.thisMonth}
          </p>
          <p className="mt-2 text-2xl font-semibold text-black dark:text-white">
            {formatIdr(data.thisMonthTotal)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {labels.thisYear}
          </p>
          <p className="mt-2 text-2xl font-semibold text-black dark:text-white">
            {formatIdr(data.thisYearTotal)}
          </p>
        </Card>
      </div>

      <Card className="p-5 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold text-black dark:text-white">
            {labels.trendTitle}
          </h2>
          <div className="inline-flex rounded-full border border-neutral-200 p-1 dark:border-neutral-700">
            {([
              ["month", labels.monthly],
              ["year", labels.yearly],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                  mode === value
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {chartData.every((item) => item.total === 0) ? (
          <p className="py-16 text-center text-sm text-neutral-500 dark:text-neutral-400">
            {labels.empty}
          </p>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#737373", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={56}
                  tick={{ fill: "#737373", fontSize: 12 }}
                  tickFormatter={(value: number) =>
                    value >= 1000 ? `${Math.round(value / 1000)}k` : String(value)
                  }
                  domain={[0, Math.ceil(maxTotal * 1.15)]}
                />
                <Tooltip
                  formatter={(value) => formatIdr(Number(value ?? 0))}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e5e5e5",
                    boxShadow: "none",
                  }}
                />
                <Bar dataKey="total" fill="#0a0a0a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="mb-4 font-semibold text-black dark:text-white">
          {labels.byPlan}
        </h2>
        {data.byPlan.length === 0 ? (
          <p className="py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
            {labels.empty}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
            <div className="mx-auto h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.byPlan}
                    dataKey="total"
                    nameKey="planName"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={2}
                  >
                    {data.byPlan.map((entry, index) => (
                      <Cell
                        key={entry.planId}
                        fill={PLAN_COLORS[index % PLAN_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatIdr(Number(value ?? 0))}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #e5e5e5",
                      boxShadow: "none",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-3 text-sm">
              {data.byPlan.map((plan, index) => (
                <li
                  key={plan.planId}
                  className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-3 last:border-0 dark:border-neutral-800"
                >
                  <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: PLAN_COLORS[index % PLAN_COLORS.length],
                      }}
                    />
                    {plan.planName}
                  </span>
                  <span className="text-right">
                    <span className="block font-medium text-black dark:text-white">
                      {formatIdr(plan.total)}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {labels.payments.replace(
                        "{count}",
                        plan.payments.toLocaleString(dateTag),
                      )}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
}
