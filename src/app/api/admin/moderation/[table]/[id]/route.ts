import { z } from "zod";
import { handleApiError, jsonOk } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const decisionSchema = z.object({
  status: z.enum(["approved", "rejected", "spam", "toxic"])
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ table: string; id: string }> }
) {
  try {
    const admin = await requireAdmin(request);
    const { table, id } = await params;
    if (!["reviews", "comments"].includes(table)) throw new Error("Invalid moderation table.");
    const { status } = decisionSchema.parse(await request.json());
    const supabase = getSupabaseAdmin();
    const patch =
      table === "reviews"
        ? { status, published_at: status === "approved" ? new Date().toISOString() : null }
        : { status, moderated_at: new Date().toISOString() };
    const { data, error } = await supabase.from(table).update(patch).eq("id", id).select("*").single();
    if (error) throw new Error(error.message);
    await supabase.from("audit_logs").insert({
      actor_id: admin.id,
      entity_type: table,
      entity_id: id,
      action: `moderation_${status}`,
      after: data
    });
    return jsonOk(data);
  } catch (error) {
    return handleApiError(error);
  }
}

