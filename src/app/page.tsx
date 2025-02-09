"use client"; 

import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import CarouselSection from "@/components/Hero2";
import DataStatisticsSection from "@/components/Hero3";
import useVh from "@/hooks/useVh";
import useVw from "@/hooks/useVw";
import React, { useEffect, useState } from "react";

const Page = () => {
  const vh = useVh();
  const vw = useVw();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      style={{
        width: isClient ? `${vw}px` : "100%", 
        height: isClient ? `${vh}px` : "100vh",
      }}

    >
      <HeroSection />
      <CarouselSection />
      <DataStatisticsSection />
      <Footer />
    </div>
  );
};

export default Page;
