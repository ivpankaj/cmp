import React from "react";
import InvitePage from "@/components/InvitePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invite Friends | Unlock Free Access to All Our Services",
  description:
    "Invite your friends and colleagues to explore powerful tools like PDF combiner, resume builder, ATS checker, and web development services. Share and grow together!",
  keywords:
    "invite to use pdf tools, share resume builder, invite for ats checker, invite friends for free tools, refer and earn, pdf merger, image to pdf, build website with friends, team resume builder, free web tools, refer cookmypapers",
  openGraph: {
    title: "Refer Friends & Unlock Tools | PDF, Resume, Website Builder",
    description:
      "Invite others to use CookMyPapers for combining PDFs, converting images, building resumes, and more. Collaborate and get exclusive benefits!",
    url: "https://cookmypapers.vercel.app//invite",
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-invite.png", // ✅ Replace with actual image URL
        width: 1200,
        height: 630,
        alt: "Invite Friends to Use CookMyPapers Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invite & Share Free Tools | Resume, PDF & Web Services",
    description:
      "Spread the word about CookMyPapers tools. Share access to resume builders, PDF editors, and more — no signup required!",
    images: ["https://cookmypapers.vercel.app//og-invite.png"], // ✅ Replace with your image
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const Page = () => {
  return (
    <>
      <InvitePage />
    </>
  );
};

export default Page;
