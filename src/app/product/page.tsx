"use client";
import BackgroundEffect from "@/components/Background";
import { products } from "@/data/product";
import HeroSection from "@/mini component/HeroSection";
import { Glasses, HammerIcon, StampIcon } from "lucide-react";
import React from "react";
import {
  FaCheckCircle,
  FaArrowRight,
  FaStar,
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

  return (
    <>
      <HeroSection
        title={["Product"]}
        subtitle="Transform your digital presence with our cutting-edge solutions and premium design aesthetics."
        buttonText1="Show Services"
        buttonText2="Learn More"
      />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
        <BackgroundEffect />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-20 text-center">
            <p className="text-gray-400 max-w-3xl mx-auto">
              Discover our innovative suite of products designed to elevate your
              business. From design tools to analytics dashboards, we have
              everything you need to succeed.
            </p>
          </section>

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
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
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
                    <button className="mt-4 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
                      Add to Cart <FaShoppingCart className="inline ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Why Choose Our Products */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Why Choose Our Products?
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

          {/* Section 4: Customer Reviews */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Customer Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} size={20} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-400 italic">
                  &lsquo;The Pro Design Suite has transformed the way we create
                  visuals. It&apos;s intuitive and packed with features!&lsquo;
                </p>
                <p className="text-white font-medium mt-4">
                  - Emily R., Designer
                </p>
              </div>
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} size={20} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-400 italic">
                  &lsquo;The DevOps Toolkit is a game-changer. It streamlined
                  our workflows and saved us countless hours.&lsquo;
                </p>
                <p className="text-white font-medium mt-4">
                  - David K., Developer
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: 3D Effect Showcase */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Experience the Future
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src="/images/3d-product.jpg" // Replace with actual image path
                  alt="3D Product"
                  className="w-full h-96 object-cover rounded-xl shadow-2xl transform hover:rotate-3 hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4">
                  Immerse Yourself in Innovation
                </h3>
                <p className="text-gray-400 mb-6">
                  Our products leverage cutting-edge 3D technologies to provide
                  immersive experiences. Whether you&lsquo;re designing,
                  developing, or analyzing, our tools bring your ideas to life.
                </p>
                <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
                  Learn More <FaArrowRight className="inline ml-2" />
                </button>
              </div>
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
            <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
              Get Started <FaArrowRight className="inline ml-2" />
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
