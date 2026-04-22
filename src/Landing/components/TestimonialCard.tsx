import { motion } from "motion/react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  initials: string;
  name: string;
  city: string;
  quote: string;
  school?: string;
  delay?: number;
}

export function TestimonialCard({
  initials,
  name,
  city,
  quote,
  school,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="p-6 rounded-2xl bg-white border border-hair shadow-[0_4px_24px_rgba(148,163,184,0.1)] hover:shadow-[0_12px_40px_rgba(148,163,184,0.18)] hover:border-[#3B82F6]/30 transition-all duration-300 flex flex-col"
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-gold" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-ink-2 leading-relaxed flex-1 mb-5">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-oxblood to-forest flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-white">{initials}</span>
        </div>
        <div>
          <p className="font-semibold text-sm text-ink">{name}</p>
          <p className="text-xs text-pencil">
            {school ? `Admitted to ${school}` : city}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
