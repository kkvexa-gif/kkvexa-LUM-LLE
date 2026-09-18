"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceItem, servicesData } from "@/data/services";
import { useBooking } from "@/context/BookingContext";
import { ArrowUpRight } from "lucide-react";

export function ServiceList() {
  const [activeService, setActiveService] = useState<ServiceItem>(servicesData[0]);
  const [isHovering, setIsHovering] = useState(false);
  const { openBooking } = useBooking();

  // Signature 5 services for homepage
  const signatureServices = servicesData.filter((s) => s.isSignature);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Services Row List */}
        <div className="lg:col-span-7 divide-y divide-lume-ink/10 border-t border-b border-lume-ink/10">
          {signatureServices.map((service) => {
            const isActive = activeService.id === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => {
                  setActiveService(service);
                  setIsHovering(true);
                }}
                onMouseLeave={() => setIsHovering(false)}
                className="group py-6 sm:py-8 transition-colors duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                onClick={() => openBooking({ serviceId: service.id })}
              >
                <div className="flex items-baseline gap-6 sm:gap-8">
                  <span className="font-serif text-sm sm:text-base text-lume-taupe group-hover:text-lume-gold transition-colors duration-300 w-6">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-lume-ink group-hover:text-lume-gold group-hover:translate-x-2 transition-all duration-300">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-lume-ink/70 mt-1 max-w-md group-hover:text-lume-ink transition-colors">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pl-12 sm:pl-0">
                  <span className="text-xs font-sans uppercase tracking-widest text-lume-taupe font-medium">
                    {service.duration}
                  </span>
                  <div className="w-9 h-9 rounded-full border border-lume-ink/15 group-hover:border-lume-gold group-hover:bg-lume-ink group-hover:text-lume-ivory flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-lume-ink group-hover:text-lume-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Image Preview (Editorial side display) */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="relative aspect-[4/5] bg-lume-stone/30 overflow-hidden shadow-xl border border-lume-ink/10">
            <Image
              src={activeService.image}
              alt={activeService.alt}
              fill
              sizes="(max-width: 1200px) 40vw, 33vw"
              className="object-cover transition-all duration-700 ease-out scale-100"
            />
            {/* Overlay detail badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-lume-ink/80 via-transparent to-transparent flex flex-col justify-end p-8 text-lume-ivory">
              <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-medium">
                {activeService.category} • {activeService.duration}
              </span>
              <h4 className="font-serif text-2xl font-light text-lume-ivory mt-1">
                {activeService.name}
              </h4>
              <p className="text-xs font-sans text-lume-stone/80 mt-1">
                {activeService.samplePrice} <span className="text-[10px] opacity-70">(Sample pricing)</span>
              </p>
              <div className="pt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openBooking({ serviceId: activeService.id });
                  }}
                  className="px-4 py-2 bg-lume-ivory text-lume-ink text-[11px] uppercase tracking-widest font-sans font-medium hover:bg-lume-gold transition-colors"
                >
                  Reserve Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom link to full services */}
      <div className="pt-8 flex items-center justify-between">
        <p className="text-xs text-lume-taupe font-sans italic">
          * Prices shown for reference only. Exact pricing determined during personal consultation.
        </p>
        <Link
          href="/services"
          className="text-xs uppercase tracking-widest font-sans font-semibold text-lume-ink hover:text-lume-gold transition-colors inline-flex items-center gap-1.5"
        >
          <span>Explore Complete Menu</span>
          <ArrowUpRight className="w-4 h-4 text-lume-gold" />
        </Link>
      </div>
    </div>
  );
}
