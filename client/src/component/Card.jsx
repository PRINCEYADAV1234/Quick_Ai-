import React, { useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);

  const bringToFront = () => {
    const elements = document.querySelectorAll(".drag-element");

    let maxZ = -Infinity; // FIX: required

    elements.forEach((el) => {
      const z = parseInt(window.getComputedStyle(el).zIndex || 0);
      if (z > maxZ) maxZ = z;
    });

    setZIndex(maxZ + 1);
  };

  return (
    <motion.img
      onMouseDown={bringToFront}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
      style={{
        top,
        left,
        zIndex,
        transform: `rotate(${rotate})`, 
      }}
      className={twMerge(
        "drag-element absolute bg-neutral-200 p-1 pb-4 rounded-md shadow-md cursor-grab",
        className
      )}
    />
  );
};

export default Card;
