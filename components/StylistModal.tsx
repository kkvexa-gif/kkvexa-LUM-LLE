"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Stylist } from "@/data/stylists";
import { useBooking } from "@/context/BookingContext";
import { X, Check, Calendar, ArrowRight, Award } from "lucide-react";

interface StylistModalProps {
  stylist: Stylist | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StylistModal({ stylist, isOpen, onClose }: StylistModalProps) {
  const { openBooking } = useBooking();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
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

  if (!isOpen || !stylist) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stylist-modal-name"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171614]/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Box */}
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl bg-lume-ivory text-lume-ink shadow-2xl border border-lume-ink/10 overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn"
      >
        {/* Header Close */}
        <div className="absolute top-4 right-4 z-20">
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-2.5 bg-lume-ivory/90 hover:bg-lume-ivory text-lume-ink hover:text-lume-gold transition-colors focus-visible:ring-2 focus-visible:ring-lume-gold rounded-full shadow-md"
            aria-label="Close stylist profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Portrait Image Column */}
            <div className="md:col-span-5 relative aspect-[3/4] md:aspect-auto min-h-[320px] bg-lume-stone/30">
              <Image
                src={stylist.portrait}
                alt={stylist.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-lume-ink/80 text-lume-ivory text-[10px] uppercase tracking-widest font-sans font-medium">
                Demo Profile
              </div>
            </div>

            {/* Profile Narrative Details */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-lume-gold font-sans font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  <span>{stylist.role}</span>
                  <span className="text-lume-taupe">• {stylist.experience}</span>
                </div>
                <h2 id="stylist-modal-name" className="font-serif text-3xl sm:text-4xl text-lume-ink font-light mt-1">
                  {stylist.name}
                </h2>
                <p className="text-sm font-sans font-medium text-lume-taupe mt-1">
                  Specialty: {stylist.specialty}
                </p>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-lume-taupe font-sans font-semibold">
                  About the Artist
                </p>
                <p className="text-sm font-sans text-lume-ink/80 leading-relaxed">
                  {stylist.bio}
                </p>
              </div>

              {/* Philosophy Quote */}
              <div className="p-4 bg-lume-surface border-l-2 border-lume-gold text-xs font-serif italic text-lume-ink/90 leading-relaxed">
                &ldquo;{stylist.philosophy}&rdquo;
              </div>

              {/* Signature Services */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-lume-taupe font-sans font-semibold">
                  Signature Services
                </p>
                <ul className="space-y-1.5 text-xs font-sans text-lume-ink/80">
                  {stylist.signatureServices.map((service, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-lume-gold shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schedule and CTA */}
              <div className="pt-4 border-t border-lume-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs font-sans text-lume-taupe">
                  <div className="flex items-center gap-1.5 text-lume-ink">
                    <Calendar className="w-3.5 h-3.5 text-lume-gold" />
                    <span className="font-medium">Studio Availability:</span>
                  </div>
                  <p className="mt-0.5">{stylist.scheduleSummary}</p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    openBooking({ stylistId: stylist.id });
                  }}
                  className="px-6 py-3 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center justify-center gap-2 hover:bg-lume-brown transition-colors"
                >
                  <span>Book with {stylist.name.split(" ")[0]}</span>
                  <ArrowRight className="w-4 h-4 text-lume-gold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
