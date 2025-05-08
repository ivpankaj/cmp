"use client";
import BackgroundEffect from "@/components/Background";
import { products } from "@/data/product";
import HeroSection from "@/mini component/HeroSection";
import { Glasses, HammerIcon, StampIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaCheckCircle,
  FaArrowRight,

  FaShoppingCart,
} from "react-icons/fa";

const ProductPage = () => {
  const benefits = [
    {
      icon: <HammerIcon size={32} aria-label="Innovation Icon" />,
      title: "Built for Innovation",
      description:
        "Our tools are designed to push the boundaries of creativity.",
    },
    {
      icon: <Glasses size={32} />,
      title: "Immersive Experience",
      description:
        "Experience cutting-edge technology with a focus on usability.",
    },
    {
      icon: <StampIcon size={32} />,
      title: "Scalable Solutions",
      description: "Grow your business with tools that adapt to your needs.",
    },
  ];
  const phoneNumber = "+919911064724"; // Replace with your phone number
  const message = encodeURIComponent("Hii Team , cookmypapers !! I have a question related to product!"); // Pre-filled message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  return (
    <>
      <HeroSection
        title={["Products"]}
        subtitle="Explore Our tech tools and Services which will help you to grow your works."
        
      />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
        <BackgroundEffect />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       

          {/* Section 2: Featured Products */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative rounded-xl overflow-hidden bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300"
                >
                  <Image
                   height={500}
                   width={500}
                    src={product.image}
                    alt={product.name}
                    className="w-full object-cover"
                    quality={100}
                    priority
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-400 mb-4">{product.description}</p>
                    <p className="text-2xl font-bold mb-4">{product.price}</p>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-2 text-gray-400"
                        >
                          <FaCheckCircle size={16} className="text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                 <Link href={whatsappUrl}>
                 <button className="mt-4 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
                      Contact us <FaShoppingCart className="inline ml-2" />
                    </button></Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Why Choose Our Products */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Why Choose Our Services?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center"
                >
                  <div className="text-4xl text-green-500 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>


          {/* Section 6: Call to Action */}
          <section className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Elevate Your Business?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Explore our products and discover how they can transform your
              workflow and drive success.
            </p>
          <Link href={whatsappUrl}>
          <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
              Send Us Your Idea <FaArrowRight className="inline ml-2" />
            </button></Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
