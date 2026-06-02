create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'footer',
  status text not null default 'subscribed' check (status in ('subscribed', 'unsubscribed')),
  created_at timestamptz not null default now()
);

alter table public.newsletter_signups enable row level security;

-- Newsletter inserts are handled by the server API using the service role.
