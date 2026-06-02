create extension if not exists "pgcrypto";

do $$ begin
  create type booking_status as enum ('draft', 'pending', 'approved', 'rejected', 'awaiting_deposit', 'paid', 'in_progress', 'completed');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type booking_event_type as enum ('created', 'updated', 'submitted', 'approved', 'rejected', 'deposit_requested', 'paid');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  status booking_status not null default 'draft',
  service_type text not null,
  location_json jsonb not null default '{}'::jsonb,
  config_json jsonb not null default '{}'::jsonb,
  price_estimate numeric(10, 2) not null default 0,
  duration_estimate integer not null default 0,
  staff_required integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists public.booking_details (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  detail_type text not null,
  detail_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('customer', 'admin', 'staff')),
  full_name text,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create table if not exists public.booking_events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  event_type booking_event_type not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  provider text not null default 'manual',
  type text not null default 'deposit',
  amount numeric(10, 2) not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  payment_url text,
  provider_payment_id text,
  provider_metadata jsonb not null default '{}'::jsonb,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.pricing_rules (
  id uuid primary key default gen_random_uuid(),
  service_type text not null unique,
  base_price numeric(10, 2) not null default 0,
  per_room_price numeric(10, 2) not null default 0,
  per_bathroom_price numeric(10, 2) not null default 0,
  dirt_multiplier jsonb not null default '{"low":1,"medium":1.2,"high":1.5,"extreme":2}'::jsonb,
  mover_rate_per_hour numeric(10, 2) not null default 0,
  bin_price numeric(10, 2) not null default 0,
  car_wash_price numeric(10, 2) not null default 0,
  distance_multiplier numeric(10, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  title text,
  body text not null,
  source text not null default 'website',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.journal_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  body text not null,
  category text not null,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.journal_posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  body text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'spam', 'toxic')),
  moderation_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  moderated_at timestamptz
);

create table if not exists public.social_feeds (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('instagram', 'tiktok', 'facebook', 'youtube')),
  external_id text,
  url text not null,
  caption text,
  media_url text,
  status text not null default 'active' check (status in ('active', 'hidden')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.seo_pages (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null,
  location_slug text not null,
  service_name text not null,
  location_name text not null,
  h1 text not null,
  body text not null,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(service_slug, location_slug)
);

create index if not exists bookings_user_id_idx on public.bookings(user_id);
create index if not exists bookings_status_idx on public.bookings(status);
create index if not exists bookings_created_at_idx on public.bookings(created_at desc);
create index if not exists booking_events_booking_id_idx on public.booking_events(booking_id);
create index if not exists booking_events_event_type_idx on public.booking_events(event_type);
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists booking_details_booking_id_idx on public.booking_details(booking_id);
create index if not exists payments_booking_id_idx on public.payments(booking_id);
create index if not exists reviews_status_idx on public.reviews(status);
create index if not exists journal_posts_status_idx on public.journal_posts(status);
create index if not exists comments_status_idx on public.comments(status);
create index if not exists seo_pages_status_idx on public.seo_pages(status);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists pricing_rules_touch_updated_at on public.pricing_rules;
create trigger pricing_rules_touch_updated_at
before update on public.pricing_rules
for each row execute function public.touch_updated_at();

insert into public.pricing_rules (
  service_type,
  base_price,
  per_room_price,
  per_bathroom_price,
  dirt_multiplier,
  mover_rate_per_hour,
  bin_price,
  car_wash_price,
  distance_multiplier
) values
  ('cleaning', 80, 15, 20, '{"low":1,"medium":1.2,"high":1.5,"extreme":2}', 0, 0, 0, 1.5),
  ('removals', 0, 0, 0, '{"low":1,"medium":1.2,"high":1.5,"extreme":2}', 40, 0, 0, 1.5),
  ('bins', 0, 0, 0, '{"low":1,"medium":1.2,"high":1.5,"extreme":2}', 0, 10, 0, 1.5),
  ('car_wash', 0, 0, 0, '{"low":1,"medium":1.2,"high":1.5,"extreme":2}', 0, 0, 25, 1.5)
on conflict (service_type) do update set
  base_price = excluded.base_price,
  per_room_price = excluded.per_room_price,
  per_bathroom_price = excluded.per_bathroom_price,
  dirt_multiplier = excluded.dirt_multiplier,
  mover_rate_per_hour = excluded.mover_rate_per_hour,
  bin_price = excluded.bin_price,
  car_wash_price = excluded.car_wash_price,
  distance_multiplier = excluded.distance_multiplier;

alter table public.bookings enable row level security;
alter table public.booking_details enable row level security;
alter table public.booking_events enable row level security;
alter table public.pricing_rules enable row level security;
alter table public.profiles enable row level security;
alter table public.payments enable row level security;
alter table public.audit_logs enable row level security;
alter table public.reviews enable row level security;
alter table public.journal_posts enable row level security;
alter table public.comments enable row level security;
alter table public.social_feeds enable row level security;
alter table public.seo_pages enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles for insert
to authenticated
with check (auth.uid() = id and role = 'customer');

drop policy if exists "Users can read own bookings" on public.bookings;
create policy "Users can read own bookings"
on public.bookings for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can create own bookings" on public.bookings;
create policy "Users can create own bookings"
on public.bookings for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own draft or pending bookings" on public.bookings;
create policy "Users can update own draft or pending bookings"
on public.bookings for update
to authenticated
using (auth.uid() = user_id and status in ('draft', 'pending'))
with check (auth.uid() = user_id);

drop policy if exists "Users can read own booking events" on public.booking_events;
create policy "Users can read own booking events"
on public.booking_events for select
to authenticated
using (
  exists (
    select 1
    from public.bookings
    where bookings.id = booking_events.booking_id
      and bookings.user_id = auth.uid()
  )
);

drop policy if exists "Users can read own booking details" on public.booking_details;
create policy "Users can read own booking details"
on public.booking_details for select
to authenticated
using (
  exists (
    select 1 from public.bookings
    where bookings.id = booking_details.booking_id
      and bookings.user_id = auth.uid()
  )
);

drop policy if exists "Users can read own payments" on public.payments;
create policy "Users can read own payments"
on public.payments for select
to authenticated
using (
  exists (
    select 1 from public.bookings
    where bookings.id = payments.booking_id
      and bookings.user_id = auth.uid()
  )
);

drop policy if exists "Users can create events for own bookings" on public.booking_events;
create policy "Users can create events for own bookings"
on public.booking_events for insert
to authenticated
with check (
  exists (
    select 1
    from public.bookings
    where bookings.id = booking_events.booking_id
      and bookings.user_id = auth.uid()
  )
);

drop policy if exists "Authenticated users can read pricing rules" on public.pricing_rules;
create policy "Authenticated users can read pricing rules"
on public.pricing_rules for select
to authenticated
using (true);

drop policy if exists "Public can read approved reviews" on public.reviews;
create policy "Public can read approved reviews"
on public.reviews for select
to anon, authenticated
using (status = 'approved');

drop policy if exists "Users can submit reviews" on public.reviews;
create policy "Users can submit reviews"
on public.reviews for insert
to authenticated
with check (auth.uid() = user_id and status = 'pending');

drop policy if exists "Public can read published journal posts" on public.journal_posts;
create policy "Public can read published journal posts"
on public.journal_posts for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Public can read approved comments" on public.comments;
create policy "Public can read approved comments"
on public.comments for select
to anon, authenticated
using (status = 'approved');

drop policy if exists "Users can submit pending comments" on public.comments;
create policy "Users can submit pending comments"
on public.comments for insert
to authenticated
with check (auth.uid() = user_id and status = 'pending');

drop policy if exists "Public can read active social feeds" on public.social_feeds;
create policy "Public can read active social feeds"
on public.social_feeds for select
to anon, authenticated
using (status = 'active');

drop policy if exists "Public can read published seo pages" on public.seo_pages;
create policy "Public can read published seo pages"
on public.seo_pages for select
to anon, authenticated
using (status = 'published');

insert into public.seo_pages (
  service_slug,
  location_slug,
  service_name,
  location_name,
  h1,
  body,
  seo_title,
  seo_description,
  status
) values
  ('cleaning', 'manchester', 'Cleaning', 'Manchester', 'Premium Cleaning in Manchester', 'ScrubSkwad provides premium cleaning quote requests across Manchester with live estimates, admin-reviewed booking approval, and professional service coordination.', 'Cleaning Manchester | ScrubSkwad', 'Premium cleaning quote requests in Manchester with live estimates and admin-approved bookings.', 'published'),
  ('end-of-tenancy', 'salford', 'End of Tenancy Cleaning', 'Salford', 'End of Tenancy Cleaning in Salford', 'Request an end-of-tenancy cleaning quote for Salford properties with room-based pricing, dirt-level modifiers, add-ons, and review before approval.', 'End of Tenancy Cleaning Salford | ScrubSkwad', 'Request a premium end-of-tenancy cleaning quote in Salford with live pricing.', 'published'),
  ('removals', 'trafford', 'Removals', 'Trafford', 'House Removals in Trafford', 'Build a removals quote for Trafford with mover count, hours, stairs, packing, and live deposit-ready estimates.', 'House Removals Trafford | ScrubSkwad', 'Premium removals quote requests in Trafford with live estimates and admin approval.', 'published')
on conflict (service_slug, location_slug) do nothing;

-- Admin list/update operations are performed through server routes using the
-- Supabase service role after ADMIN_EMAILS validation. Service role bypasses RLS.
