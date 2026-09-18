"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { useBooking } from "@/context/BookingContext";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowUpRight, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { num: "01", name: "Home", href: "/" },
  { num: "02", name: "Services", href: "/services" },
  { num: "03", name: "Experience", href: "/experience" },
  { num: "04", name: "Stylists", href: "/stylists" },
  { num: "05", name: "Gallery", href: "/gallery" },
  { num: "06", name: "About", href: "/about" },
  { num: "07", name: "Contact", href: "/contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openTimestampRef = useRef<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Handle focus, scroll locking, and escape key
  useEffect(() => {
    if (isOpen) {
      openTimestampRef.current = Date.now();
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Focus close button safely without scrolling
      setTimeout(() => {
        closeButtonRef.current?.focus({ preventScroll: true });
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }

        // Focus trap
        if (e.key === "Tab" && modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
              if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
              }
            } else {
              if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, onClose]);

  // Safe backdrop click handler preventing touch fall-through
  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (Date.now() - openTimestampRef.current < 250) {
      return;
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-[120] md:hidden flex items-center justify-center p-2.5 sm:p-3 pointer-events-auto"
          role="dialog"
          aria-modal="true"
          aria-label="LUMÉ Editorial Navigation"
        >
          {/* Backdrop with subtle blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 bg-[#0f0e0d]/60 backdrop-blur-[6px]"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Full-Screen Editorial Sheet */}
          <motion.div
            ref={modalRef}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.97, y: -10 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.98, y: -8 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              height: "calc(100dvh - 20px)",
              maxHeight: "none",
            }}
            className="relative w-full bg-[#FFFDF8] text-lume-ink rounded-[20px] sm:rounded-[22px] shadow-[0_20px_60px_rgba(23,22,20,0.14)] border border-[rgba(23,22,20,0.10)] flex flex-col justify-between overflow-hidden z-10"
          >
            {/* =================================================================== */}
            {/* 1. HEADER (60–70px, Logo + Close Control)                          */}
            {/* =================================================================== */}
            <header className="shrink-0 h-[64px] sm:h-[70px] px-5 sm:px-7 flex items-center justify-between border-b border-[rgba(23,22,20,0.08)] bg-[#FFFDF8]">
              {/* Brand Logo */}
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2.5 sm:gap-3 group focus-visible:ring-2 focus-visible:ring-lume-gold rounded-md"
                aria-label="LUMÉ Home"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-lume-gold/40 shadow-xs shrink-0 bg-black">
                  <Image
                    src="/assets/lume-gold-logo.jpg"
                    alt="LUMÉ Emblem"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-lg tracking-[0.2em] uppercase font-light leading-none text-lume-gold">
                    LUMÉ
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.24em] text-lume-taupe font-sans font-medium mt-0.5">
                    Salon Canada
                  </span>
                </div>
              </Link>

              {/* Minimalist Close Button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-10 h-10 rounded-full border border-lume-ink/12 text-lume-ink hover:text-lume-gold hover:bg-lume-ink/5 hover:border-lume-gold/40 flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-lume-gold"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 pointer-events-none" />
              </button>
            </header>

            {/* =================================================================== */}
            {/* 2. PROMINENT EDITORIAL NAVIGATION (28–36px Typography)             */}
            {/* =================================================================== */}
            <nav
              className="flex-1 px-5 sm:px-8 py-3 sm:py-5 flex flex-col justify-evenly overflow-y-auto overscroll-contain"
              aria-label="Main Navigation Menu"
            >
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href;
                const isHovered = hoveredIdx === idx;
                const isAnyHovered = hoveredIdx !== null;
                const isDimmed = isAnyHovered && !isHovered;

                return (
                  <motion.div
                    key={item.name}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 12 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.05 + idx * 0.045,
                      duration: 0.32,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      onTouchStart={() => setHoveredIdx(idx)}
                      className={`group relative flex items-baseline justify-between py-1 sm:py-1.5 transition-all duration-250 select-none ${
                        isDimmed ? "opacity-45" : "opacity-100"
                      }`}
                    >
                      <div className="flex items-baseline gap-3.5 sm:gap-4 min-w-0 transition-transform duration-250 ease-out group-hover:translate-x-2">
                        {/* Number Index */}
                        <span className="text-[11px] sm:text-xs font-mono tracking-widest text-lume-gold font-medium shrink-0">
                          {item.num}
                        </span>

                        {/* Large Editorial Serif Title (28–36px) */}
                        <span
                          className={`font-serif text-[26px] sm:text-[32px] md:text-[36px] font-light tracking-tight leading-none transition-colors duration-250 truncate ${
                            isActive
                              ? "text-lume-ink font-normal"
                              : "text-lume-ink/90 group-hover:text-lume-gold"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>

                      {/* Right Indicator (Active dot or hover arrow) */}
                      <div className="shrink-0 flex items-center pl-2">
                        {isActive ? (
                          <span className="flex items-center gap-1 text-lume-gold">
                            <span className="w-1.5 h-1.5 rounded-full bg-lume-gold shadow-xs" />
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-lume-taupe/40 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-lume-gold transition-all duration-200" />
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* =================================================================== */}
            {/* 3. BOTTOM ACTIONS & CONTACT FOOTER                                  */}
            {/* =================================================================== */}
            <footer className="shrink-0 px-5 sm:px-8 pt-3 sm:pt-4 pb-4 sm:pb-5 border-t border-[rgba(23,22,20,0.08)] bg-[#FAF7F2] space-y-3.5 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {/* Primary Booking Action */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  openBooking();
                }}
                className="group relative w-full h-[50px] sm:h-[54px] bg-[#171614] text-[#FFFDF8] rounded-[9px] text-xs uppercase tracking-[0.18em] font-sans font-medium flex items-center justify-center gap-2 hover:bg-lume-brown transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-lume-gold"
              >
                <span>BOOK AN APPOINTMENT</span>
                <ArrowRight className="w-4 h-4 text-lume-gold transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Compact Editorial Contact Metadata */}
              <div className="flex flex-col gap-1.5 text-[11px] sm:text-xs font-sans text-lume-ink/75 pt-0.5">
                <div className="flex items-center justify-between text-lume-taupe uppercase tracking-wider text-[9.5px] font-semibold">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-lume-gold" />
                    {siteConfig.location}
                  </span>
                  <span>Demo Studio</span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-0.5 border-t border-lume-ink/5 text-xs text-lume-ink/80">
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="hover:text-lume-gold transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-lume-gold" />
                    <span>{siteConfig.phone}</span>
                  </a>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-lume-gold transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3 h-3 text-lume-gold" />
                    <span>{siteConfig.email}</span>
                  </a>

                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-lume-gold transition-colors flex items-center gap-1.5"
                  >
                    <InstagramIcon className="w-3 h-3 text-lume-gold" />
                    <span className="hidden sm:inline">{siteConfig.instagram}</span>
                  </a>
                </div>
              </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
