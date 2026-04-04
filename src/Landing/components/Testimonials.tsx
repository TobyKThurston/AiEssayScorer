"use client";

import { motion } from "motion/react";
import { TestimonialCard } from "./TestimonialCard";

export function Testimonials() {
  const testimonials = [
    {
      initials: "SK",
      name: "Sarah K.",
      city: "Boston, MA",
      school: "Harvard",
      quote:
        "The regional tone advice made my voice feel natural and focused. My essay finally had a real arc — and it actually got me in.",
    },
    {
      initials: "MJ",
      name: "Marcus J.",
      city: "San Francisco, CA",
      school: "Yale",
      quote:
        "Line-by-line feedback was surgical. I kept my stories but doubled the impact. Went from 74 to 91 after two revision cycles.",
    },
    {
      initials: "AL",
      name: "Ava L.",
      city: "New York, NY",
      school: "Princeton",
      quote:
        "Risk guardrails saved me from submitting a topic that would have hurt my chances. Ivy Admit flagged it before I even considered changing it.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-3">
            Student Success
          </p>
          <h2>Trusted by high achievers</h2>
          <p className="text-[#64748B] mt-3 max-w-xl mx-auto">
            Students who used Ivy Admit improved their essay scores by an average
            of 18 points.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              initials={testimonial.initials}
              name={testimonial.name}
              city={testimonial.city}
              school={testimonial.school}
              quote={testimonial.quote}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
