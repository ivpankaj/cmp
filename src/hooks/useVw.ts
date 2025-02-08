"use client"
import { useEffect, useState } from 'react';

const useVw = () => {
  const [vw, setVw] = useState<number>(window.innerWidth);

  useEffect(() => {
    const updateVw = () => {
      const newVw = window.innerWidth;
      setVw(newVw); // ✅ Update state
      document.documentElement.style.setProperty('--vw', `${newVw * 0.01}px`);
    };

    updateVw(); // Initialize on mount

    window.addEventListener('resize', updateVw);
    return () => window.removeEventListener('resize', updateVw);
  }, []);

  return vw; // ✅ Return viewport width
};

export default useVw;
