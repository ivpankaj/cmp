"use client";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import BackgroundEffect from "@/components/Background";
import { carouselItems, stats, workCards } from "@/data/service_data";
import HeroSection from "@/mini component/HeroSection";
import Image from "next/image";
import Link from "next/link";

const ServicePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const phoneNumber = "+918320301766"; // Replace with your phone number
  const message = encodeURIComponent("Hii Team, cookmypapers, !!  I have a question about services!"); // Pre-filled message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  return (
    <>
      <HeroSection
        title={["Services."]}
        subtitle="Transform your digital presence with our cutting-edge solutions and premium design aesthetics."
  
      />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
        <BackgroundEffect />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
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
  <div key={item.id} className="relative w-full h-80"> {/* Adjust height as needed */}
    <Image
      src={item.image}
      alt={item.title}
      fill
      className="object-cover" // Ensures the image covers the area properly
      quality={100} // Maximum quality
      priority // Improves loading performance
    />
    <div className="absolute bottom-0 left-0 right-0 p-8 bg-black/70 backdrop-blur-lg rounded-b-xl">
      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
      <p className="text-gray-300 mt-2">{item.description}</p>
    </div>
  </div>
))}

            </Carousel>
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
      <div key={index} className="flex items-center space-x-4 text-gray-300">
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
            </button></Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default ServicePage;
