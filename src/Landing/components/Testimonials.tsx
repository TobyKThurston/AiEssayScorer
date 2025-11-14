import { motion } from "motion/react";
import { TestimonialCard } from "./TestimonialCard";

export function Testimonials() {
  const testimonials = [
    {
      initials: "SK",
      name: "Sarah K.",
      city: "Boston, MA",
      quote: "The regional tone advice made my voice feel natural and focused. My essay finally had a real arc."
    },
    {
      initials: "MJ",
      name: "Marcus J.",
      city: "San Francisco, CA",
      quote: "Line-by-line feedback was surgical. I kept my stories but doubled the impact."
    },
    {
      initials: "AL",
      name: "Ava L.",
      city: "New York, NY",
      quote: "Risk guardrails saved me from submitting a topic that would have hurt my chances. Game changer."
    }
  ];

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2>Trusted by high achievers</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              initials={testimonial.initials}
              name={testimonial.name}
              city={testimonial.city}
              quote={testimonial.quote}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}