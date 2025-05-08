import React from "react";
import ProductPage from "@/components/ProductPage";
import type { Metadata } from "next";

// 🚀 SEO Metadata for Product Page
export const metadata: Metadata = {
  title: "Buy Quality Products Online | Best Deals on [Your Product Category]",
  description:
    "Explore a wide range of high-quality products at unbeatable prices. Browse, compare, and shop from the best deals in [your product category]. Secure and easy shopping experience!",
  keywords:
    "buy products online, quality products, best product deals, affordable products, shopping online, top products, [Product category] store, buy [product type] online, best prices on products, shop online",
  openGraph: {
    title: "Shop Quality Products Online | Best Deals in [Your Product Category]",
    description:
      "Browse our exclusive collection of [product category] with competitive prices and secure shopping. Shop now and grab the best deals on [product type] online.",
    url: "https://cookmypapers.vercel.app//products",
    siteName: "CookMyPapers",
    images: [
      {
        url: "https://cookmypapers.vercel.app//og-products.png", // ✅ Replace with your actual product image URL
        width: 1200,
        height: 630,
        alt: "Best Deals on Products Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exclusive Online Products | Best Prices & Deals on [Product Category]",
    description:
      "Discover the best deals on high-quality products. Shop now for [product category] at unbeatable prices and enjoy a seamless shopping experience!",
    images: ["https://cookmypapers.vercel.app//og-products.png"], // ✅ Replace with your actual image
    creator: "@cookmypapers",
  },
  metadataBase: new URL("https://cookmypapers.vercel.app/"),
};

const Page = () => {
  return (
    <>
      <ProductPage />
    </>
  );
};

export default Page;
