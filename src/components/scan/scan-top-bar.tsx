"use client";

import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";

/** Compact chrome for public scan flow — language + theme without full marketing nav. */
export function ScanTopBar() {
  return (
    <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
      <Logo compact href="/" />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
