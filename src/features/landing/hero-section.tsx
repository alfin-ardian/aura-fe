"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

const PARTNER_AVATARS = [
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/women/21.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/women/90.jpg",
] as const;

export function HeroSection() {
  const router = useRouter();
  const { t } = useLocale();
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);

  const onSubmitCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    router.push(`/scan?affiliator=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section className="relative overflow-hidden bg-white text-[#1D1D1F] dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-2 lg:gap-10">
        <div>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            {t.hero.titleLine1}
            <br />
            {t.hero.titleLine2Before}{" "}
            <span className="bg-gradient-to-r from-[#F4A7BC] to-[#E879A9] bg-clip-text text-transparent">
              {t.hero.titleLine2Accent}
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#6E6E73] sm:text-lg dark:text-neutral-400">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setShowCode(true)}
              className="rounded-2xl bg-[#1D1D1F] px-5 py-4 text-left transition hover:bg-black"
            >
              <p className="text-sm font-medium text-white">
                {t.hero.haveScanCode}
              </p>
              <p className="mt-1 text-xs text-neutral-400">{t.hero.scanNow}</p>
            </button>
            <Link
              href="/register"
              className="rounded-2xl border border-[#EAEAEA] bg-white px-5 py-4 text-left transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              <p className="text-sm font-medium text-[#1D1D1F] dark:text-white">
                {t.hero.becomeAffiliate}
              </p>
              <p className="mt-1 text-xs text-[#6E6E73] dark:text-neutral-400">
                {t.hero.startEarning}
              </p>
            </Link>
          </div>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              showCode ? "mt-4 max-h-36 opacity-100" : "mt-0 max-h-0 opacity-0",
            )}
          >
            <form
              onSubmit={onSubmitCode}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t.hero.scanCodePlaceholder}
                className="min-h-11 flex-1 rounded-full border border-neutral-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#F4A7BC] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                aria-label={t.hero.scanCodeAria}
              />
              <button
                type="submit"
                className="min-h-11 rounded-full bg-[#1D1D1F] px-5 text-sm font-medium text-white dark:bg-white dark:text-black"
              >
                {t.hero.scanNow.replace(" →", "")}
              </button>
            </form>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex -space-x-2">
              {PARTNER_AVATARS.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={32}
                  height={32}
                  unoptimized
                  className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-neutral-950"
                />
              ))}
            </div>
            <p className="flex items-center gap-2 text-sm text-[#6E6E73] dark:text-neutral-400">
              <span>{t.hero.trusted}</span>
              <span aria-hidden>·</span>
              <span className="tracking-tight" aria-label="5 stars">
                ★★★★★
              </span>
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <Image
            src="/hero.png"
            alt={t.hero.heroAlt}
            width={403}
            height={619}
            priority
            unoptimized
            className="mx-auto h-auto w-full max-w-[380px] bg-transparent object-contain lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
