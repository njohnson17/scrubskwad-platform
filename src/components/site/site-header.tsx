import Image from "next/image";
import Link from "next/link";

const nav = [
  ["Services", "/services"],
  ["Locations", "/locations"],
  ["About", "/about"],
  ["Reviews", "/reviews"],
  ["Journal", "/journal"],
  ["Contact", "/contact"]
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-scrub-graphite/15 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 md:px-8">
        <Link href="/" className="focus-ring flex items-center gap-3">
          <Image src="/scrubskwad-mark.png" alt="" width={54} height={44} className="h-11 w-auto object-contain" />
          <span className="text-xl font-black uppercase text-scrub-ink">ScrubSkwad</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="focus-ring text-sm font-semibold text-scrub-graphite hover:text-scrub-ink">
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/booking" className="focus-ring rounded-md bg-scrub-ink px-4 py-3 text-sm font-bold text-white">
          Get a quote
        </Link>
      </div>
    </header>
  );
}
