"use client"
import React, { useState, useEffect } from 'react';
import BackgroundEffect from './Background';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseMove = (e:any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
 <BackgroundEffect/>
      <div 
        className="relative min-h-screen flex items-center justify-center px-4"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Floating elements */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="grid grid-cols-3 gap-8 transform rotate-12">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-24 h-24 bg-white/10 rounded-lg backdrop-blur-sm animate-float"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    transform: `translateZ(${Math.sin(scrollY * 0.002 + i) * 20}px)`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="relative space-y-8 transform-gpu">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight">
              <span className="inline-block animate-fade-in-up">Design.</span>{' '}
              <span className="inline-block animate-fade-in-up animation-delay-200">Create.</span>{' '}
              <span className="inline-block animate-fade-in-up animation-delay-400">Innovate.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
              Transform your digital presence with our cutting-edge solutions and premium design aesthetics.
            </p>
            
            <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-800">
              <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-200">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transform hover:scale-105 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full animate-scroll" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;