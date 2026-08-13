"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface AnimatedLettersProps {
  text: string;
  className?: string;
  letterClassName?: string;
}

/**
 * Each character appears one-by-one, left → right, with 0.5s delay.
 */
export function AnimatedLetters({
  text,
  className,
  letterClassName,
}: AnimatedLettersProps) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const chars = Array.from(text);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const letters = root.querySelectorAll<HTMLElement>("[data-letter]");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || letters.length === 0) {
      gsap.set(letters, { autoAlpha: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Hide all letters first
      gsap.set(letters, { autoAlpha: 0, x: -12 });

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
      });

      // Show one letter every 0.5s (left → right)
      tl.to(letters, {
        autoAlpha: 1,
        x: 0,
        duration: 0.25,
        ease: "power2.out",
        stagger: 0.5,
      });

      // Hold full word, then hide and restart
      tl.to(
        letters,
        {
          autoAlpha: 0,
          duration: 0.35,
          ease: "power1.in",
        },
        "+=1.5",
      );
    }, root);

    return () => ctx.revert();
  }, [text]);

  return (
    <h1 ref={rootRef} className={cn("flex flex-wrap", className)} aria-label={text}>
      {chars.map((char, index) => {
        const isSpace = char === " ";
        return (
          <span
            key={`${char}-${index}`}
            data-letter={isSpace ? undefined : true}
            aria-hidden
            className={cn(
              "inline-block",
              isSpace ? "w-[0.35em] opacity-100" : "opacity-0",
              letterClassName,
            )}
          >
            {isSpace ? "\u00A0" : char}
          </span>
        );
      })}
    </h1>
  );
}
