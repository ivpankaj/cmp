"use client";
import React, { useState, useEffect, useRef } from "react";
import { slides } from "@/data/slides";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Button from "@/mini component/Button";

const SimpleCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const endX = useRef<number>(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    endX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    endX.current = e.clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const distance = endX.current - startX.current;
    if (distance > 50) {
      handlePrev();
    } else if (distance < -50) {
      handleNext();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10 relative">
      {/* Main container with flex layout */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Left side - Carousel */}
        <div className="w-full md:w-1/2">
          <div
            className="relative h-96 rounded-xl overflow-hidden"
            ref={slideRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                  priority={index === currentSlide}
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black/50 text-white rounded-b-xl">
                  <h3 className="text-xl font-bold">{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
              </div>
            ))}

            {/* Arrow buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 text-white p-2 rounded-full hover:bg-white/50"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 text-white p-2 rounded-full hover:bg-white/50"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Right side - Info box */}
        <div className="w-full md:w-1/2">
          <div className="relative p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 h-full">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/5 rounded-full filter blur-xl animate-pulse" />
            <h2 className="text-4xl font-bold mb-6">Transform Your Digital Works</h2>
            <p className="text-gray-300 mb-8">
              Experience the perfect blend of design and functionality. Our
              premium tech tools are crafted to elevate your digital works and
              create lasting impressions.
            </p>
            <ul className="space-y-4 text-gray-300">
              {["Premium Quality", "Accurate Tools", "Innovative Solutions"].map(
                (item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
            <div className="mt-8">
              <Link href="/product">
                <Button text="See Our products" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCarousel;