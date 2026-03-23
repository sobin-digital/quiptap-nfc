-- Allow anonymous users to read public-safe profile data by `slug`.
-- We also restrict column-level SELECT privileges so `user_id` cannot be fetched via the anon key.

-- Column privileges (prevents user_id exposure even if RLS allows selecting rows).
revoke all on table public.profiles from anon;
grant select (slug, template, data) on table public.profiles to anon;

alter table public.profiles enable row level security;

-- RLS: allow anon to select public profiles.
create policy "profiles_select_public_safe" on public.profiles
for select to anon
using (slug is not null);

