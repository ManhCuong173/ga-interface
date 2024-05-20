import { Props as CardProps } from '@/components/home/nft-gallery/card'
import { flyInAnimation } from '@/constants/animation.constant'

export const cards: CardProps[] = [
  {
    front: '/icons/nft-gallery/red-front.svg',
    back: '/icons/nft-gallery/red-back.svg',
    frontMobile: '/icons/nft-gallery/red-front-mobile.svg',
    backMobile: '/icons/nft-gallery/red-back-mobile.svg',

    icon: '/images/five-elements/fire.svg',
    title: '/Fire',
    body: '“Uncover the unparalleled allure of Flame NFTs, where each piece ignites with its own distinct essence.”',
    motionProps: {
      transition: { duration: 0.5, delay: 1 },
      ...flyInAnimation,
    },
  },
  {
    front: '/icons/nft-gallery/brown-front.svg',
    back: '/icons/nft-gallery/brown-back.svg',
    frontMobile: '/icons/nft-gallery/brown-front-mobile.svg',
    backMobile: '/icons/nft-gallery/brown-back-mobile.svg',

    icon: '/images/five-elements/earth.svg',
    title: '/Earth',
    body: '“Discover the unmatched charm of Earth NFTs, where each piece reflects the essence of the land”',
    motionProps: {
      transition: { duration: 0.5, delay: 1.3 },
      ...flyInAnimation,
    },
  },
  {
    front: '/icons/nft-gallery/yellow-front.svg',
    back: '/icons/nft-gallery/yellow-back.svg',
    frontMobile: '/icons/nft-gallery/yellow-front-mobile.svg',
    backMobile: '/icons/nft-gallery/yellow-back-mobile.svg',

    icon: '/images/five-elements/mental.svg',
    title: '/Metal',
    body: '“Explore the captivating allure of Metal NFTs, each piece embodying the strength and brilliance of precious metals.” ',
    motionProps: {
      transition: { duration: 0.5, delay: 1.6 },
      ...flyInAnimation,
    },
  },
  {
    front: '/icons/nft-gallery/green-front.svg',
    back: '/icons/nft-gallery/green-back.svg',
    frontMobile: '/icons/nft-gallery/green-front-mobile.svg',
    backMobile: '/icons/nft-gallery/green-back-mobile.svg',

    icon: '/images/five-elements/wood.svg',
    title: '/Wood',
    body: '“Dive into the rustic charm of Wood NFTs, where each artwork reflects the natural beauty and resilience of timber.”',
    motionProps: {
      transition: { duration: 0.5, delay: 1.9 },
      ...flyInAnimation,
    },
  },
  {
    front: '/icons/nft-gallery/blue-front.svg',
    back: '/icons/nft-gallery/blue-back.svg',
    frontMobile: '/icons/nft-gallery/blue-front-mobile.svg',
    backMobile: '/icons/nft-gallery/blue-back-mobile.svg',

    icon: '/images/five-elements/water.svg',
    title: '/Water',
    body: '“Delve into the fluid elegance of Water NFTs, each piece capturing the essence of fluidity and serenity."',
    motionProps: {
      transition: { duration: 0.5, delay: 2.1 },
      ...flyInAnimation,
    },
  },
]

