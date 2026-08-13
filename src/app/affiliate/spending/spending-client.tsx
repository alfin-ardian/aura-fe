"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { KpiGrid } from "@/components/ui/kpi-grid";
import { localeDateTag, useAffiliateUi } from "@/i18n/affiliate-ui";
import { useLocale } from "@/i18n/locale-provider";
import { formatIdr } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import {
  billingService,
  type SpendingDashboard,
} from "@/services/billing.service";
import type { KpiCard } from "@/types";

export function AffiliateSpendingClient() {
  const { t, locale } = useLocale();
  const page = t.dashboard.pages.spending;
  const ui = useAffiliateUi().spending;
  const statusUi = useAffiliateUi().invoices;
  const dateTag = localeDateTag(locale);
  const [spending, setSpending] = useState<SpendingDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const formatDate = (iso: string | null) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString(dateTag, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatMonthKey = (key: string) => {
    const date = new Date(`${key}-01T00:00:00`);
    if (Number.isNaN(date.getTime())) return key;
    return date.toLocaleDateString(dateTag, { month: "short", year: "numeric" });
  };

  const statusLabel = (status: string) => {
    if (status === "paid") return statusUi.statusPaid;
    if (status === "pending") return statusUi.statusPending;
    if (status === "failed") return statusUi.statusFailed;
    return status;
  };

  const load = useCallback(async () => {
    const data = await billingService.getSpending();
    setSpending(data);
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

  const kpis: KpiCard[] = useMemo(() => {
    if (!spending) return [];
    const delta = spending.monthToDate - spending.previousMonth;
    const deltaHint =
      spending.previousMonth === 0
        ? ui.vsLastMonth
        : ui.vsLastMonthDelta.replace(
            "{delta}",
            `${delta >= 0 ? "+" : ""}${formatIdr(delta)}`,
          );
    return [
      {
        label: ui.monthToDate,
        value: formatIdr(spending.monthToDate),
        hint: deltaHint,
      },
      {
        label: ui.projectedMonth,
        value: formatIdr(spending.projectedMonth),
        hint: ui.projectedHint,
      },
      {
        label: ui.averageMonth,
        value: formatIdr(spending.averagePerMonth),
        hint: ui.averageHint,
      },
      {
        label: ui.previousMonth,
        value: formatIdr(spending.previousMonth),
        hint: ui.previousHint,
      },
    ];
  }, [spending, ui]);

  if (loading) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {ui.loading}
      </p>
    );
  }

  if (!ready || !spending) {
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

  const chartData = spending.months.map((month) => ({
    label: formatMonthKey(month.key),
    total: month.total,
  }));
  const maxTotal = Math.max(...chartData.map((item) => item.total), 1);

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
        <Link
          href="/affiliate/billing"
          className="text-sm font-medium text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-300"
        >
          {ui.openBilling}
        </Link>
      </div>

      <KpiGrid items={kpis} />

      <Card className="p-5 sm:p-6">
        <h2 className="mb-4 font-semibold text-black dark:text-white">
          {ui.trendTitle}
        </h2>
        <div className="h-64 w-full">
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
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
          <h2 className="font-semibold text-black dark:text-white">
            {ui.recentCharges}
          </h2>
        </div>
        {spending.recent.length === 0 ? (
          <p className="px-5 py-8 text-sm text-neutral-500 dark:text-neutral-400">
            {ui.emptyCharges}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                  <th className="px-5 py-3 font-medium">{ui.colInvoice}</th>
                  <th className="px-5 py-3 font-medium">{ui.colPlan}</th>
                  <th className="px-5 py-3 font-medium">{ui.colDate}</th>
                  <th className="px-5 py-3 font-medium">{ui.colStatus}</th>
                  <th className="px-5 py-3 font-medium text-right">{ui.colAmount}</th>
                </tr>
              </thead>
              <tbody>
                {spending.recent.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-neutral-100 last:border-0 dark:border-neutral-800/80"
                  >
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/affiliate/invoices?invoice=${encodeURIComponent(item.invoiceNumber)}`}
                        className="font-medium text-black underline-offset-4 hover:underline dark:text-white"
                      >
                        {item.invoiceNumber}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-neutral-600 dark:text-neutral-300">
                      {item.planName}
                    </td>
                    <td className="px-5 py-3.5 text-neutral-600 dark:text-neutral-300">
                      {formatDate(item.paidAt)}
                    </td>
                    <td className="px-5 py-3.5 text-neutral-600 dark:text-neutral-300">
                      {statusLabel(item.status)}
                    </td>
                    <td className="px-5 py-3.5 text-right font-medium text-black dark:text-white">
                      {formatIdr(item.total)}
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
