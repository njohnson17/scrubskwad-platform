import { z } from "zod";
import { handleApiError, jsonOk } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { moderateText } from "@/lib/moderation";

const commentSchema = z.object({
  post_id: z.string().uuid(),
  body: z.string().min(3).max(1500)
});

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    const payload = commentSchema.parse(await request.json());
    const moderation = moderateText(payload.body);
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: payload.post_id,
        user_id: user.id,
        body: payload.body,
        status: moderation.status,
        moderation_json: moderation.moderation_json
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return jsonOk(data);
  } catch (error) {
    return handleApiError(error);
  }
}

