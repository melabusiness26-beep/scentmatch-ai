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
      // Ältere Einzelseiten, deren Thema ein Ratgeber-Artikel bereits behandelt:
      // zusammengeführt, damit Google nicht zwei Seiten zum gleichen Thema sieht.
      {
        source: '/parfum-auftragen',
        destination: '/ratgeber/wie-lange-haelt-parfum-haltbarkeit',
        permanent: true
      },
      {
        source: '/duftlaenge',
        destination: '/ratgeber/wie-lange-haelt-parfum-haltbarkeit',
        permanent: true
      },
      {
        source: '/duftarten',
        destination: '/ratgeber/edt-edp-parfum-unterschied',
        permanent: true
      },
      {
        source: '/duefte-kombinieren',
        destination: '/ratgeber/parfum-layering-duefte-kombinieren',
        permanent: true
      },
      {
        source: '/dufte-nach-hauttyp',
        destination: '/ratgeber/parfum-und-hauttyp-was-passt-zu-meiner-haut',
        permanent: true
      },
      {
        source: '/koerperchemie-duft',
        destination: '/ratgeber/parfum-und-hauttyp-was-passt-zu-meiner-haut',
        permanent: true
      },
      {
        source: '/dufte-fuer-die-arbeit',
        destination: '/ratgeber/die-besten-bueroduefte',
        permanent: true
      },
      {
        source: '/duft-geschenk',
        destination: '/ratgeber/parfum-geschenk-die-besten-duefte-zum-verschenken',
        permanent: true
      },
      {
        source: '/guenstige-alternativen',
        destination: '/ratgeber/guenstige-alternativen-zu-teuren-dueften',
        permanent: true
      },
      {
        source: '/damen-parfueme',
        destination: '/beste-damenduefte',
        permanent: true
      },
      {
        source: '/herren-parfueme',
        destination: '/beste-herrenduefte',
        permanent: true
      },
      {
        source: '/anleitung',
        destination: '/ratgeber/parfum-fuer-einsteiger-erster-signature-duft',
        permanent: true
      },
      {
        source: '/duft-waehlen',
        destination: '/ratgeber/parfum-fuer-einsteiger-erster-signature-duft',
        permanent: true
      },
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
