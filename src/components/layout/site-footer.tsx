"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .55.04.81.1V9.01a6.27 6.27 0 0 0-.81-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.6a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05Z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: TikTokIcon,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: Youtube,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: Facebook,
  },
] as const;

export function SiteFooter() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  const navLinks = [
    { label: t.nav.howItWorks, href: "/#how-it-works" },
    { label: t.nav.pricing, href: "/#pricing" },
    { label: t.nav.faq, href: "/#faq" },
    { label: t.nav.docs, href: "/docs" },
  ];

  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="space-y-2">
          <Logo />
          <p className="max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
            {t.footer.tagline}
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-center">
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-black dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            © {year} AuraAI. {t.footer.rights}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-[#1D1D1F] transition",
                "hover:border-[#F4A7BC] hover:bg-[#FCE7EF] hover:text-[#F4A7BC]",
                "dark:border-neutral-600 dark:text-white dark:hover:border-[#F4A7BC] dark:hover:bg-[#3A2430] dark:hover:text-[#F4A7BC]",
              )}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
