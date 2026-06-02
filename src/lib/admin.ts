import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function listPricingRules() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("pricing_rules").select("*").order("service_type");
  if (error) throw new Error(error.message);
  return data;
}

export async function updatePricingRule(rule: Record<string, unknown>, actorId: string) {
  const supabase = getSupabaseAdmin();
  const { data: before } = await supabase
    .from("pricing_rules")
    .select("*")
    .eq("service_type", rule.service_type)
    .single();

  const { data, error } = await supabase
    .from("pricing_rules")
    .upsert(rule, { onConflict: "service_type" })
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  await supabase.from("audit_logs").insert({
    actor_id: actorId,
    entity_type: "pricing_rules",
    entity_id: data.id,
    action: "updated",
    before,
    after: data
  });

  return data;
}

export async function listAuditLogs() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) throw new Error(error.message);
  return data;
}

