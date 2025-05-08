import React from "react";
import ResumeAtsCheckerPage from "@/components/AtsPage";
import type { Metadata } from "next";

// 🚀 SEO Metadata for Resume ATS Score Checker Page
export const metadata: Metadata = {
  title: "Free Resume ATS Checker | Optimize Your Resume for ATS Systems",
  description:
    "Check your resume's ATS score instantly with our free Resume ATS Checker. Get real-time feedback and optimize your CV to pass applicant tracking systems (ATS).",
  keywords:
    "resume ats checker, ats resume scan, check resume score, free ats resume check, optimize resume for ats, ats-friendly resume, resume screening tool, pass ats resume, ats resume parser, ats score test",
  openGraph: {
    title: "Free Resume ATS Score Checker | CookMyPapers",
    description:
      "Instantly analyze your resume's compatibility with applicant tracking systems (ATS). Improve your chances of getting noticed by recruiters.",
    url: "https://cookmypapers.vercel.app//resume-ats-checker",
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-ats-checker.png", // ✅ Replace with real image
        width: 1200,
        height: 630,
        alt: "Resume ATS Checker Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume ATS Score Checker | CookMyPapers",
    description:
      "Test your resume for ATS compatibility. Improve your resume to pass automated screenings and land interviews.",
    images: ["https://cookmypapers.vercel.app//og-ats-checker.png"], // ✅ Replace with actual image
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const Page = () => {
  return (
    <>
      <ResumeAtsCheckerPage />
    </>
  );
};

export default Page;
