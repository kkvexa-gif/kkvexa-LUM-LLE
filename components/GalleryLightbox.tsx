"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { GalleryItem } from "@/data/gallery";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalCount: number;
}

export function GalleryLightbox({
  item,
  isOpen,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
}: GalleryLightboxProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowRight") onNext();
        if (e.key === "ArrowLeft") onPrev();
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery Image Lightbox"
    >
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-lume-ink/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Lightbox Frame */}
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col items-center justify-center animate-fadeIn">
        {/* Top Controls */}
        <div className="w-full flex items-center justify-between pb-3 text-lume-ivory text-xs font-sans">
          <span className="tracking-widest uppercase text-lume-gold font-medium">
            {currentIndex + 1} / {totalCount} • {item.category}
          </span>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-2 text-lume-ivory hover:text-lume-gold transition-colors focus-visible:ring-2 focus-visible:ring-lume-gold"
            aria-label="Close lightbox view"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Container with Nav Arrows */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[70vh] bg-black/40 overflow-hidden shadow-2xl border border-lume-ivory/10">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="100vw"
            className="object-contain"
          />

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-lume-ink/70 hover:bg-lume-ink text-lume-ivory border border-lume-ivory/20 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-lume-gold"
            aria-label="Previous gallery image"
          >
            <ChevronLeft className="w-6 h-6 text-lume-gold" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-lume-ink/70 hover:bg-lume-ink text-lume-ivory border border-lume-ivory/20 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-lume-gold"
            aria-label="Next gallery image"
          >
            <ChevronRight className="w-6 h-6 text-lume-gold" />
          </button>
        </div>

        {/* Bottom Caption & Stylist Credit */}
        <div className="w-full pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-lume-ivory">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-lume-ivory font-light">
              {item.title}
            </h3>
            <p className="text-xs text-lume-stone/80 font-sans mt-0.5">
              {item.caption}
            </p>
          </div>
          {item.stylist && (
            <div className="text-xs font-sans text-lume-gold shrink-0">
              Artist: <span className="text-lume-ivory font-medium">{item.stylist}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
