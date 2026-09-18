"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { useBooking } from "@/context/BookingContext";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer className="bg-lume-ink text-lume-ivory pt-20 pb-12 border-t border-lume-brown/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-lume-ivory/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-lume-gold/40 shadow-sm shrink-0 bg-black">
                <Image
                  src="/assets/lume-gold-logo.jpg"
                  alt="LUMÉ Gold Emblem"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl tracking-[0.25em] uppercase font-light text-lume-gold block leading-none">
                  LUMÉ
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-lume-gold/80 font-sans font-medium">
                  Salon Canada
                </span>
              </div>
            </div>
            <p className="text-xs uppercase tracking-widest text-lume-gold font-sans font-medium">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-lume-stone/80 font-sans leading-relaxed max-w-sm">
              A considered approach to colour, cut and care. Designed around your personal ritual and natural beauty.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openBooking()}
                className="group inline-flex items-center gap-2.5 px-6 py-3 bg-lume-ivory text-lume-ink text-xs uppercase tracking-widest font-sans font-medium hover:bg-lume-gold hover:text-lume-ink transition-colors duration-300"
              >
                <span>Book Appointment</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-widest text-lume-taupe font-sans font-semibold">
              Explore
            </p>
            <ul className="space-y-3 font-sans text-sm text-lume-stone/80">
              <li>
                <Link href="/services" className="hover:text-lume-gold transition-colors">
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-lume-gold transition-colors">
                  The Experience
                </Link>
              </li>
              <li>
                <Link href="/stylists" className="hover:text-lume-gold transition-colors">
                  Stylist Directory
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-lume-gold transition-colors">
                  Portfolio Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-lume-gold transition-colors">
                  About & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-lume-gold transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-widest text-lume-taupe font-sans font-semibold">
              Hours
            </p>
            <ul className="space-y-2.5 font-sans text-xs text-lume-stone/80">
              {siteConfig.hours.map((h, i) => (
                <li key={i} className="flex flex-col">
                  <span className="text-lume-ivory/90 font-medium">{h.day}</span>
                  <span className="text-lume-stone/60">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Contact */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-widest text-lume-taupe font-sans font-semibold">
              Studio
            </p>
            <div className="space-y-3 font-sans text-sm text-lume-stone/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-lume-gold shrink-0 mt-0.5" />
                <span>{siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-lume-gold shrink-0" />
                <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-lume-gold transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-lume-gold shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-lume-gold transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-2">
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
          </div>
        </div>

        {/* Bottom Disclaimer and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-lume-taupe/70">
          <p>© {new Date().getFullYear()} LUMÉ Salon. Portfolio & Demo Experience.</p>
          <p className="text-center sm:text-right text-[11px] max-w-lg">
            {siteConfig.demoNotice}
          </p>
        </div>
      </div>
    </footer>
  );
}
