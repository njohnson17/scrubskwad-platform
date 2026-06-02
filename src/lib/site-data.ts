import {
  Building2,
  Car,
  Home,
  PackageCheck,
  Sparkles,
  Trash2,
  Truck,
  WandSparkles
} from "lucide-react";

export const services = [
  {
    slug: "cleaning",
    title: "Home Cleaning",
    eyebrow: "Premium routine care",
    short: "Reliable, detail-led cleaning for calm, cared-for homes.",
    description:
      "A polished home cleaning service for busy households that want dependable care without managing every detail. Build a quote around your property, priorities and schedule, then let the ScrubSkwad team review the request before confirmation.",
    longIntro:
      "ScrubSkwad home cleaning is designed for homes that need consistency, care and a more professional booking experience. The quote flow captures property type, room count, bathrooms, dirt level and optional extras so the estimate feels transparent before the team reviews it.",
    icon: Home,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1800&q=88",
    inclusions: [
      "Kitchen surfaces, sinks, splashbacks and visible appliance exteriors",
      "Bathroom fixtures, mirrors, touchpoints and limescale-prone areas",
      "Bedroom and living area dusting, wiping and floor care",
      "High-touch points including switches, handles and rails",
      "Property-specific notes reviewed before confirmation"
    ],
    addOns: ["Oven cleaning", "Fridge cleaning", "Carpet attention", "Pet hair focus", "Move-in or move-out priorities"],
    idealFor: ["Busy households", "Professionals", "Families", "Landlords preparing viewings"],
    faqs: [
      ["Can I choose specific priorities?", "Yes. Add notes in the quote flow so the team can review what matters most."],
      ["Is the price final?", "The live figure is an estimate until ScrubSkwad reviews and approves the quote request."],
      ["Can I combine this with another service?", "Yes. You can add bins, removals or vehicle care to the same request."]
    ]
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    eyebrow: "A complete property reset",
    short: "A thorough reset for rooms that need extra attention.",
    description:
      "A more intensive clean for properties that need a proper refresh. Deep cleaning helps tackle built-up dust, dirt, limescale, neglected corners and high-touch areas that routine cleans do not always reach.",
    longIntro:
      "Deep cleaning is built for moments when a property needs more than upkeep: seasonal resets, post-hosting recovery, pre-sale presentation, after a busy period or when a home simply needs to feel restored.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1800&q=88",
    inclusions: [
      "Detailed attention to kitchens, bathrooms and living spaces",
      "Extra work around edges, fittings, skirting boards and touchpoints",
      "More time allocated for dirt level and property condition",
      "Optional focus on mould, pet hair, carpets, oven and fridge",
      "Admin-reviewed estimate before confirmation"
    ],
    addOns: ["Extreme dirt level", "Mould focus", "Carpet cleaning", "Oven deep clean", "Fridge deep clean"],
    idealFor: ["Seasonal resets", "Homes after heavy use", "Landlords", "Pre-sale preparation"],
    faqs: [
      ["When should I choose deep cleaning?", "Choose deep cleaning when routine cleaning is not enough or the property needs a reset."],
      ["Does dirt level affect the estimate?", "Yes. Low, medium, high and extreme dirt levels change the live estimate."],
      ["Can deep cleaning be done before moving in?", "Yes. Add move-in notes during configuration."]
    ]
  },
  {
    slug: "end-of-tenancy",
    title: "End of Tenancy",
    eyebrow: "Move-out ready",
    short: "Move-out cleaning built around handover day.",
    description:
      "A focused end-of-tenancy cleaning quote flow for tenants, landlords and agents. Add bedrooms, bathrooms, dirt level and common handover add-ons so the team can review time, staffing and estimate before approval.",
    longIntro:
      "End-of-tenancy cleaning needs clarity: what is included, what condition the property is in, what add-ons are needed and when handover is due. ScrubSkwad turns those details into a structured quote request.",
    icon: WandSparkles,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=88",
    inclusions: [
      "Kitchen, bathroom, bedroom and living area cleaning priorities",
      "Move-out condition notes for admin review",
      "Room and bathroom-based estimate logic",
      "Optional oven, fridge and carpet add-ons",
      "Clear status from quote request to approval"
    ],
    addOns: ["Oven cleaning", "Fridge cleaning", "Carpets", "Mould attention", "Heavy dirt level"],
    idealFor: ["Tenants", "Landlords", "Letting agents", "Student properties"],
    faqs: [
      ["Is this automatically confirmed?", "No. The request is reviewed before approval and deposit."],
      ["Can landlords request pre-tenancy cleaning too?", "Yes. Use the same flow and include move-in notes."],
      ["Can I include access instructions?", "Yes. Add key, parking and building access notes in the quote request."]
    ]
  },
  {
    slug: "commercial-cleaning",
    title: "Commercial Cleaning",
    eyebrow: "Professional spaces",
    short: "Professional upkeep for offices and commercial spaces.",
    description:
      "Structured quote requests for offices, studios, managed buildings and commercial units. Capture property type, size, priorities, access and timing so ScrubSkwad can review the operational details.",
    longIntro:
      "Commercial cleaning needs reliability, discretion and clear expectations. ScrubSkwad gives teams a controlled way to request cleaning support without relying on vague forms.",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=88",
    inclusions: [
      "Office and commercial space quote requests",
      "Access, timing and priority area capture",
      "Staffing and duration estimate",
      "Admin review for operational feasibility",
      "Support for one-off or repeat-ready requests"
    ],
    addOns: ["Kitchenette focus", "Washroom detail", "After-hours request", "High-touch points", "Waste area notes"],
    idealFor: ["Offices", "Studios", "Property managers", "Small businesses"],
    faqs: [
      ["Can I request out-of-hours cleaning?", "Yes. Add preferred timing and flexibility details."],
      ["Do you support recurring work?", "The platform is structured for repeat-ready requests; admin review confirms availability."],
      ["Can I include site access notes?", "Yes. Add building, parking and security notes during booking."]
    ]
  },
  {
    slug: "removals",
    title: "House Removals",
    eyebrow: "Moving made clearer",
    short: "Careful moving support, packing and practical help.",
    description:
      "A clearer way to request removals, packing and moving-day support. Add pickup, destination, movers, stairs, lift access and packing requirements to shape the estimate.",
    longIntro:
      "Moving is rarely one-size-fits-all. ScrubSkwad captures the practical details that affect time, staffing and cost so your request can be reviewed properly before confirmation.",
    icon: Truck,
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1800&q=88",
    inclusions: [
      "Pickup and destination capture",
      "Mover count and estimated hours",
      "Stairs, lift and access notes",
      "Packing and dismantling options",
      "Quote review before deposit request"
    ],
    addOns: ["Packing help", "Dismantling", "Extra movers", "Stairs", "Heavy item notes"],
    idealFor: ["House moves", "Flat moves", "Office moves", "Landlord turnovers"],
    faqs: [
      ["Can I request packing?", "Yes. Add packing required in the removals configuration."],
      ["Does distance affect the estimate?", "A placeholder travel/distance factor is included and can be reviewed by admin."],
      ["Can removals be combined with cleaning?", "Yes. Combine removals with end-of-tenancy or deep cleaning."]
    ]
  },
  {
    slug: "bin-cleaning",
    title: "Bin Cleaning",
    eyebrow: "Cleaner bins, better hygiene",
    short: "Fresh, hygienic care for domestic and commercial bins.",
    description:
      "Request domestic or commercial bin cleaning with bin count, bin type and frequency notes. Designed for homes, landlords, small businesses and managed properties.",
    longIntro:
      "Bins can quickly become a source of odour and residue, especially after food waste, warm weather or heavy use. ScrubSkwad makes bin cleaning easy to add as a standalone service or part of a wider property request.",
    icon: Trash2,
    image:
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1800&q=88",
    inclusions: [
      "Domestic and commercial bin options",
      "Bin count-based estimates",
      "One-off or repeat-ready request notes",
      "Access and location instructions",
      "Admin review for unusual volume or condition"
    ],
    addOns: ["Commercial bins", "Multiple bins", "Heavy odour notes", "Recurring frequency", "Property bundle"],
    idealFor: ["Homes", "Landlords", "Restaurants and offices", "Managed properties"],
    faqs: [
      ["How is price estimated?", "The estimate starts from bin count and type."],
      ["Can I request regular service?", "Yes. Add frequency notes for admin review."],
      ["Can bins be added to another booking?", "Yes. Add bin cleaning alongside cleaning, moving or car care."]
    ]
  },
  {
    slug: "mobile-car-wash",
    title: "Mobile Car Wash",
    eyebrow: "Vehicle care at your location",
    short: "Vehicle care brought to your home or workplace.",
    description:
      "Request exterior washes, interior cleaning or full valet support for one or multiple vehicles. The booking flow accounts for vehicle type, level and count.",
    longIntro:
      "Mobile vehicle care saves time by bringing the request to your home or workplace. ScrubSkwad lets you choose the right level of service and submit the details for review.",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1800&q=88",
    inclusions: [
      "Exterior, interior or full valet level",
      "Car, SUV and van options",
      "Multiple vehicle estimates",
      "Location and access notes",
      "Reviewed before deposit confirmation"
    ],
    addOns: ["Interior cleaning", "Full valet", "SUV or van", "Multiple vehicles", "Workplace visit"],
    idealFor: ["Homeowners", "Professionals", "Small fleets", "Workplace car care"],
    faqs: [
      ["Can I book for more than one vehicle?", "Yes. Add vehicle count in the quote flow."],
      ["What is the difference between wash and valet?", "Valet levels include more interior/detail work than exterior-only care."],
      ["Can this be done at work?", "Add the workplace address and access notes for review."]
    ]
  },
  {
    slug: "packing-services",
    title: "Packing Services",
    eyebrow: "Moving support",
    short: "Practical packing support for a smoother move.",
    description:
      "Add packing support to a move or request help preparing a property before transport. Ideal when you need a more controlled moving-day process.",
    longIntro:
      "Packing takes time, care and planning. ScrubSkwad lets you include packing in the quote request so the team can review staffing, duration and moving-day expectations.",
    icon: PackageCheck,
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1800&q=88",
    inclusions: [
      "Packing requirement capture",
      "Moving-day support notes",
      "Dismantling and access options",
      "Mover/staffing estimate",
      "Quote review before confirmation"
    ],
    addOns: ["Dismantling", "Fragile item notes", "Extra movers", "Stairs", "Destination details"],
    idealFor: ["House moves", "Office moves", "Busy households", "Landlords"],
    faqs: [
      ["Can packing be booked alone?", "Yes, or it can be combined with removals."],
      ["Can I include fragile items?", "Yes. Include fragile item notes in the request."],
      ["Does packing affect duration?", "Yes. Packing requirements affect the estimate."]
    ]
  }
] as const;

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

