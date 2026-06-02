import { z } from "zod";
import { handleApiError, jsonOk } from "@/lib/api";
import { setBookingStatus } from "@/lib/bookings";
import { requireAdmin } from "@/lib/auth";

const statusSchema = z.object({
  status: z.enum(["draft", "pending", "approved", "rejected", "awaiting_deposit", "paid", "in_progress", "completed"])
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireAdmin(request);
    const { id } = await params;
    const { status } = statusSchema.parse(await request.json());
    return jsonOk(await setBookingStatus(id, status, admin.id));
  } catch (error) {
    return handleApiError(error);
  }
}
