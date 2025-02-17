"use client";
import BackgroundEffect from "@/components/Background";
import HeroSection from "@/mini component/HeroSection";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const AboutUsPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Pankaj Verma",
      role: "CEO & Founder",
      image: "/images/team-member-1.jpg", // Replace with actual image path
      bio: "A tech hungry guy who wants to make universe great with technology",
    },
    {
      id: 2,
      name: "Teena Mohite",
      role: "CTO",
      image: "/images/team-member-2.jpg", // Replace with actual image path
      bio: "Expert in software architecture.",
    },
    {
      id: 3,
      name: "Piku Lata",
      role: "Lead Designer",
      image: "/images/team-member-3.jpg", // Replace with actual image path
      bio: "Passionate about creating user-centric designs.",
    },
  ];

  const milestones = [
    { year: 2025, event: "Company Founded" },
    { year: 2025, event: "First Major Client Partnership" },
    { year: 2025, event: "Launched AI-Powered Solutions" },
    { year: 2025, event: "Expanded to Global Markets" },
    { year: 2025, event: "Reached 100+ Happy Clients" },
  ];

  const values = [
    "Innovation",
    "Integrity",
    "Collaboration",
    "Customer Satisfaction",
    "Sustainability",
  ];
  const phoneNumber = "+919911064724"; // Replace with your phone number
  const message = encodeURIComponent("Hii Team, cookmypapers, !!  I want to know you more!"); // Pre-filled message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  return (
    <>
      <HeroSection
        title={[ "Our.", "Journey."]}
        subtitle="Transform your digital presence with our cutting-edge solutions and premium design aesthetics."
    
      />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
        <BackgroundEffect />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-20 text-center">
            <p className="text-gray-400 max-w-3xl mx-auto">
              We are a team of passionate innovators dedicated to transforming
              businesses through cutting-edge technology and creative solutions.
              Our mission is to empower organizations to achieve their goals
              with scalable, efficient, and impactful digital tools.
            </p>
          </section>

          {/* Section 2: Our Story */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">Our Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-400">
                  Founded in 2025, cookmypapers started as a small team of
                  developers with a vision to revolutionize the tech industry.
                  Over the years, we have grown into a powerful website serving
                  users across industries. Our journey has been marked by
                  innovation, collaboration, and a relentless focus on
                  delivering value to our users.
                </p>
              </div>
              <div>
                <Image
                 height={100}
                 width={100}
                  src="/images/about-us-story.jpg" // Replace with actual image path
                  alt="Our Story"
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Milestones */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Our Milestones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {milestones.map((milestone) => (
                <div
                  key={milestone.year}
                  className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center"
                >
                  <h3 className="text-2xl font-bold">{milestone.year}</h3>
                  <p className="text-gray-400 mt-2">{milestone.event}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Meet the Team */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="relative rounded-xl overflow-hidden bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300"
                >
                  <Image
                   height={100}
                   width={100}
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-gray-400 mb-2">{member.role}</p>
                    <p className="text-gray-500">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Our Values */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center"
                >
                  <FaCheckCircle
                    size={24}
                    className="text-green-500 mx-auto mb-4"
                  />
                  <p className="text-lg font-medium">{value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Testimonials */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <p className="text-gray-400 italic">
                  &quot;CookMyPapers transformed our business with their
                  innovative solutions. Their team is professional, responsive,
                  and truly cares about delivering results.&quot;
                </p>
                <p className="text-white font-medium mt-4">
                  - Ayush M, Software Developer at Apar Technologies
                </p>
              </div>
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <p className="text-gray-400 italic">
                  &quot;Their expertise in tech tools and website making helped us
                  scale our operations significantly. Highly recommend their
                  services!&quot;
                </p>
                <p className="text-white font-medium mt-4">
                  - Sandeep P, Web Developer
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Call to Action */}
          <section className="text-center">
            <h2 className="text-4xl font-bold mb-6">Join Us on Our Journey</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Whether you&quot;re looking for a partner to build your next
              project or want to join our team, we&quot;d love to hear from you!
            </p>
         <Link href={whatsappUrl}>
         <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
              Get in Touch <FaArrowRight className="inline ml-2" />
            </button></Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
