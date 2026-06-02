import { getBooking } from "@/lib/bookings";
import { handleApiError, jsonOk } from "@/lib/api";
import { requireUser } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(request);
    const { id } = await params;
    return jsonOk(await getBooking(id, user.id));
  } catch (error) {
    return handleApiError(error);
  }
}
