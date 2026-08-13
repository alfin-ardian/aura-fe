"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/locale-provider";

function AffiliateDashboardMock() {
  const { t } = useLocale();

  return (
    <div aria-hidden className="border border-[#EAEAEA] bg-white p-6 sm:p-8 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-[#6E6E73] dark:text-neutral-400">
            {t.affiliates.dashboard}
          </p>
          <p className="mt-2 text-lg font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
            {t.affiliates.overview}
          </p>
        </div>
        <p className="text-sm text-[#16A34A]">{t.affiliates.thisMonth}</p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t.affiliates.totalScans, value: "1,284" },
          { label: t.affiliates.activeFollowers, value: "856" },
          { label: t.affiliates.scanCredits, value: "716" },
          { label: t.affiliates.earnings, value: "Rp 1.284.000" },
        ].map((item) => (
          <div key={item.label} className="border-t border-[#EAEAEA] pt-4 dark:border-neutral-800">
            <p className="text-sm text-[#6E6E73] dark:text-neutral-400">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border-t border-[#EAEAEA] pt-5 dark:border-neutral-800">
          <p className="text-sm text-[#6E6E73] dark:text-neutral-400">{t.affiliates.scanActivity}</p>
          <div className="mt-4 flex h-28 items-end gap-2">
            {[36, 48, 42, 68, 60, 84, 72, 90, 78, 88].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-sm bg-[#F4A7BC]"
                style={{ height: `${height}%`, opacity: 0.35 + (index % 4) * 0.15 }}
              />
            ))}
          </div>
        </div>
        <div className="border-t border-[#EAEAEA] pt-5 dark:border-neutral-800">
          <p className="text-sm text-[#6E6E73] dark:text-neutral-400">{t.affiliates.topReferrals}</p>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              ["Salsa", "128"],
              ["Dewi", "96"],
              ["Raka", "81"],
            ].map(([name, count]) => (
              <li key={name} className="flex justify-between text-[#1D1D1F] dark:text-white">
                <span>{name}</span>
                <span className="text-[#6E6E73] dark:text-neutral-400">
                  {count} {t.affiliates.scansUnit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function AffiliatesSection() {
  const { t } = useLocale();

  return (
    <section
      id="affiliates"
      aria-labelledby="affiliates-heading"
      className="scroll-mt-24 border-t border-[#EAEAEA] bg-white dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-[#F4A7BC]">
            {t.affiliates.eyebrow}
          </p>
          <h2
            id="affiliates-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-[#1D1D1F] sm:text-4xl dark:text-white"
          >
            {t.affiliates.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#6E6E73] dark:text-neutral-400">
            {t.affiliates.subtitle}
          </p>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-5">
          {t.affiliates.steps.map((item, index) => (
            <li
              key={item.title}
              className="border-t border-[#EAEAEA] pt-4 dark:border-neutral-800 sm:border-t-0 sm:border-l sm:pl-4 sm:pt-0 first:sm:border-l-0 first:sm:pl-0"
            >
              <p className="text-xs font-medium tracking-[0.16em] text-[#6E6E73] dark:text-neutral-400">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-semibold text-[#1D1D1F] dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#6E6E73] dark:text-neutral-400">
                {item.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <Link
            href="/register"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1D1D1F] px-7 text-sm font-medium text-white transition hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            {t.affiliates.cta}
          </Link>
        </div>

        <div className="mt-12">
          <AffiliateDashboardMock />
        </div>
      </div>
    </section>
  );
}
