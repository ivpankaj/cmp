import React from "react";

interface FooterSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, icon, children }) => {
  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center space-x-2">
        {icon && icon}
        <span>{title}</span>
      </h3>
      <div>{children}</div>
    </div>
  );
};

export default FooterSection;