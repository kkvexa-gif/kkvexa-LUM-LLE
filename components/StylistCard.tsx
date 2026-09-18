"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Stylist } from "@/data/stylists";
import { StylistModal } from "./StylistModal";
import { ArrowUpRight } from "lucide-react";

interface StylistCardProps {
  stylist: Stylist;
}

export function StylistCard({ stylist }: StylistCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <article className="group flex flex-col justify-between bg-white border border-lume-ink/10 transition-all duration-300 hover:border-lume-taupe hover:shadow-lg">
        {/* Portrait container */}
        <div
          onClick={() => setModalOpen(true)}
          className="relative aspect-[3/4] overflow-hidden bg-lume-stone/20 cursor-pointer"
        >
          <Image
            src={stylist.portrait}
            alt={stylist.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-lume-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-lume-ivory font-sans font-medium">
              <span>View Full Bio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-lume-gold" />
            </span>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 bg-lume-ink/80 text-lume-ivory text-[9px] uppercase tracking-widest font-sans">
            Demo Artist
          </div>
        </div>

        {/* Content footer */}
        <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-lume-surface">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-lume-gold font-sans font-semibold">
              {stylist.role}
            </span>
            <h3 className="font-serif text-2xl text-lume-ink font-light mt-0.5 group-hover:text-lume-gold transition-colors">
              {stylist.name}
            </h3>
            <p className="text-xs font-sans text-lume-taupe mt-1 line-clamp-1">
              {stylist.specialty}
            </p>
            <p className="text-xs font-sans text-lume-ink/70 mt-2.5 line-clamp-2">
              {stylist.bio}
            </p>
          </div>

          <div className="pt-4 border-t border-lume-ink/5 flex items-center justify-between">
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs uppercase tracking-widest font-sans font-medium text-lume-ink hover:text-lume-gold transition-colors inline-flex items-center gap-1"
            >
              <span>View Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-lume-gold" />
            </button>
          </div>
        </div>
      </article>

      {/* Profile Detail Dialog */}
      <StylistModal
        stylist={stylist}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
