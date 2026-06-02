import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { locations } from "@/lib/site-data";

export default function LocationsPage() {
  return (
    <main>
      <section className="bg-scrub-ink px-4 py-16 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase text-white/65">Coverage</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black md:text-6xl">Greater Manchester, covered.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-white/75">Start with your postcode and our quote flow will capture the details.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3 md:px-8">
        {locations.map((location) => (
          <Link key={location} href="/booking" className="rounded-md bg-white p-5 shadow-sm transition hover:shadow-premium">
            <MapPin className="text-scrub-graphite" />
            <h2 className="mt-5 text-xl font-bold">{location}</h2>
            <p className="mt-2 text-sm leading-6 text-scrub-graphite">Request cleaning, moving and property care services in {location}.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Check your postcode <ArrowRight size={15} /></span>
          </Link>
        ))}
      </section>
    </main>
  );
}

