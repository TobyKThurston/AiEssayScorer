export const premiumPrompt = /* ts */ `
### INPUT
Essay:               """\${essay}"""
TargetSchool:        \${context.school || 'Unknown'}
SchoolLocation:      \${context.location || 'Unknown'}
ApplicantLocation:   \${context.location || 'Unknown'}
EssayPrompt:         \${context.prompt || 'None provided'}
ExtraContext:        \${context.extra || '—'}

### TASK
Return pure JSON only — no Markdown, headings, or extra keys.

…PASTE YOUR FULL DELUXE PROMPT TEXT HERE…
`;
