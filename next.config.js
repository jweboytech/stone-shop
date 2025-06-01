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
      {
        protocol: 'https',
        hostname: 'nextuipro.nyc3.cdn.digitaloceanspaces.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'beyours-theme-beauty.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.jweboy.asia',
      },
      {
        protocol: 'https',
        hostname: 'img-comparison-slider.sneas.io',
      },
      {
        protocol: 'https',
        hostname: 'www.westpaw.com',
      },
      { protocol: 'https', hostname: 'octaneairsrc.com' },
    ],
  },
};

module.exports = nextConfig;
