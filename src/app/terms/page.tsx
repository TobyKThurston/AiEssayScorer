// app/terms/page.tsx
import React from 'react';

export const metadata = {
  title: 'Terms of Service – Ivy Admit AI',
  description: 'Terms governing use of Ivy Admit AI.',
};

export default function TermsPage() {
  return (
    <div className="bg-[#111827] min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-white text-center mb-2">
          Terms of Service
        </h1>
        <p className="text-center text-sm text-gray-400 mb-8">
          <strong>Effective date:</strong> June 13, 2025
        </p>

        {/* Content */}
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By accessing or using <strong>ivyadmit.ai</strong> (the “Service”),
              you agree to these Terms of Service and our Privacy Policy. If you
              don’t agree, please don’t use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              2. Eligibility
            </h2>
            <p className="leading-relaxed">
              You must be at least 13 years old and able to enter legal
              agreements. By using the Service, you represent that you meet
              these requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              3. Account Registration
            </h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>
                You sign in via Clerk; you’re responsible for safeguarding your
                credentials.
              </li>
              <li>Keep your billing info up to date to avoid interruption.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              4. Service &amp; Usage
            </h2>
            <p className="leading-relaxed">
              We provide AI-powered essay feedback (“Essay Reviews”). Free tier:
              2 credits/day. Premium tier: unlimited credits for $5/month via
              Stripe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              5. Payments &amp; Subscriptions
            </h2>
            <p className="leading-relaxed">
              All subscription payments are processed by Stripe. You authorize
              recurring charges until you cancel. No refunds for partial
              billing periods, except where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              6. Cancellation
            </h2>
            <p className="leading-relaxed">
              Cancel anytime in your account settings or via the Stripe customer
              portal; cancellation takes effect at period end.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              7. Intellectual Property
            </h2>
            <p className="leading-relaxed">
              We own all rights to the Service code, designs, and AI outputs.
              You retain ownership of essays you submit, but grant us a license
              to process and store them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              8. Prohibited Conduct
            </h2>
            <p className="leading-relaxed">
              Don’t reverse-engineer the Service, submit unlawful content, or
              abuse the API (rate limits apply).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              9. Disclaimers &amp; Liability
            </h2>
            <p className="leading-relaxed">
              THE SERVICE IS PROVIDED “AS-IS.” OUR LIABILITY IS LIMITED TO THE
              AMOUNT YOU PAID IN THE PRIOR 3 MONTHS OR $50, WHICHEVER IS LESS.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              10. Governing Law
            </h2>
            <p className="leading-relaxed">
              These Terms are governed by the laws of New York.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              11. Changes to These Terms
            </h2>
            <p className="leading-relaxed">
              We may update these Terms; we’ll post a new effective date and
              notify you by email. Continued use is acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              12. Contact
            </h2>
            <p className="leading-relaxed">
              Questions? Email{' '}
              <a
                href="mailto:getivyadmit@gmail.com"
                className="text-blue-400 hover:text-blue-200"
              >
                support@ivyadmit.ai
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


