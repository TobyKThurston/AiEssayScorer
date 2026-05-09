"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/design/Container";
import { PaperCard } from "@/design/PaperCard";
import { allSelectableSchools as ALL_SCHOOLS } from "./allSchools";
import {
  ACTIVITY_TIER_HINTS,
  STATE_NAMES,
  US_STATES,
  resolveStateInput,
  type Activity,
  type Profile,
  type OddsResult,
  type SchoolOdds,
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

const WIZARD_CARD_CLASS = "md:min-h-[480px] flex flex-col";
const WIZARD_CARD_PADDING = "p-5 sm:p-7";

const TIER_BADGE_STYLES: Record<SchoolOdds["tier"], string> = {
  Reach: "border-oxblood text-oxblood bg-[#FAEEEA]",
  Match: "border-gold text-gold bg-[#F8EFD9]",
  Safety: "border-forest text-forest bg-[#E5EEE7]",
};

function TierBadge({ tier }: { tier: SchoolOdds["tier"] }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 border text-[10px] font-mono uppercase tracking-wider ${TIER_BADGE_STYLES[tier]}`}
    >
      {tier}
    </span>
  );
}

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
  gpa: undefined,
  gpaScale: "unweighted",
  state: "",
  international: false,
  schoolSlugs: [],
  activities: [blankActivity()],
  intendedMajor: "",
  demographics: "",
  hooks: "",
});

export function OddsFlow() {
  const [step, setStep] = useState<StepId>("test");
  const [profile, setProfile] = useState<Profile>(blankProfile());
  const [result, setResult] = useState<OddsResult | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);
  const wizardRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const node = wizardRef.current;
    if (!node) return;
    const top = node.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [step]);

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
    <section ref={wizardRef} className="pt-4 sm:pt-6 md:pt-14 pb-12 sm:pb-16 md:pb-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pb-3 sm:pb-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-pencil">
          <span>The Admit Forecast · Confidential Worksheet</span>
          {isWizard ? (
            <span className="tabular-nums whitespace-nowrap">
              Step {visibleStepIndex + 1} / {STEPS.length}
              <span className="hidden sm:inline"> · ~2 min</span>
            </span>
          ) : null}
        </div>
        <hr className="rule" />

        {step === "test" ? (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] text-pencil">
            <span>Free to start</span>
            <span className="text-hair">·</span>
            <span>No card to begin</span>
            <span className="hidden sm:inline text-hair">·</span>
            <span className="hidden sm:inline">See your tier first</span>
          </div>
        ) : null}

        {isWizard ? <Progress index={visibleStepIndex} total={STEPS.length} /> : null}

        <div className="mt-6 sm:mt-8 max-w-[640px] mx-auto">
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
    <div className="mb-5 sm:mb-7">
      <div className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-oxblood">
        {eyebrow}
      </div>
      <h2 className="mt-2 text-ink text-[22px] sm:text-[28px] md:text-[32px] leading-[1.15] font-serif">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 sm:mt-3 text-[14px] sm:text-[15px] text-ink-2 max-w-[52ch]">{subtitle}</p>
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
    <div className="mt-auto pt-6 sm:pt-8 flex items-center justify-between gap-3">
      {onBack ? (
        <button onClick={onBack} className="text-[14px] text-ink-2 hover:text-oxblood underline-offset-4 hover:underline px-2 py-2">
          ← Back
        </button>
      ) : (
        <span />
      )}
      <button
        onClick={onNext}
        disabled={disabled}
        className="btn btn-ink text-[14px] sm:text-[15px] font-semibold px-5 sm:px-7 py-3 sm:py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
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
    <PaperCard padding={WIZARD_CARD_PADDING} className={WIZARD_CARD_CLASS}>
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
            enterKeyHint="next"
            placeholder={t === "SAT" ? "e.g. 1480" : "e.g. 33"}
            min={t === "SAT" ? 400 : 1}
            max={t === "SAT" ? 1600 : 36}
            value={score ?? ""}
            onChange={(e) => {
              const n = e.target.value === "" ? undefined : Number(e.target.value);
              if (t === "SAT") update("satScore", n);
              else update("actScore", n);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && valid) onNext();
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
  const valid =
    profile.gpa !== undefined &&
    Number.isFinite(profile.gpa) &&
    profile.gpa > 0 &&
    profile.gpa <= 5;
  return (
    <PaperCard padding={WIZARD_CARD_PADDING} className={WIZARD_CARD_CLASS}>
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
        enterKeyHint="next"
        step="0.01"
        min={0}
        max={5}
        placeholder="e.g. 3.8"
        value={profile.gpa ?? ""}
        onChange={(e) => {
          const raw = e.target.value;
          update("gpa", raw === "" ? undefined : Number(raw));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && valid) onNext();
        }}
        className="w-full border border-hair bg-paper px-4 py-3 text-[16px] focus:outline-none focus:border-oxblood"
      />
      <p className="mt-2 text-[12px] text-pencil">
        Enter a value between 0 and 5.
      </p>

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
  const [stateInput, setStateInput] = useState(
    profile.state ? STATE_NAMES[profile.state as (typeof US_STATES)[number]] ?? profile.state : "",
  );
  const resolvedCode = resolveStateInput(stateInput);
  const valid = profile.international || resolvedCode.length === 2;

  const onStateChange = (raw: string) => {
    setStateInput(raw);
    const code = resolveStateInput(raw);
    update("state", code);
  };

  return (
    <PaperCard padding={WIZARD_CARD_PADDING} className={WIZARD_CARD_CLASS}>
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
          <input
            type="text"
            list="us-states-list"
            enterKeyHint="next"
            placeholder="Type or pick a state (e.g., California or CA)"
            value={stateInput}
            onChange={(e) => onStateChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && valid) onNext();
            }}
            autoComplete="off"
            className="w-full border border-hair bg-paper px-4 py-3 text-[16px] focus:outline-none focus:border-oxblood"
          />
          <datalist id="us-states-list">
            {US_STATES.map((code) => (
              <option key={code} value={STATE_NAMES[code]} />
            ))}
          </datalist>
          {stateInput && !resolvedCode ? (
            <p className="mt-2 text-[12px] text-pencil">
              Keep typing or pick from the list.
            </p>
          ) : null}
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
    if (!query) return ALL_SCHOOLS;
    return ALL_SCHOOLS.filter((s) =>
      `${s.name} ${s.shortName} ${s.location}`.toLowerCase().includes(query),
    );
  }, [q]);

  const toggle = (slug: string) => {
    const next = profile.schoolSlugs.includes(slug)
      ? profile.schoolSlugs.filter((x) => x !== slug)
      : [...profile.schoolSlugs, slug];
    update("schoolSlugs", next);
  };

  const valid = profile.schoolSlugs.length > 0 && profile.schoolSlugs.length <= 10;

  return (
    <PaperCard padding={WIZARD_CARD_PADDING} className={WIZARD_CARD_CLASS}>
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
                  className="relative text-oxblood hover:text-oxblood-2 after:absolute after:-inset-3 after:content-['']"
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

      <p className="mt-3 text-[12px] text-pencil tabular-nums">
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
  const MAX_ACTIVITIES = 5;
  const updateActivity = (i: number, patch: Partial<Activity>) => {
    setProfile((p) => {
      const next = [...p.activities];
      next[i] = { ...next[i], ...patch };
      return { ...p, activities: next };
    });
  };
  const add = () =>
    setProfile((p) =>
      p.activities.length >= MAX_ACTIVITIES
        ? p
        : { ...p, activities: [...p.activities, blankActivity()] },
    );
  const remove = (i: number) =>
    setProfile((p) => ({
      ...p,
      activities: p.activities.filter((_, idx) => idx !== i),
    }));

  const filled = profile.activities.filter((a) => a.title.trim().length >= 2);
  const valid = filled.length >= 1;
  const canAddMore = profile.activities.length < MAX_ACTIVITIES;

  return (
    <PaperCard padding={WIZARD_CARD_PADDING}>
      <StepHeader
        eyebrow="Step 5 · Activities"
        title="Add up to 5 activities"
        subtitle="Start with what you spend the most time on — clubs, sports, jobs, research, volunteering. The more you tell us, the more personal your forecast."
      />

      <div className="space-y-5">
        {profile.activities.map((a, i) => (
          <div key={i} className="border border-hair bg-paper">
            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-hair bg-[#FBF7EE]">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-oxblood text-paper text-[11px] font-mono font-semibold tabular-nums">
                  {i + 1}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
                  Activity
                </span>
              </div>
              {profile.activities.length > 1 ? (
                <button
                  onClick={() => remove(i)}
                  className="relative text-[12px] text-pencil hover:text-oxblood after:absolute after:-inset-3 after:content-['']"
                  aria-label={`Remove activity ${i + 1}`}
                >
                  Remove
                </button>
              ) : null}
            </div>

            <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1.5">
                  Activity name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Coding Club, Varsity Soccer, Local Food Bank"
                  value={a.title}
                  onChange={(e) => updateActivity(i, { title: e.target.value })}
                  className="w-full border border-hair bg-paper px-3 py-2.5 text-[15px] focus:outline-none focus:border-oxblood"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1.5">
                    Your role
                  </label>
                  <input
                    type="text"
                    placeholder="Founder, Captain…"
                    value={a.role ?? ""}
                    onChange={(e) => updateActivity(i, { role: e.target.value })}
                    className="w-full border border-hair bg-paper px-3 py-2.5 text-[14px] focus:outline-none focus:border-oxblood"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1.5">
                    Hours / week
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={60}
                    placeholder="6"
                    value={a.hoursPerWeek ?? ""}
                    onChange={(e) =>
                      updateActivity(i, {
                        hoursPerWeek:
                          e.target.value === "" ? undefined : Number(e.target.value),
                      })
                    }
                    className="w-full border border-hair bg-paper px-3 py-2.5 text-[14px] tabular-nums focus:outline-none focus:border-oxblood"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1.5">
                    Years involved
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={6}
                    step="0.5"
                    placeholder="3"
                    value={a.years ?? ""}
                    onChange={(e) =>
                      updateActivity(i, {
                        years:
                          e.target.value === "" ? undefined : Number(e.target.value),
                      })
                    }
                    className="w-full border border-hair bg-paper px-3 py-2.5 text-[14px] tabular-nums focus:outline-none focus:border-oxblood"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1.5">
                  What you actually did{" "}
                  <span className="text-pencil/70 normal-case tracking-normal">(1–2 sentences)</span>
                </label>
                <textarea
                  placeholder="Grew membership from 8 to 60. Ran a hackathon that raised $2k for the local library. Mentored two underclassmen who placed in state."
                  value={a.description ?? ""}
                  onChange={(e) => updateActivity(i, { description: e.target.value })}
                  rows={3}
                  className="w-full border border-hair bg-paper px-3 py-2.5 text-[14px] leading-snug focus:outline-none focus:border-oxblood resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1.5">
                  Recognition tier
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {([1, 2, 3, 4] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => updateActivity(i, { tier })}
                      className={`min-h-[42px] px-2 text-[12.5px] font-medium border transition-[background-color,color,border-color] duration-150 active:scale-[0.96] ${
                        a.tier === tier
                          ? "border-oxblood bg-[#FAEEEA] text-oxblood"
                          : "border-hair text-ink-2 hover:border-ink-2"
                      }`}
                    >
                      Tier {tier}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[12px] text-pencil leading-snug">
                  {ACTIVITY_TIER_HINTS[a.tier]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {canAddMore ? (
        <button
          type="button"
          onClick={add}
          className="mt-4 w-full border border-dashed border-hair hover:border-oxblood hover:bg-[#FAEEEA] transition-colors py-3 text-[14px] font-medium text-oxblood"
        >
          + Add another activity
        </button>
      ) : null}

      <p className="mt-3 text-[12px] text-pencil tabular-nums text-center">
        {profile.activities.length} / {MAX_ACTIVITIES} added
      </p>

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
    <PaperCard padding={WIZARD_CARD_PADDING} className={WIZARD_CARD_CLASS}>
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
    <PaperCard padding={WIZARD_CARD_PADDING}>
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

  const trimmedEmail = email.trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

  const startCheckout = async () => {
    if (!result) return;
    if (!emailValid) {
      setErr("Enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch("/api/create-checkout-guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
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

  const tierMix = useMemo(() => {
    const mix: Record<SchoolOdds["tier"], number> = { Reach: 0, Match: 0, Safety: 0 };
    result?.schools.forEach((s) => {
      mix[s.tier] = (mix[s.tier] ?? 0) + 1;
    });
    return mix;
  }, [result]);

  return (
    <PaperCard padding={WIZARD_CARD_PADDING}>
      <div className="text-center mb-5 sm:mb-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxblood mb-2">
          Your forecast is ready
        </div>
        <h2 className="text-ink text-[26px] sm:text-[28px] md:text-[32px] leading-[1.15] font-serif">
          Unlock your <em className="italic text-oxblood">admit chance</em>
        </h2>
        <p className="mt-3 text-[14px] sm:text-[14.5px] text-ink-2 max-w-[44ch] mx-auto">
          We modeled your profile against {profile.schoolSlugs.length}{" "}
          {profile.schoolSlugs.length === 1 ? "school" : "schools"}. Tiers below — unlock to see the percentages.
        </p>
      </div>

      {result && result.schools.length > 0 ? (
        <div className="mb-5 sm:mb-6">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-pencil">
            {tierMix.Reach > 0 ? <span>{tierMix.Reach} Reach</span> : null}
            {tierMix.Match > 0 ? <span>{tierMix.Match} Match</span> : null}
            {tierMix.Safety > 0 ? <span>{tierMix.Safety} Safety</span> : null}
          </div>
          <ul className="space-y-1.5">
            {result.schools.map((s) => (
              <li
                key={s.slug}
                className="flex items-center justify-between gap-3 px-3 py-2.5 border border-hair bg-paper"
              >
                <span className="text-ink text-[13.5px] sm:text-[14px] truncate">{s.name}</span>
                <span className="flex items-center gap-2 shrink-0">
                  <TierBadge tier={s.tier} />
                  <span
                    aria-hidden
                    className="font-serif text-[16px] sm:text-[18px] tabular-nums leading-none text-pencil select-none"
                    style={{ filter: "blur(7px)" }}
                  >
                    ··%
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="border border-oxblood bg-[#FAEEEA] p-5 sm:p-6 mb-5 sm:mb-6">
        <div className="flex items-baseline gap-1.5 mb-3">
          <span className="text-[36px] sm:text-[40px] font-serif text-oxblood leading-none tabular-nums">$7</span>
          <span className="text-[14px] text-ink-2">/ month</span>
          <span className="ml-auto text-[11px] font-mono uppercase tracking-wider text-oxblood">Cancel anytime</span>
        </div>
        <ul className="space-y-2 text-[13.5px] sm:text-[14px] text-ink-2">
          <li>✓ Full % odds + tier for every school you picked</li>
          <li>✓ Per-factor breakdown (academics, activities, fit)</li>
          <li>✓ Essay reviewer tuned to each school (Why-X, supplements, prompt fit)</li>
          <li>✓ Unlimited essay grading + line-by-line edits</li>
          <li>✓ Access to all admissions tools</li>
        </ul>
      </div>

      <label htmlFor="paywall-email" className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
        Your email
      </label>
      <input
        id="paywall-email"
        type="email"
        autoComplete="email"
        inputMode="email"
        enterKeyHint="go"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && emailValid && !submitting) startCheckout();
        }}
        className="w-full border border-hair bg-paper px-4 py-3 text-[16px] focus:outline-none focus:border-oxblood mb-4"
      />

      {err ? (
        <p className="mb-4 text-[13px] text-oxblood bg-[#FAEEEA] border border-[#E8C9C2] px-3 py-2">
          {err}
        </p>
      ) : null}

      <button
        onClick={startCheckout}
        disabled={submitting || !emailValid}
        className="w-full btn btn-brand text-[16px] sm:text-[17px] font-semibold py-4 disabled:opacity-50 disabled:cursor-not-allowed justify-center"
      >
        {submitting ? "Redirecting…" : `Reveal my odds — $7/mo`}
      </button>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[11.5px] text-pencil">
        <span>Stripe secure checkout</span>
        <span className="text-hair">·</span>
        <span>Cancel anytime</span>
        <span className="text-hair">·</span>
        <span>No surprise charges</span>
      </div>
      <p className="mt-2 text-center text-[11.5px] text-pencil">
        You&rsquo;ll set a password after payment to access your forecast anytime.
      </p>
    </PaperCard>
  );
}

function StepReveal({ result }: { result: OddsResult | null }) {
  if (!result) return null;
  return (
    <div className="space-y-4">
      {result.schools.map((s, i) => (
        <div
          key={s.slug}
          className="reveal-card"
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <PaperCard>
            <div className="flex items-baseline justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <div className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-pencil">
                  {s.tier}
                </div>
                <h3 className="text-ink text-[18px] sm:text-[22px] font-serif mt-1 break-words">{s.name}</h3>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[34px] sm:text-[44px] font-serif text-oxblood leading-none tabular-nums">
                  {s.percent}%
                </div>
                <div className="text-[10.5px] sm:text-[11px] text-pencil mt-1">admit chance</div>
              </div>
            </div>
            <ul className="mt-4 pt-4 border-t border-hair space-y-1.5 text-[13px] sm:text-[14px] text-ink-2">
              {s.factors.map((f, idx) => (
                <li key={idx}>· {f}</li>
              ))}
            </ul>
          </PaperCard>
        </div>
      ))}

      <div className="text-center pt-6">
        <Link href="/essay-grader" className="btn btn-ink text-[14px] sm:text-[15px] font-semibold px-5 sm:px-7 py-3 sm:py-3.5">
          Grade my essay next →
        </Link>
      </div>

      <style jsx>{`
        .reveal-card {
          opacity: 0;
          transform: translateY(8px);
          animation: reveal-in 0.5s cubic-bezier(0.2, 0, 0, 1) forwards;
          will-change: transform, opacity;
        }
        @keyframes reveal-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
