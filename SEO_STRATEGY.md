# SEO Strategy

Approval status: Draft for review  
Project: ScrubSkwad premium service marketplace  
Date: 2026-06-02

## SEO Objective

Make ScrubSkwad one of the strongest owned home-service platforms in Greater Manchester for cleaning, end-of-tenancy cleaning, deep cleaning, bin cleaning, removals, packing, mobile car wash, and vehicle valeting searches.

This strategy avoids thin doorway pages. Every service-location page must include useful, locally relevant content, booking context, FAQs, and clear internal links.

## Core Search Themes

Primary commercial intent:

- cleaning Manchester
- deep cleaning Manchester
- end of tenancy cleaning Manchester
- move out cleaning Manchester
- after builders cleaning Manchester
- office cleaning Manchester
- commercial cleaning Manchester
- Airbnb cleaning Manchester
- wheelie bin cleaning Manchester
- bin cleaning Manchester
- house removals Manchester
- office removals Manchester
- packing services Manchester
- mobile car wash Manchester
- vehicle valeting Manchester

Secondary intent:

- cleaners near me
- end of tenancy cleaners near me
- same day cleaners Manchester
- landlord cleaning Manchester
- student end of tenancy cleaning Manchester
- Airbnb turnover cleaning Manchester
- office cleaning company Manchester
- wheelie bin cleaning near me
- mobile car valet near me
- man with van alternative Manchester

Informational intent:

- what does end of tenancy cleaning include
- how much does end of tenancy cleaning cost Manchester
- how long does deep cleaning take
- do tenants need professional cleaning
- how often should wheelie bins be cleaned
- how to prepare for house removals
- mobile valet vs car wash

## Site Architecture

Top-level pages:

- `/`
- `/services`
- `/locations`
- `/booking`
- `/about`
- `/reviews`
- `/journal`
- `/contact`
- `/careers`

Service hubs:

- `/services/cleaning`
- `/services/deep-cleaning`
- `/services/end-of-tenancy-cleaning`
- `/services/pre-tenancy-cleaning`
- `/services/commercial-cleaning`
- `/services/office-cleaning`
- `/services/after-builders-cleaning`
- `/services/airbnb-cleaning`
- `/services/wheelie-bin-cleaning`
- `/services/commercial-bin-cleaning`
- `/services/house-removals`
- `/services/office-removals`
- `/services/packing-services`
- `/services/storage-assistance`
- `/services/mobile-car-wash`
- `/services/vehicle-valeting`

Location hubs:

- `/locations/manchester`
- `/locations/salford`
- `/locations/trafford`
- `/locations/stockport`
- `/locations/bolton`
- `/locations/bury`
- `/locations/oldham`
- `/locations/rochdale`
- `/locations/wigan`
- `/locations/tameside`
- `/locations/cheshire`

Service-location pages:

- `/services/end-of-tenancy-cleaning/manchester`
- `/services/deep-cleaning/salford`
- `/services/wheelie-bin-cleaning/trafford`
- `/services/house-removals/stockport`
- `/services/mobile-car-wash/bolton`

These should be generated only where ScrubSkwad actually serves the area and can provide unique content.

## Page Templates

### Service Hub Template

Required sections:

- Premium hero with service-specific CTA.
- Service overview and ideal use cases.
- What's included.
- Optional add-ons.
- How booking works.
- Live estimate entry point.
- Trust signals.
- Reviews for that service.
- Manchester/Greater Manchester coverage links.
- FAQs.
- Related journal articles.
- Related services.
- Structured data.

### Location Hub Template

Required sections:

- Location-specific hero.
- Services available in the area.
- Local operating notes: parking, access, flats, student housing, commercial districts, landlord/agent demand where relevant.
- Popular service bundles.
- Reviews/case studies tagged to the area when available.
- FAQs.
- Nearby areas.
- Internal links to service-location pages.

### Service-Location Template

Required sections:

- One specific commercial query target.
- Unique local intro.
- Service checklist.
- Price/time factors.
- Local scenarios.
- Booking CTA.
- FAQs.
- Nearby related services.
- Breadcrumbs.

## Metadata Rules

Title pattern examples:

- `End of Tenancy Cleaning Manchester | ScrubSkwad`
- `Deep Cleaning in Salford | Premium Home Cleaning`
- `Mobile Car Wash Manchester | ScrubSkwad Vehicle Care`

Meta description pattern:

- Mention service, location, premium positioning, quote request, and trust signal.
- Keep under approximately 155-160 characters.

Canonical rules:

- Every generated page must self-canonical unless intentionally consolidated.
- Filtered booking states must not be indexed.
- Dashboard, admin, account, quote, and payment pages must be `noindex`.

## Structured Data

Global:

- `Organization`
- `LocalBusiness`
- `WebSite`
- `BreadcrumbList`

Service pages:

- `Service`
- `FAQPage`
- `Review` or `AggregateRating` only when review data is real and compliant.

Journal:

- `Article`
- `BlogPosting`
- `BreadcrumbList`

Booking:

- No fake ratings, no fabricated availability, no unsupported price schema.

## Internal Linking Strategy

Core link flows:

- Homepage to priority service hubs.
- Homepage to priority location hubs.
- Service hubs to service-location pages.
- Location hubs to service pages available in that location.
- Journal guides to commercial service pages.
- Booking flow back to service explainers where helpful.
- Reviews grouped by service and area.

Anchor text examples:

- `end of tenancy cleaning in Manchester`
- `deep cleaning for landlords`
- `wheelie bin cleaning in Salford`
- `mobile vehicle valeting across Greater Manchester`
- `after builders cleaning for renovated homes`

## Journal Strategy

Content clusters:

- Cleaning guides.
- Moving guides.
- Property care.
- Bin hygiene.
- Car care.
- Manchester local guides.
- Airbnb and short-stay operations.
- Commercial property upkeep.

Priority articles:

- What does end-of-tenancy cleaning include in Manchester?
- End-of-tenancy cleaning checklist for tenants and landlords.
- Deep cleaning vs regular cleaning.
- How to prepare for after builders cleaning.
- How often should wheelie bins be cleaned?
- Airbnb cleaning checklist for Manchester hosts.
- House removals checklist for Greater Manchester.
- Mobile car wash vs vehicle valeting.
- Office cleaning checklist for small businesses.

## Programmatic SEO Guardrails

Allowed:

- Generate pages from approved service and location datasets.
- Include unique local modules, FAQs, reviews, and service availability.
- Use canonical tags correctly.
- Exclude weak pages from the sitemap until content is strong.

Not allowed:

- Spinning the same paragraph across dozens of locations.
- Publishing pages for unavailable services.
- Fake reviews or fabricated ratings.
- Indexing internal search/filter pages.

## Technical SEO Requirements

- Next.js App Router metadata per route.
- Dynamic sitemap generation.
- `robots.txt` generation.
- OpenGraph and Twitter Card images.
- Image optimisation with meaningful alt text.
- Fast server rendering and static generation where appropriate.
- Core Web Vitals monitoring.
- Breadcrumbs on all deep pages.
- Clean URL slugs.
- 301 redirect map if replacing an existing website.

## Measurement Plan

Track:

- Organic clicks and impressions by service/location.
- Booking starts by landing page.
- Quote submissions by landing page.
- Assisted conversions from journal content.
- Local pack visibility.
- Indexed page count.
- Core Web Vitals.
- Top internal search terms if site search is added.

Tools:

- Google Search Console.
- GA4 or privacy-conscious equivalent.
- Vercel Analytics.
- Supabase event logs for booking funnel.
- Rank tracking for priority keywords.

## Pre-Implementation SEO Checklist

- Crawl current `scrubskwad.cleaning`.
- Export current URLs, titles, descriptions, headings, assets, and color usage.
- Build redirect map.
- Confirm service availability by location.
- Confirm exact business name, address/area, phone, email, opening hours, and legal entity details.
- Confirm review sources and permissions.

