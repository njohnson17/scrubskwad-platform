# Database Architecture

Approval status: Draft for review  
Project: ScrubSkwad premium service marketplace  
Date: 2026-06-02

## Platform Assumptions

Database: PostgreSQL on Supabase  
Auth: Supabase Auth  
Storage: Supabase Storage  
Server logic: Supabase Edge Functions plus Next.js server actions/API routes where appropriate  
Payments: deposit workflow to be integrated after admin approval  
Email: Resend

The platform treats bookings as quote requests first. A customer submits a request, an admin reviews it, and the customer pays a 50% deposit only after approval.

## Core Data Domains

- Identity and profiles.
- Services and configurable options.
- Locations and coverage.
- Booking/quote requests.
- Estimates and pricing.
- Admin review and approvals.
- Payments/deposits.
- Reviews and testimonials.
- Journal and comments.
- Social content.
- Email notifications.
- Audit and moderation.

## Proposed Tables

### `profiles`

Extends Supabase Auth users.

Columns:

- `id uuid primary key references auth.users(id)`
- `role text check in ('customer','admin','staff')`
- `full_name text`
- `phone text`
- `marketing_consent boolean`
- `created_at timestamptz`
- `updated_at timestamptz`

### `customers`

Customer CRM record.

Columns:

- `id uuid primary key`
- `profile_id uuid references profiles(id)`
- `email text`
- `phone text`
- `full_name text`
- `default_address_id uuid`
- `lifetime_value numeric`
- `notes text`
- `created_at timestamptz`
- `updated_at timestamptz`

### `addresses`

Reusable address records.

Columns:

- `id uuid primary key`
- `customer_id uuid references customers(id)`
- `line1 text`
- `line2 text`
- `city text`
- `county text`
- `postcode text`
- `country text default 'GB'`
- `lat numeric`
- `lng numeric`
- `property_type text`
- `property_size text`
- `access_notes text`
- `created_at timestamptz`

Indexes:

- `addresses_postcode_idx`
- `addresses_customer_id_idx`

### `service_categories`

Columns:

- `id uuid primary key`
- `name text`
- `slug text unique`
- `description text`
- `sort_order int`
- `is_active boolean`

### `services`

Columns:

- `id uuid primary key`
- `category_id uuid references service_categories(id)`
- `name text`
- `slug text unique`
- `short_description text`
- `long_description text`
- `base_price numeric`
- `base_duration_minutes int`
- `minimum_team_size int`
- `is_multi_selectable boolean`
- `is_active boolean`
- `created_at timestamptz`
- `updated_at timestamptz`

### `service_options`

Dynamic questions and add-ons per service.

Columns:

- `id uuid primary key`
- `service_id uuid references services(id)`
- `key text`
- `label text`
- `type text check in ('boolean','number','single_select','multi_select','text','date','time')`
- `choices jsonb`
- `price_modifier jsonb`
- `duration_modifier jsonb`
- `team_modifier jsonb`
- `is_required boolean`
- `sort_order int`
- `is_active boolean`

### `coverage_areas`

Columns:

- `id uuid primary key`
- `name text`
- `slug text unique`
- `postcode_prefixes text[]`
- `travel_fee numeric`
- `is_active boolean`
- `seo_title text`
- `seo_description text`

### `service_coverage`

Columns:

- `service_id uuid references services(id)`
- `coverage_area_id uuid references coverage_areas(id)`
- `is_available boolean`
- `primary key (service_id, coverage_area_id)`

### `booking_requests`

Columns:

- `id uuid primary key`
- `customer_id uuid references customers(id)`
- `address_id uuid references addresses(id)`
- `status text check in ('draft','submitted','under_review','approved','rejected','deposit_pending','deposit_paid','confirmed','cancelled','completed')`
- `preferred_dates date[]`
- `preferred_time_windows jsonb`
- `flexible_schedule boolean`
- `special_instructions text`
- `estimated_total numeric`
- `estimated_deposit numeric`
- `estimated_duration_minutes int`
- `estimated_team_size int`
- `travel_cost numeric`
- `submitted_at timestamptz`
- `approved_at timestamptz`
- `rejected_at timestamptz`
- `confirmed_at timestamptz`
- `created_at timestamptz`
- `updated_at timestamptz`

Indexes:

- `booking_requests_customer_id_idx`
- `booking_requests_status_idx`
- `booking_requests_submitted_at_idx`

### `booking_services`

Selected services in a booking.

Columns:

- `id uuid primary key`
- `booking_request_id uuid references booking_requests(id) on delete cascade`
- `service_id uuid references services(id)`
- `quantity int`
- `configuration jsonb`
- `estimated_price numeric`
- `estimated_duration_minutes int`
- `estimated_team_size int`

### `booking_estimate_events`

Optional analytics and debugging for live estimate changes.

Columns:

- `id uuid primary key`
- `booking_request_id uuid references booking_requests(id)`
- `input_snapshot jsonb`
- `estimate_snapshot jsonb`
- `created_at timestamptz`

### `admin_decisions`

Columns:

- `id uuid primary key`
- `booking_request_id uuid references booking_requests(id)`
- `admin_profile_id uuid references profiles(id)`
- `decision text check in ('approved','rejected','needs_changes')`
- `reason text`
- `adjusted_total numeric`
- `adjusted_deposit numeric`
- `adjusted_duration_minutes int`
- `adjusted_team_size int`
- `created_at timestamptz`

### `payments`

Columns:

- `id uuid primary key`
- `booking_request_id uuid references booking_requests(id)`
- `customer_id uuid references customers(id)`
- `type text check in ('deposit','balance','refund')`
- `provider text`
- `provider_payment_id text`
- `amount numeric`
- `currency text default 'GBP'`
- `status text check in ('pending','paid','failed','refunded')`
- `paid_at timestamptz`
- `created_at timestamptz`

### `reviews`

Columns:

- `id uuid primary key`
- `booking_request_id uuid references booking_requests(id)`
- `customer_id uuid references customers(id)`
- `service_id uuid references services(id)`
- `coverage_area_id uuid references coverage_areas(id)`
- `rating int check (rating between 1 and 5)`
- `title text`
- `body text`
- `source text check in ('website','google','imported')`
- `status text check in ('pending','approved','rejected')`
- `created_at timestamptz`
- `published_at timestamptz`

### `journal_posts`

Columns:

- `id uuid primary key`
- `title text`
- `slug text unique`
- `excerpt text`
- `body mdx/text`
- `category text`
- `author_profile_id uuid references profiles(id)`
- `status text check in ('draft','scheduled','published','archived')`
- `seo_title text`
- `seo_description text`
- `published_at timestamptz`
- `created_at timestamptz`
- `updated_at timestamptz`

### `comments`

Columns:

- `id uuid primary key`
- `post_id uuid references journal_posts(id)`
- `customer_id uuid references customers(id)`
- `body text`
- `status text check in ('pending','approved','rejected','spam','toxic')`
- `moderation_score jsonb`
- `created_at timestamptz`
- `moderated_at timestamptz`

### `email_events`

Columns:

- `id uuid primary key`
- `booking_request_id uuid references booking_requests(id)`
- `customer_id uuid references customers(id)`
- `template_key text`
- `provider_message_id text`
- `recipient_email text`
- `status text`
- `payload jsonb`
- `sent_at timestamptz`
- `created_at timestamptz`

### `audit_log`

Columns:

- `id uuid primary key`
- `actor_profile_id uuid references profiles(id)`
- `entity_type text`
- `entity_id uuid`
- `action text`
- `before jsonb`
- `after jsonb`
- `created_at timestamptz`

## Row Level Security

RLS should be enabled on all customer, booking, payment, review, and comment tables.

Customer access:

- Customers can read and update their own profile.
- Customers can create booking requests.
- Customers can read their own bookings, payments, and reviews.
- Customers cannot edit submitted bookings except through approved change flows.

Admin access:

- Admins can read and manage bookings, customers, services, pricing, reviews, comments, posts, and email events.
- Admin actions should be logged.

Public access:

- Public can read active services, active coverage areas, published journal posts, approved reviews, approved comments where enabled.
- Public cannot read customer details or booking data.

## Pricing Model

Pricing should be data-driven from `services`, `service_options`, `coverage_areas`, and booking configuration.

Estimate inputs:

- Selected services.
- Property type and size.
- Bedrooms and bathrooms.
- Dirt level.
- Pet hair, mould, carpets, oven, fridge, move-in/out flags.
- Number and type of bins.
- Removals distance, stairs, lift access, packing, dismantling, vehicle size.
- Vehicle type and valet level.
- Team requirements.
- Preferred time/date and travel area.

Estimate outputs:

- Estimated total.
- Deposit amount.
- Estimated duration.
- Suggested team size.
- Travel cost.
- Service breakdown.
- Admin review flag when uncertainty is high.

## Migration Order

1. Extensions and enums.
2. Profiles and customers.
3. Addresses and coverage.
4. Services and service options.
5. Booking requests and booking services.
6. Admin decisions and payments.
7. Reviews, journal posts, comments.
8. Email events and audit log.
9. RLS policies.
10. Seed data for services and coverage.

## Approval Decisions Needed

- Confirm whether staff/technician scheduling is required in phase one or later.
- Confirm payment provider.
- Confirm whether Google Reviews are imported, embedded, or stored as references.
- Confirm whether journal content uses Markdown, MDX, or database rich text.
- Confirm whether quotes expire after a fixed period.

