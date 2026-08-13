"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

const PARTNERS = [
  { name: "Wardah", className: "font-serif text-base tracking-[0.08em]" },
  { name: "Scarlett", className: "font-semibold tracking-tight" },
  { name: "Somethinc", className: "font-semibold tracking-tight" },
  { name: "Azarine", className: "font-serif tracking-[0.12em]" },
  { name: "Whitelab", className: "font-semibold tracking-[0.14em]" },
  { name: "Avoskin", className: "font-serif italic tracking-tight" },
  { name: "Emina", className: "font-semibold tracking-tight" },
  { name: "Make Over", className: "font-serif tracking-[0.16em]" },
] as const;

const QUOTE_AVATARS = [
  "https://randomuser.me/api/portraits/women/47.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
] as const;

export function SocialProofSection() {
  const { t } = useLocale();
  const quotes = t.social.quotes;
  const [index, setIndex] = useState(0);
  const current = quotes[index] ?? quotes[0];

  const prev = () => setIndex((i) => (i === 0 ? quotes.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === quotes.length - 1 ? 0 : i + 1));

  return (
    <section
      id="social-proof"
      aria-labelledby="social-proof-heading"
      className="scroll-mt-24 border-t border-[#EAEAEA] bg-white dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="relative flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-[#1D1D1F] transition hover:bg-neutral-50 sm:inline-flex dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-900"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="grid min-w-0 flex-1 items-center gap-8 md:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.4fr)] md:gap-10">
            <div>
              <h2
                id="social-proof-heading"
                className="text-2xl font-semibold tracking-tight text-[#1D1D1F] sm:text-3xl dark:text-white"
              >
                {t.social.title}
              </h2>
              <p className="mt-3 flex gap-1 text-[#E8A598]" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </p>
              <blockquote className="mt-5">
                <p className="text-sm leading-relaxed text-[#4B4B4B] sm:text-[15px] dark:text-neutral-300">
                  {current.quote}
                </p>
                <footer className="mt-5 flex items-center gap-3">
                  <span className="text-sm font-medium text-[#1D1D1F] dark:text-white">
                    — {current.name}, {current.role}
                  </span>
                  <Image
                    src={QUOTE_AVATARS[index % QUOTE_AVATARS.length]}
                    alt=""
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-8 rounded-full border border-white object-cover shadow-sm"
                  />
                </footer>
              </blockquote>
            </div>

            <div
              aria-hidden
              className="hidden h-28 w-px bg-neutral-200 md:block dark:bg-neutral-800"
            />

            <div className="relative min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex w-max hover:[animation-play-state:paused] animate-partner-marquee">
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    className="flex items-center gap-10 pr-10 sm:gap-12 sm:pr-12"
                    aria-hidden={copy === 1}
                  >
                    {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                      <span
                        key={`${copy}-${partner.name}-${i}`}
                        className={cn(
                          "shrink-0 text-sm text-[#1D1D1F] dark:text-neutral-200",
                          partner.className,
                        )}
                      >
                        {partner.name}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-[#1D1D1F] transition hover:bg-neutral-50 sm:inline-flex dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-900"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
