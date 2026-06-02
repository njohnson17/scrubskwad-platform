import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
      </article>
    </main>
  );
}
