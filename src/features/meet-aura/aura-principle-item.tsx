interface AuraPrincipleItemProps {
  letter: string;
  title: string;
  body: string;
  showDivider?: boolean;
}

export function AuraPrincipleItem({
  letter,
  title,
  body,
  showDivider = false,
}: AuraPrincipleItemProps) {
  return (
    <article
      className={
        showDivider
          ? "border-t border-[#EAEAEA] pt-8 first:border-t-0 first:pt-0 md:border-t-0 md:pt-0 dark:border-neutral-800"
          : undefined
      }
    >
      <p className="text-sm font-medium tracking-[0.18em] text-[#F4A7BC]">
        {letter}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#6E6E73] sm:text-[15px] dark:text-neutral-400">
        {body}
      </p>
    </article>
  );
}
