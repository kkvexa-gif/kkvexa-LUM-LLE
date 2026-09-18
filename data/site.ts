export interface NavItem {
  name: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  taglineSecondary: string;
  heroHeadline: string;
  heroSubtitle: string;
  email: string;
  phone: string;
  phoneRaw: string;
  location: string;
  locationDetails: string;
  instagram: string;
  instagramUrl: string;
  hours: { day: string; hours: string }[];
  navItems: NavItem[];
  footerNav: NavItem[];
  demoNotice: string;
}

export const siteConfig: SiteConfig = {
  name: "LUMÉ",
  tagline: "Hair • Beauty • Experience",
  taglineSecondary: "A considered approach to colour, cut and care — created around you.",
  heroHeadline: "Your hair. Your signature.",
  heroSubtitle: "A considered approach to colour, cut and care — created around you.",
  email: "hello@lume-demo.com",
  phone: "+1 (555) 014-2026",
  phoneRaw: "+15550142026",
  location: "Milton, Ontario, Canada",
  locationDetails: "Downtown Milton Studio District, Milton, ON, Canada",
  instagram: "@lume.salon.demo",
  instagramUrl: "https://instagram.com",
  hours: [
    { day: "Tuesday – Thursday", hours: "9:00 AM – 7:00 PM" },
    { day: "Friday", hours: "9:00 AM – 8:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 6:00 PM" },
    { day: "Sunday", hours: "10:00 AM – 4:00 PM" },
    { day: "Monday", hours: "Closed" },
  ],
  navItems: [
    { name: "Services", href: "/services" },
    { name: "Experience", href: "/experience" },
    { name: "Stylists", href: "/stylists" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  footerNav: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Experience", href: "/experience" },
    { name: "Stylists", href: "/stylists" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Book Appointment", href: "/book" },
  ],
  demoNotice: "All people, reviews, addresses, prices, and contact details used in this demo are fictional placeholders created for presentation purposes.",
};
