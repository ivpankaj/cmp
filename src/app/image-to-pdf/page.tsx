import React from "react";
import ImageToPdfPage from "@/components/ImageToPdfPage";
import type { Metadata } from "next";

// 🚀 SEO Metadata for Image to PDF Conversion Page
export const metadata: Metadata = {
  title: "Convert Image to PDF Online | Free Image to PDF Converter Tool",
  description:
    "Convert JPG, PNG, or other images to high-quality PDF files with our free online image to PDF converter. Fast, secure, no watermark, no signup required!",
  keywords:
    "image to pdf, convert image to pdf, jpg to pdf, png to pdf, online image to pdf, free pdf converter, photo to pdf, image to pdf no watermark, secure image converter, image to pdf without signup",
  openGraph: {
    title: "Free Online Image to PDF Converter | CookMyPapers",
    description:
      "Easily convert images to PDFs using our free, fast, and secure online tool. No watermark. No account needed. Try it now!",
    url: "https://cookmypapers.vercel.app//image-to-pdf",
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-image-to-pdf.png", // ✅ Replace with actual image URL
        width: 1200,
        height: 630,
        alt: "Image to PDF Converter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to PDF Converter | Free Online Tool",
    description:
      "Convert your JPG, PNG, or other images to PDF instantly online for free. Simple, no watermark, mobile-friendly.",
    images: ["https://cookmypapers.vercel.app//og-image-to-pdf.png"], // ✅ Replace with your image
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const Page = () => {
  return (
    <>
      <ImageToPdfPage />
    </>
  );
};

export default Page;
