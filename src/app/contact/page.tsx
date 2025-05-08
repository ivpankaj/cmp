import React from "react";
import ContactPage from "@/components/Contact";
import HeroSection from "@/mini component/HeroSection";
import type { Metadata } from "next";

// SEO metadata specific to the Contact page
export const metadata: Metadata = {
  title: "Contact Us | CookMyPapers",
  description: "Reach out to CookMyPapers for website development, resume services, or general inquiries.",
  keywords: "contact cookmypapers, contact website developer, hire developer, contact resume builder, get in touch, support",
  openGraph: {
    title: "Contact Us | CookMyPapers",
    description: "Reach out to our expert team for web development and resume services.",
    url: "https://cookmypapers.vercel.app//contact",
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-contact.png", // Replace with your actual image
        width: 1200,
        height: 630,
        alt: "Contact CookMyPapers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | CookMyPapers",
    description: "Get in touch with CookMyPapers for support, inquiries, or custom web solutions.",
    images: ["https://cookmypapers.vercel.app//og-contact.png"], // Replace with your image
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const Page = () => {
  return (
    <div>
      <HeroSection
        title={["Contact"]}
        subtitle="Get in Touch with Us"
      />
      <ContactPage />
    </div>
  );
};

export default Page;
