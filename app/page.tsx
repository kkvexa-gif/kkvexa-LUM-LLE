"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { assets } from "@/data/assets";
import { stylistsData } from "@/data/stylists";
import { testimonialsData } from "@/data/testimonials";
import { useBooking } from "@/context/BookingContext";
import { HeroMedia } from "@/components/HeroMedia";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceList } from "@/components/ServiceList";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { StylistCard } from "@/components/StylistCard";
import { TheSpaceGallery } from "@/components/TheSpaceGallery";
import { MapEmbed } from "@/components/MapEmbed";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ScrollReveal";
import { ArrowUpRight, ArrowRight, Sparkles, Clock, MapPin, Phone, Mail } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export default function HomePage() {
  const { openBooking } = useBooking();

  return (
    <div className="space-y-0">
      {/* 01. HERO */}
      <HeroMedia />

      {/* 02. EXPERIENCE INTRO */}
      <section
        id="intro-section"
        className="py-24 sm:py-32 bg-lume-surface border-b border-lume-ink/10"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Statement */}
            <ScrollReveal className="lg:col-span-6 space-y-6 sm:space-y-8" duration={0.8} yOffset={30}>
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
                  01 — The LUMÉ Philosophy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-lume-ink leading-tightEditorial text-balance">
                  Great hair starts with a great conversation.
                </h2>
              </div>

              <p className="text-base sm:text-lg font-sans text-lume-ink/75 leading-relaxed">
                We take the time to understand your style, your routine and what you want to feel when you leave the chair. No hurried consultations or cookie-cutter formulas — every cut and shade is intentionally designed around your individual rhythm.
              </p>

              <div className="pt-2 flex items-center gap-6">
                <Link
                  href="/experience"
                  className="group text-xs uppercase tracking-widest font-sans font-semibold text-lume-ink hover:text-lume-gold inline-flex items-center gap-2 transition-colors"
                >
                  <span>Discover LUMÉ Experience</span>
                  <ArrowRight className="w-4 h-4 text-lume-gold transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <span className="text-lume-stone">/</span>
                <Link
                  href="/about"
                  className="text-xs uppercase tracking-widest font-sans font-medium text-lume-taupe hover:text-lume-ink transition-colors"
                >
                  Our Story
                </Link>
              </div>
            </ScrollReveal>

            {/* Right Editorial Image Composition */}
            <ScrollReveal className="lg:col-span-6 relative" duration={0.9} delay={0.2} yOffset={30}>
              <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-lume-stone/30 overflow-hidden shadow-2xl border border-lume-ink/10">
                <Image
                  src={assets.intro.image}
                  alt={assets.intro.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lume-ink/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden sm:block p-4 bg-lume-ivory border border-lume-ink/10 shadow-lg max-w-xs">
                <p className="text-xs font-serif italic text-lume-ink">
                  &ldquo;A quiet sanctuary devoted to considered hair craft.&rdquo;
                </p>
                <p className="text-[10px] font-sans uppercase tracking-widest text-lume-gold mt-1">
                  Atelier Standards
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 03. SIGNATURE SERVICES */}
      <section className="py-24 sm:py-32 bg-lume-ivory border-b border-lume-ink/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <SectionHeading
              eyebrow="02 — Signature Services"
              title="Tailored Hair Rituals"
              subtitle="Explore our curated services crafted with high-performance botanicals and tailored placement."
              align="split"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <ServiceList />
          </ScrollReveal>
        </div>
      </section>

      {/* 04. TRANSFORMATION */}
      <section className="py-24 sm:py-32 bg-lume-surface border-b border-lume-ink/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <ScrollReveal>
            <SectionHeading
              eyebrow="03 — Before & After"
              title="Dimensional Transformations"
              subtitle="Slide to reveal how personalized placement and tonality bring natural depth to life."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <BeforeAfterSlider />
          </ScrollReveal>
        </div>
      </section>

      {/* 05. ARTISTS */}
      <section className="py-24 sm:py-32 bg-lume-ivory border-b border-lume-ink/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <ScrollReveal>
            <SectionHeading
              eyebrow="04 — The Artists"
              title="Meet the Specialists"
              subtitle="Each artist at LUMÉ brings dedicated mastery in architectural cutting, dimensional colour, or undetectable extension integration."
              align="split"
            />
          </ScrollReveal>

          <ScrollStagger stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stylistsData.map((stylist) => (
              <ScrollStaggerItem key={stylist.id}>
                <StylistCard stylist={stylist} />
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>

          <ScrollReveal delay={0.2} className="text-center pt-4">
            <Link
              href="/stylists"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-semibold text-lume-ink hover:text-lume-gold transition-colors"
            >
              <span>View Full Stylist Profiles & Bios</span>
              <ArrowRight className="w-4 h-4 text-lume-gold" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 06. THE SPACE */}
      <section className="py-24 sm:py-32 bg-lume-ink text-lume-ivory border-b border-lume-brown/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <ScrollReveal>
            <SectionHeading
              eyebrow="05 — The Atmosphere"
              title="The Salon Sanctuary"
              subtitle="Natural limestone, tactile linen, acoustic stillness, and calibrated daylight designed for peaceful transformation."
              theme="dark"
              align="split"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <TheSpaceGallery />
          </ScrollReveal>
        </div>
      </section>

      {/* 07. TESTIMONIALS */}
      <section className="py-24 sm:py-32 bg-lume-surface border-b border-lume-ink/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          <ScrollReveal>
            <SectionHeading
              eyebrow="06 — Client Reflections"
              title="In Their Own Words"
              subtitle="Fictional demo reflections demonstrating client journey reviews."
              align="center"
            />
          </ScrollReveal>

          <ScrollStagger stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {testimonialsData.map((item) => (
              <ScrollStaggerItem key={item.id}>
                <div className="bg-white p-8 border border-lume-ink/10 flex flex-col justify-between space-y-6 shadow-sm hover:border-lume-taupe transition-colors h-full">
                  <div className="space-y-4">
                    <div className="w-6 h-6 text-lume-gold">
                      <span className="font-serif text-4xl leading-none">&ldquo;</span>
                    </div>
                    <p className="font-serif text-lg sm:text-xl font-light text-lume-ink leading-relaxed">
                      {item.quote}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-lume-ink/5 space-y-1">
                    <p className="font-sans font-medium text-sm text-lume-ink">
                      {item.author}
                    </p>
                    <p className="text-xs font-sans text-lume-gold">
                      {item.service}
                    </p>
                    <p className="text-[11px] font-sans text-lume-taupe">
                      {item.context}
                    </p>
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* 08. SOCIAL GALLERY */}
      <section className="py-24 sm:py-32 bg-lume-ivory border-b border-lume-ink/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
                07 — Portfolio Stream
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-lume-ink mt-1">
                Recent Work & Textures
              </h2>
            </div>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-semibold text-lume-ink hover:text-lume-gold transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-lume-gold" />
              <span>Follow {siteConfig.instagram}</span>
            </a>
          </ScrollReveal>

          <ScrollStagger stagger={0.08} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {assets.social.map((soc) => (
              <ScrollStaggerItem key={soc.id}>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden bg-lume-stone/20 border border-lume-ink/10 block"
                >
                  <Image
                    src={soc.image}
                    alt={soc.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-lume-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <InstagramIcon className="w-5 h-5 text-lume-ivory" />
                  </div>
                </a>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>

          <ScrollReveal delay={0.2} className="text-center pt-2">
            <Link
              href="/gallery"
              className="text-xs uppercase tracking-widest font-sans font-medium text-lume-taupe hover:text-lume-ink transition-colors inline-flex items-center gap-1.5"
            >
              <span>View Filterable High-Resolution Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 text-lume-gold" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 09. LOCATION & HOURS */}
      <section className="py-24 sm:py-32 bg-lume-surface border-b border-lume-ink/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <SectionHeading
              eyebrow="08 — Atelier Location"
              title="Visit the Studio"
              subtitle="Centrally located in Milton, Ontario. Reserved parking and tranquil setting."
              align="split"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-4">
            {/* Contact & Hours Details */}
            <ScrollReveal className="lg:col-span-5 space-y-8 bg-white p-8 border border-lume-ink/10" delay={0.1}>
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
                  Studio Info
                </span>
                <h3 className="font-serif text-2xl text-lume-ink font-light">
                  LUMÉ Atelier
                </h3>
                <p className="text-sm font-sans text-lume-ink/80 leading-relaxed">
                  {siteConfig.locationDetails}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-lume-ink/10 text-sm font-sans">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-lume-gold shrink-0" />
                  <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-lume-gold transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-lume-gold shrink-0" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-lume-gold transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-lume-ink/10">
                <p className="text-xs uppercase tracking-widest text-lume-taupe font-sans font-semibold">
                  Operating Hours
                </p>
                <ul className="space-y-2 text-xs font-sans text-lume-ink/80">
                  {siteConfig.hours.map((h, idx) => (
                    <li key={idx} className="flex justify-between py-0.5 border-b border-lume-ink/5">
                      <span className="font-medium">{h.day}</span>
                      <span className="text-lume-taupe">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openBooking()}
                  className="w-full py-3 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium hover:bg-lume-brown transition-colors"
                >
                  Book Your Visit
                </button>
              </div>
            </ScrollReveal>

            {/* Map Embed */}
            <ScrollReveal className="lg:col-span-7" delay={0.2}>
              <MapEmbed />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-28 sm:py-36 bg-lume-ink text-lume-ivory relative overflow-hidden">
        {/* Background glow / ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-lume-ink via-lume-brown/40 to-lume-ink pointer-events-none" />

        <ScrollReveal className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-8" duration={0.8}>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reservations Open</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-lume-ivory leading-tightEditorial text-balance">
            Ready for your next look?
          </h2>

          <p className="text-base sm:text-lg font-sans text-lume-stone/85 max-w-xl mx-auto leading-relaxed text-balance">
            Come in with an idea. Leave with something that feels like you.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openBooking()}
              className="w-full sm:w-auto px-10 py-4 bg-lume-ivory text-lume-ink text-xs uppercase tracking-widest font-sans font-semibold inline-flex items-center justify-center gap-2.5 hover:bg-lume-gold transition-colors shadow-xl"
            >
              <span>Book Your Appointment</span>
              <ArrowUpRight className="w-4 h-4 text-lume-ink" />
            </button>
            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-4 border border-lume-ivory/30 text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center justify-center hover:bg-lume-ivory/10 transition-colors"
            >
              Browse Services
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
