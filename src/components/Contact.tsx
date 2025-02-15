"use client";
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import BackgroundEffect from "./Background";
import SendMessage from "./SendMessage";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
      <BackgroundEffect />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
            <div className="flex flex-col space-y-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-lg hover:text-gray-400 transition-colors duration-300"
              >
                <FaFacebook size={24} />
                <span>Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-lg hover:text-gray-400 transition-colors duration-300"
              >
                <FaTwitter size={24} />
                <span>Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-lg hover:text-gray-400 transition-colors duration-300"
              >
                <FaInstagram size={24} />
                <span>Instagram</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-lg hover:text-gray-400 transition-colors duration-300"
              >
                <FaLinkedin size={24} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-lg hover:text-gray-400 transition-colors duration-300"
              >
                <FaGithub size={24} />
                <span>Github</span>
              </a>
            </div>
          </div>

      <SendMessage/>
        </div>

        <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-center mt-10">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together!</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We are always open to new ideas and collaborations. Reach out to us,
            and let&apos;s build something amazing together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
