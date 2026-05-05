"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Container } from "@/design/Container";
import { PaperCard } from "@/design/PaperCard";
import { schools as ALL_SCHOOLS } from "@/tools/schools";
import {
  ACTIVITY_TIER_HINTS,
  US_STATES,
  type Activity,
  type Profile,
  type OddsResult,
} from "./types";

type StepId =
  | "test"
  | "gpa"
  | "location"
  | "schools"
  | "activities"
  | "optional"
  | "loading"
  | "paywall"
  | "reveal";

const STEPS: StepId[] = [
  "test",
  "gpa",
  "location",
  "schools",
  "activities",
  "optional",
];

const blankActivity = (): Activity => ({
  title: "",
  tier: 3,
  role: "",
  hoursPerWeek: undefined,
  years: undefined,
  description: "",
});

const blankProfile = (): Profile => ({
  test: "SAT",
  satScore: undefined,
  actScore: undefined,
  gpa: 3.8,
  gpaScale: "unweighted",
  state: "",
  international: false,
  schoolSlugs: [],
  activities: [blankActivity(), blankActivity(), blankActivity()],
  intendedMajor: "",
  demographics: "",
  hooks: "",
  essayStrength: "average",
});

export function OddsFlow() {
  const [step, setStep] = useState<StepId>("test");
  const [profile, setProfile] = useState<Profile>(blankProfile());
  const [result, setResult] = useState<OddsResult | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);

  const visibleStepIndex = STEPS.indexOf(step);
  const isWizard = visibleStepIndex >= 0;

  const update = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const nextFrom = (s: StepId): StepId => {
    const order: StepId[] = [
      "test",
      "gpa",
      "location",
      "schools",
      "activities",
      "optional",
      "loading",
      "paywall",
      "reveal",
    ];
    const i = order.indexOf(s);
    return order[Math.min(i + 1, order.length - 1)];
  };
  const prevFrom = (s: StepId): StepId => {
    const i = STEPS.indexOf(s);
    return i > 0 ? STEPS[i - 1] : s;
  };

  const goNext = () => setStep((s) => nextFrom(s));
  const goBack = () => setStep((s) => prevFrom(s));

  const startCalc = async () => {
    setStep("loading");
    setCalcError(null);
    try {
      const res = await fetch("/api/calculate-odds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Calculation failed");
      setResult(data.result as OddsResult);
      setStep("paywall");
    } catch (err) {
      setCalcError(err instanceof Error ? err.message : "Calculation failed");
      setStep("optional");
    }
  };

  return (
    <section className="pt-10 md:pt-14 pb-20">
      <Container>
        <div className="flex items-center justify-between gap-4 pb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
          <span>The Admit Forecast · Confidential Worksheet</span>
          {isWizard ? (
            <span>
              Step {visibleStepIndex + 1} / {STEPS.length}
            </span>
          ) : null}
        </div>
        <hr className="rule" />

        {isWizard ? <Progress index={visibleStepIndex} total={STEPS.length} /> : null}

        <div className="mt-8 max-w-[640px] mx-auto">
          {step === "test" ? (
            <StepTest profile={profile} update={update} onNext={goNext} />
          ) : null}
          {step === "gpa" ? (
            <StepGpa
              profile={profile}
              update={update}
              onNext={goNext}
              onBack={goBack}
            />
          ) : null}
          {step === "location" ? (
            <StepLocation
              profile={profile}
              update={update}
              onNext={goNext}
              onBack={goBack}
            />
          ) : null}
          {step === "schools" ? (
            <StepSchools
              profile={profile}
              update={update}
              onNext={goNext}
              onBack={goBack}
            />
          ) : null}
          {step === "activities" ? (
            <StepActivities
              profile={profile}
              setProfile={setProfile}
              onNext={goNext}
              onBack={goBack}
            />
          ) : null}
          {step === "optional" ? (
            <StepOptional
              profile={profile}
              update={update}
              onSubmit={startCalc}
              onBack={goBack}
              error={calcError}
            />
          ) : null}
          {step === "loading" ? <StepLoading /> : null}
          {step === "paywall" ? (
            <StepPaywall result={result} profile={profile} />
          ) : null}
          {step === "reveal" ? <StepReveal result={result} /> : null}
        </div>
      </Container>
    </section>
  );
}

function Progress({ index, total }: { index: number; total: number }) {
  const pct = Math.round(((index + 1) / total) * 100);
  return (
    <div className="mt-6 h-[3px] w-full bg-hair rounded-full overflow-hidden">
      <div
        className="h-full bg-oxblood transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function StepHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-7">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxblood">
        {eyebrow}
      </div>
      <h2 className="mt-2 text-ink text-[28px] md:text-[32px] leading-[1.15] font-serif">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-[15px] text-ink-2 max-w-[52ch]">{subtitle}</p>
      ) : null}
    </div>
  );
}

function NavButtons({
  onBack,
  nextLabel = "Continue",
  onNext,
  disabled,
}: {
  onBack?: () => void;
  nextLabel?: string;
  onNext: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between">
      {onBack ? (
        <button onClick={onBack} className="text-[14px] text-ink-2 hover:text-oxblood underline-offset-4 hover:underline">
          ← Back
        </button>
      ) : (
        <span />
      )}
      <button
        onClick={onNext}
        disabled={disabled}
        className="btn btn-ink text-[15px] font-semibold px-7 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {nextLabel} →
      </button>
    </div>
  );
}

/* ----------------------------- Steps ----------------------------- */

function StepTest({
  profile,
  update,
  onNext,
}: {
  profile: Profile;
  update: <K extends keyof Profile>(k: K, v: Profile[K]) => void;
  onNext: () => void;
}) {
  const t = profile.test;
  const score =
    t === "SAT" ? profile.satScore : t === "ACT" ? profile.actScore : undefined;
  const valid =
    t === "None" ||
    (t === "SAT" && profile.satScore !== undefined && profile.satScore >= 400 && profile.satScore <= 1600) ||
    (t === "ACT" && profile.actScore !== undefined && profile.actScore >= 1 && profile.actScore <= 36);

  return (
    <PaperCard>
      <StepHeader
        eyebrow="Step 1 · Standardized Tests"
        title="What's your best test score?"
        subtitle="If you're test-optional, that's fine - pick None and we'll weight other factors more heavily."
      />

      <div className="grid grid-cols-3 gap-2">
        {(["SAT", "ACT", "None"] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => update("test", opt)}
            className={`px-4 py-3 text-[14px] font-medium border transition-colors ${
              t === opt
                ? "border-oxblood bg-[#FAEEEA] text-oxblood"
                : "border-hair text-ink-2 hover:border-ink-2"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {t !== "None" ? (
        <div className="mt-6">
          <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
            {t} Score
          </label>
          <input
            type="number"
            inputMode="numeric"
            placeholder={t === "SAT" ? "e.g. 1480" : "e.g. 33"}
            min={t === "SAT" ? 400 : 1}
            max={t === "SAT" ? 1600 : 36}
            value={score ?? ""}
            onChange={(e) => {
              const n = e.target.value === "" ? undefined : Number(e.target.value);
              if (t === "SAT") update("satScore", n);
              else update("actScore", n);
            }}
            className="w-full border border-hair bg-paper px-4 py-3 text-[16px] focus:outline-none focus:border-oxblood"
          />
          <p className="mt-2 text-[12px] text-pencil">
            {t === "SAT" ? "400–1600" : "1–36"}
          </p>
        </div>
      ) : null}

      <NavButtons onNext={onNext} disabled={!valid} />
    </PaperCard>
  );
}

function StepGpa({
  profile,
  update,
  onNext,
  onBack,
}: {
  profile: Profile;
  update: <K extends keyof Profile>(k: K, v: Profile[K]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const valid = profile.gpa >= 0 && profile.gpa <= 5;
  return (
    <PaperCard>
      <StepHeader
        eyebrow="Step 2 · Academics"
        title="What's your GPA?"
        subtitle="Use whatever scale your school reports on. Most US schools use a 4.0 unweighted or up to 5.0 weighted."
      />

      <div className="grid grid-cols-2 gap-2 mb-5">
        {(["unweighted", "weighted"] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => update("gpaScale", opt)}
            className={`px-4 py-3 text-[14px] font-medium border transition-colors capitalize ${
              profile.gpaScale === opt
                ? "border-oxblood bg-[#FAEEEA] text-oxblood"
                : "border-hair text-ink-2 hover:border-ink-2"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
        GPA
      </label>
      <input
        type="number"
        inputMode="decimal"
        step="0.01"
        min={0}
        max={5}
        value={profile.gpa}
        onChange={(e) => update("gpa", Number(e.target.value))}
        className="w-full border border-hair bg-paper px-4 py-3 text-[16px] focus:outline-none focus:border-oxblood"
      />

      <NavButtons onBack={onBack} onNext={onNext} disabled={!valid} />
    </PaperCard>
  );
}

function StepLocation({
  profile,
  update,
  onNext,
  onBack,
}: {
  profile: Profile;
  update: <K extends keyof Profile>(k: K, v: Profile[K]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const valid = profile.international || profile.state.length === 2;
  return (
    <PaperCard>
      <StepHeader
        eyebrow="Step 3 · Where you're from"
        title="Where do you apply from?"
        subtitle="Geography matters - top schools weigh applicants from underrepresented states differently."
      />

      <label className="flex items-center gap-3 mb-5 text-[14px] text-ink-2 cursor-pointer">
        <input
          type="checkbox"
          checked={profile.international}
          onChange={(e) => update("international", e.target.checked)}
          className="w-4 h-4 accent-oxblood"
        />
        I'm an international applicant
      </label>

      {!profile.international ? (
        <>
          <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
            State
          </label>
          <select
            value={profile.state}
            onChange={(e) => update("state", e.target.value)}
            className="w-full border border-hair bg-paper px-4 py-3 text-[16px] focus:outline-none focus:border-oxblood"
          >
            <option value="">Select a state…</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </>
      ) : null}

      <NavButtons onBack={onBack} onNext={onNext} disabled={!valid} />
    </PaperCard>
  );
}

function StepSchools({
  profile,
  update,
  onNext,
  onBack,
}: {
  profile: Profile;
  update: <K extends keyof Profile>(k: K, v: Profile[K]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return ALL_SCHOOLS.slice(0, 12);
    return ALL_SCHOOLS.filter((s) =>
      `${s.name} ${s.shortName} ${s.location}`.toLowerCase().includes(query),
    ).slice(0, 25);
  }, [q]);

  const toggle = (slug: string) => {
    const next = profile.schoolSlugs.includes(slug)
      ? profile.schoolSlugs.filter((x) => x !== slug)
      : [...profile.schoolSlugs, slug];
    update("schoolSlugs", next);
  };

  const valid = profile.schoolSlugs.length > 0 && profile.schoolSlugs.length <= 10;

  return (
    <PaperCard>
      <StepHeader
        eyebrow="Step 4 · Target Schools"
        title="Which schools do you want odds for?"
        subtitle="Pick up to 10. We'll calculate your admit chance for each."
      />

      <input
        type="text"
        placeholder="Search Harvard, MIT, NYU…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full border border-hair bg-paper px-4 py-3 text-[16px] focus:outline-none focus:border-oxblood mb-4"
      />

      {profile.schoolSlugs.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {profile.schoolSlugs.map((slug) => {
            const s = ALL_SCHOOLS.find((x) => x.slug === slug);
            if (!s) return null;
            return (
              <span
                key={slug}
                className="inline-flex items-center gap-2 bg-[#FAEEEA] text-oxblood text-[13px] px-3 py-1.5 border border-[#E8C9C2]"
              >
                {s.shortName}
                <button
                  onClick={() => toggle(slug)}
                  className="text-oxblood hover:text-oxblood-2"
                  aria-label={`Remove ${s.name}`}
                >
                  ✕
                </button>
              </span>
            );
          })}
        </div>
      ) : null}

      <div className="max-h-[260px] overflow-y-auto border border-hair">
        {filtered.length === 0 ? (
          <div className="p-4 text-[14px] text-pencil">No matches.</div>
        ) : (
          filtered.map((s) => {
            const selected = profile.schoolSlugs.includes(s.slug);
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => toggle(s.slug)}
                className={`w-full text-left px-4 py-3 border-b border-hair last:border-b-0 flex items-center justify-between gap-3 transition-colors ${
                  selected ? "bg-[#FAEEEA]" : "hover:bg-[#F5F0E6]"
                }`}
              >
                <div>
                  <div className="text-[15px] text-ink">{s.name}</div>
                  <div className="text-[12px] text-pencil">
                    {s.location} · {s.category}
                  </div>
                </div>
                <span
                  className={`text-[12px] font-mono uppercase tracking-wider ${
                    selected ? "text-oxblood" : "text-pencil"
                  }`}
                >
                  {selected ? "Selected" : "Add"}
                </span>
              </button>
            );
          })
        )}
      </div>

      <p className="mt-3 text-[12px] text-pencil">
        {profile.schoolSlugs.length} / 10 selected
      </p>

      <NavButtons onBack={onBack} onNext={onNext} disabled={!valid} />
    </PaperCard>
  );
}

function StepActivities({
  profile,
  setProfile,
  onNext,
  onBack,
}: {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  onNext: () => void;
  onBack: () => void;
}) {
  const updateActivity = (i: number, patch: Partial<Activity>) => {
    setProfile((p) => {
      const next = [...p.activities];
      next[i] = { ...next[i], ...patch };
      return { ...p, activities: next };
    });
  };
  const add = () =>
    setProfile((p) =>
      p.activities.length >= 5
        ? p
        : { ...p, activities: [...p.activities, blankActivity()] },
    );
  const remove = (i: number) =>
    setProfile((p) => ({
      ...p,
      activities: p.activities.filter((_, idx) => idx !== i),
    }));

  const filled = profile.activities.filter((a) => a.title.trim().length > 0);
  const valid = filled.length >= 1;

  return (
    <PaperCard>
      <StepHeader
        eyebrow="Step 5 · Activities"
        title="Top 3-5 activities"
        subtitle="The more context you give, the more accurate (and personal) your forecast. Add roles, hours, and a sentence about what you actually did."
      />

      <div className="space-y-4">
        {profile.activities.map((a, i) => (
          <div key={i} className="border border-hair p-4 bg-paper">
            <div className="flex items-start justify-between gap-3 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-pencil">
                Activity {i + 1}
              </span>
              {profile.activities.length > 1 ? (
                <button
                  onClick={() => remove(i)}
                  className="text-[12px] text-pencil hover:text-oxblood"
                >
                  Remove
                </button>
              ) : null}
            </div>

            <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1">
              Activity name
            </label>
            <input
              type="text"
              placeholder="e.g., Coding Club, Varsity Soccer, Local Food Bank"
              value={a.title}
              onChange={(e) => updateActivity(i, { title: e.target.value })}
              className="w-full border border-hair bg-paper px-3 py-2 text-[15px] mb-3 focus:outline-none focus:border-oxblood"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1">
                  Your role
                </label>
                <input
                  type="text"
                  placeholder="e.g., Founder, Captain"
                  value={a.role ?? ""}
                  onChange={(e) => updateActivity(i, { role: e.target.value })}
                  className="w-full border border-hair bg-paper px-3 py-2 text-[14px] focus:outline-none focus:border-oxblood"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1">
                  Hours / week
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={60}
                  placeholder="e.g., 6"
                  value={a.hoursPerWeek ?? ""}
                  onChange={(e) =>
                    updateActivity(i, {
                      hoursPerWeek:
                        e.target.value === "" ? undefined : Number(e.target.value),
                    })
                  }
                  className="w-full border border-hair bg-paper px-3 py-2 text-[14px] focus:outline-none focus:border-oxblood"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1">
                  Years involved
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={6}
                  step="0.5"
                  placeholder="e.g., 3"
                  value={a.years ?? ""}
                  onChange={(e) =>
                    updateActivity(i, {
                      years:
                        e.target.value === "" ? undefined : Number(e.target.value),
                    })
                  }
                  className="w-full border border-hair bg-paper px-3 py-2 text-[14px] focus:outline-none focus:border-oxblood"
                />
              </div>
            </div>

            <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1">
              What you actually did (1-2 sentences)
            </label>
            <textarea
              placeholder="e.g., Grew membership from 8 to 60. Ran a hackathon that raised $2k for the local library. Mentored two underclassmen who placed in state."
              value={a.description ?? ""}
              onChange={(e) => updateActivity(i, { description: e.target.value })}
              rows={3}
              className="w-full border border-hair bg-paper px-3 py-2 text-[14px] mb-3 focus:outline-none focus:border-oxblood resize-none"
            />

            <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1">
              Recognition tier
            </label>
            <div className="grid grid-cols-4 gap-1.5 mb-2">
              {([1, 2, 3, 4] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => updateActivity(i, { tier })}
                  className={`px-2 py-2 text-[12px] font-medium border transition-colors ${
                    a.tier === tier
                      ? "border-oxblood bg-[#FAEEEA] text-oxblood"
                      : "border-hair text-ink-2 hover:border-ink-2"
                  }`}
                >
                  Tier {tier}
                </button>
              ))}
            </div>
            <p className="text-[11.5px] text-pencil leading-snug">
              {ACTIVITY_TIER_HINTS[a.tier]}
            </p>
          </div>
        ))}
      </div>

      {profile.activities.length < 5 ? (
        <button
          onClick={add}
          className="mt-4 text-[13px] text-oxblood hover:text-oxblood-2 underline-offset-4 hover:underline"
        >
          + Add another activity
        </button>
      ) : null}

      <NavButtons onBack={onBack} onNext={onNext} disabled={!valid} />
    </PaperCard>
  );
}

function StepOptional({
  profile,
  update,
  onSubmit,
  onBack,
  error,
}: {
  profile: Profile;
  update: <K extends keyof Profile>(k: K, v: Profile[K]) => void;
  onSubmit: () => void;
  onBack: () => void;
  error: string | null;
}) {
  return (
    <PaperCard>
      <StepHeader
        eyebrow="Step 6 · Optional"
        title="Anything else?"
        subtitle="All fields below are optional but improve accuracy. Skip what you're not sure about."
      />

      <div className="space-y-5">
        <div>
          <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
            Intended major
          </label>
          <input
            type="text"
            placeholder="e.g., Computer Science"
            value={profile.intendedMajor ?? ""}
            onChange={(e) => update("intendedMajor", e.target.value)}
            className="w-full border border-hair bg-paper px-4 py-3 text-[15px] focus:outline-none focus:border-oxblood"
          />
        </div>

        <div>
          <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
            Demographics (optional)
          </label>
          <input
            type="text"
            placeholder="e.g., First-gen, low-income, Latina"
            value={profile.demographics ?? ""}
            onChange={(e) => update("demographics", e.target.value)}
            className="w-full border border-hair bg-paper px-4 py-3 text-[15px] focus:outline-none focus:border-oxblood"
          />
        </div>

        <div>
          <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
            Hooks (legacy, recruited athlete, etc.)
          </label>
          <input
            type="text"
            placeholder="e.g., Recruited soccer, legacy at Yale"
            value={profile.hooks ?? ""}
            onChange={(e) => update("hooks", e.target.value)}
            className="w-full border border-hair bg-paper px-4 py-3 text-[15px] focus:outline-none focus:border-oxblood"
          />
        </div>

        <div>
          <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
            Essay strength
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["weak", "average", "strong"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => update("essayStrength", opt)}
                className={`px-3 py-2.5 text-[13px] font-medium border transition-colors capitalize ${
                  profile.essayStrength === opt
                    ? "border-oxblood bg-[#FAEEEA] text-oxblood"
                    : "border-hair text-ink-2 hover:border-ink-2"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error ? (
        <p className="mt-5 text-[13px] text-oxblood bg-[#FAEEEA] border border-[#E8C9C2] px-3 py-2">
          {error}
        </p>
      ) : null}

      <NavButtons onBack={onBack} onNext={onSubmit} nextLabel="Calculate my odds" />
    </PaperCard>
  );
}

function StepLoading() {
  return (
    <PaperCard>
      <div className="text-center py-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxblood mb-3">
          Computing
        </div>
        <h2 className="text-ink text-[24px] md:text-[28px] font-serif">
          Analyzing your profile…
        </h2>
        <p className="mt-3 text-[14px] text-pencil">
          Cross-referencing recent admit data and your school list.
        </p>

        <div className="mt-8 mx-auto max-w-[320px]">
          <div className="h-[3px] w-full bg-hair rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-oxblood loading-bar" />
          </div>
        </div>

        <ul className="mt-8 text-[13px] text-ink-2 space-y-1.5">
          <li>· Weighing academics vs. testing</li>
          <li>· Modeling activity tiers</li>
          <li>· Applying geography &amp; demographic adjustments</li>
        </ul>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { width: 10%; }
          50% { width: 90%; }
          100% { width: 10%; }
        }
        .loading-bar {
          animation: loading-bar 1.6s ease-in-out infinite;
        }
      `}</style>
    </PaperCard>
  );
}

function StepPaywall({
  result,
  profile,
}: {
  result: OddsResult | null;
  profile: Profile;
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const startCheckout = async () => {
    if (!result) return;
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch("/api/create-checkout-guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          calculationId: result.calculationId,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Checkout failed");
      setSubmitting(false);
    }
  };

  return (
    <PaperCard>
      <div className="text-center mb-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxblood mb-2">
          Your forecast is ready
        </div>
        <h2 className="text-ink text-[28px] md:text-[32px] leading-[1.15] font-serif">
          Unlock your <em className="italic text-oxblood">admit chance</em>
        </h2>
        <p className="mt-3 text-[14.5px] text-ink-2 max-w-[44ch] mx-auto">
          We modeled your profile against {profile.schoolSlugs.length}{" "}
          {profile.schoolSlugs.length === 1 ? "school" : "schools"}. Subscribe to reveal your full forecast.
        </p>
      </div>

      <div className="border border-oxblood bg-[#FAEEEA] p-6 mb-6">
        <div className="flex items-baseline gap-1.5 mb-3">
          <span className="text-[40px] font-serif text-oxblood leading-none">$7</span>
          <span className="text-[14px] text-ink-2">/ month</span>
        </div>
        <ul className="space-y-2 text-[14px] text-ink-2">
          <li>✓ Full odds + tier for every school you picked</li>
          <li>✓ Per-factor breakdown (academics, activities, fit)</li>
          <li>✓ Essay reviewer tuned to each school you applied to (Why-X, supplements, prompt fit)</li>
          <li>✓ Unlimited essay grading + line-by-line edits</li>
          <li>✓ Access to all admissions tools</li>
          <li>✓ Cancel anytime</li>
        </ul>
      </div>

      <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
        Your email
      </label>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-hair bg-paper px-4 py-3 text-[16px] focus:outline-none focus:border-oxblood mb-4"
      />

      {err ? (
        <p className="mb-4 text-[13px] text-oxblood bg-[#FAEEEA] border border-[#E8C9C2] px-3 py-2">
          {err}
        </p>
      ) : null}

      <button
        onClick={startCheckout}
        disabled={submitting || !email.includes("@")}
        className="w-full btn btn-brand text-[17px] font-semibold py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Redirecting…" : "Reveal my odds - $7/mo"}
      </button>

      <p className="mt-4 text-center text-[12px] text-pencil">
        Secure checkout via Stripe. You'll set a password after payment to access your forecast anytime.
      </p>
    </PaperCard>
  );
}

function StepReveal({ result }: { result: OddsResult | null }) {
  if (!result) return null;
  return (
    <div className="space-y-4">
      {result.schools.map((s) => (
        <PaperCard key={s.slug}>
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
                {s.tier}
              </div>
              <h3 className="text-ink text-[22px] font-serif mt-1">{s.name}</h3>
            </div>
            <div className="text-right">
              <div className="text-[44px] font-serif text-oxblood leading-none">
                {s.percent}%
              </div>
              <div className="text-[11px] text-pencil mt-1">admit chance</div>
            </div>
          </div>
          <ul className="mt-4 pt-4 border-t border-hair space-y-1.5 text-[14px] text-ink-2">
            {s.factors.map((f, i) => (
              <li key={i}>· {f}</li>
            ))}
          </ul>
        </PaperCard>
      ))}

      <div className="text-center pt-6">
        <Link href="/essay-grader" className="btn btn-ink text-[15px] font-semibold px-7 py-3.5">
          Grade my essay next →
        </Link>
      </div>
    </div>
  );
}
