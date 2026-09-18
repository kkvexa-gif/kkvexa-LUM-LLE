export interface Stylist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  bio: string;
  philosophy: string;
  portrait: string;
  alt: string;
  signatureServices: string[];
  scheduleSummary: string;
  isCreativeDirector?: boolean;
}

export const stylistsData: Stylist[] = [
  {
    id: "olivia-martin",
    name: "Olivia Martin",
    role: "Creative Director",
    specialty: "Architectural Cuts & Precision Texture",
    experience: "12+ Years Experience",
    bio: "With over a decade of editorial and salon experience in London and Toronto, Olivia leads the creative vision at LUMÉ. Her approach balances classical geometry with organic texture, designing silhouettes that move naturally and require minimal daily intervention.",
    philosophy: "Hair should never look forced. The most luxurious haircut is one that feels entirely your own the moment you wake up.",
    portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    alt: "Olivia Martin, Creative Director at LUMÉ (Demo portrait)",
    signatureServices: ["Precision Cut & Style", "Editorial French Bob", "Texture Rebalancing"],
    scheduleSummary: "Tuesday, Thursday, Friday, Saturday",
    isCreativeDirector: true,
  },
  {
    id: "maya-chen",
    name: "Maya Chen",
    role: "Colour Specialist",
    specialty: "Lived-In Balayage & Dimensional Tone",
    experience: "9 Years Experience",
    bio: "Maya is renowned for her painterly eye and mastery of soft, multidimensional transitions. Specializing in sun-drenched blondes, smoky brondes, and nuanced brunettes, she crafts custom color palettes that grow out gracefully over months.",
    philosophy: "Lived-in colour is an art of patience and placement. We celebrate your natural contrast rather than masking it.",
    portrait: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80",
    alt: "Maya Chen, Colour Specialist at LUMÉ (Demo portrait)",
    signatureServices: ["Signature Balayage", "Bespoke Glaze Melt", "High-Contrast Micro-Foils"],
    scheduleSummary: "Tuesday through Saturday",
  },
  {
    id: "sofia-laurent",
    name: "Sofia Laurent",
    role: "Extension Artist",
    specialty: "Seamless Wefts & Keratin Integration",
    experience: "8 Years Experience",
    bio: "Sofia specializes in undetectable extension methods, customizing weight, placement, and tone to add whisper-soft fullness or dramatic editorial length without compromising scalp health or hair integrity.",
    philosophy: "Extensions should be a secret between you and your mirror. Weightless, comfortable, and flawlessly integrated.",
    portrait: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    alt: "Sofia Laurent, Extension Artist at LUMÉ (Demo portrait)",
    signatureServices: ["Micro-Weft Integration", "Invisible Keratin Bonds", "Density Enhancement"],
    scheduleSummary: "Wednesday, Friday, Saturday, Sunday",
  },
  {
    id: "ava-brooks",
    name: "Ava Brooks",
    role: "Stylist",
    specialty: "Modern Layering, Waves & Scalp Rituals",
    experience: "6 Years Experience",
    bio: "Ava brings a fresh, modern touch to effortless layered cuts and luminous blowout styling. Passionate about trichology and hair wellness, she incorporates relaxing botanical scalp rituals into every service.",
    philosophy: "True styling is grounded in healthy hair fabric. When the foundation is cared for, effortless beauty naturally follows.",
    portrait: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=900&q=80",
    alt: "Ava Brooks, Stylist at LUMÉ (Demo portrait)",
    signatureServices: ["Curtain Fringe & Layers", "LUMÉ Signature Blowout", "Botanical Scalp Therapy"],
    scheduleSummary: "Tuesday, Wednesday, Thursday, Sunday",
  },
];
