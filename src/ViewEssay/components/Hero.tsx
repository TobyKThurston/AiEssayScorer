import { motion, AnimatePresence } from "motion/react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  const universities = ["Harvard", "Yale", "Princeton", "Columbia", "Penn", "Brown", "Dartmouth", "Cornell"];
  
  const rotatingWords = [
    "data-backed",
    "AI-powered",
    "winning",
    "standout",
    "strategic"
  ];
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedUniversities] = useState(() => {
    // Randomly select 5 universities
    const shuffled = [...universities].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-0 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#DBEAFE] rounded-full opacity-40 blur-[120px]" />
      <div className="absolute top-40 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#BFDBFE] rounded-full opacity-40 blur-[120px]" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge>Built by admitted Ivy students</Badge>
              <Badge>Private by default</Badge>
            </div>

            <h1 className="mb-6">
              Admit smarter with essays that are{" "}
              <span className="inline-block relative h-[1.15em] align-bottom" style={{ minWidth: "280px" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-0 top-0 bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] bg-clip-text text-transparent will-change-transform"
                  >
                    {rotatingWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="invisible">{rotatingWords[0]}</span>
              </span>
            </h1>

            <p className="text-[#475569] mb-8 max-w-xl">
              Upload drafts, resumes, or prompts. Ivy Admit scores structure, flags risk, and gives precise line edits trained on successful applications.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12">
              <Button variant="primary" href="/upload">Review your essay</Button>
              <Button variant="secondary">See features</Button>
            </div>

            {/* Social proof */}
            <div>
              <small className="text-[#64748B] block mb-4">Students admitted to</small>
              <div className="flex flex-wrap gap-4 md:gap-6 items-center mb-3">
                {selectedUniversities.map((uni) => (
                  <div key={uni} className="text-[#94A3B8] text-sm font-medium">
                    {uni}
                  </div>
                ))}
              </div>
              <small className="text-[#94A3B8]">
                Not affiliated with or endorsed by any university.
              </small>
            </div>
          </motion.div>

          {/* Right column - Product mock */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-[0_16px_48px_rgba(148,163,184,0.2)]">
              {/* Score header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <small className="text-[#64748B] block mb-1">Essay quality score</small>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>
                      92
                    </span>
                    <TrendingUp className="w-5 h-5 text-[#0EA5E9]" />
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative h-2 bg-slate-100 rounded-full mb-6 md:mb-8 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0EA5E9] to-[#3B82F6] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>

              {/* Category chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="px-3 py-1.5 rounded-full bg-[#DBEAFE] border border-[#3B82F6]/30 text-[#3B82F6]">
                  <small>Structure</small>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#DBEAFE] border border-[#0EA5E9]/30 text-[#0EA5E9]">
                  <small>Evidence</small>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#DBEAFE] border border-[#3B82F6]/30 text-[#3B82F6]">
                  <small>Tone</small>
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                  <small className="text-[#475569]">Strong narrative arc with clear progression</small>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                  <small className="text-[#475569]">Concrete evidence supports key claims</small>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                  <small className="text-[#475569]">Tone matches regional reading preferences</small>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}