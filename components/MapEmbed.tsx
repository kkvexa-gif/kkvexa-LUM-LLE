"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { ArrowUpRight, MapPin } from "lucide-react";

interface MapEmbedProps {
  locationQuery?: string;
  className?: string;
  isHighlighted?: boolean;
}

export function MapEmbed({
  locationQuery = "Milton, Ontario, Canada",
  className,
  isHighlighted = false,
}: MapEmbedProps) {
  const encodedQuery = encodeURIComponent(locationQuery);
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const mapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

  return (
    <div
      id="studio-map"
      className={`relative w-full overflow-hidden transition-all duration-500 rounded-lg sm:rounded-xl border ${
        isHighlighted
          ? "border-lume-gold ring-2 ring-lume-gold/30 shadow-lg"
          : "border-lume-ink/10 shadow-sm"
      } bg-lume-stone/10 ${className || ""}`}
    >
      {/* Editorial Top Bar */}
      <div className="bg-lume-surface/90 backdrop-blur-sm px-5 py-3.5 border-b border-lume-ink/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-sans text-lume-ink">
          <MapPin className="w-3.5 h-3.5 text-lume-gold shrink-0" />
          <span className="font-medium tracking-wide">{siteConfig.location}</span>
          <span className="text-lume-taupe hidden sm:inline">• Atelier Studio District</span>
        </div>
        <a
          href={mapsExternalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group text-xs uppercase tracking-widest font-sans font-medium text-lume-ink hover:text-lume-gold transition-colors inline-flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-lume-gold"
        >
          <span>Open in Google Maps</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-lume-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Embedded Restrained Iframe */}
      <div className="relative w-full h-[260px] sm:h-[340px] md:h-[380px]">
        <iframe
          title="LUMÉ Studio Location Map"
          src={mapsEmbedUrl}
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: "grayscale(35%) contrast(92%) brightness(98%)",
          }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
