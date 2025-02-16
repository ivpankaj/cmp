import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string; // Add className property
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
