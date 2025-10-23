/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Optimize for Cloudflare Pages
  trailingSlash: true,
  // Disable server-side features not compatible with static export
  experimental: {
    runtime: 'experimental-edge',
  },
}

module.exports = nextConfig
