"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/data/assets";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ScrollReveal";
import { useBooking } from "@/context/BookingContext";
import { ArrowUpRight, Sparkles, Feather, Compass, Leaf } from "lucide-react";

export default function AboutPage() {
  const { openBooking } = useBooking();

  return (
    <div className="pt-28 pb-24 space-y-20 sm:space-y-32">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12">
        <ScrollReveal className="max-w-3xl space-y-6" duration={0.8}>
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-8 bg-lume-gold" />
            <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
              Our Story & Philosophy
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-lume-ink tracking-tight leading-tightEditorial text-balance">
            Beauty feels different <br />
            <span className="italic text-lume-taupe">when it feels like you.</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-lume-ink/75 leading-relaxed text-balance">
            LUMÉ was founded on a simple premise: luxury should never feel rigid or intimidating. We craft lived-in cuts, luminous colour, and restorative rituals designed for how you actually live.
          </p>
        </ScrollReveal>
      </section>

      {/* Founder Story */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <ScrollReveal className="lg:col-span-5 relative aspect-[3/4] bg-lume-stone/30 overflow-hidden shadow-xl border border-lume-ink/10" duration={0.8}>
            <Image
              src={assets.about.founder}
              alt={assets.about.founderAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1 bg-lume-ink/80 text-lume-ivory text-[10px] uppercase tracking-widest font-sans">
              Elena Laurent • Founder (Demo)
            </div>
          </ScrollReveal>

          {/* Story Narrative */}
          <ScrollReveal className="lg:col-span-7 space-y-6" delay={0.15} duration={0.8}>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
                The Vision
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-lume-ink font-light leading-snug">
                From editorial runways to a mindful neighbourhood studio.
              </h2>
            </div>

            <p className="text-sm sm:text-base font-sans text-lume-ink/80 leading-relaxed">
              After fifteen years directing hair design for fashion publications and boutique salons across North America and Europe, Elena Laurent established LUMÉ as an antidote to high-volume, loud salon environments.
            </p>

            <p className="text-sm sm:text-base font-sans text-lume-ink/80 leading-relaxed">
              &ldquo;I wanted to build a place where clients never feel rushed through an assembly line. Hair is intimate — it frames how you greet the world every single day. That requires deep listening, organic geometry, and quiet focus.&rdquo;
            </p>

            <div className="pt-2 border-t border-lume-ink/10 flex items-center justify-between">
              <div>
                <p className="font-serif text-xl text-lume-ink font-medium">
                  Elena Laurent
                </p>
                <p className="text-xs font-sans text-lume-taupe uppercase tracking-wider">
                  Founder & Creative Director (Fictional Demo)
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal className="bg-white p-8 sm:p-14 border border-lume-ink/10">
          <SectionHeading
            eyebrow="What Guides Us"
            title="The LUMÉ Principles"
            subtitle="The foundational values behind every consultation, formulation, and finish."
            align="left"
            className="mb-12"
          />

          <ScrollStagger stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <ScrollStaggerItem className="space-y-4">
              <div className="w-12 h-12 bg-lume-gold/15 text-lume-gold rounded-full flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-lume-ink font-light">
                01. Intuitive Design
              </h3>
              <p className="text-xs sm:text-sm font-sans text-lume-ink/75 leading-relaxed">
                We work with your natural growth patterns, cowlicks, and daily habits rather than fighting against them.
              </p>
            </ScrollStaggerItem>

            <ScrollStaggerItem className="space-y-4">
              <div className="w-12 h-12 bg-lume-gold/15 text-lume-gold rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-lume-ink font-light">
                02. Clean Formulations
              </h3>
              <p className="text-xs sm:text-sm font-sans text-lume-ink/75 leading-relaxed">
                We select low-ammonia, peptide-fortified colorants and biodynamic botanical washes for lasting follicle wellness.
              </p>
            </ScrollStaggerItem>

            <ScrollStaggerItem className="space-y-4">
              <div className="w-12 h-12 bg-lume-gold/15 text-lume-gold rounded-full flex items-center justify-center">
                <Feather className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-lume-ink font-light">
                03. Acoustic Serenity
              </h3>
              <p className="text-xs sm:text-sm font-sans text-lume-ink/75 leading-relaxed">
                No loud music or chaotic overlapping stations. Our studio is acoustically tuned for unhurried calm and restorative ease.
              </p>
            </ScrollStaggerItem>
          </ScrollStagger>
        </ScrollReveal>
      </section>

      {/* Atelier Visuals */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-[16/10] bg-lume-stone/20 overflow-hidden border border-lume-ink/10">
            <Image
              src={assets.about.atelier}
              alt={assets.about.atelierAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[16/10] bg-lume-stone/20 overflow-hidden border border-lume-ink/10">
            <Image
              src={assets.about.ritual}
              alt={assets.about.ritualAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Closing CTA */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <ScrollReveal className="bg-lume-ink text-lume-ivory p-10 sm:p-16 space-y-6">
          <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
            Join Us in the Chair
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-lume-ivory">
            Let&apos;s create something timeless.
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
