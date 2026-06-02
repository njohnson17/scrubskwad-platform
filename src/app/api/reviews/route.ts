import { z } from "zod";
import { handleApiError, jsonOk } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { moderateText } from "@/lib/moderation";

const reviewSchema = z.object({
  booking_id: z.string().uuid().optional(),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().max(120).optional(),
  body: z.string().min(10).max(2000)
});

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    const payload = reviewSchema.parse(await request.json());
    const moderation = moderateText(payload.body);
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        booking_id: payload.booking_id,
        user_id: user.id,
        rating: payload.rating,
        title: payload.title,
        body: payload.body,
        status: moderation.status === "spam" ? "rejected" : "pending"
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return jsonOk(data);
  } catch (error) {
    return handleApiError(error);
  }
}

