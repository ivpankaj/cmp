"use client";
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import BackgroundEffect from "./Background";
import Button from "@/mini component/Button";
import { chartData, gridData } from "@/data/grid_chart";
import Link from "next/link";

const DataStatisticsSection = () => {
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    users: 0,
    satisfaction: 0,
    revenue: 0,
  });

  const finalStats = {
    projects: 25,
    users: 120,
    satisfaction: 98,
    revenue: 15,
  };
  const phoneNumber = "+918320301766"; // Replace with your phone number
  const message = encodeURIComponent("Hii Team, cookmypapers !! , I have a question!"); // Pre-filled message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
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
          projects: Math.min(
            Math.floor((currentStep / steps) * finalStats.projects),
            finalStats.projects
          ),
          users: Math.min(
            Math.floor((currentStep / steps) * finalStats.users),
            finalStats.users
          ),
          satisfaction: Math.min(
            Math.floor((currentStep / steps) * finalStats.satisfaction),
            finalStats.satisfaction
          ),
          revenue: Math.min(
            Math.floor((currentStep / steps) * finalStats.revenue),
            finalStats.revenue
          ),
        }));

        currentStep++;
      }, interval);
    };

    animate();
  }, []);

  return (
    <div className="min-h-screen z-10 bg-black text-white py-20 relative overflow-hidden">
      <BackgroundEffect />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            {
              label: "Projects Completed",
              value: animatedStats.projects,
              suffix: "+",
            },
            {
              label: "Happy Clients",
              value: animatedStats.users,
              suffix: "+",
            },
            {
              label: "Satisfaction Rate",
              value: animatedStats.satisfaction,
              suffix: "%",
            },
            {
              label: "Resume Made",
              value: animatedStats.revenue,
              suffix: "",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl font-bold mb-2">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20">
            <h3 className="text-2xl font-bold mb-6">Our accuracy level arising (2025)</h3>
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
            <h3 className="text-2xl font-bold mb-6">Our Accuracy Levels</h3>
            <div className="grid grid-cols-2 gap-4">
              {gridData.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 transform hover:scale-105 transition-duration-300"
                >
                  <div className="text-lg font-semibold">{item.title}</div>
                  <div className="text-2xl font-bold text-white/90">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Tech Idea?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our data-driven approach combined with premium design solutions
            helps businesses achieve their digital transformation goals with
            measurable results.
          </p>
       <Link href={whatsappUrl}>   <Button text="Tell us what you want" /></Link>
        </div>
      </div>
    </div>
  );
};

export default DataStatisticsSection;
