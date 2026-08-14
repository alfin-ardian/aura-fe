"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  costPerScan,
  getPricingPlan,
  planTotals,
  PRICING_PLANS,
  type PricingPlanId,
} from "@/constants/pricing";
import { cn, formatIdr } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import { usageService, type PaymentMethodId } from "@/services/usage.service";

const PAYMENT_METHODS = [
  { id: "qris", label: "QRIS", hint: "Scan QR dari app bank / e-wallet" },
  { id: "va", label: "Virtual Account", hint: "BCA, Mandiri, BRI, BNI" },
  { id: "ewallet", label: "E-wallet", hint: "GoPay, OVO, DANA, ShopeePay" },
] as const;

type PaymentId = PaymentMethodId;

export function CheckoutClient({ planId }: { planId: string }) {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlanId>(
    getPricingPlan(planId).id,
  );
  const [method, setMethod] = useState<PaymentId>("qris");
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState<{ invoice: string; planName: string } | null>(
    null,
  );

  const plan = useMemo(() => getPricingPlan(selectedPlan), [selectedPlan]);
  const totals = planTotals(plan.priceIdr);
  const perScan = costPerScan(plan.priceIdr, plan.scans);

  const pay = async () => {
    setPaying(true);
    try {
      const ok = await authService.ensureAffiliateApiSession();
      if (!ok) {
        toast.error("Backend belum terhubung. Jalankan API lalu login ulang sebagai Affiliate.");
        return;
      }
      const result = await usageService.checkout(plan.id, method);
      setPaid({ invoice: result.invoice, planName: result.planName });
      toast.success(`${result.quotaAdded.toLocaleString("id-ID")} scan credit ditambahkan`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Checkout gagal");
    } finally {
      setPaying(false);
    }
  };

  if (paid) {
    return (
      <div className="mx-auto max-w-lg space-y-6">
        <Card className="space-y-4 p-8 text-center">
          <Badge variant="success">Lunas</Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Pembayaran diterima
          </h1>
          <p className="text-sm text-neutral-500">
            Kredit paket {paid.planName} sudah ditambahkan ke kuota akun Anda.
          </p>
          <p className="rounded-lg bg-neutral-50 px-4 py-3 font-mono text-sm text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
            {paid.invoice}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/affiliate" className={cn(buttonVariants())}>
              Mulai pakai dashboard
            </Link>
            <Button variant="secondary" onClick={() => setPaid(null)}>
              Beli paket lain
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-neutral-500">
          <Link href="/affiliate/plans" className="hover:text-black dark:hover:text-white">
            ← Pilih paket
          </Link>
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Pilih paket dan metode pembayaran. Pembayaran masih simulasi, kredit langsung
          masuk ke kuota.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card className="space-y-4">
            <h2 className="font-semibold">Paket kredit</h2>
            <div className="grid gap-3">
              {PRICING_PLANS.filter((item) => !item.contactSales).map((item) => (
                <label
                  key={item.id}
                  className={cn(
                    "flex cursor-pointer items-start justify-between gap-4 rounded-xl border p-4 transition",
                    selectedPlan === item.id
                      ? "border-black bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-300",
                  )}
                >
                  <span className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="plan"
                      className="mt-1"
                      checked={selectedPlan === item.id}
                      onChange={() => setSelectedPlan(item.id)}
                    />
                    <span>
                      <span className="flex items-center gap-2">
                        <span className="font-medium">{item.name}</span>
                        {item.featured ? (
                          <Badge className="bg-[#FCE7EF] text-[#E879A9]">
                            Populer
                          </Badge>
                        ) : null}
                      </span>
                      <span className="mt-1 block text-sm text-neutral-500">
                        {item.scans.toLocaleString("id-ID")} scan · berlaku{" "}
                        {item.validityDays} hari · ~{formatIdr(costPerScan(item.priceIdr, item.scans))}
                        /scan
                      </span>
                    </span>
                  </span>
                  <span className="shrink-0 font-semibold">
                    {formatIdr(item.priceIdr)}
                  </span>
                </label>
              ))}
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="font-semibold">Metode pembayaran</h2>
            <div className="grid gap-3">
              {PAYMENT_METHODS.map((item) => (
                <label
                  key={item.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition",
                    method === item.id
                      ? "border-black bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-300",
                  )}
                >
                  <input
                    type="radio"
                    name="method"
                    className="mt-1"
                    checked={method === item.id}
                    onChange={() => setMethod(item.id)}
                  />
                  <span>
                    <span className="block font-medium">{item.label}</span>
                    <span className="text-sm text-neutral-500">{item.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </Card>
        </div>

        <Card className="h-fit space-y-5 p-6">
          <h2 className="font-semibold">Ringkasan pesanan</h2>
          <div>
            <p className="text-sm text-neutral-500">Paket</p>
            <p className="mt-1 text-xl font-semibold">{plan.name}</p>
            <p className="mt-1 text-sm text-neutral-500">
              {plan.scans.toLocaleString("id-ID")} scan · ~{formatIdr(perScan)}/scan
            </p>
          </div>
          <ul className="space-y-2 border-y border-neutral-200 py-4 text-sm">
            <li className="flex justify-between">
              <span className="text-neutral-500">Subtotal</span>
              <span>{formatIdr(totals.subtotal)}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-neutral-500">PPN 11%</span>
              <span>{formatIdr(totals.tax)}</span>
            </li>
            <li className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatIdr(totals.total)}</span>
            </li>
          </ul>
          <p className="text-xs text-neutral-400">
            Kredit ditambahkan setelah pembayaran dikonfirmasi. Belum terhubung payment
            gateway, jadi pelunasan bersifat simulasi.
          </p>
          <Button className="w-full rounded-full" disabled={paying} onClick={pay}>
            {paying ? "Memproses..." : `Bayar ${formatIdr(totals.total)}`}
          </Button>
        </Card>
      </div>
    </div>
  );
}
