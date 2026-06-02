import { handleApiError, jsonOk } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendBookingReminderEmail } from "@/lib/notifications";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from("bookings").select("config_json").eq("id", id).single();
    if (error) throw new Error(error.message);
    const email = data.config_json?.customer?.email;
    if (!email) throw new Error("Booking has no customer email.");
    return jsonOk(await sendBookingReminderEmail(email, id));
  } catch (error) {
    return handleApiError(error);
  }
}

