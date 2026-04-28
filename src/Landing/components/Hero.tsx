"use client";

import Link from "next/link";
import { Container } from "@/design/Container";
import { HeroDemo } from "./HeroDemo";

export function Hero() {
  return (
    <section className="pt-12 md:pt-16 pb-16 md:pb-20 border-b border-hair">
      <Container>
        <div className="flex items-center justify-between gap-4 pb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
          <span>Vol. IV · The Applicant&apos;s Review · Early Action 2026</span>
          <span className="hidden md:inline">Est. 2023 · 20,417 essays reviewed</span>
        </div>
        <hr className="rule" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 pt-10 md:pt-14">
          <div>
            <h1 className="text-ink">
              Know where your essay <em className="italic text-oxblood">stands</em> before you submit.
            </h1>
            <p className="mt-6 md:mt-7 text-[17px] md:text-[18.5px] leading-[1.55] text-ink-2 max-w-[48ch]">
              AI feedback trained on real Ivy League acceptances. Score your content, structure,
              and voice in under 60 seconds.{" "}
              <em className="italic text-oxblood">It&apos;s still your essay. Just louder.</em>
            </p>

            <div className="mt-7 flex flex-col sm:flex-row sm:flex-wrap items-start gap-4">
              <Link
                href="/editor"
                className="btn btn-brand group relative w-full sm:w-auto justify-center text-[18px] md:text-[19px] font-semibold px-8 py-5 md:px-10 md:py-6 shadow-[0_8px_24px_-8px_rgba(124,28,28,0.45)] hover:shadow-[0_12px_32px_-8px_rgba(124,28,28,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Score my essay — free
                <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/ivy-league-essay-examples"
                className="btn btn-ghost text-[13.5px] underline-offset-4 hover:underline"
              >
                or browse sample scores
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-ink-2">
              {[
                "No signup to start",
                "Feedback in under 60s",
                "Keeps your voice",
              ].map((m) => (
                <li key={m} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-oxblood" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <HeroDemo />
          </div>
        </div>
      </Container>
    </section>
  );
}
