"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { assets } from "@/data/assets";
import { useBooking } from "@/context/BookingContext";
import { ArrowLeftRight, Sparkles } from "lucide-react";

export function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const pos = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPos(pos);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMove]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  const { transformation } = assets;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Interactive Comparison Container */}
        <div className="lg:col-span-8">
          <div
            ref={containerRef}
            tabIndex={0}
            role="slider"
            aria-label="Before and after transformation slider"
            aria-valuenow={Math.round(sliderPos)}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] select-none overflow-hidden cursor-ew-resize bg-lume-stone/30 focus-visible:ring-2 focus-visible:ring-lume-gold"
          >
            {/* AFTER Image (Full background) */}
            <div className="absolute inset-0">
              <Image
                src={transformation.after}
                alt={transformation.afterAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center pointer-events-none"
              />
              <div className="absolute bottom-4 right-4 z-10 px-3 py-1 bg-lume-ink/80 backdrop-blur-sm text-lume-ivory text-[11px] uppercase tracking-widest font-sans font-medium">
                After: LUMÉ Result
              </div>
            </div>

            {/* BEFORE Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <Image
                src={transformation.before}
                alt={transformation.beforeAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-lume-ink/80 backdrop-blur-sm text-lume-ivory text-[11px] uppercase tracking-widest font-sans font-medium">
                Before: Baseline Tone
              </div>
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-white shadow-lg" />
              {/* Center Handle Handle */}
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-lume-ink text-lume-ivory border-2 border-white shadow-xl flex items-center justify-center">
                <ArrowLeftRight className="w-3.5 h-3.5 text-lume-gold" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 text-xs font-sans text-lume-taupe">
            <span>Drag slider or use ← / → keyboard keys</span>
            <span className="font-medium text-lume-ink">Comparison: {Math.round(sliderPos)}%</span>
          </div>
        </div>

        {/* Narrative Side Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-lume-gold font-sans font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{transformation.title}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-lume-ink leading-snug">
              {transformation.subtitle}
            </h3>
          </div>

          <p className="text-sm font-sans text-lume-ink/75 leading-relaxed">
            A complete tone refinement balancing brassy mid-lengths with bespoke micro-foiled illumination, root shadow diffusion, and a lightweight architectural face-framing cut.
          </p>

          <div className="space-y-2.5 pt-2 border-t border-lume-ink/10 text-xs font-sans">
            <div className="flex justify-between py-1 border-b border-lume-ink/5">
              <span className="text-lume-taupe uppercase tracking-wider">Service</span>
              <span className="font-medium text-lume-ink">{transformation.service}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-lume-ink/5">
              <span className="text-lume-taupe uppercase tracking-wider">Lead Artist</span>
              <span className="font-medium text-lume-ink">{transformation.stylist}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-lume-ink/5">
              <span className="text-lume-taupe uppercase tracking-wider">Maintenance</span>
              <span className="font-medium text-lume-ink">12–16 Weeks Lived-in Growth</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => openBooking({ serviceId: "balayage", stylistId: "maya-chen" })}
              className="w-full sm:w-auto px-6 py-3 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium hover:bg-lume-brown transition-colors"
            >
              Book This Transformation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
