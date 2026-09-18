"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Phone, Mail, MapPin, Clock, Calendar } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 space-y-16 sm:space-y-24">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12">
        <ScrollReveal className="max-w-3xl space-y-6" duration={0.8}>
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-8 bg-lume-gold" />
            <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
              Concierge & Contact
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-lume-ink tracking-tight leading-tightEditorial text-balance">
            Let&apos;s talk hair. <br />
            <span className="italic text-lume-taupe">We&apos;re here to assist you.</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-lume-ink/75 leading-relaxed text-balance">
            Whether you are booking your first consultation, inquiring about customized extension color matching, or seeking hair care guidance, reach out below.
          </p>
        </ScrollReveal>
      </section>

      {/* Two-Column Section: Studio Details + Form */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact & Studio Hours */}
          <ScrollReveal className="lg:col-span-5 space-y-8" delay={0.1}>
            <div className="bg-lume-surface p-8 border border-lume-ink/10 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
                  Studio Atelier
                </span>
                <h2 className="font-serif text-3xl text-lume-ink font-light mt-1">
                  LUMÉ Salon
                </h2>
                <p className="text-xs text-lume-taupe font-sans mt-0.5">
                  Hair • Beauty • Experience
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-lume-ink/10 text-sm font-sans text-lume-ink/85">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-lume-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-lume-ink">{siteConfig.location}</p>
                    <p className="text-xs text-lume-taupe">{siteConfig.locationDetails}</p>
                  </div>
                </div>

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

                <div className="flex items-center gap-3">
                  <InstagramIcon className="w-4 h-4 text-lume-gold shrink-0" />
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-lume-gold transition-colors"
                  >
                    {siteConfig.instagram}
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-3 pt-4 border-t border-lume-ink/10">
                <p className="text-xs uppercase tracking-widest text-lume-taupe font-sans font-semibold">
                  Operating Hours
                </p>
                <ul className="space-y-2 text-xs font-sans text-lume-ink/80">
                  {siteConfig.hours.map((h, idx) => (
                    <li key={idx} className="flex justify-between py-1 border-b border-lume-ink/5">
                      <span className="font-medium">{h.day}</span>
                      <span className="text-lume-taupe">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Demo Disclaimer */}
              <div className="pt-2 text-[11px] font-sans text-lume-taupe italic">
                * Note: Contact details and studio address are demo placeholders.
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Form */}
          <ScrollReveal className="lg:col-span-7" delay={0.2}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>

      {/* Map Embed Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
        <ScrollReveal>
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
              Location Map
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-lume-ink font-light">
              Find Us in Milton, Ontario
            </h3>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <MapEmbed />
        </ScrollReveal>
      </section>
    </div>
  );
}
