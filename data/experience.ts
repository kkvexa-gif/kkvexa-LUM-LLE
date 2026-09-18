export interface ExperienceStep {
  number: string;
  title: string;
  headline: string;
  description: string;
  details: string[];
  image: string;
  alt: string;
  quote?: string;
}

export const experienceSteps: ExperienceStep[] = [
  {
    number: "01",
    title: "Arrival & Decompression",
    headline: "Step into a calmer rhythm.",
    description: "From the moment you cross the threshold into LUMÉ, the velocity of the outside world softens. Check your coat, choose a warm botanical tea infusion or sparkling water, and settle into our sunlit travertine lounge.",
    details: [
      "Warm greeting & sensory beverage selection",
      "No rushing or crowded waiting area",
      "Curated acoustic design & calming fragrance profile"
    ],
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1400&q=85",
    alt: "LUMÉ welcome lounge with natural limestone and herbal tea service",
    quote: "A space designed to exhale before your transformation begins.",
  },
  {
    number: "02",
    title: "The Diagnostic Consultation",
    headline: "Great hair starts with a great conversation.",
    description: "We never begin a cut or color without a seated, unhurried dialogue. We examine your natural texture, scalp health, morning routine, and maintenance cadence to craft a personalized aesthetic plan.",
    details: [
      "In-depth texture and lifestyle evaluation",
      "Visual moodboard alignment & tone matching",
      "Transparent timeline and maintenance breakdown"
    ],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85",
    alt: "Stylist and client conversing warmly during a seated consultation",
    quote: "We listen to what you want to feel, not just what you want to cut.",
  },
  {
    number: "03",
    title: "The Wash & Creation Ritual",
    headline: "Precision craft meets restorative care.",
    description: "Your service begins at the wash basin with an acupressure scalp massage and custom hair mask. At the styling chair, your artist executes tailored color placement and architectural cutting techniques.",
    details: [
      "Deep shiatsu scalp massage with botanicals",
      "Bond-protecting, ammonia-conscious formulations",
      "Custom freehand placement & scissor geometry"
    ],
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1400&q=85",
    alt: "Quiet wash basin room with warm ambient mood lighting",
    quote: "Every movement is deliberate, every formula customized.",
  },
  {
    number: "04",
    title: "The Reveal & Finish",
    headline: "Sculpted movement in true daylight.",
    description: "We finish your hair with an editorial blow-dry and subtle texturizing. We check the silhouette under calibrated 4000K daylight lighting so you see the true depth and lustre of your look before leaving.",
    details: [
      "Weightless volume & tailored hot tool finish",
      "360-degree mirror review under true daylight",
      "Hair movement check from every angle"
    ],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=85",
    alt: "Client admiring fresh dimensional color and blowout in mirror",
    quote: "You leave looking like the elevated, effortless version of yourself.",
  },
  {
    number: "05",
    title: "Aftercare & Longevity",
    headline: "Effortless confidence between appointments.",
    description: "We believe a great salon visit extends into your daily routine. We provide hands-on styling tips, customized product recommendations, and a personalized rebooking schedule tailored to your lifestyle.",
    details: [
      "Simple 5-minute home styling tutorial",
      "Curated botanical aftercare prescription",
      "Recommended maintenance window reminder"
    ],
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=85",
    alt: "Clean salon retail shelf with botanical hair care elixirs",
    quote: "Hair that looks just as exceptional on day thirty as day one.",
  },
];
