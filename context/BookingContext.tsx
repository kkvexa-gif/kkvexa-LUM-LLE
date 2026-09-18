"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface BookingState {
  isOpen: boolean;
  selectedServiceId?: string;
  selectedStylistId?: string;
}

interface BookingContextType {
  isOpen: boolean;
  selectedServiceId?: string;
  selectedStylistId?: string;
  openBooking: (params?: { serviceId?: string; stylistId?: string }) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookingState>({
    isOpen: false,
    selectedServiceId: undefined,
    selectedStylistId: undefined,
  });

  const openBooking = (params?: { serviceId?: string; stylistId?: string }) => {
    setState({
      isOpen: true,
      selectedServiceId: params?.serviceId,
      selectedStylistId: params?.stylistId,
    });
  };

  const closeBooking = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state.isOpen) {
        closeBooking();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.isOpen]);

  return (
    <BookingContext.Provider
      value={{
        isOpen: state.isOpen,
        selectedServiceId: state.selectedServiceId,
        selectedStylistId: state.selectedStylistId,
        openBooking,
        closeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
