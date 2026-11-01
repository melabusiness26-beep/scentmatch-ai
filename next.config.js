/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: false
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'hxzgakxxqxdfewyymvyl.supabase.co' },
      { protocol: 'https', hostname: '*.notino.com' },
      { protocol: 'https', hostname: '*.flaconi.ch' },
    ],
  },
  // Grundlegende Sicherheits-Header für alle Seiten: kein Einbetten in fremde
  // Seiten (Schutz vor Clickjacking, v. a. für /admin), kein MIME-Raten,
  // sparsamer Referrer, keine Kamera/Mikrofon/Standort-Rechte.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(self), microphone=(), geolocation=()' }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        // Der frühere eigene Ratgeber „Parfum richtig auftragen" wurde mit dem
        // Haltbarkeits-Artikel zusammengeführt. Alte URL dauerhaft weiterleiten,
        // damit keine toten Links / 404 entstehen (gut für SEO).
        source: '/ratgeber/parfum-richtig-auftragen',
        destination: '/ratgeber/wie-lange-haelt-parfum-haltbarkeit',
        permanent: true
      }
    ];
  }
};
module.exports = nextConfig;
