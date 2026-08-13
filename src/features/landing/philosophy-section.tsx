"use client";

import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function PhilosophySection() {
  const { t } = useLocale();

  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="scroll-mt-24 bg-white dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-[#F4A7BC]">
            {t.philosophy.eyebrow}
          </p>
          <h2
            id="philosophy-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-[#1D1D1F] sm:text-4xl dark:text-white"
          >
            {t.philosophy.title}
          </h2>
          <p className="mt-3 text-base font-medium tracking-[0.42em] text-[#1D1D1F] dark:text-white">
            A. U. R. A.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-0">
          {t.philosophy.principles.map((item, index) => (
            <article
              key={`${item.letter}-${item.title}`}
              className={cn(
                "relative md:px-8",
                index === 0 && "md:pl-0",
                index === t.philosophy.principles.length - 1 && "md:pr-0",
              )}
            >
              {index > 0 ? (
                <span
                  aria-hidden
                  className="absolute bottom-2 left-0 top-2 hidden w-px bg-neutral-200 md:block dark:bg-neutral-800"
                />
              ) : null}
              <p className="text-4xl font-semibold tracking-tight text-[#1D1D1F] sm:text-5xl dark:text-white">
                {item.letter}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4B4B4B] sm:text-[15px] dark:text-neutral-400">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
