import Link from "next/link";

export default function Content() {
  return (
    <>
      <h2>The Prompt</h2>
      <p>
        <em>
          "We would like to know more about your interest in NYU. What
          motivated you to apply to NYU? Why have you applied or expressed
          interest in a particular campus, school, college, program, and/or
          area of study?"
        </em>
      </p>
      <p>
        Suggested length: <strong>around 400 words.</strong> NYU is flexible
        on word count, but longer than 450 reads as unfocused.
      </p>

      <h2>What NYU Is Actually Asking</h2>
      <p>
        Read the prompt literally. NYU is not asking why you want to go to
        "NYU." It is asking which <em>campus</em>, which <em>school</em>,
        which <em>program</em>, and which <em>area of study</em>. Four
        specific questions inside one sentence.
      </p>
      <p>
        NYU admits to the specific undergraduate school you apply to. Stern,
        Tisch, Tandon, Gallatin, Steinhardt, Liberal Studies, SPS, and CAS
        are functionally different universities with different cultures,
        different faculty, and different graduation requirements. Writing
        about "NYU" in the abstract is the single most common failure mode
        in this essay.
      </p>

      <h2>Why NYC Alone Doesn't Work</h2>
      <p>
        Every NYU applicant writes about New York. Readers have seen the
        "city as classroom" line thousands of times. If your essay could be
        copied and pasted to a Columbia or Fordham application, it is not
        doing the job.
      </p>
      <p>
        The city is allowed to appear — but only as a wrapper around a
        specific program feature. "I want to do fieldwork in the Bronx
        through Steinhardt's Applied Psychology program" is a city mention
        that works. "I want to be in New York because it inspires me" is
        not.
      </p>

      <h2>Program-Specific Hooks That Actually Land</h2>
      <ul>
        <li>
          <strong>Stern:</strong> the Social Impact Core, Stern Signature
          Projects, the Langone co-curriculars, or a specific concentration
          like Business of Entertainment, Media and Technology.
        </li>
        <li>
          <strong>Tisch:</strong> Open Arts minor, the specific studio
          (Meisner, Stella Adler, Atlantic) for Drama, or the ITP/IMA track
          at Tisch for interactive media.
        </li>
        <li>
          <strong>Gallatin:</strong> the self-designed concentration
          structure, the required thesis, and the Gallatin Arts Festival.
          If you apply to Gallatin, you must show you can design a
          concentration — not just that you like "freedom."
        </li>
        <li>
          <strong>Tandon:</strong> Vertically Integrated Projects, the
          NYU–ePoly Institute legacy, or the specific minor in AI & Society.
        </li>
        <li>
          <strong>CAS:</strong> a specific department, specific faculty, or
          the College Core Curriculum's Texts & Ideas sequence.
        </li>
        <li>
          <strong>Abu Dhabi / Shanghai:</strong> the Global Network
          University structure, study-away mobility, or the specific
          regional research centers.
        </li>
      </ul>

      <h2>Examples That Work</h2>
      <blockquote>
        "I'm applying to Gallatin because I want to build a concentration
        around food systems and urban policy — drawing on CAS's Food Studies
        department, Wagner's public policy electives, and a Tisch film
        minor to document the work. Gallatin's thesis requirement is the
        reason I'm applying; I want a year to produce something real, not
        just a capstone."
      </blockquote>
      <p>
        Why it works: names the school, names the concentration, names
        three specific departments by correct internal name, and names the
        structural feature (thesis) doing the work.
      </p>

      <h2>Common Mistakes</h2>
      <ul>
        <li>
          <strong>Mixing two schools.</strong> You can only apply to one.
          Pitching Stern and Tisch in the same essay signals you don't
          understand how NYU admits.
        </li>
        <li>
          <strong>Praising "global perspective" abstractly.</strong> If you
          mean the GNU, name it. If you mean study away, name the site.
        </li>
        <li>
          <strong>Naming a club that doesn't exist or misnaming a
          program.</strong> Readers cross-check. "Stern Business School" is
          not what it's called.
        </li>
        <li>
          <strong>Listing six reasons with no depth.</strong> Two reasons
          done specifically beat six done generically.
        </li>
        <li>
          <strong>Writing "I've always dreamed of NYC."</strong> Fatal
          opening. Cut it.
        </li>
      </ul>

      <h2>The Self-Test</h2>
      <p>
        Open your draft and do a find-and-replace: swap "NYU" for
        "Columbia," and swap the school name for "Columbia College." If the
        essay still reads the same, you have not written a Why NYU essay —
        you have written a why-any-school-in-New-York essay. Rewrite until
        the swap breaks the sentences.
      </p>

      <p>
        Run your draft through our{" "}
        <Link href="/editor" className="text-oxblood hover:underline">
          AI essay review tool
        </Link>{" "}
        to check for specificity and school-naming accuracy. For the
        broader framework, read our{" "}
        <Link
          href="/blog/why-this-college-essay"
          className="text-oxblood hover:underline"
        >
          "Why This College" essay guide
        </Link>{" "}
        and our{" "}
        <Link
          href="/blog/ivy-league-essay-tips"
          className="text-oxblood hover:underline"
        >
          Ivy League essay tips
        </Link>
        .
      </p>
    </>
  );
}
