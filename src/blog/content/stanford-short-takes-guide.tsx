import Link from "next/link";

export default function Content() {
  return (
    <>
      <h2>The Prompt Set</h2>
      <p>
        Stanford's Short Takes are <strong>ten 50-word responses</strong>.
        The exact questions rotate, but the reliable set includes:
      </p>
      <ul>
        <li>What is your favorite topic to debate?</li>
        <li>Share a note from your teacher.</li>
        <li>What historical moment would you witness?</li>
        <li>How did you spend your last two summers?</li>
        <li>What five words best describe you?</li>
        <li>What won't we find on your resume?</li>
        <li>What news source do you read, and why?</li>
        <li>Name a skill you want to learn.</li>
        <li>What would you do with an extra hour?</li>
        <li>What are you excited about right now?</li>
      </ul>

      <h2>Why Most Applicants Get the Ratio Wrong</h2>
      <p>
        Most applicants spend 80% of their Stanford time on the three long
        essays and 20% on the ten short takes. That ratio is upside-down.
      </p>
      <p>
        Ten answers at 50 words each is <strong>500 words of real estate</strong>{" "}
        — more than a single long essay. Stanford reads the ten as a set,
        looking for <strong>coherence plus surprise</strong>. A generic set
        of short takes can sink an application with a strong long essay.
      </p>

      <h2>What Stanford Is Reading For</h2>
      <ul>
        <li>
          <strong>Voice.</strong> Ten 50-word windows into how you actually
          talk.
        </li>
        <li>
          <strong>Range.</strong> No two answers should sit in the same
          mental bucket.
        </li>
        <li>
          <strong>Concreteness.</strong> Proper nouns, specific moments,
          named things.
        </li>
        <li>
          <strong>No overlap with your long essays.</strong> If "what matters
          most" and "an extra hour" are the same theme, you've wasted a
          slot.
        </li>
      </ul>

      <h2>The Overlap Trap</h2>
      <p>
        The most common failure mode: the same activity appears in three
        short takes. Robotics is your debate topic, your summer, and your
        extra hour. Stanford sees one applicant for ten slots, not ten
        slots for one applicant.
      </p>
      <p>
        Draft all ten first. Then map each to a category: academic,
        personal, creative, family, sensory, political, future-looking.
        Every bucket should appear at least once. No bucket should appear
        more than twice.
      </p>

      <h2>Do and Don't, Slot by Slot</h2>
      <p><strong>Favorite topic to debate:</strong></p>
      <ul>
        <li>
          Don't: "Abortion" or "gun control." Reads as the first thing that
          came to mind.
        </li>
        <li>
          Do: Something small and genuinely contested — "whether cilantro
          belongs in pho," "Kendrick vs. Drake," "the optimal length of a
          sermon."
        </li>
      </ul>
      <p><strong>What won't we find on your resume:</strong></p>
      <ul>
        <li>
          Don't: "I'm a great friend." Not falsifiable.
        </li>
        <li>
          Do: A specific private hobby. "I keep a spreadsheet of every
          sandwich I've eaten at every deli in Queens. 312 rows."
        </li>
      </ul>
      <p><strong>News source you read:</strong></p>
      <ul>
        <li>
          Don't: "The New York Times." Everyone's answer. Says nothing.
        </li>
        <li>
          Do: A specific newsletter, podcast, or outlet, plus <em>why</em>.
          "Defector, because the sportswriting is better than the sports."
        </li>
      </ul>
      <p><strong>Historical moment you'd witness:</strong></p>
      <ul>
        <li>
          Don't: The Moon landing, MLK's speech, signing the Constitution.
          Too rehearsed.
        </li>
        <li>
          Do: A small, specific moment — "the first rehearsal of{" "}
          <em>A Love Supreme</em>," "the night before the Scopes trial
          verdict," "my grandmother landing at JFK in 1968."
        </li>
      </ul>

      <h2>An Example That Works</h2>
      <blockquote>
        <strong>What won't we find on your resume?</strong>
        <br />
        "I cut my own hair. I've been doing it since ninth grade, over a
        garbage can, with kitchen scissors and a hand mirror my mom
        labeled 'Anton's Salon.' It's bad, consistently. I'll keep doing
        it at Stanford. The shears fit in a carry-on."
      </blockquote>
      <p>
        Why it works: specific detail ("kitchen scissors," "Anton's
        Salon"), honest self-assessment, and a small line that carries the
        applicant forward into college. 48 words, zero throat-clearing.
      </p>

      <h2>Common Mistakes</h2>
      <ul>
        <li>
          <strong>Treating "five words that describe you" as a list.</strong>{" "}
          Stanford wants five surprising words, not "driven, curious,
          creative, collaborative, passionate." Those five words describe
          everyone.
        </li>
        <li>
          <strong>Using the "skill you want to learn" slot for your
          major.</strong> If you're a CS applicant saying "machine learning,"
          the reader has already seen it ten times today.
        </li>
        <li>
          <strong>The humble brag in "extra hour."</strong> "I'd study for
          the SAT." No.
        </li>
        <li>
          <strong>Forgetting they read all ten together.</strong> Two
          family-focused answers in a row flattens both.
        </li>
        <li>
          <strong>Writing 38 words when you had 50.</strong> The short takes
          reward density. Use the space.
        </li>
      </ul>

      <h2>The Coherence Test</h2>
      <p>
        After drafting all ten, print them on one page and read them as a
        block. Ask: could a reader sketch a single, specific person from
        these ten answers — someone they could pick out of a lunchroom? If
        yes, you're done. If the answers could belong to any high-
        achieving senior, rewrite the three weakest.
      </p>

      <p>
        Run your draft through our{" "}
        <Link href="/editor" className="text-oxblood hover:underline">
          AI essay review tool
        </Link>{" "}
        for voice and specificity. For Stanford's long essays, see our{" "}
        <Link
          href="/blog/stanford-what-matters-to-you-essay"
          className="text-oxblood hover:underline"
        >
          "What Matters to You" guide
        </Link>
        ,{" "}
        <Link
          href="/blog/stanford-intellectual-vitality-essay"
          className="text-oxblood hover:underline"
        >
          "Intellectual Vitality" guide
        </Link>
        , and{" "}
        <Link
          href="/blog/stanford-roommate-letter-essay"
          className="text-oxblood hover:underline"
        >
          Roommate Letter guide
        </Link>
        .
      </p>
    </>
  );
}
