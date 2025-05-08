import React from "react";
import AboutUsPage from "@/components/AboutComp";
import type { Metadata } from "next";

// 🔍 SEO Metadata for About Us Page
export const metadata: Metadata = {
  title: "About Us | Meet the Team Behind CookMyPapers",
  description:
    "Learn about CookMyPapers — a team of passionate developers, designers, and resume experts dedicated to helping you build standout digital portfolios, websites, and resumes.",
  keywords:
    "about CookMyPapers, meet the team, resume experts, web developers, who we are, company mission, our story, team profile, tech services team, developer team, full stack developer team",
  openGraph: {
    title: "About CookMyPapers | Resume & Web Development Experts",
    description:
      "At CookMyPapers, we specialize in building powerful personal brands through websites and resumes. Discover who we are and what drives us.",
    url: "https://cookmypapers.vercel.app//about",
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-about.png", // Replace with actual image
        width: 1200,
        height: 630,
        alt: "About CookMyPapers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | CookMyPapers",
    description:
      "Get to know the dedicated team behind CookMyPapers — full-stack developers, resume builders, and creative tech minds.",
    images: ["https://cookmypapers.vercel.app//og-about.png"], // Replace with actual image
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const Page = () => {
  return (
    <>
      <AboutUsPage />
    </>
  );
};

export default Page;
