import { handleApiError, jsonOk } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { listAuditLogs } from "@/lib/admin";

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    return jsonOk(await listAuditLogs());
  } catch (error) {
    return handleApiError(error);
  }
}

