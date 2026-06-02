import { handleApiError, jsonOk } from "@/lib/api";
import { calculateBookingEstimate } from "@/lib/pricing";
import { bookingConfigSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const config = bookingConfigSchema.parse(await request.json());
    return jsonOk(calculateBookingEstimate(config));
  } catch (error) {
    return handleApiError(error);
  }
}

