import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface StepCardProps {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
  delay?: number;
}

export function StepCard({ icon: Icon, step, title, description, delay = 0 }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex-1 p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_24px_rgba(148,163,184,0.12)] hover:shadow-[0_8px_32px_rgba(148,163,184,0.18)] hover:border-[#3B82F6]/30 transition-all duration-300 relative"
    >
      <motion.div 
        className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-sm font-semibold text-white">{step}</span>
      </motion.div>
      <motion.div 
        className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center mb-4 mt-2"
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