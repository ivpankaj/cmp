"use client";
import { useEffect, useState } from "react";

const useVh = () => {
  const [vh, setVh] = useState<number>(typeof window !== "undefined" ? window.innerHeight : 0);

  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ Prevent errors on the server

    const updateVh = () => {
      const newVh = window.innerHeight;
      setVh(newVh);
      document.documentElement.style.setProperty("--vh", `${newVh * 0.01}px`);
    };

    updateVh(); // Initialize on mount

    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  return vh;
};

export default useVh;
