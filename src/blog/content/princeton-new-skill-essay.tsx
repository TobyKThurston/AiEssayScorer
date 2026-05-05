import Link from "next/link";

export default function Content() {
  return (
    <>
      <h2>The Prompt</h2>
      <p>
        <em>"What is a new skill you would like to learn in college?"</em>
      </p>
      <p>
        Word limit: <strong>50 words.</strong> That's three to four sentences.
        Every word is load-bearing.
      </p>

      <h2>What Princeton Is Actually Asking</h2>
      <p>
        This prompt is about <strong>expansion</strong>, not existing
        expertise. Princeton has your resume. They can see what you're already
        good at. This question asks what you'd reach for when nobody is
        grading you on it.
      </p>
      <p>
        Readers are screening for three things:
      </p>
      <ul>
        <li>
          <strong>A skill that is genuinely new to you.</strong> Not a harder
          version of something on your transcript.
        </li>
        <li>
          <strong>A reason that's anchored to this moment.</strong> Why now -
          not "someday."
        </li>
        <li>
          <strong>Specificity about the first step.</strong> Naming the skill
          is easy. Naming how you'd begin is harder.
        </li>
      </ul>

      <h2>Picks That Almost Always Fail</h2>
      <ul>
        <li>
          <strong>"More advanced Python."</strong> You're a CS applicant.
          This reads as resume-optimizing.
        </li>
        <li>
          <strong>"Advanced statistics for my research."</strong> Your major
          requires it. The reader notices.
        </li>
        <li>
          <strong>"Public speaking."</strong> Overused and abstract.
        </li>
        <li>
          <strong>"A new language" with no language named.</strong> The
          vagueness is the tell.
        </li>
        <li>
          <strong>"Leadership."</strong> Not a skill. A category.
        </li>
      </ul>

      <h2>Picks That Tend to Work</h2>
      <ul>
        <li>
          <strong>Fermentation.</strong> Kimchi, sourdough, miso - small,
          tactile, patient.
        </li>
        <li>
          <strong>Basic auto repair.</strong> Oil changes, brake pads, a
          carburetor rebuild with a YouTube tab open.
        </li>
        <li>
          <strong>Conversational Farsi, Yoruba, or Tagalog.</strong> A
          heritage language you can half-understand but not speak.
        </li>
        <li>
          <strong>How to sail a small boat.</strong> Tiller, tacking,
          reading wind on water.
        </li>
        <li>
          <strong>Competitive chess.</strong> Actual openings, actual time
          controls, an online rating.
        </li>
        <li>
          <strong>Letterpress printing, welding, film photography.</strong>{" "}
          Crafts with real equipment.
        </li>
      </ul>
      <p>
        The pattern: skills with physical specifics, small communities, and
        a visible first step.
      </p>

      <h2>The Structure That Works at 50 Words</h2>
      <ol>
        <li>
          <strong>Name the skill in the first sentence.</strong> Don't warm
          up.
        </li>
        <li>
          <strong>One sentence on why now.</strong> What is it about this
          moment - the summer, the major, a person - that pointed you here?
        </li>
        <li>
          <strong>One sentence on the first concrete step.</strong> The
          specific class, club, workshop, or weekend.
        </li>
      </ol>

      <h2>An Example That Works</h2>
      <blockquote>
        "I want to learn to sail. My grandfather sailed out of Marblehead
        for forty years and I never asked him how. He died in March.
        Princeton's sailing team accepts beginners in the fall - I'd start
        on a Sunfish, in the Carnegie Lake wind, and go from there."
      </blockquote>
      <p>
        Why it works: names a specific skill, anchors it to a moment the
        reader didn't expect, and ends with a concrete first step that
        shows the applicant already looked it up. 49 words.
      </p>

      <h2>Common Mistakes</h2>
      <ul>
        <li>
          <strong>Picking a skill your major already requires.</strong> An
          engineer who wants to learn "CAD" reads as someone gaming the
          prompt.
        </li>
        <li>
          <strong>Turning it into a values essay.</strong> "I want to learn
          patience." Patience is not a skill. Name a verb you can't
          currently do.
        </li>
        <li>
          <strong>Listing three skills.</strong> The prompt says "a" skill.
          Pick one.
        </li>
        <li>
          <strong>Explaining the benefits of the skill.</strong> The reader
          knows why fermentation is interesting. Tell them why <em>you</em>{" "}
          are reaching for it.
        </li>
        <li>
          <strong>Going over 50 words.</strong> At this length, two extra
          words is visible.
        </li>
      </ul>

      <h2>Self-Test</h2>
      <p>
        Read your answer and ask: could a stranger guess my intended major
        from this skill? If yes, you've picked something adjacent to your
        existing track. Pick something further out. The prompt rewards
        off-axis curiosity, not optimization.
      </p>

      <p>
        Run your draft through our{" "}
        <Link href="/editor" className="text-oxblood hover:underline">
          AI essay review tool
        </Link>{" "}
        for voice and specificity. For the companion Princeton short
        answer, see our{" "}
        <Link
          href="/blog/princeton-song-soundtrack-essay"
          className="text-oxblood hover:underline"
        >
          Princeton "soundtrack" essay guide
        </Link>
        . For the other Princeton supplements, read our{" "}
        <Link
          href="/blog/princeton-what-brings-you-joy-essay"
          className="text-oxblood hover:underline"
        >
          "What Brings You Joy" guide
        </Link>{" "}
        and{" "}
        <Link
          href="/blog/princeton-why-princeton-essay"
          className="text-oxblood hover:underline"
        >
          "Why Princeton" guide
        </Link>
        .
      </p>
    </>
  );
}
