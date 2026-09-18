"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { StudioLocation } from "@/components/StudioLocation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useBooking } from "@/context/BookingContext";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Clock,
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export default function ContactPage() {
  const { openBooking } = useBooking();

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28 space-y-24 sm:space-y-32 overflow-hidden">
      {/* 1. CONTACT HERO */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal className="max-w-4xl space-y-6 sm:space-y-8" duration={0.85}>
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-8 bg-lume-gold" />
            <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
              09 — Let&apos;s Talk
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-lume-ink tracking-tight leading-[1.02] text-balance">
            Let&apos;s make something beautiful.
          </h1>

          <p className="text-lg sm:text-xl font-sans text-lume-ink/75 max-w-2xl leading-relaxed text-balance">
            Tell us what you&apos;re imagining. We&apos;ll take it from there.
          </p>
        </ScrollReveal>
      </section>

      {/* 2. CONTACT FORM + EDITORIAL CONTACT DETAILS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          {/* Left Column: Underline Editorial Form */}
          <ScrollReveal className="lg:col-span-7" duration={0.8} delay={0.1}>
            <div className="space-y-8">
              <div className="space-y-2 border-b border-lume-ink/10 pb-4">
                <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
                  Inquiries & Consultations
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-lume-ink font-light">
                  Direct Inquiries
                </h2>
              </div>
              <ContactForm />
            </div>
          </ScrollReveal>

          {/* Right Column: Editorial Contact Information */}
          <ScrollReveal className="lg:col-span-5" duration={0.8} delay={0.2}>
            <div className="space-y-10 lg:pl-4">
              {/* Studio Info Block */}
              <div className="space-y-6">
                <div className="space-y-2 border-b border-lume-ink/10 pb-4">
                  <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
                    Concierge Desk
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-lume-ink font-light">
                    How to Reach Us
                  </h3>
                </div>

                <div className="space-y-6 text-sm font-sans">
                  {/* Email */}
                  <div className="group space-y-1">
                    <span className="text-[11px] uppercase tracking-widest text-lume-taupe font-medium block">
                      Email
                    </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-base sm:text-lg text-lume-ink group-hover:text-lume-gold transition-colors inline-flex items-center gap-2"
                    >
                      <span>{siteConfig.email}</span>
                      <ArrowUpRight className="w-4 h-4 text-lume-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Phone */}
                  <div className="group space-y-1">
                    <span className="text-[11px] uppercase tracking-widest text-lume-taupe font-medium block">
                      Studio Phone
                    </span>
                    <a
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="text-base sm:text-lg text-lume-ink group-hover:text-lume-gold transition-colors inline-flex items-center gap-2"
                    >
                      <span>{siteConfig.phone}</span>
                      <ArrowUpRight className="w-4 h-4 text-lume-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Instagram */}
                  <div className="group space-y-1">
                    <span className="text-[11px] uppercase tracking-widest text-lume-taupe font-medium block">
                      Social & Portfolio
                    </span>
                    <a
                      href={siteConfig.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg text-lume-ink group-hover:text-lume-gold transition-colors inline-flex items-center gap-2"
                    >
                      <span>{siteConfig.instagram}</span>
                      <ArrowUpRight className="w-4 h-4 text-lume-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Location Tag */}
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-widest text-lume-taupe font-medium block">
                      Location
                    </span>
                    <p className="text-base text-lume-ink">
                      {siteConfig.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Concierge Note */}
              <div className="p-6 bg-lume-surface border border-lume-ink/10 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Consultation Guidance</span>
                </div>
                <p className="text-xs sm:text-sm font-sans text-lume-ink/80 leading-relaxed">
                  For complex color transformations or extension fittings, we recommend scheduling an in-person 15-minute consultation prior to your main appointment.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => openBooking()}
                    className="text-xs uppercase tracking-widest font-sans font-semibold text-lume-ink hover:text-lume-gold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Reserve a Consultation</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-lume-gold" />
                  </button>
                </div>
              </div>

              {/* Demo Notice */}
              <div className="text-[11px] font-sans text-lume-taupe/80 italic">
                * Note: Contact details and studio address are demo placeholders designed for client customization.
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. EDITORIAL DIVIDER */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal duration={0.8}>
          <div className="relative flex items-center justify-center py-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-lume-ink/10" />
            </div>
            <div className="relative px-6 bg-[#F4F0E9] text-[11px] uppercase tracking-widest text-lume-taupe font-sans font-medium flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-lume-gold" />
              <span>Quiet Luxury • Dedicated Craft • Milton Studio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-lume-gold" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. THE STUDIO / LOCATION & MAP SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <StudioLocation />
      </section>

      {/* 5. FINAL EDITORIAL CTA */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal duration={0.9}>
          <div className="bg-lume-ink text-lume-ivory rounded-xl sm:rounded-2xl p-10 sm:p-16 lg:p-20 relative overflow-hidden text-center space-y-8">
            {/* Ambient gold glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-lume-ink via-lume-brown/40 to-lume-ink pointer-events-none" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-lume-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
                Your Atelier Experience
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-lume-ivory leading-tightEditorial text-balance">
                Your next look starts here.
              </h2>
              <p className="text-base sm:text-lg font-sans text-lume-stone/85 leading-relaxed text-balance">
                Ready when you are.
              </p>
            </div>

            <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openBooking()}
                className="group w-full sm:w-auto px-9 py-4 bg-lume-ivory text-lume-ink text-xs uppercase tracking-widest font-sans font-semibold inline-flex items-center justify-center gap-2.5 hover:bg-lume-gold transition-colors duration-300 shadow-xl cursor-pointer"
              >
                <span>Book Your Appointment</span>
                <ArrowUpRight className="w-4 h-4 text-lume-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 border border-lume-ivory/30 text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center justify-center hover:bg-lume-ivory/10 transition-colors duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
