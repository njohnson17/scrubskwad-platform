import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen px-5 py-6 md:px-10">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 py-10 md:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-scrub-graphite">
            ScrubSkwad phase 2
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-scrub-ink md:text-6xl">
            Premium quote booking for cleaning, removals, bins and vehicle care.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-scrub-graphite">
            Build an instant estimate, submit a quote request, and let the team approve the final booking before deposit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/booking"
              className="focus-ring rounded-md bg-scrub-ink px-5 py-3 text-sm font-semibold text-white"
            >
              Start booking
            </Link>
            <Link
              href="/admin/bookings"
              className="focus-ring rounded-md border border-scrub-graphite/30 bg-white px-5 py-3 text-sm font-semibold text-scrub-ink"
            >
              Admin view
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

