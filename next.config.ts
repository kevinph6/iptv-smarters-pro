import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ── Performance: Compress responses with gzip ──
  compress: true,

  // ── Performance: Enable React strict mode for better optimization hints ──
  reactStrictMode: true,

  // ── Performance: Reduce powered-by header overhead ──
  poweredByHeader: false,

  // ── Image Optimization ──
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // Serve modern formats first
    formats: ['image/avif', 'image/webp'],
    // Minimize image sizes served
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Keep optimized images cached longer
    minimumCacheTTL: 31536000, // 1 year
  },

  // ── Experimental Performance Features ──
  experimental: {
    // Inline CSS into HTML to eliminate render-blocking link requests (~550ms savings on mobile)
    inlineCss: true,
    // Enable optimized package imports to tree-shake heavy libraries
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-navigation-menu',
      '@heroicons/react',
      '@tabler/icons-react',
      'react-icons',
      'date-fns',
    ],
  },

  outputFileTracingRoot: path.resolve(__dirname),
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  },

  // ── Aggressive Caching Headers ──
  async headers() {
    return [
      {
        // Static assets: cache for 1 year (immutable)
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Optimized images: cache for 1 year
        source: '/_next/image/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Public static files (fonts, icons, images)
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|eot)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // All pages: enable stale-while-revalidate
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/geo-restricted',
        has: [
          {
            type: 'host',
            value: 'restricted.officieliptvsmarterspro.fr',
          },
        ],
      },
    ];
  },
};

export default nextConfig;