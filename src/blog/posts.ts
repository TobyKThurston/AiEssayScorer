export interface Author {
  name: string;
  role?: string;
  url?: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  /** ISO date the post was last meaningfully revised. Defaults to publishedAt. */
  updatedAt?: string;
  category: string;
  readTime: string;
  /** Defaults to the editorial team author when omitted. */
  author?: Author;
  /** Per-post hero/OG image. Defaults to the site-wide og-image.png. */
  image?: string;
}

export const defaultAuthor: Author = {
  name: "Ivy Admit Editorial Team",
  role:
    "Admissions writers and editors. Members of the team applied to and were admitted to Harvard, Yale, Princeton, Stanford, MIT, and peer institutions. Posts are reviewed before publication for factual accuracy against published university Common Data Sets and IPEDS.",
  url: "https://getivyadmit.com/about",
};

export function getAuthor(post: Post): Author {
  return post.author ?? defaultAuthor;
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
      "Columbia's Why Essay isn't a generic supplemental - it tests whether you actually understand the Core Curriculum and want what it demands. Here's what works, what doesn't, and the single line that separates strong Columbia supplements from forgettable ones.",
    publishedAt: "2026-03-10",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "columbia-list-essay-what-are-you-reading",
    title: "Columbia List Essay: How to Answer 'What Are You Reading, Listening To, Thinking About?'",
    description:
      "Columbia's list question is the most underrated part of the application. Admissions officers use it to see who you are when no one is assigning you anything. Here's exactly what to include - and the mistakes that make lists look curated rather than real.",
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
      "Harvard's roommate prompt is the most underestimated short answer in the application. It's the one place where admissions officers give you permission to drop the academic register - and the place where listing accomplishments actively hurts you. Here's what works and why.",
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
      "Yale's 200-character course title prompt is the most distinctive short answer in Ivy League admissions. Here's how to turn an intellectual obsession into a course title admissions readers actually remember - and how to avoid the jokes and generic labels that sink most attempts.",
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
  {
    slug: "princeton-why-princeton-essay",
    title: "Princeton 'Why Princeton' Essay: How to Write About Service and Civic Engagement",
    description:
      "Princeton's Why essay is the only Ivy League supplement that explicitly anchors the question in civic engagement. Here's what the service framing actually demands, the three-move structure that works at 250 words, and the mistakes that make most Princeton supplements read as generic.",
    publishedAt: "2026-04-10",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "princeton-what-brings-you-joy-essay",
    title: "Princeton 'What Brings You Joy?' Essay: How to Answer the Simplest, Hardest Prompt in the Ivy League",
    description:
      "Princeton's four-word joy prompt is the most deceptively simple essay in Ivy League admissions. Here's why writing about passion is the wrong move, the two-part structure that works at 250 words, and how to tell whether your essay sounds real or performed.",
    publishedAt: "2026-04-10",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "upenn-why-penn-essay",
    title: "Penn 'Why Penn' Essay: How to Answer 'How Did You Discover Your Intellectual and Academic Interests?'",
    description:
      "Penn's Why essay is the only Ivy League supplemental that asks about intellectual origin - where your interest came from, not just where you'd take it. Here's what admissions readers screen for, the three-part structure that fits 200 words, and why Penn's 'One University' model changes everything about this essay.",
    publishedAt: "2026-04-10",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "upenn-wharton-essay-what-you-hope-to-gain",
    title: "Wharton Essay: How to Answer 'What Do You Hope to Gain and What Will You Contribute?'",
    description:
      "Wharton's school-specific essay has a trap built into it: most applicants spend 350 words on the first half and rush the second. Here's why the contribution half matters as much as the gain half, the specific Wharton resources that separate strong essays from generic ones, and the structural reasoning that top admits use.",
    publishedAt: "2026-04-10",
    category: "Supplemental Essays",
    readTime: "10 min read",
  },
  {
    slug: "upenn-community-essay",
    title: "Penn Community Essay: How to Answer 'How Will You Explore Community at Penn?'",
    description:
      "Penn's community prompt opens with a thesis - 'learning and living are not separate experiences' - and most applicants ignore it. Here's what the prompt is actually testing, how Penn's College Houses and ABCS courses work, and the structure that turns a list of clubs into a genuine community essay.",
    publishedAt: "2026-04-10",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "brown-why-brown-open-curriculum-essay",
    title: "Brown 'Why Brown' Essay: How to Write About the Open Curriculum Without Sounding Generic",
    description:
      "Every applicant mentions the Open Curriculum. Almost no one explains what they'd actually do with it. Here's how to write a Brown Why essay that shows intellectual self-direction instead of excitement about freedom.",
    publishedAt: "2026-04-12",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "cornell-why-cornell-essay",
    title: "Cornell 'Why Cornell' Essay: How to Write for Your Specific College",
    description:
      "Cornell's Why essay is read by your specific college - Arts & Sciences, Engineering, ILR, Hotel, or one of three others. Writing about 'Cornell' generically instead of your college is the #1 mistake. Here's what each college's readers look for and the structure that works at 650 words.",
    publishedAt: "2026-04-12",
    category: "Supplemental Essays",
    readTime: "10 min read",
  },
  {
    slug: "stanford-what-matters-to-you-essay",
    title: "Stanford 'What Matters to You and Why?' Essay: The Most Personal Prompt in Elite Admissions",
    description:
      "Stanford's signature essay has been used since the 1990s. The trap: writing about what you think Stanford wants to hear instead of what actually matters to you. Here's why the strongest essays are often about surprisingly ordinary things written with genuine depth.",
    publishedAt: "2026-04-13",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "mit-something-you-do-for-pleasure-essay",
    title: "MIT 'Tell Us About Something You Do Simply for the Pleasure of It' Essay Guide",
    description:
      "MIT's pleasure prompt trips up STEM applicants who try to make everything sound intellectually rigorous. MIT already knows you're smart - they want to know you're interesting. Here's how to write 200 words that show who you are when no one is evaluating you.",
    publishedAt: "2026-04-13",
    category: "Supplemental Essays",
    readTime: "7 min read",
  },
  {
    slug: "duke-why-duke-essay",
    title: "Duke 'Why Duke' Essay: How to Write About Interdisciplinary Learning at 250 Words",
    description:
      "Duke markets Bass Connections and interdisciplinary certificates on its website, and most applicants list them right back. Here's what Duke admissions actually screens for, how to use the Trinity/Pratt split, and the three-move structure that works at 250 words.",
    publishedAt: "2026-04-14",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "northwestern-why-northwestern-essay",
    title: "Northwestern 'Why Northwestern' Essay: Writing About Flexibility Without Being Vague",
    description:
      "Northwestern lets undergrads take courses across any of its schools - Weinberg, McCormick, Medill, Bienen - without transferring. The essay should show what you'd do with that specific access, not just celebrate it. Here's the structure that works at 300 words.",
    publishedAt: "2026-04-14",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "stanford-intellectual-vitality-essay",
    title: "Stanford Intellectual Vitality Essay: How to Answer 'Reflect on an Idea or Experience That Makes You Excited About Learning'",
    description:
      "Stanford uses the phrase 'intellectual vitality' deliberately - it describes a cognitive habit, not an achievement. Here's what admissions readers actually screen for, the one-idea rule, and the three-move structure that fits 250 words without feeling cramped.",
    publishedAt: "2026-04-15",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "stanford-roommate-letter-essay",
    title: "Stanford Roommate Letter Essay: How to Write the Most Famous Supplement in College Admissions",
    description:
      "The Stanford roommate note is the only college essay written to a non-admissions audience - and almost every applicant gets the register wrong. Here's why the voice change matters, the texture that separates real notes from resume paragraphs, and the details that always work.",
    publishedAt: "2026-04-15",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "uchicago-why-uchicago-essay",
    title: "UChicago 'Why UChicago' Essay: How to Show You Want the Life of the Mind",
    description:
      "UChicago's Why essay is the longest in the top tier at 400–500 words, and it has to engage with the Core Curriculum without parroting marketing copy. Here's how to read the Core correctly, the four-part structure that works at length, and the specificity test that reveals weak drafts.",
    publishedAt: "2026-04-15",
    category: "Supplemental Essays",
    readTime: "10 min read",
  },
  {
    slug: "uchicago-uncommon-essay-prompts",
    title: "UChicago Uncommon Essay: How to Choose and Tackle the Strangest Prompts in College Admissions",
    description:
      "UChicago's Uncommon essay is the most misunderstood prompt in elite admissions. It's not a creativity test - it's a thinking test wearing a joke's clothing. Here's how to read the prompts, why the standard applicant moves fail, and the structures that let lateral thinking actually land.",
    publishedAt: "2026-04-16",
    category: "Supplemental Essays",
    readTime: "10 min read",
  },
  {
    slug: "johns-hopkins-collaboration-essay",
    title: "Johns Hopkins Essay: How to Answer 'Tell Us About an Aspect of Your Identity, Background, or Story'",
    description:
      "Johns Hopkins redesigned its signature essay around three nouns - identity, background, story - and most applicants treat them as interchangeable. Here's what each one actually asks for, why Hopkins reads for community contribution rather than personal narrative, and the structure that works at 350 words.",
    publishedAt: "2026-04-16",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "georgetown-essay-prompts-guide",
    title: "Georgetown 'Why Georgetown' Essay: How to Write for a School That Values Tradition Over Flash",
    description:
      "Georgetown's application is the only elite application that isn't on the Common App - and its Why essay reflects a different set of values. Jesuit tradition, the cura personalis framework, and school-specific context (SFS, McDonough, NHS, College) all matter. Here's what to do and what to avoid.",
    publishedAt: "2026-04-16",
    category: "Supplemental Essays",
    readTime: "10 min read",
  },
  {
    slug: "rice-why-rice-residential-college-essay",
    title: "Rice 'Why Rice' and Residential College Essay: The Two Essays That Decide Rice Applications",
    description:
      "Rice's supplement has two 500-word essays that carry more weight than at most peer schools. The Why Rice essay is about academic fit; the residential college essay is about community - and applicants who mix them weaken both. Here's what Rice admissions screens for in each.",
    publishedAt: "2026-04-16",
    category: "Supplemental Essays",
    readTime: "10 min read",
  },
  {
    slug: "how-to-start-a-college-essay",
    title: "How to Start a College Essay: A Complete Guide to Opening Lines and First Paragraphs",
    description:
      "Your opening line does more work than any other sentence in your essay. Here are the five types of openings that consistently work, the ten that almost never do, and the 'start at paragraph two' trick that fixes roughly 40% of struggling drafts.",
    publishedAt: "2026-04-16",
    category: "Writing Guides",
    readTime: "10 min read",
  },
  {
    slug: "college-essay-hooks-opening-lines",
    title: "College Essay Hooks: 20 Opening Lines That Actually Work (With Analysis)",
    description:
      "A real hook is the sentence that earns the second sentence - not a gimmick, not the most dramatic moment moved to the front. Here are 20 opening lines that work, with analysis of why each one makes the reader unable to stop reading.",
    publishedAt: "2026-04-16",
    category: "Writing Guides",
    readTime: "10 min read",
  },
  {
    slug: "college-essay-topics-to-avoid",
    title: "College Essay Topics to Avoid: 12 Topics That Usually Hurt Your Application (And When They Actually Work)",
    description:
      "Any topic can work if the essay is genuinely good. But 12 topics have been so overused that 80% of their potential is already in the admissions reader's head before they start reading. Here's why each one usually backfires - and the narrow conditions where they still land.",
    publishedAt: "2026-04-16",
    category: "Writing Guides",
    readTime: "10 min read",
  },
  {
    slug: "common-app-additional-information-guide",
    title: "The Common App 'Additional Information' Section: When to Use It, What to Write, What to Cut",
    description:
      "The 650-word 'Additional Information' field trips up most applicants. Fill it with another essay and you hurt your application. Leave it blank when context is missing and you hurt your application. Here's the one rule that governs it, when to use it, and what a strong entry actually looks like.",
    publishedAt: "2026-04-16",
    category: "Common App",
    readTime: "9 min read",
  },
  {
    slug: "mit-contribute-to-community-essay",
    title: "MIT Community Essay: How to Answer 'Describe One Way You Have Contributed to Your Community'",
    description:
      "MIT's 250-word community essay looks like a standard diversity prompt but isn't. The word 'contributed' is load-bearing. Here's what MIT admissions screens for, why scale matters less than specificity, and the three-move structure that works at 200–250 words.",
    publishedAt: "2026-04-17",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "mit-challenge-you-faced-essay",
    title: "MIT Challenge Essay: How to Answer 'How Did You Manage a Situation or Challenge That You Didn't Expect?'",
    description:
      "MIT's challenge prompt is the only supplemental in elite admissions that explicitly asks about unexpected failure. It's not a redemption arc - it's a test of how you behave when the plan breaks. Here's the four-move structure and what separates strong drafts from the sports-injury default.",
    publishedAt: "2026-04-17",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "caltech-stem-short-answers-essay",
    title: "Caltech Supplemental Essays: How to Answer the STEM Short Answer Prompts",
    description:
      "Caltech's supplement is the most STEM-filtered in elite admissions - and its voice is unlike any other school's. Here's how its prompts differ from MIT's, what 'intellectual curiosity' actually requires at Caltech, and the technical specificity that separates strong drafts from polished ones.",
    publishedAt: "2026-04-17",
    category: "Supplemental Essays",
    readTime: "10 min read",
  },
  {
    slug: "vanderbilt-why-vanderbilt-essay",
    title: "Vanderbilt Essay: How to Write About an Extracurricular Activity That Was Meaningful to You (250 Words)",
    description:
      "Vanderbilt's only required supplemental fuses the activity-reflection question with the school-fit question into one 250-word essay. Here's why picking the highest-status activity is usually the wrong move, what Vanderbilt actually screens for, and the three-move structure that works.",
    publishedAt: "2026-04-17",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "tufts-why-tufts-essay",
    title: "Tufts Supplemental Essays: 'Why Tufts,' 'Let Your Life Speak,' and 'Tell Us a Story' Guide",
    description:
      "Tufts rewards a different voice than any other elite school - specific, quirky, a little willing to be strange. Here's what the Jumbo Essays blog reveals about what Tufts readers respond to, how the Why Tufts short answer differs from peer prompts, and what makes the longer essays land.",
    publishedAt: "2026-04-17",
    category: "Supplemental Essays",
    readTime: "10 min read",
  },
  {
    slug: "usc-describe-yourself-three-words-essay",
    title: "USC Short Answers: How to Answer 'Describe Yourself in Three Words' (and the Rest)",
    description:
      "USC's short answers look easy and aren't. 'Describe yourself in three words' is the most important signal in the application after the long essays. Here's the overused-words list to avoid, the three-word categories that work, and the coherence test for the full short-answer set.",
    publishedAt: "2026-04-17",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "princeton-song-soundtrack-essay",
    title: "Princeton 'Song That Represents the Soundtrack of Your Life' Essay (50 Words)",
    description:
      "Princeton's song prompt is 50 words and asks about 'this moment' specifically - not your life. Here's why 'Don't Stop Believin'' always fails, what songs tend to work, and the two-part structure that fits the word count.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "5 min read",
  },
  {
    slug: "princeton-new-skill-essay",
    title: "Princeton 'New Skill You'd Like to Learn in College' Essay (50 Words)",
    description:
      "Princeton's new-skill prompt is the only place in the Ivy-plus supplement where resume-aligned answers actively hurt you. Here's why off-axis picks work, the 50-word structure, and the skills admissions readers are quietly tired of.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "5 min read",
  },
  {
    slug: "stanford-short-takes-guide",
    title: "Stanford Short Takes: How to Write Ten 50-Word Answers That Actually Work",
    description:
      "Applicants spend 80% of their Stanford time on the three long essays and 20% on the ten Short Takes - that ratio is upside-down. Here's how Stanford reads the set, the overlap trap that kills most Short Takes, and do/don't examples for the most common prompts.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "harvard-extracurricular-activity-essay",
    title: "Harvard Extracurricular / Work / Travel / Family Responsibilities Essay (150 Words)",
    description:
      "Harvard's 150-word 'activities, employment, travel, or family responsibilities' essay is where the activities list comes to life. The word 'shaped' is the whole test. Here's what readers screen for, why family responsibilities are underused, and the structure that fits 150 words.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "7 min read",
  },
  {
    slug: "uc-personal-insight-questions-guide",
    title: "UC Personal Insight Questions: How to Pick and Answer the Four PIQs (350 Words Each)",
    description:
      "The UC PIQs carry the entire personality weight of the application - no interviews, no letters, no test scores. Here's how to pick the four that cover the most distinct ground, the trap inside each prompt, and what UC readers actually weight at 350 words.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "11 min read",
  },
  {
    slug: "brown-plme-essay-guide",
    title: "Brown PLME Essay Guide: How to Write the Two Essays for the 8-Year BS/MD Program",
    description:
      "Brown's Program in Liberal Medical Education admits ~3% of applicants. The two essays test maturity about medicine and genuine engagement with Brown's Open Curriculum. Here's what readers screen for, why 'I want to help people' fails, and how to connect medicine to the Open Curriculum specifically.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "10 min read",
  },
  {
    slug: "duke-trinity-pratt-essay-difference",
    title: "Duke Trinity vs Pratt Essay: How the School-Specific Supplement Differs",
    description:
      "Duke's supplement isn't 'Why Duke' - it's 'Why This Duke School.' Trinity and Pratt have different prompts, different readers, and radically different admit rates. Here's the right approach for each, the specific resources that matter, and the signals that tell readers you don't understand the structure.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "cornell-engineering-essay-guide",
    title: "Cornell Engineering Essay: How to Write the College-Specific Why for Cornell Engineering",
    description:
      "Cornell Engineering applicants get a distinct prompt, read by engineering-college admissions who know the field. Generic 'I love problem-solving' hits them 10,000 times. Here's the specific Cornell resources that matter - project teams, Duffield labs, Meinig - and the structure that works.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "10 min read",
  },
  {
    slug: "nyu-why-nyu-essay",
    title: "NYU 'Why NYU' Essay: How to Write About Your Specific School, Program, and Campus",
    description:
      "NYU admits to specific schools (CAS, Stern, Tisch, Tandon, Gallatin, Steinhardt) and specific campuses (NY, Abu Dhabi, Shanghai). Writing about 'NYU' abstractly fails - the prompt literally asks which program. Here's how to hit the program-specific signal without defaulting to 'I love New York City.'",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "cmu-why-cmu-essay",
    title: "Carnegie Mellon 'Why CMU' Essay: How to Write About Your Intended Area of Study",
    description:
      "CMU's 300-word supplement is technically about the origin of your interest, but readers are also checking for fit with CMU's intensely collaborative, interdisciplinary culture. Here's why 'ever since I was young I loved coding' fails, and the CMU-specific programs worth naming - BXA, IDeATe, Robotics Institute, Tepper.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "emory-why-emory-essay",
    title: "Emory 'Why Emory' Essay: How to Write About Academic Areas You'd Explore",
    description:
      "Emory's Why essay asks about academic interests, but readers are screening for genuine engagement with Emory's specific structure - the Oxford/Atlanta dual campus, Goizueta, Rollins, the CDC and Carter Center partnerships. Here's what to name and what to cut.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "7 min read",
  },
  {
    slug: "washu-why-washu-essay",
    title: "WashU 'Why Washington University in St. Louis' Essay (200 Words)",
    description:
      "WashU recently added a required Why essay after years without one. At 200 words, you can't list. Here's why naming a school is non-optional, how WashU's cross-divisional majors work, and the 'Midwest charm' trap to avoid.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "7 min read",
  },
  {
    slug: "swarthmore-why-swarthmore-essay",
    title: "Swarthmore 'Why Swarthmore' Essay: How to Write About Honors and the Tri-Co",
    description:
      "Swarthmore's Honors Program is structurally unique in U.S. liberal arts - seminar + external examiner. Applicants who treat Swat as 'a chill LAC' misfire. Here's how to engage with the Honors model, the Tri-College Consortium, and the Quaker culture that shapes the classroom.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "pomona-why-pomona-essay",
    title: "Pomona 'Why Pomona' Essay: Writing About the 5Cs Without Sounding Like a Tourist",
    description:
      "Pomona is in Claremont, not LA - and the 5-College Consortium is the structural heart of the experience. Here's how to engage with Pomona specifically (not 'West Coast Ivy'), what to do with the 5C cross-registration, and why praising the weather sinks most drafts.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "williams-why-williams-essay",
    title: "Williams Tutorial Essay: How to Write About a Two-Student Oxford-Style Tutorial",
    description:
      "Williams's signature prompt asks applicants to propose a tutorial - one professor, one other student, Oxford model. It's not a Why Williams essay. Here's how to name the partner friction, pick a defensible topic, and write a proposal that sounds like a real course, not a pitch.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "boston-college-why-bc-essay",
    title: "Boston College 'Why BC' Essay: Writing About Jesuit Formation Without Pandering",
    description:
      "BC is Jesuit like Georgetown, but more overtly Catholic in ethos. You don't need to be Catholic, but writing without awareness of cura personalis, magis, and men-and-women-for-others reads as tone-deaf. Here's how to engage with PULSE, Perspectives, and the Core - and how BC differs from Georgetown and BU.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "9 min read",
  },
  {
    slug: "columbia-intended-major-essay",
    title: "Columbia 'What Attracted You to Your Intended Areas of Study?' Essay (200 Words)",
    description:
      "Columbia separates the intended-major prompt from the Core Curriculum essay. This one should drill into the specific field - a question, a sub-field, not a general passion. CC vs SEAS changes the essay. Here's the structure that works and the 'my journey to loving X' trap.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "7 min read",
  },
  {
    slug: "umich-community-essay",
    title: "Michigan Community Essay: How to Answer 'Describe a Community to Which You Belong'",
    description:
      "Michigan's community essay often differentiates in-state vs out-of-state applicants with similar stats. The word 'belong' - not 'led' or 'founded' - is the whole test. Here's why leadership is the default trap, and how to pick a community that isn't college-application-friendly.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "uva-application-couldnt-capture-essay",
    title: "UVA 'What Your Application Couldn't Capture' Essay: How to Answer the Hidden-Side Prompt",
    description:
      "UVA's 'what would we miss?' prompt is not a confessional slot. It's a place for something small, distinctive, and not elsewhere - the routine, the collecting habit, the niche expertise. Here's why profundity fails and what textured, specific topics tend to work.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "8 min read",
  },
  {
    slug: "barnard-why-womens-college-essay",
    title: "Barnard 'Why a Women's College?' Essay: Writing About Barnard vs Columbia",
    description:
      "Barnard's women's-college prompt filters for applicants who understand Barnard as its own institution - not a back-door to Columbia. Here's what the women's-college pedagogy actually means in the classroom, the nine ways to engage with Columbia, and the stated-feminism-without-substance trap.",
    publishedAt: "2026-04-18",
    category: "Supplemental Essays",
    readTime: "8 min read",
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
