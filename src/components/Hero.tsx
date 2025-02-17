"use client";
import React from "react";
import BackgroundEffect from "./Background";
import Button from "@/mini component/Button";
import BlackButton from "@/mini component/BlackButton";
import MouseScroll from "@/mini component/MouseScroll";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen  z-10 overflow-hidden bg-black">
      <BackgroundEffect />
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative space-y-8 transform-gpu">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight">
              <span className="inline-block animate-fade-in-up">Design.</span>{" "}
              <span className="inline-block animate-fade-in-up animation-delay-200">
                Create.
              </span>
              <span className="inline-block animate-fade-in-up animation-delay-400">
                Innovate.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
              Transform your digital presence with our cutting-edge solutions
              and premium tech tools.
            </p>

            <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-800">
              <Button text="Get Started" />
            <Link href="/tool">
            <BlackButton text="Explore tools" /></Link>
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
