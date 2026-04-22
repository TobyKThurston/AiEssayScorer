import Link from "next/link";
import type { EssayType } from "@/tools/essayTypes";
import type { EssayPrompt } from "@/tools/prompts";
import type { Rewriter } from "@/tools/rewriters";
import type { TopicPersona } from "@/tools/topicPersonas";

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2
        className="text-2xl font-extrabold text-ink mb-3"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
      >
        {heading}
      </h2>
      <div className="text-ink-2 text-[15px] leading-relaxed max-w-2xl space-y-3">{children}</div>
    </section>
  );
}

function RelatedGrid({ items }: { items: { href: string; label: string; kicker: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-xl bg-cream border border-hair p-4 hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] transition-all"
        >
          <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-1">{item.kicker}</p>
          <p className="text-ink text-[14.5px] font-semibold">{item.label}</p>
        </Link>
      ))}
    </div>
  );
}

/* ------------ Essay Type ------------ */

function essayTypeStrategy(t: EssayType): { heading: string; body: string }[] {
  const slug = t.slug;
  if (slug === "personal-statement") {
    return [
      { heading: "What the 650-word Common App essay actually tests", body: `Admissions officers read thousands of personal statements. They are not grading your life — they are reading for whether you can write with reflection and whether the person on the page matches the person in the rest of the application. A strong personal statement uses its 650 words to do three things: render one specific experience in detail, reveal a pattern in how you think, and earn a reflection that feels like it had to come from this writer.` },
      { heading: "Structural backbone of a strong personal statement", body: `Effective personal statements usually spend 40 percent of their words on scene (one moment, rendered specifically), 30 percent on the intellectual or emotional work the scene produced, and 30 percent on reflection that looks forward. Essays that flip this ratio — too much setup, too much reflection at the end, too many competing scenes — almost always score lower on our rubric.` },
      { heading: "What the scorer flags most often", body: `The personal statement drafts we score most harshly share a pattern: two or three scenes competing for attention, adjectives doing the work that verbs should do, a final paragraph that tells the reader what to feel, and a voice that sounds like "college essay voice" rather than the writer's actual voice. If your draft is scoring below 70 on content, these are the four places to look first.` },
    ];
  }
  if (slug === "why-us") {
    return [
      { heading: "What separates a strong Why Us draft", body: `The Why Us essay is not a research paper about the college. It is a specific answer to a specific question: what will you do at this school that you couldn't do elsewhere? Strong drafts name two or three concrete programs, professors, courses, or traditions — with a throughline explaining why you in particular would pursue them. Drafts that name five things with thin connective tissue score lower than drafts that name two with explicit reasoning.` },
      { heading: "Why our scorer weights specificity so heavily", body: `Across thousands of Why Us essays, the single strongest predictor of admission is not prose polish — it is whether the essay names things that only exist at that school and explains a personal reason for pursuing them. Our rubric gives 10 points directly to school fit and specificity because generic praise is the most common failure mode, not prose quality.` },
      { heading: "The biggest mistakes on Why Us drafts", body: `Drafts we flag most often: opening with the school's founding year or rankings, using abstract adjectives ("rigorous," "vibrant," "diverse") without naming a single concrete thing, mentioning a professor whose research the writer cannot summarize in a sentence, and closing with "I cannot wait to contribute to the community." All four are invisible to admissions readers who see hundreds of them per week.` },
    ];
  }
  if (slug === "diversity") {
    return [
      { heading: "The trap this essay is asking you to avoid", body: `The diversity or identity supplemental is one of the most commonly mis-written prompts in college admissions. The trap is to treat identity as the answer instead of the starting point. A strong diversity essay uses a specific, lived moment to show how your identity plays out in daily decisions — not a list of categories you belong to. Readers see thousands of "I am X, therefore I bring X perspective" drafts. The essays that work do the opposite: show a scene, let the identity emerge, resist summarizing the lesson.` },
      { heading: "Structural pattern that works", body: `Strong diversity essays tend to open inside an action, let the identity surface through concrete detail (a phrase overheard at home, a negotiation at a family table, a small daily routine), spend the middle on what that detail taught you about how you see the world, and close with a specific, not universal, observation. They do not end with "this shaped who I am today."` },
      { heading: "What our scorer penalizes", body: `The most common penalties on diversity essays: treating identity as a credential, turning other people into props for the writer's growth, overgeneralizing from a single experience to a whole group, and ending in a lesson the writer clearly added after the fact. Any of these will pull a draft below 70.` },
    ];
  }
  if (slug === "challenge") {
    return [
      { heading: "Why the challenge essay backfires most often", body: `The challenge essay is the second Common App prompt and appears on many supplementals. It is also the most commonly mishandled. The trap is to treat the challenge as the subject — writing five paragraphs describing the obstacle — when the essay is really asking what you did and learned. Reviewers are not counting your losses. They are looking for evidence of how you handle difficulty.` },
      { heading: "The 10/30/60 split", body: `Strong challenge essays spend roughly 10 percent of the word budget establishing the challenge, 30 percent on what you did in response (concrete actions, specific decisions), and 60 percent on what the response taught you about how you work. Drafts that flip this ratio read as either self-pity or epiphany essays, and score significantly lower.` },
      { heading: "What the scorer looks for specifically", body: `Evidence of response: verbs, not adjectives. "I organized," "I rewrote," "I called," "I failed the first time and tried again by…" The drafts that score highest show the response in concrete detail, including the parts that didn't work. The drafts that score lowest describe the challenge in dramatic prose and then declare a general lesson.` },
    ];
  }
  if (slug === "extracurricular") {
    return [
      { heading: "What the elaborate-on-an-activity essay actually asks", body: `Most applicants misread this prompt. It is not asking you to describe the activity — your activities list already did that. It is asking what this activity reveals about how you think and work. Strong drafts pick one specific moment inside the activity (a bad rehearsal, a broken build, a difficult conversation), render it concretely, and let the reader see how you operate.` },
      { heading: "The short-form structural rule", body: `Extracurricular essays are usually 150-250 words. That constraint means one scene, one revelation, no preamble. Drafts that try to cover the full arc of the activity (how you joined, how you rose, what you learned overall) read as thin because they can't be specific at that length. Drafts that zero in on a single moment and trust the reader to infer the rest score higher.` },
      { heading: "Most common failure modes", body: `Listing accomplishments, leading with a title, leaning on adjectives to do the character work ("passionate," "dedicated," "committed"), and ending with "this experience taught me the value of X." All four are invisible in a stack of 200-word essays.` },
    ];
  }
  return [
    { heading: `What the ${t.shortName.toLowerCase()} essay actually tests`, body: `${t.description} Admissions officers read these looking for specificity and voice. Our scorer grades with ${t.shortName.toLowerCase()}-specific criteria tuned for ${t.typicalWordLimit}.` },
    { heading: `Structural guidance for ${t.shortName.toLowerCase()} drafts`, body: `${t.shortName} essays at the ${t.typicalWordLimit} range reward a tight opening scene, a specific middle that shows the work, and a forward-looking close. Drafts that try to cover too much ground at this length almost always score lower than drafts that render one moment in detail.` },
    { heading: `What our scorer flags on ${t.shortName.toLowerCase()} essays`, body: `Generic openers, adjective-heavy prose, reflections that feel pre-packaged, and closes that tell the reader what to think. Fix any of these and drafts typically move up a tier on our rubric.` },
  ];
}

export function DeepEssayTypeContent({ essayType }: { essayType: EssayType }) {
  const sections = essayTypeStrategy(essayType);
  return (
    <>
      {sections.map((s) => (
        <Section key={s.heading} heading={s.heading}>
          <p>{s.body}</p>
        </Section>
      ))}
      <Section heading={`More on ${essayType.shortName.toLowerCase()} essays`}>
        <RelatedGrid
          items={[
            { href: "/tools/essay-hook-generator", kicker: "Tool", label: "Essay Hook Generator" },
            { href: "/tools/cliche-detector", kicker: "Tool", label: "Cliche Detector" },
            { href: "/tools/show-dont-tell", kicker: "Tool", label: "Show Don't Tell Rewriter" },
            { href: "/blog/how-to-write-common-app-essay", kicker: "Guide", label: "How to Write the Common App Essay" },
          ]}
        />
      </Section>
    </>
  );
}

/* ------------ Hook Prompt ------------ */

export function DeepHookPromptContent({ prompt }: { prompt: EssayPrompt }) {
  const wordLimit = prompt.wordLimit;
  const tightness =
    wordLimit <= 100
      ? `At ${wordLimit} words, every sentence is load-bearing. A hook longer than 20 words eats the scene that should follow it.`
      : wordLimit <= 200
        ? `At ${wordLimit} words, the hook has room to set the scene — but not room to explain it. Show, don't frame.`
        : wordLimit <= 400
          ? `At ${wordLimit} words, the hook can afford a full scene, but a strong opener still trusts the reader. Resist the urge to narrate what the scene means.`
          : `At ${wordLimit} words, the hook is long enough to feel like a short story opener. Use the extra room for rendering, not for explanation.`;

  const family = prompt.family;
  const familyContext: Record<string, string> = {
    "Common App": `The Common App personal statement is read by admissions officers at every school on your list. A hook that works here has to survive being the 47th essay a reader opens that day. Specificity is the only real filter — abstract openers are skipped over, scene openers are not.`,
    Harvard: `Harvard's short supplementals run on tight 150-word budgets. The hooks that work here are close to the point, usually opening inside a specific intellectual or personal moment. Harvard readers compare the supplementals to each other and to the Common App — hook consistency across the full set matters.`,
    Yale: `Yale's supplementals include a 125-word Why Yale and several 35-word short-takes. At both lengths, a strong hook commits to one specific image and trusts the reader. Yale readers are fluent in "college essay voice" and screen for it aggressively.`,
    Stanford: `Stanford's Short Takes reward hooks that feel idiosyncratic and personal. The trap is to over-rotate on cleverness — readers see thousands of quirky openers, and the ones that work do so because they reveal something specific, not because they're surprising.`,
    Princeton: `Princeton's supplementals weight voice heavily. A hook that sounds like it could open someone else's essay gets skimmed. Hooks that commit to one specific scene, person, or question are the ones that land.`,
  };
  const familyCopy =
    familyContext[family] ??
    `Selective supplementals reward hooks that commit to specificity. A hook that could open any applicant's essay is invisible; a hook that could only open yours is the one that gets read.`;

  return (
    <>
      <Section heading={`Why the ${prompt.shortName} prompt is tricky`}>
        <p>{tightness}</p>
        <p>{familyCopy}</p>
      </Section>
      <Section heading={`Five hook modes that work for ${prompt.shortName}`}>
        <ol className="space-y-2 list-decimal list-outside pl-5">
          <li><span className="font-semibold text-ink">Scene.</span> Drop the reader into a specific moment with no setup.</li>
          <li><span className="font-semibold text-ink">Object.</span> Open on one concrete thing that only makes sense inside your life.</li>
          <li><span className="font-semibold text-ink">Question.</span> A real question you cannot answer yet. Avoid rhetorical questions.</li>
          <li><span className="font-semibold text-ink">Dialogue.</span> One line of real speech, no explanation of who said it.</li>
          <li><span className="font-semibold text-ink">Claim.</span> A small, slightly surprising claim that you spend the essay earning.</li>
        </ol>
      </Section>
      <Section heading={`Pitfalls at the ${wordLimit}-word length`}>
        <p>
          At this word count, the most common failure is a hook that promises more than the essay can deliver. Avoid hooks that introduce characters you won&apos;t return to, set a scene you&apos;ll never reuse, or open with a question whose answer takes 200 words to reach. Your hook should be load-bearing — if you cut it, the essay should collapse, not survive unchanged.
        </p>
      </Section>
      <Section heading={`Related tools`}>
        <RelatedGrid
          items={[
            { href: `/tools/deconstruct-${prompt.slug}`, kicker: "Tool", label: `Deconstruct the ${prompt.shortName} Prompt` },
            { href: "/tools/cliche-detector", kicker: "Tool", label: "Cliche Detector" },
            { href: "/tools/show-dont-tell", kicker: "Tool", label: "Show Don't Tell Rewriter" },
            { href: "/tools/essay-hook-generator", kicker: "Tool", label: "General Hook Generator" },
          ]}
        />
      </Section>
    </>
  );
}

/* ------------ Rewriter ------------ */

export function DeepRewriterContent({ rewriter }: { rewriter: Rewriter }) {
  const target = rewriter.targetWords;
  const kind = rewriter.kind;

  const kindContext: Record<Rewriter["kind"], { heading: string; body: string }[]> = {
    cut: [
      { heading: `What to cut first in a ${target}-word rewrite`, body: `When cutting an essay to ${target} words, the safest first targets are adverbs, stacked adjectives, and throat-clearing transitions like "in conclusion" or "to illustrate this point." Next come repeated ideas — most essays make the same point twice in slightly different language. Scene detail should be the last thing you cut, not the first. Readers remember specific detail. They don't remember your thesis statement.` },
      { heading: `Why targeting exactly ${target} words matters`, body: `Selective admissions readers notice when essays run long. Even a 10-word overage can pull a draft out of the "precise" bucket and into the "didn't read the instructions" bucket. Our rewriter targets ${target} words exactly — not "under ${target}" or "around ${target}" — because admissions forms often enforce the cap and silently truncate the rest.` },
      { heading: `What we protect when cutting`, body: `Our rewriter is instructed to preserve voice, concrete scene details, and the emotional core of the draft. Generic claims, resume-style setup, and generic transitions are cut first. If your draft comes out of the rewriter missing something important, the fix is usually to rewrite the scene itself — not to add back the generic setup we removed.` },
    ],
    expand: [
      { heading: `How to expand to ${target} words without padding`, body: `Expanding a draft without padding is harder than cutting one. The wrong move is to add generic transitions, more adjectives, or filler reflections. The right move is to deepen scene detail — add sensory specifics, render a moment in closer focus, or draw out a second beat that the original draft skipped. Our rewriter is tuned to do exactly this, and to refuse to add claims not grounded in the existing draft.` },
      { heading: `Why most expansion attempts fail`, body: `Most expansion attempts add filler because the writer has already said everything they wanted to say. If your original draft is 200 words and the prompt asks for ${target}, the missing content is almost always scene detail — the parts of the moment you skipped because you assumed the reader would fill them in. Admissions readers won't. Let the scene breathe.` },
      { heading: `When expansion is the wrong move`, body: `If your draft is already saying too much in too few words, expansion will dilute it. The rewriter won't flag this for you. A smart approach: run the expansion once, then read the result aloud. If the new version feels thinner in voice than the original, the original was already at its right length and you should submit closer to the short version.` },
    ],
    tighten: [
      { heading: `What "tighten" means in this rewriter`, body: `Tightening isn't cutting for a word target — it's removing everything that doesn't earn its place. The rewriter is instructed to cut filler, adverbs, redundant clauses, and generic framing while preserving voice and scene. The output may or may not be shorter; what it will be is more specific, sentence by sentence.` },
      { heading: `The sentence-level targets`, body: `Tightening hits three patterns hardest: adverbs doing the work of verbs ("ran quickly" becomes "sprinted"), stacked adjectives ("a small quiet grey house" becomes "a grey house"), and throat-clearing phrases ("I want to tell you about the time when…" becomes the scene itself). If your draft reads as more direct and less apologetic after tightening, it worked.` },
      { heading: `When not to tighten`, body: `If your draft is already using sentence rhythm deliberately — short beats for emphasis, long sentences for reflection — aggressive tightening can flatten it. Run the rewriter, compare voice side-by-side, and keep whichever version sounds more like you.` },
    ],
    tone: [
      { heading: `What the tone rewriter does`, body: `This rewriter shifts the register of the draft without changing its content. That might mean making a formal draft more conversational, a casual draft more composed, or a bland draft more idiosyncratic. It will not change facts, add claims, or alter the structural beats of the essay. It rewrites sentence by sentence for voice.` },
      { heading: `When to use this`, body: `The tone rewriter is most useful when you know something is off about your draft but can't pinpoint what. If the content feels right but the voice doesn't sound like you, a tone pass will usually surface the exact sentences where the voice breaks. You can then rewrite those manually, which always produces a better result than accepting the rewriter's version wholesale.` },
      { heading: `What to watch for`, body: `Tone rewrites can over-rotate — making a thoughtful draft sound glib, or making a casual draft sound stiff. Always read the output aloud. If it doesn't sound like you, don't use it. The goal is to reveal voice issues in the original, not to replace the voice with the rewriter's.` },
    ],
  };

  const sections = kindContext[kind];

  return (
    <>
      {sections.map((s) => (
        <Section key={s.heading} heading={s.heading}>
          <p>{s.body}</p>
        </Section>
      ))}
      <Section heading="Related rewriters and tools">
        <RelatedGrid
          items={[
            { href: "/tools/cliche-detector", kicker: "Tool", label: "Cliche Detector" },
            { href: "/tools/show-dont-tell", kicker: "Tool", label: "Show Don't Tell Rewriter" },
            { href: "/tools/word-counter", kicker: "Tool", label: "Word Counter" },
            { href: "/tools/readability-checker", kicker: "Tool", label: "Readability Checker" },
          ]}
        />
      </Section>
    </>
  );
}

/* ------------ Topic Persona ------------ */

export function DeepTopicPersonaContent({ persona }: { persona: TopicPersona }) {
  return (
    <>
      <Section heading={`What makes a topic work for ${persona.shortName}`}>
        <p>{persona.contextForAi}</p>
      </Section>
      <Section heading={`What to avoid in ${persona.shortName.toLowerCase()} essays`}>
        <p>
          The topics we screen out for this persona are the ones admissions readers have seen several thousand times. Even if your version is sincere, a topic with high template match reads as generic. When the topic generator returns an idea, pressure-test it: could most applicants in your category write this essay? If yes, keep scrolling for a more specific option.
        </p>
      </Section>
      <Section heading="How to pick from the generated topics">
        <p>
          Read all five topics aloud. Skip any you could imagine your classmates also writing. The topic that makes you slightly uncomfortable — because it&apos;s small, specific, or reveals something you&apos;d normally leave out — is usually the one with the most material in it. Generic topics produce generic drafts. Specific topics, even strange ones, produce essays admissions readers remember.
        </p>
      </Section>
      <Section heading="Related tools">
        <RelatedGrid
          items={[
            { href: "/tools/essay-hook-generator", kicker: "Tool", label: "Essay Hook Generator" },
            { href: "/tools/cliche-detector", kicker: "Tool", label: "Cliche Detector" },
            { href: "/tools/outline-generator", kicker: "Tool", label: "Outline Generator" },
            { href: "/blog/how-to-write-common-app-essay", kicker: "Guide", label: "How to Write the Common App Essay" },
          ]}
        />
      </Section>
    </>
  );
}

/* ------------ Deconstruct Prompt ------------ */

export function DeepDeconstructContent({ prompt }: { prompt: EssayPrompt }) {
  return (
    <>
      <Section heading={`What this prompt is actually asking`}>
        <p>
          Most applicants answer the prompt they think they see, not the prompt that&apos;s there. The {prompt.shortName} prompt has specific language that admissions readers will check your essay against. The deconstructor surfaces the verbs, nouns, and constraints you need to hit so your draft reads as a direct response to the prompt — not a pre-written essay loosely rebranded.
        </p>
      </Section>
      <Section heading={`How to use the deconstruction`}>
        <p>
          Read the prompt&apos;s key verbs (&quot;describe,&quot; &quot;reflect,&quot; &quot;explain&quot;) as instructions, not suggestions. A &quot;describe&quot; prompt wants scene and detail; a &quot;reflect&quot; prompt wants evidence of thinking; an &quot;explain&quot; prompt wants a reasoned throughline. Drafts that confuse these categories almost always score below 70, regardless of prose quality.
        </p>
      </Section>
      <Section heading={`Word-limit constraints at ${prompt.wordLimit} words`}>
        <p>
          {prompt.wordLimit <= 100
            ? `At ${prompt.wordLimit} words, every word is load-bearing. You have room for roughly one scene, one idea, and one reflection — no more.`
            : prompt.wordLimit <= 300
              ? `At ${prompt.wordLimit} words, you have room for one scene, one reflective middle, and one forward-looking close. Attempting two scenes at this length almost always produces a draft that feels thin because neither gets rendered.`
              : `At ${prompt.wordLimit} words, you have room for a full scene, a reflective middle that does real work, and a close that earns its turn. Use the length — but a long draft doesn't mean a loose one.`}
        </p>
      </Section>
      <Section heading="Related tools">
        <RelatedGrid
          items={[
            { href: `/tools/hook-${prompt.slug}`, kicker: "Tool", label: `${prompt.shortName} Hook Generator` },
            { href: "/tools/cliche-detector", kicker: "Tool", label: "Cliche Detector" },
            { href: "/tools/show-dont-tell", kicker: "Tool", label: "Show Don't Tell Rewriter" },
            { href: "/blog/common-app-essay-prompts-2025", kicker: "Guide", label: "Common App Prompts Guide" },
          ]}
        />
      </Section>
    </>
  );
}
