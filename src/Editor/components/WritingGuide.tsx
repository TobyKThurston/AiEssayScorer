"use client";

import { CheckSquare, Hash, BookOpen, GraduationCap, Settings2 } from "lucide-react";

interface WritingGuideProps {
  wordCount: number;
  essayType: string;
  essayPrompt: string;
  targetSchools: string[];
  onEditContext: () => void;
}

const WORD_TARGETS: Record<string, { min: number; max: number; label: string }> = {
  "Common App Personal Statement": { min: 250, max: 650, label: "250to650 words" },
  "UC Personal Insight Question": { min: 50, max: 350, label: "50to350 words" },
  "Coalition App Essay": { min: 200, max: 550, label: "200to550 words" },
  "Supplemental Essay": { min: 50, max: 500, label: "50to500 words" },
  "Scholarship Essay": { min: 200, max: 600, label: "200to600 words" },
};
const DEFAULT_TARGET = { min: 100, max: 650, label: "100to650 words" };

const ESSAY_TIPS: Record<string, { heading: string; tips: string[] }> = {
  "Common App Personal Statement": {
    heading: "Common App Tips",
    tips: [
      'Open with a specific scene, not "I have always been..."',
      "Show your character through concrete details, not a résumé",
      "Pick one focused story:depth beats breadth every time",
      "Reveal growth or a genuine shift in perspective by the end",
      'Avoid clichés: "passion for", "unique individual", "hard work"',
      "Read it aloud:it should sound like you, not a formal essay",
    ],
  },
  "UC Personal Insight Question": {
    heading: "UC PIQ Tips",
    tips: [
      "Answer the prompt directly in your very first sentence",
      "Each PIQ should highlight a different dimension of who you are",
      "Focus on impact:what did you learn, create, or change?",
      "Name real courses, clubs, mentors, or tangible outcomes",
      "350 words is tight:every sentence must earn its place",
      "UC values leadership, creativity, and community contribution",
    ],
  },
  "Coalition App Essay": {
    heading: "Coalition App Tips",
    tips: [
      "550-word cap:tighter than Common App, so cut ruthlessly",
      "Show how your background or community shaped your thinking",
      "One vivid, specific story beats three abstract ones",
      "Connect your past experience to your future goals",
      "Avoid listing accomplishments:tell the story behind one",
    ],
  },
  "Supplemental Essay": {
    heading: "Supplemental Tips",
    tips: [
      "Research the school: course catalog, faculty pages, student clubs",
      "Name specific professors, programs, labs, or unique traditions",
      "Explain why their particular approach fits how you think",
      "Admissions officers can spot generic essays immediately",
      "Short supplements (50to150 words) must be dense with specifics",
      "Connect their strengths to your exact goals:not just any goals",
    ],
  },
  "Scholarship Essay": {
    heading: "Scholarship Tips",
    tips: [
      "Re-read the prompt and answer every part of it directly",
      "Connect your story to the scholarship's values or mission",
      "Show specifically how the award enables your goals",
      "Anchor the essay in a real moment or example",
      "Edit tightly:competitive scholarships reward every word",
    ],
  },
};

const DEFAULT_TIPS = {
  heading: "Writing Tips",
  tips: [
    "Read the prompt carefully:answer exactly what is asked",
    "Anchor the essay in one specific story or moment",
    "Show your thinking process, not just your actions",
    "End with insight, reflection, or forward momentum",
    "Have someone unfamiliar with your story read it for clarity",
  ],
};

const CHECKLIST = [
  "Opens with something specific, not a broad claim",
  "Shows who you are, not just what you have done",
  "Has a clear arc: setup, tension, and reflection",
  "Avoids clichés and overused admissions phrases",
  "Ends memorably with genuine insight or a look forward",
];

export function WritingGuide({
  wordCount,
  essayType,
  essayPrompt,
  targetSchools,
  onEditContext,
}: WritingGuideProps) {
  const target = WORD_TARGETS[essayType] ?? DEFAULT_TARGET;
  const tipData = ESSAY_TIPS[essayType] ?? DEFAULT_TIPS;

  const pct = Math.min((wordCount / target.max) * 100, 100);
  const minPct = (target.min / target.max) * 100;

  type Status = "empty" | "short" | "good" | "over";
  const status: Status =
    wordCount === 0
      ? "empty"
      : wordCount < target.min
      ? "short"
      : wordCount <= target.max
      ? "good"
      : "over";

  const statusMap: Record<Status, { label: string; color: string; bar: string }> = {
    empty: { label: "Start writing", color: "text-pencil", bar: "bg-slate-200" },
    short: { label: "Too short", color: "text-[#F59E0B]", bar: "bg-[#F59E0B]" },
    good: { label: "Good length", color: "text-[#10B981]", bar: "bg-[#10B981]" },
    over: { label: "Over limit", color: "text-[#EF4444]", bar: "bg-[#EF4444]" },
  };

  const { label: statusLabel, color: statusColor, bar: barColor } = statusMap[status];

  return (
    <div className="h-full overflow-y-auto bg-paper-2">
      <div className="p-4 space-y-3">

        {/* ── Word Count ── */}
        <div className="bg-white rounded-xl border border-hair p-4">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-3.5 h-3.5 text-oxblood" />
            <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider">Word Count</span>
          </div>

          <div className="flex items-end justify-between mb-2">
            <div>
              <span
                className="text-4xl font-bold text-ink"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {wordCount}
              </span>
              <span className="text-sm text-pencil ml-1.5">/ {target.max}</span>
            </div>
            <span className={`text-sm font-semibold ${statusColor}`}>{statusLabel}</span>
          </div>

          {/* Bar with min-marker */}
          <div className="relative h-2 bg-paper-2 rounded-full overflow-hidden mb-1.5">
            <div
              className={`h-full rounded-full transition-all duration-300 ${barColor}`}
              style={{ width: `${pct}%` }}
            />
            {/* minimum marker */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-slate-400/60"
              style={{ left: `${minPct}%` }}
            />
          </div>

          <p className="text-xs text-pencil">
            Target: {target.label}
            <span className="mx-1.5">·</span>
            Minimum at {target.min} words
          </p>
        </div>

        {/* ── Context card ── */}
        <div className="bg-white rounded-xl border border-hair p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Settings2 className="w-3.5 h-3.5 text-oxblood" />
              <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider">Context</span>
            </div>
            <button
              onClick={onEditContext}
              className="text-xs text-oxblood hover:text-oxblood font-medium transition-colors"
            >
              Edit
            </button>
          </div>

          <div className="space-y-2">
            {/* Essay type */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-pencil w-16 flex-shrink-0">Type</span>
              {essayType ? (
                <span className="px-2 py-0.5 rounded-full bg-[#DBEAFE] text-[#1E40AF] text-xs font-medium">
                  {essayType}
                </span>
              ) : (
                <button onClick={onEditContext} className="text-xs text-pencil hover:text-oxblood italic transition-colors">
                  + Add type for targeted tips
                </button>
              )}
            </div>

            {/* Schools */}
            <div className="flex items-start gap-2">
              <span className="text-xs text-pencil w-16 flex-shrink-0 mt-0.5">Schools</span>
              {targetSchools.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {targetSchools.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-full bg-paper-2 text-ink-2 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              ) : (
                <button onClick={onEditContext} className="text-xs text-pencil hover:text-oxblood italic transition-colors mt-0.5">
                  + Add schools
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Prompt reference ── */}
        <div className="bg-white rounded-xl border border-hair p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-oxblood" />
              <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider">Essay Prompt</span>
            </div>
            <button
              onClick={onEditContext}
              className="text-xs text-oxblood hover:text-oxblood font-medium transition-colors"
            >
              {essayPrompt ? "Edit" : "Add"}
            </button>
          </div>

          {essayPrompt ? (
            <p className="text-sm text-ink-2 leading-relaxed">{essayPrompt}</p>
          ) : (
            <button
              onClick={onEditContext}
              className="w-full text-left text-xs text-pencil italic hover:text-pencil transition-colors"
            >
              Paste your prompt here:the AI uses it for more targeted feedback.
            </button>
          )}
        </div>

        {/* ── Essay type tips ── */}
        <div className="bg-white rounded-xl border border-hair p-4">
          <p className="text-xs font-semibold text-ink-2 uppercase tracking-wider mb-3">
            {tipData.heading}
          </p>
          <ul className="space-y-2.5">
            {tipData.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#EFF6FF] text-oxblood text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                  {i + 1}
                </span>
                <span className="text-sm text-ink-2 leading-snug">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Universal checklist ── */}
        <div className="bg-white rounded-xl border border-hair p-4">
          <p className="text-xs font-semibold text-ink-2 uppercase tracking-wider mb-3">
            Strong Essays Do This
          </p>
          <ul className="space-y-2">
            {CHECKLIST.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-ink-2 leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── What to avoid ── */}
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
          <p className="text-xs font-semibold text-[#92400E] uppercase tracking-wider mb-3">
            Common Mistakes
          </p>
          <ul className="space-y-1.5">
            {[
              "Starting with a dictionary definition",
              "Listing activities instead of telling a story",
              "Ending with 'In conclusion...'",
              "Writing what you think they want to hear",
              "Using the same essay for every school",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#92400E]">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#F59E0B] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
