import type { BookingConfig, DirtLevel, PriceEstimate } from "@/lib/types";

const dirtMultipliers: Record<DirtLevel, number> = {
  low: 1,
  medium: 1.2,
  high: 1.5,
  extreme: 2
};

export const defaultPricingRules = {
  cleaning: {
    basePrice: 80,
    perRoomPrice: 15,
    perBathroomPrice: 20,
    ovenExtra: 30,
    fridgeExtra: 20,
    carpetExtra: 45,
    baseMinutes: 120,
    roomMinutes: 20,
    bathroomMinutes: 25
  },
  removals: {
    moverRatePerHour: 40,
    packingExtra: 60,
    stairsExtra: 35,
    defaultHours: 2
  },
  bins: {
    domesticBinPrice: 10,
    commercialBinPrice: 18,
    baseMinutes: 20
  },
  carWash: {
    basePrice: 25,
    interiorExtra: 20,
    fullValetExtra: 55,
    vanExtra: 12,
    suvExtra: 10,
    baseMinutes: 45
  },
  distanceMultiplier: 1.5
};

export function calculateBookingEstimate(config: BookingConfig): PriceEstimate {
  const breakdown: PriceEstimate["breakdown"] = [];
  let estimatedPrice = 0;
  let estimatedDuration = 0;

  if (config.serviceTypes.includes("cleaning")) {
    const rooms = config.cleaning?.rooms ?? 0;
    const bathrooms = config.cleaning?.bathrooms ?? 0;
    const dirtLevel = config.cleaning?.dirtLevel ?? "low";
    const cleaningBase =
      defaultPricingRules.cleaning.basePrice +
      rooms * defaultPricingRules.cleaning.perRoomPrice +
      bathrooms * defaultPricingRules.cleaning.perBathroomPrice;
    let cleaningPrice = cleaningBase * dirtMultipliers[dirtLevel];
    let cleaningMinutes =
      defaultPricingRules.cleaning.baseMinutes +
      rooms * defaultPricingRules.cleaning.roomMinutes +
      bathrooms * defaultPricingRules.cleaning.bathroomMinutes;

    if (config.cleaning?.oven) {
      cleaningPrice += defaultPricingRules.cleaning.ovenExtra;
      cleaningMinutes += 30;
    }
    if (config.cleaning?.fridge) {
      cleaningPrice += defaultPricingRules.cleaning.fridgeExtra;
      cleaningMinutes += 20;
    }
    if (config.cleaning?.carpet) {
      cleaningPrice += defaultPricingRules.cleaning.carpetExtra;
      cleaningMinutes += 45;
    }

    estimatedPrice += cleaningPrice;
    estimatedDuration += cleaningMinutes;
    breakdown.push({
      label: `Cleaning (${dirtLevel})`,
      amount: roundMoney(cleaningPrice),
      minutes: cleaningMinutes
    });
  }

  if (config.serviceTypes.includes("removals")) {
    const movers = config.staffing.movers ?? config.removals?.moversCount ?? 2;
    const hours = config.removals?.hours ?? defaultPricingRules.removals.defaultHours;
    let removalsPrice = movers * hours * defaultPricingRules.removals.moverRatePerHour;
    let removalsMinutes = hours * 60;

    if (config.removals?.packingRequired) {
      removalsPrice += defaultPricingRules.removals.packingExtra;
      removalsMinutes += 60;
    }
    if (config.removals?.stairs) {
      removalsPrice += defaultPricingRules.removals.stairsExtra;
      removalsMinutes += 30;
    }

    estimatedPrice += removalsPrice;
    estimatedDuration += removalsMinutes;
    breakdown.push({
      label: "Removals",
      amount: roundMoney(removalsPrice),
      minutes: removalsMinutes
    });
  }

  if (config.serviceTypes.includes("bins")) {
    const count = config.bins?.count ?? 1;
    const unitPrice =
      config.bins?.binType === "commercial"
        ? defaultPricingRules.bins.commercialBinPrice
        : defaultPricingRules.bins.domesticBinPrice;
    const binPrice = count * unitPrice;
    const binMinutes = defaultPricingRules.bins.baseMinutes + count * 5;

    estimatedPrice += binPrice;
    estimatedDuration += binMinutes;
    breakdown.push({
      label: "Bin cleaning",
      amount: roundMoney(binPrice),
      minutes: binMinutes
    });
  }

  if (config.serviceTypes.includes("car_wash")) {
    const count = config.carWash?.vehicleCount ?? 1;
    let unitPrice = defaultPricingRules.carWash.basePrice;
    let minutes = defaultPricingRules.carWash.baseMinutes;

    if (config.carWash?.valetLevel === "interior") {
      unitPrice += defaultPricingRules.carWash.interiorExtra;
      minutes += 25;
    }
    if (config.carWash?.valetLevel === "full") {
      unitPrice += defaultPricingRules.carWash.fullValetExtra;
      minutes += 60;
    }
    if (config.carWash?.vehicleType === "van") unitPrice += defaultPricingRules.carWash.vanExtra;
    if (config.carWash?.vehicleType === "suv") unitPrice += defaultPricingRules.carWash.suvExtra;

    const carWashPrice = unitPrice * count;
    const carWashMinutes = minutes * count;
    estimatedPrice += carWashPrice;
    estimatedDuration += carWashMinutes;
    breakdown.push({
      label: "Mobile car wash",
      amount: roundMoney(carWashPrice),
      minutes: carWashMinutes
    });
  }

  const distanceMiles = config.location.distanceMiles ?? 0;
  if (distanceMiles > 0) {
    const travelCost = distanceMiles * defaultPricingRules.distanceMultiplier;
    estimatedPrice += travelCost;
    breakdown.push({
      label: "Travel estimate",
      amount: roundMoney(travelCost),
      minutes: Math.round(distanceMiles * 3)
    });
  }

  return {
    estimatedPrice: roundMoney(estimatedPrice),
    estimatedDuration,
    staffRequired: getStaffRequired(config),
    breakdown
  };
}

function getStaffRequired(config: BookingConfig) {
  const cleaners = config.staffing.cleaners ?? (config.serviceTypes.includes("cleaning") ? 2 : 0);
  const movers = config.staffing.movers ?? (config.serviceTypes.includes("removals") ? 2 : 0);
  const technicians =
    config.staffing.technicians ??
    (config.serviceTypes.includes("bins") || config.serviceTypes.includes("car_wash") ? 1 : 0);

  return Math.max(1, cleaners + movers + technicians);
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

