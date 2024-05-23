import { Props as CardProps } from '@/components/home/nft-gallery/card'
import { flyInAnimation } from '@/constants/animation.constant'

export const cards: CardProps[] = [
  {
    icon: '/images/home/nft-gallery/cards/fire/fire-icon.png',
    bgMobile: '/images/home/nft-gallery/cards/fire/fire-bg-mobile.png',
    bgDesktop: '/images/home/nft-gallery/cards/fire/fire-bg.png',
    color: '#56090B',

    description:
      '“Uncover the unparalleled allure of Flame NFTs, where each piece ignites with its own distinct essence.”',
    motionProps: {
      transition: { duration: 0.5, delay: 1 },
      ...flyInAnimation,
    },
  },
  {
    icon: '/images/home/nft-gallery/cards/earth/earth-icon.png',
    bgMobile: '/images/home/nft-gallery/cards/earth/earth-bg-mobile.png',
    bgDesktop: '/images/home/nft-gallery/cards/earth/earth-bg.png',
    color: '#6B3C02',

    description: '“Discover the unmatched charm of Earth NFTs, where each piece reflects the essence of the land”',
    motionProps: {
      transition: { duration: 0.5, delay: 1.3 },
      ...flyInAnimation,
    },
  },
  {
    icon: '/images/home/nft-gallery/cards/mental/mental-icon.png',
    bgMobile: '/images/home/nft-gallery/cards/mental/mental-bg-mobile.png',
    bgDesktop: '/images/home/nft-gallery/cards/mental/mental-bg.png',
    color: '#A17015',

    description:
      '“Explore the captivating allure of Metal NFTs, each piece embodying the strength and brilliance of precious metals.” ',
    motionProps: {
      transition: { duration: 0.5, delay: 1.6 },
      ...flyInAnimation,
    },
  },
  {
    icon: '/images/home/nft-gallery/cards/wood/wood-icon.png',
    bgMobile: '/images/home/nft-gallery/cards/wood/wood-bg-mobile.png',
    bgDesktop: '/images/home/nft-gallery/cards/wood/wood-bg.png',
    color: '#023129',

    description:
      '“Dive into the rustic charm of Wood NFTs, where each artwork reflects the natural beauty and resilience of timber.”',
    motionProps: {
      transition: { duration: 0.5, delay: 1.9 },
      ...flyInAnimation,
    },
  },
  {
    icon: '/images/home/nft-gallery/cards/water/water-icon.png',
    bgMobile: '/images/home/nft-gallery/cards/water/water-bg-mobile.png',
    bgDesktop: '/images/home/nft-gallery/cards/water/water-bg.png',
    color: '#11184C',

    description:
      '“Delve into the fluid elegance of Water NFTs, each piece capturing the essence of fluidity and serenity."',
    motionProps: {
      transition: { duration: 0.5, delay: 2.1 },
      ...flyInAnimation,
    },
  },
]

