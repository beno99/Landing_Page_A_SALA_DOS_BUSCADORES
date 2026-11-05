import type { AcervoVideo } from "@/content/types";

/** Canal "A Sala dos Buscadores" (@ASALADOSBUSCADORES). */
export const CHANNEL_ID = "UCekiO8SyhZ3VTdyH3-CMkrg";

const TIMEOUT = 5000;
const SOURCE = "A Sala dos Buscadores";
const SEAL = "Editorial curado";

type Candidate = { id: string; title: string; published: string; duration?: string; thumb?: string };

const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const dateFormat = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric", timeZone: "America/Sao_Paulo" });
/** "2026-09-03T12:00:00Z" → "3 set 2026" */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return dateFormat.format(d).replace(/\./g, "").replace(/ de /g, " ");
}

/** ISO 8601 duration ("PT1H2M5S") → "1:02:05" / "16:30". */
export function formatDuration(iso: string): string | undefined {
  const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!m) return undefined;
  const [h, min, s] = [Number(m[1] ?? 0), Number(m[2] ?? 0), Number(m[3] ?? 0)];
  const pad = (n: number) => String(n).padStart(2, "0");
  return h ? `${h}:${pad(min)}:${pad(s)}` : `${min}:${pad(s)}`;
}

function decodeXml(text: string): string {
  return text
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&");
}

/** Entries of the channel's Atom feed, newest first, without Shorts (their link points to /shorts/). */
export function parseFeed(xml: string): Candidate[] {
  return Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)).flatMap(([, entry]) => {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([^<]*)<\/title>/)?.[1];
    const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? "";
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
    if (!id || !title || link.includes("/shorts/")) return [];
    return [{ id, title: decodeXml(title).trim(), published }];
  });
}

async function get(url: string, init?: RequestInit): Promise<Response | null> {
  try {
    const res = await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT) });
    return res.ok ? res : null;
  } catch {
    return null;
  }
}

async function fromFeed(): Promise<Candidate[]> {
  const res = await get(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
  return res ? parseFeed(await res.text()) : [];
}

type ApiItem = { id: string; snippet: { title: string; publishedAt: string; thumbnails: Record<string, { url: string }> }; contentDetails: { duration: string } };

/** YouTube Data API v3 (needs YOUTUBE_API_KEY): reliable, and it has durations. Shorts are dropped by checking /shorts/. */
async function fromApi(key: string): Promise<Candidate[]> {
  const uploads = CHANNEL_ID.replace(/^UC/, "UU");
  const list = await get(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=25&playlistId=${uploads}&key=${key}`);
  if (!list) return [];
  const ids: string[] = ((await list.json()).items ?? []).map((i: { contentDetails: { videoId: string } }) => i.contentDetails.videoId);
  if (!ids.length) return [];
  const details = await get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids.join(",")}&key=${key}`);
  if (!details) return [];
  const items: ApiItem[] = (await details.json()).items ?? [];
  return items.map((v) => ({
    id: v.id,
    title: v.snippet.title,
    published: v.snippet.publishedAt,
    duration: formatDuration(v.contentDetails.duration),
    thumb: (v.snippet.thumbnails.maxres ?? v.snippet.thumbnails.high)?.url,
  }));
}

/** youtube.com/shorts/{id} answers 200 for a Short and redirects to /watch for a regular video. */
async function isShort(id: string): Promise<boolean> {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${id}`, { method: "HEAD", redirect: "manual", signal: AbortSignal.timeout(TIMEOUT) });
    return res.status === 200;
  } catch {
    return false;
  }
}

/** maxresdefault is 16:9 without letterboxing but does not exist for every upload; hqdefault always does. */
async function thumbnail(id: string): Promise<string> {
  const max = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  try {
    const res = await fetch(max, { method: "HEAD", signal: AbortSignal.timeout(TIMEOUT) });
    if (res.ok) return max;
  } catch { /* fall through */ }
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function toVideo(c: Candidate, image: string): AcervoVideo {
  const date = formatDate(c.published);
  return {
    title: c.title, image, source: SOURCE, duration: c.duration, seal: SEAL,
    meta: date ? `Publicado em ${date}` : "No canal do YouTube", href: watchUrl(c.id),
  };
}

/**
 * The channel's `limit` latest regular videos (no Shorts), newest first. Missing slots are filled from
 * `fallback`, which is returned as is when YouTube does not answer, so the section never ends up empty.
 */
export async function getLatestVideos(fallback: AcervoVideo[], limit = 3): Promise<AcervoVideo[]> {
  const key = process.env.YOUTUBE_API_KEY;
  let candidates = key ? await fromApi(key) : [];
  const fromApiOk = candidates.length > 0;
  if (!fromApiOk) candidates = await fromFeed();

  const picked: AcervoVideo[] = [];
  for (const c of candidates) {
    if (picked.length >= limit) break;
    if (fromApiOk && (await isShort(c.id))) continue;
    picked.push(toVideo(c, c.thumb ?? (await thumbnail(c.id))));
  }
  const hrefs = new Set(picked.map((v) => v.href));
  for (const v of fallback) {
    if (picked.length >= limit) break;
    if (!hrefs.has(v.href)) picked.push(v);
  }
  return picked;
}
