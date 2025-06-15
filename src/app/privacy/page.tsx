// app/privacy/page.tsx
import React from 'react';

export const metadata = {
  title: 'Privacy Policy – Ivy Admit AI',
  description: 'Our commitment to your privacy and data security.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#111827] min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-white text-center mb-2">
          Privacy Policy
        </h1>
        <p className="text-center text-sm text-gray-400 mb-8">
          <strong>Effective date:</strong> June 13, 2025
        </p>

        {/* Content */}
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              1. Introduction
            </h2>
            <p className="leading-relaxed">
              At <strong>ivyadmit.ai</strong> (“we”, “us”), we respect your privacy. This policy explains what data we collect, why, and how you can control it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              2. Information We Collect
            </h2>
            <p className="leading-relaxed">
              <strong>a. Account & Profile Data:</strong> Name, email, username (via Clerk). Payment info is handled by Stripe; we don’t store full card details.
            </p>
            <p className="leading-relaxed">
              <strong>b. Content You Submit:</strong> Essays, prompts, extra info—so we can generate feedback.
            </p>
            <p className="leading-relaxed">
              <strong>c. Usage & Analytics:</strong> Pages visited, button clicks, session lengths, IP addresses, browser and device info.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              3. How We Use Your Data
            </h2>
            <p className="leading-relaxed">
              Service delivery (grading essays, tracking credits), billing (processing subscriptions), product improvement (analytics, A/B testing), and communications (account notices, billing receipts).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              4. Cookies & Tracking
            </h2>
            <p className="leading-relaxed">
              We use cookies to authenticate users (Clerk), process payments (Stripe), and gather anonymized analytics (Google Analytics or similar). You can disable cookies via your browser settings, but some features may not work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              5. Data Sharing & Third Parties
            </h2>
            <p className="leading-relaxed">
              We share data with: Clerk (authentication), Stripe (payments), analytics providers, and legal authorities if required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              6. Data Retention
            </h2>
            <p className="leading-relaxed">
              We retain account info and essays until you delete your account or we discontinue the Service. Analytics data is stored for up to 24 months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              7. Security
            </h2>
            <p className="leading-relaxed">
              We use industry-standard encryption (TLS) and best practices to protect your data, but no system is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              8. Subscription & Cancellation
            </h2>
            <p className="leading-relaxed">
              To cancel your subscription, please email <strong>support@YOUR_DOMAIN.com</strong> with the subject “Cancel Subscription.” We will process your request within 48 hours. You will retain premium access until the end of your current billing period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              9. California Privacy Rights (CCPA)
            </h2>
            <p className="leading-relaxed">
              If you are a California resident, you have the right to know, delete, and opt out of sale of your personal data. To exercise these rights, email <strong>privacy@YOUR_DOMAIN.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              10. Updates to This Policy
            </h2>
            <p className="leading-relaxed">
              We may update this policy; we will post changes here with a new effective date. Continued use constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              11. Contact Us
            </h2>
            <p className="leading-relaxed">
              For privacy questions: <a href="mailto:getivyadmit@gmail.com" className="text-blue-400 hover:text-blue-200">privacy@YOUR_DOMAIN.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
