export const freePrompt = /* ts */ `
### INPUT
Essay:               """\${essay}"""
TargetSchool:        \${context.school || 'Unknown'}
SchoolLocation:      \${context.location || 'Unknown'}
ApplicantLocation:   \${context.location || 'Unknown'}
EssayPrompt:         \${context.prompt || 'None provided'}

### TASK
Return pure JSON only.

Schema:
{
  "clarity": <1-10>,
  "structure": <1-10>,
  "grammar": <1-10>,
  "overall": <1-10>,
  "feedback": "<≤120 words>",
  "suggestions": ["<≤80-word bullet 1>", "<≤80-word bullet 2>"]
}

Give **exactly two** suggestion bullets and skip advanced categories. Be concise but honest.
`;
