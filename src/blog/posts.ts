export interface Post {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  readTime: string;
}

export const posts: Post[] = [
  {
    slug: "how-to-write-common-app-essay",
    title: "How to Write the Common App Personal Statement (2025–26)",
    description:
      "A step-by-step guide to writing a powerful Common App personal statement, from choosing the right prompt to final edits. Includes tips from admitted students and common mistakes to avoid.",
    publishedAt: "2025-10-14",
    category: "Writing Guides",
    readTime: "9 min read",
  },
  {
    slug: "common-app-essay-prompts-2025",
    title: "Common App Essay Prompts 2025–26: Which One to Choose?",
    description:
      "Breaking down all 7 Common App essay prompts for 2025–2026, what each one means, which students it suits best, and how to pick the prompt that gives your story the most room to breathe.",
    publishedAt: "2025-11-03",
    category: "Common App",
    readTime: "7 min read",
  },
  {
    slug: "why-this-college-essay",
    title: "How to Write the 'Why This College' Essay (With Examples)",
    description:
      "The 'Why This College' supplemental is where most applicants fall flat. Learn the formula that top-admitted students use, with real examples of what works and what reads as generic filler.",
    publishedAt: "2025-12-09",
    category: "Supplemental Essays",
    readTime: "6 min read",
  },
  {
    slug: "ivy-league-essay-tips",
    title: "What Ivy League Admissions Officers Look for in Essays",
    description:
      "Analysis of patterns across hundreds of accepted essays reveals what Harvard, Yale, Princeton, and peers really want, and the mistakes that get even strong applicants rejected.",
    publishedAt: "2026-01-22",
    category: "Ivy League",
    readTime: "8 min read",
  },
  {
    slug: "college-essay-word-limit",
    title: "The 650-Word College Essay: How to Write More With Less",
    description:
      "Most students either pad to hit the limit or cut so aggressively the essay loses its voice. Here's how to write a tight, powerful personal statement that uses every word intentionally.",
    publishedAt: "2026-02-15",
    category: "Writing Guides",
    readTime: "5 min read",
  },
  {
    slug: "columbia-why-columbia-essay-core-curriculum",
    title: "Columbia 'Why Columbia' Essay: How to Write About the Core Curriculum",
    description:
      "Columbia's Why Essay isn't a generic supplemental — it tests whether you actually understand the Core Curriculum and want what it demands. Here's what works, what doesn't, and the single line that separates strong Columbia supplements from forgettable ones.",
    publishedAt: "2026-03-10",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "columbia-list-essay-what-are-you-reading",
    title: "Columbia List Essay: How to Answer 'What Are You Reading, Listening To, Thinking About?'",
    description:
      "Columbia's list question is the most underrated part of the application. Admissions officers use it to see who you are when no one is assigning you anything. Here's exactly what to include — and the mistakes that make lists look curated rather than real.",
    publishedAt: "2026-03-24",
    category: "Supplemental Essays",
    readTime: "7 min read",
  },
  {
    slug: "harvard-intellectual-experience-essay",
    title: "Harvard Intellectual Experience Essay: How to Answer 'Briefly Describe an Intellectual Experience That Was Important to You'",
    description:
      "Harvard's 200-word intellectual experience prompt is the hardest short answer in the application. Here's what admissions readers are actually screening for, the four-part structure that fits the word limit, and the single sentence that almost always separates strong Harvard supplements from forgettable ones.",
    publishedAt: "2026-04-02",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "harvard-roommate-essay-top-3-things",
    title: "Harvard Roommate Essay: How to Write the 'Top 3 Things Your Roommates Might Like to Know About You'",
    description:
      "Harvard's roommate prompt is the most underestimated short answer in the application. It's the one place where admissions officers give you permission to drop the academic register — and the place where listing accomplishments actively hurts you. Here's what works and why.",
    publishedAt: "2026-04-05",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "harvard-how-use-education-future-essay",
    title: "Harvard 'How Do You Hope to Use Your Harvard Education in the Future?' Essay Guide",
    description:
      "Most Harvard future essays fail in the same two ways: performing ambition instead of describing a specific problem, or faking decade-long certainty about a career. Here's the structure that separates credible future essays from the Impact Sentence everyone else is writing.",
    publishedAt: "2026-04-08",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "yale-why-yale-essay-125-words",
    title: "Yale 'Why Yale' Essay: How to Write a 125-Word Supplement That Actually Works",
    description:
      "Yale's Why essay is the tightest in the Ivy League at 125 words. Here's what admissions readers screen for, the three-move structure that fits the word count, and the single test that reveals whether your essay is too generic to work.",
    publishedAt: "2026-04-09",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "yale-teach-a-course-essay",
    title: "Yale 'You Are Teaching a Yale Course. What Is It Called?' Short Answer Guide",
    description:
      "Yale's 200-character course title prompt is the most distinctive short answer in Ivy League admissions. Here's how to turn an intellectual obsession into a course title admissions readers actually remember — and how to avoid the jokes and generic labels that sink most attempts.",
    publishedAt: "2026-04-09",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "yale-community-essay",
    title: "Yale Community Essay: How to Answer 'Reflect on Your Membership in a Community'",
    description:
      "Yale's 400-word community essay is the Ivy League supplement most often mistaken for a diversity prompt. It isn't. Here's what Yale readers actually weight, the four-phase structure that works at 400 words, and the sentence that signals a strong community essay.",
    publishedAt: "2026-04-09",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "dartmouth-why-dartmouth-100-words",
    title: "Dartmouth 'Why Dartmouth' Essay: How to Write the Tightest Why Essay in the Ivy League (100 Words)",
    description:
      "Dartmouth's 100-word Why essay is the shortest supplemental at any Ivy. Here's the two-move structure that fits the limit, the D-Plan mistake most applicants make, and the school-swap test that reveals whether your essay is specific enough to work.",
    publishedAt: "2026-04-09",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "dartmouth-let-your-life-speak-essay",
    title: "Dartmouth 'Let Your Life Speak' Essay: How to Write the Quaker-Saying Supplement",
    description:
      "Dartmouth's 'Let Your Life Speak' prompt is built around a specific Quaker principle most applicants miss. Here's what the phrase actually means, the three-move structure that fits 250 words, and why the strongest essays contain no thesis statement at all.",
    publishedAt: "2026-04-09",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "dartmouth-dr-seuss-think-and-wonder-essay",
    title: "Dartmouth Dr. Seuss 'Think and Wonder, Wonder and Think' Essay Guide",
    description:
      "Dartmouth's Dr. Seuss prompt is the only Ivy League essay that actively rewards unresolved thinking. Here's what 'what's on your mind?' is really asking, why resolving the question is the worst thing you can do, and the four-move structure that works at 250 words.",
    publishedAt: "2026-04-09",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
