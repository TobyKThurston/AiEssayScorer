import Link from "next/link";

export default function Content() {
  return (
    <>
      <h2>The Prompt</h2>
      <p>
        <em>
          "Briefly describe any of your extracurricular activities,
          employment experience, travel, or family responsibilities that have
          shaped who you are, or share any additional information you'd like
          us to know."
        </em>
      </p>
      <p>
        Word limit: <strong>150 words.</strong> About one tight paragraph.
      </p>

      <h2>What Harvard Is Actually Asking</h2>
      <p>
        The key word is <strong>shaped</strong>. This is not a "tell us
        about your activities" prompt. Harvard already has your activities
        list with ten entries, hours per week, and descriptions. They can
        see what you did.
      </p>
      <p>
        This prompt asks a harder question: <strong>what did doing it
        change about how you think or act?</strong> The committee is
        looking for a cause-and-effect arc, not a recap.
      </p>

      <h2>The Four Categories — And Which Ones Applicants Skip</h2>
      <ul>
        <li>
          <strong>Extracurriculars.</strong> Overused. If you write about
          your #1 activity here, you're duplicating the activities list.
        </li>
        <li>
          <strong>Employment.</strong> Underused by strong applicants. A
          summer at a deli, a landscaping crew, a tutoring job often
          beats a second robotics paragraph.
        </li>
        <li>
          <strong>Travel.</strong> Risky. A "service trip to [country]"
          reads badly. A specific, non-tourist relationship to a place
          can work.
        </li>
        <li>
          <strong>Family responsibilities.</strong> The most underused
          category, and often the strongest. Translating for parents,
          caring for younger siblings, running a household during a
          parent's illness, managing a family business.
        </li>
      </ul>

      <h2>Why Family Responsibilities Win</h2>
      <p>
        Harvard reads thousands of activities lists. They rarely see the
        work students do at home. If you've been the translator, the
        caregiver, or the reliable adult in your household since you were
        twelve, this is the one prompt where that belongs.
      </p>
      <p>
        Don't sanitize it. Don't make it inspirational. Describe the
        specifics — the phone call to the insurance company, the younger
        brother's bedtime, the Saturday shift at the register — and let
        the shaping come through.
      </p>

      <h2>The 150-Word Structure That Works</h2>
      <p>Use three beats, with rough word counts:</p>
      <ol>
        <li>
          <strong>Specific scene (40 words).</strong> Drop the reader into
          one concrete moment. A smell, a task, a sentence someone said.
        </li>
        <li>
          <strong>What it changed (80 words).</strong> The shift in how you
          think, act, or see the world. Past self vs. current self, with
          evidence.
        </li>
        <li>
          <strong>What it left you with (30 words).</strong> A habit, a
          question, a way you now handle something unrelated.
        </li>
      </ol>

      <h2>An Example That Works</h2>
      <blockquote>
        "Every Sunday since I was eleven, I've translated my mother's
        phone calls with her oncologist. I learned the words for 'benign'
        and 'margins' before I learned them in biology. What the job
        actually taught me wasn't medical vocabulary — it was pacing. My
        mother needed time to absorb each sentence, so I'd stop the
        doctor mid-word and ask her to repeat. I now do it everywhere:
        interrupting a teacher when a classmate looks lost, slowing down
        group chats when the argument has moved past someone. I've become
        the person who notices when the room has left someone behind.
        It's the habit I'll bring to any seminar — and the one I most
        hope Harvard keeps."
      </blockquote>
      <p>
        Why it works: one specific weekly scene, a clear shift from the
        literal task to a transferable habit, and a final sentence that
        ties it to college without flattery. 148 words.
      </p>

      <h2>Common Mistakes</h2>
      <ul>
        <li>
          <strong>Restating the activities list.</strong> "I served as
          captain of the debate team and treasurer of student government."
          Harvard already has this. Use the 150 words for what the
          activities list can't show.
        </li>
        <li>
          <strong>Writing about three activities.</strong> At 150 words,
          three activities means fifty words each — not enough to show
          shaping. Pick one.
        </li>
        <li>
          <strong>The mission-trip paragraph.</strong> "The children taught
          me more than I taught them." Skip.
        </li>
        <li>
          <strong>Generic family-responsibility language.</strong> "I
          helped take care of my siblings and it taught me responsibility."
          Name the bedtime, the meal, the exact errand.
        </li>
        <li>
          <strong>Using the "additional information" framing as an excuse
          to pile on.</strong> If you have a real gap to explain (a grade,
          a transfer, a medical year), use a separate Additional Info
          field. Don't bury it here.
        </li>
      </ul>

      <h2>Self-Test</h2>
      <p>
        Cover the first 40 words of your draft. Read only the middle
        section — the "what it changed" part. Can the reader tell what
        activity you're writing about from the shaping alone? If yes,
        you've written the right thing. If the middle could apply to any
        activity in any student's life, rewrite it with specifics from
        the one you picked.
      </p>

      <p>
        Run your draft through our{" "}
        <Link href="/editor" className="text-[#6366F1] hover:underline">
          AI essay review tool
        </Link>{" "}
        for voice and specificity. For Harvard's other supplements, see
        our{" "}
        <Link
          href="/blog/harvard-intellectual-experience-essay"
          className="text-[#6366F1] hover:underline"
        >
          "Intellectual Experience" guide
        </Link>
        ,{" "}
        <Link
          href="/blog/harvard-roommate-essay-top-3-things"
          className="text-[#6366F1] hover:underline"
        >
          Roommate essay guide
        </Link>
        , and{" "}
        <Link
          href="/blog/harvard-how-use-education-future-essay"
          className="text-[#6366F1] hover:underline"
        >
          "How Use Education" guide
        </Link>
        .
      </p>
    </>
  );
}
