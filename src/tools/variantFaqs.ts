import type { EssayPrompt } from "@/tools/prompts";
import type { EssayType } from "@/tools/essayTypes";
import type { Rewriter } from "@/tools/rewriters";
import type { TopicPersona } from "@/tools/topicPersonas";

export interface FAQ {
  question: string;
  answer: string;
}

export function faqsForHookPrompt(prompt: EssayPrompt): FAQ[] {
  return [
    {
      question: `How long should the hook for ${prompt.shortName} be?`,
      answer: `Aim for 1 to 2 sentences, under 40 words. The ${prompt.shortName} has a ${prompt.wordLimit}-word limit, and spending more than a sentence on the opener steals real estate from the rest of your argument.`,
    },
    {
      question: `What kind of hook works best for the ${prompt.family} prompts?`,
      answer: `For ${prompt.family} prompts, the strongest openers drop you into a specific scene or make a small concrete claim the rest of the essay earns. Avoid dictionary-style definitions, famous quotes, and anything you could imagine someone else writing.`,
    },
    {
      question: `Can I use the same hook for different schools?`,
      answer: `Yes, if the hook responds to the topic rather than the school. A hook for the ${prompt.shortName} often transfers well to similar prompts at other schools, but adjust any school-specific language.`,
    },
    {
      question: `How specific should I get in a 40-word hook?`,
      answer: `Very specific. Name the place, name the thing, use the weird detail. Specificity is what separates memorable ${prompt.shortName} openings from the 80 percent that blur together.`,
    },
    {
      question: `Should the hook give away the ending of my essay?`,
      answer: `Usually no. A good ${prompt.shortName} hook makes the reader want the next paragraph. If your opening summarizes your whole thesis, you've lost your reason to keep reading.`,
    },
  ];
}

export function faqsForDeconstructPrompt(prompt: EssayPrompt): FAQ[] {
  return [
    {
      question: `What is the ${prompt.shortName} actually asking?`,
      answer: `The ${prompt.shortName} (${prompt.family}, ${prompt.wordLimit}-word limit) literally asks you to respond to a specific prompt, but admissions reads it as a signal of how you think. Run it through the deconstructor to see the hidden question.`,
    },
    {
      question: `How long should my ${prompt.shortName} essay be?`,
      answer: `The official word limit is ${prompt.wordLimit} words. Treat it as firm. Going over is a common cause of admissions fatigue, and staying well under often means you haven't gone deep enough.`,
    },
    {
      question: `Can I answer multiple Common App prompts with one essay?`,
      answer: `No. Pick one prompt and commit. Most applicants write an essay first, then pick the prompt that best frames it. That's fine. What doesn't work is writing an essay that tries to straddle two prompts.`,
    },
    {
      question: `What are the biggest mistakes on the ${prompt.shortName}?`,
      answer: `Generic framing ('I've always been passionate about...'), missing the actual question by answering a related one, padding to reach the word limit, and a last line that summarizes instead of landing. The deconstructor flags these by showing you what admissions reads between the lines.`,
    },
    {
      question: `How much of my ${prompt.shortName} should be reflection versus scene?`,
      answer: `Strong drafts usually land around 60 percent scene and 40 percent reflection for ${prompt.shortName}-length essays. Scene alone reads as a story, reflection alone reads as a personal statement essay on the page. The balance is where voice emerges.`,
    },
  ];
}

export function faqsForEssayType(type: EssayType): FAQ[] {
  return [
    {
      question: `How does this ${type.shortName} scorer evaluate my draft?`,
      answer: `On a 100-point rubric: content (30 pts), structure (25), style and voice (25), specificity (10), and grammar (10). For ${type.shortName.toLowerCase()} essays, we weight specificity and voice more heavily because they're where most drafts underperform.`,
    },
    {
      question: `What length does the ${type.shortName} scorer expect?`,
      answer: `${type.typicalWordLimit}. Drafts significantly shorter than this lose points for depth. Drafts significantly longer lose points for structure and for violating word-limit signals.`,
    },
    {
      question: `How long does the ${type.shortName} scorer take?`,
      answer: `About 30 to 60 seconds. The scorer reads the full draft, applies the rubric, and returns a score, your three biggest strengths, and the single change that would move the draft up a tier.`,
    },
    {
      question: `Is this AI scorer trained on real admissions outcomes?`,
      answer: `The rubric is built from patterns across successful and unsuccessful essays in our corpus. No AI scorer replaces real admissions committees, but a consistent rubric catches structural problems a friend or parent reader often misses.`,
    },
    {
      question: `Will the ${type.shortName} scorer flag the same issues a real reader would?`,
      answer: `For structural issues, yes, usually. For voice issues, often. For the judgment call of whether your essay resonates emotionally with a specific human reader, no AI can replace that. Pair this tool with one trusted human reader.`,
    },
  ];
}

export function faqsForRewriter(rewriter: Rewriter): FAQ[] {
  return [
    {
      question: `Will the ${rewriter.shortName.toLowerCase()} rewriter preserve my voice?`,
      answer: `Yes. The system prompt explicitly instructs the model to keep your voice, strongest details, and emotional core. The rewriter changes the surface (${rewriter.kind === "cut" ? "length and density" : rewriter.kind === "expand" ? "depth and detail" : rewriter.kind === "tighten" ? "tightness" : "tone and precision"}), not the who-you-are layer.`,
    },
    {
      question: `Will the rewriter invent facts that aren't in my draft?`,
      answer: `No. The rewriter is instructed never to invent activities, names, or experiences. If the draft is too vague to rewrite, the tool flags what you need to add rather than making it up.`,
    },
    {
      question: `How is this different from asking ChatGPT to rewrite my essay?`,
      answer: `The difference is constraint. ChatGPT will cheerfully rewrite your essay in a neutral AI voice and quietly invent supporting detail. This rewriter is locked to a ${rewriter.kind === "cut" ? "cut" : rewriter.kind === "expand" ? "expand" : "tone"} instruction, told to preserve voice, and prohibited from fabricating content.`,
    },
    {
      question: `Can I trust the output of ${rewriter.displayName}?`,
      answer: `Treat it as a strong first draft of a revision, not a finished essay. Compare it sentence-by-sentence with your original. Keep what's better, revert what's worse. The rewriter is a tool, not a replacement for your judgment.`,
    },
    {
      question: `How many free runs of the rewriter do I get?`,
      answer: `One free run per day for anonymous users. Create a free account for additional runs, or upgrade to Pro for unlimited rewriter access plus full essay scoring.`,
    },
  ];
}

export function faqsForTopicPersona(persona: TopicPersona): FAQ[] {
  return [
    {
      question: `Why does a ${persona.shortName.toLowerCase()} topic generator work better than a generic one?`,
      answer: `Generic AI topic generators produce the same five ideas for everyone. This version is tuned with ${persona.shortName.toLowerCase()}-specific guardrails: it actively steers away from cliches common to this group and pushes toward the smaller, more specific material that actually makes essays memorable.`,
    },
    {
      question: `Do I have to write about being a ${persona.shortName.toLowerCase()} applicant?`,
      answer: `No. Nothing requires you to center your identity in a college essay. This generator produces topics grounded in your life as a ${persona.shortName.toLowerCase()} applicant, but plenty of strong essays barely mention the category. Write what's honestly on your mind.`,
    },
    {
      question: `How specific should my background input be?`,
      answer: `More specific wins. One concrete detail ('I work 15 hours a week at my family's restaurant prepping bok choy') beats a general claim ('I come from a working-class family'). Specific inputs produce specific topic ideas.`,
    },
    {
      question: `What topics should I definitely avoid as a ${persona.shortName.toLowerCase()} applicant?`,
      answer: `The list varies by group, but the generator's system prompt actively screens for the cliches most common to ${persona.shortName.toLowerCase()} essays (see the tool's 'why generic generators fail' section for the specific ones it avoids).`,
    },
    {
      question: `Can I submit topics from this generator directly?`,
      answer: `No. These are ideas, not essays. Each topic is a seed: an angle and a pitch. You still have to do the drafting, the specificity, and the voice work. A strong topic can produce a weak essay if the writing doesn't land.`,
    },
  ];
}

export function faqsForBaseTool(toolSlug: string): FAQ[] {
  const common: FAQ[] = [
    {
      question: "Is this tool really free?",
      answer: "Yes. One run per day per IP is free with no signup. Create a free account for a few more runs per day, or upgrade to Pro for unlimited use of every tool plus full essay scoring.",
    },
    {
      question: "Do you store the essay I paste in?",
      answer: "No. Inputs are sent to the AI model for this single request and not saved in our database. For logged-in users on the editor, drafts are saved to your account.",
    },
    {
      question: "How is this different from asking ChatGPT?",
      answer: "The system prompts are tuned specifically for college admissions essays and locked to produce structured output with guardrails against invention, preserved voice, and formatting constraints (word limits, character limits, etc.).",
    },
  ];

  const specific: Record<string, FAQ[]> = {
    "essay-hook-generator": [
      {
        question: "How long should a college essay hook be?",
        answer: "Under 40 words, ideally 1 to 2 sentences. The hook's job is to make the reader want the next paragraph, not to announce the thesis.",
      },
      {
        question: "Will these hooks sound AI-written?",
        answer: "They're written to sound like a thoughtful 17-year-old, not a corporate AI. That said, any AI hook is a starting point. The strongest drafts use one as a seed and revise from there.",
      },
    ],
    "prompt-deconstructor": [
      {
        question: "Which prompts does this work on?",
        answer: "Any college supplemental prompt: Common App, UC PIQ, school-specific 'Why Us' essays, diversity, challenge, and quirky Stanford or UChicago short takes. Just paste it in.",
      },
      {
        question: "How is this different from reading the prompt carefully myself?",
        answer: "The tool surfaces the hidden question (what admissions really evaluates), the cliches everyone falls into for this specific prompt, and 3 angles you may not have considered. Most applicants read the prompt literally and miss the signal layer.",
      },
    ],
    "activity-rewriter": [
      {
        question: "Will the output fit the Common App 150-character limit?",
        answer: "Yes. Each rewrite is constrained to 150 characters or fewer, with character count displayed so you can verify before pasting.",
      },
      {
        question: "Does it use the numbers from my original description?",
        answer: "Yes. The rewriter is instructed to keep specific numbers (hours, people, dollars, percent) from your input and to add strong past-tense verbs.",
      },
    ],
    "show-dont-tell": [
      {
        question: "Will the rewrite still sound like me?",
        answer: "The rewriter preserves your voice and only adds sensory detail that the original sentence implies. It won't invent a setting or emotion that isn't there.",
      },
    ],
    "cliche-detector": [
      {
        question: "What counts as a cliche in a college essay?",
        answer: "Overused openings ('ever since I was young'), tired tropes (mission trip epiphany, sports injury comeback, dead grandparent lesson), and generic virtue claims ('I'm passionate about helping others'). The detector scans for 30+ known patterns plus general vagueness.",
      },
    ],
    "why-college-brainstormer": [
      {
        question: "Does the AI really know each school's programs?",
        answer: "It knows a lot, but AI can hallucinate course codes and professor names. Always verify specific references on the school's official site before citing them in your final draft.",
      },
    ],
    "essay-topic-generator": [
      {
        question: "Can the generator read my mind about what my essay should be?",
        answer: "No. It takes your background and quirks as input and suggests 5 topics that match. The more specific your input, the more specific the output. Generic input produces generic ideas.",
      },
    ],
    "college-essay-word-counter": [
      {
        question: "What's the Common App personal statement word limit?",
        answer: "650 words. The counter tracks this live, along with UC PIQ (350), Stanford short essays (250), and Common App activity descriptions (150 characters).",
      },
      {
        question: "Does the word count include the prompt?",
        answer: "No. When you paste your essay, the counter only counts your response. Don't include the prompt text in your paste.",
      },
      {
        question: "Can admissions officers tell if I'm one word over?",
        answer: "Some schools enforce hard caps via their portal. Many do not. Regardless, going noticeably over the limit signals you weren't careful, which matters in an admissions pile.",
      },
    ],
    "essay-readability-checker": [
      {
        question: "What Flesch-Kincaid grade level should a college essay hit?",
        answer: "Grades 11 to 13 tend to work best for admissions: sophisticated enough to sound adult, accessible enough that a tired reader doesn't have to reread. Scores much higher often read as forced or stiff.",
      },
      {
        question: "Is a low Flesch score bad?",
        answer: "Not by itself. College essays benefit from some complexity, and a low Flesch reading ease can reflect thoughtful sentence variety. Worry only if your score is both low AND your sentences are long and tangled.",
      },
      {
        question: "Does this share my essay with anyone?",
        answer: "No. The readability checker runs entirely in your browser. Your essay text never leaves your device.",
      },
    ],
    "activity-list-reviewer": [
      {
        question: "How many activities should I fill in?",
        answer: "The Common App has 10 slots. You don't have to fill all 10. Admissions reads each entry carefully, so 6 to 8 strong entries usually beat 10 padded ones. The reviewer evaluates whatever you submit.",
      },
      {
        question: "What does the reviewer evaluate the list on?",
        answer: "The reviewer reads your activities as a single story: what theme emerges, what gaps exist, which entries overlap, and which is weakest. It then names the single change that would most improve your list.",
      },
      {
        question: "Should I include jobs and family responsibilities?",
        answer: "Yes. The Common App explicitly invites work, care, and family responsibilities in the activities section. These often strengthen an applicant who might otherwise look thin on traditional activities.",
      },
    ],
    "essay-outline-generator": [
      {
        question: "What makes a good college essay outline?",
        answer: "A 4-beat structure usually works: hook, scene beats, reflection points, landing line. The outline generator produces this structure tied to your specific topic, with word allocation suggestions per section.",
      },
      {
        question: "Should I always outline before writing my essay?",
        answer: "Most strong drafts either outline or heavily revise from an exploratory first draft. If you write better by outlining, this tool gives you a scaffold. If you write better by drafting first, use it as a diagnostic after draft 1 to check your structure.",
      },
      {
        question: "Can I outline for a supplemental essay, not just the personal statement?",
        answer: "Yes. Set the word limit to match the supplemental (150, 250, 350, etc.) and the outline rebalances section lengths accordingly.",
      },
    ],
    "essay-conclusion-generator": [
      {
        question: "How long should a college essay conclusion be?",
        answer: "Most strong conclusions run 3 to 5 sentences. Shorter often feels abrupt; much longer usually means you're summarizing instead of landing.",
      },
      {
        question: "Should a college essay conclusion restate my thesis?",
        answer: "No. College essays are not argumentative essays. The conclusion should land an image, return to a scene, or point forward concretely - not summarize what you just wrote.",
      },
      {
        question: "Why three conclusion options instead of one?",
        answer: "Because the 'right' ending depends on the tone you want to leave with. The generator produces one reflective, one scene-based, and one forward-looking option so you can pick the register that fits your voice.",
      },
    ],
    "recommendation-brag-sheet": [
      {
        question: "What is a brag sheet for a recommendation letter?",
        answer: "A document you give your teacher (or counselor) that collects stories, moments, and qualities they could draw from when writing your letter. The best brag sheets are organized and scannable so your teacher can pick the 2 or 3 anchors they'll use.",
      },
      {
        question: "Do teachers actually use brag sheets?",
        answer: "Yes. Teachers write many rec letters each cycle. A specific, well-organized brag sheet is a gift: it reminds them of moments they'd forgotten and gives them quote-ready language.",
      },
      {
        question: "How long should a brag sheet be?",
        answer: "1 to 2 pages. Long enough to give the teacher real material, short enough that they'll actually read it. This generator outputs that length by default.",
      },
    ],
    "college-interview-prep-questions": [
      {
        question: "What will the generator read when I paste my materials?",
        answer: "The generator treats your pasted essays and activities as the interviewer's context. Alumni interviewers typically read the application before the conversation, so the questions mimic what they would naturally probe.",
      },
      {
        question: "Should I rehearse answers to these questions word-for-word?",
        answer: "No. The goal is to know your material well enough to answer fluently, not to recite. Focus on the 'strong answer approach' structure, then improvise within it.",
      },
      {
        question: "Do all schools require interviews?",
        answer: "Many selective private colleges offer optional alumni interviews; very few require them. Even when optional, scheduling one is usually a positive signal and gives you a chance to add context.",
      },
    ],
    "essay-polish-pass": [
      {
        question: "What does the polish pass fix in my essay?",
        answer: "Grammar, punctuation, redundant phrasing, weak verbs, passive voice, obvious cliches, and bumpy transitions. It's a comprehensive copy edit in a single pass that preserves your voice and content.",
      },
      {
        question: "Will the polish pass rewrite the meaning of my essay?",
        answer: "No. The system prompt locks the model to preserve your voice, content, and argument. It's explicitly prohibited from inventing facts, scenes, or reflection not already in the draft.",
      },
      {
        question: "Is this just an AI grammar checker?",
        answer: "It goes further. Standard grammar checkers catch punctuation and subject-verb agreement. This pass also replaces weak verbs, cuts filler, flags cliches, and smooths transitions, all calibrated for college admissions writing.",
      },
    ],
    "essay-word-repetition-finder": [
      {
        question: "How does the repetition finder work?",
        answer: "It runs entirely in your browser. No AI, no uploads. It counts word frequencies, identifies weak verbs (was, had, got, made), and flags common filler phrases (really, very, a lot). Results appear instantly.",
      },
      {
        question: "What's a good word variety percentage?",
        answer: "60 percent or higher (unique words divided by total words) generally signals healthy variety. Below 45 percent often means you're repeating yourself, even if the repetition feels natural when you read it aloud.",
      },
      {
        question: "Why does the tool flag weak verbs?",
        answer: "Verbs like 'was,' 'had,' and 'got' flatten prose. They signal that the writer chose a neutral option rather than the right one. 'My hand shook' beats 'I was nervous' on every essay rubric.",
      },
    ],
    "college-essay-title-generator": [
      {
        question: "Do I always need a title for my college essay?",
        answer: "No. The Common App personal statement does not use a title. Some schools (Tufts short takes, Lafayette, a few others) do ask for titles. Use this tool when a title is required or when you want a working title for brainstorming.",
      },
      {
        question: "What makes a strong college essay title?",
        answer: "Short (3 to 7 words), concrete (a specific object or image), and not explanatory. A title that summarizes the essay is weaker than one that creates curiosity. The generator produces 5 options across different styles so you can pick the register.",
      },
      {
        question: "Should my title have a colon-subtitle structure?",
        answer: "Almost never. 'The Kitchen: A Meditation on Family' reads as an academic paper. Strong essay titles are one line, not two. The generator avoids this pattern.",
      },
    ],
    "admissions-officer-simulator": [
      {
        question: "How accurate is the admissions officer simulator?",
        answer: "The simulator mirrors the patterns real AOs describe (first impression, margin reactions, committee vote). It's not a real AO, but it surfaces the kind of reactions a human reader would have in ways grammar tools can't.",
      },
      {
        question: "Why specify the school?",
        answer: "Different AOs read through different lenses. Stanford's AO reads for intellectual play; Duke's reads for community fit; UChicago's reads for strangeness. Specifying tunes the simulation to that lens.",
      },
      {
        question: "Will this tell me if I'll get in?",
        answer: "No. Admissions decisions depend on the full application, institutional priorities, and a committee. This tool only evaluates how the essay itself reads, which is one of many signals.",
      },
    ],
    "supplemental-essay-planner": [
      {
        question: "What does the planner actually produce?",
        answer: "An essay-by-essay map across your college list: how many personal statements, long supps, short supps, which essays overlap thematically across schools, and the order to draft in.",
      },
      {
        question: "How accurate are the prompts it lists?",
        answer: "Good but not guaranteed. Colleges change prompts annually. The planner flags when it's uncertain. Always verify on each school's current application.",
      },
      {
        question: "How much time can good planning save?",
        answer: "A lot. Applicants who identify overlap can reuse one draft (with edits) for 3 to 5 schools. Applicants who write every prompt from scratch lose weeks to duplicated work.",
      },
    ],
    "short-supplement-distiller": [
      {
        question: "Why distill to 3 different lengths?",
        answer: "Because supplementals vary widely: 150 words (Common App short), 100 words (Stanford short takes), 50 words (Yale short answers). Having 3 lengths from your same essay lets you adapt to any short prompt fast.",
      },
      {
        question: "Will the 50-word version still feel like my essay?",
        answer: "Usually. The tool preserves your voice and your strongest concrete detail. At 50 words, the essay becomes essentially one image plus one insight, which is the right compression for that length.",
      },
      {
        question: "Can I reuse the distilled versions across multiple schools?",
        answer: "Yes, if the prompts are similar. Short supplementals often ask essentially the same question in different words (What excites you? What are you passionate about?). One distilled version can anchor multiple schools' short answers.",
      },
    ],
    "essay-first-sentence-generator": [
      {
        question: "Why focus on just the first sentence?",
        answer: "Admissions readers make a read/skim decision by sentence 3. The first sentence is the single highest-leverage line in any essay. Getting it right unlocks the rest.",
      },
      {
        question: "Should I use these first sentences verbatim?",
        answer: "You can, but these are seeds. The strongest drafts use one as a starting point and revise from there. A borrowed sentence can unlock your voice for the rest of the essay.",
      },
      {
        question: "How long should a college essay first sentence be?",
        answer: "Usually under 20 words. Shorter often lands harder. Every option this tool produces is capped at 25 words for that reason.",
      },
    ],
    "college-matchmaker-from-essay": [
      {
        question: "Can an AI actually match me to colleges from my essay?",
        answer: "Partially. The essay reveals voice, values, and intellectual texture, which are real signals of college fit. The AI matches on those signals and ideally tiers by stats. This is a starting point for your list, not a replacement for actual research.",
      },
      {
        question: "Are the tier ratings accurate?",
        answer: "They're rough guesses based on the essay and your stats if provided. Real admissions predictions need a full application context (GPA, course rigor, demographics, specific extracurricular strength). Use the tiers as starting hypotheses.",
      },
      {
        question: "Why does the tool suggest schools to avoid?",
        answer: "Because fit runs both ways. If your essay voice suggests you'd hate pre-professional culture, a heavily pre-business school may not be for you even if your stats fit. The tool flags school types (not specific names) that your essay suggests would be uncomfortable.",
      },
    ],
  };

  return [...(specific[toolSlug] ?? []), ...common];
}
