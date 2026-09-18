"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { MobileMenu } from "./MobileMenu";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Primary 5 desktop navigation items (Contact is accessible via footer/mobile/page CTAs)
const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Experience", href: "/experience" },
  { name: "Stylists", href: "/stylists" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
];

type NavTheme = "dark" | "transition" | "light";

export function Navbar() {
  const [isCompact, setIsCompact] = useState(false);
  const [navTheme, setNavTheme] = useState<NavTheme>("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const shouldReduceMotion = useReducedMotion();

  const isHomepage = pathname === "/";

  // Calculate size and theme independently based on Hero boundary
  const updateNavbarState = useCallback(() => {
    // 1. Size state: subtle shrink when scrolling (> 45px)
    setIsCompact(window.scrollY > 45);

    // 2. Theme state: Inner pages are always light; Homepage depends on Hero element boundary
    if (!isHomepage) {
      setNavTheme("light");
      return;
    }

    const heroElement = document.getElementById("homepage-hero");
    if (!heroElement) {
      const heroThreshold = window.innerHeight - 120;
      if (window.scrollY < heroThreshold - 80) {
        setNavTheme("dark");
      } else if (window.scrollY < heroThreshold) {
        setNavTheme("transition");
      } else {
        setNavTheme("light");
      }
      return;
    }

    // Exact viewport position of the hero bottom boundary
    const heroRect = heroElement.getBoundingClientRect();
    const heroBottom = heroRect.bottom;

    // Transition zone (~100px) around hero bottom crossing the floating navbar position
    if (heroBottom > 130) {
      setNavTheme("dark");
    } else if (heroBottom > 20) {
      setNavTheme("transition");
    } else {
      setNavTheme("light");
    }
  }, [isHomepage]);

  useEffect(() => {
    updateNavbarState();
    window.addEventListener("scroll", updateNavbarState, { passive: true });
    window.addEventListener("resize", updateNavbarState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateNavbarState);
      window.removeEventListener("resize", updateNavbarState);
    };
  }, [updateNavbarState]);

  const isDark = navTheme === "dark";
  const isTransition = navTheme === "transition";
  const isLight = navTheme === "light";

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3.5 sm:top-5 md:top-6 left-3.5 sm:left-6 md:left-8 right-3.5 sm:right-6 md:right-8 z-50 mx-auto max-w-7xl pointer-events-none"
      >
        <div
          className={`pointer-events-auto w-full transition-all ease-out flex items-center justify-between rounded-[14px] sm:rounded-[16px] ${
            shouldReduceMotion ? "duration-0" : "duration-500"
          } ${
            isDark
              ? "bg-[#0f0e0d]/76 backdrop-blur-[16px] border border-white/12 shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
              : isTransition
              ? "bg-[#24211c]/90 backdrop-blur-[16px] border border-white/16 shadow-[0_12px_36px_rgba(0,0,0,0.25)]"
              : isCompact
              ? "bg-[#FFFDF8] border border-[#171614]/14 shadow-[0_14px_40px_rgba(23,22,20,0.09)]"
              : "bg-[#FFFDF8] border border-[#171614]/12 shadow-[0_10px_35px_rgba(23,22,20,0.07)]"
          } ${
            isCompact
              ? "py-2.5 sm:py-2.5 px-4 sm:px-6 min-h-[58px] sm:min-h-[62px]"
              : "py-3 sm:py-3.5 px-4 sm:px-7 min-h-[64px] sm:min-h-[68px]"
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3 focus-visible:ring-2 focus-visible:ring-lume-gold rounded-md select-none shrink-0"
            aria-label="LUMÉ Home"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-lume-gold/40 shadow-sm shrink-0 bg-black">
              <Image
                src="/assets/lume-gold-logo.jpg"
                alt="LUMÉ Gold Emblem"
                fill
                priority
                sizes="36px"
                className="object-cover group-hover:scale-108 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif text-lg sm:text-xl md:text-[22px] tracking-[0.18em] uppercase font-light inline-block text-lume-gold group-hover:text-lume-goldLight transition-colors duration-300 leading-none">
                LUMÉ
              </span>
              <span
                className={`text-[8px] sm:text-[8.5px] uppercase tracking-[0.22em] font-sans font-medium mt-0.5 transition-colors duration-300 ${
                  isDark || isTransition ? "text-lume-taupe" : "text-[#5F584F]"
                }`}
              >
                Salon Canada
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8"
            aria-label="Main Navigation"
          >
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-[13px] lg:text-[13.5px] tracking-wider font-sans transition-colors duration-300 relative py-1 focus-visible:ring-1 focus-visible:ring-lume-gold flex flex-col items-center ${
                    isDark || isTransition
                      ? isActive
                        ? "text-white font-medium"
                        : "text-white/80 hover:text-white font-normal"
                      : isActive
                      ? "text-[#171614] font-medium"
                      : "text-[#171614]/75 hover:text-[#171614] font-normal"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-lume-gold animate-fadeIn" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => openBooking()}
              className={`group relative inline-flex items-center justify-center gap-1.5 h-[42px] sm:h-[44px] px-5 sm:px-6 text-xs uppercase tracking-widest font-sans font-medium rounded-[9px] hover:-translate-y-0.5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-lume-gold shadow-sm ${
                isDark || isTransition
                  ? "bg-[#171614] border border-white/20 text-[#F5F1EA] hover:bg-[#302820]"
                  : "bg-[#171614] text-[#FFFDF8] hover:bg-lume-brown"
              }`}
            >
              <span className="hidden lg:inline">BOOK APPOINTMENT</span>
              <span className="lg:hidden">BOOK</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-lume-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Actions: Mini Book & Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => openBooking()}
              className={`h-9 px-3 text-[11px] uppercase tracking-wider font-sans font-medium rounded-[7px] flex items-center gap-1 transition-colors duration-300 ${
                isDark || isTransition
                  ? "bg-[#171614] border border-white/20 text-[#F5F1EA]"
                  : "bg-[#171614] text-[#FFFDF8]"
              }`}
            >
              <span>BOOK</span>
              <ArrowUpRight className="w-3 h-3 text-lume-gold" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`h-9 px-3 rounded-[7px] transition-colors duration-300 flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-lume-gold ${
                isDark || isTransition
                  ? "border border-white/20 text-white hover:text-lume-gold hover:border-lume-gold/40"
                  : "border border-[#171614]/15 text-[#171614] hover:text-lume-gold hover:border-lume-gold/40"
              }`}
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="text-[11px] font-medium">MENU</span>
              <div className="w-3.5 flex flex-col items-end gap-1">
                <span className="w-3.5 h-[1.2px] bg-current" />
                <span className="w-2.5 h-[1.2px] bg-current" />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
