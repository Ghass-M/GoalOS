-- Goal OS · run once in Supabase → SQL editor
create table if not exists goal_state (user_id uuid primary key references auth.users on delete cascade, data jsonb not null, updated_at timestamptz default now());
create table if not exists push_subs (endpoint text primary key, user_id uuid not null references auth.users on delete cascade, sub jsonb not null);
alter table goal_state enable row level security;
alter table push_subs enable row level security;
create policy "own state" on goal_state for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own subs" on push_subs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Optional (alerts while the app is closed): after deploying the "nudge" function, schedule it every 15 minutes.
-- Enable the pg_cron and pg_net extensions first (Database → Extensions), then run with your own values:
-- select cron.schedule('goalos-nudge', '*/15 * * * *', $$ select net.http_post(
--   url := 'https://YOUR-PROJECT.supabase.co/functions/v1/nudge',
--   headers := '{"Authorization":"Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb) $$);
