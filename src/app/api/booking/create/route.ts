import { createBooking } from "@/lib/bookings";
import { handleApiError, jsonOk } from "@/lib/api";
import { createBookingSchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    const payload = createBookingSchema.parse(await request.json());
    return jsonOk(await createBooking(user.id, payload.config));
  } catch (error) {
    return handleApiError(error);
  }
}
