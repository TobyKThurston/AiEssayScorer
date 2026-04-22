import Link from "next/link";

export default function Content() {
  return (
    <>
      <h2>The Prompt</h2>
      <p>
        <em>
          "What song represents the soundtrack of your life at this moment?"
        </em>
      </p>
      <p>
        Word limit: <strong>50 words.</strong> That's roughly three to four
        sentences. Every word is visible.
      </p>

      <h2>What Princeton Is Actually Asking</h2>
      <p>
        This is not a "favorite song" prompt. The key phrase is "at this
        moment." Princeton wants a snapshot of where you are now — not the
        song that defines your whole life.
      </p>
      <p>
        Readers are screening for three things:
      </p>
      <ul>
        <li>
          <strong>A song choice that reveals a specific sensibility.</strong>{" "}
          Not what's popular. What you actually listen to when nobody is
          watching.
        </li>
        <li>
          <strong>A reason that's small and concrete.</strong> Not "it
          inspires me." The exact lyric, the exact memory, the specific
          thing the song does in your head.
        </li>
        <li>
          <strong>A voice that sounds like a real seventeen-year-old.</strong>{" "}
          Performative answers fail fast at 50 words.
        </li>
      </ul>

      <h2>Songs That Almost Always Fail</h2>
      <ul>
        <li>
          <strong>"Don't Stop Believin'"</strong> — reads as generic
          motivation.
        </li>
        <li>
          <strong>"Happy" by Pharrell</strong> — reads as trying to sound
          positive.
        </li>
        <li>
          <strong>"Imagine" by John Lennon</strong> — reads as performing
          depth.
        </li>
        <li>
          <strong>Taylor Swift's biggest hit from the current year</strong>{" "}
          — reads as what's on Spotify's front page.
        </li>
        <li>
          <strong>Anything your admissions coach suggested.</strong>{" "}
          Readers can tell.
        </li>
      </ul>

      <h2>Songs That Tend to Work</h2>
      <ul>
        <li>
          A song in a language most readers won't know — if it's one you
          grew up with.
        </li>
        <li>
          A song from a genre you actually listen to — bluegrass, Carnatic
          music, Berlin techno, early country.
        </li>
        <li>
          A song with a small personal story attached — the one your
          grandfather played on repeat, the one that was stuck in your
          head during a specific week.
        </li>
        <li>
          A song whose lyrics you can name — specifically, from memory.
        </li>
      </ul>

      <h2>The Structure That Works at 50 Words</h2>
      <p>Use a two-part structure:</p>
      <ol>
        <li>
          <strong>Name the song and artist in the first sentence.</strong>{" "}
          Don't bury the title.
        </li>
        <li>
          <strong>Explain the "right now" in two or three sentences.</strong>{" "}
          What is it doing in your head this season?
        </li>
      </ol>

      <h2>Examples That Work</h2>
      <blockquote>
        "'Llorarás' by Oscar D'León. My dad plays it every Sunday while he
        cooks, and this is the year I started singing along instead of
        pretending not to know the words. It's a breakup song, but in our
        house it means the opposite — nobody is leaving, we are just
        staying loud."
      </blockquote>
      <p>
        Why it works: specific song most readers don't know, specific
        weekly ritual, a reframing the reader wouldn't have predicted.
        48 words.
      </p>
      <blockquote>
        "'The Stable Song' by Gregory Alan Isakov. The line I keep
        hearing is <em>'I'll be sound asleep by the time she sings.'</em>
        {" "}I've been spending the summer closing my grandmother's
        apartment, and the song is what plays when I drive home."
      </blockquote>
      <p>
        Why it works: names a specific lyric, names a specific situation,
        and does not overexplain. 46 words.
      </p>

      <h2>Common Mistakes</h2>
      <ul>
        <li>
          <strong>Quoting two lines and calling it an essay.</strong> A
          lyric alone is not the answer. You still have to explain what
          it does for you.
        </li>
        <li>
          <strong>Describing the song instead of your relationship to
          it.</strong> Princeton knows the song. They want you.
        </li>
        <li>
          <strong>Going over the word count by even two words.</strong>{" "}
          At 50 words, the committee notices.
        </li>
        <li>
          <strong>Picking something deliberately obscure to seem
          interesting.</strong> Readers can tell when the obscurity is
          performed.
        </li>
        <li>
          <strong>Making it a life anthem instead of a "right now"
          song.</strong> The phrase "at this moment" is doing work.
          Respect it.
        </li>
      </ul>

      <h2>The Friend Test</h2>
      <p>
        Before submitting, read your 50 words out loud to a close friend.
        Ask if they could've guessed the song. If they're surprised, and
        say "that's kind of a you song" — it's working. If they say "that
        sounds like something everyone would write" — rewrite.
      </p>

      <p>
        Run your draft through our{" "}
        <Link href="/editor" className="text-oxblood hover:underline">
          AI essay review tool
        </Link>{" "}
        for voice and specificity. For the companion Princeton short
        answer, see our{" "}
        <Link
          href="/blog/princeton-new-skill-essay"
          className="text-oxblood hover:underline"
        >
          Princeton "new skill" essay guide
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
