import React from "react";
import PdfToWordPage from "@/components/PDFToWordPage";
import type { Metadata } from "next";

// 🚀 SEO Metadata for PDF to Word Converter Page
export const metadata: Metadata = {
  title: "Free PDF to Word Converter | Convert PDF to Editable DOCX",
  description:
    "Convert your PDF documents to Word (.docx) format instantly. 100% free, secure, and fast. No watermark, no signup required. Preserve formatting and edit with ease!",
  keywords:
    "PDF to Word, PDF to DOCX, convert PDF to Word, free PDF converter, editable Word file, PDF converter online, no watermark PDF to Word, PDF editor, extract text from PDF, convert PDF file",
  openGraph: {
    title: "Free PDF to Word Converter Online | No Watermark, No Signup",
    description:
      "Convert PDF files to Word documents quickly and securely. Easy-to-use PDF to DOCX tool with no watermarks, no ads, and full formatting support.",
    url: "https://cookmypapers.vercel.app//pdf-to-word",
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-pdf-to-word.png", // ✅ Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Convert PDF to Word Online - Free Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert PDF to Word | Free Online Tool Without Watermark",
    description:
      "Use our secure and free PDF to Word converter to get fully editable Word documents. No sign-up. No watermark. Fast conversion!",
    images: ["https://cookmypapers.vercel.app//og-pdf-to-word.png"], // ✅ Update this path
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const Page = () => {
  return (
    <>
      <PdfToWordPage />
    </>
  );
};

export default Page;
