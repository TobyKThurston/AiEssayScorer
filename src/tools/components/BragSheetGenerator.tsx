"use client";

import { useState } from "react";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

interface BragSheet {
  greeting: string;
  intellectualStrengths: { label: string; storyOrDetail: string }[];
  characterStrengths: { label: string; storyOrDetail: string }[];
  classroomMoments: string[];
  beyondClass: string[];
  whatColleges: string[];
  anglesToEmphasize: string[];
  closing: string;
}

export default function BragSheetGenerator() {
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [stories, setStories] = useState("");
  const [result, setResult] = useState<BragSheet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stories.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setPaywall(false);
    try {
      const res = await fetch("/api/tools/recommendation-brag-sheet", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ subject, teacher, stories }),
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

  async function copyAll() {
    if (!result) return;
    const text = [
      result.greeting,
      "",
      "Intellectual strengths:",
      ...result.intellectualStrengths.map((s) => `- ${s.label}: ${s.storyOrDetail}`),
      "",
      "Character strengths:",
      ...result.characterStrengths.map((s) => `- ${s.label}: ${s.storyOrDetail}`),
      "",
      "Classroom moments you might reference:",
      ...result.classroomMoments.map((m) => `- ${m}`),
      "",
      "Beyond your classroom:",
      ...result.beyondClass.map((m) => `- ${m}`),
      "",
      "Colleges I'm applying to:",
      ...result.whatColleges.map((c) => `- ${c}`),
      "",
      "Angles I'd love for you to emphasize:",
      ...result.anglesToEmphasize.map((a) => `- ${a}`),
      "",
      result.closing,
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      {paywall && <PaywallBanner />}
      <form onSubmit={handleSubmit} className="rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Teacher's subject <span className="font-normal text-[#94A3B8]">(optional)</span>
            </label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., AP US History" className="w-full rounded-xl border border-[#E2E8F0] bg-white/80 px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition" maxLength={300} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Context about this teacher <span className="font-normal text-[#94A3B8]">(optional)</span>
            </label>
            <input type="text" value={teacher} onChange={(e) => setTeacher(e.target.value)} placeholder="e.g., Ms. Diaz, 11th grade, we bonded over Reconstruction" className="w-full rounded-xl border border-[#E2E8F0] bg-white/80 px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition" maxLength={300} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Stories, experiences, and things you want your teacher to know
          </label>
          <textarea value={stories} onChange={(e) => setStories(e.target.value)} placeholder="Example: I wrote my junior paper on the 1619 Project. I asked about primary sources after every unit. I started a Black history book club that grew to 15 people. Outside class, I work at my family's bakery and volunteer at a legal aid clinic translating Spanish..." rows={10} className="w-full rounded-xl border border-[#E2E8F0] bg-white/80 px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition resize-none" maxLength={3000} required />
        </div>
        <button type="submit" disabled={loading || !stories.trim()} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6366F1] text-white font-medium text-sm hover:bg-[#4F46E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Building...</> : <><Sparkles className="w-4 h-4" /> Generate my brag sheet</>}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-4 text-sm text-[#B91C1C]">{error}</div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-end">
            <button onClick={copyAll} className="inline-flex items-center gap-2 text-sm text-[#6366F1] hover:text-[#4F46E5] transition-colors">
              {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy full brag sheet</>}
            </button>
          </div>
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/70 p-6">
            <p className="text-[#0F172A] text-[15px] leading-relaxed">{result.greeting}</p>
          </div>
          <Panel title="Intellectual strengths">
            {result.intellectualStrengths.map((s, i) => (
              <div key={i} className="mb-3 last:mb-0">
                <p className="font-semibold text-[#0F172A] text-[14.5px]">{s.label}</p>
                <p className="text-sm text-[#475569] leading-relaxed mt-1">{s.storyOrDetail}</p>
              </div>
            ))}
          </Panel>
          <Panel title="Character strengths">
            {result.characterStrengths.map((s, i) => (
              <div key={i} className="mb-3 last:mb-0">
                <p className="font-semibold text-[#0F172A] text-[14.5px]">{s.label}</p>
                <p className="text-sm text-[#475569] leading-relaxed mt-1">{s.storyOrDetail}</p>
              </div>
            ))}
          </Panel>
          <Panel title="Classroom moments to reference">
            <ul className="space-y-2">
              {result.classroomMoments.map((m, i) => <li key={i} className="text-[14.5px] text-[#0F172A] leading-relaxed">• {m}</li>)}
            </ul>
          </Panel>
          <Panel title="Beyond the classroom">
            <ul className="space-y-2">
              {result.beyondClass.map((m, i) => <li key={i} className="text-[14.5px] text-[#0F172A] leading-relaxed">• {m}</li>)}
            </ul>
          </Panel>
          <Panel title="Colleges I'm applying to">
            <ul className="space-y-1">
              {result.whatColleges.map((c, i) => <li key={i} className="text-[14.5px] text-[#0F172A] leading-relaxed">• {c}</li>)}
            </ul>
          </Panel>
          <Panel title="Angles I'd love you to emphasize">
            <ul className="space-y-2">
              {result.anglesToEmphasize.map((a, i) => <li key={i} className="text-[14.5px] text-[#0F172A] leading-relaxed">• {a}</li>)}
            </ul>
          </Panel>
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/70 p-6">
            <p className="text-[#0F172A] text-[15px] leading-relaxed italic">{result.closing}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
      <h3 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
      {children}
    </div>
  );
}
