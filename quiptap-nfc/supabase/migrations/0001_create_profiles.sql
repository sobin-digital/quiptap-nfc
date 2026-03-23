-- Enable gen_random_uuid()
create extension if not exists pgcrypto;

-- Create profiles table (one row per auth user).
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  slug text not null unique,
  template text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can only access their own profile.
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (user_id = auth.uid());

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (user_id = auth.uid());

-- Auto-create profile row on signup.
create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
as $$
declare
  base_slug text;
  slug_candidate text;
  name_candidate text;
begin
  name_candidate := nullif(new.raw_user_meta_data->>'full_name', '');

  if name_candidate is null then
    -- Fallback: use email local-part (before @).
    name_candidate := split_part(new.email, '@', 1);
  end if;

  base_slug := lower(regexp_replace(coalesce(name_candidate, ''), '[^a-z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);

  if base_slug is null or base_slug = '' then
    base_slug := 'user';
  end if;

  slug_candidate := base_slug;

  loop
    begin
      insert into public.profiles (user_id, slug, template, data)
      values (new.id, slug_candidate, null, '{}'::jsonb);
      exit;
    exception
      when unique_violation then
        -- Collision: append a short random suffix.
        slug_candidate := base_slug || '-' || substring(md5(random()::text), 1, 8);
    end;
  end loop;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute procedure public.handle_new_user_profile();

-- Enforce permanent slugs at the DB level.
create or replace function public.prevent_slug_update()
returns trigger
language plpgsql
as $$
begin
  new.slug := old.slug;
  return new;
end;
$$;

drop trigger if exists prevent_slug_update on public.profiles;
create trigger prevent_slug_update
before update on public.profiles
for each row
execute procedure public.prevent_slug_update();

