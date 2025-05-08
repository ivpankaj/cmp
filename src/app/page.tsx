import React from "react";
import HeroSection from "@/components/Hero";
import CarouselSection from "@/components/Hero2";
import DataStatisticsSection from "@/components/Hero3";
import type { Metadata } from "next";

// Page-specific SEO metadata
export const metadata: Metadata = {
  title: "CookMyPapers | Build Your Website or Resume Today",
  description:
    "Hire experts for website building, resume crafting, and full-stack development. Fast, reliable, and professional service at CookMyPapers.",
  keywords:
    "website development, resume building, hire developer, frontend, backend, full stack developer, portfolio, professional website, developer for hire",
  openGraph: {
    title: "CookMyPapers | Build Your Website or Resume Today",
    description:
      "Hire experts for website building, resume crafting, and full-stack development.",
    url: "https://cookmypapers.vercel.app/",
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-image.png",
        width: 1200,
        height: 630,
        alt: "CookMyPapers Website Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CookMyPapers | Build Your Website or Resume Today",
    description:
      "Get high-quality websites and resumes crafted by expert developers and designers.",
    images: ["https://cookmypapers.vercel.app//og-image.png"],
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const Page = () => {
  return (
    <>
      <HeroSection />
      <CarouselSection />
      <DataStatisticsSection />
    </>
  );
};

export default Page;
