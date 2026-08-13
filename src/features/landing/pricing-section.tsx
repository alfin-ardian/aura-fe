"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { costPerScan, PRICING_PLANS } from "@/constants/pricing";
import { useLocale } from "@/i18n/locale-provider";
import { cn, formatIdr } from "@/lib/utils";

export function PricingSection() {
  const { t } = useLocale();

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="scroll-mt-24 border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-neutral-400">
            {t.pricing.eyebrow}
          </p>
          <h2
            id="pricing-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-[#1D1D1F] sm:text-4xl dark:text-white"
          >
            {t.pricing.title}
          </h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PRICING_PLANS.map((plan) => {
            const perScan = costPerScan(plan.priceIdr, plan.scans);
            const features = t.pricing.features[plan.id] ?? [...plan.features];
            return (
              <article
                key={plan.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-6 sm:p-8",
                  plan.featured
                    ? "border-[#1D1D1F] bg-[#1D1D1F] text-white"
                    : "border-neutral-200 bg-white text-[#1D1D1F] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white",
                )}
              >
                {plan.featured ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-[#F4A7BC] px-3 py-1 text-[11px] font-medium text-[#1D1D1F]">
                    {t.pricing.mostPopular}
                  </span>
                ) : null}
                <p
                  className={cn(
                    "text-sm font-medium",
                    plan.featured ? "text-neutral-400" : "text-neutral-500",
                  )}
                >
                  {plan.name}
                </p>
                <p className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {formatIdr(plan.priceIdr)}
                </p>
                <p
                  className={cn(
                    "mt-2 text-sm",
                    plan.featured ? "text-neutral-400" : "text-neutral-500",
                  )}
                >
                  {plan.scans.toLocaleString("id-ID")} scan · ~
                  {formatIdr(perScan)}
                  {t.pricing.perScan}
                </p>
                <ul
                  className={cn(
                    "mt-8 flex-1 space-y-3 text-sm",
                    plan.featured ? "text-neutral-300" : "text-neutral-600",
                  )}
                >
                  {features.map((feature) => (
                    <li key={feature}>· {feature}</li>
                  ))}
                </ul>
                <Link
                  href={`/login?next=${encodeURIComponent(`/affiliate/checkout?plan=${plan.id}`)}`}
                  className={cn(
                    buttonVariants({
                      variant: plan.featured ? "secondary" : "primary",
                    }),
                    "mt-8 w-full rounded-full",
                    plan.featured &&
                      "border-transparent bg-white text-black hover:bg-neutral-200",
                  )}
                >
                  {t.pricing.getStarted}
                </Link>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-[#6E6E73] dark:text-neutral-400">
          {t.pricing.footnote}
        </p>
      </div>
    </section>
  );
}
