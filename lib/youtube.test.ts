import { afterEach, describe, expect, it, vi } from "vitest";
import type { AcervoVideo } from "@/content/types";
import { formatDate, formatDuration, getLatestVideos, parseFeed } from "./youtube";

const entry = (id: string, title: string, published: string, shorts = false) => `
  <entry>
    <yt:videoId>${id}</yt:videoId>
    <title>${title}</title>
    <link rel="alternate" href="https://www.youtube.com/${shorts ? `shorts/${id}` : `watch?v=${id}`}"/>
    <published>${published}</published>
  </entry>`;

const FEED = `<feed>${[
  entry("short000001", "Um Short", "2026-11-03T10:00:00+00:00", true),
  entry("video000001", "Primeiro &amp; mais novo", "2026-11-02T10:00:00+00:00"),
  entry("video000002", "Segundo", "2026-10-20T10:00:00+00:00"),
].join("")}</feed>`;

const fallback: AcervoVideo[] = ["fallback001", "video000002", "fallback003"].map((id) => ({
  title: id, image: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, source: "A Sala dos Buscadores",
  seal: "Editorial curado", meta: "No canal do YouTube", href: `https://www.youtube.com/watch?v=${id}`,
}));

afterEach(() => vi.unstubAllGlobals());

describe("youtube", () => {
  it("parses the channel feed, decoding titles and skipping Shorts", () => {
    expect(parseFeed(FEED)).toEqual([
      { id: "video000001", title: "Primeiro & mais novo", published: "2026-11-02T10:00:00+00:00" },
      { id: "video000002", title: "Segundo", published: "2026-10-20T10:00:00+00:00" },
    ]);
  });

  it("formats durations and dates", () => {
    expect(formatDuration("PT16M30S")).toBe("16:30");
    expect(formatDuration("PT1H2M5S")).toBe("1:02:05");
    expect(formatDuration("PT45S")).toBe("0:45");
    expect(formatDate("2026-09-03T15:00:00Z")).toBe("3 set 2026");
  });

  it("uses the feed's newest videos and fills the rest from the fallback, without duplicates", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) =>
      url.includes("feeds/videos.xml") ? new Response(FEED) : new Response(null, { status: 200 })));
    const videos = await getLatestVideos(fallback);
    expect(videos.map((v) => v.href)).toEqual([
      "https://www.youtube.com/watch?v=video000001",
      "https://www.youtube.com/watch?v=video000002",
      "https://www.youtube.com/watch?v=fallback001",
    ]);
    expect(videos[0]).toMatchObject({ title: "Primeiro & mais novo", meta: "Publicado em 2 nov 2026", image: "https://i.ytimg.com/vi/video000001/maxresdefault.jpg" });
  });

  it("returns the fallback when YouTube does not answer", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 500 })));
    expect(await getLatestVideos(fallback)).toEqual(fallback);
  });
});
