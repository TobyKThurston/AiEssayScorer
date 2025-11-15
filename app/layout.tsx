import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ivyadmit.com"),
  title: {
    default: "Ivy Admit - AI-Powered College Essay Review & Strategy Tool",
    template: "%s | Ivy Admit"
  },
  description: "Get expert essay feedback from AI trained on successful Ivy League applications. Score your structure, evidence, and tone. Get line-by-line edits and strategic advice to improve your college admissions essays.",
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
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ivyadmit.com",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
