import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck, Sparkles, Star } from "lucide-react";
import { locations, services } from "@/lib/site-data";

export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-[720px] overflow-hidden bg-scrub-ink text-white">
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2200&q=90"
          alt="Professional cleaner carefully cleaning a bright modern home"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-end px-4 pb-16 pt-32 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase text-white/75">Greater Manchester property services</p>
            <h1 className="mt-4 text-5xl font-black leading-[1.05] md:text-7xl">ScrubSkwad</h1>
            <p className="mt-5 max-w-2xl text-lg leading-7 text-white/85 md:text-xl">
              Premium cleaning, removals, bin care and mobile valeting. Build your quote in minutes and let our team
              handle the detail.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/booking" className="focus-ring inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-scrub-ink">
                Build my quote <ArrowRight size={17} />
              </Link>
              <Link href="/services" className="focus-ring rounded-md border border-white/50 px-5 py-3 text-sm font-bold text-white">
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-scrub-graphite/15 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 text-sm md:grid-cols-3 md:px-8">
          <p className="flex items-center gap-3 font-semibold"><ShieldCheck className="text-scrub-graphite" /> Admin-reviewed quote requests</p>
          <p className="flex items-center gap-3 font-semibold"><Clock3 className="text-scrub-graphite" /> Live time and price estimates</p>
          <p className="flex items-center gap-3 font-semibold"><CheckCircle2 className="text-scrub-graphite" /> Multi-service booking in one place</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase text-scrub-graphite">What we do</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">The support your property needs, without the runaround.</h2>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 8).map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.slug} href={`/services/${service.slug}` as Route} className="group rounded-md bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-premium">
                <Icon className="text-scrub-graphite" />
                <h3 className="mt-5 text-lg font-bold">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-scrub-graphite">{service.short}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Learn more <ArrowRight size={15} /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center md:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=85" alt="Professional cleaner preparing a carefully maintained space" fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase text-scrub-graphite">A calmer way to book</p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Tell us what you need. See your estimate as you go.</h2>
            <p className="mt-5 leading-7 text-scrub-graphite">
              Choose one service or build a bundle. Our guided quote flow updates pricing, time and staffing as your
              requirements change. Every request is reviewed before confirmation.
            </p>
            <Link href="/booking" className="mt-7 inline-flex items-center gap-2 rounded-md bg-scrub-ink px-5 py-3 text-sm font-bold text-white">
              Start my quote <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-scrub-graphite">Across Greater Manchester</p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Local service, platform-level care.</h2>
            <p className="mt-5 leading-7 text-scrub-graphite">
              Request cleaning, moving and property care support across Manchester and surrounding areas.
            </p>
            <Link href="/locations" className="mt-6 inline-flex items-center gap-2 text-sm font-bold">View coverage <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {locations.map((location) => <p key={location} className="rounded-md bg-white px-4 py-3 text-sm font-bold shadow-sm">{location}</p>)}
          </div>
        </div>
      </section>

      <section className="bg-scrub-taupe/35">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8">
          <Star className="mx-auto fill-scrub-ink text-scrub-ink" />
          <p className="mt-5 text-sm font-bold uppercase text-scrub-graphite">Built for trust</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">One request. One clear estimate. A team that reviews the details.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-scrub-graphite">
            ScrubSkwad is designed for homes, tenants, landlords, hosts and businesses that want a dependable service
            without a messy booking process.
          </p>
          <Link href="/booking" className="mt-7 inline-flex items-center gap-2 rounded-md bg-scrub-ink px-5 py-3 text-sm font-bold text-white">
            Request a quote <Sparkles size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
