import { submitBooking } from "@/lib/bookings";
import { handleApiError, jsonOk } from "@/lib/api";
import { submitBookingSchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    const payload = submitBookingSchema.parse(await request.json());
    return jsonOk(await submitBooking(payload.id, user.id));
  } catch (error) {
    return handleApiError(error);
  }
}
