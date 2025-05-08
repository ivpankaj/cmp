"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { ChevronLeft, ChevronRight, Code, Laptop, Database, PenTool, Monitor } from "lucide-react";
import BackgroundEffect from "@/components/Background";
import { carouselItems, stats, workCards } from "@/data/service_data";
import HeroSection from "@/mini component/HeroSection";
import Image from "next/image";
import Link from "next/link";

const ServicePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const endX = useRef<number>(0);
  const phoneNumber = "+919911064724";
  const message = encodeURIComponent(
    "Hii Team, cookmypapers, !!  I have a question about services!"
  ); // Pre-filled message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
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
    <>
      <HeroSection
        title={["Services.We.Serve"]}
        subtitle="Transform your digital presence with our cutting-edge solutions and premium design aesthetics."
      />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
        <BackgroundEffect />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <section className="mb-20">
            {/* Custom Carousel Implementation */}
            <div className="w-full max-w-5xl mx-auto relative overflow-hidden">
              <div
                className="relative h-96 rounded-xl"
                ref={slideRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                {carouselItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    } bg-transparent border border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 text-center`}
                  >
                    <div className="mb-6">
                      {index === 0 && <Code size={64} className="text-blue-400" />}
                      {index === 1 && <Laptop size={64} className="text-purple-400" />}
                      {index === 2 && <Database size={64} className="text-green-400" />}
                      {index === 3 && <PenTool size={64} className="text-yellow-400" />}
                      {index === 4 && <Monitor size={64} className="text-red-400" />}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-lg max-w-lg">
                      {item.description}
                    </p>
              
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
                {carouselItems.map((_, index) => (
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
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 z-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </section>

          <section className="mb-20 z-10">
            <h2 className="text-4xl font-bold text-center mb-8">Our Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {workCards.map((card) => (
                <div
                  key={card.id}
                  className="relative rounded-xl overflow-hidden bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={500}
                    height={300}
                    quality={100} // Set quality to max (default is 75)
                  />

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-gray-400">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="mb-20 text-center">
            <h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>
            <div className="flex flex-col items-center max-w-xl mx-auto gap-4">
              {[
                "Experienced and skilled team",
                "Quality cutting-edge solutions",
                "Customer-centric approach",
                "Transparent communication",
              ].map((text, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 text-gray-300"
                >
                  <FaCheckCircle size={24} className="text-green-500" />
                  <span className="text-lg">{text}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Digital Works?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Our team is ready to help you achieve your goals with innovative
              technology solutions.
            </p>
            <Link href={whatsappUrl}>
              <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
                Get Started <FaArrowRight className="inline ml-2" />
              </button>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default ServicePage;