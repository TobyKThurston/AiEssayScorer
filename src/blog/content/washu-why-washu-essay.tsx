import Link from "next/link";

export default function Content() {
  return (
    <>
      <h2>The Prompt</h2>
      <p>
        <em>
          "Please tell us what motivated you to apply to Washington
          University in St. Louis, and why you're interested in the
          academic program(s) you selected."
        </em>
      </p>
      <p>
        Suggested length: <strong>around 200 words.</strong> WashU reads
        tight essays more generously than sprawling ones.
      </p>

      <h2>What WashU Is Actually Asking</h2>
      <p>
        For years WashU didn't require a supplement. The fact that they
        added one means readers are using it to distinguish applicants who
        actually know the school from applicants who clicked "add to list."
        The bar for specificity is high precisely because the essay is
        short.
      </p>
      <p>
        WashU admits to five undergraduate schools. Name yours:
      </p>
      <ul>
        <li>
          <strong>Arts & Sciences</strong> — the open curriculum and the
          largest school by enrollment.
        </li>
        <li>
          <strong>Olin Business School</strong> — direct admission as a
          first-year, unlike many peer business programs.
        </li>
        <li>
          <strong>Sam Fox School of Design & Visual Arts</strong> —
          Architecture and Art as separate programs, portfolio required.
        </li>
        <li>
          <strong>McKelvey School of Engineering</strong> — strong in
          biomedical and systems.
        </li>
        <li>
          <strong>Goldfarb School of Nursing at Barnes-Jewish College</strong>
          {" "}— the direct-entry BSN track.
        </li>
      </ul>

      <h2>WashU's Underused Selling Points</h2>
      <ul>
        <li>
          <strong>Cross-divisional majors.</strong> WashU makes it unusually
          easy to combine schools — Architecture + Engineering, Business +
          Art, CS + Economics. Naming this structure signals you've read
          past the marketing page.
        </li>
        <li>
          <strong>The open curriculum within Arts & Sciences.</strong> Not
          as famous as Brown's, but real. Use the specific requirements (or
          lack of them) as a reason.
        </li>
        <li>
          <strong>BJC / Barnes-Jewish Hospital access.</strong> For
          pre-meds and pre-health, WashU's teaching hospital is a
          legitimate research anchor.
        </li>
        <li>
          <strong>The First Year Center and College Cabinet structure.</strong>{" "}
          Small detail, but naming it reads as research.
        </li>
      </ul>

      <h2>Examples That Work</h2>
      <blockquote>
        "I'm applying to Arts & Sciences and planning to use the
        cross-divisional pathway to combine Linguistics with Computer
        Science at McKelvey. WashU's open curriculum in A&S means I can
        take the phonetics lab and the NLP sequence the same semester
        without fighting a distribution requirement — a specific structural
        reason I'm not applying to a more rigid program."
      </blockquote>
      <p>
        Why it works: names the school (A&S), names the second school
        (McKelvey), names the specific structural feature (cross-divisional
        majors + open curriculum), and explains what the structure lets
        them do. Under 70 words.
      </p>

      <h2>Common Mistakes</h2>
      <ul>
        <li>
          <strong>Not naming a school.</strong> WashU sees "I want to study
          at WashU" and moves on. Even a first-year undecided applicant
          goes through Arts & Sciences — say so.
        </li>
        <li>
          <strong>"Midwest charm" as substance.</strong> Along with "close-knit
          community," this is the WashU version of every other school's
          tired phrase.
        </li>
        <li>
          <strong>Treating WashU as a top-20 safety.</strong> Readers can
          smell a yield-protective essay. Don't hedge your reasons.
        </li>
        <li>
          <strong>Listing four clubs as your main reasons.</strong> Clubs
          are at every school. Structural features of the curriculum are
          not.
        </li>
        <li>
          <strong>Confusing Olin Business School with Olin College of
          Engineering (different school, different state).</strong> It
          happens. Readers notice.
        </li>
      </ul>

      <h2>The Self-Test</h2>
      <p>
        Read your draft and count how many proper nouns are WashU-specific
        (school names, program names, center names, building names). If
        fewer than three, you have not answered the prompt. Add two more
        and cut adjectives to stay in the word budget.
      </p>

      <p>
        Run your draft through our{" "}
        <Link href="/editor" className="text-[#6366F1] hover:underline">
          AI essay review tool
        </Link>{" "}
        to check for school-naming accuracy and filler. For the broader
        framework, read our{" "}
        <Link
          href="/blog/why-this-college-essay"
          className="text-[#6366F1] hover:underline"
        >
          "Why This College" essay guide
        </Link>
        . For tight word-limit discipline, see our{" "}
        <Link
          href="/blog/college-essay-word-limit"
          className="text-[#6366F1] hover:underline"
        >
          word limit guide
        </Link>
        .
      </p>
    </>
  );
}
