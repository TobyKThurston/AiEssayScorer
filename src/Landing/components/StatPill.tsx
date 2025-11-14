import { motion } from "motion/react";

interface StatPillProps {
  value: string;
  label: string;
}

export function StatPill({ value, label }: StatPillProps) {
  return (
    <motion.div 
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-4xl md:text-5xl mb-2 pb-1 bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>
        {value}
      </div>
      <small className="text-[#64748B]">{label}</small>
    </motion.div>
  );
}