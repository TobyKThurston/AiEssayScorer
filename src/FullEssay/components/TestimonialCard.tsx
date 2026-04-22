import { motion } from "motion/react";

interface TestimonialCardProps {
  initials: string;
  name: string;
  city: string;
  quote: string;
  delay?: number;
}

export function TestimonialCard({ initials, name, city, quote, delay = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="p-6 rounded-2xl bg-white border border-hair shadow-[0_4px_24px_rgba(148,163,184,0.12)] hover:shadow-[0_8px_32px_rgba(148,163,184,0.18)] hover:border-[#3B82F6]/30 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.div 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-oxblood to-forest flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-sm font-semibold text-white">{initials}</span>
        </motion.div>
        <div>
          <div className="font-medium text-ink">{name}</div>
          <small className="text-pencil">{city}</small>
        </div>
      </div>
      <p className="text-ink-2">"{quote}"</p>
    </motion.div>
  );
}