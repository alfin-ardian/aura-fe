"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/i18n/locale-provider";
import type { PublicScanResult, ScanMatchedProduct } from "@/services/scan.service";

function formatMatch(score: number) {
  const pct = score <= 1 ? score * 100 : score;
  return `${Math.round(pct)}%`;
}

function confidencePct(value: number) {
  return value <= 1 ? value * 100 : value;
}

function fillTemplate(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}

function scanQualityLabel(
  pct: number,
  labels: { good: string; fair: string; low: string },
) {
  if (pct >= 75) return labels.good;
  if (pct >= 55) return labels.fair;
  return labels.low;
}

export function ScanResultsView({
  result,
  preview,
  step,
  onScanAgain,
  onSeeProducts,
  onBackToResults,
}: {
  result: PublicScanResult;
  preview?: string | null;
  step: 2 | 3;
  onScanAgain: () => void;
  onSeeProducts: () => void;
  onBackToResults: () => void;
}) {
  const { t } = useLocale();
  const products = result.recommendation?.products ?? [];
  const concerns = result.analysis.concerns ?? [];
  const topConcerns = concerns.slice(0, 3);
  const qualityPct = confidencePct(result.analysis.confidence);
  const qualityLabel = scanQualityLabel(qualityPct, {
    good: t.scan.scanQualityGood,
    fair: t.scan.scanQualityFair,
    low: t.scan.scanQualityLow,
  });

  const concernNames = topConcerns
    .map((c) => t.scan.concernLabels[c] ?? c)
    .join(", ");

  const insight = result.analysis.skinType
    ? fillTemplate(t.scan.resultsInsightWithType, {
        skinType: result.analysis.skinType,
        undertone:
          t.scan.undertoneLabels[result.analysis.undertone] ??
          result.analysis.undertone,
      })
    : t.scan.resultsInsightFallback;

  const focusLine =
    topConcerns.length > 0
      ? fillTemplate(t.scan.resultsFocus, { concerns: concernNames })
      : null;

  if (step === 3) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{t.scan.stepProducts}</h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {t.scan.matches}
          </p>
        </div>

        {products.length === 0 ? (
          <p className="text-sm text-neutral-500">{t.scan.noMatches}</p>
        ) : (
          <ul className="space-y-3">
            {products.map((product) => (
              <ProductRow key={product.id} product={product} viewLabel={t.scan.viewProduct} />
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="secondary"
            className="rounded-full"
            onClick={onBackToResults}
          >
            {t.scan.backToResults}
          </Button>
          <Button type="button" variant="secondary" className="rounded-full" onClick={onScanAgain}>
            {t.scan.scanAgain}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero: photo + insight */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt=""
            className="h-36 w-36 shrink-0 rounded-[1.5rem] object-cover shadow-[0_18px_40px_-24px_rgba(232,121,169,0.55)] sm:h-40 sm:w-40"
          />
        ) : (
          <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-[1.5rem] bg-neutral-100 text-sm text-neutral-400 dark:bg-neutral-900 sm:h-40 sm:w-40">
            Selfie
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-semibold tracking-tight">{t.scan.results}</h1>
          <p className="mt-3 text-base leading-relaxed text-[#1D1D1F] dark:text-neutral-100">
            {insight}
          </p>
          {focusLine ? (
            <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {focusLine}
            </p>
          ) : null}
          <p
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300"
            title={t.scan.scanQualityHint}
          >
            <span className="font-medium">{t.scan.scanQuality}</span>
            <span aria-hidden>·</span>
            <span>{qualityLabel}</span>
          </p>
          <p className="mt-1.5 text-[11px] text-neutral-400">{t.scan.scanQualityHint}</p>
        </div>
      </section>

      {/* Concerns with hints */}
      {topConcerns.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {t.scan.concerns}
          </h2>
          <ul className="space-y-2.5">
            {topConcerns.map((concern, index) => (
              <li
                key={concern}
                className="rounded-2xl border border-neutral-200 px-4 py-3 dark:border-neutral-800"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FCE7EF] text-[10px] font-semibold text-[#E879A9]">
                    {index + 1}
                  </span>
                  <p className="font-medium">
                    {t.scan.concernLabels[concern] ?? concern}
                  </p>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {t.scan.concernHints[concern] ?? ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Skin profile */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {t.scan.skinProfile}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {result.analysis.skinType ? (
            <Stat label={t.scan.skinType} value={result.analysis.skinType} />
          ) : null}
          <Stat label={t.scan.skinTone} value={result.analysis.skinTone} />
        </div>
      </section>

      {/* Makeup profile */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {t.scan.makeupProfile}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Stat label={t.scan.undertone} value={
            t.scan.undertoneLabels[result.analysis.undertone] ?? result.analysis.undertone
          } />
          <Stat label={t.scan.faceShape} value={result.analysis.faceShape} />
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" className="rounded-full" onClick={onSeeProducts}>
          {t.scan.seeProducts}
        </Button>
        <Button type="button" variant="secondary" className="rounded-full" onClick={onScanAgain}>
          {t.scan.scanAgain}
        </Button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="rounded-2xl">
      <p className="text-xs text-neutral-400">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </Card>
  );
}

function ProductRow({
  product,
  viewLabel,
}: {
  product: ScanMatchedProduct;
  viewLabel: string;
}) {
  const href = product.affiliateUrl || product.sourceUrl;
  return (
    <li className="flex gap-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
      <ProductImage src={product.imageUrl} alt={product.name} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs uppercase text-neutral-400">{product.brand}</p>
          <Badge>{formatMatch(product.matchScore)} match</Badge>
        </div>
        <p className="mt-1 font-medium">{product.name}</p>
        {product.explanations[0] ? (
          <p className="mt-1 text-sm text-neutral-500">{product.explanations[0]}</p>
        ) : null}
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex text-sm font-medium text-[#E879A9] hover:underline"
          >
            {viewLabel}
          </a>
        ) : null}
      </div>
    </li>
  );
}

function ProductImage({ src, alt }: { src: string | null; alt: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [src]);
  if (!src || failed) {
    const initials = alt
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
    return (
      <span
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F8E7EF] to-[#EDE4F5] text-xs font-semibold tracking-wide text-[#9B6B8A]"
        aria-label={alt}
        title={alt}
      >
        {initials || "—"}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-16 w-16 shrink-0 rounded-xl bg-neutral-100 object-cover"
    />
  );
}
