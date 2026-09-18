"use client";

import React, { useState } from "react";
import Image from "next/image";
import { servicesData, serviceCategories } from "@/data/services";
import { stylistsData } from "@/data/stylists";
import { siteConfig } from "@/data/site";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Check,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function BookPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [serviceId, setServiceId] = useState<string>(servicesData[0].id);
  const [stylistId, setStylistId] = useState<string>("any");
  const [date, setDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [time, setTime] = useState<string>("11:00 AM");
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientNotes, setClientNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedService = servicesData.find((s) => s.id === serviceId) || servicesData[0];
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

  const filteredServices =
    activeCategory === "all"
      ? servicesData
      : servicesData.filter((s) => s.categorySlug === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(5);
    }, 600);
  };

  const stepsList = [
    { num: 1, label: "01 Service" },
    { num: 2, label: "02 Artist" },
    { num: 3, label: "03 Schedule" },
    { num: 4, label: "04 Details" },
  ];

  return (
    <div className="pt-28 pb-24 space-y-10 sm:space-y-14">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-6 sm:pt-10">
        <ScrollReveal className="max-w-3xl space-y-5" duration={0.8}>
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-8 bg-lume-gold" />
            <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
              Online Reservations
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-lume-ink tracking-tight leading-tightEditorial text-balance">
            Let&apos;s make time <br />
            <span className="italic text-lume-taupe">for your next ritual.</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-lume-ink/75 leading-relaxed text-balance">
            Follow our considered four-step flow to reserve your bespoke hair service, artist, and schedule.
          </p>
        </ScrollReveal>
      </section>

      {/* Main Multi-Step Booking Flow */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8">
        <ScrollReveal delay={0.15}>
          <div className="bg-lume-ivory border border-lume-ink/10 rounded-2xl shadow-[0_20px_50px_rgba(23,22,20,0.06)] overflow-hidden">
            {/* Stepper Header */}
            {step < 5 && (
              <div className="px-6 sm:px-10 pt-6 pb-4 border-b border-lume-ink/10 bg-[#FAF7F2]">
                <div className="grid grid-cols-4 gap-2 sm:gap-4 items-center">
                  {stepsList.map((s) => {
                    const isActive = step === s.num;
                    const isCompleted = step > s.num;

                    return (
                      <button
                        key={s.num}
                        type="button"
                        onClick={() => {
                          if (isCompleted) setStep(s.num as any);
                        }}
                        disabled={step < s.num}
                        className={`text-left group transition-all ${
                          isCompleted ? "cursor-pointer" : "cursor-default"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1.5">
                          {isCompleted ? (
                            <span className="w-4 h-4 rounded-full bg-lume-gold/20 text-lume-gold flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                            </span>
                          ) : (
                            <span
                              className={`w-4 h-4 rounded-full text-[10px] font-sans font-semibold flex items-center justify-center shrink-0 ${
                                isActive
                                  ? "bg-lume-ink text-lume-ivory"
                                  : "bg-lume-stone/40 text-lume-taupe"
                              }`}
                            >
                              {s.num}
                            </span>
                          )}
                          <span
                            className={`text-xs font-sans tracking-wide truncate ${
                              isActive
                                ? "text-lume-ink font-semibold"
                                : isCompleted
                                ? "text-lume-ink/80 font-medium"
                                : "text-lume-taupe font-normal"
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>

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
              </div>
            )}

            {/* Form Content Area */}
            <div className="p-6 sm:p-10">
              {/* STEP 1: Select Service */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-lume-ink/5">
                    <div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-light text-lume-ink">
                        Select Your Service
                      </h2>
                      <p className="text-xs sm:text-sm text-lume-taupe font-sans mt-0.5">
                        Choose the ritual or transformation for your upcoming appointment.
                      </p>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                      {serviceCategories.map((cat) => (
                        <button
                          key={cat.slug}
                          type="button"
                          onClick={() => setActiveCategory(cat.slug)}
                          className={`px-3 py-1 text-xs uppercase tracking-wider font-sans whitespace-nowrap rounded-md transition-all ${
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

                  <div className="space-y-3 pt-1">
                    {filteredServices.map((service) => {
                      const isSelected = serviceId === service.id;

                      return (
                        <div
                          key={service.id}
                          tabIndex={0}
                          onClick={() => setServiceId(service.id)}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault();
                              setServiceId(service.id);
                            }
                          }}
                          className={`group relative p-5 rounded-xl border transition-all duration-200 cursor-pointer select-none text-left flex items-center justify-between gap-4 ${
                            isSelected
                              ? "bg-[#FFFDF8] border-lume-gold shadow-sm ring-1 ring-lume-gold/40"
                              : "bg-white/70 border-lume-ink/10 hover:border-lume-taupe/40 hover:bg-white"
                          }`}
                        >
                          <div
                            className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-all duration-200 ${
                              isSelected ? "bg-lume-gold opacity-100" : "opacity-0"
                            }`}
                          />

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
                                <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-lume-gold bg-lume-gold/10 px-1.5 py-0.5 rounded font-sans font-medium">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  Signature
                                </span>
                              )}
                            </div>

                            <h3 className="font-serif text-xl sm:text-2xl text-lume-ink font-light leading-snug group-hover:text-lume-gold transition-colors">
                              {service.name}
                            </h3>

                            <p className="text-xs sm:text-sm text-lume-ink/70 font-sans mt-1 leading-relaxed">
                              {service.shortDescription}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 sm:gap-6 shrink-0 pl-2">
                            <div className="hidden sm:block relative w-16 h-16 rounded-lg overflow-hidden bg-lume-stone/20 border border-lume-ink/10 shrink-0">
                              <Image
                                src={service.image}
                                alt={service.alt}
                                fill
                                sizes="64px"
                                className="object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                              />
                            </div>

                            <div className="text-right">
                              <span className="block font-sans text-sm sm:text-base font-medium text-lume-ink whitespace-nowrap">
                                {service.samplePrice}
                              </span>
                              <span className="text-[10px] text-lume-taupe uppercase tracking-wider block">
                                Base Price
                              </span>
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
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-6 border-t border-lume-ink/10 flex items-center justify-between">
                    <div className="text-xs font-sans text-lume-taupe">
                      Selected: <strong className="text-lume-ink">{selectedService.name}</strong> ({selectedService.samplePrice})
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="group px-8 py-3.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium rounded-lg inline-flex items-center gap-2 hover:bg-lume-brown transition-colors shadow-sm"
                    >
                      <span>Choose Specialist</span>
                      <ArrowRight className="w-4 h-4 text-lume-gold transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Select Artist */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="pb-2 border-b border-lume-ink/5">
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-lume-ink">
                      Select Your Specialist
                    </h2>
                    <p className="text-xs sm:text-sm text-lume-taupe font-sans mt-0.5">
                      Choose a dedicated master artist or select first available for maximum scheduling flexibility.
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    {/* First Available */}
                    <div
                      tabIndex={0}
                      onClick={() => setStylistId("any")}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          setStylistId("any");
                        }
                      }}
                      className={`relative p-5 rounded-xl border transition-all duration-200 cursor-pointer select-none text-left flex items-center justify-between gap-4 ${
                        stylistId === "any"
                          ? "bg-[#FFFDF8] border-lume-gold shadow-sm ring-1 ring-lume-gold/40"
                          : "bg-white/70 border-lume-ink/10 hover:border-lume-taupe/40 hover:bg-white"
                      }`}
                    >
                      <div
                        className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-all duration-200 ${
                          stylistId === "any" ? "bg-lume-gold opacity-100" : "opacity-0"
                        }`}
                      />
                      <div className="flex items-center gap-4 pl-1">
                        <div className="w-14 h-14 rounded-full bg-lume-stone/40 border border-lume-ink/10 flex items-center justify-center text-lume-gold shrink-0">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold block mb-0.5">
                            Flexible Scheduling
                          </span>
                          <h3 className="font-serif text-xl sm:text-2xl text-lume-ink font-light">
                            First Available Specialist
                          </h3>
                          <p className="text-xs sm:text-sm text-lume-ink/70 font-sans mt-0.5">
                            Matches you with the premier specialist suited for your selected service.
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

                    {/* Artists List */}
                    {stylistsData.map((stylist) => {
                      const isSelected = stylistId === stylist.id;

                      return (
                        <div
                          key={stylist.id}
                          tabIndex={0}
                          onClick={() => setStylistId(stylist.id)}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault();
                              setStylistId(stylist.id);
                            }
                          }}
                          className={`group relative p-5 rounded-xl border transition-all duration-200 cursor-pointer select-none text-left flex items-center justify-between gap-4 ${
                            isSelected
                              ? "bg-[#FFFDF8] border-lume-gold shadow-sm ring-1 ring-lume-gold/40"
                              : "bg-white/70 border-lume-ink/10 hover:border-lume-taupe/40 hover:bg-white"
                          }`}
                        >
                          <div
                            className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-all duration-200 ${
                              isSelected ? "bg-lume-gold opacity-100" : "opacity-0"
                            }`}
                          />

                          <div className="flex items-center gap-4 pl-1 min-w-0">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-lume-stone/30 border border-lume-ink/10 shrink-0">
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
                                <span className="text-xs font-sans text-lume-taupe truncate">
                                  {stylist.experience}
                                </span>
                              </div>

                              <h3 className="font-serif text-xl sm:text-2xl text-lume-ink font-light leading-snug group-hover:text-lume-gold transition-colors">
                                {stylist.name}
                              </h3>

                              <p className="text-xs sm:text-sm text-lume-ink/70 font-sans mt-0.5 truncate">
                                Specialty: {stylist.specialty}
                              </p>

                              <p className="text-xs text-lume-taupe font-sans mt-1">
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

                  <div className="pt-6 border-t border-lume-ink/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="group px-4 py-2.5 text-xs font-sans text-lume-taupe hover:text-lume-ink inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                      <span>Back to Services</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="group px-8 py-3.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium rounded-lg inline-flex items-center gap-2 hover:bg-lume-brown transition-colors shadow-sm"
                    >
                      <span>Select Date & Time</span>
                      <ArrowRight className="w-4 h-4 text-lume-gold transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Date and Time */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="pb-2 border-b border-lume-ink/5">
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-lume-ink">
                      Select Date & Time
                    </h2>
                    <p className="text-xs sm:text-sm text-lume-taupe font-sans mt-0.5">
                      Pick your preferred session day and time window.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-1">
                    <div className="md:col-span-6 space-y-4">
                      <label
                        htmlFor="book-page-date-input"
                        className="block text-xs uppercase tracking-widest font-sans font-semibold text-lume-taupe"
                      >
                        Appointment Date
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

                      <input
                        id="book-page-date-input"
                        type="date"
                        value={date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white border border-lume-ink/15 rounded-lg text-lume-ink font-sans text-sm focus-visible:ring-2 focus-visible:ring-lume-gold shadow-xs"
                      />

                      <div className="p-4 bg-[#FAF7F2] border border-lume-ink/5 rounded-lg text-xs font-sans text-lume-taupe space-y-1">
                        <div className="flex items-center gap-1.5 text-lume-ink font-medium">
                          <Calendar className="w-3.5 h-3.5 text-lume-gold" />
                          <span>Studio Operating Hours</span>
                        </div>
                        <p>Tuesday – Saturday: 9:00 AM – 7:30 PM</p>
                        <p>Sunday: 10:00 AM – 5:00 PM</p>
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-4">
                      <label className="block text-xs uppercase tracking-widest font-sans font-semibold text-lume-taupe">
                        Available Time Slots
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {availableTimeSlots.map((slot) => {
                          const isSlotSelected = time === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setTime(slot)}
                              className={`py-3.5 px-3 text-xs font-sans rounded-lg border transition-all flex items-center justify-between ${
                                isSlotSelected
                                  ? "bg-lume-ink text-lume-ivory border-lume-ink font-medium shadow-sm ring-1 ring-lume-gold"
                                  : "bg-white text-lume-ink border-lume-ink/10 hover:border-lume-taupe"
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                <Clock className={`w-3.5 h-3.5 ${isSlotSelected ? "text-lume-gold" : "text-lume-taupe"}`} />
                                {slot}
                              </span>
                              {isSlotSelected && <Check className="w-3.5 h-3.5 text-lume-gold stroke-[2.5]" />}
                            </button>
                          );
                        })}
                      </div>

                      {date && time && (
                        <div className="p-3 bg-lume-gold/10 border border-lume-gold/20 rounded-lg text-xs font-sans text-lume-ink flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-lume-gold shrink-0" />
                          <span>
                            Selected: <strong>{formatDisplayDate(date)}</strong> at <strong>{time}</strong>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-lume-ink/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="group px-4 py-2.5 text-xs font-sans text-lume-taupe hover:text-lume-ink inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                      <span>Back to Artists</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="group px-8 py-3.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium rounded-lg inline-flex items-center gap-2 hover:bg-lume-brown transition-colors shadow-sm"
                    >
                      <span>Enter Guest Details</span>
                      <ArrowRight className="w-4 h-4 text-lume-gold transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Client Info Form */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="pb-2 border-b border-lume-ink/5">
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-lume-ink">
                      Client Details
                    </h2>
                    <p className="text-xs sm:text-sm text-lume-taupe font-sans mt-0.5">
                      Please provide your contact info for appointment confirmation.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#FAF7F2] p-5 rounded-xl border border-lume-ink/10 text-xs font-sans space-y-2.5">
                    <div className="flex items-center justify-between border-b border-lume-ink/5 pb-2">
                      <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-lume-gold">
                        Reservation Summary
                      </span>
                      <span className="font-medium text-lume-ink">{selectedService.samplePrice}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-lume-ink/80">
                      <div>
                        <span className="text-lume-taupe block text-[11px]">Service</span>
                        <strong className="font-medium text-lume-ink text-sm">{selectedService.name}</strong>
                      </div>
                      <div>
                        <span className="text-lume-taupe block text-[11px]">Specialist</span>
                        <strong className="font-medium text-lume-ink text-sm">
                          {selectedStylist ? selectedStylist.name : "First Available"}
                        </strong>
                      </div>
                      <div>
                        <span className="text-lume-taupe block text-[11px]">Schedule</span>
                        <strong className="font-medium text-lume-ink text-sm">
                          {formatDisplayDate(date)} · {time}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label
                        htmlFor="book-page-name-input"
                        className="block text-[11px] uppercase tracking-widest font-sans font-semibold text-lume-taupe"
                      >
                        Full Name *
                      </label>
                      <input
                        id="book-page-name-input"
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Clara Dupont"
                        className="w-full px-4 py-3 bg-white border-b-2 border-lume-ink/20 focus:border-lume-gold rounded-t-md text-lume-ink font-sans text-sm focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="book-page-email-input"
                        className="block text-[11px] uppercase tracking-widest font-sans font-semibold text-lume-taupe"
                      >
                        Email Address *
                      </label>
                      <input
                        id="book-page-email-input"
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="clara@example.com"
                        className="w-full px-4 py-3 bg-white border-b-2 border-lume-ink/20 focus:border-lume-gold rounded-t-md text-lume-ink font-sans text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label
                        htmlFor="book-page-phone-input"
                        className="block text-[11px] uppercase tracking-widest font-sans font-semibold text-lume-taupe"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="book-page-phone-input"
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-white border-b-2 border-lume-ink/20 focus:border-lume-gold rounded-t-md text-lume-ink font-sans text-sm focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="book-page-notes-input"
                        className="block text-[11px] uppercase tracking-widest font-sans font-semibold text-lume-taupe"
                      >
                        Notes / Hair Goals (Optional)
                      </label>
                      <input
                        id="book-page-notes-input"
                        type="text"
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        placeholder="e.g. Previous box dye / wedding event"
                        className="w-full px-4 py-3 bg-white border-b-2 border-lume-ink/20 focus:border-lume-gold rounded-t-md text-lume-ink font-sans text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-sans text-lume-taupe">
                    <ShieldCheck className="w-4 h-4 text-lume-gold shrink-0" />
                    <span>Your information is held in strict privacy for salon communications only.</span>
                  </div>

                  <div className="pt-6 border-t border-lume-ink/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="group px-4 py-2.5 text-xs font-sans text-lume-taupe hover:text-lume-ink inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                      <span>Back to Schedule</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group px-8 py-3.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium rounded-lg inline-flex items-center gap-2 hover:bg-lume-brown transition-colors disabled:opacity-50 shadow-sm"
                    >
                      {isSubmitting ? (
                        <span>Reserving Session…</span>
                      ) : (
                        <>
                          <span>Confirm Reservation</span>
                          <Check className="w-4 h-4 text-lume-gold" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 5: Success Confirmation */}
              {step === 5 && (
                <div className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 bg-lume-gold/20 text-lume-gold rounded-full mx-auto flex items-center justify-center border border-lume-gold">
                    <CheckCircle2 className="w-8 h-8 text-lume-gold" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
                      Appointment Reserved
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-light text-lume-ink">
                      We look forward to welcoming you.
                    </h2>
                    <p className="text-sm font-sans text-lume-ink/80 max-w-md mx-auto leading-relaxed">
                      A reservation for <strong className="font-medium text-lume-ink">{selectedService.name}</strong> on{" "}
                      <strong className="font-medium text-lume-ink">{formatDisplayDate(date)} at {time}</strong> has been logged in demo mode.
                    </p>
                  </div>

                  <div className="bg-[#FAF7F2] p-5 rounded-xl border border-lume-ink/10 max-w-md mx-auto text-xs font-sans text-lume-taupe text-left space-y-1">
                    <p className="font-medium text-lume-ink">Studio Location:</p>
                    <p>{siteConfig.locationDetails}</p>
                    <p className="text-lume-ink/60 pt-2">
                      * Demo Mode: No real appointment backend is connected.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-8 py-3.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium rounded-lg hover:bg-lume-brown transition-colors shadow-sm"
                    >
                      Book Another Service
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
