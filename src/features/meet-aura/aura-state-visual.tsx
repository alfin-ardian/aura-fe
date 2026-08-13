"use client";

import { cn } from "@/lib/utils";
import type { AuraMeaningState } from "@/features/meet-aura/constants";

interface AuraStateVisualProps {
  state: AuraMeaningState;
  reducedMotion?: boolean;
  className?: string;
}

export function AuraStateVisual({
  state,
  reducedMotion = false,
  className,
}: AuraStateVisualProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center",
        className,
      )}
      aria-hidden
    >
      {/* Aura — soft circular glow */}
      <div
        className={cn(
          "absolute h-56 w-56 rounded-full bg-[#FCE7EF] transition-all duration-700 ease-out sm:h-72 sm:w-72",
          state === "aura" ? "scale-100 opacity-70" : "scale-90 opacity-0",
          !reducedMotion && state === "aura" && "animate-aura-breathe",
        )}
      />
      <div
        className={cn(
          "absolute h-40 w-40 rounded-full border border-[#F4A7BC]/35 transition-all duration-700 ease-out sm:h-52 sm:w-52",
          state === "aura" ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
      />

      {/* Analysis — minimal facial landmarks */}
      <svg
        viewBox="0 0 200 240"
        className={cn(
          "absolute h-48 w-40 transition-all duration-700 ease-out sm:h-56 sm:w-48",
          state === "analysis" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        <ellipse
          cx="100"
          cy="120"
          rx="54"
          ry="72"
          fill="none"
          stroke="#F4A7BC"
          strokeOpacity="0.35"
          strokeWidth="1.25"
        />
        <circle cx="78" cy="108" r="2.5" fill="#F4A7BC" fillOpacity="0.55" />
        <circle cx="122" cy="108" r="2.5" fill="#F4A7BC" fillOpacity="0.55" />
        <circle cx="100" cy="128" r="2" fill="#F4A7BC" fillOpacity="0.4" />
        <path
          d="M86 148c8 8 20 8 28 0"
          fill="none"
          stroke="#F4A7BC"
          strokeOpacity="0.4"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle cx="100" cy="52" r="1.5" fill="#F4A7BC" fillOpacity="0.35" />
        <circle cx="58" cy="96" r="1.5" fill="#F4A7BC" fillOpacity="0.3" />
        <circle cx="142" cy="96" r="1.5" fill="#F4A7BC" fillOpacity="0.3" />
        <circle cx="100" cy="188" r="1.5" fill="#F4A7BC" fillOpacity="0.3" />
      </svg>

      {/* AI — minimal connected nodes */}
      <svg
        viewBox="0 0 220 220"
        className={cn(
          "absolute h-52 w-52 transition-all duration-700 ease-out sm:h-64 sm:w-64",
          state === "ai" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        <g stroke="#F4A7BC" strokeOpacity="0.28" strokeWidth="1">
          <line x1="110" y1="40" x2="60" y2="95" />
          <line x1="110" y1="40" x2="160" y2="95" />
          <line x1="60" y1="95" x2="110" y2="110" />
          <line x1="160" y1="95" x2="110" y2="110" />
          <line x1="60" y1="95" x2="70" y2="160" />
          <line x1="160" y1="95" x2="150" y2="160" />
          <line x1="110" y1="110" x2="70" y2="160" />
          <line x1="110" y1="110" x2="150" y2="160" />
          <line x1="70" y1="160" x2="110" y2="185" />
          <line x1="150" y1="160" x2="110" y2="185" />
        </g>
        {[
          [110, 40],
          [60, 95],
          [160, 95],
          [110, 110],
          [70, 160],
          [150, 160],
          [110, 185],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="3"
            fill="#F4A7BC"
            fillOpacity="0.55"
          />
        ))}
      </svg>
    </div>
  );
}
