import Link from "next/link";

export default function Content() {
  return (
    <>
      <h2>The Prompt</h2>
      <p>
        <em>
          "What is something your application can't capture about you?"
        </em>{" "}
        (or close variants: "What haven't you shared yet?", "What would
        we miss if we only read the rest of your application?")
      </p>
      <p>
        Word limit: <strong>around 50 words, sometimes up to 100.</strong>{" "}
        UVA rotates the wording, but the spirit of the prompt has been
        steady for years.
      </p>

      <h2>What UVA Is Actually Asking</h2>
      <p>
        This is the "everything else" prompt, and it trips up strong
        applicants who treat it as bonus space for the resume.
      </p>
      <p>
        UVA readers are not asking for an additional accomplishment.
        They're asking: <em>if we only had your transcript, activities
        list, and other essays, what would we still not know about you
        that is genuinely worth knowing?</em>
      </p>
      <p>
        They're screening for:
      </p>
      <ul>
        <li>
          <strong>A specific, textured side of you.</strong> Small,
          concrete, a little weird is fine.
        </li>
        <li>
          <strong>Something the rest of the app would never surface.</strong>{" "}
          Not a class, not an activity, not a volunteer hour.
        </li>
        <li>
          <strong>A voice that sounds like you, not a brochure.</strong>{" "}
          This is the one prompt in the whole supplement where being
          lightly odd usually helps.
        </li>
      </ul>

      <h2>What Tends to Work</h2>
      <ul>
        <li>
          <strong>A specific recurring ritual.</strong> Saturday
          morning pho with your dad. Tuesday calls with your
          grandmother. The annual trip to the same campsite.
        </li>
        <li>
          <strong>A collecting habit.</strong> Postcards from every
          laundromat you've ever used. Receipts. Stickers from produce.
          Your grandfather's ties.
        </li>
        <li>
          <strong>A niche expertise.</strong> You know every bus line
          in your city by heart. You can identify birds by call. You
          have strong opinions about grocery store layouts.
        </li>
        <li>
          <strong>A small preference with a real reason.</strong> You
          only write in pencil. You always order the third thing on the
          menu. You've been cutting your own hair since tenth grade.
        </li>
      </ul>

      <h2>An Example That Works</h2>
      <blockquote>
        "I've kept a list of every bench I've sat on long enough to
        finish a book. It's 47 benches. The best one is outside the
        Alexandria public library, left side of the entrance, facing
        the parking lot. The worst one is in Reagan National, gate
        B-45, no back. I'm looking forward to adding Charlottesville
        benches to the list."
      </blockquote>
      <p>
        Why it works: specific (47 benches, named locations), textured
        (a ranked favorite and worst), a little weird in a true way,
        and the closing line gestures at Charlottesville without making
        the whole essay about UVA.
      </p>

      <h2>Common Mistakes</h2>
      <ul>
        <li>
          <strong>Using the space for a "missed" accomplishment.</strong>{" "}
          "My app doesn't capture that I also placed second at regional
          debate..." — this is exactly the move the prompt is designed
          to catch. It reads as resume padding.
        </li>
        <li>
          <strong>Treating it as a confessional.</strong> This is not
          the place for a hardship essay. If you have a hardship to
          share, it belongs in the{" "}
          <Link
            href="/blog/common-app-additional-information-guide"
            className="text-[#6366F1] hover:underline"
          >
            Additional Information section
          </Link>
          , not here.
        </li>
        <li>
          <strong>Trying to be profound in 50 words.</strong> Profundity
          at this length reads as performance. Small and true beats
          big and abstract.
        </li>
        <li>
          <strong>Picking something the application already captures.</strong>{" "}
          If your activities list includes "bassoon," the bassoon is
          not the answer. Go one layer deeper — what does your reed
          collection look like, what's your warm-up ritual.
        </li>
        <li>
          <strong>Opening with "Something my application can't
          capture about me is..."</strong> The prompt is the prompt.
          Don't restate it. Start with the thing itself.
        </li>
      </ul>

      <h2>The Pick-Your-Topic Test</h2>
      <p>
        Write down ten candidates without editing. Then look at the
        list and ask:
      </p>
      <ol>
        <li>
          <strong>Is this already in my app?</strong> If yes, cross it
          out.
        </li>
        <li>
          <strong>Would a close friend recognize this as me
          immediately?</strong> If no, cross it out.
        </li>
        <li>
          <strong>Can I describe it with one specific, unexpected
          detail?</strong> If no, cross it out.
        </li>
      </ol>
      <p>
        Whatever survives all three cuts is the essay. Usually the
        survivor is the one you were slightly embarrassed to write
        down.
      </p>

      <h2>Self-Test</h2>
      <p>
        Read your draft out loud to someone who knows you well. If they
        laugh in recognition, you've got it. If they say "you should
        have written about X instead," they are almost always right —
        write about X.
      </p>

      <p>
        Run your draft through our{" "}
        <Link href="/editor" className="text-[#6366F1] hover:underline">
          AI essay review tool
        </Link>{" "}
        for voice and specificity. For related reading, see our{" "}
        <Link
          href="/blog/why-this-college-essay"
          className="text-[#6366F1] hover:underline"
        >
          "Why This College" guide
        </Link>{" "}
        and our{" "}
        <Link
          href="/blog/college-essay-word-limit"
          className="text-[#6366F1] hover:underline"
        >
          college essay word limit guide
        </Link>
        . For writing a genuine hardship into the app the right way,
        read our{" "}
        <Link
          href="/blog/common-app-additional-information-guide"
          className="text-[#6366F1] hover:underline"
        >
          Common App Additional Information guide
        </Link>
        .
      </p>
    </>
  );
}
