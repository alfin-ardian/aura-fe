"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScanStepper, type ScanStep } from "@/components/scan/scan-stepper";
import { ScanTopBar } from "@/components/scan/scan-top-bar";
import { ErrorState } from "@/components/ui/error-state";
import { useLocale } from "@/i18n/locale-provider";
import { ScanResultsView } from "../scan-results-view";
import {
  isAffiliatorId,
  loadScanPreview,
  scanService,
  type PublicScanResult,
} from "@/services/scan.service";

function parseStep(raw: string | null): 2 | 3 {
  return raw === "products" || raw === "3" ? 3 : 2;
}

export function ScanResultsClient() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const scanId = (searchParams.get("scanId") ?? "").trim();
  const affiliator = (searchParams.get("affiliator") ?? "").trim();
  const step = parseStep(searchParams.get("step"));

  const [result, setResult] = useState<PublicScanResult | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!scanId || !isAffiliatorId(scanId)) {
      setResult(null);
      return;
    }
    const data = await scanService.getPublicResult(
      scanId,
      isAffiliatorId(affiliator) ? affiliator : undefined,
    );
    setResult(data);
    setPreview(loadScanPreview(scanId));
  }, [affiliator, scanId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        await load();
      } catch (error) {
        if (!cancelled) {
          setResult(null);
          toast.error(error instanceof Error ? error.message : t.scan.error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load, t.scan.error]);

  const scanAgainHref = isAffiliatorId(affiliator)
    ? `/scan?affiliator=${encodeURIComponent(affiliator)}`
    : "/scan";

  const setStep = (next: 2 | 3) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === 3) params.set("step", "products");
    else params.delete("step");
    router.replace(`/scan/results?${params.toString()}`, { scroll: false });
  };

  const onStepperClick = (next: ScanStep) => {
    if (next === 1) {
      router.push(scanAgainHref);
      return;
    }
    if (next === 2 || next === 3) setStep(next);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white">
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <ScanTopBar />
        <div className="mb-8 sm:mb-10">
          <ScanStepper current={step} onStepClick={onStepperClick} />
        </div>

        {loading ? (
          <p className="text-sm text-neutral-500">{t.scan.analyzingHint}</p>
        ) : result ? (
          <ScanResultsView
            result={result}
            preview={preview}
            step={step}
            onScanAgain={() => router.push(scanAgainHref)}
            onSeeProducts={() => setStep(3)}
            onBackToResults={() => setStep(2)}
          />
        ) : (
          <ErrorState
            title={t.scan.results}
            description={t.scan.error}
            onRetry={() => {
              setLoading(true);
              void load().finally(() => setLoading(false));
            }}
          />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
