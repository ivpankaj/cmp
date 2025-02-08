"use client"; // ✅ Make the entire page a client component

import ContactPage from "@/components/Contact";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import CarouselSection from "@/components/Hero2";
import DataStatisticsSection from "@/components/Hero3";
import useVh from "@/hooks/useVh";
import useVw from "@/hooks/useVw";
import React from "react";

const Page = () => {
  const vh = useVh();
  const vw = useVw();

  return (
    <div style={{ width: `${vw}px`, height: `${vh}px` }} >
      <HeroSection />
      <CarouselSection />
      <DataStatisticsSection />
      <ContactPage />
      <Footer/>
    </div>
  );
};

export default Page;
