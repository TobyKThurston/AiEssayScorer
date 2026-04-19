export interface Rewriter {
  slug: string;
  shortName: string;
  displayName: string;
  seoDescription: string;
  instruction: string;
  kind: "cut" | "expand" | "tighten" | "tone";
  targetWords?: number;
  seoKeywords: string[];
}

export const rewriters: Rewriter[] = [
  {
    slug: "cut-essay-to-150-words",
    shortName: "Cut to 150 words",
    displayName: "Cut My Essay to 150 Words",
    seoDescription: "Free AI tool that tightens your essay to 150 words while preserving your voice, specific details, and emotional core.",
    instruction: "Rewrite the essay so it lands at exactly 150 words or fewer. Preserve the writer's voice, concrete details, and emotional core. Cut adverbs, filler, and redundant setup before touching scene details.",
    kind: "cut",
    targetWords: 150,
    seoKeywords: ["cut essay to 150 words", "shorten college essay", "150 word essay rewriter"],
  },
  {
    slug: "cut-essay-to-250-words",
    shortName: "Cut to 250 words",
    displayName: "Cut My Essay to 250 Words",
    seoDescription: "Free AI tool that tightens your college essay to exactly 250 words for supplemental essays and Why Us responses.",
    instruction: "Rewrite the essay so it lands at exactly 250 words or fewer. Preserve voice, concrete details, and emotional core. Cut filler and generic lines first.",
    kind: "cut",
    targetWords: 250,
    seoKeywords: ["cut essay to 250 words", "shorten to 250 words", "250 word supplemental rewriter"],
  },
  {
    slug: "cut-essay-to-350-words",
    shortName: "Cut to 350 words",
    displayName: "Cut My Essay to 350 Words",
    seoDescription: "Free AI tool that tightens your essay to 350 words for UC personal insight questions and mid-length supplementals.",
    instruction: "Rewrite the essay so it lands at exactly 350 words or fewer. Preserve voice, concrete details, and emotional core. Cut filler first.",
    kind: "cut",
    targetWords: 350,
    seoKeywords: ["cut essay to 350 words", "UC PIQ 350 word rewriter", "350 word essay shortener"],
  },
  {
    slug: "cut-essay-to-500-words",
    shortName: "Cut to 500 words",
    displayName: "Cut My Essay to 500 Words",
    seoDescription: "Free AI tool that tightens your essay to 500 words for supplementals with a 500-word limit.",
    instruction: "Rewrite the essay so it lands at exactly 500 words or fewer. Preserve voice, concrete details, and emotional core.",
    kind: "cut",
    targetWords: 500,
    seoKeywords: ["cut essay to 500 words", "shorten to 500 words", "500 word essay rewriter"],
  },
  {
    slug: "cut-essay-to-650-words",
    shortName: "Cut to 650 words",
    displayName: "Cut My Essay to 650 Words",
    seoDescription: "Free AI tool that tightens your personal statement to the Common App 650-word limit.",
    instruction: "Rewrite the essay so it lands at exactly 650 words or fewer. Preserve voice, concrete details, and emotional core. This is the Common App personal statement limit.",
    kind: "cut",
    targetWords: 650,
    seoKeywords: ["cut essay to 650 words", "common app 650 word rewriter", "personal statement shortener"],
  },
  {
    slug: "expand-essay-to-500-words",
    shortName: "Expand to 500 words",
    displayName: "Expand My Essay to 500 Words",
    seoDescription: "Free AI tool that expands a short draft to 500 words by adding scene, reflection, and concrete detail, not filler.",
    instruction: "Rewrite the essay to reach roughly 500 words. Expand by adding scene detail, reflection, and concrete examples. Do not add generic transitions, filler, or new claims that aren't grounded in the existing draft.",
    kind: "expand",
    targetWords: 500,
    seoKeywords: ["expand essay to 500 words", "lengthen college essay", "500 word essay expander"],
  },
  {
    slug: "expand-essay-to-650-words",
    shortName: "Expand to 650 words",
    displayName: "Expand My Essay to 650 Words",
    seoDescription: "Free AI tool that grows a short draft into a full 650-word Common App personal statement with real scene and reflection.",
    instruction: "Rewrite the essay to reach roughly 650 words. Expand by deepening scene, adding reflection, or drawing out a second beat. Do not add filler, empty transitions, or generic claims.",
    kind: "expand",
    targetWords: 650,
    seoKeywords: ["expand essay to 650 words", "common app essay lengthener", "650 word expander"],
  },
  {
    slug: "tighten-essay-10-percent",
    shortName: "Tighten by 10%",
    displayName: "Tighten My Essay by 10 Percent",
    seoDescription: "Free AI tool that trims 10 percent of your essay length while preserving voice and the strongest lines.",
    instruction: "Rewrite the essay so the word count drops by roughly 10 percent. Cut adverbs, clauses that repeat an earlier idea, and transitional filler. Preserve the best line of each paragraph.",
    kind: "tighten",
    seoKeywords: ["tighten my college essay", "trim essay 10 percent", "shorten essay without losing voice"],
  },
  {
    slug: "make-essay-more-specific",
    shortName: "Make more specific",
    displayName: "Make My Essay More Specific",
    seoDescription: "Free AI tool that rewrites vague essay lines into concrete, specific detail without inventing facts.",
    instruction: "Rewrite the essay to replace vague, telling lines with more concrete detail. Only add specificity the original draft implies. Do not invent new facts, names, or events. Flag any line where the draft is too vague to rewrite and suggest what the student should add.",
    kind: "tone",
    seoKeywords: ["make essay more specific", "essay specificity rewriter", "show don't tell rewriter"],
  },
  {
    slug: "make-essay-more-personal",
    shortName: "Make more personal",
    displayName: "Make My Essay More Personal",
    seoDescription: "Free AI tool that pulls a generic essay toward first-person voice, lived detail, and your real emotional stakes.",
    instruction: "Rewrite the essay to feel more personal. Lean into first-person voice, interior thought, and small sensory detail. Strip out generalized claims about 'the world' or 'people'. Do not fabricate lived experiences. If a line is too generic to rewrite, suggest what the student could add.",
    kind: "tone",
    seoKeywords: ["make essay more personal", "essay voice rewriter", "personal college essay rewriter"],
  },
  {
    slug: "make-essay-more-formal",
    shortName: "Make more formal",
    displayName: "Make My Essay More Formal",
    seoDescription: "Free AI tool that raises the formality of a college essay without making it stiff. Preserves voice, removes slang and filler.",
    instruction: "Rewrite the essay to be more formal in register. Remove slang, casual contractions where they weaken a sentence, and colloquialisms. Do not make it stiff or remove personality entirely. Keep strong verbs. If a passage is intentionally voicey, preserve it.",
    kind: "tone",
    seoKeywords: ["make essay more formal", "formal essay rewriter", "college essay formality"],
  },
  {
    slug: "add-humor-to-essay",
    shortName: "Add humor",
    displayName: "Add Humor to My Essay",
    seoDescription: "Free AI tool that adds subtle, voice-consistent humor to a college essay without undercutting the emotional stakes.",
    instruction: "Rewrite the essay to include subtle humor consistent with the writer's voice. Humor should come from specific, honest observation (not jokes or wordplay). Never undercut a serious emotional moment with a punchline. If the essay's tone is fundamentally serious, add only 1 or 2 small moments of lightness.",
    kind: "tone",
    seoKeywords: ["add humor to college essay", "funny essay rewriter", "college essay humor"],
  },
  {
    slug: "make-essay-more-vivid",
    shortName: "Make more vivid",
    displayName: "Make My Essay More Vivid",
    seoDescription: "Free AI tool that replaces abstract lines with specific sensory detail. Sight, sound, touch, the small stuff that makes a draft memorable.",
    instruction: "Rewrite the essay to be more vivid. Replace abstract or summary lines with sensory detail (what was seen, heard, smelled, felt). Only add detail the original draft implies. Do not invent facts. If the writer's voice is minimal on purpose, preserve the restraint.",
    kind: "tone",
    seoKeywords: ["make essay more vivid", "vivid writing rewriter", "sensory detail essay"],
  },
  {
    slug: "make-essay-more-academic",
    shortName: "Make more academic",
    displayName: "Make My Essay More Academic",
    seoDescription: "Free AI tool that sharpens reasoning and precision in academic-focused essays (Why Major, STEM, intellectual curiosity prompts).",
    instruction: "Rewrite the essay to be more intellectually precise. Replace hand-wavy language with specific claims, name ideas and methods accurately, and favor analytical over emotional framing where appropriate. Do not make it dry. Preserve voice. Do not invent knowledge or citations.",
    kind: "tone",
    seoKeywords: ["make essay more academic", "academic essay rewriter", "intellectual essay rewrite"],
  },
  {
    slug: "add-reflection-to-essay",
    shortName: "Add reflection",
    displayName: "Add Reflection to My Essay",
    seoDescription: "Free AI tool that deepens an essay's reflective layer. Turns 'what happened' into 'what it meant' without cliches.",
    instruction: "Rewrite the essay to strengthen its reflective layer. Add specific reflection on what a moment meant, changed, or revealed. Avoid cliched reflection (realized, learned, grew). Only reflect on what is grounded in the events of the essay. If the draft already has enough reflection, mark it.",
    kind: "tone",
    seoKeywords: ["add reflection to essay", "reflection rewriter", "college essay reflection"],
  },
  {
    slug: "cut-activity-to-150-chars",
    shortName: "Cut activity to 150 chars",
    displayName: "Cut My Activity Description to 150 Characters",
    seoDescription: "Free AI tool that rewrites a Common App activity description into a strict 150-character line with strong verbs and concrete numbers.",
    instruction: "Rewrite the activity description as a single line at or under 150 characters (including spaces). Use strong past-tense verbs. Include any specific numbers (people served, dollars raised, hours, percent change) from the draft. Drop filler words. Output only the rewritten description and its final character count.",
    kind: "cut",
    seoKeywords: ["150 character activity rewriter", "common app activity shortener", "activity description tightener"],
  },
];

export function getRewriter(slug: string): Rewriter | undefined {
  return rewriters.find((r) => r.slug === slug);
}
