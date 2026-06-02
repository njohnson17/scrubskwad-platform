import Link from "next/link";
import { ArrowRight, MapPin, MessageSquareText } from "lucide-react";

export default function ContactPage() {
  return (
    <main>
      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
        <p className="text-sm font-bold uppercase text-scrub-graphite">Contact</p>
        <h1 className="mt-3 text-4xl font-black md:text-6xl">Tell us what you need.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-7 text-scrub-graphite">
          The fastest way to reach ScrubSkwad is to build a quote request. You can include instructions and property details as you go.
        </p>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          <div className="rounded-md bg-white p-5 shadow-sm">
            <MessageSquareText className="text-scrub-graphite" />
            <h2 className="mt-5 text-xl font-bold">Request a quote</h2>
            <p className="mt-2 text-sm leading-6 text-scrub-graphite">Choose services, see your estimate and send the details for review.</p>
            <Link href="/booking" className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Start now <ArrowRight size={15} /></Link>
          </div>
          <div className="rounded-md bg-white p-5 shadow-sm">
            <MapPin className="text-scrub-graphite" />
            <h2 className="mt-5 text-xl font-bold">Greater Manchester coverage</h2>
            <p className="mt-2 text-sm leading-6 text-scrub-graphite">Check the areas currently covered by ScrubSkwad services.</p>
            <Link href="/locations" className="mt-5 inline-flex items-center gap-2 text-sm font-bold">View locations <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

