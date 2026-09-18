"use client";

import React, { useState } from "react";
import Image from "next/image";
import { galleryItems, galleryCategories, GalleryItem } from "@/data/gallery";
import { GalleryLightbox } from "./GalleryLightbox";
import { ArrowUpRight } from "lucide-react";

interface GalleryGridProps {
  initialCategory?: string;
}

export function GalleryGrid({ initialCategory = "all" }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.categorySlug === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handleNext = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="space-y-10">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 border-b border-lume-ink/10 pb-6">
        {galleryCategories.map((cat) => {
          const isActive = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-5 py-2 text-xs font-sans uppercase tracking-widest transition-all duration-300 ${
                isActive
                  ? "bg-lume-ink text-lume-ivory font-medium shadow-sm"
                  : "bg-transparent text-lume-ink/70 hover:text-lume-ink hover:bg-lume-stone/20"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Grid: 2 columns on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {filteredItems.map((item, index) => {
          return (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group cursor-pointer flex flex-col space-y-2.5 animate-fadeIn"
            >
              {/* Image Box */}
              <div
                className={`relative w-full ${item.aspectRatio} overflow-hidden bg-lume-stone/20 border border-lume-ink/10`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-lume-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="w-10 h-10 rounded-full bg-lume-ivory text-lume-ink flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <ArrowUpRight className="w-5 h-5 text-lume-gold" />
                  </div>
                </div>

                <div className="absolute top-2 left-2 px-2 py-0.5 bg-lume-ink/80 text-lume-ivory text-[9px] uppercase tracking-widest font-sans">
                  {item.category}
                </div>
              </div>

              {/* Title & Artist */}
              <div className="flex items-baseline justify-between gap-2 px-1">
                <h4 className="font-serif text-sm sm:text-base text-lume-ink font-light group-hover:text-lume-gold transition-colors truncate">
                  {item.title}
                </h4>
                {item.stylist && (
                  <span className="text-[10px] font-sans text-lume-taupe uppercase tracking-wider shrink-0 hidden sm:inline">
                    {item.stylist.split(" ")[0]}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Dialog */}
      <GalleryLightbox
        item={activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null}
        isOpen={activeLightboxIndex !== null}
        onClose={() => setActiveLightboxIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        currentIndex={activeLightboxIndex ?? 0}
        totalCount={filteredItems.length}
      />
    </div>
  );
}
