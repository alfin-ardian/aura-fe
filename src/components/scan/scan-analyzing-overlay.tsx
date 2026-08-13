"use client";

import { useEffect, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

/** Placed outside the photo frame so they never clutter the face. */
const SPARKLES = [
  { top: "-9%", left: "-11%", delay: "0s" },
  { top: "18%", right: "-14%", delay: "0.7s" },
  { bottom: "14%", left: "-15%", delay: "1.4s" },
  { bottom: "-8%", right: "-9%", delay: "2.1s" },
  { top: "48%", right: "-18%", delay: "1.1s" },
];

/** Runs a 0→1 ramp on rAF so progress and step timing share one clock. */
function useAnalyzeProgress(durationMs: number) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      setElapsed(Math.min(1, (now - startedAt) / durationMs));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationMs]);

  return elapsed;
}

export function ScanAnalyzingOverlay({
  preview,
  durationMs = 4000,
}: {
  preview: string | null;
  durationMs?: number;
}) {
  const { t } = useLocale();
  const progress = useAnalyzeProgress(durationMs);
  const steps = t.scan.analyzingSteps;
  // Hold at 99% until navigation so the bar never sits "done" while waiting.
  const percent = Math.min(99, Math.round(progress * 100));
  const activeStep = Math.min(steps.length - 1, Math.floor(progress * steps.length));

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-white/85 px-4 py-10 backdrop-blur-2xl dark:bg-neutral-950/90"
    >
      <div
        aria-hidden
        className="animate-aura-breathe pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#EEE9FF] blur-3xl dark:bg-[#2A2140]"
      />
      <div
        aria-hidden
        className="animate-aura-breathe pointer-events-none absolute -bottom-28 right-1/4 h-72 w-72 rounded-full bg-[#FCE7EF] blur-3xl dark:bg-[#3A2430]"
      />

      <div className="animate-aura-fade-up relative w-full max-w-sm text-center">
        <div className="relative mx-auto h-56 w-56 sm:h-64 sm:w-64">
          <div
            aria-hidden
            className="aura-gradient-ring absolute -inset-3 rounded-[2.15rem] opacity-60 blur-lg"
          />
          <div
            aria-hidden
            className="aura-gradient-ring absolute -inset-[3px] rounded-[1.95rem]"
          />
          <span
            aria-hidden
            className="animate-aura-pulse-ring absolute -inset-2 rounded-[2rem] border border-[#E879A9]/50"
          />

          <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-neutral-100 shadow-[0_24px_60px_-24px_rgba(232,121,169,0.55)] dark:bg-neutral-900">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="h-full w-full object-cover" />
            ) : null}

            <div
              aria-hidden
              className="absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div
              aria-hidden
              className="animate-aura-scan-sweep absolute inset-x-0 top-0 h-1/3"
            >
              <div className="h-full w-full bg-gradient-to-b from-transparent via-white/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-1/2 h-[3px] bg-white shadow-[0_0_20px_6px_rgba(244,167,188,0.95)]" />
            </div>

            {[
              "left-3 top-3 border-l-2 border-t-2",
              "right-3 top-3 border-r-2 border-t-2",
              "left-3 bottom-3 border-b-2 border-l-2",
              "right-3 bottom-3 border-b-2 border-r-2",
            ].map((position) => (
              <span
                key={position}
                aria-hidden
                className={cn(
                  "absolute h-7 w-7 rounded-[6px] border-white/85",
                  position,
                )}
              />
            ))}
          </div>

          {SPARKLES.map(({ delay, ...position }) => (
            <Sparkles
              key={delay}
              aria-hidden
              className="animate-aura-float absolute h-4 w-4 text-[#E879A9]"
              style={{ ...position, animationDelay: delay }}
            />
          ))}
        </div>

        <p className="mt-8 text-4xl font-semibold tabular-nums tracking-tight text-[#1D1D1F] dark:text-white">
          {percent}%
        </p>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {t.scan.analyzing}
        </p>

        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#C4B5FD] via-[#E879A9] to-[#F4A7BC]"
            style={{ width: `${percent}%` }}
          />
        </div>

        <ul className="mt-6 space-y-2.5 text-left">
          {steps.map((label, index) => {
            const done = index < activeStep;
            const active = index === activeStep;
            return (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-3 text-sm transition-opacity duration-300",
                  done || active
                    ? "text-[#1D1D1F] opacity-100 dark:text-white"
                    : "text-neutral-400 opacity-60 dark:text-neutral-500",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                    done
                      ? "border-transparent bg-[#E879A9] text-white"
                      : active
                        ? "border-[#E879A9] text-[#E879A9]"
                        : "border-neutral-300 dark:border-neutral-700",
                  )}
                >
                  {done ? (
                    <Check className="h-3 w-3" />
                  ) : active ? (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E879A9]" />
                  ) : null}
                </span>
                {label}
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-xs text-neutral-400">{t.scan.analyzingHint}</p>
      </div>
    </div>
  );
}
