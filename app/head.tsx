// app/head.tsx
export default function Head() {
  return (
    <>
      {/* Primary page metadata */}
      <meta charSet="UTF-8" />
      <title>Ivy Admit AI • Instant College Essay Feedback</title>
      <meta
        name="description"
        content="Get instant, AI-powered feedback on your college essays. 2 free reviews/day—upgrade for full 4–6 personalized suggestions."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL} />

      {/* Favicons & PWA manifest */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#000000" />

      {/* Open Graph (social previews) */}
      <meta property="og:title" content="Ivy Admit AI • Instant College Essay Feedback" />
      <meta property="og:description" content="Instant AI-powered feedback on your college essays. Free tier—upgrade for full insights." />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@YourTwitterHandle" />
      <meta name="twitter:title" content="Ivy Admit AI • Instant College Essay Feedback" />
      <meta name="twitter:description" content="Get instant AI feedback on your essays. Free tier—unlock premium for full personalized suggestions!" />
      <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/twitter-card.png`} />

      {/* Preconnect for Google Fonts (if you use them) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* Example font import (uncomment if needed) */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" /> */}
    </>
  );
}
