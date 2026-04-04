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
    <section className="py-12 md:py-16 bg-gradient-to-r from-[#1D4ED8] to-[#0EA5E9] relative overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative z-10">
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
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p
                  className="text-3xl font-extrabold text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
