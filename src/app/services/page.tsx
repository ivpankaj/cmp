"use client";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import BackgroundEffect from "@/components/Background";
import { carouselItems, stats, workCards } from "@/data/service_data";
import HeroSection from "@/mini component/HeroSection";

const ServicePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
      <HeroSection
        title={["Services."]}
        subtitle="Transform your digital presence with our cutting-edge solutions and premium design aesthetics."
        buttonText1="Show Services"
        buttonText2="Learn More"
      />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
        <BackgroundEffect />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-20">
            <Carousel
              showArrows={true}
              showThumbs={false}
              autoPlay={true}
              infiniteLoop={true}
              interval={5000}
              onChange={(index) => setCurrentSlide(index)}
              selectedItem={currentSlide}
            >
              {carouselItems.map((item) => (
                <div key={item.id} className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-96 object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-black/70 backdrop-blur-lg rounded-b-xl">
                    <h3 className="text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 mt-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
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

          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">Our Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {workCards.map((card) => (
                <div
                  key={card.id}
                  className="relative rounded-xl overflow-hidden bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-gray-400">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Why Choose Us?
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-gray-300">
                <FaCheckCircle size={20} className="text-green-500" />
                <span>Experienced and skilled team</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-300">
                <FaCheckCircle size={20} className="text-green-500" />
                <span>Innovative and cutting-edge solutions</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-300">
                <FaCheckCircle size={20} className="text-green-500" />
                <span>Customer-centric approach</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-300">
                <FaCheckCircle size={20} className="text-green-500" />
                <span>Transparent communication</span>
              </div>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Our team is ready to help you achieve your goals with innovative
              technology solutions.
            </p>
            <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
              Get Started <FaArrowRight className="inline ml-2" />
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default ServicePage;
