"use client";
import React from "react";

const BackgroundEffect = () => {
  return (
    <div className="absolute inset-0 opacity-20">
      <div className="absolute w-96 h-96 top-1/4 -left-48 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob" />
      <div className="absolute w-96 h-96 bottom-1/4 -right-48 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
    </div>
  );
};

export default BackgroundEffect;
