import { listBookings } from "@/lib/bookings";
import { handleApiError, jsonOk } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    return jsonOk(await listBookings());
  } catch (error) {
    return handleApiError(error);
  }
}
