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
  async headers() {
    return [
      {
        source: '/cdn/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=86400',
          },
        ],
      },
      {
        source: '/fonts/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
