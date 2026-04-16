import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Inter, Inter_Tight } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com"),
  title: {
    default: "Ivy Admit – Free AI College Essay Review in 60 Seconds",
    template: "%s | Ivy Admit"
  },
  description: "Free AI college essay review trained on real Ivy League acceptances. Get scores, line-by-line edits, and admissions feedback in under 60 seconds. 20,000+ students helped.",
  keywords: [
    "college essay review",
    "college application essay",
    "Ivy League essay",
    "essay editing",
    "college admissions",
    "essay feedback",
    "college essay help",
    "admissions essay",
    "essay scoring",
    "college essay advisor",
    "essay structure",
    "college essay examples",
    "successful college essays",
    "Harvard essay",
    "Yale essay",
    "Princeton essay"
  ],
  authors: [{ name: "Ivy Admit" }],
  creator: "Ivy Admit",
  publisher: "Ivy Admit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com",
    siteName: "Ivy Admit",
    title: "Ivy Admit - AI-Powered College Essay Review & Strategy Tool",
    description: "Get expert essay feedback from AI trained on successful Ivy League applications. Score your structure, evidence, and tone.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ivy Admit - College Essay Review Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivy Admit - AI-Powered College Essay Review",
    description: "Get expert essay feedback from AI trained on successful Ivy League applications.",
    images: ["/og-image.png"],
    creator: "@ivyadmit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
  alternates: {
    canonical: "/",
  },
  category: "Education",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com"}/#organization`,
  name: "Ivy Admit",
  alternateName: "Ivy Admit – AI College Essay Review",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com",
  logo: {
    "@type": "ImageObject",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com"}/icon-512.png`,
    width: 512,
    height: 512,
  },
  image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com"}/icon-512.png`,
  description:
    "AI-powered college essay review and strategy tool trained on successful Ivy League applications.",
  sameAs: [
    "https://twitter.com/ivyadmit",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${interTight.variable}`}>
      <head>
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
