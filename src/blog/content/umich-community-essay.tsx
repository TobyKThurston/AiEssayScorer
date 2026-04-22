import Link from "next/link";

export default function Content() {
  return (
    <>
      <h2>The Prompt</h2>
      <p>
        <em>
          "Everyone belongs to many different communities and/or groups
          defined by (among other things) shared geography, religion,
          ethnicity, income, cuisine, interest, race, ideology, or
          intellectual heritage. Choose one of the communities to which
          you belong, and describe that community and your place within
          it."
        </em>
      </p>
      <p>
        Word limit: <strong>1,500 characters (roughly 250 words).</strong>{" "}
        Characters, not words. Every space counts.
      </p>

      <h2>What Michigan Is Actually Asking</h2>
      <p>
        This is the essay Michigan reads most carefully. It is often the
        piece that differentiates in-state and out-of-state applicants
        with otherwise identical stats. LSA, Ross, Engineering, Art &
        Design, Kinesiology — every applicant writes the same prompt,
        and the essay has to work regardless of school.
      </p>
      <p>
        The operative word is <strong>"belong."</strong> Not "led." Not
        "founded." Not "built." Michigan is screening for a student who
        understands what it means to be a <em>member</em> of something.
      </p>

      <h2>What Readers Are Screening For</h2>
      <ul>
        <li>
          <strong>A real community, not a resume community.</strong> The
          youth group, the Discord server, the family meal, the fishing
          dock. Not the service club you joined in eleventh grade.
        </li>
        <li>
          <strong>Specific texture.</strong> How the community talks.
          What it eats. What it argues about. What it takes for granted.
        </li>
        <li>
          <strong>Your place within it — honestly.</strong> You don't
          have to be the star. You can be the youngest cousin, the new
          member, the translator, the one who shows up every Sunday.
        </li>
      </ul>

      <h2>The "Belong" Test</h2>
      <p>
        Before you pick a community, ask: would this community exist if
        you weren't in it? If the answer is obviously no — because you
        founded it, because you run it — you've picked a leadership
        story, not a belonging story. Pick again.
      </p>
      <p>
        The strongest Michigan community essays are about communities
        that existed before the applicant and will exist after. The
        applicant's job is to describe what it's like to be inside.
      </p>

      <h2>An Example That Works</h2>
      <blockquote>
        "My grandmother's kitchen on Friday nights is a community of
        six. My mother, her three sisters, my cousin Leyla, and me. The
        rule is that you don't get to sit down until you've done
        something — chopped onions, set a glass, poured tea. I am the
        youngest, so I mostly pour tea. I've been pouring tea at that
        table for eleven years. Last year my aunt Roya started letting
        me stay for the political arguments after dinner instead of
        sending me to the living room. The arguments are always in
        Farsi and always about the same four topics: the 1979
        revolution, whether my uncle should sell his apartment in
        Tehran, whether American tomatoes taste like anything, and
        which cousin is getting married next. I have never won one of
        these arguments. I have never needed to. Being allowed to
        stay is its own promotion."
      </blockquote>
      <p>
        Why it works: a real community (six people, weekly, specific
        language), a specific role (youngest, tea-pourer, listener), a
        concrete shift (promoted from the living room), and the
        applicant's place is honest — not the leader, not the hero, the
        member.
      </p>

      <h2>Communities That Tend to Work</h2>
      <ul>
        <li>
          <strong>Family communities with a specific ritual.</strong>{" "}
          The Sunday meal. The holiday. The weekly phone call.
        </li>
        <li>
          <strong>Place-based communities.</strong> Your block. Your
          bus route. Your skate park. Your section of the marching band
          field.
        </li>
        <li>
          <strong>Interest communities you joined, not built.</strong>{" "}
          The local birding group. The Tuesday pickup soccer game. The
          online forum where you lurked for three years before posting.
        </li>
        <li>
          <strong>Inherited communities.</strong> A diaspora, a
          congregation, a trade you grew up around.
        </li>
      </ul>

      <h2>Common Mistakes</h2>
      <ul>
        <li>
          <strong>Leadership as the default move.</strong> "I founded a
          club" is the wrong verb for this prompt. Michigan is not
          asking you to lead. They're asking you to belong.
        </li>
        <li>
          <strong>The college-application-friendly community.</strong>{" "}
          The generic service club, the honor society, the Model UN
          team — unless you genuinely have something new to say, these
          communities sound like checkboxes.
        </li>
        <li>
          <strong>Mixing two communities.</strong> The prompt says
          "one." If you try to cover your soccer team and your
          synagogue, neither gets the texture it needs.
        </li>
        <li>
          <strong>Describing the community but forgetting yourself.</strong>{" "}
          Your place within it is half the prompt. If we can't see
          where you sit, the essay is a description, not an answer.
        </li>
        <li>
          <strong>Forgetting the character count.</strong> 1,500
          characters is tight. Count characters, not words. Cut the
          adjectives before you cut the specifics.
        </li>
      </ul>

      <h2>Self-Test</h2>
      <p>
        Read your draft out loud. Could a reader draw a map of this
        community after hearing the essay — who's in it, what they do,
        what language they use, what you are when you walk in? If yes,
        you've got texture. If the reader could only say "it sounds
        nice," rewrite.
      </p>
      <p>
        Second test: remove every sentence where the verb is about
        leading, organizing, or achieving. What's left? If the essay
        collapses, you wrote a leadership essay. Start over with a
        community where your role is smaller.
      </p>

      <p>
        Run your draft through our{" "}
        <Link href="/editor" className="text-oxblood hover:underline">
          AI essay review tool
        </Link>{" "}
        for specificity and voice. For comparison, read our{" "}
        <Link
          href="/blog/upenn-community-essay"
          className="text-oxblood hover:underline"
        >
          UPenn community essay guide
        </Link>{" "}
        and{" "}
        <Link
          href="/blog/yale-community-essay"
          className="text-oxblood hover:underline"
        >
          Yale community essay guide
        </Link>
        . For more on word and character counts, see our{" "}
        <Link
          href="/blog/college-essay-word-limit"
          className="text-oxblood hover:underline"
        >
          college essay word limit guide
        </Link>
        .
      </p>
    </>
  );
}
