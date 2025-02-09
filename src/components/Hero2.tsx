"use client";
import React, { useState, useEffect } from "react";
import BackgroundEffect from "./Background";
import Button from "@/mini component/Button";
import { slides } from "@/data/slides";
import Image from "next/image";

const CarouselSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
      <BackgroundEffect />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[600px] perspective-1000">
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ease-out rounded-xl overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20
                    ${
                      index === currentSlide
                        ? "opacity-100 transform-none"
                        : index < currentSlide
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                    }`}
                  style={{
                    transform: `translateZ(${
                      index === currentSlide ? "50px" : "0px"
                    }) 
                              rotateY(${
                                index === currentSlide ? "0deg" : "45deg"
                              })`,
                  }}
                >
                  <Image
                  height={100}
                  width={100}
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-2/3 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                    <p className="text-gray-300">{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 
                    ${
                      index === currentSlide
                        ? "bg-white scale-125"
                        : "bg-white/50"
                    }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
          <div className="relative p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/5 rounded-full filter blur-xl animate-pulse" />
            <h2 className="text-4xl font-bold mb-6">Transform Your Vision</h2>
            <p className="text-gray-300 mb-8">
              Experience the perfect blend of design and functionality. Our
              premium solutions are crafted to elevate your digital presence and
              create lasting impressions.
            </p>
            <ul className="space-y-4 text-gray-300">
              {["Premium Quality", "Modern Design", "Innovative Solutions"].map(
                (item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
            <div className="mt-8">
              <Button text="Learn More" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSection;
