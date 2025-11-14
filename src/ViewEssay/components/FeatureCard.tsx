import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_24px_rgba(148,163,184,0.12)] hover:shadow-[0_8px_32px_rgba(148,163,184,0.18)] hover:border-[#3B82F6]/30 transition-all duration-300"
    >
      <motion.div 
        className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center mb-4"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="w-6 h-6 text-[#3B82F6]" />
      </motion.div>
      <h3 className="mb-2">{title}</h3>
      <p className="text-[#475569]">{description}</p>
    </motion.div>
  );
}