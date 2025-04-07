/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'm.media-amazon.com',
        },
      ],
    },
  };
    // next.config.js
  module.exports = {
    reactStrictMode: true,
  };
  module.exports = nextConfig;