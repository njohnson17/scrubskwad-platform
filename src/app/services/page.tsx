import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "@/lib/site-data";

export default function ServicesPage() {
  return (
    <main>
      <section className="bg-scrub-ink px-4 py-16 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase text-white/65">ScrubSkwad services</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black md:text-6xl">Property support built around real life.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-white/75">
            Choose one service or combine several in a single quote request.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-14 md:grid-cols-2 md:px-8">
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}` as Route} className="grid overflow-hidden rounded-md bg-white shadow-sm transition hover:shadow-premium sm:grid-cols-[190px_1fr]">
            <div className="relative min-h-44">
              <Image src={service.image} alt={service.title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold">{service.title}</h2>
              <p className="mt-2 text-sm leading-6 text-scrub-graphite">{service.short}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Explore service <ArrowRight size={15} /></span>
            </div>
          </Link>
        ))}
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2 md:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-scrub-graphite">Built as one platform</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Combine property services without starting over.</h2>
            <p className="mt-5 leading-7 text-scrub-graphite">
              The ScrubSkwad booking flow lets customers combine cleaning, removals, bins and mobile vehicle care in one
              quote request. That matters for move-outs, landlord turns, Airbnb resets and busy homes that need several
              jobs coordinated at once.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              "One guided request across multiple services",
              "Live estimate updates for price, staff and duration",
              "Admin review before deposit confirmation",
              "Designed for Greater Manchester properties"
            ].map((item) => (
              <p key={item} className="flex items-center gap-3 rounded-md bg-scrub-mist p-4 font-semibold">
                <CheckCircle2 size={19} className="text-scrub-graphite" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
