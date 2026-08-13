import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  href?: string;
  compact?: boolean;
}

export function Logo({
  className,
  showWordmark = true,
  href = "/",
  compact = false,
}: LogoProps) {
  const content = (
    <span
      className={cn(
        "inline-flex items-center",
        compact ? "gap-2" : "gap-3",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt="AuraAI"
        width={compact ? 32 : 56}
        height={compact ? 32 : 56}
        className={cn(
          "object-contain",
          compact ? "h-8 w-8" : "h-12 w-12 sm:h-14 sm:w-14",
        )}
      />
      {showWordmark ? (
        <span
          className={cn(
            "font-semibold tracking-tight text-black dark:text-white",
            compact ? "text-base sm:text-lg" : "text-xl sm:text-2xl",
          )}
        >
          AuraAI
        </span>
      ) : (
        <span className="sr-only">AuraAI</span>
      )}
    </span>
  );

  if (!href) return content;
  return (
    <Link
      href={href}
      className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
      aria-label="AuraAI"
    >
      {content}
    </Link>
  );
}
