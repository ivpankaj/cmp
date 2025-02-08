"use client";
import { useEffect, useState } from "react";

const useVw = () => {
  const [vw, setVw] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ Prevent errors on the server

    const updateVw = () => {
      const newVw = window.innerWidth;
      setVw(newVw);
      document.documentElement.style.setProperty("--vw", `${newVw * 0.01}px`);
    };

    updateVw(); // Initialize on mount

    window.addEventListener("resize", updateVw);
    return () => window.removeEventListener("resize", updateVw);
  }, []);

  return vw;
};

export default useVw;
