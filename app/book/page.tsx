"use client";

import React, { useState } from "react";
import { servicesData } from "@/data/services";
import { stylistsData } from "@/data/stylists";
import { siteConfig } from "@/data/site";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Check, Calendar, Clock, User, Scissors, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

export default function BookPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(5);
    }, 700);
  };

  return (
    <div className="pt-28 pb-24 space-y-12 sm:space-y-16">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12">
        <ScrollReveal className="max-w-3xl space-y-6" duration={0.8}>
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-8 bg-lume-gold" />
            <span className="text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
              Online Reservations
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-lume-ink tracking-tight leading-tightEditorial text-balance">
            Let&apos;s make time <br />
            <span className="italic text-lume-taupe">for your next look.</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-lume-ink/75 leading-relaxed text-balance">
            Follow the four simple steps below to reserve your custom hair appointment or diagnostic consultation.
          </p>
        </ScrollReveal>
      </section>

      {/* Main Multi-Step Booking Flow */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8">
        <ScrollReveal delay={0.15}>
          <div className="bg-white border border-lume-ink/10 shadow-sm overflow-hidden">
            {/* Progress Indicator */}
            {step < 5 && (
              <div className="px-6 sm:px-10 pt-6 pb-4 border-b border-lume-ink/5 bg-lume-surface">
                <div className="flex items-center justify-between text-xs font-sans text-lume-taupe pb-3">
                  <span className={step >= 1 ? "text-lume-ink font-semibold" : ""}>01 Service</span>
                  <span className={step >= 2 ? "text-lume-ink font-semibold" : ""}>02 Artist</span>
                  <span className={step >= 3 ? "text-lume-ink font-semibold" : ""}>03 Schedule</span>
                  <span className={step >= 4 ? "text-lume-ink font-semibold" : ""}>04 Details</span>
                </div>
                <div className="w-full bg-lume-stone/40 h-1.5 relative overflow-hidden">
                  <div
                    className="bg-lume-gold h-full transition-all duration-300 ease-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Form Content */}
            <div className="p-6 sm:p-10">
              {/* STEP 1: Select Service */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-lume-ink">
                      Select Your Service
                    </h2>
                    <p className="text-xs sm:text-sm text-lume-taupe font-sans">
                      Choose the ritual or service for your session.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {servicesData.map((s) => {
                      const isSelected = serviceId === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setServiceId(s.id)}
                          className={`text-left p-5 border transition-all duration-200 relative flex flex-col justify-between ${
                            isSelected
                              ? "border-lume-ink bg-lume-surface shadow-sm"
                              : "border-lume-ink/10 bg-white hover:border-lume-taupe"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
                                {s.category}
                              </span>
                              <span className="text-xs font-sans text-lume-taupe">
                                {s.duration}
                              </span>
                            </div>
                            <h3 className="font-serif text-lg text-lume-ink font-medium">
                              {s.name}
                            </h3>
                            <p className="text-xs text-lume-ink/70 font-sans mt-1 leading-relaxed">
                              {s.shortDescription}
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-lume-ink/5 flex items-center justify-between text-xs font-sans">
                            <span className="font-medium text-lume-ink">{s.samplePrice}</span>
                            {isSelected && <Check className="w-4 h-4 text-lume-gold" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-8 py-3.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center gap-2 hover:bg-lume-brown transition-colors"
                    >
                      <span>Choose Artist</span>
                      <ArrowRight className="w-4 h-4 text-lume-gold" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Select Stylist */}
              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-lume-ink">
                      Select Your Specialist
                    </h2>
                    <p className="text-xs sm:text-sm text-lume-taupe font-sans">
                      Choose an artist or select the first available appointment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setStylistId("any")}
                      className={`text-left p-5 border transition-all duration-200 ${
                        stylistId === "any"
                          ? "border-lume-ink bg-lume-surface shadow-sm"
                          : "border-lume-ink/10 bg-white hover:border-lume-taupe"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
                          Flexible
                        </span>
                        {stylistId === "any" && <Check className="w-4 h-4 text-lume-gold" />}
                      </div>
                      <h3 className="font-serif text-lg text-lume-ink font-medium">
                        First Available Specialist
                      </h3>
                      <p className="text-xs text-lume-ink/70 font-sans mt-1">
                        Our concierge matches you with the best specialist for your hair type.
                      </p>
                    </button>

                    {stylistsData.map((st) => {
                      const isSelected = stylistId === st.id;
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setStylistId(st.id)}
                          className={`text-left p-5 border transition-all duration-200 ${
                            isSelected
                              ? "border-lume-ink bg-lume-surface shadow-sm"
                              : "border-lume-ink/10 bg-white hover:border-lume-taupe"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
                              {st.role}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-lume-gold" />}
                          </div>
                          <h3 className="font-serif text-lg text-lume-ink font-medium">
                            {st.name}
                          </h3>
                          <p className="text-xs text-lume-ink/70 font-sans mt-1">
                            {st.specialty}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 text-xs font-sans text-lume-taupe hover:text-lume-ink inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Services</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-8 py-3.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center gap-2 hover:bg-lume-brown transition-colors"
                    >
                      <span>Select Date & Time</span>
                      <ArrowRight className="w-4 h-4 text-lume-gold" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Date and Time */}
              {step === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-lume-ink">
                      Select Date & Time
                    </h2>
                    <p className="text-xs sm:text-sm text-lume-taupe font-sans">
                      Pick your preferred session day and time window.
                    </p>
                  </div>

                  <div className="space-y-5 pt-2">
                    <div>
                      <label htmlFor="book-page-date-input" className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-2">
                        Appointment Date
                      </label>
                      <input
                        id="book-page-date-input"
                        type="date"
                        value={date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-lume-surface border border-lume-ink/15 text-lume-ink font-sans text-sm focus-visible:ring-2 focus-visible:ring-lume-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-2">
                        Available Time Slots
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {availableTimeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={`py-3.5 px-3 text-xs font-sans text-center border transition-colors ${
                              time === slot
                                ? "bg-lume-ink text-lume-ivory border-lume-ink font-medium shadow-sm"
                                : "bg-lume-surface text-lume-ink border-lume-ink/10 hover:border-lume-taupe"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 text-xs font-sans text-lume-taupe hover:text-lume-ink inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Artists</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-8 py-3.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center gap-2 hover:bg-lume-brown transition-colors"
                    >
                      <span>Enter Guest Details</span>
                      <ArrowRight className="w-4 h-4 text-lume-gold" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Client Info Form */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-lume-ink">
                      Client Details
                    </h2>
                    <p className="text-xs sm:text-sm text-lume-taupe font-sans">
                      Please provide your contact info for appointment confirmation.
                    </p>
                  </div>

                  <div className="bg-lume-surface p-5 border border-lume-ink/10 text-xs font-sans space-y-2">
                    <p className="font-semibold text-lume-ink text-sm">Summary of Selection:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-lume-ink/80 pt-1">
                      <p><span className="text-lume-taupe">Service:</span> {selectedService.name}</p>
                      <p><span className="text-lume-taupe">Artist:</span> {selectedStylist ? selectedStylist.name : "First Available"}</p>
                      <p><span className="text-lume-taupe">Time:</span> {date} at {time}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="book-page-name-input" className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="book-page-name-input"
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Clara Dupont"
                        className="w-full px-4 py-3 bg-lume-surface border border-lume-ink/15 text-lume-ink font-sans text-sm focus-visible:ring-2 focus-visible:ring-lume-gold"
                      />
                    </div>
                    <div>
                      <label htmlFor="book-page-email-input" className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="book-page-email-input"
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="clara@example.com"
                        className="w-full px-4 py-3 bg-lume-surface border border-lume-ink/15 text-lume-ink font-sans text-sm focus-visible:ring-2 focus-visible:ring-lume-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="book-page-phone-input" className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        id="book-page-phone-input"
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-lume-surface border border-lume-ink/15 text-lume-ink font-sans text-sm focus-visible:ring-2 focus-visible:ring-lume-gold"
                      />
                    </div>
                    <div>
                      <label htmlFor="book-page-notes-input" className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-1.5">
                        Notes / Inspiration (Optional)
                      </label>
                      <input
                        id="book-page-notes-input"
                        type="text"
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        placeholder="e.g. Previous box dye / wedding event"
                        className="w-full px-4 py-3 bg-lume-surface border border-lume-ink/15 text-lume-ink font-sans text-sm focus-visible:ring-2 focus-visible:ring-lume-gold"
                      />
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-4 py-2.5 text-xs font-sans text-lume-taupe hover:text-lume-ink inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Schedule</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center gap-2 hover:bg-lume-brown transition-colors disabled:opacity-50"
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
                <div className="text-center py-10 space-y-6 animate-fadeIn">
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
                      <strong className="font-medium text-lume-ink">{date} at {time}</strong> has been logged in demo mode.
                    </p>
                  </div>

                  <div className="bg-lume-surface p-5 border border-lume-ink/10 max-w-md mx-auto text-xs font-sans text-lume-taupe text-left space-y-1">
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
                      className="px-8 py-3.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium hover:bg-lume-brown transition-colors"
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
