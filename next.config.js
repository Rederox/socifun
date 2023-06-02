/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'img.gamedistribution.com'
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
