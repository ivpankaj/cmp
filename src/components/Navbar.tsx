"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Home,
  Layers,
  Users,
  Mail,
  Box,
  Lightbulb,
  Building2,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to detect when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "home", label: "Home", href: "/", icon: Home },
    { id: "services", label: "Services", href: "/services", icon: Layers },
    { id: "about", label: "About", href: "/about", icon: Users },
    { id: "contact", label: "Contact", href: "/contact", icon: Mail },
  ];

  const dropdownItems = [
    { id: "products", label: "Products", href: "#", icon: Box },
    { id: "solutions", label: "Solutions", href: "#", icon: Lightbulb },
    { id: "enterprise", label: "Enterprise", href: "#", icon: Building2 },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed w-full h-20 transition-all duration-500 ease-in-out ${
        scrolled ? "bg-black/90 backdrop-blur-lg shadow-2xl" : "bg-transparent"
      } z-50`}
    >
      <div id="nav-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="nav-content" className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            id="logo-container"
            className="flex-shrink-0 group cursor-pointer"
          >
            <h1 className="text-white text-3xl font-bold tracking-wider transform transition-all duration-300 group-hover:scale-110 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-white to-gray-400">
              CookMyPapers
            </h1>
          </div>

          {/* Desktop Menu */}
          <div id="desktop-menu" className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="relative group"
                >
                  <div className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transform transition-all duration-300 hover:translate-y-[-4px]">
                    <Icon className="h-4 w-4 transform transition-all duration-300" />
                    <span>{item.label}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
                </a>
              );
            })}

            {/* Dropdown */}
            <div id="dropdown-container" className="relative">
              <button
                id="dropdown-button"
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
                id="dropdown-menu"
                className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl bg-white/10 backdrop-blur-lg transform transition-all duration-300 origin-top ${
                  isDropdownOpen
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                {dropdownItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-300 first:rounded-t-xl last:rounded-b-xl group"
                    >
                      <Icon className="h-4 w-4 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-125" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Sign in with Google Button */}
            <button
              id="signin-button"
              className="relative group overflow-hidden bg-white/10 backdrop-blur-sm text-white px-6 py-2.5 rounded-xl font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
            >
              <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-gradient-to-r from-white/20 to-transparent" />
              <div className="relative flex items-center space-x-2">
                <User className="h-4 w-4 transform transition-all duration-300 group-hover:rotate-12" />
                <span>Sign in with Google</span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div id="mobile-menu-button" className="md:hidden">
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

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden transform transition-all duration-300 origin-top ${
            isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black backdrop-blur-lg rounded-xl mt-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-3 text-base font-medium transform transition-all duration-300 hover:translate-x-2 group"
                >
                  <Icon className="h-5 w-5 transform transition-all duration-300 group-hover:rotate-12" />
                  <span>{item.label}</span>
                </a>
              );
            })}
            {dropdownItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-3 text-base font-medium transform transition-all duration-300 hover:translate-x-2 group"
                >
                  <Icon className="h-5 w-5 transform transition-all duration-300 group-hover:rotate-12" />
                  <span>{item.label}</span>
                </a>
              );
            })}
            <button
              id="mobile-signin-button"
              className="w-full mt-4 flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-xl font-medium transform transition-all duration-300 hover:bg-white/20 group"
            >
              <User className="h-5 w-5 transform transition-all duration-300 group-hover:rotate-12" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;