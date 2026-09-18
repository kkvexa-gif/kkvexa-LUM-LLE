import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { BookingProvider } from "@/context/BookingContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { CustomCursor } from "@/components/CustomCursor";
import { BrandIntroSplash } from "@/components/BrandIntroSplash";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LUMÉ Salon — Hair • Beauty • Experience",
    template: "%s | LUMÉ Salon",
  },
  description:
    "A considered approach to colour, cut and care — created around you. Discover our curated salon atelier in Milton, Ontario.",
  keywords: [
    "LUMÉ Salon",
    "Luxury Salon Canada",
    "Balayage Specialist",
    "Precision Haircut",
    "Hair Extensions",
    "Milton Salon",
  ],
  authors: [{ name: "LUMÉ Atelier" }],
  openGraph: {
    title: "LUMÉ Salon — Hair • Beauty • Experience",
    description:
      "A considered approach to colour, cut and care — created around you.",
    url: "https://lume-demo.com",
    siteName: "LUMÉ Salon Canada",
    locale: "en_CA",
    type: "website",
  },
  icons: {
    icon: "/assets/lume-gold-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-lume-ivory text-lume-ink font-sans antialiased selection:bg-lume-ink selection:text-lume-ivory flex flex-col justify-between">
        <BookingProvider>
          <BrandIntroSplash />
          <CustomCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  );
}
