export interface Tool {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  seoDescription: string;
  category: "Brainstorming" | "Analysis" | "Editing" | "Planning";
  outputStyle: "streaming" | "structured";
  keywords: string[];
}

export const tools: Tool[] = [
  {
    slug: "essay-hook-generator",
    title: "College Essay Hook Generator",
    shortTitle: "Hook Generator",
    description:
      "Paste your essay topic and get 5 original opening hooks in 3 different styles, instantly. Free, no signup.",
    seoDescription:
      "Free AI college essay hook generator. Get 5 original opening lines in narrative, reflective, and bold-statement styles, instantly. No signup required.",
    category: "Brainstorming",
    outputStyle: "streaming",
    keywords: [
      "college essay hook generator",
      "essay opening line generator",
      "how to start a college essay",
      "essay hook examples",
    ],
  },
  {
    slug: "prompt-deconstructor",
    title: "Supplemental Essay Prompt Deconstructor",
    shortTitle: "Prompt Deconstructor",
    description:
      "Paste any supplemental essay prompt and get a structured breakdown: what they're really asking, what to avoid, and angles that stand out.",
    seoDescription:
      "Free tool that breaks down any college supplemental essay prompt. See the hidden question, what admissions officers look for, and angles that work.",
    category: "Analysis",
    outputStyle: "structured",
    keywords: [
      "supplemental essay prompt analyzer",
      "college essay prompt breakdown",
      "how to answer supplemental essays",
      "why this college prompt",
    ],
  },
  {
    slug: "activity-rewriter",
    title: "Common App Activity Description Rewriter",
    shortTitle: "Activity Rewriter",
    description:
      "Rewrite your Common App activity descriptions into tight, powerful 150-character entries that show impact, scale, and specificity.",
    seoDescription:
      "Free Common App activity description generator. Transforms weak activity entries into punchy, 150-character descriptions that impress admissions officers.",
    category: "Editing",
    outputStyle: "structured",
    keywords: [
      "common app activity description",
      "activity description generator",
      "common app activities section",
      "college application activities",
    ],
  },
  {
    slug: "show-dont-tell",
    title: "Show, Don't Tell Converter",
    shortTitle: "Show Don't Tell",
    description:
      "Paste a sentence that tells (I was nervous, it was beautiful, she was kind) and get vivid, sensory rewrites that show instead.",
    seoDescription:
      "Free show don't tell converter for college essays. Paste a telling sentence, get vivid scene-based rewrites that admissions officers actually remember.",
    category: "Editing",
    outputStyle: "streaming",
    keywords: [
      "show don't tell essay",
      "show dont tell examples",
      "college essay show don't tell",
      "descriptive writing converter",
    ],
  },
  {
    slug: "cliche-detector",
    title: "Essay Cliché Detector",
    shortTitle: "Cliché Detector",
    description:
      "Scan your essay for the 30+ clichés admissions officers are sick of: mission trip epiphanies, 'ever since I was young,' 'passion for helping others.'",
    seoDescription:
      "Free college essay cliché detector. Paste your draft and find the overused phrases, tropes, and openings that make admissions officers stop reading.",
    category: "Analysis",
    outputStyle: "structured",
    keywords: [
      "college essay clichés",
      "essay cliche detector",
      "common app essay clichés",
      "overused essay topics",
    ],
  },
  {
    slug: "why-college-brainstormer",
    title: "\"Why This College\" Essay Brainstormer",
    shortTitle: "Why College Brainstormer",
    description:
      "Paste your intended major and interests plus a school name. Get specific professors, programs, courses, and campus details to weave into your Why essay.",
    seoDescription:
      "Free Why This College essay brainstormer. Turns your major and interests into specific professors, courses, clubs, and programs to mention.",
    category: "Brainstorming",
    outputStyle: "structured",
    keywords: [
      "why this college essay examples",
      "why this college brainstorm",
      "why us essay generator",
      "college supplemental essay ideas",
    ],
  },
  {
    slug: "essay-topic-generator",
    title: "College Essay Topic Generator",
    shortTitle: "Topic Generator",
    description:
      "Describe your background, quirks, and interests. Get 5 personal statement topic ideas that are specific to your life, not generic advice.",
    seoDescription:
      "Free college essay topic generator. Input your interests and background, get 5 personal statement ideas tailored to your story, not generic prompts.",
    category: "Brainstorming",
    outputStyle: "structured",
    keywords: [
      "college essay topic ideas",
      "personal statement topics",
      "common app essay ideas",
      "what to write my college essay about",
    ],
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
