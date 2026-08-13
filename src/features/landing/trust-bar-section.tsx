"use client";

import { BarChart3, Sparkles, Users } from "lucide-react";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function TrustBarSection() {
  const { t } = useLocale();
  const stats = [
    { value: "10.000+", label: t.trust.analyses, icon: Sparkles },
    { value: "500+", label: t.trust.partners, icon: Users },
    { value: "92%", label: t.trust.helpful, icon: BarChart3 },
  ];

  return (
    <section
      aria-labelledby="trust-heading"
      className="bg-white dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
        <h2
          id="trust-heading"
          className="text-center text-sm font-semibold tracking-tight text-[#1D1D1F] dark:text-white"
        >
          {t.trust.title}
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-0">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={cn(
                  "relative flex items-center justify-center gap-4 sm:px-6",
                )}
              >
                {index > 0 ? (
                  <span
                    aria-hidden
                    className="absolute bottom-1 left-0 top-1 hidden w-px bg-neutral-200 sm:block dark:bg-neutral-800"
                  />
                ) : null}
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCE7EF]">
                  <Icon className="h-5 w-5 text-[#F4A7BC]" />
                </span>
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-[#1D1D1F] sm:text-3xl dark:text-white">
                    {item.value}
                  </p>
                  <p className="mt-0.5 text-sm text-[#6E6E73] dark:text-neutral-400">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
