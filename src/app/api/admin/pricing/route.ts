import { handleApiError, jsonOk } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { listPricingRules, updatePricingRule } from "@/lib/admin";
import { pricingRuleSchema } from "@/lib/validation";

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    return jsonOk(await listPricingRules());
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin(request);
    const payload = pricingRuleSchema.parse(await request.json());
    return jsonOk(await updatePricingRule(payload, admin.id));
  } catch (error) {
    return handleApiError(error);
  }
}

