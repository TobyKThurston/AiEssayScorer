import { motion } from "motion/react";
import { Accordion } from "./Accordion";

export function FAQ() {
  const faqs = [
    {
      question: "What is Ivy Admit?",
      answer: "Ivy Admit is an essay review and strategy tool for selective college admissions. You upload a draft or prompt, receive scores for structure, evidence, and tone, and get specific edit suggestions. It is built by students admitted to Ivy League schools and does not write essays for you."
    },
    {
      question: "How does it improve my application?",
      answer: "It analyzes drafts against patterns in successful applications and returns a structure score, line-by-line suggestions, and an evidence checklist. Regional tailoring helps match style preferences of your assigned reading team."
    },
    {
      question: "Is it allowed and ethical?",
      answer: "Yes. Ivy Admit is an editing and coaching tool. You remain the author and approve every change. The tool avoids ghostwriting and focuses on clarity, structure, and evidence so your submission remains original."
    },
    {
      question: "Do you store or sell my data?",
      answer: "Your drafts are private to your account, stored securely, and never sold. You can delete documents and associated metadata at any time from settings."
    },
    {
      question: "How fast are reviews?",
      answer: "Most first-pass analyses return in under a minute. Deep rewrite suggestions generate within a few minutes for standard-length drafts."
    },
    {
      question: "Pricing and cancellation",
      answer: "Starter is free with limited reviews. Pro is a monthly plan with unlimited reviews, regional tailoring, and risk guardrails. You can cancel anytime from billing. First-time Pro purchases are refundable within 7 days if no more than one full review was used."
    },
    {
      question: "Counselor/teacher use",
      answer: "Yes. Team seats support shared folders, role-based access, and comment threads so counselors can manage multiple students."
    },
    {
      question: "Does it work beyond Ivy schools?",
      answer: "Yes. The structure and evidence checks work for selective schools and scholarship essays. You can set a target school list to adjust tone and topic risk."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2>Frequently asked questions</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}