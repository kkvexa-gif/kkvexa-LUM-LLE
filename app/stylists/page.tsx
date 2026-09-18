"use client";

import React, { useState } from "react";
import { stylistsData } from "@/data/stylists";
import { StylistCard } from "@/components/StylistCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ScrollReveal";
import { useBooking } from "@/context/BookingContext";
import { Sparkles, ArrowUpRight, Award, Scissors, Users } from "lucide-react";

export default function StylistsPage() {
  const [filterRole, setFilterRole] = useState<string>("all");
  const { openBooking } = useBooking();

  const filteredStylists = filterRole === "all"
    ? stylistsData
    : stylistsData.filter((s) => {
        if (filterRole === "colour") return s.role.includes("Colour");
        if (filterRole === "cut") return s.role.includes("Director") || s.role.includes("Stylist");
        if (filterRole === "extensions") return s.role.includes("Extension");
        return true;
      });

  return (
    <div className="pt-28 pb-24 space-y-16 sm:space-y-24">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12">
        <ScrollReveal className="max-w-3xl space-y-6" duration={0.8}>
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-8 bg-lume-gold" />
            <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
              The Collective
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-lume-ink tracking-tight leading-tightEditorial text-balance">
            Meet the artists. <br />
            <span className="italic text-lume-taupe">Mastery in every chair.</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-lume-ink/75 leading-relaxed text-balance">
            Our team of specialists is dedicated to personalized hair design, healthy follicle wellness, and lived-in elegance. Select an artist below to review full portfolios and book directly.
          </p>
        </ScrollReveal>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-lume-ink/10 pb-6 mb-12">
            <button
              onClick={() => setFilterRole("all")}
              className={`px-5 py-2 text-xs font-sans uppercase tracking-widest transition-all duration-300 ${
                filterRole === "all"
                  ? "bg-lume-ink text-lume-ivory font-medium shadow-sm"
                  : "bg-transparent text-lume-ink/70 hover:text-lume-ink hover:bg-lume-stone/20"
              }`}
            >
              All Artists
            </button>
            <button
              onClick={() => setFilterRole("cut")}
              className={`px-5 py-2 text-xs font-sans uppercase tracking-widest transition-all duration-300 ${
                filterRole === "cut"
                  ? "bg-lume-ink text-lume-ivory font-medium shadow-sm"
                  : "bg-transparent text-lume-ink/70 hover:text-lume-ink hover:bg-lume-stone/20"
              }`}
            >
              Cuts & Texture
            </button>
            <button
              onClick={() => setFilterRole("colour")}
              className={`px-5 py-2 text-xs font-sans uppercase tracking-widest transition-all duration-300 ${
                filterRole === "colour"
                  ? "bg-lume-ink text-lume-ivory font-medium shadow-sm"
                  : "bg-transparent text-lume-ink/70 hover:text-lume-ink hover:bg-lume-stone/20"
              }`}
            >
              Colour & Balayage
            </button>
            <button
              onClick={() => setFilterRole("extensions")}
              className={`px-5 py-2 text-xs font-sans uppercase tracking-widest transition-all duration-300 ${
                filterRole === "extensions"
                  ? "bg-lume-ink text-lume-ivory font-medium shadow-sm"
                  : "bg-transparent text-lume-ink/70 hover:text-lume-ink hover:bg-lume-stone/20"
              }`}
            >
              Extensions & Volume
            </button>
          </div>
        </ScrollReveal>

        {/* Stylists Grid */}
        <ScrollStagger stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredStylists.map((stylist) => (
            <ScrollStaggerItem key={stylist.id}>
              <StylistCard stylist={stylist} />
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>

        {/* Demo Disclaimer */}
        <div className="mt-12 p-4 bg-lume-surface border border-lume-ink/10 text-xs font-sans text-lume-taupe text-center">
          * Demo Notice: Stylist profiles, bios, and imagery are placeholders for presentation purposes.
        </div>
      </section>

      {/* Booking Prompt */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <ScrollReveal className="bg-lume-ink text-lume-ivory p-10 sm:p-16 space-y-6">
          <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
            Unsure which artist to choose?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-lume-ivory max-w-xl mx-auto">
            Book a complimentary 15-minute diagnostic consultation.
          </h2>
          <div className="pt-2">
            <button
              onClick={() => openBooking({ stylistId: "any" })}
              className="px-8 py-4 bg-lume-ivory text-lume-ink text-xs uppercase tracking-widest font-sans font-semibold inline-flex items-center gap-2 hover:bg-lume-gold transition-colors"
            >
              <span>Schedule Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-lume-ink" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
