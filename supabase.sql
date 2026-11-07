-- 둥지메이커 게시판용 · Supabase 대시보드의 SQL Editor에 붙여 넣고 Run
create table if not exists public.posts (
  id bigint generated always as identity primary key,
  board text not null,
  title text not null,
  body text not null default '',
  image text,
  category text,
  created_at timestamptz not null default now()
);
alter table public.posts add column if not exists category text;
create index if not exists posts_board_created on public.posts (board, created_at desc);

alter table public.posts enable row level security;

drop policy if exists "누구나 읽기" on public.posts;
create policy "누구나 읽기" on public.posts for select using (true);

drop policy if exists "관리자만 쓰기" on public.posts;
create policy "관리자만 쓰기" on public.posts for all to authenticated
  using (lower(auth.jwt() ->> 'email') = 'admin@example.com')
  with check (lower(auth.jwt() ->> 'email') = 'admin@example.com');

-- 사진 올리기용 저장소 (관리자 화면의 "사진 올리기" 버튼에 필요)
insert into storage.buckets (id, name, public) values ('photos', 'photos', true)
  on conflict (id) do update set public = true;

drop policy if exists "사진 누구나 보기" on storage.objects;
create policy "사진 누구나 보기" on storage.objects for select using (bucket_id = 'photos');

drop policy if exists "사진 관리자만 쓰기" on storage.objects;
create policy "사진 관리자만 쓰기" on storage.objects for all to authenticated
  using (bucket_id = 'photos' and lower(auth.jwt() ->> 'email') = 'admin@example.com')
  with check (bucket_id = 'photos' and lower(auth.jwt() ->> 'email') = 'admin@example.com');

-- 스티커 위젯용 (스티커 위치 저장)
create table if not exists public.stickers (
  layer text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.stickers enable row level security;

drop policy if exists "스티커 누구나 읽기" on public.stickers;
create policy "스티커 누구나 읽기" on public.stickers for select using (true);

drop policy if exists "스티커 관리자만 쓰기" on public.stickers;
create policy "스티커 관리자만 쓰기" on public.stickers for all to authenticated
  using (lower(auth.jwt() ->> 'email') = 'admin@example.com')
  with check (lower(auth.jwt() ->> 'email') = 'admin@example.com');
