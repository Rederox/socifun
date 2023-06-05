/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'img.gamedistribution.com',
      'lh3.googleusercontent.com',
      'cspgaovwyijhefsrqskl.supabase.co'
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
