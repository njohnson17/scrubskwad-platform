import { getSupabaseAdmin } from "@/lib/supabase/server";
import { setBookingStatus, logBookingEvent } from "@/lib/bookings";
import { sendDepositRequestedEmail, sendPaymentConfirmationEmail } from "@/lib/notifications";

export type PaymentProvider = "manual" | "stripe";

export async function createDepositRequest(bookingId: string, actorId: string, provider: PaymentProvider = "manual") {
  const supabase = getSupabaseAdmin();
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .single();

  if (bookingError) throw new Error(bookingError.message);

  const amount = Math.round(Number(booking.price_estimate) * 50) / 100;
  const paymentUrl = provider === "manual" ? `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/booking/${bookingId}/deposit` : null;

  const { data, error } = await supabase
    .from("payments")
    .insert({
      booking_id: bookingId,
      provider,
      type: "deposit",
      amount,
      status: "pending",
      payment_url: paymentUrl
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  await setBookingStatus(bookingId, "awaiting_deposit", actorId);
  await logBookingEvent(bookingId, "deposit_requested", { actorId, paymentId: data.id, amount });
  const email = booking.config_json?.customer?.email;
  if (email && data.payment_url) await sendDepositRequestedEmail(email, bookingId, data.payment_url);

  return data;
}

export async function markPaymentPaid(paymentId: string, metadata: Record<string, unknown> = {}) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("payments")
    .update({ status: "paid", paid_at: new Date().toISOString(), provider_metadata: metadata })
    .eq("id", paymentId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  await setBookingStatus(data.booking_id, "paid");
  await logBookingEvent(data.booking_id, "paid", { paymentId, metadata });
  const { data: booking } = await supabase.from("bookings").select("config_json").eq("id", data.booking_id).single();
  const email = booking?.config_json?.customer?.email;
  if (email) await sendPaymentConfirmationEmail(email, data.booking_id);
  return data;
}
