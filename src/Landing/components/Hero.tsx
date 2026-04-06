"use client";

import { motion } from "motion/react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { CheckCircle2, TrendingUp, Sparkles, Star } from "lucide-react";
import Link from "next/link";

const AVATARS = [
  { initials: "SL", bg: "from-[#818CF8] to-[#6366F1]" },
  { initials: "MK", bg: "from-[#34D399] to-[#059669]" },
  { initials: "AT", bg: "from-[#F472B6] to-[#DB2777]" },
  { initials: "RJ", bg: "from-[#FBBF24] to-[#D97706]" },
  { initials: "CW", bg: "from-[#60A5FA] to-[#2563EB]" },
];

export function Hero() {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-28 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex flex-wrap gap-2 mb-7"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <Badge>
                <Sparkles className="w-3 h-3 mr-1 text-[#6366F1]" />
                AI-Powered College Admissions
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Write essays that get you into your dream school.
            </motion.h1>

            {/* Social proof row */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center">
                {AVATARS.map((avatar, i) => (
                  <div
                    key={avatar.initials}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatar.bg} flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white ${i !== 0 ? "-ml-2" : ""}`}
                  >
                    {avatar.initials}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />
                  ))}
                </div>
                <span className="text-sm text-[#475569] font-medium">
                  4.8 · Rated by 2,000+ students
                </span>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button variant="primary" href="/editor">
                Start for free
              </Button>
              <Button variant="secondary" href="/view-essay">
                Browse examples
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {["20,000+ students helped", "92 avg quality score", "Free to start"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                    <span className="text-sm text-[#64748B]">{item}</span>
                  </div>
                )
              )}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/ai-essay-review" className="text-xs text-[#6366F1] hover:underline">AI Essay Review →</Link>
              <Link href="/college-essay-checker" className="text-xs text-[#6366F1] hover:underline">Essay Checker →</Link>
              <Link href="/common-app-essay-help" className="text-xs text-[#6366F1] hover:underline">Common App Help →</Link>
            </motion.div>
          </motion.div>

          {/* Right — glass mock card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            {/* Bob animation wrapper */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="relative rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_8px_32px_rgba(99,102,241,0.12)] p-7 overflow-hidden">
                {/* Subtle top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#818CF8] via-[#6366F1] to-[#60A5FA]" />

                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-1">
                      Essay Score
                    </p>
                    <div className="flex items-end gap-2">
                      <motion.span
                        className="text-6xl font-extrabold bg-gradient-to-br from-[#6366F1] to-[#60A5FA] bg-clip-text text-transparent"
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
                  <div className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#6366F1]" />
                  </div>
                </div>

                {/* Overall bar */}
                <div className="h-2 bg-white/40 rounded-full mb-6 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#6366F1] to-[#60A5FA] rounded-full"
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
                      <div className="h-1.5 bg-white/40 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#818CF8] to-[#60A5FA] rounded-full"
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
                          ? "bg-[#F0FDF4]/80 text-[#166534]"
                          : "bg-[#FEF3C7]/80 text-[#92400E]"
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

              {/* Floating chip 1 */}
              <motion.div
                className="absolute -bottom-4 -left-4 md:-left-8 bg-white/70 backdrop-blur-xl rounded-xl border border-white/80 shadow-[0_8px_24px_rgba(99,102,241,0.15)] px-4 py-3 max-w-[220px]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                style={{ animation: "none" }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <p className="text-[10px] font-semibold text-[#6366F1] uppercase tracking-wider mb-0.5">
                    Line Suggestion
                  </p>
                  <p className="text-xs text-[#475569] leading-snug">
                    Replace &ldquo;passionate about&rdquo; →{" "}
                    <span className="font-semibold text-[#0F172A]">&ldquo;driven by&rdquo;</span>
                  </p>
                </motion.div>
              </motion.div>

              {/* Floating chip 2 */}
              <motion.div
                className="absolute -top-4 -right-4 md:-right-6 bg-white/70 backdrop-blur-xl rounded-xl border border-white/80 shadow-[0_8px_24px_rgba(99,102,241,0.15)] px-4 py-3"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <p className="text-[10px] font-semibold text-[#059669] uppercase tracking-wider mb-0.5">
                    Risk Check
                  </p>
                  <p className="text-xs text-[#475569] font-medium">No flags detected ✓</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
