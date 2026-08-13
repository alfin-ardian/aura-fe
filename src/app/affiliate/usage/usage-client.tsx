"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { costPerScan } from "@/constants/pricing";
import { localeDateTag, useAffiliateUi } from "@/i18n/affiliate-ui";
import { useLocale } from "@/i18n/locale-provider";
import { cn, formatIdr } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import { usageService, type UsageDashboard, type UsagePlanId } from "@/services/usage.service";
import {
  ChannelDonut,
  DailyUsageChart,
  WeeklyUsageChart,
} from "./usage-charts";

const WEEKDAY_ID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export function AffiliateUsageClient() {
  const { t, locale } = useLocale();
  const page = t.dashboard.pages.usage;
  const ui = useAffiliateUi().usage;
  const dateTag = localeDateTag(locale);
  const [usage, setUsage] = useState<UsageDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const formatNumber = (value: number) => value.toLocaleString(dateTag);

  const load = useCallback(async () => {
    const data = await usageService.getDashboard();
    setUsage(data);
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
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{ui.loading}</p>
    );
  }

  if (!ready || !usage) {
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

  const remaining = usage.remaining;
  const percent = usage.percent;
  const channelTotal = usage.channels.reduce((sum, item) => sum + item.value, 0) || 1;

  const periodLabel = new Date(usage.periodStart).toLocaleDateString(dateTag, {
    month: "long",
    year: "numeric",
  });
  const renewLabel = new Date(usage.renewsAt).toLocaleDateString(dateTag, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const planName =
    !usage.planId || /belum berlangganan/i.test(usage.planName)
      ? ui.noPlan
      : usage.planName;

  const localizePeakDay = (value: string) => {
    if (!value || value === "—") return "—";
    const idx = WEEKDAY_ID.findIndex((day) => day.toLowerCase() === value.toLowerCase());
    if (idx < 0) return value;
    const sample = new Date(2024, 0, 7 + idx); // Sunday=0 base week
    return sample.toLocaleDateString(dateTag, { weekday: "long" });
  };

  const planDescription = (id: UsagePlanId, fallback: string) => {
    if (id === "starter") return ui.planDescStarter;
    if (id === "growth") return ui.planDescGrowth;
    if (id === "scale") return ui.planDescScale;
    return fallback;
  };

  const channels = usage.channels.map((channel, index) => ({
    ...channel,
    label:
      index === 0
        ? ui.channelReferral
        : index === 1
          ? ui.channelQr
          : channel.label,
  }));

  const daily = usage.daily.map((point) => ({
    ...point,
    label: point.date
      ? new Date(point.date).toLocaleDateString(dateTag, {
          day: "numeric",
          month: "short",
        })
      : point.label,
  }));

  const history = usage.history.map((week, index) => ({
    ...week,
    label: ui.weekLabel.replace("{n}", String(index + 1)),
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight dark:text-white">
            {page.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {page.subtitle}
          </p>
        </div>
        <Link
          href={usage.planId ? "#upgrade" : "/affiliate/plans"}
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          {usage.planId ? ui.viewPlans : "Pilih paket"}
        </Link>
      </div>

      <Card className="space-y-6 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {ui.activePlan}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-semibold tracking-tight dark:text-white">
                {planName}
              </h2>
              {usage.priceIdr > 0 ? (
                <Badge variant="dark">{formatIdr(usage.priceIdr)}</Badge>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {ui.period.replace("{period}", periodLabel)} ·{" "}
              {ui.renew.replace("{date}", renewLabel)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{ui.used}</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight dark:text-white">
              {formatNumber(usage.used)}
              <span className="text-lg font-medium text-neutral-400">
                {" "}
                / {formatNumber(usage.quota)}
              </span>
            </p>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-neutral-500 dark:text-neutral-400">{ui.quotaUsage}</span>
            <span className="font-medium dark:text-white">{percent}%</span>
          </div>
          <ProgressBar value={percent} barClassName="bg-[#E879A9]" />
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            {ui.remainingScans.replace("{remaining}", formatNumber(remaining))}
            {" · "}
            {ui.projectedDays.replace("{days}", String(usage.projectedDays))}
          </p>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{ui.quota}</p>
          <p className="mt-2 text-2xl font-semibold dark:text-white">
            {formatNumber(usage.quota)}
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            {ui.planOf.replace("{name}", planName)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{ui.avgPerDay}</p>
          <p className="mt-2 text-2xl font-semibold dark:text-white">{usage.avgPerDay}</p>
          <p className="mt-1 text-xs text-neutral-400">{ui.last14Days}</p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{ui.peak}</p>
          <p className="mt-2 text-2xl font-semibold dark:text-white">{usage.peakValue}</p>
          <p className="mt-1 text-xs text-neutral-400">{localizePeakDay(usage.peakDay)}</p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{ui.matchRate}</p>
          <p className="mt-2 text-2xl font-semibold dark:text-white">{usage.matchRate}%</p>
          <p className="mt-1 text-xs text-neutral-400">{ui.matchRateHint}</p>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <h2 className="font-semibold dark:text-white">{ui.trendTitle}</h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {ui.trendSubtitle}
          </p>
          <DailyUsageChart
            className="mt-4"
            data={daily}
            scanLabel={ui.chartScan}
            matchLabel={ui.chartMatch}
          />
        </Card>
        <Card>
          <h2 className="font-semibold dark:text-white">{ui.sourceTitle}</h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {ui.sourceSubtitle}
          </p>
          <ChannelDonut data={channels} />
          <ul className="space-y-2 text-sm">
            {channels.map((channel, index) => (
              <li key={channel.label} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                  <span
                    className={cn(
                      "inline-block h-2.5 w-2.5 rounded-full",
                      index === 0 ? "bg-[#1D1D1F]" : "bg-[#F4A7BC]",
                    )}
                  />
                  {channel.label}
                </span>
                <span className="font-medium dark:text-white">
                  {formatNumber(channel.value)} ·{" "}
                  {Math.round((channel.value / channelTotal) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="font-semibold dark:text-white">{ui.weeklyTitle}</h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {periodLabel}
        </p>
        <WeeklyUsageChart
          className="mt-4"
          data={history}
          scanLabel={ui.chartScan}
          matchLabel={ui.chartMatch}
        />
      </Card>

      <Card id="upgrade" className="scroll-mt-24 space-y-5">
        <div>
          <h2 className="font-semibold dark:text-white">{ui.upgradeTitle}</h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {ui.upgradeSubtitle}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {usage.plans.map((plan) => {
            const perScan = costPerScan(plan.priceIdr, plan.scans);
            return (
              <div
                key={plan.id}
                className={cn(
                  "flex flex-col rounded-2xl border p-5",
                  plan.featured
                    ? "border-[#1D1D1F] bg-[#1D1D1F] text-white"
                    : "border-neutral-200 dark:border-neutral-700",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{plan.name}</p>
                  {plan.featured ? (
                    <Badge className="bg-[#F4A7BC] text-[#1D1D1F]">{ui.popular}</Badge>
                  ) : null}
                </div>
                <p className="mt-3 text-2xl font-semibold tracking-tight">
                  {formatIdr(plan.priceIdr)}
                </p>
                <p
                  className={cn(
                    "mt-1 text-xs",
                    plan.featured ? "text-neutral-400" : "text-neutral-500",
                  )}
                >
                  {ui.scansPerScan
                    .replace("{scans}", formatNumber(plan.scans))
                    .replace("{perScan}", formatIdr(perScan))}
                </p>
                <p
                  className={cn(
                    "mt-3 text-sm",
                    plan.featured ? "text-neutral-300" : "text-neutral-500",
                  )}
                >
                  {planDescription(plan.id, plan.description)}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {plan.active ? (
                    <Badge
                      className={cn(plan.featured && "bg-white text-black")}
                      variant={plan.featured ? "default" : "dark"}
                    >
                      {ui.active}
                    </Badge>
                  ) : null}
                  <Link
                    href={`/affiliate/checkout?plan=${plan.id}`}
                    className={cn(
                      buttonVariants({
                        variant: plan.featured ? "secondary" : "primary",
                        size: "sm",
                      }),
                      "rounded-full",
                      plan.featured &&
                        "border-transparent bg-white text-black hover:bg-neutral-200",
                      plan.active && !plan.featured && "ml-auto",
                    )}
                  >
                    {plan.active ? ui.buyAgain : ui.choosePlan}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
