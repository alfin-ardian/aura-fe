"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function FinanceTabs() {
  const { locale } = useLocale();
  const pathname = usePathname();

  const labels =
    locale === "ko"
      ? { list: "목록", charts: "그래프" }
      : locale === "en"
        ? { list: "List", charts: "Charts" }
        : { list: "Daftar", charts: "Grafik" };

  const tabs = [
    { href: "/admin/finance", label: labels.list, match: (p: string) => p === "/admin/finance" },
    {
      href: "/admin/finance/report",
      label: labels.charts,
      match: (p: string) => p.startsWith("/admin/finance/report"),
    },
  ];

  return (
    <div className="inline-flex rounded-full border border-neutral-200 p-1 dark:border-neutral-700">
      {tabs.map((tab) => {
        const active = tab.match(pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium transition",
              active
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
