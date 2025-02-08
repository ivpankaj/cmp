"use client";
import { useEffect, useState } from "react";

const useVh = () => {
  const [vh, setVh] = useState<number>(0); // Start with 0 to match SSR output

  useEffect(() => {
    const updateVh = () => {
      const newVh = window.innerHeight;
      setVh(newVh);
      document.documentElement.style.setProperty("--vh", `${newVh * 0.01}px`);
    };

    updateVh(); // ✅ Only runs after mounting (fixes hydration mismatch)
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  return vh;
};

export default useVh;
