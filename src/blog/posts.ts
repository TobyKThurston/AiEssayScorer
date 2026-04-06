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
