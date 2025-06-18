/* app/privacy/page.tsx */
import React from 'react';

export const metadata = {
  title: 'Privacy Policy – Ivy Admit AI',
  description: 'How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#111827] min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-white text-center mb-2">
          Privacy&nbsp;Policy
        </h1>
        <p className="text-center text-sm text-gray-400 mb-8">
          <strong>Effective date:</strong>&nbsp;June&nbsp;18,&nbsp;2025
        </p>

        {/* Policy */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          {/* 1. Intro */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              1.&nbsp;Introduction
            </h2>
            <p>
              At <strong>ivyadmit.ai</strong> (“<strong>we</strong>,”
              “<strong>us</strong>,” or “<strong>our</strong>”), we respect your
              privacy and are committed to protecting your personal
              information. This Privacy Policy explains what data we collect,
              why we collect it, and how you can exercise your rights.
            </p>
          </section>

          {/* 2. Data We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              2.&nbsp;Information&nbsp;We&nbsp;Collect
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Account&nbsp;Data&nbsp;–</strong> Name, email, and
                profile ID provided by Clerk; partial billing details (last&nbsp;4
                of card, card brand) from Stripe. We never store full card
                numbers or CVV.
              </li>
              <li>
                <strong>Essay&nbsp;Content&nbsp;–</strong> Essays, prompts, and
                supplementary text you submit so we can generate feedback.
              </li>
              <li>
                <strong>Usage&nbsp;Data&nbsp;–</strong> Log files, IP address,
                device/browser type, and interaction events (page views, button
                clicks) collected via analytics cookies or pixels.
              </li>
            </ul>
          </section>

          {/* 3. How we use */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              3.&nbsp;How&nbsp;We&nbsp;Use&nbsp;Your&nbsp;Information
            </h2>
            <p>
              We use your data to (a)&nbsp;operate and improve the Service,
              (b)&nbsp;process payments and manage subscriptions, (c)&nbsp;train
              and evaluate AI models (in de-identified or aggregated form),
              (d)&nbsp;provide support and important account notices, and
              (e)&nbsp;measure marketing performance.
            </p>
          </section>

          {/* 4. Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              4.&nbsp;Cookies&nbsp;&amp;&nbsp;Tracking
            </h2>
            <p>
              We use first-party cookies for authentication (Clerk) and third-
              party cookies/pixels&nbsp;(e.g.&nbsp;Google&nbsp;Analytics,
              Meta&nbsp;Pixel) to understand how visitors use the site. You can
              disable cookies in your browser; some features may stop working.
              EU/UK visitors will see a consent banner on first visit.
            </p>
          </section>

          {/* 5. Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              5.&nbsp;Data&nbsp;Sharing&nbsp;With&nbsp;Third&nbsp;Parties
            </h2>
            <p>We only share data with:</p>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Clerk</strong> – user authentication &amp; session
                management.
              </li>
              <li>
                <strong>Stripe</strong> – payment processing and invoicing.
              </li>
              <li>
                <strong>Analytics providers</strong> – aggregate usage stats
                (e.g.&nbsp;Google Analytics).
              </li>
              <li>
                <strong>Legal authorities</strong> – when required to comply
                with a valid subpoena, court order, or applicable law.
              </li>
            </ul>
            <p>We never sell your personal information.</p>
          </section>

          {/* 6. Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              6.&nbsp;Data&nbsp;Retention
            </h2>
            <p>
              Account data and essays are retained until you delete your account
              or request removal. De-identified analytics may be kept up to
              <strong> 24&nbsp;months</strong>. Back-ups are purged on a rolling
              30-day schedule.
            </p>
          </section>

          {/* 7. Security */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              7.&nbsp;Security
            </h2>
            <p>
              We secure data in transit with TLS&nbsp;1.2+ and at rest with
              industry-standard encryption. No method of storage or transmission
              is 100% secure; you use the Service at your own risk.
            </p>
          </section>

          {/* 8. Subscription */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              8.&nbsp;Subscription&nbsp;&amp;&nbsp;Cancellation
            </h2>
            <p>
              You can manage or cancel your subscription anytime via the in-app
              <strong> Manage&nbsp;Billing </strong>button, which opens the
              Stripe customer portal. Premium features stay active until the end
              of the current billing period after cancellation.
            </p>
          </section>

          {/* 9. GDPR & CCPA */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              9.&nbsp;Your&nbsp;Privacy&nbsp;Rights&nbsp;(GDPR&nbsp;/&nbsp;CCPA)
            </h2>
            <p>
              Depending on your location, you may have the right to access,
              correct, port, or delete personal data and to object to certain
              processing. To exercise these rights, email&nbsp;
              <a
                href="mailto:getivyadmit@gmail.com"
                className="text-blue-400 hover:text-blue-200 underline"
              >
                getivyadmit@gmail.com
              </a>
              &nbsp;with the subject&nbsp;“Privacy Request.” We will verify your
              identity and respond within&nbsp;30&nbsp;days.
            </p>
          </section>

          {/* 10. Children */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              10.&nbsp;Children’s&nbsp;Privacy
            </h2>
            <p>
              The Service is not directed to children under&nbsp;13. We do not
              knowingly collect personal data from children. If you believe a
              child has provided us data, contact us for deletion.
            </p>
          </section>

          {/* 11. Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              11.&nbsp;Updates&nbsp;to&nbsp;This&nbsp;Policy
            </h2>
            <p>
              We may revise this Policy from time to time. Material changes will
              be posted here and, where appropriate, notified by email. The
              “Effective date” above will always reflect the latest version.
            </p>
          </section>

          {/* 12. Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              12.&nbsp;Contact&nbsp;Us
            </h2>
            <p>
              Questions or concerns? Email&nbsp;
              <a
                href="mailto:getivyadmit@gmail.com"
                className="text-blue-400 hover:text-blue-200 underline"
              >
                getivyadmit@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
