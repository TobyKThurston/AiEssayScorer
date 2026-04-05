"use client";

import { motion } from "motion/react";
import { Upload, Target, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Paste your essay",
    description:
      "Drop in your draft, note the target schools, and optionally paste the prompt for context.",
  },
  {
    icon: Target,
    step: "02",
    title: "Get your score",
    description:
      "Receive a score across content, structure, and style — plus an overall quality rating.",
  },
  {
    icon: RefreshCw,
    step: "03",
    title: "Apply the edits",
    description:
      "Use the line-by-line suggestions to sharpen your voice and raise your score before you submit.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2>Three steps to a stronger essay</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white/60 backdrop-blur-md border border-white/70 rounded-2xl p-6 shadow-[0_2px_16px_rgba(99,102,241,0.06)] hover:bg-white/75 hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)] transition-all duration-300"
            >
              {/* Step number + icon */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-[#6366F1]" />
                </div>
                <span className="text-xs font-bold text-[#6366F1] uppercase tracking-widest">
                  Step {step.step}
                </span>
              </div>

              <h3 className="mb-2">{step.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
