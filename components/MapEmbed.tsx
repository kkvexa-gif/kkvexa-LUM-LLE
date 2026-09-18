"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { MapPin, ExternalLink } from "lucide-react";

interface MapEmbedProps {
  locationQuery?: string;
  className?: string;
}

export function MapEmbed({
  locationQuery = "Milton, Ontario, Canada",
  className,
}: MapEmbedProps) {
  const encodedQuery = encodeURIComponent(locationQuery);
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const mapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

  return (
    <div className={`relative w-full overflow-hidden bg-lume-stone/20 border border-lume-ink/10 shadow-sm ${className || ""}`}>
      {/* Map Header / Location Bar */}
      <div className="bg-lume-surface px-4 py-3 border-b border-lume-ink/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-sans text-lume-ink">
          <MapPin className="w-3.5 h-3.5 text-lume-gold shrink-0" />
          <span className="font-medium">{siteConfig.location}</span>
          <span className="text-lume-taupe hidden sm:inline">• (Demo Studio Area)</span>
        </div>
        <a
          href={mapsExternalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-widest font-sans font-medium text-lume-ink hover:text-lume-gold transition-colors inline-flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-lume-gold"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-lume-gold" />
        </a>
      </div>

      {/* Embedded Iframe */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]">
        <iframe
          title="LUMÉ Studio Location Map"
          src={mapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(30%) contrast(90%)" }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
