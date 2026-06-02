import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getSeoPage } from "@/lib/content";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ service: string; location: string }> }): Promise<Metadata> {
  const { service, location } = await params;
  const page = await getSeoPage(service, location);
  return {
    title: page?.seo_title ?? `${service} ${location} | ScrubSkwad`,
    description: page?.seo_description ?? `Premium ${service} services in ${location}.`
  };
}

export default async function SeoLandingPage({ params }: { params: Promise<{ service: string; location: string }> }) {
  const { service, location } = await params;
  const page = await getSeoPage(service, location);
  if (!page) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    areaServed: page.location_name,
    provider: {
      "@type": "LocalBusiness",
      name: "ScrubSkwad"
    }
  };

  return (
    <main className="min-h-screen px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-premium">
        <p className="text-sm font-semibold uppercase text-scrub-graphite">{page.location_name}</p>
        <h1 className="mt-2 text-4xl font-semibold text-scrub-ink">{page.h1}</h1>
        <div className="mt-6 whitespace-pre-wrap leading-7 text-scrub-ink">{page.body}</div>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {["Live quote estimate", "Admin-reviewed booking", "Greater Manchester coverage", "Secure customer details"].map((item) => (
            <p key={item} className="flex items-center gap-3 rounded-md bg-scrub-mist p-4 font-semibold">
              <CheckCircle2 size={18} className="text-scrub-graphite" />
              {item}
            </p>
          ))}
        </div>
        <Link href="/booking" className="mt-8 inline-flex items-center gap-2 rounded-md bg-scrub-ink px-5 py-3 text-sm font-bold text-white">
          Build my quote <ArrowRight size={16} />
        </Link>
      </article>
    </main>
  );
}
