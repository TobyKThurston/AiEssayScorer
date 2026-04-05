"use client";

import { motion } from "motion/react";
import { Users, TrendingUp, Zap } from "lucide-react";

const stats = [
  { icon: Users, value: "20,000+", label: "students improved drafts" },
  { icon: TrendingUp, value: "92 avg", label: "post-edit quality score" },
  { icon: Zap, value: "7 min", label: "median time to first edit" },
];

export function ProofStrip() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_8px_32px_rgba(99,102,241,0.08)] px-8 py-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-5 h-5 text-[#6366F1]" />
                </div>
                <div>
                  <p
                    className="text-3xl font-extrabold text-[#0F172A]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[#64748B] text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
