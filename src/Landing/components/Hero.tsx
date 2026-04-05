"use client";

import { motion, AnimatePresence } from "motion/react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { CheckCircle2, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  const rotatingWords = ["data-backed", "AI-powered", "winning", "standout", "strategic"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#F8FAFC]" />
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-[#EFF6FF] to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-7">
              <Badge>
                <Sparkles className="w-3 h-3 mr-1 text-[#3B82F6]" />
                Built by admitted Ivy students
              </Badge>
              <Badge>Private by default</Badge>
            </div>

            <h1 className="mb-6">
              College essays that are{" "}
              <span className="inline-block relative" style={{ minWidth: "260px" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] bg-clip-text text-transparent will-change-transform"
                  >
                    {rotatingWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="text-[#475569] text-lg leading-relaxed mb-8 max-w-lg">
              Upload your draft. Get a score, line-by-line edits, and strategic advice
              trained on successful Ivy League applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button variant="primary" href="/editor">
                Review your essay
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" href="/view-essay">
                Browse real essays
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {["20,000+ students helped", "92 avg quality score", "Free to start"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                    <span className="text-sm text-[#64748B]">{item}</span>
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Right — product mock */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-2xl bg-white border border-slate-200 shadow-[0_24px_64px_rgba(148,163,184,0.2)] p-7 overflow-hidden">
              {/* Accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#0EA5E9] to-[#6366F1]" />

              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-1">
                    Essay Score
                  </p>
                  <div className="flex items-end gap-2">
                    <motion.span
                      className="text-6xl font-extrabold bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] bg-clip-text text-transparent"
                      style={{ fontFamily: "var(--font-heading)" }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      92
                    </motion.span>
                    <span className="text-sm text-[#10B981] font-semibold mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Excellent
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#3B82F6]" />
                </div>
              </div>

              {/* Overall bar */}
              <div className="h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                />
              </div>

              {/* Category breakdown */}
              <div className="space-y-3 mb-6">
                {[
                  { label: "Content & Message", score: 28, max: 30 },
                  { label: "Structure", score: 21, max: 25 },
                  { label: "Writing Style", score: 23, max: 25 },
                ].map((cat, i) => (
                  <div key={cat.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#64748B]">{cat.label}</span>
                      <span className="text-xs font-semibold text-[#0F172A]">
                        {cat.score}/{cat.max}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(cat.score / cat.max) * 100}%` }}
                        transition={{ duration: 1, delay: 0.7 + i * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Feedback pills */}
              <div className="space-y-2">
                {[
                  { type: "strength", text: "Strong personal narrative arc" },
                  { type: "strength", text: "Concrete evidence throughout" },
                  { type: "improve", text: "Conclusion could be more memorable" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium ${
                      item.type === "strength"
                        ? "bg-[#F0FDF4] text-[#166534]"
                        : "bg-[#FEF3C7] text-[#92400E]"
                    }`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating chip */}
            <motion.div
              className="absolute -bottom-4 -left-4 md:-left-8 bg-white rounded-xl border border-slate-200 shadow-[0_8px_24px_rgba(148,163,184,0.2)] px-4 py-3 max-w-[220px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-[10px] font-semibold text-[#3B82F6] uppercase tracking-wider mb-0.5">
                Line Suggestion
              </p>
              <p className="text-xs text-[#475569] leading-snug">
                Replace &ldquo;passionate about&rdquo; →{" "}
                <span className="font-semibold text-[#0F172A]">&ldquo;driven by&rdquo;</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
