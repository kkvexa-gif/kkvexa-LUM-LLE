"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { useBooking } from "@/context/BookingContext";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowRight, Phone, Mail } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mobileLinks = [
  { name: "Services", href: "/services" },
  { name: "Experience", href: "/experience" },
  { name: "Stylists", href: "/stylists" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Handle escape and focus management
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#171614]/65 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in & Fade Floating Panel */}
          <motion.div
            ref={drawerRef}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-3.5 left-3.5 right-3.5 max-h-[92vh] bg-[#FFFDF8] text-lume-ink rounded-[16px] shadow-[0_16px_48px_rgba(23,22,20,0.12)] border border-[#171614]/12 p-6 flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-lume-ink/10">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-lume-gold/40 shadow-sm shrink-0 bg-black">
                  <Image
                    src="/assets/lume-gold-logo.jpg"
                    alt="LUMÉ Gold Emblem"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="font-serif text-xl tracking-[0.18em] uppercase font-light leading-none block text-lume-gold">
                    LUMÉ
                  </span>
                  <p className="text-[8.5px] uppercase tracking-[0.22em] text-lume-taupe font-sans mt-0.5">
                    Salon Canada
                  </p>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="w-9 h-9 rounded-[8px] border border-lume-ink/15 text-lume-ink hover:text-lume-gold flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-lume-gold"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links with Stagger */}
            <nav className="py-6 flex flex-col gap-3.5" aria-label="Mobile Navigation Links">
              <Link
                href="/"
                onClick={onClose}
                className={`text-xl font-serif tracking-wide py-1 flex items-center justify-between transition-colors ${
                  pathname === "/" ? "text-lume-gold font-medium" : "text-lume-ink hover:text-lume-gold"
                }`}
              >
                <span>Home</span>
                {pathname === "/" && <span className="w-1.5 h-1.5 rounded-full bg-lume-gold" />}
              </Link>
              {mobileLinks.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={shouldReduceMotion ? {} : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`text-xl font-serif tracking-wide py-1 flex items-center justify-between transition-colors ${
                        isActive ? "text-lume-gold font-medium" : "text-lume-ink hover:text-lume-gold"
                      }`}
                    >
                      <span>{item.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-lume-gold" />}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA & Contact Details */}
            <div className="pt-5 border-t border-lume-ink/10 space-y-5">
              <button
                onClick={() => {
                  onClose();
                  openBooking();
                }}
                className="w-full py-3.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium rounded-[9px] flex items-center justify-center gap-2 hover:bg-lume-brown transition-colors focus-visible:ring-2 focus-visible:ring-lume-gold shadow-sm"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 text-lume-gold" />
              </button>

              <div className="space-y-1.5 text-xs font-sans text-lume-ink/75 pt-1">
                <p className="font-medium text-lume-ink uppercase tracking-wider text-[10px]">
                  {siteConfig.location}
                </p>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-lume-taupe" />
                  <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-lume-gold transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-lume-taupe" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-lume-gold transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <InstagramIcon className="w-3.5 h-3.5 text-lume-taupe" />
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
