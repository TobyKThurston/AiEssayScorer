"use client";

import { useState } from "react";
import { Container } from "@/design/Container";
import { Rule } from "@/design/Rule";
import { FAQ_ITEMS } from "./faqData";

export function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="py-28 md:py-36 border-t border-hair">
      <Container>
        <div className="text-center max-w-[860px] mx-auto pb-12 md:pb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-pencil flex items-center justify-center gap-3">
            <span aria-hidden className="inline-block w-8 h-px bg-hair" />
            <span className="text-oxblood">§08</span>
            <span>Frequently asked</span>
            <span aria-hidden className="inline-block w-8 h-px bg-hair" />
          </p>
          <h2 className="mt-7 md:mt-8 font-serif text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] text-ink">
            Questions students <em className="italic text-oxblood">actually</em> ask.
          </h2>
          <p className="mt-6 mx-auto text-ink-2 text-[16px] md:text-[17px] leading-[1.6] max-w-[56ch]">
            The ones that come up most often when a student or counselor evaluates Ivy Admit for the first time.
          </p>
        </div>
        <Rule />

        <div className="mt-20 md:mt-24 max-w-[860px] mx-auto">
          {FAQ_ITEMS.map((f, i) => {
            const isOpen = open === i;
            const num = String(i + 1).padStart(2, "0");
            return (
              <div
                key={i}
                className={`border-t border-hair last:border-b transition-colors ${
                  isOpen ? "bg-cream/60" : "hover:bg-cream/30"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full grid grid-cols-[auto_1fr_auto] items-baseline gap-5 md:gap-8 text-left py-8 md:py-9 px-3 md:px-5 group"
                >
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.22em] tabular-nums transition-colors ${
                      isOpen ? "text-oxblood" : "text-pencil group-hover:text-oxblood"
                    }`}
                  >
                    Q.{num}
                  </span>
                  <span className="font-serif text-[20px] md:text-[23px] leading-[1.25] text-ink">
                    {f.q}
                  </span>
                  <span
                    className="font-mono text-[20px] text-oxblood transition-transform shrink-0 self-center"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-400 ease-out"
                  style={{ maxHeight: isOpen ? 600 : 0, opacity: isOpen ? 1 : 0 }}
                >
                  <div className="grid grid-cols-[auto_1fr] gap-5 md:gap-8 pb-10 md:pb-12 pt-2 px-3 md:px-5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood pt-1">
                      A.
                    </span>
                    <p className="text-[15.5px] md:text-[16px] text-ink-2 leading-[1.75] max-w-[68ch] border-l-2 border-oxblood pl-6">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-16 md:mt-20 max-w-[860px] mx-auto text-center font-mono text-[11px] uppercase tracking-[0.18em] text-pencil">
          Still curious?{" "}
          <a
            href="mailto:support@getivyadmit.com"
            className="text-oxblood hover:underline underline-offset-4"
          >
            Write to the editor →
          </a>
        </p>
      </Container>
    </section>
  );
}
