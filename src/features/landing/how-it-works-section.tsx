"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

function ScanIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden>
      <path
        d="M7 12V9.5A2.5 2.5 0 0 1 9.5 7H12"
        stroke="#8B7CF6"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M20 7h2.5A2.5 2.5 0 0 1 25 9.5V12"
        stroke="#8B7CF6"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M25 20v2.5a2.5 2.5 0 0 1-2.5 2.5H20"
        stroke="#8B7CF6"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12 25H9.5A2.5 2.5 0 0 1 7 22.5V20"
        stroke="#8B7CF6"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="16" cy="14" r="3" stroke="#8B7CF6" strokeWidth="1.6" />
      <path
        d="M11 22c1.1-2.6 3-4 5-4s3.9 1.4 5 4"
        stroke="#8B7CF6"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden>
      <path
        d="M12 9.5c0-2 1.6-3.5 3.6-3.5 1.2 0 2.3.6 2.9 1.5.6-.7 1.6-1.2 2.7-1.2 2 0 3.6 1.6 3.6 3.6 0 .4 0 .7-.1 1 1.4.6 2.3 2 2.3 3.6 0 1.5-.8 2.8-2 3.5.1.4.2.8.2 1.2 0 2.2-1.8 4-4 4h-1.2c-.6 1.2-1.8 2-3.2 2-1.2 0-2.3-.6-2.9-1.5-.6.7-1.6 1.2-2.7 1.2-2 0-3.6-1.6-3.6-3.6 0-.4 0-.8.1-1.1C6.8 18.8 6 17.5 6 16c0-1.6.9-3 2.3-3.6-.1-.3-.1-.6-.1-1 0-2 1.6-3.6 3.6-3.6.1 0 .2 0 .2.1Z"
        stroke="#8B7CF6"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M16 10.5v11" stroke="#8B7CF6" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M12.2 14.5h3.2M16.6 17.5h3.4"
        stroke="#8B7CF6"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BottleIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden>
      <path d="M13.5 6h5v3h-5V6Z" stroke="#E879A9" strokeWidth="1.7" strokeLinejoin="round" />
      <path
        d="M14.5 9h3l1.5 3v12.5a2.5 2.5 0 0 1-2.5 2.5h-2.5a2.5 2.5 0 0 1-2.5-2.5V12l1.5-3Z"
        stroke="#E879A9"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M13 16h6" stroke="#E879A9" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M22.5 11.5c0 1.3-1.1 2.2-1.8 2.8-.3.3-.5.6-.5.9 0 .5.4.8.9.8s.9-.3.9-.8"
        stroke="#E879A9"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const STEP_VISUALS = [
  {
    icon: ScanIcon,
    box: "bg-gradient-to-br from-[#EEE9FF] to-[#F6EEF8]",
    num: "text-[#C4B5FD]",
  },
  {
    icon: BrainIcon,
    box: "bg-gradient-to-br from-[#EEE9FF] to-[#F6EEF8]",
    num: "text-[#C4B5FD]",
  },
  {
    icon: BottleIcon,
    box: "bg-gradient-to-br from-[#FCE7EF] to-[#F8D5E2]",
    num: "text-[#F4A7BC]",
  },
] as const;

export function HowItWorksSection() {
  const { t } = useLocale();

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-24 bg-white dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-[#F4A7BC]">
            {t.howItWorks.eyebrow}
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-[#1D1D1F] sm:text-4xl dark:text-white"
          >
            {t.howItWorks.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#6E6E73] dark:text-neutral-400">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {t.howItWorks.steps.map((item, index) => {
            const visual = STEP_VISUALS[index];
            const Icon = visual.icon;
            return (
              <div key={item.title} className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl",
                    visual.box,
                  )}
                >
                  <Icon />
                </div>
                <div>
                  <p
                    className={cn(
                      "text-xs font-medium tracking-[0.16em]",
                      visual.num,
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6E6E73] dark:text-neutral-400">
                    {item.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-[28px] bg-[#F7F2F4] px-6 py-8 sm:mt-20 sm:px-10 sm:py-12 lg:px-12 lg:py-14 dark:bg-neutral-900">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-12">
            <div className="max-w-md">
              <p className="text-sm font-medium tracking-wide text-[#F4A7BC]">
                {t.howItWorks.aiEyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#1D1D1F] sm:text-3xl dark:text-white">
                {t.howItWorks.aiTitle}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#6E6E73] sm:text-[15px] dark:text-neutral-400">
                {t.howItWorks.aiBody}
              </p>
            </div>

            <div className="min-w-0">
              <Image
                src="/how-it-work.png"
                alt={t.howItWorks.demoAlt}
                width={1370}
                height={720}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
