import { z } from "zod";
import { handleApiError, jsonOk } from "@/lib/api";
import { markPaymentPaid } from "@/lib/payments";

const manualWebhookSchema = z.object({
  paymentId: z.string().uuid(),
  status: z.literal("paid"),
  reference: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const payload = manualWebhookSchema.parse(await request.json());
    return jsonOk(await markPaymentPaid(payload.paymentId, { reference: payload.reference, source: "manual_webhook" }));
  } catch (error) {
    return handleApiError(error);
  }
}

