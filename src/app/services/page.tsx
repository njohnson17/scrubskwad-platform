import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
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
    </main>
  );
}
