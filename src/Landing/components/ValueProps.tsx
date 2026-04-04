"use client";

import { motion } from "motion/react";
import { MapPin, Database, BookOpen, Edit3, ClipboardCheck, Shield } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Regional tailoring",
    description:
      "Match the reading style of your assigned team. Adjust tone, cadence, and emphasis region by region.",
    color: "from-[#DBEAFE] to-[#BFDBFE]",
    iconColor: "text-[#2563EB]",
  },
  {
    icon: Database,
    title: "Accepted-app patterns",
    description:
      "Mine linguistic and structural patterns from real admitted applications across the Ivy League and beyond.",
    color: "from-[#EDE9FE] to-[#DDD6FE]",
    iconColor: "text-[#7C3AED]",
  },
  {
    icon: BookOpen,
    title: "Strategy library",
    description:
      "Battle-tested playbooks for narrative arcs, topic selection, and prestige signals that resonate.",
    color: "from-[#FCE7F3] to-[#FBCFE8]",
    iconColor: "text-[#BE185D]",
  },
  {
    icon: Edit3,
    title: "Line-by-line edits",
    description:
      "Targeted rewrites with clear rationale. Keep your authentic voice while raising clarity and impact.",
    color: "from-[#D1FAE5] to-[#A7F3D0]",
    iconColor: "text-[#047857]",
  },
  {
    icon: ClipboardCheck,
    title: "Evidence checklist",
    description:
      "Turn vague claims into concrete proof. Quantify outcomes and document achievements the right way.",
    color: "from-[#FEF3C7] to-[#FDE68A]",
    iconColor: "text-[#B45309]",
  },
  {
    icon: Shield,
    title: "Risk guardrails",
    description:
      "Flag tone risks and topic hazards before you submit. Know what hurts before it's too late.",
    color: "from-[#FEE2E2] to-[#FECACA]",
    iconColor: "text-[#DC2626]",
  },
];

export function ValueProps() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-3">
            Features
          </p>
          <h2>Why students pick Ivy Admit</h2>
          <p className="text-[#64748B] mt-3 max-w-xl mx-auto">
            Every feature is built around one goal: helping your authentic story
            stand out to the right readers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_16px_rgba(148,163,184,0.08)] hover:shadow-[0_8px_32px_rgba(148,163,184,0.16)] hover:border-slate-300 transition-all duration-300"
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
              >
                <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
              </div>
              <h3 className="text-base mb-2">{feature.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
