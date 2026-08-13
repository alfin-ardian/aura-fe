"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { localeDateTag } from "@/i18n/affiliate-ui";
import { useLocale } from "@/i18n/locale-provider";
import { formatIdr } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import {
  billingService,
  type PlatformFinanceDashboard,
} from "@/services/billing.service";
import { FinanceTabs } from "./finance-tabs";

export function AdminFinanceClient() {
  const { t, locale } = useLocale();
  const page = t.dashboard.pages.finance;
  const dateTag = localeDateTag(locale);
  const [data, setData] = useState<PlatformFinanceDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const formatNumber = (value: number) => value.toLocaleString(dateTag);

  const load = useCallback(async () => {
    const result = await billingService.getPlatformFinance();
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
              ? "재무 데이터를 불러오지 못했습니다"
              : locale === "en"
                ? "Failed to load finance data"
                : "Gagal memuat data keuangan",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load, locale]);

  const labels =
    locale === "ko"
      ? {
          totalRevenue: "총 매출",
          affiliators: "파트너",
          empty: "파트너 데이터가 없습니다.",
          loading: "재무 불러오는 중...",
          errorTitle: "재무를 연결할 수 없습니다",
          errorDescription:
            "재무 API에 접근할 수 없습니다. 백엔드가 실행 중인지 확인하세요.",
          colAffiliator: "파트너",
          colPlan: "패키지",
          colPrice: "가격",
          colUsage: "사용률",
          colRevenue: "매출",
          colStatus: "상태",
          active: "활성",
          inactive: "비활성",
          noPlan: "플랜 없음",
          usedOf: "{used} / {quota}",
          invoices: "청구서 {count}건",
        }
      : locale === "en"
        ? {
            totalRevenue: "Total revenue",
            affiliators: "Affiliators",
            empty: "No affiliator data yet.",
            loading: "Loading finance...",
            errorTitle: "Finance not connected",
            errorDescription:
              "Finance API is unavailable. Make sure the backend is running.",
            colAffiliator: "Affiliator",
            colPlan: "Package",
            colPrice: "Price",
            colUsage: "Usage",
            colRevenue: "Revenue",
            colStatus: "Status",
            active: "Active",
            inactive: "Inactive",
            noPlan: "No plan",
            usedOf: "{used} / {quota}",
            invoices: "{count} invoices",
          }
        : {
            totalRevenue: "Total pendapatan",
            affiliators: "Afiliator",
            empty: "Belum ada data afiliator.",
            loading: "Memuat keuangan...",
            errorTitle: "Keuangan belum terhubung",
            errorDescription:
              "API keuangan belum bisa diakses. Pastikan backend berjalan.",
            colAffiliator: "Afiliator",
            colPlan: "Paket",
            colPrice: "Harga",
            colUsage: "Usage",
            colRevenue: "Pendapatan",
            colStatus: "Status",
            active: "Aktif",
            inactive: "Nonaktif",
            noPlan: "Belum berlangganan",
            usedOf: "{used} / {quota}",
            invoices: "{count} invoice",
          };

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
            {page.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {page.subtitle}
          </p>
        </div>
        <FinanceTabs />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {labels.totalRevenue}
          </p>
          <p className="mt-2 text-2xl font-semibold text-black dark:text-white">
            {formatIdr(data.totalRevenue)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {labels.affiliators}
          </p>
          <p className="mt-2 text-2xl font-semibold text-black dark:text-white">
            {formatNumber(data.affiliatorCount)}
          </p>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        {data.items.length === 0 ? (
          <p className="px-5 py-8 text-sm text-neutral-500 dark:text-neutral-400">
            {labels.empty}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                <tr>
                  <th className="px-5 py-3 font-medium">{labels.colAffiliator}</th>
                  <th className="px-5 py-3 font-medium">{labels.colPlan}</th>
                  <th className="px-5 py-3 font-medium">{labels.colPrice}</th>
                  <th className="px-5 py-3 font-medium">{labels.colUsage}</th>
                  <th className="px-5 py-3 font-medium">{labels.colRevenue}</th>
                  <th className="px-5 py-3 font-medium">{labels.colStatus}</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((row) => (
                  <tr
                    key={row.affiliatorId}
                    className="border-t border-neutral-200 dark:border-neutral-800"
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-black dark:text-white">
                        {row.name}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {row.email}
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-black dark:text-white">
                        {row.planId ? row.planName : labels.noPlan}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {labels.invoices.replace(
                          "{count}",
                          formatNumber(row.paidInvoices),
                        )}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-neutral-700 dark:text-neutral-300">
                      {row.priceIdr > 0 ? formatIdr(row.priceIdr) : "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="min-w-[10rem] space-y-1.5">
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-medium text-black dark:text-white">
                            {row.usagePercent}%
                          </span>
                          <span className="text-neutral-500 dark:text-neutral-400">
                            {labels.usedOf
                              .replace("{used}", formatNumber(row.used))
                              .replace("{quota}", formatNumber(row.quota))}
                          </span>
                        </div>
                        <ProgressBar value={row.usagePercent} className="h-1.5" />
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-black dark:text-white">
                      {formatIdr(row.revenueTotal)}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={row.isActive ? "success" : "default"}>
                        {row.isActive ? labels.active : labels.inactive}
                      </Badge>
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
