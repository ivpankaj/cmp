import HeroSection from "@/mini component/HeroSection";
import React from "react";
import CarouselSection from "./Hero2";
import DataStatisticsSection from "./Hero3";

const Hero = () => {
  return (
    <div>
      <HeroSection
        title={["Design.", "Create.", "Innovate."]}
        subtitle="Transform your digital presence with our cutting-edge solutions and premium design aesthetics."
        buttonText1="Get Started"
        buttonText2="Learn More"
      />
      <CarouselSection/>
      <DataStatisticsSection/>
    </div>
  );
};

export default Hero;
