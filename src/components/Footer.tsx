"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Recycle,
  ShieldCheck,
  Sparkles
} from "lucide-react";

const services = [
  { label: "Home Cleaning", href: "/services/cleaning" },
  { label: "Deep Cleaning", href: "/services/deep-cleaning" },
  { label: "End of Tenancy", href: "/services/end-of-tenancy" },
  { label: "Commercial Cleaning", href: "/services/commercial-cleaning" },
  { label: "Bin Cleaning", href: "/services/bin-cleaning" },
  { label: "House Removals", href: "/services/removals" },
  { label: "Mobile Car Wash", href: "/services/mobile-car-wash" }
] as const;

const company = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Request a Quote", href: "/booking" },
  { label: "Journal", href: "/journal" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" }
] as const;

const socials = [
  { Icon: Instagram, href: "https://instagram.com/scrubskwad", label: "Instagram" },
  { Icon: Facebook, href: "https://facebook.com/scrubskwad", label: "Facebook" },
  { Icon: Linkedin, href: "https://linkedin.com/company/scrubskwad", label: "LinkedIn" }
] as const;

const trust = [
  { Icon: ShieldCheck, label: "Reviewed Quotes" },
  { Icon: Leaf, label: "Property Care" },
  { Icon: Sparkles, label: "Premium Finish" },
  { Icon: Recycle, label: "Bin Hygiene" }
] as const;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      setStatus(response.ok ? "success" : "error");
      if (response.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="relative overflow-hidden bg-scrub-mist" style={{ fontFamily: "'Sora', sans-serif" }}>
      <div className="border-y border-scrub-taupe/30 bg-scrub-panel">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 divide-x divide-scrub-taupe/20 sm:grid-cols-4">
            {trust.map(({ Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-2.5 py-4">
                <Icon size={14} className="shrink-0 text-scrub-taupe" strokeWidth={1.5} />
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-scrub-graphite">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-16">
          <div>
            <div className="mb-6">
              <p
                className="text-[30px] leading-none text-scrub-ink"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
              >
                Scrub<span style={{ fontWeight: 600 }}>Skwad</span>
              </p>
              <p className="mt-1.5 text-[10px] font-light uppercase tracking-[0.3em] text-scrub-taupe">
                Property Care Platform
              </p>
            </div>

            <p
              className="mb-7 text-[16px] font-light italic leading-relaxed text-scrub-graphite"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              Premium cleaning, moving and property care for Greater Manchester.
            </p>

            <ul className="mb-8 space-y-3">
              {[
                { Icon: MapPin, text: "Greater Manchester, United Kingdom" },
                { Icon: Phone, text: "Quote support online" },
                { Icon: Mail, text: "hello@scrubskwad.cleaning" }
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5">
                  <Icon size={12} className="shrink-0 text-scrub-taupe" strokeWidth={1.5} />
                  <span className="text-[12px] font-light text-scrub-graphite">{text}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-2.5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-8 w-8 items-center justify-center rounded-full border border-scrub-taupe/40 text-scrub-graphite transition-all duration-300 hover:border-scrub-ink hover:bg-scrub-ink/5 hover:text-scrub-ink"
                >
                  <Icon size={13} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Services" links={services} />

          <div>
            <FooterColumn title="Company" links={company} />

            <div className="mt-8 border border-scrub-taupe/30 bg-scrub-panel p-4 shadow-premium">
              <p className="mb-3 text-[13px] font-light text-scrub-graphite">Ready to plan the work?</p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 border-b border-scrub-ink/30 pb-px text-[11px] font-medium uppercase tracking-[0.18em] text-scrub-ink transition-all hover:gap-3 hover:border-scrub-ink"
              >
                Build a Quote <ArrowRight size={11} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-scrub-taupe">
              Newsletter
            </h4>

            <p
              className="mb-1 text-[26px] leading-tight text-scrub-ink"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              Clean living,
            </p>
            <p
              className="mb-4 text-[26px] italic leading-tight text-scrub-ink"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              coordinated better.
            </p>

            <p className="mb-6 text-[12px] font-light leading-relaxed text-scrub-graphite">
              Cleaning guides, moving notes, bin hygiene and property care updates from the Skwad.
            </p>

            <form onSubmit={handleSubscribe}>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  disabled={status === "loading" || status === "success"}
                  className="w-full border-b border-scrub-taupe/50 bg-transparent pb-3 pr-10 pt-1 text-[13px] text-scrub-ink outline-none transition-colors duration-300 placeholder:text-scrub-taupe focus:border-scrub-ink disabled:opacity-40"
                />
                <button
                  type="submit"
                  disabled={!email || status === "loading" || status === "success"}
                  aria-label="Subscribe"
                  className="absolute bottom-2.5 right-0 text-scrub-taupe transition-colors hover:text-scrub-ink disabled:opacity-30"
                >
                  <ArrowRight size={15} strokeWidth={1.5} />
                </button>
              </div>

              <div className="mt-3 min-h-[18px]">
                {status === "success" && (
                  <p className="text-[11px] tracking-wide text-scrub-graphite">
                    You are on the list. Welcome to the Skwad.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-[11px] tracking-wide text-red-500">Something went wrong. Please try again.</p>
                )}
              </div>
            </form>

            <div className="mt-7 flex items-start gap-3 border border-scrub-taupe/30 bg-scrub-panel p-3.5 shadow-premium">
              <Leaf size={13} className="mt-0.5 shrink-0 text-scrub-taupe" strokeWidth={1.5} />
              <p className="text-[11px] font-light leading-relaxed text-scrub-graphite">
                Practical, useful property care notes. No noise, no spam.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-scrub-taupe/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-5 lg:px-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] font-light tracking-wide text-scrub-taupe">
            © {new Date().getFullYear()} ScrubSkwad. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms-of-service" },
              { label: "Cookie Policy", href: "/cookie-policy" }
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href as Route}
                className="text-[11px] font-light tracking-wide text-scrub-taupe transition-colors hover:text-scrub-graphite"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-6 text-[10px] font-medium uppercase tracking-[0.28em] text-scrub-taupe">{title}</h4>
      <ul className="space-y-3.5">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href as Route}
              className="group flex items-center gap-2.5 text-[13px] font-light text-scrub-graphite transition-colors duration-200 hover:text-scrub-ink"
            >
              <span className="h-px w-3 bg-scrub-taupe/40 transition-all duration-300 group-hover:w-5 group-hover:bg-scrub-ink" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

