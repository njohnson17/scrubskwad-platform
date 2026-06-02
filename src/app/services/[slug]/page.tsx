import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
          <p className="mt-4 leading-7 text-scrub-graphite">
            Use the guided quote builder to describe your property, add relevant options and see a live estimate. Our
            team reviews each request before asking for a deposit.
          </p>
        </div>
        <div className="grid gap-3">
          {["Live estimate as requirements change", "Clear staffing and duration guidance", "Admin review before confirmation", "Support across Greater Manchester"].map((item) => (
            <p key={item} className="flex items-center gap-3 rounded-md bg-white p-4 font-semibold shadow-sm"><CheckCircle2 size={19} className="text-scrub-graphite" /> {item}</p>
          ))}
        </div>
      </section>
    </main>
  );
}

