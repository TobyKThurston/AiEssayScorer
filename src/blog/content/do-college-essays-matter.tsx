import Link from "next/link";

// Common Data Set Section C7 ("Application essay") ratings and acceptance
// rates for 37 selective U.S. colleges. Every figure is drawn from each
// school's own published Common Data Set unless noted. Rows are sorted by
// acceptance rate (most selective first). See the methodology note at the
// foot of the article for sourcing and caveats.
type Rating = "Very Important" | "Important" | "Considered";

interface SchoolRow {
  school: string;
  rating: Rating;
  rate: string;
  /** Footnote marker for rows whose acceptance rate uses a non-Fall-2024 cycle. */
  note?: "dagger";
}

const schools: SchoolRow[] = [
  { school: "Caltech", rating: "Very Important", rate: "2.6%" },
  { school: "Harvard", rating: "Very Important", rate: "3.6%" },
  { school: "Stanford", rating: "Very Important", rate: "3.6%" },
  { school: "Yale", rating: "Very Important", rate: "3.9%" },
  { school: "Columbia", rating: "Very Important", rate: "3.9%" },
  { school: "MIT", rating: "Very Important", rate: "4.5%" },
  { school: "University of Chicago", rating: "Very Important", rate: "4.5%" },
  { school: "University of Pennsylvania", rating: "Very Important", rate: "5.4%" },
  { school: "Dartmouth", rating: "Very Important", rate: "5.4%" },
  { school: "Vanderbilt", rating: "Very Important", rate: "5.4%", note: "dagger" },
  { school: "Duke", rating: "Considered", rate: "5.7%" },
  { school: "Brown", rating: "Very Important", rate: "5.7%", note: "dagger" },
  { school: "Bowdoin", rating: "Very Important", rate: "7.1%" },
  { school: "Swarthmore", rating: "Very Important", rate: "7.5%" },
  { school: "Northwestern", rating: "Very Important", rate: "7.7%" },
  { school: "Rice", rating: "Very Important", rate: "8.0%" },
  { school: "Williams", rating: "Important", rate: "8.3%" },
  { school: "Cornell", rating: "Very Important", rate: "8.4%" },
  { school: "Amherst", rating: "Very Important", rate: "9.0%" },
  { school: "UCLA", rating: "Very Important", rate: "9.0%" },
  { school: "New York University (NYU)", rating: "Very Important", rate: "9.2%" },
  { school: "USC", rating: "Very Important", rate: "9.8%" },
  { school: "Emory", rating: "Important", rate: "10.3%" },
  { school: "Middlebury", rating: "Important", rate: "10.8%" },
  { school: "UC Berkeley", rating: "Very Important", rate: "11.0%" },
  { school: "Notre Dame", rating: "Very Important", rate: "11.3%" },
  { school: "Tufts", rating: "Very Important", rate: "11.5%" },
  { school: "Carnegie Mellon", rating: "Important", rate: "11.7%" },
  { school: "Washington University in St. Louis", rating: "Very Important", rate: "12.1%" },
  { school: "Georgetown", rating: "Very Important", rate: "12.9%" },
  { school: "Wellesley", rating: "Important", rate: "14.0%" },
  { school: "Georgia Tech", rating: "Important", rate: "14.1%" },
  { school: "UNC–Chapel Hill", rating: "Important", rate: "15.3%" },
  { school: "University of Michigan", rating: "Important", rate: "15.6%" },
  { school: "Boston College", rating: "Important", rate: "16.2%" },
  { school: "University of Virginia", rating: "Important", rate: "16.8%" },
  { school: "UT Austin", rating: "Considered", rate: "26.6%" },
];

const veryImportant = schools.filter((s) => s.rating === "Very Important").length;
const important = schools.filter((s) => s.rating === "Important").length;
const considered = schools.filter((s) => s.rating === "Considered").length;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do college essays really matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — especially at selective colleges. Across 37 top U.S. colleges, 25 rate the application essay 'Very Important' and 10 rate it 'Important' in their published Common Data Set. None rate it 'Not Considered.' At schools that admit fewer than 8% of applicants, the essay is rated 'Very Important' almost without exception — the same tier as your GPA and the rigor of your course load.",
      },
    },
    {
      "@type": "Question",
      name: "How much does the college essay count compared to GPA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At most highly selective colleges, the essay sits in the same Common Data Set importance tier as your grades and course rigor — 'Very Important.' Grades still come first because they are the largest, most reliable signal, but among applicants who all have strong transcripts, the essay is one of the few factors that still separates candidates.",
      },
    },
    {
      "@type": "Question",
      name: "Do essays matter more now that colleges are test-optional?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In relative terms, yes. In the most recent NACAC survey, only about 5% of colleges rated admission test scores as carrying considerable importance — down sharply since test-optional policies spread after 2020 — while 18.9% rated the essay that way. The essay now outranks standardized tests in the national data, even though the essay's own weight has stayed roughly stable.",
      },
    },
    {
      "@type": "Question",
      name: "Can a strong essay get you into a college you otherwise wouldn't get into?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It can change a decision at the margin. An essay rarely overrides a transcript that is far below a school's range, and a single essay will not single-handedly manufacture an admit. But among the large pool of academically qualified applicants competing for the same seats, the essay is one of the clearest places to move from 'qualified' to 'chosen' — or to be passed over.",
      },
    },
    {
      "@type": "Question",
      name: "Do any top colleges not care about the application essay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Very few. Of 37 top colleges, only Duke and UT Austin rate the essay merely 'Considered.' UT Austin rates every academic factor that way because Texas law auto-admits a large share of its class by class rank. Duke is the genuine outlier among elite private universities — but Duke still reads and weighs essays as part of holistic review.",
      },
    },
  ],
};

export default function Content() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p>
        Short answer: yes — and at selective colleges, far more than most applicants assume. We pulled the published <strong>Common Data Set</strong> for 37 of the most competitive colleges in the United States and read one specific line in each: how the admissions office rates the application essay. <strong>{veryImportant} of the 37 rate it &ldquo;Very Important&rdquo;</strong> — the highest of four possible levels, the same tier they assign to your GPA and the rigor of your transcript. Another {important} rate it &ldquo;Important.&rdquo; <strong>Not one rates it &ldquo;Not Considered.&rdquo;</strong>
      </p>
      <p>
        That is not a marketing claim or a counselor&rsquo;s opinion. It is the colleges&rsquo; own data, in a standardized format they fill out every year. This article shows you exactly what they reported, school by school, and then explains what &ldquo;Very Important&rdquo; actually means for how you should spend your time.
      </p>

      <div className="keybox">
        <p><strong>Key findings — 37 top colleges, from their own Common Data Sets</strong></p>
        <ul>
          <li><strong>{veryImportant} of 37</strong> rate the application essay <strong>&ldquo;Very Important&rdquo;</strong> — the top of the four-level scale.</li>
          <li><strong>{veryImportant + important} of 37</strong> rate it &ldquo;Very Important&rdquo; or &ldquo;Important.&rdquo; Only {considered} rate it merely &ldquo;Considered.&rdquo; <strong>Zero</strong> rate it &ldquo;Not Considered.&rdquo;</li>
          <li>Of the <strong>15 schools that admit under 8%</strong> of applicants, <strong>14 rate the essay &ldquo;Very Important.&rdquo;</strong> The lone exception is Duke.</li>
          <li>Nationally, the essay (18.9% of colleges call it considerably important) now <strong>outranks SAT/ACT scores</strong> (4.9%) — NACAC&rsquo;s most recent data.</li>
          <li>The gap that matters: at <em>all</em> colleges the essay is one factor among many; at <em>selective</em> colleges it is decisive.</li>
        </ul>
      </div>

      <h2>What the Common Data Set actually is</h2>
      <p>
        The <strong>Common Data Set (CDS)</strong> is a standardized survey that nearly every U.S. college completes each year. It was created jointly by the College Board, Peterson&rsquo;s, and U.S. News &amp; World Report to give families accurate, comparable data instead of marketing copy. Because every school answers the same questions in the same format, the CDS is the closest thing admissions has to a public ledger.
      </p>
      <p>
        The line we care about lives in <strong>Section C7</strong>. It is a grid titled, roughly, &ldquo;the relative importance of each of the following academic and nonacademic factors in first-time, first-year admission decisions.&rdquo; The factors include class rank, GPA, rigor of secondary school record, standardized test scores, recommendations, extracurriculars, character, and — on its own row — <strong>application essay</strong>. Each factor gets exactly one of four ratings:
      </p>
      <ul>
        <li><strong>Very Important</strong> — top tier; a primary driver of the decision.</li>
        <li><strong>Important</strong> — a meaningful, weighed factor.</li>
        <li><strong>Considered</strong> — looked at, but not a heavy factor.</li>
        <li><strong>Not Considered</strong> — ignored entirely.</li>
      </ul>
      <p>
        A school cannot spin this. The rating is a single checkmark in a public document. When a college puts the essay in the &ldquo;Very Important&rdquo; column, it is telling you, in writing, that the essay belongs in the same conversation as your grades.
      </p>

      <h2>The data: essay importance at 37 top colleges</h2>
      <p>
        Below is the full table, sorted by acceptance rate so the most selective schools come first. The pattern is hard to miss: as schools get more selective, the essay rating climbs and stays pinned at the top.
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>College</th>
              <th>Essay rating (CDS&nbsp;C7)</th>
              <th>Acceptance rate</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((s) => (
              <tr key={s.school}>
                <td>{s.school}</td>
                <td>
                  {s.rating === "Very Important" ? (
                    <strong>Very Important</strong>
                  ) : (
                    s.rating
                  )}
                </td>
                <td>
                  {s.rate}
                  {s.note === "dagger" ? <sup>&dagger;</sup> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: "0.82em", color: "var(--color-pencil)" }}>
        Essay ratings are taken from each college&rsquo;s published Common Data Set, Section C7 (2024&ndash;2025 edition unless noted). Acceptance rates are computed from CDS Section C1 for the Fall 2024 entering class. <sup>&dagger;</sup>Brown&rsquo;s rate is its Class of 2029 figure; Vanderbilt&rsquo;s figures are from its 2025&ndash;2026 CDS. See the methodology note at the end.
      </p>

      <h2>What the numbers say</h2>
      <p>
        {veryImportant} of 37 schools — roughly two in three — put the essay in the highest tier. Add the {important} that rate it &ldquo;Important&rdquo; and you reach {veryImportant + important} of 37. Every single school in this dataset, without exception, treats the essay as a factor that is weighed in the decision. There is no &ldquo;safety&rdquo; here where the essay quietly stops mattering.
      </p>
      <p>
        The selectivity correlation is the sharpest finding. Of the 15 schools that admit fewer than 8% of applicants — Caltech, Harvard, Stanford, Yale, Columbia, MIT, Chicago, Penn, Dartmouth, Vanderbilt, Duke, Brown, Bowdoin, Swarthmore, and Northwestern — <strong>14 rate the essay &ldquo;Very Important.&rdquo;</strong> The reason is structural. When a school rejects 95% of applicants, the overwhelming majority of those rejected are academically qualified. Test scores have compressed toward the ceiling. Grades cluster near the top. The transcript can tell the office that you <em>can</em> do the work; it cannot tell them who you are, how you think, or why you over the next equally-qualified applicant. The essay is one of the few instruments left that can.
      </p>

      <h3>The two outliers — and why they aren&rsquo;t really exceptions</h3>
      <p>
        Only two schools rate the essay merely &ldquo;Considered&rdquo;: <strong>UT Austin</strong> and <strong>Duke</strong>.
      </p>
      <p>
        UT Austin is not a counterexample at all. It rates <em>every</em> academic factor — rigor, class rank, GPA, test scores, essays, recommendations — only &ldquo;Considered.&rdquo; That is an artifact of Texas&rsquo;s automatic-admission law, which admits a large share of each class purely on high-school class rank. The CDS grid simply cannot describe a system where a statute does much of the sorting. For the holistic-review portion of UT Austin&rsquo;s class, and for its competitive majors, essays still carry real weight.
      </p>
      <p>
        Duke is the genuine outlier — the one elite private university in the set that files the essay under &ldquo;Considered.&rdquo; Even so, &ldquo;Considered&rdquo; is not &ldquo;Not Considered.&rdquo; Duke reads essays, weighs them in holistic review, and requires a supplemental essay of its own. The honest takeaway is narrow: at exactly one school in 37, the essay is rated a notch lower. Everywhere else, it is at or near the top.
      </p>

      <h2>&ldquo;But I read that essays only matter to 19% of colleges&rdquo;</h2>
      <p>
        You may have seen a very different-sounding statistic. The National Association for College Admission Counseling (NACAC) surveys colleges nationally, and in its most recent data only <strong>18.9% of colleges</strong> rated the application essay as carrying &ldquo;considerable importance.&rdquo; Both numbers are true. They describe different worlds.
      </p>
      <p>
        NACAC&rsquo;s survey covers <em>all</em> four-year colleges — including the large majority that admit most of their applicants. A school that accepts 80% of applicants does not need the essay to make decisions; grades alone do the job. Average those schools together with the selective ones and the essay looks like a minor factor.
      </p>
      <p>
        But you are almost certainly not reading this because you are applying to open-enrollment schools. You are reading it because you are applying to schools that reject most of the people who apply. <strong>For that group, the national average is the wrong number.</strong> The right number is the one in the table above: at the colleges where admission is genuinely competitive, the essay is rated &ldquo;Very Important&rdquo; the overwhelming majority of the time. The 19% figure and the 68% figure are not in conflict — they are a measure of how much selectivity changes the rules.
      </p>

      <h3>The essay now outranks your test scores</h3>
      <p>
        Here is the comparison that reframes everything. In that same NACAC data, the share of colleges rating <strong>SAT/ACT scores</strong> as considerably important had fallen to about <strong>4.9%</strong> — a steep decline as test-optional and test-blind policies spread after 2020. The essay, at 18.9%, did not rise much; it simply held its ground while testing dropped beneath it.
      </p>
      <p>
        The implication for how you budget your effort is direct. A great many applicants still pour months into raising an SAT score by 30 points. Nationally, the application essay is now rated a considerably important factor at roughly <strong>four times as many colleges</strong> as test scores are. If you are choosing where the next ten hours of your application effort go, the data is not subtle about it.
      </p>

      <h2>Why the essay carries more weight than it used to</h2>
      <p>
        Three forces have converged, and all three point the same direction.
      </p>
      <p>
        <strong>1. Test-optional admissions removed a signal.</strong> When a third or more of an applicant pool applies without a test score, admissions officers lose a standardized number they used to lean on. That weight does not vanish — it redistributes onto the factors that remain. Grades, course rigor, recommendations, and the essay all absorb more of the decision.
      </p>
      <p>
        <strong>2. Application volume has exploded.</strong> In the 2024&ndash;2025 cycle, the Common App processed <strong>more than 10 million applications</strong> from roughly 1.5 million applicants — the first time first-year applications crossed ten million. Easy online applications mean each selective school now reads a far larger pile for the same number of seats. More qualified applicants per seat means more decisions that come down to differentiation — exactly what the essay supplies.
      </p>
      <p>
        <strong>3. Grades have inflated and compressed.</strong> When a large share of an applicant pool arrives with near-identical GPAs, the transcript loses resolution at the top. Two students with a 4.0 and a demanding course load look the same on paper. The essay is where they stop looking the same.
      </p>

      <h2>What &ldquo;Very Important&rdquo; means inside the admissions office</h2>
      <p>
        A &ldquo;Very Important&rdquo; rating does not mean a beautiful essay overrides a weak transcript. Selective admissions is closer to a series of gates than a single score. Your academic record gets you into the room — it establishes that you can handle the work. Once you are in the room with the other qualified applicants, the essay is one of the loudest things in it.
      </p>
      <p>
        Admissions offices describe the essay&rsquo;s job consistently. Yale&rsquo;s own admissions guidance says essays let the committee &ldquo;get at the personal side of the applicant&rdquo; and form &ldquo;a full sense of the human being behind&rdquo; the file — and stresses that an essay must sound like the person who wrote it. That is the function: the transcript and activities list answer <em>what</em> you did; the essay answers <em>who is doing the doing</em>. It is the one part of the application written in your voice, about a subject only you can write.
      </p>
      <p>
        In practice, a strong essay does a few specific things at once. It gives a reader a reason to advocate for you in committee. It resolves the question &ldquo;why this applicant over that one&rdquo; when two files are otherwise even. And it can reframe the rest of the application — turning a list of activities into evidence of a coherent person. A weak essay does the reverse: it leaves a qualified file inert, with nothing for a reader to champion.
      </p>

      <h2>The hidden math: how many essays you&rsquo;re actually writing</h2>
      <p>
        Applicants tend to picture &ldquo;the essay&rdquo; as one 650-word personal statement. The real workload is much larger. The Common App reports that applicants now submit, on average, just under <strong>seven applications each</strong> — and selective-college applicants typically apply to more. Most selective schools require their own supplemental essays on top of the personal statement: anywhere from one short prompt to six.
      </p>
      <p>
        A student applying to a dozen selective colleges can realistically face <strong>25 to 40 individual essay prompts</strong> across a single cycle — the personal statement, plus &ldquo;Why us&rdquo; essays, community essays, intellectual-interest essays, and short-answer questions. That is the true scope of the writing, and it is why starting early and having a reliable way to check each draft matters more than applicants expect. Treating the essay as &ldquo;Very Important&rdquo; is not just about one document; it is about a body of work.
      </p>

      <h2>What this should change about how you work</h2>
      <p>
        If the data above is right — and it is the colleges&rsquo; own data — a few things follow.
      </p>
      <ul>
        <li><strong>Stop treating the essay as the last box to check.</strong> It is rated alongside your GPA. Give it a share of effort that matches.</li>
        <li><strong>Reallocate from low-yield work.</strong> A marginal test-score retake is, by the national data, a far smaller lever than a sharper essay. Spend accordingly.</li>
        <li><strong>Start early enough to revise.</strong> Strong essays go through five or more substantive drafts. The first finds the story; later drafts cut, sharpen, and protect the voice. You cannot do that the night before a deadline.</li>
        <li><strong>Get specific feedback, not just a proofread.</strong> &ldquo;It&rsquo;s good&rdquo; from a parent or friend does not tell you whether the essay is doing its admissions job. You need to know where the reflection is thin, where the voice slips, and where a reader stops caring.</li>
        <li><strong>Budget for the supplements.</strong> The personal statement is one essay of many. Plan the whole portfolio.</li>
      </ul>

      <h2>How to tell whether your essay is doing its job</h2>
      <p>
        The gap between an essay that earns a &ldquo;Very Important&rdquo; rating its due and one that wastes it is usually not grammar — it is substance and voice. The most common failure modes are consistent: reflection that is thin relative to the narrative (you tell the story but never show the thinking), a voice that has been edited until it sounds like a generic applicant, and an essay that simply repeats what the activities list already said.
      </p>
      <p>
        The fastest way to see those problems is to get your draft scored across separate dimensions rather than judged as a single blurry &ldquo;is it good?&rdquo; Our <Link href="/ai-essay-review" className="text-oxblood hover:underline">AI essay review</Link> tool scores a draft on content, structure, and voice and returns line-level suggestions, so you can see precisely which dimension is dragging — then target it. If you want a fast pass first, the <Link href="/college-essay-checker" className="text-oxblood hover:underline">college essay checker</Link> flags the obvious issues, and the <Link href="/how-to-improve-college-essay" className="text-oxblood hover:underline">revision guide</Link> walks through fixing whichever score comes back lowest. For the supplements specifically, start with our <Link href="/blog/why-this-college-essay" className="text-oxblood hover:underline">&ldquo;Why This College&rdquo; essay guide</Link>, and for the personal statement, the <Link href="/blog/how-to-write-common-app-essay" className="text-oxblood hover:underline">Common App personal statement walkthrough</Link>.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Do college essays really matter?</h3>
      <p>
        Yes — especially at selective colleges. Across 37 top U.S. colleges, {veryImportant} rate the application essay &ldquo;Very Important&rdquo; and {important} rate it &ldquo;Important&rdquo; in their published Common Data Set. None rate it &ldquo;Not Considered.&rdquo; At schools that admit fewer than 8% of applicants, the essay is rated &ldquo;Very Important&rdquo; almost without exception.
      </p>

      <h3>How much does the college essay count compared to GPA?</h3>
      <p>
        At most highly selective colleges, the essay sits in the same CDS importance tier as your grades and course rigor — &ldquo;Very Important.&rdquo; Grades still come first because they are the largest, most reliable signal of academic readiness. But among applicants who all have strong transcripts, the essay is one of the few factors that still separates candidates.
      </p>

      <h3>Do essays matter more now that colleges are test-optional?</h3>
      <p>
        In relative terms, yes. In NACAC&rsquo;s most recent data, only about 5% of colleges rated admission test scores as considerably important — down sharply since test-optional policies spread after 2020 — while 18.9% rated the essay that way. The essay now outranks standardized tests nationally, even though the essay&rsquo;s own weight has stayed roughly stable.
      </p>

      <h3>Can a strong essay get you into a school you otherwise wouldn&rsquo;t get into?</h3>
      <p>
        It can change a decision at the margin. An essay rarely overrides a transcript far below a school&rsquo;s range, and one essay will not single-handedly manufacture an admit. But among the large pool of academically qualified applicants competing for the same seats, the essay is one of the clearest places to move from &ldquo;qualified&rdquo; to &ldquo;chosen.&rdquo;
      </p>

      <h3>Do any top colleges not care about the essay?</h3>
      <p>
        Very few. Of 37 top colleges, only Duke and UT Austin rate the essay merely &ldquo;Considered.&rdquo; UT Austin rates every academic factor that way because Texas law auto-admits much of its class by class rank. Duke is the genuine outlier among elite private universities — but Duke still reads and weighs essays in holistic review.
      </p>

      <h2>Methodology and sources</h2>
      <p>
        Essay-importance ratings are taken directly from each college&rsquo;s published <strong>Common Data Set, Section C7</strong> (&ldquo;Application essay&rdquo; row), using the 2024&ndash;2025 edition except Vanderbilt, where the 2025&ndash;2026 edition is the most recent published. Acceptance rates are computed from CDS Section C1 (admitted ÷ applied, first-time first-year students) for the Fall 2024 entering class, except Brown, which is reported as its Class of 2029 figure from Brown&rsquo;s admissions office, and Vanderbilt, from its 2025&ndash;2026 CDS.
      </p>
      <p>
        National figures on factor importance are from the National Association for College Admission Counseling (NACAC), &ldquo;Factors in the Admission Decision.&rdquo; Application-volume figures are from the Common App&rsquo;s 2024&ndash;2025 cycle reporting. A small number of well-known schools — including Princeton and Johns Hopkins — were left out of the table because their current Common Data Set could not be verified from a primary document at the time of writing; their published admissions guidance describes the essay in the same terms as their peers. Ratings reflect the most recent data available as of May 2026 and can change year to year; always confirm against a school&rsquo;s latest CDS.
      </p>

      <p>
        The bottom line is simple, and it comes from the colleges themselves: at the schools you are working hardest to reach, the essay is not a formality. It is rated alongside your grades. The good news is that, unlike your GPA, your essay is still entirely within your control today. To see how a current draft is doing across content, structure, and voice, run it through our <Link href="/ai-essay-review" className="text-oxblood hover:underline">free essay review</Link>, then use the patterns in <Link href="/blog/ivy-league-essay-tips" className="text-oxblood hover:underline">what admissions officers look for in essays</Link> to push the weakest dimension higher.
      </p>
    </>
  );
}
