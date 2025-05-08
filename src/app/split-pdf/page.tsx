import React from "react";
import PDFSplitterPage from "@/components/PDFSplitterPage";
import type { Metadata } from "next";

// 🚀 SEO Metadata for PDF Splitter Page
export const metadata: Metadata = {
  title: "Free PDF Splitter Online | Split PDF into Multiple Files",
  description:
    "Easily split your PDF documents into multiple files for free. Extract individual pages or a range of pages from your PDF. No sign-up required, fast, and secure.",
  keywords:
    "split PDF, PDF splitter, free PDF splitter, split PDF online, PDF page extractor, PDF to multiple files, split PDF into pages, free PDF tool, online PDF splitter",
  openGraph: {
    title: "Free PDF Splitter Tool | Split PDF into Multiple Files Online",
    description:
      "Use our free PDF splitter tool to extract specific pages or split an entire PDF into multiple files. Fast, easy, and secure. No sign-up needed!",
    url: "https://cookmypapers.vercel.app//pdf-splitter",
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-pdf-splitter.png", // ✅ Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "PDF Splitter Tool Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Splitter Online | Split Your PDF for Free",
    description:
      "Split your PDF files easily and for free using our PDF splitter tool. Extract pages or split the whole document into multiple files in seconds.",
    images: ["https://cookmypapers.vercel.app//og-pdf-splitter.png"], // ✅ Replace with your actual image
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const Page = () => {
  return (
    <>
      <PDFSplitterPage />
    </>
  );
};

export default Page;
