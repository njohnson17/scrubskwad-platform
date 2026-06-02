import { z } from "zod";

export const serviceTypeSchema = z.enum(["cleaning", "removals", "bins", "car_wash"]);

export const bookingConfigSchema = z.object({
  serviceTypes: z.array(serviceTypeSchema).default([]),
  location: z
    .object({
      postcode: z.string().optional(),
      address: z.string().optional(),
      propertyType: z.string().optional(),
      distanceMiles: z.coerce.number().min(0).optional()
    })
    .default({}),
  cleaning: z
    .object({
      rooms: z.coerce.number().int().min(0).optional(),
      bathrooms: z.coerce.number().int().min(0).optional(),
      dirtLevel: z.enum(["low", "medium", "high", "extreme"]).optional(),
      oven: z.boolean().optional(),
      fridge: z.boolean().optional(),
      carpet: z.boolean().optional()
    })
    .optional(),
  removals: z
    .object({
      pickup: z.string().optional(),
      destination: z.string().optional(),
      stairs: z.boolean().optional(),
      packingRequired: z.boolean().optional(),
      moversCount: z.coerce.number().int().min(1).optional(),
      hours: z.coerce.number().min(1).optional()
    })
    .optional(),
  bins: z
    .object({
      count: z.coerce.number().int().min(0).optional(),
      binType: z.enum(["domestic", "commercial"]).optional()
    })
    .optional(),
  carWash: z
    .object({
      vehicleType: z.enum(["car", "van", "suv"]).optional(),
      valetLevel: z.enum(["exterior", "interior", "full"]).optional(),
      vehicleCount: z.coerce.number().int().min(1).optional()
    })
    .optional(),
  staffing: z
    .object({
      cleaners: z.coerce.number().int().min(0).optional(),
      movers: z.coerce.number().int().min(0).optional(),
      technicians: z.coerce.number().int().min(0).optional()
    })
    .default({}),
  scheduling: z
    .object({
      date: z.string().optional(),
      timeSlot: z.string().optional(),
      flexible: z.boolean().optional()
    })
    .default({}),
  customer: z
    .object({
      name: z.string().optional(),
      email: z.string().email().optional().or(z.literal("")),
      phone: z.string().optional(),
      notes: z.string().optional()
    })
    .default({})
});

export const createBookingSchema = z.object({
  userId: z.string().uuid().optional(),
  config: bookingConfigSchema
});

export const updateBookingSchema = z.object({
  id: z.string().uuid(),
  config: bookingConfigSchema
});

export const submitBookingSchema = z.object({
  id: z.string().uuid()
});

export const pricingRuleSchema = z.object({
  service_type: serviceTypeSchema,
  base_price: z.coerce.number().min(0),
  per_room_price: z.coerce.number().min(0),
  per_bathroom_price: z.coerce.number().min(0),
  dirt_multiplier: z.record(z.coerce.number().min(0)),
  mover_rate_per_hour: z.coerce.number().min(0),
  bin_price: z.coerce.number().min(0),
  car_wash_price: z.coerce.number().min(0),
  distance_multiplier: z.coerce.number().min(0)
});
