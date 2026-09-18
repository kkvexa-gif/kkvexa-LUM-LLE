"use client";

import React, { useState } from "react";
import { servicesData, serviceCategories } from "@/data/services";
import { ServiceAccordion } from "@/components/ServiceAccordion";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ScrollReveal";
import { useBooking } from "@/context/BookingContext";
import { Sparkles, ArrowUpRight, HelpCircle, ShieldCheck, HeartHandshake } from "lucide-react";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { openBooking } = useBooking();

  const filteredServices = activeCategory === "all"
    ? servicesData
    : servicesData.filter((s) => s.categorySlug === activeCategory);

  return (
    <div className="pt-28 pb-24 space-y-16 sm:space-y-24">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12">
        <ScrollReveal className="max-w-3xl space-y-6" duration={0.8}>
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-8 bg-lume-gold" />
            <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
              The Service Atelier
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-lume-ink tracking-tight leading-tightEditorial text-balance">
            Made for your hair. <br />
            <span className="italic text-lume-taupe">Designed around you.</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-lume-ink/75 leading-relaxed text-balance">
            Every session at LUMÉ begins with a seated diagnostic consultation, customized botanical formulations, and dedicated time. Explore our complete offering below.
          </p>
        </ScrollReveal>
      </section>

      {/* Main Filter & Accordion Menu */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Category Filters */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-lume-ink/10 pb-6 mb-8">
            {serviceCategories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
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
        </ScrollReveal>

        {/* Services Accordion List */}
        <ScrollReveal delay={0.1}>
          <ServiceAccordion services={filteredServices} />
        </ScrollReveal>

        {/* Pricing Notice */}
        <ScrollReveal delay={0.2} className="mt-8 p-4 bg-lume-surface border border-lume-ink/10 text-xs font-sans text-lume-taupe flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-lume-gold shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold text-lume-ink">Sample Pricing Note:</strong> All pricing displayed is for demonstration and baseline reference. Accurate quotes are provided during your initial consultation based on hair density, length, and personalized goals.
          </p>
        </ScrollReveal>
      </section>

      {/* Guarantees / Service Standards */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal className="bg-white p-8 sm:p-12 border border-lume-ink/10">
          <SectionHeading
            eyebrow="Our Commitment"
            title="The LUMÉ Service Standards"
            subtitle="What every client receives during every visit to our chairs."
            align="left"
            className="mb-8 sm:mb-12"
          />

          <ScrollStagger stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollStaggerItem className="space-y-3">
              <div className="w-10 h-10 bg-lume-gold/15 text-lume-gold rounded-full flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-lume-ink">
                Dedicated 1-on-1 Time
              </h3>
              <p className="text-xs sm:text-sm font-sans text-lume-ink/70 leading-relaxed">
                We never double-book or rush appointments. Your allocated time belongs entirely to you and your artist.
              </p>
            </ScrollStaggerItem>

            <ScrollStaggerItem className="space-y-3">
              <div className="w-10 h-10 bg-lume-gold/15 text-lume-gold rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-lume-ink">
                Botanical & Bond Care
              </h3>
              <p className="text-xs sm:text-sm font-sans text-lume-ink/70 leading-relaxed">
                Every colour formula is infused with bond-protecting peptides to maintain healthy cuticle elasticity and shine.
              </p>
            </ScrollStaggerItem>

            <ScrollStaggerItem className="space-y-3">
              <div className="w-10 h-10 bg-lume-gold/15 text-lume-gold rounded-full flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-lume-ink">
                True Daylight Accuracy
              </h3>
              <p className="text-xs sm:text-sm font-sans text-lume-ink/70 leading-relaxed">
                We review all colour under daylight-calibrated lighting to ensure seamless tone in every environment.
              </p>
            </ScrollStaggerItem>
          </ScrollStagger>
        </ScrollReveal>
      </section>

      {/* CTA Strip */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <ScrollReveal className="bg-lume-ink text-lume-ivory p-10 sm:p-16 space-y-6">
          <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
            Ready to Begin?
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-lume-ivory">
            Let&apos;s design your customized appointment.
          </h2>
          <div className="pt-2">
            <button
              onClick={() => openBooking()}
              className="px-8 py-4 bg-lume-ivory text-lume-ink text-xs uppercase tracking-widest font-sans font-semibold inline-flex items-center gap-2 hover:bg-lume-gold transition-colors"
            >
              <span>Book an Appointment</span>
              <ArrowUpRight className="w-4 h-4 text-lume-ink" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
