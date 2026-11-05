import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AVIF first (smaller), WebP as the fallback the browser negotiates down to.
  images: {
    formats: ["image/avif", "image/webp"],
    // YouTube thumbnails for the "Vídeos" carousel (lib/youtube.ts).
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
};

export default nextConfig;
