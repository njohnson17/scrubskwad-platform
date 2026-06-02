# Phase 2 Implementation Notes

## Completed Locally

- Next.js App Router scaffold.
- Deterministic pricing engine.
- Booking lifecycle API routes.
- Booking event logging.
- Submit-time admin notification through Resend when configured.
- Multi-step booking wizard.
- Live estimate sidebar.
- Auth-gated booking flow using Supabase session bearer tokens.
- Minimal admin bookings view with detail inspection and approve/reject.
- Supabase migration for `profiles`, `bookings`, `booking_events`, and `pricing_rules`.
- RLS policies for user-owned bookings and event visibility.
- Vercel project config.

## API Routes

- `POST /api/booking/create`
- `POST /api/booking/update`
- `POST /api/booking/calculate`
- `POST /api/booking/submit`
- `GET /api/booking/:id`
- `GET /api/admin/bookings`
- `POST /api/admin/bookings/:id/status`

## Environment Variables

Required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAILS`
- `RESEND_API_KEY`
- `ADMIN_NOTIFICATION_TO`
- `ADMIN_NOTIFICATION_FROM`

`ADMIN_EMAILS` should be a comma-separated fallback list of Supabase Auth user emails allowed to access admin routes. Preferred admin access is `profiles.role = 'admin'`.

## Security Notes

- Booking write/read APIs require a valid Supabase bearer token.
- Admin APIs require a valid Supabase bearer token and either `profiles.role = 'admin'` or an email listed in `ADMIN_EMAILS`.
- Submitted bookings are locked from customer updates.
- RLS is enabled on all phase-two tables.
- Public write access is not enabled.

## Deployment Steps

1. Install dependencies with `npm install`.
2. Apply `supabase/migrations/202606020001_phase2_booking_engine.sql`.
3. Set required environment variables in Vercel.
4. Mark admin users with `update public.profiles set role = 'admin' where id = '<user-id>';`.
5. Run `npm run typecheck` and `npm run build`.
6. Deploy with Vercel.

## Not Completed In This Environment

- Dependency installation.
- Build/lint execution.
- Supabase migration deployment.
- Vercel deployment.
- Git branch/commit/PR.

Those require package manager, git, Supabase CLI/project access, Vercel CLI/project access, and GitHub access that are not available in this local workspace session.
