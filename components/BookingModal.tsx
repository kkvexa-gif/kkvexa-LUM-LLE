"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";
import { servicesData, serviceCategories } from "@/data/services";
import { stylistsData } from "@/data/stylists";
import { siteConfig } from "@/data/site";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  Check,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export function BookingModal() {
  const { isOpen, selectedServiceId, selectedStylistId, closeBooking } = useBooking();
  const shouldReduceMotion = useReducedMotion();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [serviceId, setServiceId] = useState<string>("");
  const [stylistId, setStylistId] = useState<string>("any");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);

  // Form inputs
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientNotes, setClientNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Focus management
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Format tomorrow for initial date
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      if (selectedServiceId) {
        setServiceId(selectedServiceId);
      } else if (!serviceId) {
        setServiceId(servicesData[0].id);
      }

      if (selectedStylistId) {
        setStylistId(selectedStylistId);
      } else if (!stylistId) {
        setStylistId("any");
      }

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowFormatted = tomorrow.toISOString().split("T")[0];
      if (!date) setDate(tomorrowFormatted);
      if (!time) setTime("11:00 AM");

      setStep(1);
      setDirection(1);
      setIsSubmitting(false);

      // Focus close button initially for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen, selectedServiceId, selectedStylistId]);

  // Trap focus inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (!modalContainerRef.current) return;
        const focusableElements = modalContainerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedService = servicesData.find((s) => s.id === serviceId);
  const selectedStylist = stylistsData.find((s) => s.id === stylistId);

  const availableTimeSlots = [
    "9:30 AM",
    "11:00 AM",
    "1:30 PM",
    "3:00 PM",
    "4:30 PM",
    "6:00 PM",
  ];

  // Quick date helper dates
  const today = new Date();
  const getRelativeDateStr = (daysAhead: number) => {
    const d = new Date();
    d.setDate(today.getDate() + daysAhead);
    return d.toISOString().split("T")[0];
  };

  const tomorrowStr = getRelativeDateStr(1);
  const inTwoDaysStr = getRelativeDateStr(2);
  const inThreeDaysStr = getRelativeDateStr(3);

  const formatDisplayDate = (dateVal: string) => {
    if (!dateVal) return "";
    try {
      const parts = dateVal.split("-");
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
      }
    } catch {
      return dateVal;
    }
    return dateVal;
  };

  // Filtered services
  const filteredServices =
    activeCategory === "all"
      ? servicesData
      : servicesData.filter((s) => s.categorySlug === activeCategory);

  const goToNextStep = () => {
    if (step === 1 && !serviceId) return;
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, 5) as any);
  };

  const goToPrevStep = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1) as any);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setDirection(1);
      setStep(5);
    }, 550);
  };

  const handleDone = () => {
    setStep(1);
    closeBooking();
  };

  // Directional step transition variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 24 : -24,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -24 : 24,
      opacity: 0,
    }),
  };

  const stepsList = [
    { num: 1, label: "01 Service", title: "Service" },
    { num: 2, label: "02 Artist", title: "Artist" },
    { num: 3, label: "03 Date & Time", title: "Schedule" },
    { num: 4, label: "04 Details", title: "Details" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lume-reservation-heading"
    >
      {/* Ambient Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-[#141311]/80 backdrop-blur-md"
        onClick={closeBooking}
        aria-hidden="true"
      />

      {/* Main Modal Window */}
      <motion.div
        ref={modalContainerRef}
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.98, y: 12 }
        }
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full sm:h-auto sm:max-h-[88vh] sm:max-w-4xl md:max-w-[960px] bg-lume-ivory text-lume-ink sm:rounded-[20px] shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-lume-ink/10 overflow-hidden flex flex-col z-10"
      >
        {/* ========================================================================= */}
        {/* 1. FIXED HEADER                                                            */}
        {/* ========================================================================= */}
        <header className="shrink-0 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-lume-ink/10 bg-[#FAF7F2] z-20">
          <div>
            <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-lume-gold font-sans font-semibold">
              Online Appointment Reservation
            </span>
            <h2
              id="lume-reservation-heading"
              className="font-serif text-2xl sm:text-3xl text-lume-ink font-light tracking-tight mt-0.5"
            >
              Reserve Your Ritual
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeBooking}
            className="w-10 h-10 rounded-full flex items-center justify-center text-lume-ink/70 hover:text-lume-ink hover:bg-lume-ink/5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-lume-gold"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* ========================================================================= */}
        {/* 2. FIXED STEPPER BAR (Only visible on steps 1-4)                          */}
        {/* ========================================================================= */}
        {step < 5 && (
          <nav
            className="shrink-0 px-5 sm:px-8 pt-3.5 pb-2.5 bg-lume-surface border-b border-lume-ink/5 z-20"
            aria-label="Reservation Progress"
          >
            {/* Step Indicators */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 items-center">
              {stepsList.map((s) => {
                const isActive = step === s.num;
                const isCompleted = step > s.num;
                const isUpcoming = step < s.num;

                return (
                  <button
                    key={s.num}
                    type="button"
                    disabled={isUpcoming}
                    onClick={() => {
                      if (isCompleted) {
                        setDirection(-1);
                        setStep(s.num as any);
                      }
                    }}
                    className={`text-left group transition-all duration-200 ${
                      isCompleted ? "cursor-pointer" : "cursor-default"
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {isCompleted ? (
                        <span className="w-4 h-4 rounded-full bg-lume-gold/20 text-lume-gold flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                        </span>
                      ) : (
                        <span
                          className={`w-4 h-4 rounded-full text-[10px] font-sans font-semibold flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? "bg-lume-ink text-lume-ivory"
                              : "bg-lume-stone/40 text-lume-taupe"
                          }`}
                        >
                          {s.num}
                        </span>
                      )}
                      <span
                        className={`text-[11px] sm:text-xs font-sans tracking-wide truncate transition-colors ${
                          isActive
                            ? "text-lume-ink font-semibold"
                            : isCompleted
                            ? "text-lume-ink/80 group-hover:text-lume-gold font-medium"
                            : "text-lume-taupe font-normal"
                        }`}
                      >
                        <span className="hidden sm:inline">{s.label}</span>
                        <span className="sm:hidden">{s.title}</span>
                      </span>
                    </div>

                    {/* Progress track under each step */}
                    <div className="w-full bg-lume-stone/30 h-[2px] relative overflow-hidden rounded-full">
                      <div
                        className={`h-full transition-all duration-300 ease-out ${
                          isActive
                            ? "bg-lume-gold w-full"
                            : isCompleted
                            ? "bg-lume-ink w-full"
                            : "w-0 bg-transparent"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>
        )}

        {/* ========================================================================= */}
        {/* 3. SCROLLABLE CONTENT BODY                                                */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-6 overscroll-contain">
          <AnimatePresence mode="wait" custom={direction}>
            {/* STEP 1: SELECT SERVICE */}
            {step === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="space-y-4 max-w-3xl mx-auto"
              >
                {/* Intro & Category Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-1 border-b border-lume-ink/5">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-lume-ink">
                      Select Your Service
                    </h3>
                    <p className="text-xs text-lume-taupe font-sans mt-0.5">
                      Choose your tailored cut, bespoke colour, or restorative ritual.
                    </p>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                    {serviceCategories.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-sans whitespace-nowrap rounded-md transition-all ${
                          activeCategory === cat.slug
                            ? "bg-lume-ink text-lume-ivory font-medium shadow-xs"
                            : "text-lume-taupe hover:text-lume-ink hover:bg-lume-stone/20"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editorial Service List */}
                <div className="space-y-2.5 pt-1" role="radiogroup" aria-label="Available Services">
                  {filteredServices.map((service) => {
                    const isSelected = serviceId === service.id;
                    const isHovered = hoveredServiceId === service.id;

                    return (
                      <div
                        key={service.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => setServiceId(service.id)}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            setServiceId(service.id);
                          }
                        }}
                        onMouseEnter={() => setHoveredServiceId(service.id)}
                        onMouseLeave={() => setHoveredServiceId(null)}
                        className={`group relative p-4 sm:p-5 rounded-[12px] border transition-all duration-200 cursor-pointer select-none text-left focus-visible:ring-2 focus-visible:ring-lume-gold flex items-center justify-between gap-4 ${
                          isSelected
                            ? "bg-[#FFFDF8] border-lume-gold shadow-sm ring-1 ring-lume-gold/40"
                            : "bg-white/60 border-lume-ink/10 hover:border-lume-taupe/40 hover:bg-white"
                        }`}
                      >
                        {/* Gold accent bar on selected */}
                        <div
                          className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-all duration-200 ${
                            isSelected ? "bg-lume-gold opacity-100" : "opacity-0"
                          }`}
                        />

                        {/* Service Details */}
                        <div className="flex-1 min-w-0 pl-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono font-medium text-lume-gold">
                              {service.number}
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
                              {service.category}
                            </span>
                            <span className="text-lume-stone font-serif text-xs">•</span>
                            <span className="text-xs font-sans text-lume-taupe flex items-center gap-1">
                              <Clock className="w-3 h-3 text-lume-taupe" />
                              {service.duration}
                            </span>
                            {service.isSignature && (
                              <span className="hidden sm:inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-lume-gold bg-lume-gold/10 px-1.5 py-0.5 rounded font-sans font-medium">
                                <Sparkles className="w-2.5 h-2.5" />
                                Signature
                              </span>
                            )}
                          </div>

                          <h4 className="font-serif text-lg sm:text-xl text-lume-ink font-light leading-snug group-hover:text-lume-gold transition-colors">
                            {service.name}
                          </h4>

                          <p className="text-xs sm:text-[13px] text-lume-ink/70 font-sans mt-1 line-clamp-1 leading-relaxed">
                            {service.shortDescription}
                          </p>
                        </div>

                        {/* Right: Price & Selection Indicator */}
                        <div className="flex items-center gap-3 sm:gap-5 shrink-0 pl-2">
                          {/* Desktop Hover Image Preview (Compact) */}
                          <div className="hidden lg:block relative w-16 h-16 rounded-lg overflow-hidden bg-lume-stone/20 border border-lume-ink/10 transition-transform duration-300 group-hover:scale-105 shrink-0">
                            <Image
                              src={service.image}
                              alt={service.alt}
                              fill
                              sizes="64px"
                              className="object-cover transition-opacity duration-300 opacity-80 group-hover:opacity-100"
                            />
                          </div>

                          <div className="text-right">
                            <span className="block font-sans text-xs sm:text-sm font-medium text-lume-ink whitespace-nowrap">
                              {service.samplePrice}
                            </span>
                            <span className="text-[10px] text-lume-taupe uppercase tracking-wider block">
                              Base Price
                            </span>
                          </div>

                          {/* Refined Checkbox Ring */}
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200 shrink-0 ${
                              isSelected
                                ? "bg-lume-gold border-lume-gold text-lume-ivory shadow-xs"
                                : "border-lume-ink/20 bg-white/80 group-hover:border-lume-taupe"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: SELECT ARTIST */}
            {step === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="space-y-4 max-w-3xl mx-auto"
              >
                <div className="pb-1 border-b border-lume-ink/5">
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-lume-ink">
                    Select Your Specialist
                  </h3>
                  <p className="text-xs text-lume-taupe font-sans mt-0.5">
                    Choose a dedicated master artist or select first available for maximum scheduling flexibility.
                  </p>
                </div>

                <div className="space-y-3 pt-1" role="radiogroup" aria-label="Available Stylists">
                  {/* First Available Specialist Option */}
                  <div
                    role="radio"
                    aria-checked={stylistId === "any"}
                    tabIndex={0}
                    onClick={() => setStylistId("any")}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        setStylistId("any");
                      }
                    }}
                    className={`relative p-4 sm:p-5 rounded-[12px] border transition-all duration-200 cursor-pointer select-none text-left focus-visible:ring-2 focus-visible:ring-lume-gold flex items-center justify-between gap-4 ${
                      stylistId === "any"
                        ? "bg-[#FFFDF8] border-lume-gold shadow-sm ring-1 ring-lume-gold/40"
                        : "bg-white/60 border-lume-ink/10 hover:border-lume-taupe/40 hover:bg-white"
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-all duration-200 ${
                        stylistId === "any" ? "bg-lume-gold opacity-100" : "opacity-0"
                      }`}
                    />
                    <div className="flex items-center gap-3.5 pl-1">
                      <div className="w-12 h-12 rounded-full bg-lume-stone/40 border border-lume-ink/10 flex items-center justify-center text-lume-gold shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
                            Flexible Scheduling
                          </span>
                        </div>
                        <h4 className="font-serif text-lg sm:text-xl text-lume-ink font-light">
                          First Available Specialist
                        </h4>
                        <p className="text-xs text-lume-ink/70 font-sans mt-0.5">
                          Our concierge matches you with the premier specialist suited for your ritual.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200 shrink-0 ${
                        stylistId === "any"
                          ? "bg-lume-gold border-lume-gold text-lume-ivory shadow-xs"
                          : "border-lume-ink/20 bg-white/80"
                      }`}
                    >
                      {stylistId === "any" && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </div>
                  </div>

                  {/* Individual Artists */}
                  {stylistsData.map((stylist) => {
                    const isSelected = stylistId === stylist.id;

                    return (
                      <div
                        key={stylist.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => setStylistId(stylist.id)}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            setStylistId(stylist.id);
                          }
                        }}
                        className={`group relative p-4 sm:p-5 rounded-[12px] border transition-all duration-200 cursor-pointer select-none text-left focus-visible:ring-2 focus-visible:ring-lume-gold flex items-center justify-between gap-4 ${
                          isSelected
                            ? "bg-[#FFFDF8] border-lume-gold shadow-sm ring-1 ring-lume-gold/40"
                            : "bg-white/60 border-lume-ink/10 hover:border-lume-taupe/40 hover:bg-white"
                        }`}
                      >
                        <div
                          className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-all duration-200 ${
                            isSelected ? "bg-lume-gold opacity-100" : "opacity-0"
                          }`}
                        />

                        <div className="flex items-center gap-3.5 sm:gap-4 pl-1 min-w-0">
                          {/* Portrait */}
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-lume-stone/30 border border-lume-ink/10 shrink-0">
                            <Image
                              src={stylist.portrait}
                              alt={stylist.alt}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
                                {stylist.role}
                              </span>
                              <span className="text-lume-stone font-serif text-xs">•</span>
                              <span className="text-[11px] font-sans text-lume-taupe truncate">
                                {stylist.experience}
                              </span>
                            </div>

                            <h4 className="font-serif text-lg sm:text-xl text-lume-ink font-light leading-snug group-hover:text-lume-gold transition-colors">
                              {stylist.name}
                            </h4>

                            <p className="text-xs text-lume-ink/70 font-sans mt-0.5 truncate">
                              Specialty: {stylist.specialty}
                            </p>

                            <p className="text-[11px] text-lume-taupe font-sans mt-1 hidden sm:block">
                              Availability: {stylist.scheduleSummary}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200 shrink-0 ${
                            isSelected
                              ? "bg-lume-gold border-lume-gold text-lume-ivory shadow-xs"
                              : "border-lume-ink/20 bg-white/80 group-hover:border-lume-taupe"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: DATE & TIME */}
            {step === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="space-y-5 max-w-3xl mx-auto"
              >
                <div className="pb-1 border-b border-lume-ink/5">
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-lume-ink">
                    Select Date & Time
                  </h3>
                  <p className="text-xs text-lume-taupe font-sans mt-0.5">
                    Appointments are reserved with generous consultation buffer time.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-1">
                  {/* Left Column: Date Selection */}
                  <div className="md:col-span-6 space-y-4">
                    <label
                      htmlFor="modal-date-picker"
                      className="block text-xs uppercase tracking-widest font-sans font-semibold text-lume-taupe"
                    >
                      Choose Date
                    </label>

                    {/* Quick date buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Tomorrow", val: tomorrowStr },
                        { label: formatDisplayDate(inTwoDaysStr), val: inTwoDaysStr },
                        { label: formatDisplayDate(inThreeDaysStr), val: inThreeDaysStr },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setDate(item.val)}
                          className={`py-2 px-2 text-xs font-sans text-center rounded-lg border transition-all ${
                            date === item.val
                              ? "bg-lume-ink text-lume-ivory border-lume-ink font-medium shadow-xs"
                              : "bg-white border-lume-ink/10 text-lume-ink hover:border-lume-taupe"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Standard Date Input */}
                    <div className="relative">
                      <input
                        id="modal-date-picker"
                        type="date"
                        value={date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white border border-lume-ink/15 rounded-lg text-lume-ink font-sans text-sm focus-visible:ring-2 focus-visible:ring-lume-gold shadow-xs"
                      />
                    </div>

                    <div className="p-3.5 bg-lume-surface border border-lume-ink/5 rounded-lg text-xs font-sans text-lume-taupe space-y-1">
                      <div className="flex items-center gap-1.5 text-lume-ink font-medium">
                        <Calendar className="w-3.5 h-3.5 text-lume-gold" />
                        <span>Studio Hours</span>
                      </div>
                      <p>Tuesday – Saturday: 9:00 AM – 7:30 PM</p>
                      <p>Sunday: 10:00 AM – 5:00 PM</p>
                    </div>
                  </div>

                  {/* Right Column: Time Slot Selection */}
                  <div className="md:col-span-6 space-y-3">
                    <label className="block text-xs uppercase tracking-widest font-sans font-semibold text-lume-taupe">
                      Available Time Slots
                    </label>

                    <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Available Time Slots">
                      {availableTimeSlots.map((slot) => {
                        const isSlotSelected = time === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            role="radio"
                            aria-checked={isSlotSelected}
                            onClick={() => setTime(slot)}
                            className={`py-3 px-3 text-xs font-sans rounded-lg border transition-all flex items-center justify-between ${
                              isSlotSelected
                                ? "bg-lume-ink text-lume-ivory border-lume-ink font-medium shadow-xs ring-1 ring-lume-gold"
                                : "bg-white text-lume-ink border-lume-ink/10 hover:border-lume-taupe hover:bg-lume-surface"
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <Clock className={`w-3.5 h-3.5 ${isSlotSelected ? "text-lume-gold" : "text-lume-taupe"}`} />
                              {slot}
                            </span>
                            {isSlotSelected && <Check className="w-3 h-3 text-lume-gold stroke-[2.5]" />}
                          </button>
                        );
                      })}
                    </div>

                    {date && time && (
                      <div className="p-3 bg-lume-gold/10 border border-lume-gold/20 rounded-lg text-xs font-sans text-lume-ink flex items-center gap-2 mt-2">
                        <Sparkles className="w-4 h-4 text-lume-gold shrink-0" />
                        <span>
                          Reserved window: <strong>{formatDisplayDate(date)}</strong> at <strong>{time}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: GUEST DETAILS & CONFIRMATION FORM */}
            {step === 4 && (
              <motion.div
                key="step-4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="space-y-5 max-w-3xl mx-auto"
              >
                <div className="pb-1 border-b border-lume-ink/5">
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-lume-ink">
                    Guest Information
                  </h3>
                  <p className="text-xs text-lume-taupe font-sans mt-0.5">
                    We will send a personalized calendar invitation and confirmation to your contact details.
                  </p>
                </div>

                {/* Live Reservation Summary Card */}
                <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-xl border border-lume-ink/10 text-xs font-sans space-y-2.5">
                  <div className="flex items-center justify-between border-b border-lume-ink/5 pb-2">
                    <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-lume-gold">
                      Reservation Summary
                    </span>
                    <span className="font-medium text-lume-ink">{selectedService?.samplePrice}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-lume-ink/80">
                    <div>
                      <span className="text-lume-taupe block text-[11px]">Service</span>
                      <strong className="font-medium text-lume-ink text-xs sm:text-sm">
                        {selectedService?.name}
                      </strong>
                      <span className="text-[11px] text-lume-taupe block">({selectedService?.duration})</span>
                    </div>
                    <div>
                      <span className="text-lume-taupe block text-[11px]">Dedicated Artist</span>
                      <strong className="font-medium text-lume-ink text-xs sm:text-sm">
                        {selectedStylist ? selectedStylist.name : "First Available"}
                      </strong>
                      <span className="text-[11px] text-lume-taupe block">
                        {selectedStylist ? selectedStylist.role : "Concierge Match"}
                      </span>
                    </div>
                    <div>
                      <span className="text-lume-taupe block text-[11px]">Schedule</span>
                      <strong className="font-medium text-lume-ink text-xs sm:text-sm">
                        {formatDisplayDate(date)}
                      </strong>
                      <span className="text-[11px] text-lume-taupe block">{time} EST</span>
                    </div>
                  </div>
                </div>

                {/* Minimalist Editorial Underline Form */}
                <form id="reservation-details-form" onSubmit={handleFormSubmit} className="space-y-4 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1">
                      <label
                        htmlFor="client-full-name"
                        className="block text-[11px] uppercase tracking-widest font-sans font-semibold text-lume-taupe"
                      >
                        Full Name *
                      </label>
                      <input
                        id="client-full-name"
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Clara Dupont"
                        className="w-full px-3.5 py-2.5 bg-white border-b-2 border-lume-ink/20 focus:border-lume-gold rounded-t-md text-lume-ink font-sans text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="client-email-addr"
                        className="block text-[11px] uppercase tracking-widest font-sans font-semibold text-lume-taupe"
                      >
                        Email Address *
                      </label>
                      <input
                        id="client-email-addr"
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="clara@example.com"
                        className="w-full px-3.5 py-2.5 bg-white border-b-2 border-lume-ink/20 focus:border-lume-gold rounded-t-md text-lume-ink font-sans text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1">
                      <label
                        htmlFor="client-phone-num"
                        className="block text-[11px] uppercase tracking-widest font-sans font-semibold text-lume-taupe"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="client-phone-num"
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 bg-white border-b-2 border-lume-ink/20 focus:border-lume-gold rounded-t-md text-lume-ink font-sans text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="client-hair-notes"
                        className="block text-[11px] uppercase tracking-widest font-sans font-semibold text-lume-taupe"
                      >
                        Notes / Hair Goals (Optional)
                      </label>
                      <input
                        id="client-hair-notes"
                        type="text"
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        placeholder="e.g. Bringing inspiration photos"
                        className="w-full px-3.5 py-2.5 bg-white border-b-2 border-lume-ink/20 focus:border-lume-gold rounded-t-md text-lume-ink font-sans text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-sans text-lume-taupe pt-1">
                    <ShieldCheck className="w-4 h-4 text-lume-gold shrink-0" />
                    <span>Your information is held in strict privacy for salon communications only.</span>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 5: CONFIRMATION RECEIPT (DEMO MODE) */}
            {step === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-6 sm:py-8 space-y-5 max-w-lg mx-auto"
              >
                {/* Gold Halo Check */}
                <div className="w-16 h-16 bg-lume-gold/15 text-lume-gold rounded-full mx-auto flex items-center justify-center border border-lume-gold/40 shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-lume-gold" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-lume-gold font-sans font-semibold">
                    Request Received
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-light text-lume-ink tracking-tight">
                    Your ritual is on its way.
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-lume-ink/75 leading-relaxed pt-1">
                    We have recorded your reservation request for{" "}
                    <strong className="font-medium text-lume-ink">{clientName || "our guest"}</strong>.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="bg-[#FAF7F2] p-5 rounded-xl border border-lume-ink/10 text-xs font-sans text-left space-y-2.5 shadow-xs">
                  <div className="flex justify-between border-b border-lume-ink/5 pb-2">
                    <span className="text-lume-taupe">Service</span>
                    <span className="font-medium text-lume-ink">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-lume-ink/5 pb-2">
                    <span className="text-lume-taupe">Artist</span>
                    <span className="font-medium text-lume-ink">
                      {selectedStylist ? selectedStylist.name : "First Available Specialist"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-lume-ink/5 pb-2">
                    <span className="text-lume-taupe">Date & Time</span>
                    <span className="font-medium text-lume-ink">
                      {formatDisplayDate(date)} at {time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lume-taupe">Location</span>
                    <span className="font-medium text-lume-ink text-right">{siteConfig.locationDetails}</span>
                  </div>
                </div>

                <div className="p-3 bg-lume-surface border border-lume-ink/5 rounded-lg text-[11px] font-sans text-lume-taupe leading-relaxed">
                  * Demo Mode: Your appointment request has been recorded for this demo. No real charge has been incurred.
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleDone}
                    className="w-full sm:w-auto px-10 py-3.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium rounded-lg hover:bg-lume-brown transition-all shadow-sm"
                  >
                    Done · Return to LUMÉ
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* 4. FIXED STICKY ACTION FOOTER (ALWAYS VISIBLE)                           */}
        {/* ========================================================================= */}
        {step < 5 && (
          <footer className="shrink-0 border-t border-lume-ink/10 bg-[#FAF7F2] px-5 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4 z-20 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
            {/* Left: Live Selected Context Summary */}
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] uppercase tracking-widest text-lume-taupe font-sans font-medium">
                {step === 1 && "Selected Service"}
                {step === 2 && "Selected Artist"}
                {step === 3 && "Selected Schedule"}
                {step === 4 && "Reservation"}
              </span>
              <div className="flex items-center gap-1.5 truncate">
                <span className="font-serif text-base sm:text-lg text-lume-ink font-light truncate">
                  {step === 1 && (selectedService ? selectedService.name : "Select a service")}
                  {step === 2 && (selectedStylist ? selectedStylist.name : "First Available Specialist")}
                  {step === 3 && `${formatDisplayDate(date)} · ${time}`}
                  {step === 4 && `${selectedService?.name} with ${selectedStylist ? selectedStylist.name : "First Available"}`}
                </span>
                {step === 1 && selectedService && (
                  <span className="hidden sm:inline text-xs font-sans text-lume-gold font-medium">
                    ({selectedService.samplePrice})
                  </span>
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Back Button (for steps 2 to 4) */}
              {step > 1 && (
                <button
                  type="button"
                  onClick={goToPrevStep}
                  className="group px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs uppercase tracking-widest font-sans font-medium text-lume-taupe hover:text-lume-ink rounded-lg transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-lume-gold"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                  <span className="hidden sm:inline">Back</span>
                </button>
              )}

              {/* Primary Forward Button */}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  disabled={step === 1 && !serviceId}
                  className={`group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-xs uppercase tracking-widest font-sans font-medium transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-lume-gold ${
                    step === 1 && !serviceId
                      ? "bg-lume-stone/40 text-lume-taupe cursor-not-allowed"
                      : "bg-lume-ink text-lume-ivory hover:bg-lume-brown cursor-pointer"
                  }`}
                >
                  <span>
                    {step === 1
                      ? serviceId
                        ? "Continue"
                        : "Select a Service"
                      : "Continue"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-lume-gold transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  form="reservation-details-form"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-xs uppercase tracking-widest font-sans font-medium bg-lume-ink text-lume-ivory hover:bg-lume-brown transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-lume-gold disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirming Request…</span>
                  ) : (
                    <>
                      <span>Confirm Request</span>
                      <ArrowRight className="w-3.5 h-3.5 text-lume-gold transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              )}
            </div>
          </footer>
        )}
      </motion.div>
    </div>
  );
}
