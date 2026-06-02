"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Check, ChevronLeft, ChevronRight, ClipboardCheck, MapPin, Sparkles, Users } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { AuthPanel, type AuthState } from "@/components/auth/auth-panel";
import { calculateBookingEstimate } from "@/lib/pricing";
import type { BookingConfig, DirtLevel, PriceEstimate, ServiceType } from "@/lib/types";

const initialConfig: BookingConfig = {
  serviceTypes: ["cleaning"],
  location: {},
  cleaning: { rooms: 2, bathrooms: 1, dirtLevel: "medium" },
  removals: { moversCount: 2, hours: 2 },
  bins: { count: 1, binType: "domestic" },
  carWash: { vehicleType: "car", valetLevel: "exterior", vehicleCount: 1 },
  staffing: { cleaners: 2, movers: 2, technicians: 1 },
  scheduling: {},
  customer: {}
};

const steps = [
  "Location",
  "Services",
  "Configuration",
  "Staffing",
  "Schedule",
  "Details",
  "Review"
];

const serviceLabels: Record<ServiceType, string> = {
  cleaning: "Cleaning",
  removals: "Removals",
  bins: "Bin cleaning",
  car_wash: "Mobile car wash"
};

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<BookingConfig>(initialConfig);
  const [estimate, setEstimate] = useState<PriceEstimate>(() => calculateBookingEstimate(initialConfig));
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "saving" | "submitted" | "error">("idle");
  const [auth, setAuth] = useState<AuthState>({ user: null, accessToken: null });

  useEffect(() => {
    const nextEstimate = calculateBookingEstimate(config);
    setEstimate(nextEstimate);

    const controller = new AbortController();
    fetch("/api/booking/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
      signal: controller.signal
    }).catch(() => undefined);

    return () => controller.abort();
  }, [config]);

  const canGoBack = step > 0;
  const canContinue = step < steps.length - 1;

  async function persistDraft() {
    if (!auth.accessToken) throw new Error("Authentication required.");
    setSubmitState("saving");
    const url = bookingId ? "/api/booking/update" : "/api/booking/create";
    const body = bookingId ? { id: bookingId, config } : { config };
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.accessToken}` },
      body: JSON.stringify(body)
    });
    const payload = await response.json();
    if (!payload.ok) throw new Error(payload.error ?? "Unable to save booking.");
    setBookingId(payload.data.booking.id);
    setSubmitState("idle");
    return payload.data.booking.id as string;
  }

  async function submitBooking() {
    try {
      const id = await persistDraft();
      setSubmitState("saving");
      const response = await fetch("/api/booking/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.accessToken}` },
        body: JSON.stringify({ id })
      });
      const payload = await response.json();
      if (!payload.ok) throw new Error(payload.error ?? "Unable to submit booking.");
      setSubmitState("submitted");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <main className="min-h-screen px-4 py-5 md:px-8">
      <AuthPanel onAuth={setAuth} />
      {!auth.user ? null : (
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_380px]">
        <section className="rounded-lg bg-white p-5 shadow-premium md:p-8">
          <div className="mb-8 flex flex-col gap-4 border-b border-scrub-graphite/15 pb-6">
            <p className="text-sm font-semibold uppercase text-scrub-graphite">Quote request</p>
            <h1 className="text-3xl font-semibold text-scrub-ink">Build your ScrubSkwad booking</h1>
            <StepNav step={step} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {step === 0 && <LocationStep config={config} setConfig={setConfig} />}
              {step === 1 && <ServicesStep config={config} setConfig={setConfig} />}
              {step === 2 && <ConfigurationStep config={config} setConfig={setConfig} />}
              {step === 3 && <StaffingStep config={config} setConfig={setConfig} />}
              {step === 4 && <ScheduleStep config={config} setConfig={setConfig} />}
              {step === 5 && <CustomerStep config={config} setConfig={setConfig} />}
              {step === 6 && <ReviewStep config={config} estimate={estimate} />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between border-t border-scrub-graphite/15 pt-5">
            <button
              type="button"
              disabled={!canGoBack}
              onClick={() => setStep((value) => Math.max(0, value - 1))}
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-scrub-graphite/30 px-4 py-3 text-sm font-semibold disabled:opacity-40"
            >
              <ChevronLeft size={18} />
              Back
            </button>
            {canContinue ? (
              <button
                type="button"
                onClick={() => {
                  void persistDraft().catch(() => setSubmitState("error"));
                  setStep((value) => Math.min(steps.length - 1, value + 1));
                }}
                className="focus-ring inline-flex items-center gap-2 rounded-md bg-scrub-ink px-5 py-3 text-sm font-semibold text-white"
              >
                Continue
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void submitBooking()}
                className="focus-ring inline-flex items-center gap-2 rounded-md bg-scrub-ink px-5 py-3 text-sm font-semibold text-white"
              >
                <ClipboardCheck size={18} />
                Request my quote
              </button>
            )}
          </div>

          {submitState === "submitted" && (
            <p className="mt-4 rounded-md bg-green-50 p-4 text-sm font-medium text-green-800">
              Quote submitted. Admin approval is required before deposit.
            </p>
          )}
          {submitState === "error" && (
            <p className="mt-4 rounded-md bg-red-50 p-4 text-sm font-medium text-red-800">
              Something stopped the booking from saving. Check Supabase environment variables and try again.
            </p>
          )}
        </section>
        <EstimateSidebar estimate={estimate} config={config} />
      </div>
      )}
    </main>
  );
}

function StepNav({ step }: { step: number }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-4 lg:grid-cols-7">
      {steps.map((label, index) => (
        <li
          key={label}
          className={`rounded-md px-3 py-2 text-xs font-semibold ${
            index === step ? "bg-scrub-ink text-white" : index < step ? "bg-scrub-taupe/40" : "bg-scrub-mist"
          }`}
        >
          {index + 1}. {label}
        </li>
      ))}
    </ol>
  );
}

function LocationStep({ config, setConfig }: StepProps) {
  function lookupPostcode() {
    const postcode = config.location.postcode?.trim().toUpperCase();
    setConfig({
      ...config,
      location: {
        ...config.location,
        postcode,
        distanceMiles: postcode ? Math.max(0, Math.min(20, postcode.length * 1.2)) : 0
      }
    });
  }

  return (
    <StepShell icon={<MapPin />} title="Location">
      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
        <TextInput label="Postcode" value={config.location.postcode ?? ""} onChange={(postcode) => setConfig({ ...config, location: { ...config.location, postcode } })} />
        <button
          type="button"
          onClick={lookupPostcode}
          className="focus-ring rounded-md border border-scrub-graphite/30 px-4 py-2 text-sm font-semibold"
        >
          Lookup
        </button>
      </div>
      <TextInput label="Address" value={config.location.address ?? ""} onChange={(address) => setConfig({ ...config, location: { ...config.location, address } })} />
      <SelectInput
        label="Property type"
        value={config.location.propertyType ?? ""}
        onChange={(propertyType) => setConfig({ ...config, location: { ...config.location, propertyType } })}
        options={["Flat/apartment", "Terraced house", "Semi-detached", "Detached", "Office", "Commercial unit"]}
      />
    </StepShell>
  );
}

function ServicesStep({ config, setConfig }: StepProps) {
  function toggle(service: ServiceType) {
    const next = config.serviceTypes.includes(service)
      ? config.serviceTypes.filter((item) => item !== service)
      : [...config.serviceTypes, service];
    setConfig({ ...config, serviceTypes: next.length ? next : ["cleaning"] });
  }

  return (
    <StepShell icon={<Sparkles />} title="Services">
      <div className="grid gap-3 sm:grid-cols-2">
        {(Object.keys(serviceLabels) as ServiceType[]).map((service) => (
          <button
            key={service}
            type="button"
            onClick={() => toggle(service)}
            className={`focus-ring rounded-md border p-4 text-left ${
              config.serviceTypes.includes(service) ? "border-scrub-ink bg-scrub-taupe/30" : "border-scrub-graphite/20 bg-white"
            }`}
          >
            <span className="flex items-center justify-between font-semibold">
              {serviceLabels[service]}
              {config.serviceTypes.includes(service) && <Check size={18} />}
            </span>
            <span className="mt-2 block text-sm text-scrub-graphite">Add this service to your quote request.</span>
          </button>
        ))}
      </div>
    </StepShell>
  );
}

function ConfigurationStep({ config, setConfig }: StepProps) {
  return (
    <StepShell icon={<ClipboardCheck />} title="Configuration">
      {config.serviceTypes.includes("cleaning") && (
        <FieldGroup title="Cleaning">
          <NumberInput label="Rooms" value={config.cleaning?.rooms ?? 0} onChange={(rooms) => setConfig({ ...config, cleaning: { ...config.cleaning, rooms } })} />
          <NumberInput label="Bathrooms" value={config.cleaning?.bathrooms ?? 0} onChange={(bathrooms) => setConfig({ ...config, cleaning: { ...config.cleaning, bathrooms } })} />
          <SelectInput
            label="Dirt level"
            value={config.cleaning?.dirtLevel ?? "low"}
            onChange={(dirtLevel) => setConfig({ ...config, cleaning: { ...config.cleaning, dirtLevel: dirtLevel as DirtLevel } })}
            options={["low", "medium", "high", "extreme"]}
          />
          <CheckboxInput label="Oven cleaning" checked={Boolean(config.cleaning?.oven)} onChange={(oven) => setConfig({ ...config, cleaning: { ...config.cleaning, oven } })} />
          <CheckboxInput label="Fridge cleaning" checked={Boolean(config.cleaning?.fridge)} onChange={(fridge) => setConfig({ ...config, cleaning: { ...config.cleaning, fridge } })} />
          <CheckboxInput label="Carpet cleaning" checked={Boolean(config.cleaning?.carpet)} onChange={(carpet) => setConfig({ ...config, cleaning: { ...config.cleaning, carpet } })} />
        </FieldGroup>
      )}
      {config.serviceTypes.includes("removals") && (
        <FieldGroup title="Removals">
          <TextInput label="Pickup" value={config.removals?.pickup ?? ""} onChange={(pickup) => setConfig({ ...config, removals: { ...config.removals, pickup } })} />
          <TextInput label="Destination" value={config.removals?.destination ?? ""} onChange={(destination) => setConfig({ ...config, removals: { ...config.removals, destination } })} />
          <NumberInput label="Estimated hours" value={config.removals?.hours ?? 2} onChange={(hours) => setConfig({ ...config, removals: { ...config.removals, hours } })} />
          <CheckboxInput label="Packing required" checked={Boolean(config.removals?.packingRequired)} onChange={(packingRequired) => setConfig({ ...config, removals: { ...config.removals, packingRequired } })} />
          <CheckboxInput label="Stairs" checked={Boolean(config.removals?.stairs)} onChange={(stairs) => setConfig({ ...config, removals: { ...config.removals, stairs } })} />
        </FieldGroup>
      )}
      {config.serviceTypes.includes("bins") && (
        <FieldGroup title="Bins">
          <NumberInput label="Number of bins" value={config.bins?.count ?? 1} onChange={(count) => setConfig({ ...config, bins: { ...config.bins, count } })} />
          <SelectInput label="Bin type" value={config.bins?.binType ?? "domestic"} onChange={(binType) => setConfig({ ...config, bins: { ...config.bins, binType: binType as "domestic" | "commercial" } })} options={["domestic", "commercial"]} />
        </FieldGroup>
      )}
      {config.serviceTypes.includes("car_wash") && (
        <FieldGroup title="Car wash">
          <SelectInput label="Vehicle type" value={config.carWash?.vehicleType ?? "car"} onChange={(vehicleType) => setConfig({ ...config, carWash: { ...config.carWash, vehicleType: vehicleType as "car" | "van" | "suv" } })} options={["car", "van", "suv"]} />
          <SelectInput label="Valet level" value={config.carWash?.valetLevel ?? "exterior"} onChange={(valetLevel) => setConfig({ ...config, carWash: { ...config.carWash, valetLevel: valetLevel as "exterior" | "interior" | "full" } })} options={["exterior", "interior", "full"]} />
          <NumberInput label="Vehicles" value={config.carWash?.vehicleCount ?? 1} onChange={(vehicleCount) => setConfig({ ...config, carWash: { ...config.carWash, vehicleCount } })} />
        </FieldGroup>
      )}
    </StepShell>
  );
}

function StaffingStep({ config, setConfig }: StepProps) {
  return (
    <StepShell icon={<Users />} title="Staffing">
      <NumberInput label="Cleaners" value={config.staffing.cleaners ?? 0} onChange={(cleaners) => setConfig({ ...config, staffing: { ...config.staffing, cleaners } })} />
      <NumberInput label="Movers" value={config.staffing.movers ?? 0} onChange={(movers) => setConfig({ ...config, staffing: { ...config.staffing, movers } })} />
      <NumberInput label="Technicians" value={config.staffing.technicians ?? 0} onChange={(technicians) => setConfig({ ...config, staffing: { ...config.staffing, technicians } })} />
    </StepShell>
  );
}

function ScheduleStep({ config, setConfig }: StepProps) {
  return (
    <StepShell icon={<CalendarDays />} title="Scheduling">
      <TextInput label="Preferred date" type="date" value={config.scheduling.date ?? ""} onChange={(date) => setConfig({ ...config, scheduling: { ...config.scheduling, date } })} />
      <SelectInput label="Time slot" value={config.scheduling.timeSlot ?? ""} onChange={(timeSlot) => setConfig({ ...config, scheduling: { ...config.scheduling, timeSlot } })} options={["Morning", "Midday", "Afternoon", "Evening", "Anytime"]} />
      <CheckboxInput label="Flexible scheduling" checked={Boolean(config.scheduling.flexible)} onChange={(flexible) => setConfig({ ...config, scheduling: { ...config.scheduling, flexible } })} />
    </StepShell>
  );
}

function CustomerStep({ config, setConfig }: StepProps) {
  return (
    <StepShell icon={<Users />} title="Customer details">
      <TextInput label="Name" value={config.customer.name ?? ""} onChange={(name) => setConfig({ ...config, customer: { ...config.customer, name } })} />
      <TextInput label="Email" type="email" value={config.customer.email ?? ""} onChange={(email) => setConfig({ ...config, customer: { ...config.customer, email } })} />
      <TextInput label="Phone" value={config.customer.phone ?? ""} onChange={(phone) => setConfig({ ...config, customer: { ...config.customer, phone } })} />
      <label className="grid gap-2 text-sm font-semibold text-scrub-ink">
        Notes
        <textarea
          className="focus-ring min-h-28 rounded-md border border-scrub-graphite/25 px-3 py-2 text-sm"
          value={config.customer.notes ?? ""}
          onChange={(event) => setConfig({ ...config, customer: { ...config.customer, notes: event.target.value } })}
        />
      </label>
    </StepShell>
  );
}

function ReviewStep({ config, estimate }: { config: BookingConfig; estimate: PriceEstimate }) {
  return (
    <StepShell icon={<ClipboardCheck />} title="Review">
      <div className="grid gap-4">
        <SummaryRow label="Services" value={config.serviceTypes.map((item) => serviceLabels[item]).join(", ")} />
        <SummaryRow label="Address" value={config.location.address || config.location.postcode || "Not provided"} />
        <SummaryRow label="Customer" value={`${config.customer.name ?? "No name"} · ${config.customer.email ?? "No email"}`} />
        <SummaryRow label="Estimate" value={`£${estimate.estimatedPrice.toFixed(2)} · ${estimate.estimatedDuration} minutes · ${estimate.staffRequired} staff`} />
      </div>
    </StepShell>
  );
}

function EstimateSidebar({ estimate, config }: { estimate: PriceEstimate; config: BookingConfig }) {
  const serviceSummary = useMemo(() => config.serviceTypes.map((item) => serviceLabels[item]).join(" + "), [config.serviceTypes]);

  return (
    <aside className="lg:sticky lg:top-5 lg:self-start">
      <div className="rounded-lg bg-scrub-ink p-5 text-white shadow-premium">
        <p className="text-sm font-semibold uppercase text-white/60">Live estimate</p>
        <div className="mt-5">
          <p className="text-4xl font-semibold">£{estimate.estimatedPrice.toFixed(2)}</p>
          <p className="mt-2 text-sm text-white/65">Admin approval required before deposit.</p>
        </div>
        <dl className="mt-6 grid gap-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-white/60">Services</dt>
            <dd className="text-right font-medium">{serviceSummary}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-white/60">Duration</dt>
            <dd className="font-medium">{estimate.estimatedDuration} min</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-white/60">Staff</dt>
            <dd className="font-medium">{estimate.staffRequired}</dd>
          </div>
        </dl>
        <div className="mt-6 border-t border-white/15 pt-5">
          <p className="text-sm font-semibold">Breakdown</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {estimate.breakdown.map((item) => (
              <li key={item.label} className="flex justify-between gap-4 text-white/80">
                <span>{item.label}</span>
                <span>£{item.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

type StepProps = {
  config: BookingConfig;
  setConfig: (config: BookingConfig) => void;
};

function StepShell({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-md bg-scrub-taupe/35 text-scrub-ink">{icon}</span>
        <h2 className="text-xl font-semibold text-scrub-ink">{title}</h2>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-md border border-scrub-graphite/15 p-4">
      <h3 className="mb-4 text-sm font-semibold uppercase text-scrub-graphite">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function TextInput({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-scrub-ink">
      {label}
      <input className="focus-ring rounded-md border border-scrub-graphite/25 px-3 py-2 text-sm" type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-scrub-ink">
      {label}
      <input className="focus-ring rounded-md border border-scrub-graphite/25 px-3 py-2 text-sm" type="number" min={0} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function SelectInput({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-scrub-ink">
      {label}
      <select className="focus-ring rounded-md border border-scrub-graphite/25 px-3 py-2 text-sm" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function CheckboxInput({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 text-sm font-semibold text-scrub-ink">
      <input className="size-4" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-scrub-mist p-4">
      <p className="text-xs font-semibold uppercase text-scrub-graphite">{label}</p>
      <p className="mt-1 font-medium text-scrub-ink">{value}</p>
    </div>
  );
}
