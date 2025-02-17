"use client";
import React from "react";

import Button from "@/mini component/Button";
import BlackButton from "@/mini component/BlackButton";
import MouseScroll from "@/mini component/MouseScroll";
import BackgroundEffect from "@/components/Background";

interface HeroSectionProps {
  title: string[];
  subtitle: string;
  buttonText1?: string;
  buttonText2?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, buttonText1, buttonText2 }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black z-10">
      <BackgroundEffect />
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative space-y-8 transform-gpu">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight">
              {title.map((line, index) => (
                <span
                  key={index}
                  className={`inline-block animate-fade-in-up ${
                    index > 0 ? `animation-delay-${index * 200}` : ""
                  }`}
                >
                  {line}
                </span>
              ))}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
              {subtitle}
            </p>

            <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-800">
              <Button text={buttonText1} />
              <BlackButton text={buttonText2} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <MouseScroll />
      </div>
    </div>
  );
};

export default HeroSection;
