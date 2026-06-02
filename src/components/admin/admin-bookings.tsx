"use client";

import { Check, RefreshCw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthPanel, type AuthState } from "@/components/auth/auth-panel";

type AdminBooking = {
  id: string;
  status: string;
  service_type: string;
  price_estimate: number;
  duration_estimate: number;
  staff_required: number;
  config_json: {
    customer?: {
      name?: string;
      email?: string;
      phone?: string;
    };
    location?: {
      postcode?: string;
      address?: string;
    };
  };
  created_at: string;
};

type PricingRule = {
  id: string;
  service_type: string;
  base_price: number;
  per_room_price: number;
  per_bathroom_price: number;
  mover_rate_per_hour: number;
  bin_price: number;
  car_wash_price: number;
  distance_multiplier: number;
  dirt_multiplier: Record<string, number>;
};

export function AdminBookings() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<AuthState>({ user: null, accessToken: null });
  const [selected, setSelected] = useState<AdminBooking | null>(null);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);
  const [auditLogs, setAuditLogs] = useState<Record<string, unknown>[]>([]);

  async function loadBookings() {
    if (!auth.accessToken) return;
    setLoading(true);
    const response = await fetch("/api/admin/bookings", {
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    });
    const payload = await response.json();
    if (payload.ok) setBookings(payload.data);
    await loadPricing();
    await loadAuditLogs();
    setLoading(false);
  }

  async function loadPricing() {
    if (!auth.accessToken) return;
    const response = await fetch("/api/admin/pricing", {
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    });
    const payload = await response.json();
    if (payload.ok) setPricingRules(payload.data);
  }

  async function loadAuditLogs() {
    if (!auth.accessToken) return;
    const response = await fetch("/api/admin/audit-logs", {
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    });
    const payload = await response.json();
    if (payload.ok) setAuditLogs(payload.data);
  }

  async function updateStatus(id: string, status: "approved" | "rejected") {
    await fetch(`/api/admin/bookings/${id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.accessToken}` },
      body: JSON.stringify({ status })
    });
    await loadBookings();
  }

  async function requestDeposit(id: string) {
    await fetch(`/api/admin/bookings/${id}/deposit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.accessToken}` },
      body: JSON.stringify({ provider: "manual" })
    });
    await loadBookings();
  }

  async function sendReminder(id: string) {
    await fetch(`/api/admin/bookings/${id}/reminder`, {
      method: "POST",
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    });
  }

  useEffect(() => {
    void loadBookings();
  }, [auth.accessToken]);

  return (
    <main className="min-h-screen px-4 py-6 md:px-8">
      <AuthPanel onAuth={setAuth} />
      {!auth.user ? null : (
      <div className="mx-auto max-w-7xl rounded-lg bg-white p-5 shadow-premium md:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase text-scrub-graphite">Admin</p>
            <h1 className="mt-1 text-3xl font-semibold text-scrub-ink">Bookings</h1>
          </div>
          <button
            type="button"
            onClick={() => void loadBookings()}
            className="focus-ring inline-flex items-center gap-2 rounded-md border border-scrub-graphite/30 px-4 py-3 text-sm font-semibold"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
        {loading ? (
          <p className="text-sm text-scrub-graphite">Loading bookings...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-scrub-graphite/20 text-xs uppercase text-scrub-graphite">
                  <th className="py-3 pr-4">Customer</th>
                  <th className="py-3 pr-4">Service</th>
                  <th className="py-3 pr-4">Location</th>
                  <th className="py-3 pr-4">Estimate</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-scrub-graphite/10">
                    <td className="py-4 pr-4">
                      <p className="font-semibold">{booking.config_json.customer?.name ?? "Unknown"}</p>
                      <p className="text-scrub-graphite">{booking.config_json.customer?.email ?? "No email"}</p>
                      <button type="button" onClick={() => setSelected(booking)} className="mt-2 text-xs font-semibold underline">
                        View details
                      </button>
                    </td>
                    <td className="py-4 pr-4">{booking.service_type}</td>
                    <td className="py-4 pr-4">{booking.config_json.location?.address ?? booking.config_json.location?.postcode ?? "No address"}</td>
                    <td className="py-4 pr-4">
                      £{Number(booking.price_estimate).toFixed(2)}
                      <span className="block text-scrub-graphite">{booking.duration_estimate} min · {booking.staff_required} staff</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="rounded-full bg-scrub-mist px-3 py-1 text-xs font-semibold">{booking.status}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => void updateStatus(booking.id, "approved")}
                          className="focus-ring inline-flex items-center gap-2 rounded-md bg-green-700 px-3 py-2 text-xs font-semibold text-white"
                        >
                          <Check size={15} />
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => void updateStatus(booking.id, "rejected")}
                          className="focus-ring inline-flex items-center gap-2 rounded-md bg-red-700 px-3 py-2 text-xs font-semibold text-white"
                        >
                          <X size={15} />
                          Reject
                        </button>
                        <button
                          type="button"
                          onClick={() => void requestDeposit(booking.id)}
                          className="focus-ring rounded-md border border-scrub-graphite/30 px-3 py-2 text-xs font-semibold"
                        >
                          Deposit
                        </button>
                        <button
                          type="button"
                          onClick={() => void sendReminder(booking.id)}
                          className="focus-ring rounded-md border border-scrub-graphite/30 px-3 py-2 text-xs font-semibold"
                        >
                          Reminder
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selected && (
          <section className="mt-6 rounded-md border border-scrub-graphite/20 p-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Booking details</h2>
              <button type="button" className="text-sm font-semibold underline" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
            <pre className="mt-4 max-h-96 overflow-auto rounded-md bg-scrub-mist p-4 text-xs">
              {JSON.stringify(selected, null, 2)}
            </pre>
          </section>
        )}
        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-md border border-scrub-graphite/20 p-4">
            <h2 className="text-lg font-semibold">Pricing rules</h2>
            <div className="mt-4 grid gap-3">
              {pricingRules.map((rule) => (
                <div key={rule.id} className="rounded-md bg-scrub-mist p-3 text-sm">
                  <p className="font-semibold">{rule.service_type}</p>
                  <p className="text-scrub-graphite">
                    Base £{Number(rule.base_price).toFixed(2)} · Room £{Number(rule.per_room_price).toFixed(2)} · Bath £{Number(rule.per_bathroom_price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-scrub-graphite/20 p-4">
            <h2 className="text-lg font-semibold">Audit log</h2>
            <div className="mt-4 max-h-72 overflow-auto">
              {auditLogs.map((log) => (
                <pre key={String(log.id)} className="mb-2 rounded-md bg-scrub-mist p-3 text-xs">
                  {JSON.stringify(log, null, 2)}
                </pre>
              ))}
            </div>
          </div>
        </section>
      </div>
      )}
    </main>
  );
}
