"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const STEPS = [
  { label: "Saving your draft", duration: 800 },
  { label: "Reading the essay", duration: 1200 },
  { label: "Scoring content, structure, voice", duration: 1600 },
  { label: "Finalizing", duration: 600 },
];

interface AnalyzingOverlayProps {
  isOpen: boolean;
  isDone: boolean;
  onAnimationComplete: () => void;
}

export function AnalyzingOverlay({ isOpen, isDone, onAnimationComplete }: AnalyzingOverlayProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCompletedSteps([]);
      setActiveStep(0);
      return;
    }

    let stepIndex = 0;

    const advance = () => {
      if (stepIndex >= STEPS.length - 1) return;
      setCompletedSteps((prev) => [...prev, stepIndex]);
      stepIndex++;
      setActiveStep(stepIndex);
      const next = STEPS[stepIndex];
      if (next) setTimeout(advance, next.duration);
    };

    const initial = STEPS[0];
    if (initial) setTimeout(advance, initial.duration);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isDone || !isOpen) return;
    setCompletedSteps(STEPS.map((_, i) => i));
    setTimeout(onAnimationComplete, 700);
  }, [isDone, isOpen, onAnimationComplete]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: "rgba(26,20,16,0.45)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div className="w-full max-w-[440px] mx-4 bg-paper border border-hair rounded-[2px] shadow-[0_24px_80px_rgba(26,20,16,0.35)] p-6 sm:p-10">
        <p className="eyebrow mb-4">
          <span className="num">§</span> Analysis in progress
        </p>

        <h2 className="font-serif text-[28px] md:text-[32px] leading-[1.1] tracking-[-0.015em] text-ink mb-2">
          Reading your <em className="italic text-oxblood">essay</em>.
        </h2>
        <p className="text-[13px] text-pencil mb-8">
          10–20 seconds. Don&apos;t close the window.
        </p>

        <hr className="rule mb-6" />

        <ol className="space-y-4">
          {STEPS.map((step, i) => {
            const done = completedSteps.includes(i);
            const active = activeStep === i && !done;
            return (
              <li key={step.label} className="flex items-center gap-4">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-pencil shrink-0 w-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`w-4 h-4 shrink-0 flex items-center justify-center ${
                    done
                      ? "text-forest"
                      : active
                      ? "text-oxblood"
                      : "text-hair"
                  }`}
                  aria-hidden="true"
                >
                  {done ? (
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                  ) : active ? (
                    <span className="w-3 h-3 rounded-full border-2 border-oxblood border-t-transparent animate-spin" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-hair" />
                  )}
                </span>
                <span
                  className={`text-[15px] transition-colors ${
                    done
                      ? "text-ink-2"
                      : active
                      ? "text-ink font-medium"
                      : "text-pencil"
                  }`}
                >
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
