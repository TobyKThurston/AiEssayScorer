// File: src/app/review/page.tsx
'use client';

import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function ReviewPage() {
  /* ---------------- Form State ---------------- */
  const [school,     setSchool]   = useState('');
  const [location,   setLocation] = useState('');
  const [promptText, setPrompt]   = useState('');
  const [essay,      setEssay]    = useState('');
  const [extra,      setExtra]    = useState('');

  /* ---------------- App State ----------------- */
  const [result,      setResult]      = useState<any>(null);
  const [loading,     setLoading]     = useState(false);
  const [creditsLeft, setCredits]     = useState(2);

  /* ---- Suggestions carousel ---- */
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggIndex,   setSuggIndex]   = useState(0);

  /* ---- Premium / lock flag ----
   * Replace with your real subscription check.
   * (e.g. useUser() from Clerk, a DB lookup, etc.)
   */
  const [premiumUnlocked, setPremium] = useState(false);

  const categories = ['Clarity', 'Structure', 'Grammar', 'Originality', 'Engagement'];
  const getValue = (name: string) => {
    if (!result) return 0;
    switch (name) {
      case 'Clarity':     return Number(result.clarity);
      case 'Structure':   return Number(result.structure);
      case 'Grammar':     return Number(result.grammar ?? result.overall ?? result.mechanics ?? result.grammer ?? 0);
      case 'Originality': return Number(result.creativity);
      case 'Engagement':  return Number(result.tone);
      default:            return 0;
    }
  };

  /* ---------------- Submit -------------------- */
  const handleSubmit = async () => {
    if (!essay.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ school, location, prompt: promptText, essay, extra }),
      });

      if (res.status === 402) {            // payment required (example)
        setPremium(false);
        alert('Upgrade to unlock personalised suggestions.');
      } else if (res.status === 403) {     // daily quota
        alert('Daily limit reached. Upgrade for unlimited essays.');
      } else {
        const data = await res.json();
        setResult(data);
        setCredits((c) => Math.max(c - 1, 0));

        /* ----- Suggestions handling ----- */
        if (Array.isArray(data.suggestions) && data.suggestions.length) {
          setSuggestions(data.suggestions);
          setSuggIndex(0);
          setPremium(true);                // they’re allowed to see them
        } else {
          // no suggestions returned ⇒ keep whatever state we already have
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Render -------------------- */
  return (
    <>
      <style jsx global>{`
        /* ---------- Layout ---------- */
        #review-page { padding: 20px; }
        .main-content { display: flex; gap: 20px; }
        .essay-section, .analysis-section { flex: 1; display: flex; flex-direction: column; }
        .bubble {
          background: linear-gradient(145deg, #1f2937, #111827);
          border: 1px solid #3b82f6;
          border-radius: 16px;
          box-shadow: 0 10px 20px rgba(59,130,246,0.15);
          padding: 20px;
          position: relative;
        }

        /* ---------- Heights ---------- */
        .school-bubble  { flex: 0 0 auto; margin-bottom: 10px; }
        .prompt-bubble  { flex: 0 0 10vh;  margin-bottom: 10px; overflow-y: auto; }
        .essay-bubble   { flex: 0 0 36vh; }
        .extra-bubble   { flex: 0 0 16vh; margin-top: 10px; overflow-y: auto; }
        .ratings-bubble { flex: 0 0 auto; max-height: 35vh; overflow-y: auto; }
        .review-bubble  { flex: 0 0 28vh; overflow-y: auto; }
        .suggestions-bubble { flex: 0 0 32vh; margin-top: 10px; overflow-y: auto; }

        /* ---------- Inputs ---------- */
        .school-bubble label,
        .prompt-bubble label,
        .extra-bubble  label { font-size: .9rem; color: #b3d9ff; font-weight: 600; }

        .school-bubble input,
        .prompt-bubble textarea,
        .extra-bubble textarea,
        .essay-bubble textarea {
          width: 100%;
          background: transparent;
          color: #fff;
          border: none;
          outline: none;
          resize: none;
          font-size: 1rem;
          line-height: 1.5;
          margin-top: 6px;
        }
        .prompt-bubble textarea,
        .essay-bubble  textarea,
        .extra-bubble  textarea { height: 100%; }
        .school-bubble input { height: auto; }
        textarea::placeholder,
        input::placeholder { color: rgba(255,255,255,0.5); }

        /* ---------- Submit ---------- */
        .credits { position: absolute; bottom: 10px; right: 10px; font-size: .75rem; opacity: .6; }
        .submit-button {
          margin-top: 10px;
          align-self: flex-end;
          padding: 10px 20px;
          background: #3b82f6;
          border: none;
          border-radius: 8px;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
        }
        .submit-button:disabled { opacity: .5; cursor: not-allowed; }

        /* ---------- Ratings ---------- */
        .rating-category { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .category-name { flex: 1; }
        .rating-bar { flex: 2; height: 8px; border-radius: 4px; background: #374151; overflow: hidden; position: relative; }
        .rating-fill { height: 100%; border-radius: 4px; background: #3b82f6; transition: width 0.3s ease; }
        .rating-bar.loading { background: #2a2e35; }
        .rating-bar.loading::before {
          content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        .rating-value { width: 40px; text-align: right; font-size: .875rem; color: #888; }

        /* ---------- AI Review & Suggestions ---------- */
        .review-bubble h3,
        .suggestions-bubble h3 { margin-bottom: 10px; color: #b3d9ff; }
        .review-bubble p,
        .suggestions-bubble p { color: #ccc; line-height: 1.4; font-size: .95rem; }
        .suggestion-text { min-height: 4rem; }

        /* ----- Arrow buttons ----- */
        .arrow-container {
          position: absolute;
          bottom: 12px; right: 12px;
          display: flex; gap: 8px;
        }
        .arrow-btn {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid #3b82f6;
          background: #1f2937; color: #b3d9ff;
          font-size: 1.1rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s;
        }
        .arrow-btn:hover { background: #3b82f6; color: #fff; }
        .arrow-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* ----- LOCKED state ----- */
        .locked { pointer-events: none; filter: grayscale(1) brightness(0.45); }
        .locked::after {
          content: '🔒'; font-size: 3rem; color: #3b82f6;
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%); opacity: 0.85;
        }
        .locked .arrow-container { display: none; }

        /* ---------- Responsive ---------- */
        @media (max-width: 768px) {
          .main-content { flex-direction: column; }
          .submit-button { align-self: stretch; }
        }
      `}</style>

      <section id="review-page">
        {/* ---------------- NOT signed in ---------------- */}
        <SignedOut>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <SignInButton mode="modal">
              <button className="submit-button">Sign In to Review</button>
            </SignInButton>
          </div>
        </SignedOut>

        {/* ---------------- Signed in ---------------- */}
        <SignedIn>
          <div className="main-content">
            {/* ========== LEFT COLUMN (Inputs) ========== */}
            <div className="essay-section">
              {/* School & Location */}
              <div className="school-bubble bubble">
                <label>
                  School Applying To
                  <input
                    type="text"
                    placeholder="e.g., Columbia University"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                  />
                </label>
                <br /><br />
                <label>
                  Applying From (Location)
                  <input
                    type="text"
                    placeholder="e.g., New York, NY"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </label>
              </div>

              {/* Essay Prompt */}
              <div className="prompt-bubble bubble">
                <label htmlFor="prompt">Essay Prompt</label>
                <textarea
                  id="prompt"
                  placeholder="Paste the exact prompt or question that the school asked here…"
                  value={promptText}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              {/* Essay Text */}
              <div className="essay-bubble bubble">
                <textarea
                  placeholder={
                    'Paste your essay here…\n\nTip: We’ll analyze Clarity, Structure, Grammar, Originality & Engagement.'
                  }
                  value={essay}
                  onChange={(e) => setEssay(e.target.value)}
                />
                <div className="credits">Credits Left: {creditsLeft}</div>
              </div>

              {/* Additional Info */}
              <div className="extra-bubble bubble">
                <label htmlFor="extra">Additional Information (optional)</label>
                <textarea
                  id="extra"
                  placeholder="Anything else we should know?"
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                />
              </div>

              {/* Submit */}
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={loading || creditsLeft === 0 || !essay.trim()}
              >
                {loading ? 'Submitting…' : 'Submit Essay'}
              </button>
            </div>

            {/* ========== RIGHT COLUMN (Analysis) ========== */}
            <div className="analysis-section">
              {/* Ratings */}
              <div className="ratings-bubble bubble">
                <h3>Essay Ratings</h3>
                {categories.map((name) => {
                  const value = getValue(name);
                  const pct   = (value / 10) * 100;
                  return (
                    <div key={name} className="rating-category">
                      <span className="category-name">{name}</span>
                      <div className={`rating-bar${loading || !result ? ' loading' : ''}`}>
                        {!loading && result && (
                          <div className="rating-fill" style={{ width: `${pct}%` }} />
                        )}
                      </div>
                      <span className="rating-value">
                        {loading || !result ? '--/10' : `${value}/10`}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* AI Review */}
              <div className="review-bubble bubble">
                <h3>AI Review</h3>
                <p>
                  {result?.feedback ||
                    'Paste your essay and hit “Submit Essay” to see detailed, constructive feedback here.'}
                </p>
              </div>

              {/* Suggestions */}
              <div
                className={`suggestions-bubble bubble ${
                  premiumUnlocked ? '' : 'locked'
                }`}
              >
                <h3>Suggestions</h3>
                <p className="suggestion-text">
                  {premiumUnlocked
                    ? suggestions[suggIndex] || 'Your personalised suggestions will appear here.'
                    : 'Upgrade to unlock personalised suggestions.'}
                </p>

                {/* Arrows */}
                <div className="arrow-container">
                  <button
                    className="arrow-btn"
                    onClick={() => setSuggIndex((i) => Math.max(i - 1, 0))}
                    disabled={suggIndex === 0}
                    aria-label="Previous suggestion"
                  >
                    &larr;
                  </button>
                  <button
                    className="arrow-btn"
                    onClick={() => setSuggIndex((i) => Math.min(i + 1, suggestions.length - 1))}
                    disabled={suggIndex === suggestions.length - 1}
                    aria-label="Next suggestion"
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SignedIn>
      </section>
    </>
  );
}






