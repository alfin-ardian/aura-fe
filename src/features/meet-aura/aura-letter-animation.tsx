"use client";

import { useEffect, useState } from "react";
import { AuraStateVisual } from "@/features/meet-aura/aura-state-visual";
import {
  AURA_MEANINGS,
  type AuraMeaningState,
} from "@/features/meet-aura/constants";
import { cn } from "@/lib/utils";

interface AuraLetterAnimationProps {
  className?: string;
  onStateChange?: (state: AuraMeaningState) => void;
}

export function AuraLetterAnimation({
  className,
  onStateChange,
}: AuraLetterAnimationProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const current = AURA_MEANINGS[index];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    onStateChange?.(current.id);
  }, [current.id, onStateChange]);

  useEffect(() => {
    if (reducedMotion) return;

    let exitTimer: number | undefined;
    const hold = window.setTimeout(() => {
      setVisible(false);
      exitTimer = window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % AURA_MEANINGS.length);
        setVisible(true);
      }, 420);
    }, current.durationMs);

    return () => {
      window.clearTimeout(hold);
      if (exitTimer) window.clearTimeout(exitTimer);
    };
  }, [current.durationMs, index, reducedMotion]);

  return (
    <div className={cn("relative mx-auto w-full max-w-xl text-center", className)}>
      <div className="relative mx-auto flex h-64 items-center justify-center sm:h-80">
        <AuraStateVisual state={current.id} reducedMotion={reducedMotion} />
        <span
          className="relative z-10 select-none text-[7.5rem] font-semibold leading-none tracking-tight text-[#1D1D1F] sm:text-[9.5rem]"
          aria-hidden
        >
          A
        </span>
      </div>

      <div
        className="relative mx-auto mt-2 flex h-12 items-center justify-center sm:h-14"
        aria-live="polite"
      >
        <p
          key={current.id}
          className={cn(
            "absolute inset-x-0 text-2xl font-medium tracking-tight sm:text-3xl",
            "text-[#F4A7BC] transition-all duration-500 ease-out",
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0",
            reducedMotion && "transition-none opacity-100 translate-y-0",
          )}
        >
          {current.label}
        </p>
      </div>

      <p
        className={cn(
          "mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#6E6E73] transition-opacity duration-500 ease-out sm:text-base",
          visible ? "opacity-100" : "opacity-0",
          reducedMotion && "opacity-100",
        )}
      >
        {current.description}
      </p>

      {/* Screen-reader friendly full list */}
      <ul className="sr-only">
        {AURA_MEANINGS.map((item) => (
          <li key={item.id}>
            A equals {item.label}. {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
