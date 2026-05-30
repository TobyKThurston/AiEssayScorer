export type FaqItem = { q: string; a: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How accurate are the odds?",
    a: "Each school's percentage is generated from recent published admit data and your full profile — test scores, GPA, activity depth and tier, geography, and context. It's a calibrated statistical estimate, not a guarantee of admission, and we tell you plainly when a school is a genuine reach.",
  },
  {
    q: "What exactly do I get for $7/month?",
    a: "Your exact admit % and Reach/Match/Safety tier for every school you picked, unblurred, plus a per-factor breakdown of what's helping you, what's quietly hurting, and the single biggest lever to pull before you apply. It also unlocks unlimited essay grading and every admissions tool we ship.",
  },
  {
    q: "Can I cancel anytime — and is my money safe?",
    a: "Yes. Cancel in one click from billing; access runs to the end of the period. Pro is backed by a 30-day money-back guarantee — if the forecast isn't useful, reply to your receipt and we refund you, no forms. Payments are processed securely by Stripe.",
  },
  {
    q: "Why are my odds blurred until I unlock?",
    a: "We compute your real percentage for every school the moment you finish the worksheet — the numbers genuinely exist. Unlocking ($7/mo) reveals the exact figures and the per-factor breakdown. We never show a fake number behind the blur; the value you unlock is the value the model produced.",
  },
  {
    q: "Do I have to write an essay to use this?",
    a: "No. The odds calculator runs from your stats and target list alone — enter your scores, GPA, activities and schools to get a per-school admit % in about a minute. Adding essays later (included in Pro) sharpens the picture but is never required.",
  },
  {
    q: "Does it work for non-Ivy schools?",
    a: "Yes. The model covers selective US colleges across our list — Ivies, top private and public flagships, liberal arts colleges, and STEM-focused schools. Pick up to ten and you get an individual admit estimate and tier for each.",
  },
  {
    q: "Where does the data come from, and is my information private?",
    a: "Odds draw on recent published admissions data and selectivity for each school in our list. Your profile and any drafts are private to your account, encrypted at rest, never sold, and you can delete your account at any time.",
  },
];
