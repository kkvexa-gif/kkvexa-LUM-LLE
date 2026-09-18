"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { assets } from "@/data/assets";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export function TheSpaceGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = assets.space;

  // Uninterrupted continuous auto-scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [items.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Featured Main Cinematic Viewport with Ken Burns Zoom */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden bg-lume-brown/40 border border-lume-ivory/15 shadow-2xl">
        {/* Render images with smooth crossfade and slow organic zoom */}
        {items.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${
                isActive
                  ? "opacity-100 z-10 scale-100 pointer-events-auto"
                  : "opacity-0 z-0 scale-105 pointer-events-none"
              }`}
            >
              <div
                className={`relative w-full h-full transition-transform duration-[5500ms] ease-out ${
                  isActive ? "scale-110 translate-y-[-1%]" : "scale-100 translate-y-0"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-lume-ink via-lume-ink/30 to-transparent pointer-events-none" />

        {/* Slide Narrative Details */}
        <div className="absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-lume-ivory pointer-events-none">
          {/* Top Status */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/60 backdrop-blur-md border border-lume-gold/30 text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold rounded-full shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>Sanctuary Tour • 0{currentIndex + 1} / 0{items.length}</span>
            </div>
          </div>

          {/* Bottom Caption & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2 pointer-events-auto bg-black/40 backdrop-blur-sm p-4 sm:p-6 border-l-2 border-lume-gold">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-lume-ivory">
                {items[currentIndex].title}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-lume-stone/90 leading-relaxed">
                {items[currentIndex].caption}
              </p>
            </div>

            {/* Subtle Navigation Arrows */}
            <div className="flex items-center gap-2 pointer-events-auto shrink-0">
              <button
                onClick={prevSlide}
                className="w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-lume-ivory border border-white/20 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-lume-gold shadow-lg"
                aria-label="Previous space view"
              >
                <ArrowLeft className="w-4 h-4 text-lume-gold" />
              </button>
              <button
                onClick={nextSlide}
                className="w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-lume-ivory border border-white/20 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-lume-gold shadow-lg"
                aria-label="Next space view"
              >
                <ArrowRight className="w-4 h-4 text-lume-gold" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails Row with Sync & Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item, index) => {
          const isActive = currentIndex === index;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              className={`text-left group relative aspect-[16/10] overflow-hidden border transition-all duration-500 ${
                isActive
                  ? "border-lume-gold ring-2 ring-lume-gold/50 shadow-md scale-[1.02]"
                  : "border-lume-ivory/15 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-lume-ink/40 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-lume-ivory text-[10px] font-sans font-medium truncate drop-shadow-md">
                <span>{item.title}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-lume-gold shrink-0 ml-1" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
