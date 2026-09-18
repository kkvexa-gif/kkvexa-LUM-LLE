export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  category: "Cut & Style" | "Colour" | "Balayage & Highlights" | "Extensions" | "Treatments";
  categorySlug: "cuts" | "colour" | "balayage" | "extensions" | "treatments";
  shortDescription: string;
  fullDescription: string;
  duration: string;
  samplePrice: string;
  includes: string[];
  image: string;
  alt: string;
  isSignature?: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: "cut-and-style",
    number: "01",
    name: "Cut & Style",
    category: "Cut & Style",
    categorySlug: "cuts",
    shortDescription: "Thoughtful cuts and finishes shaped around your features and everyday routine.",
    fullDescription: "A tailored architectural haircut preceded by an in-depth conversation on your lifestyle, bone structure, and natural hair movement. Includes an essential botanical wash ritual and a customized editorial blow-dry finish.",
    duration: "60–75 min",
    samplePrice: "From $120*",
    includes: [
      "Diagnostic consultation & texture assessment",
      "Signature scalp massage & cleansing wash ritual",
      "Precision cut tailored to natural movement",
      "Editorial blow-dry & styling education"
    ],
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80",
    alt: "Precision hair cut and blow dry style at LUMÉ",
    isSignature: true,
  },
  {
    id: "colour",
    number: "02",
    name: "Bespoke Colour",
    category: "Colour",
    categorySlug: "colour",
    shortDescription: "Personalised colour designed to complement your natural tone and personal style.",
    fullDescription: "Custom-blended multi-tonal formulas created to enhance your undertones with luminous depth. From rich, velvety brunettes to seamless root melts, each formulation is balanced with bond-building care.",
    duration: "90–120 min",
    samplePrice: "From $165*",
    includes: [
      "Chromatic consultation & shade formulation",
      "Bond-protecting colour application",
      "Post-colour restorative gloss treatment",
      "Colour longevity care plan"
    ],
    image: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?auto=format&fit=crop&w=1000&q=80",
    alt: "Rich brunette multidimensional hair colour",
    isSignature: true,
  },
  {
    id: "balayage",
    number: "03",
    name: "Signature Balayage",
    category: "Balayage & Highlights",
    categorySlug: "balayage",
    shortDescription: "Soft dimension, lived-in brightness and carefully blended movement.",
    fullDescription: "Freehand painterly placement creating organic gradient transitions and low-maintenance brilliance. Delivers sunlit radiance that grows out naturally without harsh demarcation lines.",
    duration: "150–210 min",
    samplePrice: "From $240*",
    includes: [
      "Custom sectioning & freehand placement plan",
      "Gentle clay-lightener with bond fortifiers",
      "Bespoke gloss & melt tone application",
      "LUMÉ finish & movement styling"
    ],
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80",
    alt: "Sun-dappled dimensional balayage on flowing hair",
    isSignature: true,
  },
  {
    id: "extensions",
    number: "04",
    name: "Seamless Extensions",
    category: "Extensions",
    categorySlug: "extensions",
    shortDescription: "Seamless length and volume with a consultation-first approach.",
    fullDescription: "Ethically sourced 100% Remy human hair applied with undetectable micro-weft or keratin bond techniques. Designed to blend invisibly with your hair's density and natural wave pattern.",
    duration: "120–240 min",
    samplePrice: "Consultation Required*",
    includes: [
      "Mandatory 30-min consultation & color matching",
      "Custom strand blending & density matching",
      "Precision placement & blending haircut",
      "Comprehensive maintenance & brush kit guidance"
    ],
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80",
    alt: "Seamless luxury hair extensions and volume transformation",
    isSignature: true,
  },
  {
    id: "treatments",
    number: "05",
    name: "Restorative Treatments",
    category: "Treatments",
    categorySlug: "treatments",
    shortDescription: "Care-focused treatments designed to support the look and feel of healthy hair.",
    fullDescription: "Deep molecular repair and intense moisture infusions formulated with pure botanical extracts and amino peptides. Restores elasticity, mirror-like shine, and long-lasting hair vitality.",
    duration: "45–60 min",
    samplePrice: "From $85*",
    includes: [
      "Micro-camera scalp & cuticle analysis",
      "Customized peptide or lipid repair elixir",
      "Aromatherapeutic hot towel steam ritual",
      "Hydrating seal & finishing touch"
    ],
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80",
    alt: "Deep scalp treatment and hair mask therapy",
    isSignature: true,
  },
  {
    id: "full-highlights",
    number: "06",
    name: "Full Dimensional Foils",
    category: "Balayage & Highlights",
    categorySlug: "balayage",
    shortDescription: "High-impact precision micro-foils delivering all-over illumination.",
    fullDescription: "Detailed micro-stitch foil placement from nape to crown creating maximum brightness with subtle root shadowing for seamless diffusion.",
    duration: "150–180 min",
    samplePrice: "From $220*",
    includes: [
      "Precision micro-weave foiling",
      "Custom gloss toner & pH equalizer",
      "Intensive conditioning seal",
      "LUMÉ signature blowout"
    ],
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1000&q=80",
    alt: "Full dimensional blonde highlight transformation",
  },
  {
    id: "gloss-toner",
    number: "07",
    name: "Lustre Glaze & Tone",
    category: "Colour",
    categorySlug: "colour",
    shortDescription: "Revitalize vibrancy and eliminate brassiness between major colour services.",
    fullDescription: "An express acidic colour gloss that closes the cuticle, locks in moisture, and restores pristine tonal clarity with an ultra-reflective high-gloss finish.",
    duration: "45–60 min",
    samplePrice: "From $75*",
    includes: [
      "Shade-correcting glaze formulation",
      "Express wash ritual",
      "Thermal protectant finish"
    ],
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
    alt: "Ultra-glossy toner refresh finish on dark hair",
  },
  {
    id: "french-blowout",
    number: "08",
    name: "Editorial Blowout & Style",
    category: "Cut & Style",
    categorySlug: "cuts",
    shortDescription: "Voluminous, weightless styling with effortless Parisian movement.",
    fullDescription: "A decadent shampoo massage followed by a round-brush blowout and tailored hot-tool styling designed to hold memory for days.",
    duration: "45–60 min",
    samplePrice: "From $70*",
    includes: [
      "Invigorating botanical scalp wash",
      "Weightless volume heat protector",
      "Round-brush sculpting & cool-shot set"
    ],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
    alt: "Weightless voluminous editorial blowout",
  },
];

export const serviceCategories = [
  { name: "All Services", slug: "all" },
  { name: "Cut & Style", slug: "cuts" },
  { name: "Colour", slug: "colour" },
  { name: "Balayage & Highlights", slug: "balayage" },
  { name: "Extensions", slug: "extensions" },
  { name: "Treatments", slug: "treatments" },
] as const;
