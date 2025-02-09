import React from "react";

interface HeadingProps {
  mainText: string;
  secondaryText?: string;
  tertiaryText?: string;
}

const MainHeading: React.FC<HeadingProps> = ({ mainText, secondaryText, tertiaryText }) => {
  return (
    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight text-center">
      <span className="inline-block">{mainText}</span>
      {secondaryText && (
        <>
          {" "}
          <span className="inline-block">{secondaryText}</span>
        </>
      )}
      {tertiaryText && (
        <>
          {" "}
          <span className="inline-block">{tertiaryText}</span>
        </>
      )}
    </h1>
  );
};

export default MainHeading;