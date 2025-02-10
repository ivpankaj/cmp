"use client";
import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"; // Import NextAuth utilities
import type { Session } from "next-auth";

// Dynamically import icons
const Menu = dynamic(() => import("lucide-react").then((mod) => mod.Menu), {
  ssr: false,
});
const X = dynamic(() => import("lucide-react").then((mod) => mod.X), {
  ssr: false,
});
const ChevronDown = dynamic(
  () => import("lucide-react").then((mod) => mod.ChevronDown),
  { ssr: false }
);
const User = dynamic(() => import("lucide-react").then((mod) => mod.User), {
  ssr: false,
});

import { dropdownItems, menuItems } from "@/data/navbar";

type MenuItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const memoizedMenuItems = useMemo(() => menuItems, []);
  const memoizedDropdownItems = useMemo(() => dropdownItems, []);
  const { data: session }: { data: Session | null } = useSession(); // Get session data

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="main-nav"
      className={`fixed w-full h-20 transition-all duration-500 ease-in-out ${
        scrolled ? "bg-black/90 backdrop-blur-lg shadow-2xl" : "bg-transparent"
      } z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 group cursor-pointer">
            <h1 className="text-white text-3xl font-bold tracking-wider transform transition-all duration-300 group-hover:scale-110 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-white to-gray-400">
              CookMyPapers
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {memoizedMenuItems.map((item: MenuItem) => {
              const Icon = item.icon;
              return (
                <Link key={item.id} href={item.href} className="relative group">
                  <div className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transform transition-all duration-300 hover:translate-y-[-4px]">
                    <Icon className="h-4 w-4 transform transition-all duration-300" />
                    <span>{item.label}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
                </Link>
              );
            })}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-300 hover:text-white px-4 py-2 text-sm font-medium group"
              >
                <span className="relative z-10">More</span>
                <ChevronDown
                  className={`ml-1 h-4 w-4 transform transition-all duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl bg-white/10 backdrop-blur-lg transform transition-all duration-300 origin-top ${
                  isDropdownOpen
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                {memoizedDropdownItems.map((item: MenuItem) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-300 first:rounded-t-xl last:rounded-b-xl group"
                    >
                      <Icon className="h-4 w-4 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-125" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => (session ? signOut() : signIn("google"))}
              className="relative group overflow-hidden bg-white/10 backdrop-blur-sm text-white px-6 py-2.5 rounded-xl font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
            >
              <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-gradient-to-r from-white/20 to-transparent" />
              <div className="relative flex items-center space-x-2">
                <User className="h-4 w-4 transform transition-all duration-300 group-hover:rotate-12" />
                <span>{session ? "Sign Out" : "Sign in with Google"}</span>
              </div>
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 transition-all duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6 transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="h-6 w-6 transform transition-transform duration-300 hover:rotate-180" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`md:hidden transform transition-all duration-300 origin-top ${
            isOpen
              ? "scale-y-100 opacity-100"
              : "scale-y-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black backdrop-blur-lg rounded-xl mt-2">
            {memoizedMenuItems.map((item: MenuItem) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-3 text-base font-medium transform transition-all duration-300 hover:translate-x-2 group"
                >
                  <Icon className="h-5 w-5 transform transition-all duration-300 group-hover:rotate-12" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {memoizedDropdownItems.map((item: MenuItem) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-3 text-base font-medium transform transition-all duration-300 hover:translate-x-2 group"
                >
                  <Icon className="h-5 w-5 transform transition-all duration-300 group-hover:rotate-12" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={() => (session ? signOut() : signIn("google"))}
              className="relative group overflow-hidden bg-white/10 backdrop-blur-sm text-white px-6 py-2.5 rounded-xl font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
            >
              <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-gradient-to-r from-white/20 to-transparent" />
              <div className="relative flex items-center space-x-2">
                <User className="h-4 w-4 transform transition-all duration-300 group-hover:rotate-12" />
                <span>{session ? "Sign Out" : "Sign in with Google"}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);