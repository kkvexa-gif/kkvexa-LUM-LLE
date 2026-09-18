"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

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
      errs.message = "Please provide a brief description (at least 10 characters).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API request in demo mode
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setValues({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 800);
  };

  if (isSuccess) {
    return (
      <div className="bg-lume-surface border border-lume-gold/40 p-8 sm:p-10 text-center space-y-4 shadow-sm animate-fadeIn">
        <div className="w-12 h-12 bg-lume-gold/20 text-lume-gold rounded-full mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-lume-gold" />
        </div>
        <div className="space-y-1.5">
          <h3 className="font-serif text-2xl sm:text-3xl text-lume-ink font-light">
            Thank you — your message has been received.
          </h3>
          <p className="text-xs sm:text-sm font-sans text-lume-taupe max-w-md mx-auto leading-relaxed">
            Our concierge team will review your inquiry and respond within one business day.
          </p>
        </div>
        <div className="pt-2">
          <p className="text-[11px] font-sans text-lume-taupe/80 italic">
            * Demo Mode: Form submission simulated successfully.
          </p>
        </div>
        <div className="pt-3">
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="px-6 py-2.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium hover:bg-lume-brown transition-colors"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 bg-white p-6 sm:p-8 lg:p-10 border border-lume-ink/10 shadow-sm"
    >
      <div className="space-y-1 pb-2">
        <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
          Inquiries & Consultations
        </span>
        <h3 className="font-serif text-2xl font-light text-lume-ink">
          Send Us a Message
        </h3>
      </div>

      {/* Name Field */}
      <div>
        <label
          htmlFor="contact-name"
          className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-2 font-medium"
        >
          Name <span className="text-lume-gold">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          placeholder="e.g. Eleanor Vance"
          className={`w-full px-4 py-3 bg-lume-surface border font-sans text-sm text-lume-ink transition-colors focus-visible:ring-2 focus-visible:ring-lume-gold ${
            errors.name ? "border-red-500 bg-red-50/20" : "border-lume-ink/15"
          }`}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-2 font-medium"
        >
          Email <span className="text-lume-gold">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="eleanor@example.com"
          className={`w-full px-4 py-3 bg-lume-surface border font-sans text-sm text-lume-ink transition-colors focus-visible:ring-2 focus-visible:ring-lume-gold ${
            errors.email ? "border-red-500 bg-red-50/20" : "border-lume-ink/15"
          }`}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="contact-subject"
          className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-2 font-medium"
        >
          Subject <span className="text-lume-gold">*</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          placeholder="e.g. First-time Balayage Consultation"
          className={`w-full px-4 py-3 bg-lume-surface border font-sans text-sm text-lume-ink transition-colors focus-visible:ring-2 focus-visible:ring-lume-gold ${
            errors.subject ? "border-red-500 bg-red-50/20" : "border-lume-ink/15"
          }`}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.subject}</span>
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs uppercase tracking-widest font-sans text-lume-taupe mb-2 font-medium"
        >
          Your message <span className="text-lume-gold">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Tell us about your hair history, upcoming event, or specific questions…"
          className={`w-full px-4 py-3 bg-lume-surface border font-sans text-sm text-lume-ink transition-colors focus-visible:ring-2 focus-visible:ring-lume-gold resize-none ${
            errors.message ? "border-red-500 bg-red-50/20" : "border-lume-ink/15"
          }`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center justify-center gap-2.5 hover:bg-lume-brown transition-colors disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-lume-gold"
        >
          {isSubmitting ? (
            <span>Sending…</span>
          ) : (
            <>
              <span>Send</span>
              <Send className="w-3.5 h-3.5 text-lume-gold" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
