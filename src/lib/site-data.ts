import { Building2, Car, Home, PackageCheck, Sparkles, Trash2, Truck, WandSparkles } from "lucide-react";

export const services = [
  {
    slug: "cleaning",
    title: "Home Cleaning",
    short: "Reliable, detail-led cleaning for calm, cared-for homes.",
    description:
      "Flexible home cleaning tailored to your property, schedule and priorities. Build an estimate in minutes and let our team review the details before confirmation.",
    icon: Home,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85"
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    short: "A thorough reset for the rooms that need extra attention.",
    description:
      "A more intensive clean for busy households, seasonal resets and properties that need a deeper level of care.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=85"
  },
  {
    slug: "end-of-tenancy",
    title: "End of Tenancy",
    short: "Move-out cleaning built around handover day.",
    description:
      "Property-wide cleaning for tenants, landlords and agents, with add-ons for ovens, fridges and carpets.",
    icon: WandSparkles,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85"
  },
  {
    slug: "commercial-cleaning",
    title: "Commercial Cleaning",
    short: "Professional upkeep for offices and commercial spaces.",
    description:
      "Clear, dependable cleaning plans for workspaces, property teams and customer-facing environments.",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85"
  },
  {
    slug: "removals",
    title: "House Removals",
    short: "Careful moving support, packing and practical help.",
    description:
      "Quote removals with mover count, duration, stairs and packing support included in the estimate.",
    icon: Truck,
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1400&q=85"
  },
  {
    slug: "bin-cleaning",
    title: "Bin Cleaning",
    short: "Fresh, hygienic care for domestic and commercial bins.",
    description:
      "One-off and repeat-ready wheelie bin cleaning for homes, landlords and businesses.",
    icon: Trash2,
    image:
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1400&q=85"
  },
  {
    slug: "mobile-car-wash",
    title: "Mobile Car Wash",
    short: "Vehicle care brought to your home or workplace.",
    description:
      "Choose exterior care, interior cleaning or a fuller valet without rearranging your day.",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1400&q=85"
  },
  {
    slug: "packing-services",
    title: "Packing Services",
    short: "Practical packing support for a smoother move.",
    description:
      "Add careful packing and dismantling support to make your moving day more manageable.",
    icon: PackageCheck,
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1400&q=85"
  }
];

export const locations = [
  "Manchester",
  "Salford",
  "Trafford",
  "Stockport",
  "Bolton",
  "Bury",
  "Oldham",
  "Rochdale",
  "Wigan",
  "Tameside",
  "Cheshire"
];

export function findService(slug: string) {
  return services.find((service) => service.slug === slug);
}

