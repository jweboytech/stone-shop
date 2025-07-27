import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'celesteadore.com' },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.perperstone.com',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [{ loader: 'graphql-tag/loader' }],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
      {
        source: '/ingest/flags',
        destination: 'https://eu.i.posthog.com/flags',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

let withPWA;
const isDev = process.env.NODE_ENV === 'development';

if (!isDev) {
  withPWA = nextPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    // disable: process.env.NODE_ENV === 'development', // 开发模式禁用 PWA
  });
}

export default !isDev ? withPWA(nextConfig) : nextConfig;
