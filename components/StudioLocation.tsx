"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { assets } from "@/data/assets";
import { useBooking } from "@/context/BookingContext";
import { MapEmbed } from "@/components/MapEmbed";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, MapPin, Clock, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export function StudioLocation() {
  const { openBooking } = useBooking();
  const [isMapHighlighted, setIsMapHighlighted] = useState(false);

  const handleGetDirections = () => {
    setIsMapHighlighted(true);
    const mapElement = document.getElementById("studio-map");
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => {
      setIsMapHighlighted(false);
    }, 2500);
  };

  return (
    <div className="w-full space-y-16 sm:space-y-24">
      {/* 1. Header: The Studio */}
      <ScrollReveal className="max-w-3xl space-y-4" duration={0.8}>
        <div className="inline-flex items-center gap-2">
          <span className="h-[1px] w-8 bg-lume-gold" />
          <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
            08 — The Studio
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-lume-ink tracking-tight leading-tightEditorial text-balance">
          Come as you are.
        </h2>

        <p className="text-base sm:text-lg font-sans text-lume-ink/75 leading-relaxed text-balance">
          Leave feeling like yourself — only a little more you.
        </p>
      </ScrollReveal>

      {/* 2. Large Visual + Floating Location Panel */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Primary Visual (55-65% width on desktop) */}
          <ScrollReveal
            className="lg:col-span-8 relative z-0"
            duration={0.9}
            delay={0.1}
          >
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-lg sm:rounded-xl overflow-hidden bg-lume-stone/20 border border-lume-ink/10 group">
              <Image
                src={assets.studio.image}
                alt={assets.studio.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lume-ink/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-lume-ivory pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-lume-gold">
                  Milton Studio
                </span>
                <p className="font-serif text-xl sm:text-2xl font-light text-lume-ivory mt-0.5">
                  The LUMÉ Sanctuary
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Floating Location Panel (Partially overlapping image on desktop, stacked on mobile) */}
          <ScrollReveal
            className="lg:col-span-4 lg:-ml-16 xl:-ml-24 relative z-10"
            duration={0.8}
            delay={0.25}
          >
            <div className="bg-lume-surface/95 backdrop-blur-md p-6 sm:p-8 lg:p-9 rounded-lg sm:rounded-xl border border-lume-ink/10 shadow-xl space-y-6">
              {/* Atelier Header */}
              <div className="space-y-1.5 border-b border-lume-ink/10 pb-4">
                <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
                  Studio Atelier
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-lume-ink">
                  LUMÉ Atelier
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-sans text-lume-taupe pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-lume-gold shrink-0" />
                  <span>{siteConfig.location}</span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-lume-taupe font-sans font-semibold">
                  <Clock className="w-3.5 h-3.5 text-lume-gold shrink-0" />
                  <span>Atelier Hours</span>
                </div>

                <ul className="space-y-1.5 text-xs font-sans text-lume-ink/80">
                  {siteConfig.hours.map((h, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between py-1 border-b border-lume-ink/5"
                    >
                      <span className="font-medium text-lume-ink">{h.day}</span>
                      <span
                        className={
                          h.hours === "Closed"
                            ? "text-lume-taupe/70 italic"
                            : "text-lume-ink/75"
                        }
                      >
                        {h.hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="group w-full py-3.5 px-5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium hover:bg-lume-brown transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Book Your Visit</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-lume-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  type="button"
                  onClick={handleGetDirections}
                  onMouseEnter={() => setIsMapHighlighted(true)}
                  onMouseLeave={() => setIsMapHighlighted(false)}
                  className="group w-full py-3 px-5 border border-lume-ink/20 text-lume-ink text-xs uppercase tracking-widest font-sans font-medium hover:border-lume-gold hover:text-lume-gold transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-lume-gold shrink-0" />
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* 3. Find Us & Restrained Map Section (Below the visual) */}
      <section className="space-y-6 pt-6">
        <ScrollReveal className="space-y-1.5" duration={0.7}>
          <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
            Find Us
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-lume-ink font-light">
            Milton Studio Map & Directions
          </h3>
          <p className="text-xs sm:text-sm font-sans text-lume-taupe max-w-xl">
            Centrally situated in Milton, Ontario with reserved guest parking and easy transit access.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <MapEmbed isHighlighted={isMapHighlighted} />
        </ScrollReveal>
      </section>
    </div>
  );
}
