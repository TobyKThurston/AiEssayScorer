import type { Metadata } from "next";
import { Nav } from "@/design/Nav";
import { Footer } from "@/design/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Ivy Admit - AI-powered college essay review and feedback tool.",
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-serif text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em] mb-2">Terms of Service</h1>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-pencil mb-10">Last updated: April 2025</p>

        <section className="mb-8">
          <h2 className="font-serif text-[22px] md:text-[24px] mb-3 text-ink">1. Acceptance of Terms</h2>
          <p className="text-ink-2 leading-relaxed">
            By accessing or using Ivy Admit (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-[22px] md:text-[24px] mb-3 text-ink">2. Use of the Service</h2>
          <p className="text-ink-2 leading-relaxed">
            Ivy Admit provides AI-powered feedback on college application essays. The Service is intended for personal, non-commercial use by students preparing college applications. You may not use the Service to generate content for others for compensation, scrape or reproduce our AI outputs in bulk, or circumvent any access controls.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-[22px] md:text-[24px] mb-3 text-ink">3. Accounts and Access</h2>
          <p className="text-ink-2 leading-relaxed">
            Some features require a registered account. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. You must be at least 13 years old to use the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-[22px] md:text-[24px] mb-3 text-ink">4. Payments and Subscriptions</h2>
          <p className="text-ink-2 leading-relaxed">
            Certain features are available through paid plans. All purchases are final unless otherwise stated. Subscription plans renew automatically until canceled. You may cancel at any time through your account settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-[22px] md:text-[24px] mb-3 text-ink">5. Intellectual Property</h2>
          <p className="text-ink-2 leading-relaxed">
            You retain ownership of essay content you submit. By submitting content, you grant Ivy Admit a limited license to process it for the purpose of providing feedback. We do not use your essays to train AI models without explicit consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-[22px] md:text-[24px] mb-3 text-ink">6. Disclaimer</h2>
          <p className="text-ink-2 leading-relaxed">
            Ivy Admit provides AI-generated feedback for informational purposes only. We make no guarantees regarding college admission outcomes. Feedback should be used as one input among many in your application process.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-[22px] md:text-[24px] mb-3 text-ink">7. Limitation of Liability</h2>
          <p className="text-ink-2 leading-relaxed">
            To the fullest extent permitted by law, Ivy Admit shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-[22px] md:text-[24px] mb-3 text-ink">8. Changes to Terms</h2>
          <p className="text-ink-2 leading-relaxed">
            We may update these terms from time to time. Continued use of the Service after changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-[22px] md:text-[24px] mb-3 text-ink">9. Contact</h2>
          <p className="text-ink-2 leading-relaxed">
            For questions about these terms, contact us at{" "}
            <a href="mailto:support@getivyadmit.com" className="text-oxblood underline">
              support@getivyadmit.com
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
