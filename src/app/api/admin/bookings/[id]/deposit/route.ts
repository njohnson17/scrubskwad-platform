import { z } from "zod";
import { handleApiError, jsonOk } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { createDepositRequest } from "@/lib/payments";

const depositSchema = z.object({
  provider: z.enum(["manual", "stripe"]).default("manual")
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireAdmin(request);
    const { id } = await params;
    const { provider } = depositSchema.parse(await request.json().catch(() => ({})));
    return jsonOk(await createDepositRequest(id, admin.id, provider));
  } catch (error) {
    return handleApiError(error);
  }
}

