"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EditorialImageProps {
  src: string;
  alt: string;
  aspectRatio?: "aspect-[4/5]" | "aspect-[3/4]" | "aspect-square" | "aspect-[16/10]" | "aspect-[16/9]";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  hoverZoom?: boolean;
  caption?: string;
}

export function EditorialImage({
  src,
  alt,
  aspectRatio = "aspect-[4/5]",
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  hoverZoom = true,
  caption,
}: EditorialImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className={cn("group overflow-hidden relative", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden bg-lume-stone/30 transition-all duration-700",
          aspectRatio
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "object-cover transition-all duration-700 ease-out",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
            hoverZoom && "group-hover:scale-[1.03]",
            imageClassName
          )}
        />
        {/* Subtle vignette/sheen overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-lume-ink/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-xs font-sans text-lume-taupe tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
