"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import { Code, Database, Globe, Smartphone, Server, Cloud, Layout, Shield } from 'lucide-react';
import MainHeading from '@/mini component/Main_Heading';
import Link from 'next/link';

const DeveloperShowcase = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeStack, setActiveStack] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    experience: 0,
    clients: 0,
    solutions: 0
  });

  const techStacks = [
    {
      title: "Frontend Development",
      icon: <Layout size={40} />,
      technologies: ["React.js", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
      description: "Creating responsive and interactive user interfaces with modern frameworks and libraries."
    },
    {
      title: "Backend Development",
      icon: <Server size={40} />,
      technologies: ["Node.js", "Python", "Java", "GraphQL", "REST APIs"],
      description: "Building scalable server-side applications and robust APIs."
    },
    {
      title: "Mobile Development",
      icon: <Smartphone size={40} />,
      technologies: ["React Native", "Flutter", "iOS", "Android", "Cross-platform"],
      description: "Developing native and cross-platform mobile applications."
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud size={40} />,
      technologies: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
      description: "Implementing cloud solutions and automated deployment pipelines."
    }
  ];

  const projects = [
    {
      title: "Enterprise E-commerce Platform",
      type: "Web Application",
      icon: <Globe size={32} />,
      stats: "5M+ Users",
      tech: "Next.js, Node.js, AWS"
    },
    {
      title: "Banking System Integration",
      type: "Enterprise Solution",
      icon: <Database size={32} />,
      stats: "1M+ Transactions",
      tech: "Java, Spring, Oracle"
    },
    {
      title: "IoT Device Management",
      type: "Cloud Platform",
      icon: <Cloud size={32} />,
      stats: "100K+ Devices",
      tech: "Python, AWS IoT, React"
    },
    {
      title: "Secure Healthcare App",
      type: "Mobile Application",
      icon: <Shield size={32} />,
      stats: "2M+ Users",
      tech: "React Native, Node.js"
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e:any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStack((prev) => (prev + 1) % techStacks.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const finalStats = {
      projects: 15,
      experience: 1,
      clients: 8,
      solutions: 20
    };

    const duration = 1000;
    const steps = 60;
    const interval = duration / steps;

    const animate = () => {
      let currentStep = 0;

      const timer = setInterval(() => {
        if (currentStep === steps) {
          clearInterval(timer);
          return;
        }

        setAnimatedStats(() => ({
          projects: Math.min(Math.floor((currentStep / steps) * finalStats.projects), finalStats.projects),
          experience: Math.min(Math.floor((currentStep / steps) * finalStats.experience), finalStats.experience),
          clients: Math.min(Math.floor((currentStep / steps) * finalStats.clients), finalStats.clients),
          solutions: Math.min(Math.floor((currentStep / steps) * finalStats.solutions), finalStats.solutions)
        }));

        currentStep++;
      }, interval);
    };

    animate();
  }, []);
  const phoneNumber = "+918320301766"; // Replace with your phone number
  const message = encodeURIComponent("Hii Team, cookmypapers !! , I want to discuss a project!"); // Pre-filled message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <MainHeading mainText='For' secondaryText='Students and' tertiaryText='Industry Professionals'/>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 top-1/4 -left-48 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute w-96 h-96 bottom-1/4 -right-48 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { label: 'Projects Delivered', value: animatedStats.projects, suffix: '+' },
            { label: 'Years Experience', value: animatedStats.experience, suffix: '+' },
            { label: 'Enterprise Clients', value: animatedStats.clients, suffix: '+' },
            { label: 'Custom Solutions', value: animatedStats.solutions, suffix: '+' }
          ].map((stat, index) => (
            <div
              key={index}
              className="relative p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`
              }}
            >
              <div className="text-4xl font-bold mb-2">{stat.value}{stat.suffix}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tech Stack Carousel */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Technology Stack</h2>
          <div className="relative">
            <div className="grid md:grid-cols-2 gap-8">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-xl backdrop-blur-sm border transform transition-all duration-500
                    ${index === activeStack ? 
                      'bg-white/15 border-white/30 scale-105 z-10' : 
                      'bg-white/5 border-white/10 scale-95 opacity-70'}`}
                  style={{
                    transform: index === activeStack ? 
                      `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) scale(1.05)` :
                      'scale(0.95)'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="mr-4 text-white">{stack.icon}</div>
                    <h3 className="text-2xl font-bold">{stack.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-6">{stack.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/10 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Showcase */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Enterprise Solutions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`
                }}
              >
                <div className="text-white mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <div className="text-gray-400 text-sm mb-2">{project.type}</div>
                <div className="text-white font-semibold mb-2">{project.stats}</div>
                <div className="text-gray-400 text-sm">{project.tech}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-center"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`
          }}
        >
          <div className="flex justify-center mb-6">
            <Code size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s collaborate to transform your ideas into powerful, scalable solutions
            that drive your business forward.
          </p>
     <Link href={whatsappUrl}>
     <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-200">
            Start a Project
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default DeveloperShowcase;


