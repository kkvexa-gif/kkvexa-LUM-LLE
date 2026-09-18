import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "split";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  if (align === "split") {
    return (
      <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-16", className)}>
        <div className="lg:col-span-7 space-y-3">
          {eyebrow && (
            <p
              className={cn(
                "text-xs uppercase tracking-widest font-sans font-medium",
                isDark ? "text-lume-gold" : "text-lume-taupe"
              )}
            >
              {eyebrow}
            </p>
          )}
          <h2
            className={cn(
              "font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tightEditorial text-balance",
              isDark ? "text-lume-ivory" : "text-lume-ink"
            )}
          >
            {title}
          </h2>
        </div>
        {subtitle && (
          <div className="lg:col-span-5">
            <p
              className={cn(
                "text-sm sm:text-base font-sans leading-relaxed text-balance",
                isDark ? "text-lume-stone/80" : "text-lume-ink/75"
              )}
            >
              {subtitle}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "space-y-4 mb-12 sm:mb-16",
        align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs uppercase tracking-widest font-sans font-medium",
            isDark ? "text-lume-gold" : "text-lume-taupe"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tightEditorial text-balance",
          isDark ? "text-lume-ivory" : "text-lume-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-sm sm:text-base font-sans leading-relaxed",
            isDark ? "text-lume-stone/80" : "text-lume-ink/75"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
