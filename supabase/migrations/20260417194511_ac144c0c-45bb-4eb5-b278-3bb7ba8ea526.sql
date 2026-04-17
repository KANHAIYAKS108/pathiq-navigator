create table public.roadmaps (
  id uuid primary key default gen_random_uuid(),
  career text not null,
  skill_level text not null,
  hours_per_day int not null,
  data jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.roadmaps enable row level security;

create policy "anyone can read roadmaps"
  on public.roadmaps for select using (true);

create policy "anyone can create roadmaps"
  on public.roadmaps for insert with check (true);

create table public.node_progress (
  id uuid primary key default gen_random_uuid(),
  roadmap_id uuid not null references public.roadmaps(id) on delete cascade,
  session_id text not null,
  node_id text not null,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (roadmap_id, session_id, node_id)
);

alter table public.node_progress enable row level security;

create policy "anyone can read progress"
  on public.node_progress for select using (true);

create policy "anyone can insert progress"
  on public.node_progress for insert with check (true);

create policy "anyone can update progress"
  on public.node_progress for update using (true);

create index node_progress_lookup_idx on public.node_progress(roadmap_id, session_id);