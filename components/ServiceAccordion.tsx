"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ServiceItem } from "@/data/services";
import { useBooking } from "@/context/BookingContext";
import { Plus, Minus, Check, Clock, DollarSign, ArrowUpRight } from "lucide-react";

interface ServiceAccordionProps {
  services: ServiceItem[];
}

export function ServiceAccordion({ services }: ServiceAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(services[0]?.id || null);
  const { openBooking } = useBooking();

  const toggleService = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="divide-y divide-lume-ink/10 border-t border-b border-lume-ink/10">
      {services.map((service) => {
        const isExpanded = expandedId === service.id;

        return (
          <div
            key={service.id}
            className={`transition-colors duration-300 ${
              isExpanded ? "bg-lume-surface/80" : "bg-transparent hover:bg-lume-surface/40"
            }`}
          >
            {/* Clickable Header Row */}
            <button
              onClick={() => toggleService(service.id)}
              className="w-full py-6 sm:py-8 px-4 sm:px-6 flex items-center justify-between text-left focus-visible:ring-2 focus-visible:ring-lume-gold"
              aria-expanded={isExpanded}
              aria-controls={`service-desc-${service.id}`}
            >
              <div className="flex items-baseline gap-4 sm:gap-8">
                <span className="font-serif text-sm text-lume-taupe w-6">
                  {service.number}
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-medium">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-lume-ink font-light mt-0.5">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-lume-ink/70 mt-1 max-w-xl">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0 pl-4">
                <div className="hidden sm:flex flex-col items-end text-right font-sans">
                  <span className="text-xs uppercase tracking-wider text-lume-taupe">
                    {service.duration}
                  </span>
                  <span className="text-sm font-medium text-lume-ink">
                    {service.samplePrice}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-lume-ink/15 flex items-center justify-center text-lume-ink">
                  {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </div>
            </button>

            {/* Expanded Content Panel */}
            {isExpanded && (
              <div
                id={`service-desc-${service.id}`}
                className="px-4 sm:px-6 pb-8 pt-2 animate-fadeIn"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-lume-ink/5">
                  {/* Detailed Description */}
                  <div className="lg:col-span-6 space-y-4">
                    <p className="text-sm font-sans text-lume-ink/80 leading-relaxed">
                      {service.fullDescription}
                    </p>

                    <div className="space-y-2 pt-2">
                      <p className="text-xs uppercase tracking-widest text-lume-taupe font-sans font-semibold">
                        Every Service Includes:
                      </p>
                      <ul className="space-y-1.5 text-xs font-sans text-lume-ink/80">
                        {service.includes.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-lume-gold shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => openBooking({ serviceId: service.id })}
                        className="px-6 py-3 bg-lume-ink text-lume-ivory text-xs uppercase tracking-widest font-sans font-medium inline-flex items-center gap-2 hover:bg-lume-brown transition-colors"
                      >
                        <span>Reserve Appointment</span>
                        <ArrowUpRight className="w-4 h-4 text-lume-gold" />
                      </button>
                      <span className="text-xs text-lume-taupe font-sans">
                        Sample Pricing: {service.samplePrice}
                      </span>
                    </div>
                  </div>

                  {/* Imagery Side */}
                  <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[2/1] lg:aspect-[16/9] overflow-hidden bg-lume-stone/20 border border-lume-ink/10">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-lume-ink/80 text-lume-ivory text-[9px] uppercase tracking-widest font-sans">
                      LUMÉ Atelier Finish
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
