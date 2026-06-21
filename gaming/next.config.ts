import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Diese App liegt im Unterordner `gaming/`. Wir setzen den Turbopack-Root
  // explizit auf diesen Ordner, damit ein evtl. Lockfile im übergeordneten
  // Repo nicht fälschlich als Projektwurzel erkannt wird.
  turbopack: {
    root: __dirname,
  },

  // Mock-Daten brauchen keine externen Bilder. Sobald echte Cover von einer
  // API (IGDB/RAWG/Steam) kommen, hier die erlaubten Bild-Hosts eintragen:
  // images: {
  //   remotePatterns: [
  //     { protocol: "https", hostname: "images.igdb.com" },
  //     { protocol: "https", hostname: "media.rawg.io" },
  //   ],
  // },
};

export default nextConfig;
