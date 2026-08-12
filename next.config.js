/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["@supabase/supabase-js"],
  },

  // Compress responses with gzip
  compress: true,

  // Power optimized images via Next.js Image CDN
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // cache images 24h
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "randomuser.me" },
    ],
  },

  // HTTP security & caching headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Long-lived cache for static assets
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
