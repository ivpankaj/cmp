import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import FooterSection from "./FooterSection";

const ContactUs: React.FC = () => {
  return (
    <FooterSection title="Contact Us">
      <div className="space-y-2 text-gray-400 text-sm sm:text-base">
        {/* Email Link */}
        <p className="flex items-center space-x-2">
          <FaEnvelope />
          <a
            href="mailto:imvpankaj@gmail.com"
            className="text-white hover:underline"
          >
            Email: imvpankaj@gmail.com
          </a>
        </p>

        {/* Phone Link */}
        <p className="flex items-center space-x-2">
          <FaPhone />
          <a
            href="tel:+919911064724"
            className="text-white hover:underline"
          >
            Phone: +91 9911064724
          </a>
        </p>

        {/* Map Link */}
        <p className="flex items-center space-x-2">
          <FaMapMarkerAlt />
          <a
            href="https://www.google.com/maps?q=Noida,+India"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            Location: Noida, India
          </a>
        </p>
      </div>
    </FooterSection>
  );
};

export default ContactUs;