import React from "react";
import PdfCombinerPage from "@/components/CombinedPDF";
import type { Metadata } from "next";

// 📈 Advanced SEO Metadata for PDF Combiner Tool Page
export const metadata: Metadata = {
  title: "Free Online PDF Combiner Tool | Merge Multiple PDF Files Easily",
  description:
    "Use our free PDF combiner tool to quickly merge multiple PDF documents into one. No sign-up required. Safe, fast, and easy to use — combine your PDFs now!",
  keywords:
    "combine pdf, pdf combiner, merge pdf, free pdf merger, pdf joiner, merge pdf files online, combine multiple pdfs, join pdf pages, online pdf tool, combine pdf no signup, pdf tools free",
  openGraph: {
    title: "Free PDF Combiner | Merge PDF Files Online Instantly",
    description:
      "Merge your PDFs in seconds using our secure and easy-to-use PDF combiner. 100% free. Works on desktop and mobile.",
    url: "https://cookmypapers.vercel.app//pdf-combiner",
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-pdf-combiner.png", // ✅ Replace with actual asset
        width: 1200,
        height: 630,
        alt: "Free PDF Combiner Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Files Free | Online PDF Combiner Tool",
    description:
      "Combine your PDF files quickly and securely — no registration needed. Try our free online PDF merger now.",
    images: ["https://cookmypapers.vercel.app//og-pdf-combiner.png"], // ✅ Replace with actual image
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const Page = () => {
  return (
    <>
      <PdfCombinerPage />
    </>
  );
};

export default Page;
