"use client";

import React, { useState, useEffect } from "react";
import { useBooking } from "@/context/BookingContext";
import { servicesData } from "@/data/services";
import { stylistsData } from "@/data/stylists";
import { siteConfig } from "@/data/site";
import { X, Check, Calendar, Clock, User, Scissors, ArrowRight, ArrowLeft } from "lucide-react";

export function BookingModal() {
  const { isOpen, selectedServiceId, selectedStylistId, closeBooking } = useBooking();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [serviceId, setServiceId] = useState<string>("");
  const [stylistId, setStylistId] = useState<string>("any");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientNotes, setClientNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync context preselection when opened
  useEffect(() => {
    if (isOpen) {
      if (selectedServiceId) setServiceId(selectedServiceId);
      else if (!serviceId) setServiceId(servicesData[0].id);

      if (selectedStylistId) setStylistId(selectedStylistId);
      else if (!stylistId) setStylistId("any");

      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split("T")[0]);
      setTime("11:00 AM");
      setStep(1);
      setIsSubmitting(false);
    }
  }, [isOpen, selectedServiceId, selectedStylistId]);

  if (!isOpen) return null;

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
      setStep(5); // Confirmation
    }, 600);
  };

  const handleReset = () => {
    setStep(1);
    closeBooking();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171614]/75 backdrop-blur-md transition-opacity"
        onClick={closeBooking}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-lume-ivory text-lume-ink shadow-2xl border border-lume-ink/10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-lume-ink/10 bg-lume-surface">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
              Online Appointment Reservation
            </span>
            <h2 id="booking-title" className="font-serif text-2xl sm:text-3xl text-lume-ink font-light">
              Reserve Your Ritual
            </h2>
          </div>
          <button
            onClick={closeBooking}
            className="p-2 text-lume-ink hover:text-lume-gold transition-colors focus-visible:ring-2 focus-visible:ring-lume-gold"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (Steps 1 to 4) */}
        {step < 5 && (
          <div className="px-6 sm:px-8 pt-4 pb-2 border-b border-lume-ink/5 bg-lume-surface/50">
            <div className="flex items-center justify-between text-xs font-sans text-lume-taupe pb-2">
              <span className={step >= 1 ? "text-lume-ink font-medium" : ""}>01 Service</span>
              <span className={step >= 2 ? "text-lume-ink font-medium" : ""}>02 Artist</span>
              <span className={step >= 3 ? "text-lume-ink font-medium" : ""}>03 Date & Time</span>
              <span className={step >= 4 ? "text-lume-ink font-medium" : ""}>04 Details</span>
            </div>
            <div className="w-full bg-lume-stone/40 h-1 relative overflow-hidden">
              <div
                className="bg-lume-gold h-full transition-all duration-300 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-light text-lume-ink">
                  Select Your Service
                </h3>
                <p className="text-xs text-lume-taupe font-sans">
                  Choose the ritual or transformation for your upcoming appointment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {servicesData.map((s) => {
                  const isSelected = serviceId === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceId(s.id)}
                      className={`text-left p-4 border transition-all duration-200 relative flex flex-col justify-between ${
                        isSelected
                          ? "border-lume-ink bg-white shadow-sm"
                          : "border-lume-ink/10 bg-transparent hover:border-lume-taupe"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-medium">
                            {s.category}
                          </span>
                          <span className="text-xs font-sans text-lume-taupe">
                            {s.duration}
                          </span>
                        </div>
                        <h4 className="font-serif text-base text-lume-ink font-medium">
                          {s.name}
                        </h4>
                        <p className="text-xs text-lume-ink/70 font-sans mt-1 line-clamp-2">
                          {s.shortDescription}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-lume-ink/5 flex items-center justify-between text-xs font-sans">
                        <span className="font-medium text-lume-ink">{s.samplePrice}</span>
                        {isSelected && <Check className="w-4 h-4 text-lume-gold" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center gap-2 hover:bg-lume-brown transition-colors"
                >
                  <span>Select Artist</span>
                  <ArrowRight className="w-4 h-4 text-lume-gold" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Stylist */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-light text-lume-ink">
                  Select Your Preferred Artist
                </h3>
                <p className="text-xs text-lume-taupe font-sans">
                  Choose a dedicated specialist or select first available.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Any Available Option */}
                <button
                  type="button"
                  onClick={() => setStylistId("any")}
                  className={`text-left p-4 border transition-all duration-200 ${
                    stylistId === "any"
                      ? "border-lume-ink bg-white shadow-sm"
                      : "border-lume-ink/10 bg-transparent hover:border-lume-taupe"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-medium">
                      Flexible
                    </span>
                    {stylistId === "any" && <Check className="w-4 h-4 text-lume-gold" />}
                  </div>
                  <h4 className="font-serif text-base text-lume-ink font-medium">
                    First Available Specialist
                  </h4>
                  <p className="text-xs text-lume-ink/70 font-sans mt-1">
                    Matches you with the next best expert for your selected service.
                  </p>
                </button>

                {/* Specific Stylists */}
                {stylistsData.map((st) => {
                  const isSelected = stylistId === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setStylistId(st.id)}
                      className={`text-left p-4 border transition-all duration-200 ${
                        isSelected
                          ? "border-lume-ink bg-white shadow-sm"
                          : "border-lume-ink/10 bg-transparent hover:border-lume-taupe"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-medium">
                          {st.role}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-lume-gold" />}
                      </div>
                      <h4 className="font-serif text-base text-lume-ink font-medium">
                        {st.name}
                      </h4>
                      <p className="text-xs text-lume-ink/70 font-sans mt-1">
                        {st.specialty}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-sans text-lume-taupe hover:text-lume-ink inline-flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center gap-2 hover:bg-lume-brown transition-colors"
                >
                  <span>Select Date & Time</span>
                  <ArrowRight className="w-4 h-4 text-lume-gold" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Date and Time */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-light text-lume-ink">
                  Select Date & Time
                </h3>
                <p className="text-xs text-lume-taupe font-sans">
                  Appointments are reserved with generous consultation buffer time.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label htmlFor="booking-date" className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-2">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      id="booking-date"
                      type="date"
                      value={date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white border border-lume-ink/15 text-lume-ink font-sans text-sm focus-visible:ring-2 focus-visible:ring-lume-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-2">
                    Available Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {availableTimeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`py-3 px-2 text-xs font-sans text-center border transition-colors ${
                          time === slot
                            ? "bg-lume-ink text-lume-ivory border-lume-ink font-medium"
                            : "bg-white text-lume-ink border-lume-ink/10 hover:border-lume-taupe"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs font-sans text-lume-taupe hover:text-lume-ink inline-flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center gap-2 hover:bg-lume-brown transition-colors"
                >
                  <span>Guest Details</span>
                  <ArrowRight className="w-4 h-4 text-lume-gold" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Client Info Form */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-light text-lume-ink">
                  Your Contact Details
                </h3>
                <p className="text-xs text-lume-taupe font-sans">
                  We will send a calendar invitation and appointment confirmation.
                </p>
              </div>

              <div className="bg-lume-stone/20 p-4 border border-lume-ink/10 text-xs font-sans space-y-1.5 mb-4">
                <p className="font-semibold text-lume-ink">Appointment Summary:</p>
                <p className="text-lume-ink/80">
                  <span className="text-lume-taupe">Service:</span> {selectedService.name} ({selectedService.duration})
                </p>
                <p className="text-lume-ink/80">
                  <span className="text-lume-taupe">Stylist:</span> {selectedStylist ? selectedStylist.name : "First Available Specialist"}
                </p>
                <p className="text-lume-ink/80">
                  <span className="text-lume-taupe">Schedule:</span> {date} at {time}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="client-name" className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Clara Dupont"
                    className="w-full px-4 py-2.5 bg-white border border-lume-ink/15 text-lume-ink font-sans text-sm focus-visible:ring-2 focus-visible:ring-lume-gold"
                  />
                </div>
                <div>
                  <label htmlFor="client-email" className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="clara@example.com"
                    className="w-full px-4 py-2.5 bg-white border border-lume-ink/15 text-lume-ink font-sans text-sm focus-visible:ring-2 focus-visible:ring-lume-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="client-phone" className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 bg-white border border-lume-ink/15 text-lume-ink font-sans text-sm focus-visible:ring-2 focus-visible:ring-lume-gold"
                  />
                </div>
                <div>
                  <label htmlFor="client-notes" className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-1.5">
                    Notes or Hair Goals (Optional)
                  </label>
                  <input
                    id="client-notes"
                    type="text"
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="e.g. Bringing inspiration photo"
                    className="w-full px-4 py-2.5 bg-white border border-lume-ink/15 text-lume-ink font-sans text-sm focus-visible:ring-2 focus-visible:ring-lume-gold"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 text-xs font-sans text-lume-taupe hover:text-lume-ink inline-flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center gap-2 hover:bg-lume-brown transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirming Reservation…</span>
                  ) : (
                    <>
                      <span>Complete Reservation</span>
                      <Check className="w-4 h-4 text-lume-gold" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Success Confirmation */}
          {step === 5 && (
            <div className="text-center py-6 sm:py-8 space-y-5 animate-fadeIn">
              <div className="w-14 h-14 bg-lume-gold/20 text-lume-ink rounded-full mx-auto flex items-center justify-center border border-lume-gold">
                <Check className="w-7 h-7 text-lume-gold" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-medium">
                  Reservation Received
                </span>
                <h3 className="font-serif text-3xl font-light text-lume-ink">
                  We look forward to welcoming you.
                </h3>
                <p className="text-sm font-sans text-lume-ink/75 max-w-md mx-auto">
                  A reservation request for <strong className="font-medium text-lume-ink">{selectedService.name}</strong> on{" "}
                  <strong className="font-medium text-lume-ink">{date} at {time}</strong> has been logged in demo mode.
                </p>
              </div>

              <div className="bg-lume-surface p-4 border border-lume-ink/10 max-w-md mx-auto text-xs font-sans text-lume-taupe text-left space-y-1">
                <p className="font-medium text-lume-ink">Studio Location:</p>
                <p>{siteConfig.locationDetails}</p>
                <p className="text-lume-ink/60 pt-1">
                  * Demo Mode: No real appointment was placed or charge incurred.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-3 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium hover:bg-lume-brown transition-colors"
                >
                  Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
