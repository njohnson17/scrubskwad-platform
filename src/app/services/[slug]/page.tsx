import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, HelpCircle, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { findService, services } from "@/lib/site-data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();
  const Icon = service.icon;

  return (
    <main>
      <section className="relative min-h-[540px] overflow-hidden bg-scrub-ink text-white">
        <Image src={service.image} alt={service.title} fill priority className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto flex min-h-[540px] max-w-7xl items-end px-4 pb-14 md:px-8">
          <div className="max-w-3xl">
            <Icon size={38} />
            <p className="mt-5 text-sm font-bold uppercase text-white/70">{service.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-black md:text-6xl">{service.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-7 text-white/80">{service.description}</p>
            <Link href="/booking" className="mt-7 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-scrub-ink">
              Build my quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-sm font-bold uppercase text-scrub-graphite">Designed around your request</p>
          <h2 className="mt-3 text-3xl font-bold">Clear details before the work begins.</h2>
          <p className="mt-4 leading-7 text-scrub-graphite">{service.longIntro}</p>
        </div>
        <div className="grid gap-3">
          {["Live estimate as requirements change", "Clear staffing and duration guidance", "Admin review before confirmation", "Support across Greater Manchester"].map((item) => (
            <p key={item} className="flex items-center gap-3 rounded-md bg-white p-4 font-semibold shadow-sm"><CheckCircle2 size={19} className="text-scrub-graphite" /> {item}</p>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1.1fr_.9fr] md:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-scrub-graphite">What can be included</p>
            <h2 className="mt-3 text-3xl font-bold">A structured request, not a vague form.</h2>
            <div className="mt-7 grid gap-3">
              {service.inclusions.map((item) => (
                <p key={item} className="flex gap-3 rounded-md bg-scrub-mist p-4 font-semibold">
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-scrub-graphite" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <aside className="rounded-md bg-scrub-ink p-6 text-white">
            <p className="text-sm font-bold uppercase text-white/60">Popular add-ons</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.addOns.map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-3 py-2 text-sm font-semibold">
                  {item}
                </span>
              ))}
            </div>
            <Link href="/booking" className="mt-7 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-scrub-ink">
              Configure this service <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <Users className="text-scrub-graphite" />
            <p className="mt-4 text-sm font-bold uppercase text-scrub-graphite">Ideal for</p>
            <h2 className="mt-2 text-3xl font-bold">Who uses this service?</h2>
          </div>
          <div className="grid gap-3 lg:col-span-2 sm:grid-cols-2">
            {service.idealFor.map((item) => (
              <p key={item} className="rounded-md bg-white p-4 font-bold shadow-sm">{item}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-scrub-taupe/30">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
          <p className="text-sm font-bold uppercase text-scrub-graphite">How it works</p>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["1", "Choose your service", "Start with the service and property details."],
              ["2", "Configure the job", "Add rooms, add-ons, access notes and timing."],
              ["3", "Review estimate", "See price, duration and staff guidance update live."],
              ["4", "Team approval", "ScrubSkwad reviews before deposit confirmation."]
            ].map(([number, title, copy]) => (
              <div key={number} className="rounded-md bg-white p-5 shadow-sm">
                <p className="text-sm font-black text-scrub-graphite">{number}</p>
                <h3 className="mt-3 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-scrub-graphite">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 md:px-8">
        <p className="flex items-center gap-2 text-sm font-bold uppercase text-scrub-graphite"><HelpCircle size={17} /> Questions</p>
        <h2 className="mt-3 text-3xl font-bold">Frequently asked questions</h2>
        <div className="mt-7 grid gap-3">
          {service.faqs.map(([question, answer]) => (
            <article key={question} className="rounded-md bg-white p-5 shadow-sm">
              <h3 className="font-bold">{question}</h3>
              <p className="mt-2 leading-7 text-scrub-graphite">{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-scrub-ink px-4 py-14 text-center text-white md:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase text-white/60">Ready when you are</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Build a {service.title.toLowerCase()} quote in minutes.</h2>
          <p className="mt-4 text-white/70">No automatic confirmation. Your request is reviewed before deposit.</p>
          <Link href="/booking" className="mt-7 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-scrub-ink">
            Start quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
