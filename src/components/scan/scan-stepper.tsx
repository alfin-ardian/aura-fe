"use client";

import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

export type ScanStep = 1 | 2 | 3;

function ScanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={cn("h-7 w-7", className)} aria-hidden>
      <path
        d="M7 12V9.5A2.5 2.5 0 0 1 9.5 7H12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M20 7h2.5A2.5 2.5 0 0 1 25 9.5V12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M25 20v2.5a2.5 2.5 0 0 1-2.5 2.5H20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12 25H9.5A2.5 2.5 0 0 1 7 22.5V20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="16" cy="14" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M11 22c1.1-2.6 3-4 5-4s3.9 1.4 5 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ResultIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={cn("h-7 w-7", className)} aria-hidden>
      <path
        d="M12 9.5c0-2 1.6-3.5 3.6-3.5 1.2 0 2.3.6 2.9 1.5.6-.7 1.6-1.2 2.7-1.2 2 0 3.6 1.6 3.6 3.6 0 .4 0 .7-.1 1 1.4.6 2.3 2 2.3 3.6 0 1.5-.8 2.8-2 3.5.1.4.2.8.2 1.2 0 2.2-1.8 4-4 4h-1.2c-.6 1.2-1.8 2-3.2 2-1.2 0-2.3-.6-2.9-1.5-.6.7-1.6 1.2-2.7 1.2-2 0-3.6-1.6-3.6-3.6 0-.4 0-.8.1-1.1C6.8 18.8 6 17.5 6 16c0-1.6.9-3 2.3-3.6-.1-.3-.1-.6-.1-1 0-2 1.6-3.6 3.6-3.6.1 0 .2 0 .2.1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M16 10.5v11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M12.2 14.5h3.2M16.6 17.5h3.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProductIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={cn("h-7 w-7", className)} aria-hidden>
      <path
        d="M13.5 6h5v3h-5V6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 9h3l1.5 3v12.5a2.5 2.5 0 0 1-2.5 2.5h-2.5a2.5 2.5 0 0 1-2.5-2.5V12l1.5-3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M13 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const STEP_META = [
  {
    icon: ScanIcon,
    boxActive: "bg-gradient-to-br from-[#EEE9FF] to-[#F6EEF8] text-[#8B7CF6]",
    boxIdle: "bg-neutral-100 text-neutral-400 dark:bg-neutral-900 dark:text-neutral-500",
    numActive: "text-[#C4B5FD]",
  },
  {
    icon: ResultIcon,
    boxActive: "bg-gradient-to-br from-[#EEE9FF] to-[#F6EEF8] text-[#8B7CF6]",
    boxIdle: "bg-neutral-100 text-neutral-400 dark:bg-neutral-900 dark:text-neutral-500",
    numActive: "text-[#C4B5FD]",
  },
  {
    icon: ProductIcon,
    boxActive: "bg-gradient-to-br from-[#FCE7EF] to-[#F8D5E2] text-[#E879A9]",
    boxIdle: "bg-neutral-100 text-neutral-400 dark:bg-neutral-900 dark:text-neutral-500",
    numActive: "text-[#F4A7BC]",
  },
] as const;

export function ScanStepper({
  current,
  onStepClick,
}: {
  current: ScanStep;
  onStepClick?: (step: ScanStep) => void;
}) {
  const { t } = useLocale();
  const labels = [t.scan.stepScan, t.scan.stepResults, t.scan.stepProducts];

  return (
    <nav aria-label={t.scan.stepsLabel} className="w-full">
      <ol className="grid grid-cols-3 gap-2 sm:gap-4">
        {STEP_META.map((meta, index) => {
          const step = (index + 1) as ScanStep;
          const Icon = meta.icon;
          const active = current === step;
          const done = current > step;
          const clickable = Boolean(onStepClick) && (done || active);

          return (
            <li key={labels[index]} className="min-w-0">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => onStepClick?.(step)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl text-left transition",
                  clickable ? "cursor-pointer" : "cursor-default",
                  active && "opacity-100",
                  !active && !done && "opacity-55",
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14",
                    active || done ? meta.boxActive : meta.boxIdle,
                  )}
                >
                  <Icon />
                </div>
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-[10px] font-medium tracking-[0.16em] sm:text-xs",
                      active || done ? meta.numActive : "text-neutral-400",
                    )}
                  >
                    {String(step).padStart(2, "0")}
                  </p>
                  <p
                    className={cn(
                      "truncate text-sm font-semibold tracking-tight sm:text-base",
                      active || done
                        ? "text-[#1D1D1F] dark:text-white"
                        : "text-neutral-400 dark:text-neutral-500",
                    )}
                  >
                    {labels[index]}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
