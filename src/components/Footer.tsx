import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";  // Import X icon
import BackgroundEffect from "./Background";
import { ToastContainer } from "react-toastify";
import AboutUs from "./footer comp/AboutUs";
import QuickLinks from "./footer comp/QuickLinks";
import ContactUs from "./footer comp/ContactUs";
import Newsletter from "./footer comp/Newsletter";

// Define social media links
const socialLinks = [
  { Icon: FaFacebook, url: "https://www.facebook.com/share/1AyeGLDkAU/", label: "Facebook" },
  { Icon: FaXTwitter, url: "https://x.com/cookmypapers", label: "X" },
  { Icon: FaInstagram, url: "https://www.instagram.com/cookmypapers", label: "Instagram" },
  { Icon: FaLinkedin, url: "https://www.linkedin.com/company/cookmypaper", label: "LinkedIn" },

];

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-16 relative overflow-hidden z-10">
      {/* Background Elements */}
      <BackgroundEffect />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">
          <AboutUs />
          <QuickLinks />
          <div>
            <ContactUs />
            <Newsletter />
          </div>
        </div>

        {/* Social Media Icons with Links */}
        <div className="flex justify-center space-x-6 mt-12">
          {socialLinks.map(({ Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label={label}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-500 mt-12 text-sm sm:text-base">
          <p>&copy; {new Date().getFullYear()} cookmypapers. All rights reserved.</p>
        </div>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </footer>
  );
};

export default Footer;