import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import FooterSection from "./FooterSection";

const AboutUs: React.FC = () => {
  return (
    <FooterSection title="About Us" icon={<FaInfoCircle />}>
      <p className="text-gray-400 text-sm sm:text-base">
        We are a team of passionate designers and developers dedicated to
        creating innovative solutions for your business needs.
      </p>
    </FooterSection>
  );
};

export default AboutUs;