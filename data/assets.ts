export interface AssetCollection {
  hero: {
    image: string;
    alt: string;
    poster: string;
  };
  intro: {
    image: string;
    alt: string;
  };
  transformation: {
    before: string;
    after: string;
    beforeAlt: string;
    afterAlt: string;
    title: string;
    subtitle: string;
    service: string;
    stylist: string;
  };
  space: {
    id: string;
    title: string;
    caption: string;
    image: string;
    alt: string;
  }[];
  social: {
    id: string;
    image: string;
    alt: string;
    handle: string;
    aspectRatio: string;
  }[];
  about: {
    founder: string;
    founderAlt: string;
    atelier: string;
    atelierAlt: string;
    ritual: string;
    ritualAlt: string;
  };
}

export const assets: AssetCollection = {
  hero: {
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=85",
    alt: "LUMÉ Salon editorial model with soft, luminous dimensional hair",
    poster: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=85",
  },
  intro: {
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
    alt: "Stylist delicately crafting dimensional tone at LUMÉ chair",
  },
  transformation: {
    before: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1400&q=85",
    after: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1400&q=85",
    beforeAlt: "Before: natural baseline tone with uneven ends",
    afterAlt: "After: custom LUMÉ sun-dappled balayage with high-gloss glaze and layered face frame",
    title: "Transformation 01",
    subtitle: "Sun-dappled Balayage & Sculpted Frame",
    service: "Signature Balayage + Botanical Gloss Treatment",
    stylist: "Maya Chen",
  },
  space: [
    {
      id: "space-1",
      title: "The Atelier",
      caption: "Natural limestone, tactile linen, and calibrated 4000K diffused lighting.",
      image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=85",
      alt: "Minimalist modern LUMÉ styling stations with warm neutral tones",
    },
    {
      id: "space-2",
      title: "The Wash Ritual Basin",
      caption: "Ergonomic reclining wash lounges in a hushed, dimly lit sanctuary.",
      image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1400&q=85",
      alt: "Quiet wash basin area with warm amber mood lighting",
    },
    {
      id: "space-3",
      title: "The Colour Bar",
      caption: "Open dispensary with bespoke pigments blended in plain view.",
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1400&q=85",
      alt: "Artisan pigment bottles and custom colour blending station",
    },
    {
      id: "space-4",
      title: "The Lounge & Botanical Bar",
      caption: "Herbal infusions, curated literature, and quiet stillness between steps.",
      image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1400&q=85",
      alt: "Architectural waiting lounge with plush travertine seating",
    },
  ],
  social: [
    {
      id: "soc-1",
      image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=900&q=80",
      alt: "Lived-in golden blonde dimensional curls",
      handle: "@lume.salon.demo",
      aspectRatio: "aspect-[4/5]",
    },
    {
      id: "soc-2",
      image: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?auto=format&fit=crop&w=900&q=80",
      alt: "Rich espresso gloss with razor-finished fringe",
      handle: "@lume.salon.demo",
      aspectRatio: "aspect-square",
    },
    {
      id: "soc-3",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",
      alt: "Soft textured French bob on brunette hair",
      handle: "@lume.salon.demo",
      aspectRatio: "aspect-[4/5]",
    },
    {
      id: "soc-4",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80",
      alt: "Sunlit studio mirror reflection of clean finish",
      handle: "@lume.salon.demo",
      aspectRatio: "aspect-square",
    },
    {
      id: "soc-5",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80",
      alt: "Seamless seamless extension blending with cascading natural waves",
      handle: "@lume.salon.demo",
      aspectRatio: "aspect-[4/5]",
    },
    {
      id: "soc-6",
      image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
      alt: "Quiet afternoon light filtering into LUMÉ styling station",
      handle: "@lume.salon.demo",
      aspectRatio: "aspect-square",
    },
  ],
  about: {
    founder: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    founderAlt: "Elena Laurent, Founder & Creative Director of LUMÉ (Demo portrait)",
    atelier: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=85",
    atelierAlt: "Architectural overview of the LUMÉ studio space",
    ritual: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85",
    ritualAlt: "The scalp massage and hair ritual experience at LUMÉ",
  },
};
