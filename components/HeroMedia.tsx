"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { useBooking } from "@/context/BookingContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDown, Sparkles } from "lucide-react";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=85",
    alt: "LUMÉ Salon model with radiant dimensional hair",
    word: "Your signature.",
    tag: "Bespoke Precision",
  },
  {
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=2000&q=85",
    alt: "LUMÉ Studio Atelier styling floor",
    word: "Your sanctuary.",
    tag: "Acoustic Stillness",
  },
  {
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=2000&q=85",
    alt: "Sunlit dimensional balayage creation",
    word: "Your ritual.",
    tag: "Tailored Formulations",
  },
  {
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=2000&q=85",
    alt: "Quiet wash basin room and scalp massage",
    word: "Your confidence.",
    tag: "Mindful Care",
  },
];

export function HeroMedia() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openBooking } = useBooking();

  // Slow natural slide transition every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5200);

    return () => clearInterval(timer);
  }, []);

  const scrollToContent = () => {
    const nextSection = document.getElementById("intro-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeSlide = heroSlides[currentSlide];

  return (
    <section id="homepage-hero" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0e0d0b] text-lume-ivory select-none">
      {/* Background Slides with Ken Burns Zoom & Smooth Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div
                className={`relative w-full h-full transition-transform duration-[6000ms] ease-out ${
                  isActive ? "scale-110 translate-y-[-1%]" : "scale-100 translate-y-0"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          );
        })}

        {/* Deep Black Luxury Gradients and Vignette Overlays */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#0c0b0a]/95 via-[#0c0b0a]/80 to-[#0c0b0a]/60" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0c0b0a] via-transparent to-[#0c0b0a]/70" />
        {/* Subtle Warm Gold Radial Glow in Center */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lume-gold/10 rounded-full blur-3xl pointer-events-none z-20" />
      </div>

      {/* Top spacing buffer for fixed navbar */}
      <div className="h-24 sm:h-28" />

      {/* Main Editorial Hero Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-10 sm:py-16 my-auto">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          {/* Eyebrow Badge with Gold Logo Accent */}
          <div className="inline-flex items-center gap-3 bg-black/70 backdrop-blur-md px-4 py-2 border border-lume-gold/40 rounded-full shadow-lg">
            <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-lume-gold bg-black">
              <Image
                src="/assets/lume-gold-logo.jpg"
                alt="LUMÉ"
                fill
                sizes="20px"
                className="object-cover"
              />
            </div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-lume-gold font-sans font-semibold">
              Hair • Beauty • Experience
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-lume-gold animate-pulse hidden sm:inline" />
            <span className="text-[10px] uppercase tracking-widest text-lume-stone/70 font-sans hidden sm:inline">
              {activeSlide.tag}
            </span>
          </div>

          {/* Large Editorial Headline with Animated Signature Line */}
          <div className="space-y-1">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-light tracking-tight leading-[1.05] text-lume-ivory drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Your hair.
            </h1>

            {/* Dynamic Animated Word Transition */}
            <div className="h-20 sm:h-28 md:h-32 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeSlide.word}
                  initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(4px)" }}
                  transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                  className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] italic font-normal text-lume-gold drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] block"
                >
                  {activeSlide.word}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl font-sans text-lume-stone max-w-xl leading-relaxed text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {siteConfig.heroSubtitle}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => openBooking()}
              className="group px-8 py-4 bg-lume-gold text-lume-ink text-xs uppercase tracking-widest font-sans font-semibold inline-flex items-center justify-center gap-2.5 hover:bg-lume-ivory transition-all duration-300 shadow-2xl hover:scale-[1.02]"
            >
              <span>Book Your Appointment</span>
              <ArrowUpRight className="w-4 h-4 text-lume-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <Link
              href="/experience"
              className="px-8 py-4 bg-black/60 backdrop-blur-md border border-lume-ivory/30 text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center justify-center hover:bg-lume-ivory hover:text-lume-ink hover:border-lume-ivory transition-all text-center shadow-lg"
            >
              Explore the Experience
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar with Slide Indicators & Scroll Indicator */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pb-8 flex items-end justify-between text-xs font-sans text-lume-stone/80">
        {/* Slide Counter Dots */}
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-2 border border-white/10 rounded-full">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? "w-6 bg-lume-gold"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
          <span className="text-[10px] text-lume-gold font-sans font-medium ml-1">
            0{currentSlide + 1} / 0{heroSlides.length}
          </span>
        </div>

        {/* Pulsing Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className="flex items-center gap-2.5 bg-black/70 backdrop-blur-md px-4 py-2 border border-white/15 text-lume-ivory hover:text-lume-gold transition-colors focus-visible:ring-1 focus-visible:ring-lume-gold rounded-full shadow-lg"
          aria-label="Scroll down to discover LUMÉ"
        >
          <span className="text-[11px] uppercase tracking-widest font-medium">Discover LUMÉ</span>
          <div className="w-5 h-5 rounded-full border border-lume-gold/40 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3 h-3 text-lume-gold" />
          </div>
        </button>

        {/* Location & Schedule Badge */}
        <div className="hidden sm:block text-right bg-black/50 backdrop-blur-md px-3.5 py-2 border border-white/10 rounded-sm">
          <p className="tracking-wider uppercase text-[11px] text-lume-gold font-medium">Milton, Ontario</p>
          <p className="text-[10px] text-lume-stone/70">Bespoke Hair Sessions</p>
        </div>
      </div>
    </section>
  );
}
