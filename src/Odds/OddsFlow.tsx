"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type StepId = "academics" | "schools" | "activities" | "optional" | "loading" | "paywall";

// 4 collected steps (Academics merges test + GPA; Schools folds in location),
// then the computed loading + paywall screens.
const STEPS: StepId[] = ["academics", "schools", "activities", "optional"];
const FLOW: StepId[] = ["academics", "schools", "activities", "optional", "loading", "paywall"];

// Most-searched schools surfaced as one-tap chips so the common case is zero typing.
const POPULAR_SLUGS = ["harvard", "mit", "stanford", "yale", "princeton"] as const;

const WIZARD_CARD_CLASS = "md:min-h-[480px] flex flex-col";
const WIZARD_CARD_PADDING = "p-5 sm:p-7";

// Minimum time the loading screen stays up even if the API returns instantly,
// so the labor-illusion checklist reads as real work (not "it didn't compute").
const MIN_LOADING_MS = 2650;

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

const SESSION_KEY = "ivyOddsProfile";

function isProfileShape(p: unknown): p is Profile {
  if (!p || typeof p !== "object") return false;
  const o = p as Record<string, unknown>;
  return Array.isArray(o.schoolSlugs) && Array.isArray(o.activities);
}

export function OddsFlow() {
  const [step, setStep] = useState<StepId>("academics");
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [profile, setProfile] = useState<Profile>(blankProfile());
  const [hydrated, setHydrated] = useState(false);
  const [result, setResult] = useState<OddsResult | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);
  const wizardRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  // Seed from a restored session (resilience against accidental refresh/back on
  // mobile) and from any homepage quick-start querystring (?school / ?sat / ?act).
  useEffect(() => {
    let initial = blankProfile();
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (isProfileShape(parsed)) initial = { ...blankProfile(), ...parsed };
      }
    } catch {
      /* ignore corrupt storage */
    }

    const params = new URLSearchParams(window.location.search);
    let seededFromUrl = false;
    const school = params.get("school");
    if (
      school &&
      ALL_SCHOOLS.some((s) => s.slug === school) &&
      !initial.schoolSlugs.includes(school)
    ) {
      initial = { ...initial, schoolSlugs: [...initial.schoolSlugs, school].slice(0, 10) };
      seededFromUrl = true;
    }
    const sat = params.get("sat");
    if (sat && /^\d+$/.test(sat)) {
      const n = Number(sat);
      if (n >= 400 && n <= 1600) {
        initial = { ...initial, test: "SAT", satScore: n };
        seededFromUrl = true;
      }
    }
    const act = params.get("act");
    if (act && /^\d+$/.test(act)) {
      const n = Number(act);
      if (n >= 1 && n <= 36) {
        initial = { ...initial, test: "ACT", actScore: n };
        seededFromUrl = true;
      }
    }
    if (seededFromUrl) {
      window.history.replaceState({}, "", "/odds");
    }

    // One-time hydration from browser-only sources (sessionStorage + URL),
    // which are unavailable during SSR — so a lazy useState initializer can't
    // be used here. This runs once on mount, not on every render.
    /* eslint-disable react-hooks/set-state-in-effect */
    setProfile(initial);
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Persist progress so a refresh doesn't wipe a ~60-second investment.
  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(profile));
    } catch {
      /* storage full / unavailable — non-fatal */
    }
  }, [profile, hydrated]);

  // Only scroll up if the worksheet has scrolled above the viewport — prevents a
  // jarring upward yank on short steps. Honors reduced-motion.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const node = wizardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    if (rect.top < 0) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = rect.top + window.scrollY - 24;
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    }
  }, [step]);

  const visibleStepIndex = STEPS.indexOf(step);
  const isWizard = visibleStepIndex >= 0;

  const update = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const goNext = () => {
    setDir("fwd");
    setStep((s) => {
      const i = FLOW.indexOf(s);
      return FLOW[Math.min(i + 1, FLOW.length - 1)];
    });
  };
  const goBack = () => {
    setDir("back");
    setStep((s) => {
      const i = STEPS.indexOf(s);
      return i > 0 ? STEPS[i - 1] : s;
    });
  };

  const startCalc = async () => {
    setDir("fwd");
    setStep("loading");
    setCalcError(null);
    const minDwell = new Promise((r) => setTimeout(r, MIN_LOADING_MS));
    try {
      const fetchData = (async () => {
        const res = await fetch("/api/calculate-odds", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Calculation failed");
        return data;
      })();
      const [data] = await Promise.all([fetchData, minDwell]);
      setResult(data.result as OddsResult);
      setStep("paywall");
    } catch (err) {
      setCalcError(err instanceof Error ? err.message : "Calculation failed");
      setStep("optional");
    }
  };

  const activityCount = profile.activities.filter((a) => a.title.trim().length >= 2).length || 1;
  const topSchoolName =
    ALL_SCHOOLS.find((s) => s.slug === profile.schoolSlugs[0])?.shortName ?? "your top school";

  return (
    <section ref={wizardRef} className="pt-4 sm:pt-6 md:pt-14 pb-12 sm:pb-16 md:pb-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pb-3 sm:pb-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-pencil">
          <span>The Admit Forecast · Confidential Worksheet</span>
          {isWizard ? (
            <span className="tabular-nums whitespace-nowrap">
              Step {visibleStepIndex + 1} / {STEPS.length}
              <span className="hidden sm:inline"> · ~60 sec</span>
            </span>
          ) : null}
        </div>
        <hr className="rule" />

        {isWizard ? <Progress index={visibleStepIndex} total={STEPS.length} /> : null}

        <div className="mt-6 sm:mt-8 max-w-[640px] mx-auto">
          {isWizard ? (
            <div key={step} className={dir === "back" ? "step-anim step-back" : "step-anim step-fwd"}>
              {step === "academics" ? (
                <StepAcademics profile={profile} update={update} onNext={goNext} />
              ) : null}
              {step === "schools" ? (
                <StepSchools profile={profile} update={update} onNext={goNext} onBack={goBack} />
              ) : null}
              {step === "activities" ? (
                <StepActivities profile={profile} setProfile={setProfile} onNext={goNext} onBack={goBack} />
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
            </div>
          ) : (
            <>
              {step === "loading" ? (
                <StepLoading activityCount={activityCount} topSchoolName={topSchoolName} />
              ) : null}
              {step === "paywall" ? <StepPaywall result={result} profile={profile} /> : null}
            </>
          )}
        </div>
      </Container>

      <style jsx>{`
        .step-anim {
          will-change: transform, opacity;
        }
        .step-fwd {
          animation: step-in-fwd 0.28s cubic-bezier(0.2, 0.6, 0.2, 1);
        }
        .step-back {
          animation: step-in-back 0.28s cubic-bezier(0.2, 0.6, 0.2, 1);
        }
        @keyframes step-in-fwd {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes step-in-back {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .step-fwd,
          .step-back {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

function Progress({ index, total }: { index: number; total: number }) {
  const pct = Math.round(((index + 1) / total) * 100);
  return (
    <div className="mt-6 h-[3px] w-full bg-hair rounded-full overflow-hidden">
      <div className="progress-fill h-full bg-oxblood rounded-full" style={{ width: `${pct}%` }} />
      <style jsx>{`
        .progress-fill {
          transition: width 520ms cubic-bezier(0.2, 0, 0, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .progress-fill {
            transition: none;
          }
        }
      `}</style>
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
        <button
          onClick={onBack}
          className="inline-flex items-center min-h-[44px] text-[14px] text-ink-2 hover:text-oxblood underline-offset-4 hover:underline px-3 py-2.5"
        >
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

function StepAcademics({
  profile,
  update,
  onNext,
}: {
  profile: Profile;
  update: <K extends keyof Profile>(k: K, v: Profile[K]) => void;
  onNext: () => void;
}) {
  const t = profile.test;
  const score = t === "SAT" ? profile.satScore : t === "ACT" ? profile.actScore : undefined;

  const testValid =
    t === "None" ||
    (t === "SAT" && profile.satScore !== undefined && profile.satScore >= 400 && profile.satScore <= 1600) ||
    (t === "ACT" && profile.actScore !== undefined && profile.actScore >= 1 && profile.actScore <= 36);
  const gpaValid =
    profile.gpa !== undefined && Number.isFinite(profile.gpa) && profile.gpa > 0 && profile.gpa <= 5;
  const valid = testValid && gpaValid;

  return (
    <PaperCard padding={WIZARD_CARD_PADDING} className={WIZARD_CARD_CLASS}>
      <StepHeader
        eyebrow="Step 1 · Academics"
        title="Your scores, to start."
        subtitle="Two quick numbers. If you're test-optional, pick None — we'll weight everything else more heavily."
      />

      <div>
        <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
          Standardized test
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["SAT", "ACT", "None"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => update("test", opt)}
              className={`min-h-[44px] px-4 py-3 text-[14px] font-medium border transition-[background-color,color,border-color,transform] duration-150 active:scale-[0.97] ${
                t === opt
                  ? "border-oxblood bg-[#FAEEEA] text-oxblood"
                  : "border-hair text-ink-2 hover:border-ink-2"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {t !== "None" ? (
        <div className="mt-5">
          <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
            {t} Score <span className="text-pencil/70 normal-case tracking-normal">({t === "SAT" ? "400–1600" : "1–36"})</span>
          </label>
          <input
            type="number"
            inputMode="numeric"
            enterKeyHint="next"
            autoFocus
            placeholder={t === "SAT" ? "e.g. 1480" : "e.g. 33"}
            min={t === "SAT" ? 400 : 1}
            max={t === "SAT" ? 1600 : 36}
            value={score ?? ""}
            onChange={(e) => {
              const n = e.target.value === "" ? undefined : Number(e.target.value);
              if (t === "SAT") update("satScore", n);
              else update("actScore", n);
            }}
            className="w-full border border-hair bg-paper px-4 py-3 text-[16px] focus:outline-none focus:border-oxblood transition-colors"
          />
        </div>
      ) : null}

      <div className="mt-6 pt-6 border-t border-hair">
        <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
          GPA scale
        </label>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {(["unweighted", "weighted"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => update("gpaScale", opt)}
              className={`min-h-[44px] px-4 py-3 text-[14px] font-medium border transition-[background-color,color,border-color,transform] duration-150 active:scale-[0.97] capitalize ${
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
          GPA <span className="text-pencil/70 normal-case tracking-normal">(0–5)</span>
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
          className="w-full border border-hair bg-paper px-4 py-3 text-[16px] focus:outline-none focus:border-oxblood transition-colors"
        />
      </div>

      <NavButtons onNext={onNext} disabled={!valid} />
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
  const [stateInput, setStateInput] = useState(
    profile.state ? STATE_NAMES[profile.state as (typeof US_STATES)[number]] ?? profile.state : "",
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return ALL_SCHOOLS;
    return ALL_SCHOOLS.filter((s) =>
      `${s.name} ${s.shortName} ${s.location}`.toLowerCase().includes(query),
    );
  }, [q]);

  const popular = useMemo(
    () =>
      POPULAR_SLUGS.map((slug) => ALL_SCHOOLS.find((s) => s.slug === slug)).filter(
        (s): s is NonNullable<typeof s> => !!s,
      ),
    [],
  );

  const toggle = (slug: string) => {
    const next = profile.schoolSlugs.includes(slug)
      ? profile.schoolSlugs.filter((x) => x !== slug)
      : [...profile.schoolSlugs, slug].slice(0, 10);
    update("schoolSlugs", next);
  };

  const resolvedCode = resolveStateInput(stateInput);
  const onStateChange = (raw: string) => {
    setStateInput(raw);
    update("state", resolveStateInput(raw));
  };

  const schoolsValid = profile.schoolSlugs.length > 0 && profile.schoolSlugs.length <= 10;
  const locationValid = profile.international || resolvedCode.length === 2;
  const valid = schoolsValid && locationValid;

  return (
    <PaperCard padding={WIZARD_CARD_PADDING} className={WIZARD_CARD_CLASS}>
      <StepHeader
        eyebrow="Step 2 · Your Schools"
        title="Where do you want in?"
        subtitle="Pick up to 10. We'll forecast your admit chance at each one individually."
      />

      {/* Location folded inline — it's one field and doesn't deserve its own screen. */}
      <div className="mb-5">
        <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1.5">
          Applying from
        </label>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          {!profile.international ? (
            <input
              type="text"
              list="us-states-list"
              enterKeyHint="next"
              placeholder="Your state (e.g., California or CA)"
              value={stateInput}
              onChange={(e) => onStateChange(e.target.value)}
              autoComplete="off"
              className="flex-1 border border-hair bg-paper px-4 py-2.5 text-[15px] focus:outline-none focus:border-oxblood transition-colors"
            />
          ) : (
            <span className="flex-1 text-[14px] text-ink-2 italic font-serif py-2.5">
              International applicant
            </span>
          )}
          <label className="flex items-center gap-2 text-[13px] text-ink-2 cursor-pointer shrink-0 px-1">
            <input
              type="checkbox"
              checked={profile.international}
              onChange={(e) => update("international", e.target.checked)}
              className="w-4 h-4 accent-oxblood"
            />
            International
          </label>
        </div>
        <datalist id="us-states-list">
          {US_STATES.map((code) => (
            <option key={code} value={STATE_NAMES[code]} />
          ))}
        </datalist>
      </div>

      {/* One-tap popular schools so the common case needs zero typing. */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {popular.map((s) => {
          const selected = profile.schoolSlugs.includes(s.slug);
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => toggle(s.slug)}
              className={`px-3 py-1.5 text-[12.5px] font-medium border transition-[background-color,color,border-color,transform] duration-150 active:scale-[0.96] ${
                selected
                  ? "border-oxblood bg-[#FAEEEA] text-oxblood"
                  : "border-hair text-ink-2 hover:border-ink-2"
              }`}
            >
              {selected ? "✓ " : "+ "}
              {s.shortName}
            </button>
          );
        })}
      </div>

      <input
        type="text"
        placeholder="Search any college — Harvard, NYU, UCLA…"
        value={q}
        autoFocus
        onChange={(e) => setQ(e.target.value)}
        className="w-full border border-hair bg-paper px-4 py-3 text-[16px] focus:outline-none focus:border-oxblood transition-colors mb-4"
      />

      {profile.schoolSlugs.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {profile.schoolSlugs.map((slug) => {
            const s = ALL_SCHOOLS.find((x) => x.slug === slug);
            if (!s) return null;
            return (
              <span
                key={slug}
                className="chip inline-flex items-center gap-2 bg-[#FAEEEA] text-oxblood text-[13px] px-3 py-1.5 border border-[#E8C9C2]"
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

      <div className="max-h-[220px] overflow-y-auto border border-hair">
        {filtered.length === 0 ? (
          <div className="p-4 text-[14px] text-pencil">No matches.</div>
        ) : (
          filtered.slice(0, 60).map((s) => {
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

      <style jsx>{`
        .chip {
          animation: chip-in 0.18s cubic-bezier(0.2, 0.6, 0.2, 1);
        }
        @keyframes chip-in {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .chip {
            animation: none;
          }
        }
      `}</style>
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
        eyebrow="Step 3 · Activities"
        title="What do you actually do?"
        subtitle="Start with what you spend the most time on. One is enough to continue — the more you add, the more personal your forecast."
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
                  {i === 0 ? "Activity" : "Activity (optional)"}
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
                  autoFocus={i === 0}
                  onChange={(e) => updateActivity(i, { title: e.target.value })}
                  className="w-full border border-hair bg-paper px-3 py-2.5 text-[15px] focus:outline-none focus:border-oxblood transition-colors"
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
                    className="w-full border border-hair bg-paper px-3 py-2.5 text-[14px] focus:outline-none focus:border-oxblood transition-colors"
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
                        hoursPerWeek: e.target.value === "" ? undefined : Number(e.target.value),
                      })
                    }
                    className="w-full border border-hair bg-paper px-3 py-2.5 text-[14px] tabular-nums focus:outline-none focus:border-oxblood transition-colors"
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
                        years: e.target.value === "" ? undefined : Number(e.target.value),
                      })
                    }
                    className="w-full border border-hair bg-paper px-3 py-2.5 text-[14px] tabular-nums focus:outline-none focus:border-oxblood transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-pencil mb-1.5">
                  What you actually did{" "}
                  <span className="text-pencil/70 normal-case tracking-normal">(optional, 1–2 sentences)</span>
                </label>
                <textarea
                  placeholder="Grew membership from 8 to 60. Ran a hackathon that raised $2k for the local library. Mentored two underclassmen who placed in state."
                  value={a.description ?? ""}
                  onChange={(e) => updateActivity(i, { description: e.target.value })}
                  rows={3}
                  className="w-full border border-hair bg-paper px-3 py-2.5 text-[14px] leading-snug focus:outline-none focus:border-oxblood resize-none transition-colors"
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
                      className={`min-h-[44px] px-2 text-[12.5px] font-medium border transition-[background-color,color,border-color] duration-150 active:scale-[0.96] ${
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
          + Add another activity (optional)
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
        eyebrow="Step 4 · Anything else?"
        title="A few things that sharpen it."
        subtitle="All optional — skip anything you're unsure about and calculate now. Each one makes your forecast more precise."
      />

      <div className="space-y-5">
        <div>
          <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
            Intended major <span className="text-pencil/70 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Computer Science"
            value={profile.intendedMajor ?? ""}
            onChange={(e) => update("intendedMajor", e.target.value)}
            className="w-full border border-hair bg-paper px-4 py-3 text-[15px] focus:outline-none focus:border-oxblood transition-colors"
          />
        </div>

        <div>
          <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
            Demographics <span className="text-pencil/70 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g., First-gen, low-income, Latina"
            value={profile.demographics ?? ""}
            onChange={(e) => update("demographics", e.target.value)}
            className="w-full border border-hair bg-paper px-4 py-3 text-[15px] focus:outline-none focus:border-oxblood transition-colors"
          />
        </div>

        <div>
          <label className="block text-[13px] font-mono uppercase tracking-wider text-pencil mb-2">
            Hooks <span className="text-pencil/70 normal-case tracking-normal">(legacy, recruited athlete, etc.)</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Recruited soccer, legacy at Yale"
            value={profile.hooks ?? ""}
            onChange={(e) => update("hooks", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit();
            }}
            className="w-full border border-hair bg-paper px-4 py-3 text-[15px] focus:outline-none focus:border-oxblood transition-colors"
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

function StepLoading({
  activityCount,
  topSchoolName,
}: {
  activityCount: number;
  topSchoolName: string;
}) {
  const checks = useMemo(
    () => [
      "Weighing academics against this year's admit band",
      `Scoring your ${activityCount} ${activityCount === 1 ? "activity" : "activities"} by tier and depth`,
      "Applying geography & context adjustments",
      `Cross-referencing ${topSchoolName}'s recent class`,
    ],
    [activityCount, topSchoolName],
  );

  const [done, setDone] = useState(0);
  const [pct, setPct] = useState(6);
  const [sealed, setSealed] = useState(false);

  useEffect(() => {
    const total = checks.length;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < total; i++) {
      timers.push(
        setTimeout(() => {
          setDone(i + 1);
          setPct(Math.round(((i + 1) / total) * 92));
        }, 300 + i * 500),
      );
    }
    timers.push(
      setTimeout(() => {
        setPct(100);
        setSealed(true);
      }, 300 + total * 500),
    );
    return () => timers.forEach(clearTimeout);
  }, [checks.length]);

  return (
    <PaperCard padding={WIZARD_CARD_PADDING}>
      <div className="text-center py-10 sm:py-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxblood mb-3">
          {sealed ? "Sealed" : "Computing"}
        </div>
        <h2 className="text-ink text-[24px] md:text-[28px] font-serif">
          {sealed ? "Forecast sealed." : "Analyzing your profile…"}
        </h2>
        <p className="mt-3 text-[14px] text-pencil">
          {sealed
            ? "Pulling your numbers together."
            : "Cross-referencing recent admit data against your worksheet."}
        </p>

        <div className="mt-8 mx-auto max-w-[340px]">
          <div className="h-[3px] w-full bg-hair rounded-full overflow-hidden">
            <div
              className="load-bar h-full bg-oxblood rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <ul className="mt-8 mx-auto max-w-[340px] text-left space-y-2.5">
          {checks.map((c, i) => {
            const complete = i < done;
            return (
              <li key={i} className="flex items-start gap-2.5 text-[13px] leading-snug">
                <span className="relative w-3.5 h-3.5 mt-[2px] shrink-0">
                  <span
                    className={`absolute inset-0 flex items-center justify-center text-pencil transition-opacity duration-200 ${
                      complete ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    ·
                  </span>
                  <span
                    className={`absolute inset-0 transition-opacity duration-200 ${
                      complete ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <CheckGlyph />
                  </span>
                </span>
                <span
                  className={`transition-colors duration-200 ${
                    complete ? "text-ink-2" : "text-pencil"
                  }`}
                >
                  {c}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <style jsx>{`
        .load-bar {
          transition: width 420ms cubic-bezier(0.2, 0, 0, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .load-bar {
            transition: none;
          }
        }
      `}</style>
    </PaperCard>
  );
}

function LockGlyph({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden className="inline-block shrink-0">
      <rect x="2.5" y="5.5" width="7" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 5.5V4a2 2 0 1 1 4 0v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0 text-oxblood">
      <path
        d="M3 7l2.8 2.8L11 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TIER_RANK: Record<SchoolOdds["tier"], number> = { Safety: 0, Match: 1, Reach: 2 };

// Deterministic, purely-decorative 2-digit token sitting behind the blur. It is
// NOT the real percentage (the real value never reaches the pre-payment client);
// it only gives the blur a believable "a number lives here" shape. Deterministic
// so it never flickers between renders.
function lockedPlaceholder(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return String((h % 89) + 10);
}

function LockedForecastRow({ odds, delay }: { odds: SchoolOdds; delay: number }) {
  const factor = odds.factors[0];
  return (
    <div
      className="forecast-row border border-hair bg-paper rounded-md overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-3 px-4 sm:px-5 pt-4 pb-3.5">
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-[18px] sm:text-[20px] leading-[1.15] text-ink truncate tracking-[-0.01em]">
            {odds.name}
          </h3>
          <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-pencil">
            {odds.tier}
          </div>
        </div>
        <div
          className="relative shrink-0 text-right"
          role="img"
          aria-label="Admit chance locked — unlock to reveal"
        >
          <span
            className="odds-blur block font-serif text-oxblood text-[34px] sm:text-[40px] leading-none tabular-nums"
            aria-hidden
          >
            {lockedPlaceholder(odds.slug)}%
          </span>
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-1 bg-cream/85 px-1.5 py-0.5 rounded-sm font-mono text-[9px] uppercase tracking-[0.16em] text-pencil">
              <LockGlyph size={9} />
              Locked
            </span>
          </span>
        </div>
      </div>

      {factor ? (
        <div className="border-t border-hair bg-cream/60 px-4 sm:px-5 py-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-pencil mb-1.5">
            From your snapshot
          </div>
          <p className="font-serif italic text-[14px] text-ink leading-snug">&ldquo;{factor}&rdquo;</p>
        </div>
      ) : null}
    </div>
  );
}

function FeatureRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-ink-2 leading-snug">
      <span className="mt-[3px]">
        <CheckGlyph />
      </span>
      <span>{children}</span>
    </li>
  );
}

function StepPaywall({ result, profile }: { result: OddsResult | null; profile: Profile }) {
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
        body: JSON.stringify({ email: trimmedEmail, calculationId: result.calculationId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Checkout failed");
      setSubmitting(false);
    }
  };

  const schools = useMemo(() => {
    const list = result?.schools ? [...result.schools] : [];
    return list.sort((a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier]);
  }, [result]);

  const totalSchools = schools.length || profile.schoolSlugs.length;
  // Offer block animates in just after the forecast rows so the eye lands on the
  // blurred numbers first, then the (relievingly cheap) price.
  const offerDelay = 150 + Math.min(totalSchools, 7) * 70 + 80;

  return (
    <PaperCard padding="p-5 sm:p-7 md:p-9" className="paywall-card">
      <div className="text-center mb-7 sm:mb-9">
        <div className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.18em] text-oxblood mb-3">
          Forecast ready · {totalSchools} {totalSchools === 1 ? "school" : "schools"} modeled
        </div>
        <h2 className="text-ink text-[28px] sm:text-[34px] md:text-[40px] leading-[1.04] font-serif tracking-[-0.02em]">
          Your odds are calculated.
          <br className="hidden sm:block" /> Here&rsquo;s the preview.
        </h2>
        <p className="mt-4 text-[14.5px] sm:text-[15px] text-ink-2 max-w-[52ch] mx-auto leading-[1.55]">
          Each school below has a real admit percentage attached, blurred until you unlock.
          Nothing here is invented — this is the figure your model produced.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-pencil">
          <LockGlyph />
          Built by people who got in · {totalSchools} weighed · cross-referenced against admit data
        </p>
      </div>

      {schools.length > 0 ? (
        <div className="space-y-3 sm:space-y-3.5 mb-7 sm:mb-9">
          {schools.map((s, i) => (
            <LockedForecastRow key={s.slug} odds={s} delay={150 + Math.min(i, 6) * 70} />
          ))}
        </div>
      ) : null}

      <div className="offer-block" style={{ animationDelay: `${offerDelay}ms` }}>
        <hr className="rule mb-7 sm:mb-9" />

        <p className="text-center max-w-[44ch] mx-auto mb-5 text-[13.5px] sm:text-[14px] text-pencil leading-[1.55]">
          A private counselor charges <span className="text-ink-2">$150–300 an hour</span> for this
          read. Yours is <span className="text-ink-2">$7 a month</span>, cancel anytime.
        </p>

        <div className="border border-oxblood/30 bg-[#FAEEEA] rounded-md overflow-hidden">
          <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-oxblood/20">
            <div className="flex items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[40px] sm:text-[44px] font-serif text-oxblood leading-none tabular-nums tracking-[-0.025em]">
                  $7
                </span>
                <span className="text-[14px] text-ink-2">/ month</span>
              </div>
              <span className="bg-oxblood text-paper font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-[4px]">
                Most applicants start here
              </span>
            </div>
            <p className="mt-2.5 text-[13px] sm:text-[13.5px] text-ink-2/90 leading-snug">
              Unlocks every blurred number above, plus the full toolkit. About the price of two
              coffees, cancel in two clicks.
            </p>
          </div>

          <ul className="px-5 sm:px-6 py-4 space-y-2.5 text-[13.5px] sm:text-[14px]">
            <FeatureRow>Your exact admit % and tier for every school you picked, unblurred.</FeatureRow>
            <FeatureRow>
              A per-factor breakdown — what&rsquo;s helping, what&rsquo;s quietly hurting, and the one
              lever to pull before you apply.
            </FeatureRow>
            <FeatureRow>Plus unlimited essay grading and every admissions tool we ship.</FeatureRow>
          </ul>

          <div className="px-5 sm:px-6 py-3 bg-cream border-t border-oxblood/20">
            <p className="text-[12.5px] sm:text-[13px] font-medium text-forest leading-snug">
              30-day money-back guarantee · Cancel in one click · Stripe secure
            </p>
            <p className="mt-1 text-[11.5px] text-pencil leading-[1.5]">
              If the forecast isn&rsquo;t useful, reply to your receipt and we refund you — no forms.
            </p>
          </div>

          <div className="px-5 sm:px-6 py-5 bg-cream border-t border-oxblood/20">
            <label
              htmlFor="paywall-email"
              className="block font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] text-pencil mb-2"
            >
              Your email
            </label>
            <div className="relative mb-4">
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
                className="w-full border border-hair bg-paper px-4 py-3 pr-10 text-[16px] rounded-sm focus:outline-none focus:border-oxblood transition-colors"
              />
              <span
                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition-opacity duration-150 ${
                  emailValid ? "opacity-100" : "opacity-0"
                }`}
              >
                <CheckGlyph />
              </span>
            </div>

            {err ? (
              <p className="email-err mb-4 text-[13px] text-oxblood bg-paper border border-[#E8C9C2] px-3 py-2 rounded-sm">
                {err}
              </p>
            ) : null}

            <button
              onClick={startCheckout}
              disabled={submitting || !emailValid}
              className="cta-pulse w-full btn btn-brand text-[15.5px] sm:text-[16.5px] font-semibold py-4 disabled:opacity-50 disabled:cursor-not-allowed justify-center"
            >
              {submitting ? "Opening secure checkout…" : "Reveal my real odds · $7/mo"}
            </button>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-pencil">
              <span className="inline-flex items-center gap-1.5">
                <LockGlyph />
                Stripe secure
              </span>
              <span className="text-hair">·</span>
              <span>Cancel anytime</span>
              <span className="text-hair">·</span>
              <span>No surprise charges</span>
            </div>
            <p className="mt-2.5 text-center text-[11.5px] text-pencil leading-[1.5]">
              You&rsquo;ll set a password after payment to return to your forecast anytime.
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-[11px] text-pencil/90 leading-[1.5] max-w-[48ch] mx-auto">
          Odds are a statistical estimate from your inputs and recent admissions data, not a
          guarantee of admission.
        </p>
      </div>

      <style jsx>{`
        .paywall-card {
          opacity: 0;
          transform: translateY(10px);
          animation: pw-in 0.46s cubic-bezier(0.2, 0.6, 0.2, 1) forwards;
        }
        .forecast-row {
          opacity: 0;
          transform: translateY(8px);
          animation: pw-in 0.42s cubic-bezier(0.2, 0.6, 0.2, 1) forwards;
          will-change: transform, opacity;
        }
        .offer-block {
          opacity: 0;
          transform: translateY(8px);
          animation: pw-in 0.42s cubic-bezier(0.2, 0.6, 0.2, 1) forwards;
        }
        @keyframes pw-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .odds-blur {
          filter: blur(8px);
          text-shadow: 0 0 1px rgba(107, 29, 29, 0.15);
          user-select: none;
          transition: filter 200ms cubic-bezier(0.2, 0, 0, 1);
        }
        @media (hover: hover) {
          .forecast-row:hover .odds-blur {
            filter: blur(6px);
          }
        }
        .cta-pulse {
          animation: cta-pulse 1.1s ease-out 1;
        }
        @keyframes cta-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(107, 29, 29, 0.35);
          }
          100% {
            box-shadow: 0 0 0 10px rgba(107, 29, 29, 0);
          }
        }
        .email-err {
          animation: err-in 0.18s cubic-bezier(0.2, 0, 0, 1);
        }
        @keyframes err-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .paywall-card,
          .forecast-row,
          .offer-block,
          .email-err {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
          .odds-blur {
            filter: blur(8px) !important;
            transition: none !important;
          }
          .forecast-row:hover .odds-blur {
            filter: blur(8px) !important;
          }
          .cta-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </PaperCard>
  );
}
