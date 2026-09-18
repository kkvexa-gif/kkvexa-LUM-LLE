"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!values.name.trim()) {
      errs.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!values.subject.trim()) {
      errs.subject = "Please enter a subject.";
    }

    if (!values.message.trim()) {
      errs.message = "Please enter your message.";
    } else if (values.message.trim().length < 10) {
      errs.message = "Please provide at least 10 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate concierge dispatch in demo mode
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setValues({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 900);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="py-10 px-6 sm:px-8 border border-lume-gold/30 bg-lume-surface/60 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-lume-gold/15 flex items-center justify-center text-lume-gold">
                <Check className="w-4 h-4" />
              </div>
              <span className="text-[11px] uppercase tracking-widest font-sans font-semibold text-lume-gold">
                Inquiry Logged
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-3xl sm:text-4xl text-lume-ink font-light leading-tight">
                Thank you — your message has been received.
              </h3>
              <p className="text-sm font-sans text-lume-taupe leading-relaxed max-w-lg">
                Our salon concierge will review your inquiry and be in touch within one business day.
              </p>
            </div>

            <div className="pt-2 text-xs font-sans text-lume-taupe/80 italic border-t border-lume-ink/10">
              * Demo Mode: Inquiry simulation completed. Ready for email gateway integration.
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-semibold text-lume-ink hover:text-lume-gold transition-colors pb-1 border-b border-lume-ink/30 hover:border-lume-gold"
              >
                <span>Send Another Inquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-lume-gold" />
              </button>
            </div>
          </motion.div>
        ) : (
          <form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-10"
          >
            {/* Field: Name */}
            <div className="relative group">
              <label
                htmlFor="contact-name"
                className={`block text-[11px] uppercase tracking-widest font-sans font-medium transition-colors duration-300 ${
                  focusedField === "name"
                    ? "text-lume-gold"
                    : errors.name
                    ? "text-red-600"
                    : "text-lume-taupe"
                }`}
              >
                Your Name <span className="text-lume-gold text-xs">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="Eleanor Vance"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="w-full pt-3 pb-2.5 bg-transparent border-b border-lume-ink/20 text-base sm:text-lg font-sans text-lume-ink placeholder-lume-taupe/40 focus:outline-none transition-colors duration-300"
              />
              {/* Animated underline focus indicator */}
              <div
                className={`h-[1.5px] w-full bg-lume-gold transition-transform duration-300 origin-left -mt-[1.5px] ${
                  focusedField === "name" ? "scale-x-100" : "scale-x-0"
                }`}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-xs text-red-600 font-sans flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Field: Email */}
            <div className="relative group">
              <label
                htmlFor="contact-email"
                className={`block text-[11px] uppercase tracking-widest font-sans font-medium transition-colors duration-300 ${
                  focusedField === "email"
                    ? "text-lume-gold"
                    : errors.email
                    ? "text-red-600"
                    : "text-lume-taupe"
                }`}
              >
                Email Address <span className="text-lume-gold text-xs">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="eleanor@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="w-full pt-3 pb-2.5 bg-transparent border-b border-lume-ink/20 text-base sm:text-lg font-sans text-lume-ink placeholder-lume-taupe/40 focus:outline-none transition-colors duration-300"
              />
              <div
                className={`h-[1.5px] w-full bg-lume-gold transition-transform duration-300 origin-left -mt-[1.5px] ${
                  focusedField === "email" ? "scale-x-100" : "scale-x-0"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-xs text-red-600 font-sans flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Field: Subject */}
            <div className="relative group">
              <label
                htmlFor="contact-subject"
                className={`block text-[11px] uppercase tracking-widest font-sans font-medium transition-colors duration-300 ${
                  focusedField === "subject"
                    ? "text-lume-gold"
                    : errors.subject
                    ? "text-red-600"
                    : "text-lume-taupe"
                }`}
              >
                Subject <span className="text-lume-gold text-xs">*</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={values.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. Balayage Consultation & Color Matching"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className="w-full pt-3 pb-2.5 bg-transparent border-b border-lume-ink/20 text-base sm:text-lg font-sans text-lume-ink placeholder-lume-taupe/40 focus:outline-none transition-colors duration-300"
              />
              <div
                className={`h-[1.5px] w-full bg-lume-gold transition-transform duration-300 origin-left -mt-[1.5px] ${
                  focusedField === "subject" ? "scale-x-100" : "scale-x-0"
                }`}
              />
              {errors.subject && (
                <p id="subject-error" className="mt-2 text-xs text-red-600 font-sans flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.subject}</span>
                </p>
              )}
            </div>

            {/* Field: Message */}
            <div className="relative group">
              <label
                htmlFor="contact-message"
                className={`block text-[11px] uppercase tracking-widest font-sans font-medium transition-colors duration-300 ${
                  focusedField === "message"
                    ? "text-lume-gold"
                    : errors.message
                    ? "text-red-600"
                    : "text-lume-taupe"
                }`}
              >
                Your Message <span className="text-lume-gold text-xs">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={values.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder="Tell us what you are imagining — hair history, upcoming event, or specific styling questions…"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="w-full pt-3 pb-2 bg-transparent border-b border-lume-ink/20 text-base sm:text-lg font-sans text-lume-ink placeholder-lume-taupe/40 focus:outline-none transition-colors duration-300 resize-none leading-relaxed"
              />
              <div
                className={`h-[1.5px] w-full bg-lume-gold transition-transform duration-300 origin-left -mt-[1.5px] ${
                  focusedField === "message" ? "scale-x-100" : "scale-x-0"
                }`}
              />
              {errors.message && (
                <p id="message-error" className="mt-2 text-xs text-red-600 font-sans flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Editorial Send Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center gap-3 text-xs uppercase tracking-widest font-sans font-semibold text-lume-ink hover:text-lume-gold transition-colors duration-300 py-2.5 pb-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2 text-lume-taupe">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-lume-gold" />
                    <span>Sending…</span>
                  </span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowUpRight className="w-4 h-4 text-lume-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
                {/* Minimal underline with expanding hover state */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-lume-ink/40 group-hover:bg-lume-gold group-hover:h-[1.5px] transition-all duration-300" />
              </button>

              <span className="text-[11px] font-sans text-lume-taupe/70">
                Direct concierge response within 24h
              </span>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
