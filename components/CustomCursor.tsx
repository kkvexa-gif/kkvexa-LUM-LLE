"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointer
    if (window.matchMedia("(pointer: fine)").matches) {
      const handleMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);

        const target = e.target as HTMLElement | null;
        if (
          target?.closest("button") ||
          target?.closest("a") ||
          target?.closest("[data-cursor='hover']") ||
          target?.closest("input") ||
          target?.closest("select") ||
          target?.closest("textarea")
        ) {
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
      };

      const handleMouseLeave = () => {
        setIsVisible(false);
      };

      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="custom-cursor pointer-events-none fixed z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      aria-hidden="true"
    >
      <div
        className={`rounded-full transition-all duration-300 ease-out ${
          isHovered
            ? "w-8 h-8 bg-lume-gold/25 border border-lume-gold"
            : "w-2.5 h-2.5 bg-lume-ink/60"
        }`}
      />
    </div>
  );
}
