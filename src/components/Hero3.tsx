"use client"
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const DataStatisticsSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0,
    revenue: 0
  });

  const finalStats = {
    projects: 250,
    clients: 120,
    satisfaction: 98,
    revenue: 15
  };

  const gridData = [
    { title: "Design Systems", value: "85%" },
    { title: "Web Development", value: "92%" },
    { title: "User Experience", value: "88%" },
    { title: "Mobile Apps", value: "90%" },
    { title: "Branding", value: "87%" },
    { title: "Consulting", value: "93%" }
  ];

  const chartData = [
    { name: 'Q1', value: 45 },
    { name: 'Q2', value: 65 },
    { name: 'Q3', value: 85 },
    { name: 'Q4', value: 95 }
  ];

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const animationDuration = 2000;
    const steps = 60;
    const interval = animationDuration / steps;

    const animate = () => {
      let currentStep = 0;

      const timer = setInterval(() => {
        if (currentStep === steps) {
          clearInterval(timer);
          return;
        }

        setAnimatedStats(() => ({
          projects: Math.min(Math.floor((currentStep / steps) * finalStats.projects), finalStats.projects),
          clients: Math.min(Math.floor((currentStep / steps) * finalStats.clients), finalStats.clients),
          satisfaction: Math.min(Math.floor((currentStep / steps) * finalStats.satisfaction), finalStats.satisfaction),
          revenue: Math.min(Math.floor((currentStep / steps) * finalStats.revenue), finalStats.revenue)
        }));

        currentStep++;
      }, interval);
    };

    animate();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 top-1/4 -left-48 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute w-96 h-96 bottom-1/4 -right-48 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { label: 'Projects Completed', value: animatedStats.projects, suffix: '+' },
            { label: 'Happy Clients', value: animatedStats.clients, suffix: '+' },
            { label: 'Satisfaction Rate', value: animatedStats.satisfaction, suffix: '%' },
            { label: 'Million Revenue', value: animatedStats.revenue, suffix: 'M+' }
          ].map((stat, index) => (
            <div
              key={index}
              className="relative p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`
              }}
            >
              <div className="text-4xl font-bold mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Grid Pattern Box */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Chart */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20">
            <h3 className="text-2xl font-bold mb-6">Performance Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Bar dataKey="value" fill="#ffffff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grid Skills */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20">
            <h3 className="text-2xl font-bold mb-6">Expertise Levels</h3>
            <div className="grid grid-cols-2 gap-4">
              {gridData.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 transform hover:scale-105 transition-duration-300"
                >
                  <div className="text-lg font-semibold">{item.title}</div>
                  <div className="text-2xl font-bold text-white/90">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info Box */}
        <div 
          className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-center"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`
          }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our data-driven approach combined with premium design solutions helps businesses 
            achieve their digital transformation goals with measurable results.
          </p>
          <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-200">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataStatisticsSection;