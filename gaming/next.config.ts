import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
