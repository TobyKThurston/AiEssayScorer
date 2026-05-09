"use client";

import { useState } from "react";
import { Container } from "@/design/Container";
import { SectionHead } from "@/design/SectionHead";

type TabId = "scorecard" | "edits" | "regional" | "risk";

const TABS: { id: TabId; eyebrow: string; label: string; description: string }[] = [
  {
    id: "scorecard",
    eyebrow: "Module · 01",
    label: "The scorecard",
    description:
      "A transparent rubric. See exactly what points you're losing and why - not just a vague grade.",
  },
  {
    id: "edits",
    eyebrow: "Module · 02",
    label: "Line-by-line edits",
    description:
      "Specific rewrites at the sentence level, each with a short rationale. Accept or reject one at a time.",
  },
  {
    id: "regional",
    eyebrow: "Module · 03",
    label: "Regional tailoring",
    description:
      "Your essay is assigned by region. We show you where your tone lands in each reading pool.",
  },
  {
    id: "risk",
    eyebrow: "Module · 04",
    label: "Risk guardrails",
    description:
      "AI-voice, topic, and tone flags. Surface the things a reader will notice before they see your draft.",
  },
];

export function ProductTour() {
  const [active, setActive] = useState<TabId>("scorecard");
  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <section className="py-24 md:py-28 border-t border-hair">
      <Container>
        <SectionHead
          num="§04"
          eyebrow="Inside the product"
          title={<>A tour of what you <em className="italic text-oxblood">actually</em> get.</>}
          intro="Four core modules, each visible before you pay. Click a tab to see what's in it."
        />

        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-5 sm:gap-6">
          <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
            {TABS.map((t) => {
              const on = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`text-left p-3 md:p-4 rounded-[4px] transition-all whitespace-nowrap md:whitespace-normal flex-shrink-0 md:flex-shrink snap-start ${
                    on ? "bg-paper-2" : "hover:bg-paper-2/60"
                  }`}
                  style={{
                    borderLeft: on ? "2px solid var(--color-oxblood)" : "2px solid transparent",
                  }}
                >
                  <p
                    className="font-mono text-[9.5px] md:text-[10px] uppercase tracking-[0.16em] mb-1"
                    style={{ color: on ? "var(--color-oxblood)" : "var(--color-pencil)" }}
                  >
                    {t.eyebrow}
                  </p>
                  <p
                    className="font-serif text-[16px] md:text-[18px] leading-[1.2]"
                    style={{ color: on ? "var(--color-ink)" : "var(--color-ink-2)" }}
                  >
                    {t.label}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="paper-card p-5 sm:p-7 md:p-9 min-h-[300px] md:min-h-[360px]">
            <TourPanel id={active} />
            <p className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-hair text-[14px] sm:text-[14.5px] text-ink-2 leading-[1.55]">
              {activeTab.description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TourPanel({ id }: { id: TabId }) {
  if (id === "scorecard") {
    return (
      <div>
        <div className="flex items-end gap-4 sm:gap-5 pb-4 border-b border-hair">
          <span className="font-serif text-[56px] sm:text-[72px] leading-none text-oxblood">88</span>
          <div className="pb-2">
            <p className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.16em] text-pencil">
              Quality score
            </p>
            <p className="font-serif italic text-[16px] sm:text-[18px] text-forest mt-1">High impact draft</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
          {[
            { label: "Content", v: 27, max: 30 },
            { label: "Structure", v: 22, max: 25 },
            { label: "Style", v: 23, max: 25 },
          ].map((r) => (
            <div key={r.label}>
              <div className="flex items-baseline justify-between mb-1.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-pencil">
                  {r.label}
                </p>
                <p className="font-serif text-[17px] text-ink">
                  {r.v}
                  <span className="text-pencil">/{r.max}</span>
                </p>
              </div>
              <div className="h-[3px] bg-paper-2 rounded-full overflow-hidden">
                <div className="h-full bg-oxblood" style={{ width: `${(r.v / r.max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (id === "edits") {
    const edits = [
      { orig: "I really enjoyed working on the project.", rep: "I stayed past midnight on the project three nights in a row.", why: "Replace a claim with evidence." },
      { orig: "This taught me the importance of teamwork.", rep: "When Ana asked me to re-write the tests, I listened.", why: "Show the moment, not the lesson." },
      { orig: "I've always loved science.", rep: "My third-grade science fair poster had a footnote.", why: "Specific > sweeping." },
    ];
    return (
      <ul className="space-y-3">
        {edits.map((e, i) => (
          <li key={i} className="border-b border-hair pb-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-oxblood mb-1.5">
              §0{i + 1}
            </p>
            <p className="text-[14.5px] text-ink-2 leading-[1.55]">
              <span className="line-through text-pencil">{e.orig}</span>{" "}
              <span className="text-pencil">→</span>{" "}
              <span className="text-oxblood">{e.rep}</span>
            </p>
            <p className="mt-1 font-serif italic text-[13.5px] text-ink-2">{e.why}</p>
          </li>
        ))}
      </ul>
    );
  }
  if (id === "regional") {
    const rows = [
      { label: "New England", fit: 92, target: true },
      { label: "Mid-Atlantic", fit: 86 },
      { label: "Midwest", fit: 74 },
      { label: "South", fit: 71 },
      { label: "West Coast", fit: 79 },
    ];
    return (
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-2 sm:gap-4">
            <span className="w-24 sm:w-28 font-serif text-[14px] sm:text-[16px] text-ink shrink-0">{r.label}</span>
            <div className="flex-1 h-[3px] bg-paper-2 rounded-full overflow-hidden min-w-0">
              <div
                className="h-full bg-oxblood"
                style={{ width: `${r.fit}%` }}
              />
            </div>
            <span className="w-10 sm:w-16 text-right font-serif text-[14px] sm:text-[16px] text-ink shrink-0">{r.fit}</span>
            {r.target ? (
              <span className="ml-1 sm:ml-2 font-mono text-[9px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-oxblood shrink-0">
                Target
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    );
  }
  // risk
  const flags: { label: string; state: "Clear" | "Caution"; note: string }[] = [
    { label: "Tone", state: "Clear", note: "Consistent, personal, not performative." },
    { label: "Topic", state: "Caution", note: "Mission-trip frame is common - earn it with specificity." },
    { label: "AI-detection", state: "Clear", note: "Reads as human voice. Low risk of false flags." },
    { label: "Voice", state: "Clear", note: "Distinct and consistent across paragraphs." },
  ];
  return (
    <ul className="space-y-3">
      {flags.map((f) => (
        <li key={f.label} className="grid grid-cols-[auto_auto] sm:flex sm:items-start gap-x-3 gap-y-1 sm:gap-4 pb-3 border-b border-hair last:border-b-0">
          <span className="font-serif text-[15px] sm:text-[16px] text-ink sm:w-28 shrink-0">{f.label}</span>
          <span
            className="font-serif italic text-[14px] sm:text-[15px]"
            style={{ color: f.state === "Clear" ? "var(--color-forest)" : "var(--color-oxblood)" }}
          >
            {f.state}
          </span>
          <span className="col-span-2 sm:col-auto sm:flex-1 text-[13.5px] text-ink-2 leading-[1.55]">{f.note}</span>
        </li>
      ))}
    </ul>
  );
}
