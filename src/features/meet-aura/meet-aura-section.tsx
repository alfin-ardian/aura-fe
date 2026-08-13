import Link from "next/link";
import { AuraLetterAnimation } from "@/features/meet-aura/aura-letter-animation";
import { AuraPrinciples } from "@/features/meet-aura/aura-principles";

export function MeetAuraSection() {
  return (
    <section
      id="meet-aura"
      aria-labelledby="meet-aura-heading"
      className="scroll-mt-24 bg-white"
    >
      <div className="mx-auto max-w-5xl px-4 py-28 sm:px-6 sm:py-36">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-[#6E6E73]">
            Meet Aura
          </p>
          <h2
            id="meet-aura-heading"
            className="mt-4 text-4xl font-semibold tracking-tight text-[#1D1D1F] sm:text-5xl lg:text-6xl"
          >
            One A. Three meanings.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#6E6E73] sm:text-lg">
            The letter A is the heart of AuraAI — identity, insight, and
            intelligence in one symbol.
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          <AuraLetterAnimation />
        </div>

        <AuraPrinciples />

        <div className="mt-28 border-t border-[#EAEAEA] pt-20 text-center sm:mt-36 sm:pt-24">
          <h3 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] sm:text-4xl">
            See what AuraAI sees.
          </h3>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#6E6E73] sm:text-base">
            Start with a selfie. Understand your skin with clarity and
            confidence.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#1D1D1F] px-8 text-sm font-medium text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A7BC] focus-visible:ring-offset-2"
          >
            Start Your First Scan
          </Link>
        </div>
      </div>
    </section>
  );
}
