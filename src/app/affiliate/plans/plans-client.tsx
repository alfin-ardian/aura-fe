"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { costPerScan, PRICING_PLANS } from "@/constants/pricing";
import { cn, formatIdr } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import { usageService } from "@/services/usage.service";

export function PlansClient() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await authService.ensureAffiliateApiSession();
      if (!ok) {
        if (!cancelled) setChecking(false);
        return;
      }
      try {
        const usage = await usageService.getDashboard();
        if (!cancelled && usage.planId) {
          router.replace("/affiliate/usage");
          return;
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat status paket");
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (checking) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Memuat paket...
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="text-center sm:text-left">
        <Badge>Langkah berikutnya</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight dark:text-white">
          Pilih paket scan
        </h1>
        <p className="mt-2 max-w-xl text-sm text-neutral-500 dark:text-neutral-400">
          Akun Anda sudah aktif. Pilih paket kredit scan terlebih dahulu sebelum
          memakai dashboard afiliasi.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {PRICING_PLANS.map((plan) => {
          const perScan = costPerScan(plan.priceIdr, plan.scans);
          return (
            <Card
              key={plan.id}
              className={cn(
                "flex flex-col space-y-4 p-6",
                plan.featured && "border-black ring-1 ring-black dark:border-white dark:ring-white",
              )}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold dark:text-white">{plan.name}</h2>
                  {plan.featured ? <Badge>Populer</Badge> : null}
                </div>
                <p className="text-2xl font-semibold tracking-tight dark:text-white">
                  {formatIdr(plan.priceIdr)}
                  <span className="text-sm font-normal text-neutral-500"> /bln</span>
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {plan.scans.toLocaleString("id-ID")} scan · ~{formatIdr(perScan)}/scan
                </p>
              </div>
              <p className="flex-1 text-sm text-neutral-600 dark:text-neutral-300">
                {plan.description}
              </p>
              <ul className="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-300">
                {plan.features.map((feature) => (
                  <li key={feature}>· {feature}</li>
                ))}
              </ul>
              <Link
                href={`/affiliate/checkout?plan=${plan.id}`}
                className={cn(
                  buttonVariants({ variant: plan.featured ? "primary" : "secondary" }),
                  "w-full justify-center rounded-full",
                )}
              >
                Pilih {plan.name}
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
