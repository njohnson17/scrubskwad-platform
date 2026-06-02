import { updateBooking } from "@/lib/bookings";
import { handleApiError, jsonOk } from "@/lib/api";
import { updateBookingSchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    const payload = updateBookingSchema.parse(await request.json());
    return jsonOk(await updateBooking(payload.id, payload.config, user.id));
  } catch (error) {
    return handleApiError(error);
  }
}
