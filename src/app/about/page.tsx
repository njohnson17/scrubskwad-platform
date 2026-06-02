import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2 md:items-center md:px-8">
        <div>
          <p className="text-sm font-bold uppercase text-scrub-graphite">About ScrubSkwad</p>
          <h1 className="mt-3 text-4xl font-black md:text-6xl">Property care with a clearer standard.</h1>
          <p className="mt-5 leading-7 text-scrub-graphite">
            ScrubSkwad brings cleaning, moving, bin care and mobile vehicle care into one straightforward request
            process. Our aim is simple: make it easier to describe the job, understand the estimate and know what happens next.
          </p>
          <Link href="/booking" className="mt-7 inline-flex items-center gap-2 rounded-md bg-scrub-ink px-5 py-3 text-sm font-bold text-white">
            Start my quote <ArrowRight size={16} />
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
          <Image src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85" alt="Professional cleaner working carefully in a home" fill className="object-cover" />
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-12 md:grid-cols-3 md:px-8">
          {["Built around guided requests", "Clear estimates before approval", "Designed for Greater Manchester"].map((item) => (
            <p key={item} className="flex items-center gap-3 rounded-md bg-scrub-mist p-4 font-bold"><CheckCircle2 size={18} /> {item}</p>
          ))}
        </div>
      </section>
    </main>
  );
}

