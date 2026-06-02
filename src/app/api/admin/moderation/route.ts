import { handleApiError, jsonOk } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    const supabase = getSupabaseAdmin();
    const [reviews, comments] = await Promise.all([
      supabase.from("reviews").select("*").eq("status", "pending").order("created_at", { ascending: false }),
      supabase.from("comments").select("*").eq("status", "pending").order("created_at", { ascending: false })
    ]);
    if (reviews.error) throw new Error(reviews.error.message);
    if (comments.error) throw new Error(comments.error.message);
    return jsonOk({ reviews: reviews.data, comments: comments.data });
  } catch (error) {
    return handleApiError(error);
  }
}

