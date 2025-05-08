import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "cookmypapers",
  description: "Hire for website building, resume building, full stack developer",
  keywords: "website building, resume building, full stack developer, hire developer, frontend, backend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="4G0C327upPlSMGFxrsmDaYGpYEF3UehJwpMzO8SYrVI" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="cookmypapers team" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="cookmypapers" />
        <meta property="og:description" content="Hire for website building, resume building, full stack developer" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cookmypapers.vercel.app/" />
        <meta property="og:image" content="https://cookmypapers.vercel.app//og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="cookmypapers" />
        <meta name="twitter:description" content="Hire for website building, resume building, full stack developer" />
        <meta name="twitter:image" content="https://cookmypapers.vercel.app//og-image.png" />
        <meta name="twitter:creator" content="@cookmypapers" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J8H27LSQPH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J8H27LSQPH');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
