/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co'],
  },
  devIndicators: {
      buildActivity: false
  }
}

module.exports = nextConfig
