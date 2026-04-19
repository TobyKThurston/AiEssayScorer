export interface EssayType {
  slug: string;
  shortName: string;
  displayName: string;
  description: string;
  contextForAi: string;
  typicalWordLimit: string;
  seoKeywords: string[];
}

export const essayTypes: EssayType[] = [
  {
    slug: "personal-statement",
    shortName: "Personal Statement",
    displayName: "Personal Statement Scorer",
    description: "The 650-word Common App personal statement, usually the backbone of a US college application.",
    contextForAi: "This is a Common App personal statement (up to 650 words). Grade specifically for: whether the essay reveals character and values, whether it shows growth or reflection, whether the voice is distinct, and whether concrete scene details replace telling.",
    typicalWordLimit: "up to 650 words",
    seoKeywords: ["personal statement scorer", "common app personal statement review", "college essay rater"],
  },
  {
    slug: "why-us",
    shortName: "Why Us",
    displayName: "Why Us Essay Scorer",
    description: "The school-specific supplemental that asks why this college. Usually 100 to 400 words.",
    contextForAi: "This is a Why This College supplemental. Grade specifically for: specificity to the named school (professors, courses, programs, campus culture), whether fit feels earned not researched, and whether the student shows something concrete they would contribute.",
    typicalWordLimit: "100 to 400 words",
    seoKeywords: ["why us essay scorer", "why this college essay review", "why school essay grader"],
  },
  {
    slug: "diversity",
    shortName: "Diversity",
    displayName: "Diversity Essay Scorer",
    description: "The identity or diversity supplemental, asking what you bring to a community.",
    contextForAi: "This is a diversity or identity supplemental. Grade specifically for: avoiding cliches (immigrant story, 'different perspective'), showing specific lived experience over generalized identity talk, and avoiding a self-centered framing of others.",
    typicalWordLimit: "150 to 300 words",
    seoKeywords: ["diversity essay scorer", "identity essay review", "community essay grader"],
  },
  {
    slug: "challenge",
    shortName: "Challenge",
    displayName: "Challenge Essay Scorer",
    description: "The obstacle, setback, or failure essay. Common App #2 and many supplementals.",
    contextForAi: "This is a challenge, obstacle, or failure essay. Grade specifically for: whether the focus stays on response and learning (not the challenge itself), whether the stakes are authentic not inflated, and whether growth is shown through behavior not declared in an epiphany.",
    typicalWordLimit: "250 to 650 words",
    seoKeywords: ["challenge essay scorer", "obstacle essay review", "failure essay grader"],
  },
  {
    slug: "extracurricular",
    shortName: "Extracurricular",
    displayName: "Extracurricular Essay Scorer",
    description: "The elaborate-on-your-activity essay. Harvard, Yale, and other top schools all ask this.",
    contextForAi: "This is an elaborate-on-an-extracurricular essay. Grade specifically for: showing what you actually did (verbs, artifacts, outcomes), revealing character through the activity not claiming it, and avoiding a resume rehash.",
    typicalWordLimit: "150 to 250 words",
    seoKeywords: ["extracurricular essay scorer", "activity essay review", "elaborate on activity grader"],
  },
  {
    slug: "community",
    shortName: "Community",
    displayName: "Community Essay Scorer",
    description: "The community-contribution essay, including MIT's supplemental and many others.",
    contextForAi: "This is a community or contribution essay. Grade specifically for: a clear, specific community (not 'society'), what the student did (not intended), and whether the action respected the community's agency.",
    typicalWordLimit: "200 to 300 words",
    seoKeywords: ["community essay scorer", "contribution essay review", "community supplemental grader"],
  },
  {
    slug: "leadership",
    shortName: "Leadership",
    displayName: "Leadership Essay Scorer",
    description: "Leadership-focused prompts like UC PIQ #1 and many supplementals.",
    contextForAi: "This is a leadership essay. Grade specifically for: showing leadership through a specific moment or decision (not a title), how others were affected, and whether the student took ownership of mistakes and iteration.",
    typicalWordLimit: "250 to 350 words",
    seoKeywords: ["leadership essay scorer", "leadership essay review", "leadership supplemental grader"],
  },
  {
    slug: "creative",
    shortName: "Creative",
    displayName: "Creative Essay Scorer",
    description: "Stanford Short Takes, UChicago quirky prompts, and other creative supplementals.",
    contextForAi: "This is a creative or unusual supplemental. Grade specifically for: answering the literal prompt, revealing something real about the student underneath the cleverness, and not prioritizing wit over substance.",
    typicalWordLimit: "50 to 300 words",
    seoKeywords: ["creative essay scorer", "stanford short takes review", "uchicago essay grader"],
  },
  {
    slug: "extracurricular-activity-150",
    shortName: "150-Char Activity",
    displayName: "Common App Activity Description Scorer (150 chars)",
    description: "The Common App activities section, where each entry is capped at 150 characters.",
    contextForAi: "This is a Common App activity description (strict 150-character limit). Grade specifically for: strong past-tense verbs, concrete numbers (people, hours, dollars), no filler words, and character count compliance. Penalize heavily if over 150 characters.",
    typicalWordLimit: "150 characters",
    seoKeywords: ["common app activity scorer", "150 character activity review", "activity description grader"],
  },
  {
    slug: "short-answer",
    shortName: "Short Answer",
    displayName: "Short Answer Essay Scorer",
    description: "Supplemental prompts under 150 words, where every line must earn its place.",
    contextForAi: "This is a short supplemental answer (under 150 words). Grade specifically for: a single clear point, no throat-clearing, and a last line that resonates.",
    typicalWordLimit: "50 to 150 words",
    seoKeywords: ["short answer essay scorer", "short supplemental review", "short essay grader"],
  },
];

export function getEssayType(slug: string): EssayType | undefined {
  return essayTypes.find((t) => t.slug === slug);
}
