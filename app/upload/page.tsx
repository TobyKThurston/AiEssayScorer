import App from "@/Upload/App";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Your Essay for Review",
  description: "Upload your college application essay and get instant AI-powered feedback. Score your structure, evidence, and tone. Receive line-by-line edits and strategic advice from AI trained on successful Ivy League applications.",
  keywords: [
    "upload essay",
    "essay review",
    "essay feedback",
    "college essay checker",
    "essay analyzer",
    "essay scoring",
    "college application review"
  ],
  openGraph: {
    title: "Upload Your Essay for Review | Ivy Admit",
    description: "Upload your college application essay and get instant AI-powered feedback. Score your structure, evidence, and tone.",
    url: "/upload",
    type: "website",
  },
  alternates: {
    canonical: "/upload",
  },
};

export default function UploadPage() {
  return <App />;
}
