export interface TopicPersona {
  slug: string;
  shortName: string;
  displayName: string;
  description: string;
  contextForAi: string;
  seoDescription: string;
  seoKeywords: string[];
}

export const topicPersonas: TopicPersona[] = [
  {
    slug: "first-gen-students",
    shortName: "First-Gen Students",
    displayName: "Essay Topic Generator for First-Generation Students",
    description: "Topic ideas grounded in the specific experiences of first-gen college applicants, without leaning on the generic hardship arc.",
    contextForAi: "The student is a first-generation college applicant. Favor topics that show real specificity from their life (translating documents, navigating systems, bridging worlds) while avoiding cliches: the mission trip epiphany, the 'despite my background' redemption arc, the 'realized I was underprivileged' reveal.",
    seoDescription: "Free essay topic generator for first-generation college applicants. Specific, honest topic ideas that avoid the worn first-gen hardship cliches.",
    seoKeywords: ["first gen college essay ideas", "first generation essay topics", "first-gen common app topics"],
  },
  {
    slug: "stem-students",
    shortName: "STEM Students",
    displayName: "Essay Topic Generator for STEM Students",
    description: "Topic ideas that help STEM students show voice and reflection, not just a list of olympiad wins.",
    contextForAi: "The student is applying as a STEM major (CS, engineering, math, physics, bio, chem). Favor topics that reveal character through their technical work: a problem they couldn't stop thinking about, a messy build, a moment when intuition was wrong, a connection between their field and their life. Avoid the resume essay and the 'I fell in love with coding at age 7' cliche.",
    seoDescription: "Free college essay topic generator for STEM applicants. Topics that show voice and reflection instead of listing olympiad wins.",
    seoKeywords: ["stem college essay ideas", "engineering essay topics", "computer science essay ideas"],
  },
  {
    slug: "arts-students",
    shortName: "Arts Students",
    displayName: "Essay Topic Generator for Arts and Humanities Students",
    description: "Topic ideas for applicants whose identity is built around writing, music, film, visual art, or the humanities.",
    contextForAi: "The student is applying with a strong arts or humanities focus (writing, music, visual art, theater, film, literature). Favor topics that show how their art is connected to the rest of their life. Avoid the 'my passion is art' cliche and generic creative process essays. Favor small, specific, slightly risky choices.",
    seoDescription: "Free college essay topic generator for arts and humanities students. Topic ideas that move beyond 'I am passionate about art'.",
    seoKeywords: ["arts student college essay", "humanities essay topics", "creative essay ideas"],
  },
  {
    slug: "athletes",
    shortName: "Athletes",
    displayName: "Essay Topic Generator for Student Athletes",
    description: "Topic ideas for athletes that avoid the tired injury-comeback arc and show depth beyond the sport.",
    contextForAi: "The student is a serious athlete (recruited or varsity) and wants to write an essay. AGGRESSIVELY avoid: the injury comeback story, the big game winning shot, the grueling practice montage. Favor topics about the weirder parts of athlete life: team dynamics, what happens in slow moments, how identity and sport intersect or conflict. If the student does want to write about sport, the topic must reveal something a coach wouldn't know.",
    seoDescription: "Free college essay topic generator for student athletes. Topic ideas that avoid the injury comeback cliche and reveal depth beyond the game.",
    seoKeywords: ["student athlete college essay", "athletics essay topics", "recruited athlete essay ideas"],
  },
  {
    slug: "introverts",
    shortName: "Introverts / Quiet Kids",
    displayName: "Essay Topic Generator for Quieter Students",
    description: "Topic ideas for applicants who don't have a big public story and want to write about small, inward moments.",
    contextForAi: "The student is more introverted, doesn't have obvious leadership titles, and is worried their life isn't dramatic enough for a college essay. Favor small-scale, interior topics: a recurring thought, a private ritual, a quiet act of noticing, a relationship only they would write about this way. Aggressively push against the impulse to fake drama. Quiet essays often rank higher when the voice is real.",
    seoDescription: "Free college essay topic generator for quieter students. Topic ideas for applicants who don't have a big dramatic public story.",
    seoKeywords: ["quiet student college essay", "introvert essay topics", "small moment essay ideas"],
  },
  {
    slug: "immigrant-backgrounds",
    shortName: "Immigrant Backgrounds",
    displayName: "Essay Topic Generator for Immigrant and Diaspora Students",
    description: "Topic ideas that move past the 'my family came to America with nothing' opener and find more specific angles.",
    contextForAi: "The student has an immigrant or diaspora background. AGGRESSIVELY avoid: the boat story opener, the 'my parents sacrificed everything' arc unless the student has a specific reason to frame it new, the language-barrier essay. Favor topics that live inside bilingual households: translating a form, watching a grandparent misunderstood, code-switching in real time, the specific food memory that only makes sense in context.",
    seoDescription: "Free college essay topic generator for immigrant and diaspora students. Fresh angles that avoid the familiar boat-story opener.",
    seoKeywords: ["immigrant essay topics", "diaspora college essay", "bilingual student essay ideas"],
  },
  {
    slug: "small-town-rural",
    shortName: "Small Town / Rural",
    displayName: "Essay Topic Generator for Small-Town and Rural Students",
    description: "Topic ideas that turn small-town life into concrete, unexpected material rather than a generic 'I'm ready to leave' arc.",
    contextForAi: "The student is from a small town or rural area. Avoid the 'I'm ready to leave and see the world' essay and the 'my town is limited' frame. Favor topics that show small-town life with specificity (a local institution, a family business, a place with quirks). Let the student's relationship with their place be complicated, not just a stepping stone.",
    seoDescription: "Free college essay topic generator for small-town and rural students. Topics that turn local life into concrete, specific material.",
    seoKeywords: ["small town college essay", "rural student essay topics", "hometown essay ideas"],
  },
  {
    slug: "low-income-students",
    shortName: "Low-Income Students",
    displayName: "Essay Topic Generator for Low-Income Students",
    description: "Topic ideas that let low-income applicants write specifically without flattening their story into a single hardship arc.",
    contextForAi: "The student comes from a low-income background. They do NOT have to write about financial hardship if they don't want to. If they do, favor specific, concrete topics: how a family's money decisions were made, a job they worked early, systems they learned to navigate. If they don't, generate topics that don't center hardship at all. Never make the student perform poverty for admissions.",
    seoDescription: "Free college essay topic generator for low-income applicants. Ideas that let you write specifically without performing hardship.",
    seoKeywords: ["low income college essay", "financial hardship essay topics", "working class essay ideas"],
  },
  {
    slug: "transfer-applicants",
    shortName: "Transfer Applicants",
    displayName: "Essay Topic Generator for Transfer Applicants",
    description: "Topic ideas for transfer students who need to explain the why of moving without blaming their current school.",
    contextForAi: "The student is applying as a transfer. The topic must address why they're transferring without complaining about their current school or making their current school sound inadequate. Favor forward-looking topics: what specifically is missing at current school, what they'd pursue at the target, and the story of growth during time at the current school.",
    seoDescription: "Free college essay topic generator for transfer students. Ideas that explain the why of moving without trashing your current school.",
    seoKeywords: ["transfer essay topics", "college transfer application essay", "why transfer essay ideas"],
  },
  {
    slug: "religious-school-students",
    shortName: "Religious School",
    displayName: "Essay Topic Generator for Religious School Students",
    description: "Topic ideas for applicants from Catholic, Jewish, Islamic, or other religious secondary schools who don't want to write the expected 'faith journey' essay.",
    contextForAi: "The student attends a religious secondary school (Catholic, Jewish, Muslim, Christian, etc.). Favor topics that show the applicant's actual life and thinking, NOT a 'faith journey' essay by default. If the student wants to engage with faith, push for a specific tension, doubt, or moment of reckoning rather than a tidy 'my faith shaped me' arc. Avoid: sanitized moral lesson essays, generic service-trip recaps, and 'faith made me stronger' cliches.",
    seoDescription: "Free college essay topic generator for students at religious high schools. Ideas that go beyond the expected faith-journey essay.",
    seoKeywords: ["religious school college essay", "catholic high school essay", "faith-based school essay topics"],
  },
  {
    slug: "international-students",
    shortName: "International Students",
    displayName: "Essay Topic Generator for International Students",
    description: "Topic ideas for applicants from outside the US who want to write beyond the 'came to America' narrative.",
    contextForAi: "The student is an international applicant (applying to US colleges from abroad). Avoid: the 'America means freedom' essay, the 'English is my second language' essay unless it's framed in a fresh way, and the generic 'wanting to study abroad' arc. Favor topics grounded in specific places, specific cultural particulars, and specific intellectual interests the US college would benefit from having.",
    seoDescription: "Free college essay topic generator for international students applying to US colleges. Ideas beyond the 'came to America' narrative.",
    seoKeywords: ["international student college essay", "applying to us colleges from abroad essay", "international applicant essay ideas"],
  },
  {
    slug: "military-family",
    shortName: "Military Family",
    displayName: "Essay Topic Generator for Military Family Students",
    description: "Topic ideas for applicants whose parents or siblings have served in the military. Moves past the generic 'moving a lot taught me adaptability' arc.",
    contextForAi: "The student has an immediate family member serving (or who served) in the military. Avoid: the generic 'I moved every 2 years and learned resilience' essay, the 'service shaped my values' cliche without specifics, and any essay that uses a parent's service as the applicant's achievement. Favor topics about specific places the student lived, specific base culture moments, and how military-family specifics shaped a concrete interest of the student's own.",
    seoDescription: "Free college essay topic generator for military-family students. Ideas beyond 'moving a lot taught me adaptability'.",
    seoKeywords: ["military family college essay", "military kid essay topics", "military brat college application"],
  },
  {
    slug: "humanities-students",
    shortName: "Humanities Students",
    displayName: "Essay Topic Generator for Humanities Students",
    description: "Topic ideas for history, philosophy, literature, and political science students that go beyond 'I love to read'.",
    contextForAi: "The student is applying as a humanities major (history, philosophy, literature, political science, classics, etc.). Favor topics that show how the student actually thinks: a question they've been arguing with in their head, a specific text that changed their framing, a real intellectual disagreement they've had. Avoid the reading-list essay and the generic 'I love to read' opener.",
    seoDescription: "Free college essay topic generator for humanities students. Topic ideas that show intellectual depth beyond 'I love to read'.",
    seoKeywords: ["humanities college essay", "history student essay topics", "philosophy essay ideas"],
  },
];

export function getTopicPersona(slug: string): TopicPersona | undefined {
  return topicPersonas.find((p) => p.slug === slug);
}
