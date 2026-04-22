interface FAQ {
  question: string;
  answer: string;
}

export function SoftwareApplicationSchema({
  name,
  description,
  path,
  category = "EducationalApplication",
}: {
  name: string;
  description: string;
  path: string;
  category?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: category,
    operatingSystem: "Any",
    url: `${baseUrl}${path}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Ivy Admit",
      url: baseUrl,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  if (!faqs || faqs.length === 0) return null;
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function FAQSection({ faqs, heading }: { faqs: FAQ[]; heading: string }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section className="mt-14">
      <h2
        className="text-2xl font-extrabold text-ink mb-4"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
      >
        {heading}
      </h2>
      <div className="space-y-4">
        {faqs.map((q, i) => (
          <details
            key={i}
            className="group rounded-xl bg-cream border border-hair p-5"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between text-ink font-semibold text-[15px]">
              {q.question}
              <span className="text-oxblood text-xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-ink-2 text-[14.5px] leading-relaxed mt-3">
              {q.answer}
            </p>
          </details>
        ))}
      </div>
      <FAQSchema faqs={faqs} />
    </section>
  );
}
