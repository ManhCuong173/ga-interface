/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chart.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 's3-stag.esollabs.com',
      },
      {
        protocol: 'https',
        hostname: 'ordinals-testnet.gamma.io',
      },
    ],
  },
}

export default nextConfig
