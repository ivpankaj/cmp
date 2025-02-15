import React from "react";
import { FaChevronRight } from "react-icons/fa";
import FooterSection from "./FooterSection";

const QuickLinks: React.FC = () => {
  const links = [
    "Home",
    "About",
    "Services",
    "Contact",
    "Terms and Conditions",
    "Privacy Policy",
    "Return and Refund",
  ];

  return (
    <FooterSection title="Quick Links">
      <ul className="space-y-2 text-sm sm:text-base">
        {links.map((item) => (
          <li key={item} className="flex items-center space-x-2">
            <FaChevronRight className="text-gray-400" />
            <a
              href={`/${item.toLowerCase().replace(/ /g, "")}`}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </FooterSection>
  );
};

export default QuickLinks;