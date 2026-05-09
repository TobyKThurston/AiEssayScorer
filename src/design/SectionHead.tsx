import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Rule } from "./Rule";

export function SectionHead({
  num,
  eyebrow,
  title,
  intro,
  className = "",
}: {
  num?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-10 pb-6 md:pb-8">
        <div>
          <Eyebrow num={num}>{eyebrow}</Eyebrow>
        </div>
        <div>
          <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] text-ink">
            {title}
          </h2>
          {intro ? (
            <p className="mt-3 sm:mt-4 text-ink-2 text-[15px] sm:text-[16px] md:text-[17px] leading-[1.55] max-w-[56ch]">{intro}</p>
          ) : null}
        </div>
      </div>
      <Rule />
    </div>
  );
}
