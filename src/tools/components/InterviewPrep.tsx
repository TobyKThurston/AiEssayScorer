"use client";

import { useState } from "react";
import { Sparkles, Loader2, MessageSquare } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

interface Q {
  question: string;
  whyTheyAsk: string;
  strongAnswerApproach?: string;
}

interface Result {
  warmups: Q[];
  essayDeepDives: Q[];
  activityProbes: Q[];
  intellectualQuestions: Q[];
  traps: string[];
  schoolSpecificAsk: string;
}

export default function InterviewPrep() {
  const [materials, setMaterials] = useState("");
  const [school, setSchool] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!materials.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setPaywall(false);
    try {
      const res = await fetch("/api/tools/college-interview-prep-questions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ materials, school }),
      });
      if (res.status === 402) {
        setPaywall(true);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {paywall && <PaywallBanner />}
      <form onSubmit={handleSubmit} className="rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">School <span className="font-normal text-pencil">(optional)</span></label>
          <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="e.g., Yale, Harvard, Brown" className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition" maxLength={100} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Paste your application materials</label>
          <p className="text-xs text-pencil mb-2">Include your Common App personal statement, key supplementals, and activity descriptions. The more the AI sees, the more specific your questions will be.</p>
          <textarea value={materials} onChange={(e) => setMaterials(e.target.value)} placeholder="Paste essays, supplementals, and activity descriptions here..." rows={14} className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none font-mono" maxLength={6000} required />
          <div className="text-xs text-pencil mt-2">{materials.length}/6000 chars</div>
        </div>
        <button type="submit" disabled={loading || !materials.trim()} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn btn-sm btn-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Prepping...</> : <><Sparkles className="w-4 h-4" /> Generate interview questions</>}
        </button>
      </form>

      {error && <div className="rounded-xl bg-[#FAEEEA] border border-[#E8C9C2] p-4 text-sm text-[#B91C1C]">{error}</div>}

      {result && (
        <div className="space-y-4">
          <Section title="Warmups" questions={result.warmups} />
          <Section title="Essay deep dives" questions={result.essayDeepDives} />
          <Section title="Activity probes" questions={result.activityProbes} />
          <Section title="Intellectual curiosity" questions={result.intellectualQuestions} />
          <div className="rounded-2xl bg-[#FAEEEA] border border-[#E8C9C2] p-6">
            <h3 className="text-sm font-extrabold text-[#B91C1C] uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-heading)" }}>Traps to watch for</h3>
            <ul className="space-y-2">
              {result.traps.map((t, i) => <li key={i} className="text-[14.5px] text-ink leading-relaxed">• {t}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-oxblood to-oxblood-2 p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-80">The one answer to prepare cold</p>
            <p className="text-[15px] leading-relaxed">{result.schoolSpecificAsk}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, questions }: { title: string; questions: Q[] }) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-paper-2 text-oxblood"><MessageSquare className="w-4 h-4" /></span>
        <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
      </div>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="border-l-2 border-hair pl-4">
            <p className="font-semibold text-ink text-[14.5px] leading-relaxed">Q: {q.question}</p>
            <p className="text-xs text-pencil mt-1.5 leading-relaxed">Why they ask: {q.whyTheyAsk}</p>
            {q.strongAnswerApproach && <p className="text-xs text-oxblood mt-1.5 leading-relaxed font-medium">Approach: {q.strongAnswerApproach}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
