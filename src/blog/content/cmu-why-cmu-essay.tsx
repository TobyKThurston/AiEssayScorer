import Link from "next/link";

export default function Content() {
  return (
    <>
      <h2>The Prompt</h2>
      <p>
        <em>
          "Most students choose their intended major or area of study based
          on a passion or inspiration that's developed over time - what
          passion or inspiration led you to choose this area of study?"
        </em>
      </p>
      <p>
        Suggested length: <strong>around 300 words.</strong> CMU gives you
        a generous box, but tight is better than long.
      </p>

      <h2>What CMU Is Actually Asking</h2>
      <p>
        The prompt is technically about the origin of your interest - not
        "Why CMU." But CMU readers are screening simultaneously for
        alignment with their specific college and their intensely
        collaborative, technical, cross-disciplinary culture. You are
        writing an origin story that <em>also</em> lands inside a specific
        CMU college.
      </p>
      <p>
        CMU admits by college, and the seven are genuinely different
        cultures:
      </p>
      <ul>
        <li>
          <strong>SCS</strong> (School of Computer Science) - among the most
          selective CS admissions on the planet.
        </li>
        <li>
          <strong>CIT</strong> (Engineering) - ECE, MechE, ChemE, BME, CEE.
        </li>
        <li>
          <strong>CFA</strong> (College of Fine Arts) - Architecture, Art,
          Design, Drama, Music.
        </li>
        <li>
          <strong>Dietrich</strong> - humanities and social sciences.
        </li>
        <li>
          <strong>MCS</strong> - Mellon College of Science.
        </li>
        <li>
          <strong>Tepper</strong> - business with a heavy quantitative bent.
        </li>
        <li>
          <strong>Heinz</strong> - public policy (BS through BXA pathways).
        </li>
      </ul>

      <h2>What Works: The Interdisciplinary Programs</h2>
      <p>
        CMU's most distinctive offering is the cross-college joint degree.
        Naming one signals you've actually read their site:
      </p>
      <ul>
        <li>
          <strong>BXA</strong> (BHA, BSA, BCSA) - Fine Arts paired with
          Humanities, Science, or Computer Science.
        </li>
        <li>
          <strong>IDeATe</strong> - 16 minors at the intersection of
          technology and arts.
        </li>
        <li>
          <strong>Robotics Institute</strong> - the undergraduate Robotics
          minor and major for SCS/CIT applicants.
        </li>
        <li>
          <strong>HCI</strong> - the additional major in Human-Computer
          Interaction, almost unique in undergraduate admissions.
        </li>
      </ul>

      <h2>Examples That Work</h2>
      <blockquote>
        "I want to study HCI through an SCS additional major because the
        software I've built - a scheduling tool my robotics team still uses
        - works technically but nobody enjoys using it. The Robotics
        Institute's undergraduate track and the HCI minor's emphasis on
        field studies are the reason I'm writing about CMU and not a
        general CS program."
      </blockquote>
      <p>
        Why it works: names SCS, names a specific additional major, points
        at a concrete past project, and explains <em>why CMU specifically</em>{" "}
        - not just why CS.
      </p>

      <h2>Common Mistakes</h2>
      <ul>
        <li>
          <strong>"Ever since I was young, I loved coding."</strong> CMU
          reads this opening five thousand times a year. Skip it.
        </li>
        <li>
          <strong>Treating CMU as "MIT-adjacent" or a backup.</strong>{" "}
          Readers can feel it. Mentioning MIT is rarely smart.
        </li>
        <li>
          <strong>Not naming a college.</strong> "I want to study at CMU" is
          not an application. "I applied to Dietrich to study Statistics
          and Machine Learning" is.
        </li>
        <li>
          <strong>Writing a pure origin story with no CMU anchor.</strong>{" "}
          The prompt is about passion, but readers still want to see the
          program fit. Bridge the two in your last paragraph.
        </li>
        <li>
          <strong>Naming faculty without engaging their work.</strong>{" "}
          Dropping a professor's name you haven't read is worse than not
          naming one at all.
        </li>
      </ul>

      <h2>The Self-Test</h2>
      <p>
        After your final draft, highlight every sentence that could be
        pasted into a Why Stanford or Why MIT essay. If more than a third
        of your essay highlights, you haven't written a CMU essay - you've
        written a why-a-top-tech-school essay. Rewrite the highlighted
        sections with college-specific anchors.
      </p>

      <p>
        Run your draft through our{" "}
        <Link href="/editor" className="text-oxblood hover:underline">
          AI essay review tool
        </Link>{" "}
        for voice, specificity, and origin-story cliché detection. For the
        broader framework, see our{" "}
        <Link
          href="/blog/why-this-college-essay"
          className="text-oxblood hover:underline"
        >
          "Why This College" essay guide
        </Link>
        . For word-count discipline, read our{" "}
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
