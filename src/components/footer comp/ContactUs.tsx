import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import FooterSection from "./FooterSection";

const ContactUs: React.FC = () => {
  return (
    <FooterSection title="Contact Us">
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
    </FooterSection>
  );
};

export default ContactUs;