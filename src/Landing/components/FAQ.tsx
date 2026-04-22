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

        <div className="mt-12 max-w-[820px]">
          {FAQ_ITEMS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-t border-hair last:border-b">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 text-left py-5"
                >
                  <span className="font-serif text-[20px] md:text-[22px] leading-[1.25] text-ink">
                    {f.q}
                  </span>
                  <span
                    className="font-mono text-[18px] text-oxblood mt-0.5 transition-transform shrink-0"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height,margin] duration-300 ease-out"
                  style={{ maxHeight: isOpen ? 400 : 0, marginBottom: isOpen ? 20 : 0 }}
                >
                  <p className="text-[15.5px] text-ink-2 leading-[1.7] max-w-[70ch]">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
