// app/privacy/page.tsx
import React from 'react';

export const metadata = {
  title: 'Privacy Policy – Ivy Admit AI',
  description: 'Our commitment to your privacy and data security.',
};

export default function PrivacyPage() {
  return (
    <main className="prose max-w-3xl mx-auto p-8">
      <h1>Privacy Policy</h1>
      <p><strong>Effective date:</strong> June 13, 2025</p>

      <h2>1. Introduction</h2>
      <p>
        At <strong>ivyadmit.ai</strong> (“we”, “us”), we respect your privacy. This policy explains what data we collect, why, and how you can control it.
      </p>

      <h2>2. Information We Collect</h2>
      <h3>a. Account & Profile Data</h3>
      <ul>
        <li>Name, email, username (via Clerk).</li>
        <li>Payment info is handled by Stripe; we don’t store full card details.</li>
      </ul>

      <h3>b. Content You Submit</h3>
      <p>
        Essays, prompts, extra info—so we can generate feedback.
      </p>

      {/* …and so on for the rest of the sections… */}

      <h2>10. Contact Us</h2>
      <p>
        For privacy questions: <a href="mailto:privacy@ivyadmit.ai">privacy@ivyadmit.ai</a>
      </p>
    </main>
  );
}
