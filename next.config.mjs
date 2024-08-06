/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()

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

export default withNextIntl(nextConfig)

