import { motion } from "motion/react";
import { StatPill } from "./StatPill";

export function ProofStrip() {
  const stats = [
    { value: "20,000+", label: "students improved drafts" },
    { value: "92 avg", label: "post-edit quality score" },
    { value: "7 min", label: "median time to first edit" }
  ];

  return (
    <section className="py-16 md:py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#DBEAFE]/30 via-white to-[#BFDBFE]/30" />
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StatPill value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}