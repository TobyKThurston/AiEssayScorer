"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";

const STEPS = [
  { label: "Saving your draft", duration: 800 },
  { label: "Reading your essay", duration: 1200 },
  { label: "Analyzing content, structure, and voice", duration: 1600 },
  { label: "Finalizing your score", duration: 600 },
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
    let elapsed = 0;

    const advance = () => {
      if (stepIndex >= STEPS.length - 1) {
        // On the last step, wait for isDone before completing
        return;
      }
      setCompletedSteps((prev) => [...prev, stepIndex]);
      stepIndex++;
      setActiveStep(stepIndex);
      const next = STEPS[stepIndex];
      if (next) setTimeout(advance, next.duration);
    };

    const initial = STEPS[0];
    if (initial) setTimeout(advance, initial.duration);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // When the API finishes, complete the last step and dismiss
  useEffect(() => {
    if (!isDone || !isOpen) return;
    // Mark all steps complete
    setCompletedSteps(STEPS.map((_, i) => i));
    setTimeout(onAnimationComplete, 700);
  }, [isDone, isOpen, onAnimationComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-sm mx-4 bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.15)] p-8">
        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center shadow-[0_4px_16px_rgba(59,130,246,0.4)]">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>

        <h2 className="text-center text-[#0F172A] font-semibold text-base mb-1">
          Analyzing your essay
        </h2>
        <p className="text-center text-[#64748B] text-xs mb-8">
          This takes about 10 to 20 seconds
        </p>

        {/* Steps */}
        <div className="space-y-4">
          {STEPS.map((step, i) => {
            const done = completedSteps.includes(i);
            const active = activeStep === i && !done;
            return (
              <div key={step.label} className="flex items-center gap-3">
                {done ? (
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                ) : active ? (
                  <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-[#CBD5E1] flex-shrink-0" />
                )}
                <span
                  className={`text-sm transition-colors ${
                    done
                      ? "text-[#10B981] line-through decoration-[#10B981]/40"
                      : active
                      ? "text-[#0F172A] font-medium"
                      : "text-[#CBD5E1]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
