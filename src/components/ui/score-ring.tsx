"use client";

import { Card } from "@/components/ui/card";

export function ScoreRing({
  score,
  label,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}) {
  return (
    <Card className="inline-flex flex-col items-center justify-center px-6 py-5">
      <span className="text-3xl font-semibold tracking-tight">{score}</span>
      {label ? <span className="mt-1 text-xs text-neutral-500">{label}</span> : null}
    </Card>
  );
}
