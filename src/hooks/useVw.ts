"use client";
import { useEffect, useState } from "react";

const useVw = () => {
  const [vw, setVw] = useState<number>(0); // Start with 0 to match SSR output

  useEffect(() => {
    const updateVw = () => {
      const newVw = window.innerWidth;
      setVw(newVw);
      document.documentElement.style.setProperty("--vw", `${newVw * 0.01}px`);
    };

    updateVw(); // ✅ Runs only after mount
    window.addEventListener("resize", updateVw);
    return () => window.removeEventListener("resize", updateVw);
  }, []);

  return vw;
};

export default useVw;
