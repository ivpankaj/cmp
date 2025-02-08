"use client"
import { useEffect, useState } from 'react';

const useVh = () => {
  const [vh, setVh] = useState<number>(window.innerHeight);

  useEffect(() => {
    const updateVh = () => {
      const newVh = window.innerHeight;
      setVh(newVh); // ✅ Update state
      document.documentElement.style.setProperty('--vh', `${newVh * 0.01}px`);
    };

    updateVh(); // Initialize on mount

    window.addEventListener('resize', updateVh);
    return () => window.removeEventListener('resize', updateVh);
  }, []);

  return vh; // ✅ Return viewport height
};

export default useVh;
