"use client";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 top-1/4 -left-48 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute w-96 h-96 bottom-1/4 -right-48 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About Us */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are a team of passionate designers and developers dedicated to creating innovative solutions for your business needs. Our goal is to deliver exceptional results through cutting-edge technology and creative design.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300">
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300">
                  <span>About</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300">
                  <span>Services</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300">
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-400">
              <p>Email: info@cookmypapers.com</p>
              <p>Phone: +1 (234) 567-890</p>
              <p>Address: 123 Main Street, City, Country</p>
            </div>
            <h3 className="text-2xl font-bold mt-6 mb-4">Subscribe to Our Newsletter</h3>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-12">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaGithub size={24} />
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-500 mt-12">
          <p>&copy; 2023 CookMyPapers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;