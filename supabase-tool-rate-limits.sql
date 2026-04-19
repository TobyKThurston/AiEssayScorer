-- Rate limit table for anonymous /tools usage.
-- Tracks one row per tool invocation keyed by IP hash.
-- Run this in Supabase SQL editor once.

create table if not exists tool_usage (
  id bigserial primary key,
  ip_hash text not null,
  tool_slug text not null,
  created_at timestamptz not null default now()
);

create index if not exists tool_usage_ip_hash_created_at_idx
  on tool_usage (ip_hash, created_at desc);

create index if not exists tool_usage_ip_slug_created_at_idx
  on tool_usage (ip_hash, tool_slug, created_at desc);

-- Periodic cleanup of rows older than 48h (cron or manual).
-- delete from tool_usage where created_at < now() - interval '48 hours';
