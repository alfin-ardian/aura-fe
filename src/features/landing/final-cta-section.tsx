"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/i18n/locale-provider";

export function FinalCtaSection() {
  const { t } = useLocale();

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="scroll-mt-24 bg-white dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="relative isolate overflow-hidden rounded-[28px] sm:rounded-[32px]">
          <Image
            src="/cta-footer.png"
            alt=""
            fill
            priority={false}
            className="object-cover object-[72%_center]"
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7D5E4] via-[#F7D5E4]/92 to-transparent sm:via-[#F7D5E4]/85 sm:to-transparent" />
          <div className="absolute inset-y-0 right-0 hidden w-[48%] bg-gradient-to-l from-black/20 to-transparent sm:block" />

          <div className="relative grid min-h-[280px] items-center px-7 py-12 sm:min-h-[320px] sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-14 lg:py-16">
            <div className="max-w-md">
              <h2
                id="cta-heading"
                className="text-3xl font-semibold tracking-tight text-[#1D1D1F] sm:text-4xl"
              >
                {t.cta.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4B4B4B] sm:text-[17px]">
                {t.cta.body}
              </p>
              <Link
                href="/register"
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#1D1D1F] px-7 text-sm font-medium text-white transition hover:bg-black"
              >
                {t.cta.button}
              </Link>
            </div>
            <div className="hidden lg:block" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
