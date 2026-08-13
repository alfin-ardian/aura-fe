import { AuraPrincipleItem } from "@/features/meet-aura/aura-principle-item";
import { AURA_PRINCIPLES } from "@/features/meet-aura/constants";

export function AuraPrinciples() {
  return (
    <section aria-labelledby="aura-principle-heading" className="mt-28 sm:mt-36">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium tracking-wide text-[#6E6E73]">
          The Aura Principle
        </p>
        <h2
          id="aura-principle-heading"
          className="mt-3 text-3xl font-semibold tracking-tight text-[#1D1D1F] sm:text-4xl"
        >
          A.U.R.A.
        </h2>
      </div>

      <div className="mt-14 grid gap-0 md:mt-20 md:grid-cols-4 md:gap-10 lg:gap-14">
        {AURA_PRINCIPLES.map((item) => (
          <AuraPrincipleItem
            key={`${item.letter}-${item.title}`}
            letter={item.letter}
            title={item.title}
            body={item.body}
            showDivider
          />
        ))}
      </div>
    </section>
  );
}
