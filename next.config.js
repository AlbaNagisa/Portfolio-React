/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    DISCORD_WEBHOOK_TOKEN: process.env.DISCORD_WEBHOOK_TOKEN,
    DISCORD_WEBHOOK_ID: process.env.DISCORD_WEBHOOK_ID,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5050/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
