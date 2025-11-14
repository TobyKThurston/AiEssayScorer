import { motion } from "motion/react";
import { PricingCard } from "./PricingCard";

export function Pricing() {
  const plans = [
    {
      title: "Starter",
      price: "Free",
      features: [
        "1 essay review",
        "Structure score",
        "Basic edits"
      ],
      ctaText: "Start free",
      highlighted: false
    },
    {
      title: "Pro",
      price: "$19",
      period: "per month",
      features: [
        "Unlimited reviews",
        "Regional tailoring",
        "Line-by-line edits",
        "Risk guardrails"
      ],
      ctaText: "Upgrade to Pro",
      highlighted: true
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2>Simple, transparent pricing</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              ctaText={plan.ctaText}
              highlighted={plan.highlighted}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 text-[#64748B]"
        >
          <small>30-day money-back guarantee. Cancel anytime.</small>
        </motion.p>
      </div>
    </section>
  );
}