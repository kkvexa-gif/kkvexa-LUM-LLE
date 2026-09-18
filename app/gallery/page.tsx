"use client";

import React from "react";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useBooking } from "@/context/BookingContext";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function GalleryPage() {
  const { openBooking } = useBooking();

  return (
    <div className="pt-28 pb-24 space-y-16 sm:space-y-24">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12">
        <ScrollReveal className="max-w-3xl space-y-6" duration={0.8}>
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-8 bg-lume-gold" />
            <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
              The Portfolio
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-lume-ink tracking-tight leading-tightEditorial text-balance">
            Crafted transformations. <br />
            <span className="italic text-lume-taupe">Captured in true light.</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-lume-ink/75 leading-relaxed text-balance">
            Browse our curated gallery of lived-in balayage, geometric precision cuts, seamless extension integrations, and atelier moments. Click any image to view in full resolution.
          </p>
        </ScrollReveal>
      </section>

      {/* Main Gallery Grid with Filters and Lightbox */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal delay={0.1}>
          <GalleryGrid />
        </ScrollReveal>
      </section>

      {/* Booking CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <ScrollReveal className="bg-lume-ink text-lume-ivory p-10 sm:p-16 space-y-6">
          <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
            Inspiration in Mind?
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-lume-ivory">
            Bring your vision to the chair.
          </h2>
          <div className="pt-2">
            <button
              onClick={() => openBooking()}
              className="px-8 py-4 bg-lume-ivory text-lume-ink text-xs uppercase tracking-widest font-sans font-semibold inline-flex items-center gap-2 hover:bg-lume-gold transition-colors"
            >
              <span>Book Appointment</span>
              <ArrowUpRight className="w-4 h-4 text-lume-ink" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
