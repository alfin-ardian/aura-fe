"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LOCALES } from "@/i18n/locales";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((item) => item.code === locale) ?? LOCALES[0];

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.language}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 text-sm font-medium text-[#1D1D1F] transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
      >
        <span>{current.short}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-neutral-400 transition",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t.language}
          className="absolute right-0 z-50 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
        >
          {LOCALES.map((item) => (
            <li key={item.code} role="option" aria-selected={item.code === locale}>
              <button
                type="button"
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition hover:bg-neutral-50 dark:hover:bg-neutral-800",
                  item.code === locale
                    ? "font-medium text-black dark:text-white"
                    : "text-neutral-600 dark:text-neutral-300",
                )}
                onClick={() => {
                  setLocale(item.code);
                  setOpen(false);
                }}
              >
                <span>{item.label}</span>
                <span className="text-xs text-neutral-400">{item.short}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
