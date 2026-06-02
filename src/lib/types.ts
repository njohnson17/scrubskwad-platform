export type ServiceType = "cleaning" | "removals" | "bins" | "car_wash";

export type DirtLevel = "low" | "medium" | "high" | "extreme";

export type BookingStatus =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "awaiting_deposit"
  | "paid"
  | "in_progress"
  | "completed";

export type BookingConfig = {
  serviceTypes: ServiceType[];
  location: {
    postcode?: string;
    address?: string;
    propertyType?: string;
    distanceMiles?: number;
  };
  cleaning?: {
    rooms?: number;
    bathrooms?: number;
    dirtLevel?: DirtLevel;
    oven?: boolean;
    fridge?: boolean;
    carpet?: boolean;
  };
  removals?: {
    pickup?: string;
    destination?: string;
    stairs?: boolean;
    packingRequired?: boolean;
    moversCount?: number;
    hours?: number;
  };
  bins?: {
    count?: number;
    binType?: "domestic" | "commercial";
  };
  carWash?: {
    vehicleType?: "car" | "van" | "suv";
    valetLevel?: "exterior" | "interior" | "full";
    vehicleCount?: number;
  };
  staffing: {
    cleaners?: number;
    movers?: number;
    technicians?: number;
  };
  scheduling: {
    date?: string;
    timeSlot?: string;
    flexible?: boolean;
  };
  customer: {
    name?: string;
    email?: string;
    phone?: string;
    notes?: string;
  };
};

export type PriceBreakdownItem = {
  label: string;
  amount: number;
  minutes: number;
};

export type PriceEstimate = {
  estimatedPrice: number;
  estimatedDuration: number;
  staffRequired: number;
  breakdown: PriceBreakdownItem[];
};
