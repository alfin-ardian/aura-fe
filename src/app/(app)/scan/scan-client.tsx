"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Camera, ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScanAnalyzingOverlay } from "@/components/scan/scan-analyzing-overlay";
import { ScanStepper } from "@/components/scan/scan-stepper";
import { ScanTopBar } from "@/components/scan/scan-top-bar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/i18n/locale-provider";
import {
  isAffiliatorId,
  saveScanPreview,
  scanService,
} from "@/services/scan.service";

/** Keeps the analysis choreography on screen even when the API answers sooner. */
const MIN_ANALYZE_MS = 4000;

export function PublicScanClient() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const affiliator = (searchParams.get("affiliator") ?? "").trim();
  const validAffiliator = isAffiliatorId(affiliator);

  const [code, setCode] = useState(affiliator);
  const [guestName, setGuestName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraStarting, setCameraStarting] = useState(false);
  const [trainingConsent, setTrainingConsent] = useState(true);

  const galleryRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOpen(false);
  };

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!cameraOpen) return;
    const video = videoRef.current;
    const stream = streamRef.current;
    if (!video || !stream) return;
    video.srcObject = stream;
    void video.play().catch(() => undefined);
  }, [cameraOpen]);

  useEffect(() => () => stopCamera(), []);

  const onPickFile = (next: File | undefined) => {
    if (!next) return;
    if (!next.type.startsWith("image/")) {
      toast.error(t.scan.needPhoto);
      return;
    }
    stopCamera();
    setFile(next);
  };

  const openCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error(t.scan.cameraError);
      return;
    }
    setCameraStarting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: "user" },
          width: { ideal: 1280 },
          height: { ideal: 1280 },
        },
      });
      streamRef.current = stream;
      setFile(null);
      setCameraOpen(true);
    } catch {
      toast.error(t.scan.cameraDenied);
    } finally {
      setCameraStarting(false);
    }
  };

  const captureSelfie = async () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.92);
    });
    if (!blob) {
      toast.error(t.scan.error);
      return;
    }
    setFile(new File([blob], `selfie-${Date.now()}.jpg`, { type: "image/jpeg" }));
    stopCamera();
  };

  const onContinueWithCode = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = code.trim();
    if (!isAffiliatorId(trimmed)) {
      toast.error(t.scan.invalidCode);
      return;
    }
    router.replace(`/scan?affiliator=${encodeURIComponent(trimmed)}`);
  };

  const onAnalyze = async () => {
    if (!validAffiliator) {
      toast.error(t.scan.invalidCode);
      return;
    }
    if (!file) {
      toast.error(t.scan.needPhoto);
      return;
    }
    setSubmitting(true);
    try {
      const [data] = await Promise.all([
        scanService.publicScan({
          affiliatorId: affiliator,
          image: file,
          guestName,
          channel: "referral",
          trainingConsent,
        }),
        new Promise((resolve) => setTimeout(resolve, MIN_ANALYZE_MS)),
      ]);
      try {
        await saveScanPreview(data.scanId, file);
      } catch {
        // Preview is optional; results still load from API.
      }
      // Overlay stays up through navigation so there is no blank flash.
      router.push(
        `/scan/results?scanId=${encodeURIComponent(data.scanId)}&affiliator=${encodeURIComponent(affiliator)}`,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.scan.error);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white">
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <ScanTopBar />
        <div className="mb-8 sm:mb-10">
          <ScanStepper current={1} />
        </div>

        {!validAffiliator ? (
          <Card className="space-y-5 rounded-2xl p-6 sm:p-8">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">{t.scan.missingTitle}</h1>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                {t.scan.missingHint}
              </p>
            </div>
            <form onSubmit={onContinueWithCode} className="flex flex-col gap-3 sm:flex-row">
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder={t.scan.codePlaceholder}
                className="min-h-11 flex-1 rounded-full border border-neutral-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#F4A7BC] dark:border-neutral-700 dark:bg-neutral-900"
              />
              <Button type="submit" className="rounded-full">
                {t.scan.continue}
              </Button>
            </form>
          </Card>
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">{t.scan.title}</h1>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                {t.scan.subtitle}
              </p>
            </div>

            <Card className="space-y-5 rounded-2xl p-6 sm:p-8">
              <label className="block space-y-2 text-sm">
                <span className="text-neutral-600 dark:text-neutral-300">{t.scan.guestName}</span>
                <input
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                  placeholder={t.scan.guestNamePlaceholder}
                  className="min-h-11 w-full rounded-full border border-neutral-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#F4A7BC] dark:border-neutral-700 dark:bg-neutral-900"
                />
              </label>

              <input
                ref={galleryRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(event) => onPickFile(event.target.files?.[0])}
              />

              {cameraOpen ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="mx-auto h-72 w-full max-w-sm scale-x-[-1] rounded-3xl bg-black object-cover"
                />
              ) : preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt=""
                  className="mx-auto h-56 w-56 rounded-3xl object-cover"
                />
              ) : (
                <div className="flex h-56 items-center justify-center rounded-3xl border border-dashed border-neutral-200 bg-neutral-50 text-sm text-neutral-400 dark:border-neutral-800 dark:bg-neutral-900">
                  Selfie
                </div>
              )}

              {cameraOpen ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    type="button"
                    className="rounded-full"
                    onClick={() => void captureSelfie()}
                  >
                    <Camera className="h-4 w-4" />
                    {t.scan.capture}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-full"
                    onClick={stopCamera}
                  >
                    {t.scan.closeCamera}
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-full"
                    onClick={() => galleryRef.current?.click()}
                  >
                    <ImagePlus className="h-4 w-4" />
                    {t.scan.choosePhoto}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-full"
                    disabled={cameraStarting}
                    onClick={() => void openCamera()}
                  >
                    {cameraStarting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                    {t.scan.takeSelfie}
                  </Button>
                </div>
              )}

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
                <input
                  type="checkbox"
                  checked={trainingConsent}
                  onChange={(event) => setTrainingConsent(event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 accent-[#E879A9]"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-[#1D1D1F] dark:text-white">
                    {t.scan.trainingConsent}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {t.scan.trainingConsentHint}
                  </span>
                </span>
              </label>

              <Button
                type="button"
                className="w-full rounded-full"
                disabled={submitting || !file || cameraOpen}
                onClick={() => void onAnalyze()}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t.scan.analyzing}
                  </>
                ) : (
                  t.scan.analyze
                )}
              </Button>
              {submitting ? (
                <p className="text-center text-xs text-neutral-400">{t.scan.analyzingHint}</p>
              ) : null}
            </Card>
          </div>
        )}
      </main>
      <SiteFooter />
      {submitting ? (
        <ScanAnalyzingOverlay preview={preview} durationMs={MIN_ANALYZE_MS} />
      ) : null}
    </div>
  );
}
