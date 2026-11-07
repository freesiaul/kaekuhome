// 둥지메이커 · Notion 데이터베이스 → data/<게시판>.json 동기화 (Node 18 이상)
import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const API = process.env.NOTION_API || 'https://api.notion.com/v1';
const TOKEN = process.env.NOTION_TOKEN;
const NEW = '2025-09-03', OLD = '2022-06-28';
if (!TOKEN) {
  console.error('NOTION_TOKEN 이 없어요. GitHub 저장소 Settings → Secrets and variables → Actions 에 추가하세요.');
  process.exit(1);
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function nf(path, ver, opt = {}) {
  for (let i = 0; i < 5; i++) {
    let r;
    try {
      r = await fetch(API + path, {
        method: opt.method || 'GET',
        headers: { Authorization: 'Bearer ' + TOKEN, 'Notion-Version': ver, 'Content-Type': 'application/json' },
        body: opt.body ? JSON.stringify(opt.body) : undefined,
        signal: AbortSignal.timeout(30000)
      });
    } catch (e) { if (i >= 3) throw e; await sleep(2000 * (i + 1)); continue; } // 일시적인 연결 지연은 다시 시도
    if (r.status === 429) { await sleep((+r.headers.get('retry-after') || 1) * 1000); continue; }
    if (!r.ok) throw new Error(path + ' → ' + r.status + ' ' + (await r.text()).slice(0, 200));
    await sleep(340); // 노션은 초당 약 3회까지
    return r.json();
  }
  throw new Error(path + ' → 요청이 너무 많아요(429)');
}

async function containerPublic(db, ver) {
  if (db.public_url) return true;
  const p = db.parent;
  if (p && p.type === 'page_id') {
    try { return !!(await nf('/pages/' + p.page_id, ver)).public_url; } catch { return false; }
  }
  return false;
}

const plain = rt => (rt || []).map(t => t.plain_text).join('');

const COL = { gray: '#9b9a97', brown: '#9f6b53', orange: '#d9730d', yellow: '#cb912f', green: '#448361', blue: '#337ea9', purple: '#9065b0', pink: '#c14c8a', red: '#d44c47' };
function runs(rt) {
  return (rt || []).map(t => {
    const a = t.annotations || {}, o = { x: t.plain_text };
    if (a.bold) o.b = 1;
    if (a.italic) o.i = 1;
    if (a.strikethrough) o.s = 1;
    if (a.underline) o.u = 1;
    if (a.code) o.m = 1;
    if (COL[a.color]) o.c = COL[a.color];
    if (t.href) o.a = t.href;
    return o;
  }).filter(o => o.x !== '');
}

async function openDb(id) {
  const db = await nf('/databases/' + id, NEW);
  if (db.data_sources && db.data_sources.length) {
    const ds = db.data_sources[0].id;
    const sch = await nf('/data_sources/' + ds, NEW);
    return {
      ver: NEW, parent: { type: 'data_source_id', data_source_id: ds }, props: sch.properties, pubAll: await containerPublic(db, NEW),
      query: body => nf('/data_sources/' + ds + '/query', NEW, { method: 'POST', body })
    };
  }
  const old = await nf('/databases/' + id, OLD);
  return {
    ver: OLD, parent: { database_id: id }, props: old.properties, pubAll: await containerPublic(old, OLD),
    query: body => nf('/databases/' + id + '/query', OLD, { method: 'POST', body })
  };
}

async function children(id, ver) {
  let out = [], cur = null;
  do {
    const j = await nf('/blocks/' + id + '/children?page_size=100' + (cur ? '&start_cursor=' + cur : ''), ver);
    out = out.concat(j.results);
    cur = j.has_more ? j.next_cursor : null;
  } while (cur);
  return out;
}

function fileUrl(f) {
  if (!f) return null;
  if (f.type === 'external') return { url: f.external.url, hosted: false };
  if (f.type === 'file') return { url: f.file.url, hosted: true };
  return null;
}

const IMG_MAX = 15 * 1024 * 1024;
const IMG_EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' };
let IMGS = null;
async function saveImage(img, pid) {
  if (!img) return null;
  if (!img.hosted) return /^https?:\/\//i.test(img.url) ? img.url : null;
  try {
    const h = crypto.createHash('sha1').update(new URL(img.url).pathname).digest('hex').slice(0, 10);
    const base = pid.replace(/-/g, '').slice(0, 8) + '-' + h;
    await fs.mkdir('data/img', { recursive: true });
    if (!IMGS) IMGS = new Set(await fs.readdir('data/img'));
    for (const f of IMGS) if (f.startsWith(base + '.')) return 'data/img/' + f;
    const r = await fetch(img.url, { signal: AbortSignal.timeout(30000) });
    if (!r.ok) return null;
    const ct = (r.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    const ext = IMG_EXT[ct];
    if (!ext) return null;
    if ((+r.headers.get('content-length') || 0) > IMG_MAX) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > IMG_MAX) return null;
    const name = base + '.' + ext;
    await fs.writeFile('data/img/' + name, buf);
    IMGS.add(name);
    return 'data/img/' + name;
  } catch { return null; }
}

const BG = { gray: '#9b9a97', brown: '#9f6b53', orange: '#d9730d', yellow: '#cb912f', green: '#448361', blue: '#337ea9', purple: '#9065b0', pink: '#c14c8a', red: '#d44c47' };
const MAXB = 4000, MAXD = 6;
const PWRE = /^\s*(비밀번호|암호|password|pw)\s*[:：]\s*(.+?)\s*$/i;
async function inlineImage(f, budget) {
  if (!f) return null;
  if (!f.hosted) return /^https?:\/\//i.test(f.url) ? f.url : null;
  try {
    const r = await fetch(f.url, { signal: AbortSignal.timeout(30000) });
    if (!r.ok) return null;
    const ct = (r.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    if (!IMG_EXT[ct]) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > 2 * 1024 * 1024 || budget.left < buf.length) return null;
    budget.left -= buf.length;
    return 'data:' + ct + ';base64,' + buf.toString('base64');
  } catch { return null; }
}
async function resolveImgs(list, pid, lock, budget) {
  const out = [];
  for (const x of list) {
    if (x._f) {
      const src = lock ? await inlineImage(x._f, budget) : await saveImage(x._f, pid);
      if (src) out.push({ t: 'img', src, a: x.a });
      continue;
    }
    if (x.c) x.c = await resolveImgs(x.c, pid, lock, budget);
    out.push(x);
  }
  return out;
}
function lockBlocks(blocks, pw) {
  const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12), n = 150000;
  const key = crypto.pbkdf2Sync(pw, salt, n, 32, 'sha256');
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ct = Buffer.concat([c.update(JSON.stringify(blocks), 'utf8'), c.final(), c.getAuthTag()]);
  return { s: salt.toString('base64'), i: iv.toString('base64'), d: ct.toString('base64'), n };
}
async function pageBody(pid, ver, propPw) {
  const lines = []; let img = null, cnt = 0, bodyPw = '';
  async function walk(id, depth) {
    const out = []; let n = 0;
    for (const b of await children(id, ver)) {
      if (++cnt > MAXB) break;
      const d = b[b.type] || {};
      const t = plain(d.rich_text), r = runs(d.rich_text);
      if (depth === 0 && cnt === 1 && b.type === 'paragraph') { const m = PWRE.exec(t); if (m) { bodyPw = m[2]; continue; } }
      const kids = async () => {
        if (!b.has_children || depth >= MAXD) return [];
        const sid = b.type === 'synced_block' && d.synced_from ? d.synced_from.block_id : b.id;
        try { return await walk(sid, depth + 1); } catch (e) { console.warn('하위 블록을 못 읽었어요: ' + e.message.slice(0, 80)); return []; }
      };
      const put = (o, k) => { if (k && k.length) o.c = k; out.push(o); };
      if (b.type !== 'numbered_list_item') n = 0;
      switch (b.type) {
        case 'paragraph': { lines.push(t); const k = await kids(); if (r.length || k.length) put({ t: 'p', r }, k); else if (out.length) out.push({ t: 'p', r: [] }); break; }
        case 'heading_1': case 'heading_2': case 'heading_3': {
          lines.push('', t);
          const h = b.type.slice(-1), k = await kids();
          if (d.is_toggleable) put({ t: 'tg', r, h: +h }, k); else { out.push({ t: 'h' + h, r }); }
          break;
        }
        case 'toggle': lines.push(t); put({ t: 'tg', r }, await kids()); break;
        case 'bulleted_list_item': lines.push('• ' + t); put({ t: 'li', r }, await kids()); break;
        case 'numbered_list_item': n++; lines.push(n + '. ' + t); put({ t: 'ol', r, n }, await kids()); break;
        case 'to_do': lines.push((d.checked ? '☑ ' : '☐ ') + t); put({ t: 'td', r, c0: d.checked ? 1 : 0 }, await kids()); break;
        case 'quote': lines.push('> ' + t); put({ t: 'q', r }, await kids()); break;
        case 'callout': {
          lines.push('> ' + t);
          const o = { t: 'co', r }, ic = d.icon;
          if (ic && ic.type === 'emoji') o.e = ic.emoji;
          const bg = String(d.color || '').replace('_background', '');
          if (/_background$/.test(d.color || '') && BG[bg]) o.bg = BG[bg];
          put(o, await kids());
          break;
        }
        case 'column_list': put({ t: 'cols' }, await kids()); break;
        case 'column': put({ t: 'col' }, await kids()); break;
        case 'synced_block': for (const x of await kids()) out.push(x); break;
        case 'code': lines.push(t); out.push({ t: 'code', x: t }); break;
        case 'equation': lines.push(d.expression || ''); out.push({ t: 'code', x: d.expression || '' }); break;
        case 'divider': lines.push('———'); out.push({ t: 'hr' }); break;
        case 'table': {
          const rows = [];
          for (const tr of await children(b.id, ver)) {
            if (tr.type === 'table_row') rows.push(tr.table_row.cells.map(c => runs(c)));
          }
          if (rows.length) { out.push({ t: 'tb', h: d.has_column_header ? 1 : 0, rows }); lines.push(rows.map(x => x.map(c => c.map(y => y.x).join('')).join(' | ')).join('\n')); }
          break;
        }
        case 'bookmark': case 'link_preview': case 'embed': {
          if (d.url) { const cap = plain(d.caption); lines.push(d.url); out.push({ t: 'lk', u: d.url, x: cap || d.url }); }
          break;
        }
        case 'video': case 'file': case 'pdf': case 'audio': {
          const f = fileUrl(d);
          if (f && !f.hosted) { const cap = plain(d.caption); lines.push(f.url); out.push({ t: 'lk', u: f.url, x: cap || f.url }); }
          break;
        }
        case 'image': {
          const f = fileUrl(d);
          if (f) {
            if (!img) img = f;
            out.push({ t: 'img', _f: f, a: plain(d.caption) });
          }
          break;
        }
        default: break;
      }
    }
    while (out.length && out[out.length - 1].t === 'p' && !(out[out.length - 1].r || []).length && !out[out.length - 1].c) out.pop();
    return out;
  }
  let blocks = await walk(pid, 0);
  const pw = (propPw || bodyPw || '').trim();
  blocks = await resolveImgs(blocks, pid, !!pw, { left: 12 * 1024 * 1024 });
  return { pw, text: lines.join('\n').replace(/\n{3,}/g, '\n\n').trim(), img, blocks };
}

const FULL = process.env.NOTION_FULL === '1';
async function loadOld(board) {
  const m = new Map();
  if (FULL) return m;
  try { for (const p of JSON.parse(await fs.readFile('data/' + board + '.json', 'utf8'))) m.set(p.id, p); } catch {}
  return m;
}
async function reuse(oldMap, board, id, edited) {
  const o = oldMap.get(id);
  if (!o || !o.edited || o.edited !== edited) return null;
  try {
    const j = JSON.parse(await fs.readFile('data/' + board + '/' + id + '.json', 'utf8'));
    if (j.v !== 2) return null;
    return { old: o, data: j.enc ? { enc: j.enc } : { blocks: j.blocks || [] } };
  } catch { return null; }
}

async function finish(board, posts, store, skipped, label) {
  posts.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  const list = posts.slice(0, 200);
  await fs.mkdir('data/' + board, { recursive: true });
  const keep = new Set();
  for (const p of list) {
    const f = 'data/' + board + '/' + p.id + '.json';
    keep.add(p.id + '.json');
    const o = JSON.stringify(Object.assign({ v: 2 }, store.get(p.id) || { blocks: [] })) + '\n';
    let old = ''; try { old = await fs.readFile(f, 'utf8'); } catch {}
    if (old !== o) await fs.writeFile(f, o);
  }
  for (const f of await fs.readdir('data/' + board)) if (!keep.has(f)) await fs.unlink('data/' + board + '/' + f);
  const out = JSON.stringify(list, null, 1) + '\n';
  let old = ''; try { old = await fs.readFile('data/' + board + '.json', 'utf8'); } catch {}
  if (old !== out) await fs.writeFile('data/' + board + '.json', out);
  console.log(board + label + ': 글 ' + posts.length + '개' + (skipped ? ' (노션에서 웹 공개 안 된 글 ' + skipped + '개 제외)' : '') + (old !== out ? ' (갱신됨)' : ' (변경 없음)'));
}

async function syncPage(board, pid, mode, nested) {
  const root = await nf('/pages/' + pid, NEW);
  const posts = [], store = new Map(), oldMap = await loadOld(board); let skipped = 0;
  async function take(parent, parentPub, cat) {
    const kids = (await children(parent, NEW)).filter(b => b.type === 'child_page');
    for (const b of kids) {
      const pg = await nf('/pages/' + b.id, NEW);
      if (mode === 'web' && !parentPub && !pg.public_url) { skipped++; continue; }
      const id = b.id.replace(/-/g, ''), title = (b.child_page && b.child_page.title) || '(제목 없음)';
      const hit = await reuse(oldMap, board, id, pg.last_edited_time);
      if (hit) { store.set(id, hit.data); posts.push(Object.assign({}, hit.old, { title, category: cat })); continue; }
      const { pw, text, img, blocks } = await pageBody(b.id, NEW);
      const cv = fileUrl(pg.cover);
      store.set(id, pw ? { enc: lockBlocks(blocks, pw) } : { blocks });
      const post = {
        id,
        title,
        body: pw ? '' : text.slice(0, 1200),
        image: pw ? null : await saveImage(cv || img, b.id),
        category: cat,
        created_at: b.created_time,
        edited: pg.last_edited_time
      };
      if (pw) post.lock = 1; else if (!cv && img) post.inl = 1;
      posts.push(post);
    }
  }
  if (nested) {
    for (const c of (await children(pid, NEW)).filter(b => b.type === 'child_page')) {
      const cp = await nf('/pages/' + c.id, NEW);
      await take(c.id, !!root.public_url || !!cp.public_url, (c.child_page && c.child_page.title) || '');
    }
  } else await take(pid, !!root.public_url, '');
  await finish(board, posts, store, skipped, ' (페이지 방식' + (nested ? ', 카테고리' : '') + ')');
}

async function syncBoard(board, cfg) {
  const dbId = typeof cfg === 'string' ? cfg : cfg.id;
  const mode = typeof cfg === 'string' ? 'check' : (cfg.pub || 'web');
  let skipped = 0; const store = new Map(), oldMap = await loadOld(board);
  let db;
  try { db = await openDb(dbId); }
  catch (e) {
    if (!/ → (400|404)/.test(e.message)) throw e;
    return syncPage(board, dbId, mode, typeof cfg === 'object' && !!cfg.cat);
  }
  const ent = Object.entries(db.props);
  const find = (type, re) => (ent.find(([k, v]) => v.type === type && re.test(k)) || [])[0];
  const titleP = (ent.find(([, v]) => v.type === 'title') || [])[0];
  const pubP = find('checkbox', /^(공개|게시|발행|published?|public)$/i);
  const dateP = find('date', /^(날짜|작성일|date)$/i);
  const catP = find('select', /^(카테고리|분류|category)$/i);
  const pwP = (ent.find(([k, v]) => (v.type === 'rich_text') && /^(비밀번호|암호|password|pw)$/i.test(k)) || [])[0];
  const imgP = ent.find(([k, v]) => (v.type === 'files' || v.type === 'url') && /^(이미지|사진|image|cover)$/i.test(k));
  const posts = [];
  let cursor = null;
  do {
    const body = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;
    if (mode === 'check' && pubP) body.filter = { property: pubP, checkbox: { equals: true } };
    const j = await db.query(body);
    for (const pg of j.results) {
      if (mode === 'web' && !db.pubAll && !pg.public_url) { skipped++; continue; }
      const pr = pg.properties || {};
      const title = plain(pr[titleP] && pr[titleP].title) || '(제목 없음)';
      const id = pg.id.replace(/-/g, '');
      const category = (catP && pr[catP] && pr[catP].select && pr[catP].select.name) || '';
      const hit = await reuse(oldMap, board, id, pg.last_edited_time);
      if (hit) { store.set(id, hit.data); posts.push(Object.assign({}, hit.old, { title, category })); continue; }
      const pwv = pwP && pr[pwP] && (pr[pwP].rich_text ? plain(pr[pwP].rich_text) : pr[pwP].title ? plain(pr[pwP].title) : '');
      const { pw, text, img, blocks } = await pageBody(pg.id, db.ver, pwv);
      let cover = null;
      if (imgP) {
        const v = pr[imgP[0]];
        cover = v && (v.type === 'url' ? (v.url ? { url: v.url, hosted: false } : null) : fileUrl(v.files && v.files[0]));
      }
      const inl = !cover && !fileUrl(pg.cover) && !!img;
      cover = cover || fileUrl(pg.cover) || img;
      store.set(id, pw ? { enc: lockBlocks(blocks, pw) } : { blocks });
      const post = {
        id,
        title,
        body: pw ? '' : text.slice(0, 1200),
        image: pw ? null : await saveImage(cover, pg.id),
        category,
        created_at: (dateP && pr[dateP] && pr[dateP].date && pr[dateP].date.start) || pg.created_time,
        edited: pg.last_edited_time
      };
      if (pw) post.lock = 1; else if (inl) post.inl = 1;
      posts.push(post);
    }
    cursor = j.has_more ? j.next_cursor : null;
  } while (cursor);
  await finish(board, posts, store, skipped, '');
}

async function syncCal(name, cfg) {
  const db = await openDb(cfg.id);
  const ent = Object.entries(db.props);
  const dateP = (ent.find(([k, v]) => v.type === 'date' && /^(날짜|일정|date|when)$/i.test(k)) || ent.find(([, v]) => v.type === 'date') || [])[0];
  if (!dateP) throw new Error('일정 데이터베이스에 "날짜" 속성이 없어요. 속성 추가 → 날짜');
  const pubP = (ent.find(([k, v]) => v.type === 'checkbox' && /^(공개|게시|발행|published?|public)$/i.test(k)) || [])[0];
  const catP = (ent.find(([k, v]) => v.type === 'select' && /^(카테고리|분류|category)$/i.test(k)) || [])[0];
  const out = []; let cursor = null;
  do {
    const body = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;
    if (pubP) body.filter = { property: pubP, checkbox: { equals: true } };
    const j = await db.query(body);
    for (const pg of j.results) {
      const pr = pg.properties || {};
      const d = pr[dateP] && pr[dateP].date;
      if (!d || !d.start) continue;
      const title = plain(Object.values(pr).find(v => v.type === 'title').title) || '(제목 없음)';
      const ev = { id: pg.id.replace(/-/g, ''), title, s: d.start.slice(0, 10) };
      if (d.start.length > 10) ev.t = d.start.slice(11, 16);
      if (d.end) { ev.e = d.end.slice(0, 10); if (d.end.length > 10) ev.et = d.end.slice(11, 16); }
      const c = catP && pr[catP] && pr[catP].select && pr[catP].select.name;
      if (c) ev.c = c;
      out.push(ev);
    }
    cursor = j.has_more ? j.next_cursor : null;
  } while (cursor);
  out.sort((a, b) => (a.s + (a.t || '')) < (b.s + (b.t || '')) ? -1 : 1);
  const txt = JSON.stringify(out.slice(0, 2000), null, 1) + '\n';
  let old = ''; try { old = await fs.readFile('data/' + name + '.json', 'utf8'); } catch {}
  if (old !== txt) await fs.writeFile('data/' + name + '.json', txt);
  console.log(name + ' (캘린더): 일정 ' + out.length + '개' + (old !== txt ? ' (갱신됨)' : ' (변경 없음)'));
}

async function syncGuest(name, cfg) {
  if (!cfg.id) throw new Error('노션 방명록 DB 주소가 비어 있어요 (scripts/notion-boards.json 의 id)');
  if (!cfg.fk || !cfg.fp) throw new Error('Firebase 정보(fk, fp)가 비어 있어요');
  const db = await openDb(cfg.id);
  const ent = Object.entries(db.props);
  const by = (type, re) => (ent.find(([k, v]) => v.type === type && re.test(k)) || [])[0];
  const titleP = (ent.find(([, v]) => v.type === 'title') || [])[0];
  const contentP = by('rich_text', /^(내용|메시지|message|content)$/i);
  const idP = by('rich_text', /^(id|아이디|글 ?id)$/i);
  const dateP = by('date', /^(작성일|날짜|date)$/i);
  const hideP = by('checkbox', /^(숨김|숨기기|hide|hidden)$/i);
  const replyP = by('rich_text', /^(답글|답장|reply)$/i);
  const miss = [];
  if (!contentP) miss.push('내용(텍스트)');
  if (!idP) miss.push('ID(텍스트)');
  if (!hideP) miss.push('숨김(체크박스)');
  if (!replyP) miss.push('답글(텍스트)');
  if (miss.length) throw new Error('노션 방명록 데이터베이스에 속성이 더 필요해요: ' + miss.join(', ') + ' (이름 · 작성일(날짜)은 선택)');
  const FS = process.env.FIRESTORE_API || 'https://firestore.googleapis.com/v1';
  const r = await fetch(FS + '/projects/' + encodeURIComponent(cfg.fp) + '/databases/(default)/documents:runQuery?key=' + encodeURIComponent(cfg.fk), {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(30000),
    body: JSON.stringify({ structuredQuery: { from: [{ collectionId: cfg.coll }], orderBy: [{ field: { fieldPath: 'created_at' }, direction: 'DESCENDING' }], limit: 300 } })
  });
  if (!r.ok) throw new Error('Firebase에서 방명록을 읽지 못했어요 (' + r.status + '). 규칙에 읽기 허용이 있는지 확인하세요');
  const rows = (await r.json()).filter(x => x.document).map(x => {
    const f = x.document.fields || {};
    const g = k => (f[k] && (f[k].stringValue || f[k].timestampValue)) || '';
    return { id: x.document.name.split('/').pop(), p: g('parent'), n: g('name'), c: g('content'), t: g('created_at') };
  });
  const have = new Map();
  let cursor = null;
  do {
    const body = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;
    const j = await db.query(body);
    for (const pg of j.results) {
      const pr = pg.properties || {};
      const idv = plain(pr[idP] && pr[idP].rich_text);
      if (idv) have.set(idv, pg);
    }
    cursor = j.has_more ? j.next_cursor : null;
  } while (cursor);
  const add = rows.filter(x => !have.has(x.id)).reverse().slice(0, 60);
  for (const x of add) {
    const props = {};
    if (titleP) props[titleP] = { title: [{ text: { content: (x.n || '방문자').slice(0, 100) } }] };
    props[contentP] = { rich_text: [{ text: { content: x.c.slice(0, 1900) } }] };
    props[idP] = { rich_text: [{ text: { content: x.id } }] };
    if (dateP && x.t) props[dateP] = { date: { start: x.t } };
    have.set(x.id, await nf('/pages', db.ver, { method: 'POST', body: { parent: db.parent, properties: props } }));
  }
  const byId = new Map(rows.map(x => [x.id, x]));
  const hide = [], reply = {};
  for (const [id, pg] of have) {
    const pr = pg.properties || {};
    if (pr[hideP] && pr[hideP].checkbox) { hide.push(id); continue; }
    const txt = plain(pr[replyP] && pr[replyP].rich_text).trim();
    if (!txt) continue;
    const row = byId.get(id);
    const root = row && row.p ? row.p : id;
    for (const line of txt.split('\n')) {
      const c = line.trim();
      if (c) (reply[root] = reply[root] || []).push({ n: cfg.admin || '주인', c: c.slice(0, 500), d: pg.last_edited_time });
    }
  }
  hide.sort();
  const out = {};
  out.hide = hide;
  out.reply = {};
  Object.keys(reply).sort().forEach(k => { out.reply[k] = reply[k]; });
  const txt = JSON.stringify(out, null, 1) + '\n';
  let old = ''; try { old = await fs.readFile('data/' + name + '.json', 'utf8'); } catch {}
  if (old !== txt) await fs.writeFile('data/' + name + '.json', txt);
  console.log(name + ' (방명록): 글 ' + rows.length + '개, 새로 노션에 추가 ' + add.length + '개, 숨김 ' + hide.length + '개' + (old !== txt ? ' (갱신됨)' : ' (변경 없음)'));
}

const boards = JSON.parse(await fs.readFile('scripts/notion-boards.json', 'utf8'));
let failed = 0;
for (const [board, cfg] of Object.entries(boards)) {
  if (!/^[a-z0-9-]+$/.test(board)) { failed++; console.error(board + ' 실패: 게시판 이름은 영문 소문자, 숫자, - 만 쓸 수 있어요'); continue; }
  try { if (cfg && cfg.kind === 'cal') await syncCal(board, cfg); else if (cfg && cfg.kind === 'guest') await syncGuest(board, cfg); else await syncBoard(board, cfg); }
  catch (e) { failed++; console.error(board + ' 실패: ' + e.message); }
}
if (failed) process.exit(1);
