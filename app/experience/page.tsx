"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { experienceSteps } from "@/data/experience";
import { useBooking } from "@/context/BookingContext";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";

export default function ExperiencePage() {
  const { openBooking } = useBooking();

  return (
    <div className="pt-28 pb-24 space-y-20 sm:space-y-32">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12">
        <ScrollReveal className="max-w-3xl space-y-6" duration={0.8}>
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-8 bg-lume-gold" />
            <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
              The LUMÉ Journey
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-lume-ink tracking-tight leading-tightEditorial text-balance">
            A salon visit that feels <br />
            <span className="italic text-lume-taupe">like a deep breath.</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-lume-ink/75 leading-relaxed text-balance">
            We designed every touchpoint — from acoustic calm and sensory teas to unhurried consultations — to replace salon rush with mindful restoration.
          </p>
        </ScrollReveal>
      </section>

      {/* 5-Step Storytelling Chapters */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24 sm:space-y-32">
        {experienceSteps.map((step, index) => {
          const isEven = index % 2 === 1;

          return (
            <ScrollReveal
              key={step.number}
              duration={0.85}
              yOffset={35}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                isEven ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Text Narrative Column */}
              <div
                className={`space-y-6 ${
                  isEven ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-6"
                }`}
              >
                <div className="space-y-2">
                  <span className="font-serif text-2xl sm:text-3xl text-lume-gold font-light tracking-wide">
                    {step.number}
                  </span>
                  <h2 className="text-xs uppercase tracking-widest text-lume-taupe font-sans font-semibold">
                    {step.title}
                  </h2>
                  <h3 className="font-serif text-3xl sm:text-4xl text-lume-ink font-light leading-snug">
                    {step.headline}
                  </h3>
                </div>

                <p className="text-sm sm:text-base font-sans text-lume-ink/80 leading-relaxed">
                  {step.description}
                </p>

                {/* Key Ritual Details */}
                <div className="space-y-2 pt-2 border-t border-lume-ink/10">
                  <p className="text-xs uppercase tracking-widest text-lume-taupe font-sans font-medium">
                    Ritual Highlights:
                  </p>
                  <ul className="space-y-1.5 text-xs font-sans text-lume-ink/80">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-lume-gold shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                {step.quote && (
                  <div className="p-4 bg-lume-surface border-l-2 border-lume-gold text-xs font-serif italic text-lume-ink/90">
                    &ldquo;{step.quote}&rdquo;
                  </div>
                )}
              </div>

              {/* Editorial Photography Column */}
              <div
                className={`relative aspect-[4/5] sm:aspect-[3/4] bg-lume-stone/30 overflow-hidden shadow-xl border border-lume-ink/10 ${
                  isEven ? "lg:col-span-6 lg:col-start-1" : "lg:col-span-6"
                }`}
              >
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-lume-ink/80 text-lume-ivory text-[10px] uppercase tracking-widest font-sans">
                  Chapter {step.number}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </section>

      {/* Bottom CTA Block */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <ScrollReveal className="bg-lume-ink text-lume-ivory p-12 sm:p-20 space-y-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
              Experience LUMÉ
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-lume-ivory">
              Your chair is waiting.
            </h2>
            <p className="text-sm sm:text-base font-sans text-lume-stone/80 leading-relaxed">
              Experience the difference of a salon visit tailored entirely to your personal aesthetic and wellbeing.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openBooking()}
                className="w-full sm:w-auto px-8 py-4 bg-lume-ivory text-lume-ink text-xs uppercase tracking-widest font-sans font-semibold inline-flex items-center justify-center gap-2 hover:bg-lume-gold transition-colors"
              >
                <span>Book Your Session</span>
                <ArrowUpRight className="w-4 h-4 text-lume-ink" />
              </button>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 border border-lume-ivory/30 text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center justify-center hover:bg-lume-ivory/10 transition-colors"
              >
                View Services & Pricing
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
