"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Clock,
  BarChart2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Essay } from "../types";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Draft or paste",
    desc: "Start fresh, or drop in an existing essay you're revising.",
  },
  {
    step: "2",
    title: "Run an analysis",
    desc: "Rubric-based scores for content, structure, clarity, and fit.",
  },
  {
    step: "3",
    title: "Apply rewrites",
    desc: "One-click line-level rewrites that keep your voice intact.",
  },
];

const DELIVERABLES = [
  "Line-by-line AI suggestions",
  "Content, structure, clarity scores",
  "School-fit analysis",
  "Admissions officer perspective",
];

export function EssayList() {
  const router = useRouter();
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/essays")
      .then((r) => r.json())
      .then((data) => setEssays(data.essays ?? []))
      .catch(() => setEssays([]))
      .finally(() => setLoading(false));
  }, []);

  const handleNew = async () => {
    setCreating(true);
    setCreateError(null);
    try {
      const res = await fetch("/api/essays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Untitled Essay" }),
      });
      const data = await res.json();
      if (data.essay) {
        router.push(`/editor/${data.essay.id}`);
        return;
      }
      setCreateError(data.error || "Couldn't create the essay. Database migrations up to date?");
    } catch {
      setCreateError("Couldn't create the essay. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="w-6 h-6 border-2 border-oxblood border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container-editorial pt-12 md:pt-16 pb-24">
      {createError ? (
        <div className="mb-8 px-4 py-3 border border-oxblood/30 bg-oxblood/5 text-sm text-oxblood">
          {createError}
        </div>
      ) : null}

      {essays.length === 0 ? (
        <EmptyState onNew={handleNew} creating={creating} />
      ) : (
        <FilledLayout
          essays={essays}
          onNew={handleNew}
          creating={creating}
          onOpen={(id) => router.push(`/editor/${id}`)}
        />
      )}
    </div>
  );
}

/* ─── Empty state ─── */

function EmptyState({ onNew, creating }: { onNew: () => void; creating: boolean }) {
  return (
    <div className="max-w-[820px] mx-auto">
      <div className="mb-12 md:mb-16">
        <p className="eyebrow mb-5">
          <span className="num">§</span> The Workshop
        </p>
        <h1 className="font-serif text-[44px] md:text-[68px] leading-[1.02] tracking-[-0.025em] text-ink mb-6">
          A quiet room for your <em className="italic text-oxblood">best draft</em>.
        </h1>
        <p className="text-[17px] md:text-[18px] leading-[1.6] text-ink-2 max-w-[56ch] mb-8">
          Ivy Admit scores your essay across content, structure, and voice - then points to the
          exact sentences worth rewriting. Start a new draft or paste one in.
        </p>
        <button
          onClick={onNew}
          disabled={creating}
          className="btn btn-lg btn-ink disabled:opacity-60"
        >
          <Plus className="w-4 h-4 mr-1.5 inline-block" />
          {creating ? "Creating…" : "Start a new essay"}
        </button>
      </div>

      <hr className="rule mb-12" />

      <div className="grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-4">
          <p className="eyebrow mb-4">
            <span className="num">◦</span> What you get
          </p>
        </div>
        <div className="col-span-12 md:col-span-8">
          <ul className="divide-y divide-[color:var(--color-hair)] border-y border-hair">
            {DELIVERABLES.map((label, i) => (
              <li key={label} className="flex items-baseline gap-6 py-4">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-oxblood/70 shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-[18px] md:text-[20px] text-ink">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-4">
          <p className="eyebrow mb-4">
            <span className="num">◦</span> How it works
          </p>
        </div>
        <div className="col-span-12 md:col-span-8 space-y-8">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className="flex gap-6">
              <span className="font-serif italic text-oxblood text-[32px] leading-none shrink-0 w-8">
                {step}
              </span>
              <div>
                <p className="font-serif text-[20px] text-ink mb-1.5 leading-snug">{title}</p>
                <p className="text-[15px] text-ink-2 leading-relaxed max-w-[48ch]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Filled layout ─── */

function FilledLayout({
  essays,
  onNew,
  creating,
  onOpen,
}: {
  essays: Essay[];
  onNew: () => void;
  creating: boolean;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
      <div className="col-span-12 lg:col-span-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
          <div>
            <p className="eyebrow mb-3">
              <span className="num">§</span> My Essays
            </p>
            <h1 className="font-serif text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.02em] text-ink">
              The <em className="italic text-oxblood">current</em> drafts.
            </h1>
            <p className="text-[15px] text-ink-2 mt-2">
              {essays.length} draft{essays.length === 1 ? "" : "s"} in progress
            </p>
          </div>
          <button
            onClick={onNew}
            disabled={creating}
            className="btn btn-sm btn-ink self-start sm:self-end disabled:opacity-60"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5 inline-block" />
            {creating ? "Creating…" : "New essay"}
          </button>
        </div>

        <ul className="divide-y divide-[color:var(--color-hair)] border-y border-hair">
          {essays.map((essay) => (
            <EssayRow key={essay.id} essay={essay} onOpen={onOpen} />
          ))}
        </ul>

        <UnreviewedNudge essays={essays} onOpen={onOpen} />

        <p className="mt-10 text-[12px] font-mono uppercase tracking-[0.14em] text-pencil">
          Small edits compound. Score, revise, re-score.
        </p>
      </div>

      <aside className="col-span-12 lg:col-span-4 lg:sticky lg:top-[90px] space-y-10">
        <ReviewLatestCard essays={essays} onOpen={onOpen} />
        <DeliverablesCard />
        <HowItWorksCard />
      </aside>
    </div>
  );
}

/* ─── Essay row ─── */

function EssayRow({
  essay,
  onOpen,
}: {
  essay: Essay;
  onOpen: (id: string) => void;
}) {
  return (
    <li>
      <button
        onClick={() => onOpen(essay.id)}
        className="w-full text-left group grid grid-cols-[auto_1fr_auto] items-baseline gap-6 py-5 -mx-3 px-3 hover:bg-cream/60 transition-colors"
      >
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-oxblood/80 shrink-0 w-[62px]">
          Draft
        </span>
        <div className="min-w-0">
          <p className="font-serif text-[20px] md:text-[22px] leading-[1.2] text-ink group-hover:text-oxblood transition-colors truncate">
            {essay.title}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-[12px] font-mono uppercase tracking-[0.14em] text-pencil">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {formatDate(essay.updated_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart2 className="w-3 h-3" />
              Open to review
            </span>
          </div>
        </div>
        <span className="shrink-0 text-oxblood opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 inline-block transition-all">
          →
        </span>
      </button>
    </li>
  );
}

/* ─── Unreviewed nudge ─── */

function UnreviewedNudge({
  essays,
  onOpen,
}: {
  essays: Essay[];
  onOpen: (id: string) => void;
}) {
  const latest = essays[0];
  if (!latest) return null;

  return (
    <div className="mt-8 border-l-2 border-oxblood pl-5 py-3">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-oxblood shrink-0 mt-1" />
        <div className="flex-1">
          <p className="font-serif text-[17px] text-ink leading-snug">
            Ready to score a draft?
          </p>
          <p className="text-[13px] text-pencil mt-1 mb-3">
            Open an essay and run an analysis to see how it holds up.
          </p>
          <button
            onClick={() => onOpen(latest.id)}
            className="inline-flex items-center gap-1.5 text-[13px] font-mono uppercase tracking-[0.14em] text-oxblood hover:text-oxblood-2 transition-colors"
          >
            Review latest <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Sidebar cards ─── */

function ReviewLatestCard({
  essays,
  onOpen,
}: {
  essays: Essay[];
  onOpen: (id: string) => void;
}) {
  const latest = essays[0];
  if (!latest) return null;

  return (
    <div className="paper-card p-6">
      <p className="eyebrow mb-4">
        <span className="num">◦</span> Recommended
      </p>
      <p className="font-serif text-[22px] leading-[1.2] text-ink mb-3">
        Score your <em className="italic text-oxblood">latest</em> draft.
      </p>
      <p className="text-[14px] text-ink-2 leading-relaxed mb-5">
        Instant rubric-based feedback on content, structure, clarity, and admissions fit.
      </p>
      <button
        onClick={() => onOpen(latest.id)}
        className="btn btn-sm btn-brand w-full justify-center"
      >
        Open &quot;{latest.title}&quot;
      </button>
    </div>
  );
}

function DeliverablesCard() {
  return (
    <div>
      <p className="eyebrow mb-4">
        <span className="num">◦</span> What you get
      </p>
      <ul className="space-y-2.5">
        {DELIVERABLES.map((label) => (
          <li key={label} className="flex items-baseline gap-3">
            <span className="font-mono text-[10px] text-oxblood/70">→</span>
            <span className="font-serif text-[16px] text-ink-2 leading-snug">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HowItWorksCard() {
  return (
    <div>
      <p className="eyebrow mb-4">
        <span className="num">◦</span> How it works
      </p>
      <ol className="space-y-4">
        {HOW_IT_WORKS.map(({ step, title, desc }) => (
          <li key={step} className="flex gap-4">
            <span className="font-serif italic text-oxblood text-[22px] leading-none shrink-0 w-5">
              {step}
            </span>
            <div>
              <p className="font-serif text-[16px] text-ink leading-snug">{title}</p>
              <p className="text-[13px] text-pencil leading-relaxed mt-0.5">{desc}</p>
            </div>
          </li>
        ))}
      </ol>
      <Link
        href="/blog"
        className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-mono uppercase tracking-[0.14em] text-oxblood hover:text-oxblood-2 transition-colors"
      >
        Read the guides <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
