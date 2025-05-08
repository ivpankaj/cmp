import React from "react";
import QRCodeGeneratorPage from "@/components/QRCodeGeneratorPage";
import type { Metadata } from "next";

// 🚀 SEO Metadata for QR Code Generator Page
export const metadata: Metadata = {
  title: "Free QR Code Generator | Create QR Code for URL, Text, and More",
  description:
    "Generate high-quality QR codes for URLs, text, emails, phone numbers, and more. Free, easy, and fast QR code maker with no sign-up required. Customize and download instantly!",
  keywords:
    "QR code generator, create QR code, free QR code maker, generate QR code online, QR code for URL, generate QR code for text, free QR code tool, QR code for phone number, online QR code generator",
  openGraph: {
    title: "Free QR Code Generator Tool | Create Custom QR Codes Online",
    description:
      "Easily generate QR codes for URLs, text, phone numbers, and more with our free QR code generator tool. Customize your QR code and download it instantly.",
    url: "https://cookmypapers.vercel.app//qr-code-generator",
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-qr-code-generator.png", // ✅ Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "QR Code Generator Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Custom QR Codes Online | Free QR Code Generator Tool",
    description:
      "Use our free QR code generator to create custom QR codes for your website, contact info, text, and more. Fast and easy with no registration required.",
    images: ["https://cookmypapers.vercel.app//og-qr-code-generator.png"], // ✅ Update this path
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const Page = () => {
  return (
    <>
      <QRCodeGeneratorPage />
    </>
  );
};

export default Page;
