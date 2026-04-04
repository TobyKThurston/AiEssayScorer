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
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2>Three steps to a stronger essay</h2>
        </motion.div>

        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-gradient-to-r from-[#BFDBFE] via-[#3B82F6] to-[#BFDBFE]" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center shadow-[0_8px_24px_rgba(59,130,246,0.25)]">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-[#3B82F6] text-[10px] font-bold text-[#3B82F6] flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-2">
                  Step {step.step}
                </p>
                <h3 className="mb-3">{step.title}</h3>
                <p className="text-[#64748B] max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
