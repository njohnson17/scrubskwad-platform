import { z } from "zod";
import { handleApiError, jsonOk } from "@/lib/api";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const newsletterSchema = z.object({
  email: z.string().email()
});

export async function POST(request: Request) {
  try {
    const { email } = newsletterSchema.parse(await request.json());

    try {
      const supabase = getSupabaseAdmin();
      await supabase.from("newsletter_signups").upsert(
        {
          email: email.toLowerCase(),
          source: "footer",
          status: "subscribed"
        },
        { onConflict: "email" }
      );
    } catch {
      // The public form should not fail if the optional newsletter table is not configured yet.
    }

    return jsonOk({ subscribed: true });
  } catch (error) {
    return handleApiError(error);
  }
}

