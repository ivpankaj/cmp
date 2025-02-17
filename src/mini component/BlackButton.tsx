import React from "react";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
}

const BlackButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="px-8 py-4 border border-white text-white font-bold rounded-full hover:bg-white/10 transform hover:scale-105 transition-all duration-200"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BlackButton;
