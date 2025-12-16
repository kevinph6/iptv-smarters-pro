import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
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
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/geo-restricted',
        has: [
          {
            type: 'host',
            value: 'restricted.abonnement-iptv-smarterspro.fr',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
// Orchids restart: 1765922829555