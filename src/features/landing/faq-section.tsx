"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const { t } = useLocale();
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 border-t border-[#EAEAEA] bg-white dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-medium tracking-wide text-[#6E6E73] dark:text-neutral-400">
              {t.faq.eyebrow}
            </p>
            <h2
              id="faq-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-[#1D1D1F] sm:text-4xl dark:text-white"
            >
              {t.faq.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#6E6E73] dark:text-neutral-400">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="divide-y divide-[#EAEAEA] border-y border-[#EAEAEA] dark:divide-neutral-800 dark:border-neutral-800">
            {t.faq.items.map((item, index) => {
              const isOpen = open === index;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span className="text-base font-medium text-[#1D1D1F] dark:text-white">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "text-xl leading-none text-[#6E6E73] transition dark:text-neutral-400",
                        isOpen && "rotate-45",
                      )}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all",
                      isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <p className="text-sm leading-relaxed text-[#6E6E73] dark:text-neutral-400">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
