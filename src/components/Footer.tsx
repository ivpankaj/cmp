"use client";
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaInfoCircle,
  FaChevronRight,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane
} from "react-icons/fa";
import BackgroundEffect from "./Background";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 relative overflow-hidden">
      {/* Background Elements */}
      <BackgroundEffect />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">
          {/* Column 1: About Us */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center space-x-2">
              <FaInfoCircle /> <span>About Us</span>
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              We are a team of passionate designers and developers dedicated to creating innovative solutions for your business needs.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item} className="flex items-center space-x-2">
                  <FaChevronRight className="text-gray-400" />
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Newsletter */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-400 text-sm sm:text-base">
              <p className="flex items-center space-x-2">
                <FaEnvelope /> <span>Email: info@cookmypapers.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <FaPhone /> <span>Phone: +1 (234) 567-890</span>
              </p>
              <p className="flex items-center space-x-2">
                <FaMapMarkerAlt /> <span>123 Main Street, City, Country</span>
              </p>
            </div>

            {/* Newsletter */}
            <h3 className="text-xl sm:text-2xl font-bold mt-6 mb-4">Subscribe</h3>
            <form className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="px-6 py-2 flex items-center space-x-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-all duration-300"
              >
                <FaPaperPlane /> <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-12">
          {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Icon size={24} />
            </a>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-500 mt-12 text-sm sm:text-base">
          <p>&copy; {new Date().getFullYear()} CookMyPapers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
