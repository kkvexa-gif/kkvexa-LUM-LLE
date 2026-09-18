export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  service: string;
  stylist: string;
  context: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    quote: "The consultation alone changed how I think about my hair. Maya understood exactly what would work with my skin tone without me needing to overexplain.",
    author: "Camille R.",
    service: "Signature Balayage & Glaze",
    stylist: "Maya Chen",
    context: "Client since 2024 • Demo Profile",
  },
  {
    id: "test-2",
    quote: "LUMÉ is quiet, intentional, and genuinely restorative. Olivia gave me the first haircut in years that holds its shape without thirty minutes of styling every morning.",
    author: "Genevieve V.",
    service: "Precision Cut & Texture",
    stylist: "Olivia Martin",
    context: "Client since 2025 • Demo Profile",
  },
  {
    id: "test-3",
    quote: "Sofia matched my extensions so seamlessly that even my closest friends assumed my hair had simply grown out healthy. The weightlessness is unbelievable.",
    author: "Amara D.",
    service: "Micro-Weft Integration",
    stylist: "Sofia Laurent",
    context: "Client since 2024 • Demo Profile",
  },
];
