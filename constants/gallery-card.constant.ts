import { Props as CardProps } from '@/components/home/nft-gallery/card'
import { flyInAnimation } from '@/constants/animation.constant'

export const cards: CardProps[] = [
  {
    background: '/images/home/nft-gallery/cards/red/background.png',
    backgroundMobile: '/images/home/nft-gallery/cards/red/background-mobile.png',
    symbol: '/images/home/nft-gallery/cards/red/symbol.png',
    icon: '/images/five-elements/fire.svg',
    title: '/Fire',
    body: '“Uncover the unparalleled allure of Flame NFTs, where each piece ignites with its own distinct essence.”',
    motionProps: {
      transition: { duration: 0.5, delay: 1.5 },
      ...flyInAnimation,
    },
  },
  {
    background: '/images/home/nft-gallery/cards/brown/background.png',
    backgroundMobile: '/images/home/nft-gallery/cards/brown/background-mobile.png',
    symbol: '/images/home/nft-gallery/cards/brown/symbol.png',
    icon: '/images/five-elements/earth.svg',
    title: '/Earth',
    body: '“Discover the unmatched charm of Earth NFTs, where each piece reflects the essence of the land”',
    motionProps: {
      transition: { duration: 0.5, delay: 1.8 },
      ...flyInAnimation,
    },
  },
  {
    background: '/images/home/nft-gallery/cards/yellow/background.png',
    backgroundMobile: '/images/home/nft-gallery/cards/yellow/background-mobile.png',
    symbol: '/images/home/nft-gallery/cards/yellow/symbol.png',
    icon: '/images/five-elements/mental.svg',
    title: '/Metal',
    body: '“Explore the captivating allure of Metal NFTs, each piece embodying the strength and brilliance of precious metals.” ',
    motionProps: {
      transition: { duration: 0.5, delay: 2.1 },
      ...flyInAnimation,
    },
  },
  {
    background: '/images/home/nft-gallery/cards/green/background.png',
    backgroundMobile: '/images/home/nft-gallery/cards/green/background-mobile.png',
    symbol: '/images/home/nft-gallery/cards/green/symbol.png',
    icon: '/images/five-elements/wood.svg',
    title: '/Wood',
    body: '“Dive into the rustic charm of Wood NFTs, where each artwork reflects the natural beauty and resilience of timber.”',
    motionProps: {
      transition: { duration: 0.5, delay: 2.4 },
      ...flyInAnimation,
    },
  },
  {
    background: '/images/home/nft-gallery/cards/blue/background.png',
    backgroundMobile: '/images/home/nft-gallery/cards/blue/background-mobile.png',
    symbol: '/images/home/nft-gallery/cards/blue/symbol.png',
    icon: '/images/five-elements/water.svg',
    title: '/Water',
    body: '“Delve into the fluid elegance of Water NFTs, each piece capturing the essence of fluidity and serenity."',
    motionProps: {
      transition: { duration: 0.5, delay: 2.7 },
      ...flyInAnimation,
    },
  },
]
