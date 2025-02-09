"use client"
import React from 'react';
import BackgroundEffect from './Background';
import Button from '@/mini component/Button';
import BlackButton from '@/mini component/BlackButton';
import Main_Heading from '@/mini component/Main_Heading';

const HeroSection = () => {


  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <BackgroundEffect />
      <div
        className="relative min-h-screen flex items-center justify-center px-4"

      >
        <div className="max-w-6xl mx-auto text-center">

          <div className="relative space-y-8 transform-gpu">
            <Main_Heading text='Design' minitext='create' subtext='innovate' />

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
              Transform your digital presence with our cutting-edge solutions and premium design aesthetics.
            </p>
            <div className="flex justify-center space-x-4
             animate-fade-in-up animation-delay-800">
              <Button text="Get Started" />
              <BlackButton text="Learn More" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full animate-scroll" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;