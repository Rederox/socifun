/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'img.gamedistribution.com',
      'lh3.googleusercontent.com'
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
