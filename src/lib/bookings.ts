import { calculateBookingEstimate } from "@/lib/pricing";
import type { BookingConfig, BookingStatus } from "@/lib/types";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendAdminBookingNotification, sendBookingApprovedEmail, sendBookingRejectedEmail } from "@/lib/notifications";

export async function createBooking(userId: string | null, config: BookingConfig) {
  const supabase = getSupabaseAdmin();
  const estimate = calculateBookingEstimate(config);
  const primaryService = config.serviceTypes[0] ?? "cleaning";

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: userId,
      status: "draft",
      service_type: primaryService,
      location_json: config.location,
      config_json: config,
      price_estimate: estimate.estimatedPrice,
      duration_estimate: estimate.estimatedDuration,
      staff_required: estimate.staffRequired
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  await logBookingEvent(data.id, "created", { estimate });
  return { booking: data, estimate };
}

export async function updateBooking(id: string, config: BookingConfig, userId: string) {
  const supabase = getSupabaseAdmin();
  const estimate = calculateBookingEstimate(config);
  const primaryService = config.serviceTypes[0] ?? "cleaning";

  const { data, error } = await supabase
    .from("bookings")
    .update({
      service_type: primaryService,
      location_json: config.location,
      config_json: config,
      price_estimate: estimate.estimatedPrice,
      duration_estimate: estimate.estimatedDuration,
      staff_required: estimate.staffRequired
    })
    .eq("id", id)
    .eq("user_id", userId)
    .eq("status", "draft")
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  await logBookingEvent(id, "updated", { estimate });
  return { booking: data, estimate };
}

export async function submitBooking(id: string, userId: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "pending" satisfies BookingStatus })
    .eq("id", id)
    .eq("user_id", userId)
    .eq("status", "draft")
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  await logBookingEvent(id, "submitted", { status: "pending" });
  await sendAdminBookingNotification({
    bookingId: data.id,
    customerName: data.config_json?.customer?.name,
    customerEmail: data.config_json?.customer?.email,
    serviceType: data.service_type,
    priceEstimate: Number(data.price_estimate)
  });
  return data;
}

export async function getBooking(id: string, userId: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("bookings").select("*").eq("id", id).eq("user_id", userId).single();

  if (error) throw new Error(error.message);
  return data;
}

export async function listBookings() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw new Error(error.message);
  return data;
}

export async function setBookingStatus(id: string, status: BookingStatus, actorId?: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  await logBookingEvent(id, status === "approved" ? "approved" : status === "rejected" ? "rejected" : "updated", {
    actorId,
    status
  });
  const email = data.config_json?.customer?.email;
  if (email && status === "approved") await sendBookingApprovedEmail(email, id);
  if (email && status === "rejected") await sendBookingRejectedEmail(email, id);
  return data;
}

export async function logBookingEvent(bookingId: string, eventType: string, metadata: Record<string, unknown>) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("booking_events").insert({
    booking_id: bookingId,
    event_type: eventType,
    metadata
  });

  if (error) throw new Error(error.message);
}
