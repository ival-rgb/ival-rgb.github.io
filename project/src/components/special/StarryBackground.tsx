"use client";
import { useState, useEffect } from 'react';

const StarryBackground = () => {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; }[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 100 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
      }));
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 5 + 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;
