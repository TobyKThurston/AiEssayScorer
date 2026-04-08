import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Ivy Admit — how we collect, use, and protect your data.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#64748B] mb-10">Last updated: April 2025</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-[#334155] leading-relaxed">
            We collect information you provide directly, including your email address when you create an account, essay content you submit for review, and payment information processed securely through Stripe. We also collect usage data such as pages visited, features used, and session duration.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
          <p className="text-[#334155] leading-relaxed">
            We use your information to provide and improve the Service, process payments, send transactional emails related to your account, and respond to support requests. We do not sell your personal data to third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">3. Essay Content</h2>
          <p className="text-[#334155] leading-relaxed">
            Essays you submit are processed by AI models to generate feedback. We do not use your essay content to train AI models without your explicit consent. Submitted essays are stored securely and associated only with your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">4. Data Sharing</h2>
          <p className="text-[#334155] leading-relaxed">
            We share data only with trusted service providers necessary to operate the Service (such as cloud infrastructure, payment processors, and AI model providers), and only to the extent required to perform those services. These providers are bound by confidentiality obligations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">5. Cookies</h2>
          <p className="text-[#334155] leading-relaxed">
            We use cookies and similar technologies to maintain your session, remember preferences, and analyze usage. You can control cookies through your browser settings, though disabling them may affect Service functionality.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
          <p className="text-[#334155] leading-relaxed">
            We retain your account data for as long as your account is active. You may request deletion of your account and associated data at any time by contacting us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">7. Children&apos;s Privacy</h2>
          <p className="text-[#334155] leading-relaxed">
            The Service is not directed to children under 13. If we become aware that we have collected personal information from a child under 13 without parental consent, we will delete that information promptly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">8. Your Rights</h2>
          <p className="text-[#334155] leading-relaxed">
            Depending on your location, you may have rights to access, correct, or delete your personal data. To exercise these rights, contact us at{" "}
            <a href="mailto:support@getivyadmit.com" className="text-[#2563EB] underline">
              support@getivyadmit.com
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">9. Changes to This Policy</h2>
          <p className="text-[#334155] leading-relaxed">
            We may update this policy periodically. We will notify you of significant changes via email or a notice on the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
          <p className="text-[#334155] leading-relaxed">
            For privacy questions, contact us at{" "}
            <a href="mailto:support@getivyadmit.com" className="text-[#2563EB] underline">
              support@getivyadmit.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
