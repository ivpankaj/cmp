"use client";

import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";


// Lazy-loaded components
const HeroSection = dynamic(() => import("@/components/Hero"), { ssr: false });
const CarouselSection = dynamic(() => import("@/components/Hero2"), { ssr: false });
const DataStatisticsSection = dynamic(() => import("@/components/Hero3"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const Page = () => {
  const [dimensions, setDimensions] = useState({ width: "100%", height: "100vh" });

  useEffect(() => {
    // Update dimensions after the component mounts
    const updateDimensions = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setDimensions({
        width: `${vw}px`,
        height: `${vh}px`,
      });
    };

    updateDimensions(); // Set initial dimensions on mount
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions); // Clean up on unmount
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div style={dimensions}>
      <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
        <CarouselSection />
      </Suspense>

      <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
        <DataStatisticsSection />
      </Suspense>

      <Suspense fallback={<div className="text-center text-white">Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Page;
