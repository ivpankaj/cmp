import React from "react";
import PasswordGeneratorPage from "@/components/PasswordGeneratorPage";
import type { Metadata } from "next";

// 🚀 SEO Metadata for Password Generator Tool
export const metadata: Metadata = {
  title: "Free Strong Password Generator | Secure & Random Password Tool",
  description:
    "Generate strong, secure, and random passwords instantly. Customize your password with symbols, numbers, uppercase, and lowercase letters. Free, fast, and no ads!",
  keywords:
    "password generator, generate secure password, strong password maker, random password online, password generator tool, password with symbols, strong random password, free password tool, no ad password generator, password builder",
  openGraph: {
    title: "Online Password Generator | Strong, Random & Secure",
    description:
      "Create secure and customizable passwords instantly with our free password generator tool. No ads. No tracking. Fully secure!",
    url: "https://cookmypapers.vercel.app//password-generator",
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-password-generator.png", // ✅ Replace with your image URL
        width: 1200,
        height: 630,
        alt: "Secure Password Generator Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Strong Password Generator | No Ads, Just Security",
    description:
      "Use our free and secure password generator to instantly create strong passwords for any use. No login or ads required.",
    images: ["https://cookmypapers.vercel.app//og-password-generator.png"], // ✅ Replace with your actual image
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const Page = () => {
  return (
    <>
      <PasswordGeneratorPage />
    </>
  );
};

export default Page;
