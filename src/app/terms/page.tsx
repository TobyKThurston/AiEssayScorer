/* app/terms/page.tsx */
import React from 'react';

export const metadata = {
  title: 'Terms of Service – Ivy Admit AI',
  description: 'Official Terms governing use of Ivy Admit AI.',
};

export default function TermsPage() {
  return (
    <div className="bg-[#111827] min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Title & Effective Date */}
        <h1 className="text-4xl font-extrabold text-white text-center mb-2">
          Terms of Service
        </h1>
        <p className="text-center text-sm text-gray-400 mb-8">
          <strong>Effective date:</strong>&nbsp;June&nbsp;18,&nbsp;2025
        </p>

        {/* --------------- Terms --------------- */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          {/* 1. Acceptance */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              1.&nbsp;Acceptance&nbsp;of&nbsp;Terms
            </h2>
            <p>
              By accessing or using <strong>ivyadmit.ai</strong> (the
              “Service,” “we,” “us,” or “our”), you agree to be bound by these
              Terms of Service (<strong>“Terms”</strong>) and our&nbsp;
              <a
                href="/privacy"
                className="text-blue-400 hover:text-blue-200 underline"
              >
                Privacy&nbsp;Policy
              </a>
              . If you do not agree, do not use the Service.
            </p>
          </section>

          {/* 2. Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              2.&nbsp;Eligibility
            </h2>
            <p>
              You must be at least&nbsp;13&nbsp;years old and capable of entering
              a legally binding agreement to use the Service.
            </p>
          </section>

          {/* 3. Account */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              3.&nbsp;Account&nbsp;Registration
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Authentication is provided by Clerk; you are responsible for
                safeguarding your login credentials.
              </li>
              <li>
                You agree to keep your billing information accurate and up to
                date.
              </li>
            </ul>
          </section>

          {/* 4. Service & Usage */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              4.&nbsp;Service&nbsp;&amp;&nbsp;Usage
            </h2>
            <p>
              Ivy&nbsp;Admit&nbsp;AI provides AI-powered essay feedback
              (collectively, “<strong>Essay&nbsp;Reviews</strong>”). The free
              tier includes <strong>2&nbsp;credits&nbsp;per&nbsp;day</strong>;
              the premium tier offers <strong>unlimited&nbsp;credits</strong> for
              <strong>&nbsp;US&nbsp;$5&nbsp;per&nbsp;month</strong>.
            </p>
          </section>

          {/* 5. Payments */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              5.&nbsp;Payments&nbsp;&amp;&nbsp;Subscriptions
            </h2>
            <p>
              Payments are processed by Stripe, Inc. You authorize recurring
              charges until cancelled. Partial-period refunds are not provided
              except where required by law.
            </p>
          </section>

          {/* 6. Cancellation */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              6.&nbsp;Cancellation
            </h2>
            <p>
              You may cancel anytime via the in-app&nbsp;
              <strong>Manage&nbsp;Billing</strong> button (Stripe customer
              portal); service remains active until the end of the current
              billing cycle.
            </p>
          </section>

          {/* 7. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              7.&nbsp;Intellectual&nbsp;Property
            </h2>
            <p>
              We own all rights in the Service, including code, designs, and AI
              outputs. You retain ownership of any essay text you submit but
              grant us a worldwide license to process, store, and display it for
              the purpose of providing the Service.
            </p>
          </section>

          {/* 8. Prohibited Conduct */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              8.&nbsp;Prohibited&nbsp;Conduct&nbsp;&amp;&nbsp;Academic&nbsp;Integrity
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Do not submit unlawful, infringing, or harmful content, or
                attempt to reverse-engineer the Service.
              </li>
              <li>
                Feedback is intended for <strong>inspiration</strong> and
                self-improvement only. <strong>Do not copy</strong> AI
                suggestions verbatim into assignments or violate any academic
                honor code.
              </li>
              <li>Rate-limits and anti-abuse measures apply.</li>
            </ul>
          </section>

          {/* 9. AI / Educational Disclaimer */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              9.&nbsp;Educational&nbsp;&amp;&nbsp;AI&nbsp;Disclaimer
            </h2>
            <p>
              Essay Reviews are generated by large-language-model systems.
              Content is provided <strong>for educational guidance only</strong>{' '}
              and <strong>does not guarantee admission</strong> to any
              institution. Exercise independent judgment or consult qualified
              professionals before relying on the feedback.
            </p>
          </section>

          {/* 10. Cookies & Compliance */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              10.&nbsp;Cookies&nbsp;&amp;&nbsp;Data&nbsp;Compliance
            </h2>
            <p>
              We use cookies and third-party analytics to improve the Service.
              By using the site you consent to the use of cookies as described
              in our Privacy Policy and to any rights afforded to you under
              GDPR, CCPA, or other data-protection laws.
            </p>
          </section>

          {/* 11. Disclaimers & Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              11.&nbsp;Disclaimers&nbsp;&amp;&nbsp;Limitation&nbsp;of&nbsp;Liability
            </h2>
            <p>
              THE SERVICE IS PROVIDED “AS IS” WITHOUT WARRANTY. OUR TOTAL
              LIABILITY FOR ANY CLAIM ARISING OUT OF THESE TERMS WILL NOT EXCEED
              THE GREATER OF (A)&nbsp;AMOUNTS&nbsp;PAID BY YOU IN THE LAST THREE
              MONTHS OR (B)&nbsp;FIFTY&nbsp;U.S.&nbsp;DOLLARS&nbsp;($50).
            </p>
          </section>

          {/* 12. Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              12.&nbsp;Governing&nbsp;Law
            </h2>
            <p>
              These Terms are governed by the laws of the
              State&nbsp;of&nbsp;New&nbsp;York, USA, without regard to
              conflict-of-law principles.
            </p>
          </section>

          {/* 13. Changes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              13.&nbsp;Changes&nbsp;to&nbsp;These&nbsp;Terms
            </h2>
            <p>
              We may update these Terms from time to time. Material changes will
              be announced on the site or via email; the “Effective&nbsp;date”
              above will be updated. Continued use constitutes acceptance.
            </p>
          </section>

          {/* 14. Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              14.&nbsp;Contact
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

