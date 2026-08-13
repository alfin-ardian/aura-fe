"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.howItWorks, href: "/#how-it-works" },
    { label: t.nav.pricing, href: "/#pricing" },
    { label: t.nav.faq, href: "/#faq" },
    { label: t.nav.docs, href: "/docs" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base text-neutral-500 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link
            href="/login"
            className="text-base font-medium text-neutral-600 transition hover:text-black dark:text-neutral-300 dark:hover:text-white"
          >
            {t.nav.login}
          </Link>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full px-4 text-sm dark:bg-white dark:text-black dark:hover:bg-neutral-200",
            )}
          >
            {t.nav.becomeAffiliate}
          </Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav
          className="border-t border-neutral-200 px-4 py-4 dark:border-neutral-800 md:hidden"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-3 text-sm text-black hover:bg-neutral-50 dark:text-white dark:hover:bg-neutral-900"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 space-y-2">
            <Link
              href="/login"
              className="block rounded-lg px-3 py-3 text-center text-sm font-medium text-black hover:bg-neutral-50 dark:text-white dark:hover:bg-neutral-900"
              onClick={() => setOpen(false)}
            >
              {t.nav.login}
            </Link>
            <Link
              href="/register"
              className={cn(
                buttonVariants(),
                "w-full rounded-full dark:bg-white dark:text-black",
              )}
              onClick={() => setOpen(false)}
            >
              {t.nav.becomeAffiliate}
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
