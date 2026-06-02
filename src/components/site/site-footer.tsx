import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-scrub-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
        <div>
          <p className="text-xl font-black uppercase">ScrubSkwad</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
            Premium cleaning, removals, bin cleaning and mobile vehicle care across Greater Manchester.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase text-white/60">Explore</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href="/services">Services</Link>
            <Link href="/locations">Locations</Link>
            <Link href="/booking">Request a quote</Link>
            <Link href="/about">About us</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase text-white/60">Contact</p>
          <div className="mt-3 grid gap-3 text-sm text-white/80">
            <p className="flex items-center gap-2"><MapPin size={16} /> Greater Manchester</p>
            <p className="flex items-center gap-2"><Phone size={16} /> Quote support online</p>
            <p className="flex items-center gap-2"><Mail size={16} /> Contact ScrubSkwad</p>
            <Link href="/social" className="flex items-center gap-2"><Instagram size={16} /> Social updates</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

