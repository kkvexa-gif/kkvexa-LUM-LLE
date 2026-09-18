"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function BrandIntroSplash() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show splash for 2.1 seconds then smoothly dissolve
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="brand-splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.85, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0c0b0a] text-lume-ivory select-none overflow-hidden"
          style={{ pointerEvents: isVisible ? "auto" : "none" }}
          aria-hidden="true"
        >
          {/* Ambient Warm Gold Glow Behind Logo */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-lume-gold/15 blur-[120px] pointer-events-none animate-pulse" />

          {/* Center Brand Logo Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Gold Emblem Reveal */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, filter: "blur(8px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-6 rounded-2xl overflow-hidden border border-lume-gold/40 shadow-[0_0_50px_rgba(181,154,106,0.3)] bg-black p-2"
            >
              <Image
                src="/assets/lume-gold-logo.jpg"
                alt="LUMÉ Salon Logo"
                fill
                priority
                sizes="(max-width: 768px) 180px, 220px"
                className="object-contain"
              />
            </motion.div>

            {/* Hairline Gold Divider Animation */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "160px", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
              className="h-[1.5px] bg-gradient-to-r from-transparent via-lume-gold to-transparent mb-4"
            />

            {/* Tagline Animation */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="space-y-1.5"
            >
              <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-lume-gold font-sans font-medium">
                Hair • Beauty • Experience
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-lume-stone/70 font-sans">
                Milton, Ontario • Canada
              </p>
            </motion.div>
          </div>

          {/* Bottom subtle progress line */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-white/10 overflow-hidden rounded-full">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.9, ease: "easeInOut" }}
              className="w-full h-full bg-lume-gold"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
