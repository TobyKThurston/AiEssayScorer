"use client";

import { useState } from "react";
import { Container } from "@/design/Container";
import { SectionHead } from "@/design/SectionHead";
import { FAQ_ITEMS } from "./faqData";

export function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="py-24 md:py-28 border-t border-hair">
      <Container>
        <SectionHead
          num="§08"
          eyebrow="Frequently asked"
          title={<>Questions students <em className="italic text-oxblood">actually</em> ask.</>}
          intro="The ones that come up most often when a student or counselor evaluates Ivy Admit for the first time."
        />

        <div className="mt-14 max-w-[860px]">
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
                  className="w-full grid grid-cols-[auto_1fr_auto] items-baseline gap-4 md:gap-6 text-left py-6 px-2 md:px-4 group"
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
                  <div className="grid grid-cols-[auto_1fr] gap-4 md:gap-6 pb-7 pt-1 px-2 md:px-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood pt-1">
                      A.
                    </span>
                    <p className="text-[15.5px] md:text-[16px] text-ink-2 leading-[1.7] max-w-[68ch] border-l-2 border-oxblood pl-5">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-[860px] font-mono text-[11px] uppercase tracking-[0.18em] text-pencil">
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
