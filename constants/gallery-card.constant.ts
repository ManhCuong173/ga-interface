import { Props as CardProps } from '@/components/home/nft-gallery/card'
import { flyInAnimation } from '@/constants/animation.constant'

export const cards: CardProps[] = [
  {
    front: '/images/home/nft-gallery/cards/red/front.png',
    back: '/images/home/nft-gallery/cards/red/back.png',
    frontMobile: '/images/home/nft-gallery/cards/red/front-mobile.png',
    backMobile: '/images/home/nft-gallery/cards/red/back-mobile.png',

    icon: '/images/five-elements/fire.svg',
    title: '/Fire',
    body: '“Uncover the unparalleled allure of Flame NFTs, where each piece ignites with its own distinct essence.”',
    motionProps: {
      transition: { duration: 0.5, delay: 1 },
      ...flyInAnimation,
    },
  },
  {
    front: '/images/home/nft-gallery/cards/brown/front.png',
    back: '/images/home/nft-gallery/cards/brown/back.png',
    frontMobile: '/images/home/nft-gallery/cards/brown/front-mobile.png',
    backMobile: '/images/home/nft-gallery/cards/brown/back-mobile.png',

    icon: '/images/five-elements/earth.svg',
    title: '/Earth',
    body: '“Discover the unmatched charm of Earth NFTs, where each piece reflects the essence of the land”',
    motionProps: {
      transition: { duration: 0.5, delay: 1.3 },
      ...flyInAnimation,
    },
  },
  {
    front: '/images/home/nft-gallery/cards/yellow/front.png',
    back: '/images/home/nft-gallery/cards/yellow/back.png',
    frontMobile: '/images/home/nft-gallery/cards/yellow/front-mobile.png',
    backMobile: '/images/home/nft-gallery/cards/yellow/back-mobile.png',

    icon: '/images/five-elements/mental.svg',
    title: '/Metal',
    body: '“Explore the captivating allure of Metal NFTs, each piece embodying the strength and brilliance of precious metals.” ',
    motionProps: {
      transition: { duration: 0.5, delay: 1.6 },
      ...flyInAnimation,
    },
  },
  {
    front: '/images/home/nft-gallery/cards/green/front.png',
    back: '/images/home/nft-gallery/cards/green/back.png',
    frontMobile: '/images/home/nft-gallery/cards/green/front-mobile.png',
    backMobile: '/images/home/nft-gallery/cards/green/back-mobile.png',

    icon: '/images/five-elements/wood.svg',
    title: '/Wood',
    body: '“Dive into the rustic charm of Wood NFTs, where each artwork reflects the natural beauty and resilience of timber.”',
    motionProps: {
      transition: { duration: 0.5, delay: 1.9 },
      ...flyInAnimation,
    },
  },
  {
    front: '/images/home/nft-gallery/cards/blue/front.png',
    back: '/images/home/nft-gallery/cards/blue/back.png',
    frontMobile: '/images/home/nft-gallery/cards/blue/front-mobile.png',
    backMobile: '/images/home/nft-gallery/cards/blue/back-mobile.png',

    icon: '/images/five-elements/water.svg',
    title: '/Water',
    body: '“Delve into the fluid elegance of Water NFTs, each piece capturing the essence of fluidity and serenity."',
    motionProps: {
      transition: { duration: 0.5, delay: 2.1 },
      ...flyInAnimation,
    },
  },
]
