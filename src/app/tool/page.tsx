import ToolPage from '@/components/ToolPage'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Free Online Tools | PDF Converter, QR Code Generator & More",
  description:
    "Explore a wide range of free online tools to make your life easier. From converting PDF to Word to creating QR codes, our tools help you work smarter and faster.",
  keywords:
    "free online tools, PDF to Word, QR code generator, PDF split tool, merge PDF, word counter, case converter, image compressor, JSON formatter, password generator",
  openGraph: {
    title: "Free Online Tools | Convert PDF, Generate QR Codes & More",
    description:
      "Discover free online tools to convert PDFs, compress images, generate QR codes, and more. Explore tools for developers, designers, and everyday use.",
    url: "https://cookmypapers.vercel.app//tools", // Make sure to replace this with your actual URL
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-tools-page.png", // ✅ Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Free Online Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools | Convert PDFs, Generate QR Codes & More",
    description:
      "Find the best free tools for PDF conversion, image compression, QR code generation, and more. Perfect for professionals and casual users alike.",
    images: ["https://cookmypapers.vercel.app//og-tools-page.png"], // ✅ Replace with your actual image URL
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const page = () => {
  return (
    <>
    <ToolPage/>
    </>
  )
}

export default page