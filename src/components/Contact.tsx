"use client"
import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const ContactPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 top-1/4 -left-48 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute w-96 h-96 bottom-1/4 -right-48 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Social Media Icons */}
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

          {/* Right Column: Message Form */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4} // Fix: Change "rows='4'" to "rows={4}"
                  placeholder="Your Message"
                  className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white"
                ></textarea>

              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info Box */}
        <div
          className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-center mt-10"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`,
          }}
        >
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together!</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We are always open to new ideas and collaborations. Reach out to us, and let&apos;s build something amazing together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;