/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'hxzgakxxqxdfewyymvyl.supabase.co' },
      { protocol: 'https', hostname: '*.notino.com' },
      { protocol: 'https', hostname: '*.flaconi.ch' },
    ],
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
