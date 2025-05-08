import React from "react";
import ServicePage from "@/components/ServiceComp";
import type { Metadata } from "next";

// 🚀 SEO Metadata for Service Page
export const metadata: Metadata = {
  title: "Our Services | Website Development, Resume Building & More | CookMyPapers",
  description:
    "Explore professional services from CookMyPapers including website development, resume building, portfolio creation, and full-stack development. Start your digital journey today.",
  keywords:
    "website development, resume building, full stack developer, portfolio website, hire developer, custom web solutions, frontend, backend, nextjs developer, developer services, build website online",
  openGraph: {
    title: "Professional Web & Resume Services | CookMyPapers",
    description:
      "CookMyPapers offers modern website development, resume creation, and full-stack developer services. Get expert help to grow your personal or business presence online.",
    url: "https://cookmypapers.vercel.app//services",
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-services.png", // Replace with your actual image
        width: 1200,
        height: 630,
        alt: "CookMyPapers Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | CookMyPapers",
    description:
      "Discover our expert web development and resume building services. Build your brand with CookMyPapers.",
    images: ["https://cookmypapers.vercel.app//og-services.png"], // Replace with your image
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const Page = () => {
  return (
    <>
      <ServicePage />
    </>
  );
};

export default Page;
