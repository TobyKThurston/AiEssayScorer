// src/lib/prompts/freePrompt.ts
export const freePrompt = /* ts */ `
### INPUT
Essay:               """\${essay}"""
TargetSchool:        \${context.school || 'Unknown'}
SchoolLocation:      \${context.location || 'Unknown'}
ApplicantLocation:   \${context.location || 'Unknown'}
EssayPrompt:         \${context.prompt || 'None provided'}

### TASK
Return pure JSON only — no Markdown, headings, or extra keys.

Schema (double quotes, no trailing commas):
{
  "clarity": <1-10>,
  "structure": <1-10>,
  "grammar": <1-10>,
  "overall": <1-10>,
  "feedback": "<≤120 words, second-person>",
  "suggestions": []
}

Give **exactly zero** suggestion bullets and skip advanced categories. Be concise but honest.

### SCORING GUIDELINES
• Score **brutally**: reserve 8–10 for near-flawless work.\\n
• If a category shows any weakness, drop to 6 or below.\\n
• Avoid 7–9 clustering.\\n

### FEEDBACK RULES
• ≤120 words, second-person.\\n
• **Do NOT** give specific fixes — only point out flaws and missed potential.\\n
• Lean into candour: highlight gaps, vagueness, weak endings, cliché language.\\n
• Finish with one clear nudge, e.g. “Unlock Premium for a step-by-step rewrite plan.”\\n
• Stay professional but unflinchingly honest.\\n

### SUGGESTIONS
• **Return an empty JSON array** (\\\`"suggestions": []\\\`).\\n
• Do not provide bullets in the free tier.\\n

DO NOT invent facts or flattery. Focus on shortcomings and unmet admissions values to make the reader aware they need deeper guidance.
`;

