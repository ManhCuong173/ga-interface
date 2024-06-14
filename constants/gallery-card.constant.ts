import { Props as CardProps } from '@/components/home/nft-gallery/card'
import { flyInAnimation } from '@/constants/animation.constant'
import { ElementType } from '@/utils/const'

export const NFTGalleryList: CardProps[] = [
  {
    icon: '/images/home/nft-gallery/cards/fire/fire-icon.svg',
    bgMobile: '/images/home/nft-gallery/cards/fire/fire-bg-mobile.svg',
    bgDesktop: '/images/home/nft-gallery/cards/fire/fire-bg.svg',
    color: '#56090B',

    title: 'IgnitionOfYourFortune',
    description: 'FireDescription',
    motionProps: {
      transition: { duration: 0.5, delay: 1 },
      ...flyInAnimation,
    },
    element: ElementType[0],
  },
  {
    icon: '/images/home/nft-gallery/cards/earth/earth-icon.svg',
    bgMobile: '/images/home/nft-gallery/cards/earth/earth-bg-mobile.svg',
    bgDesktop: '/images/home/nft-gallery/cards/earth/earth-bg.svg',
    color: '#6B3C02',

    title: 'EarthTitle',
    description: 'EarthDescription',
    motionProps: {
      transition: { duration: 0.5, delay: 1.3 },
      ...flyInAnimation,
    },
    element: ElementType[1],
  },
  {
    icon: '/images/home/nft-gallery/cards/mental/mental-icon.svg',
    bgMobile: '/images/home/nft-gallery/cards/mental/mental-bg-mobile.svg',
    bgDesktop: '/images/home/nft-gallery/cards/mental/mental-bg.svg',
    color: '#A17015',

    title: 'MetalTitle',
    description: 'MetalDescription',
    motionProps: {
      transition: { duration: 0.5, delay: 1.6 },
      ...flyInAnimation,
    },
    element: ElementType[2],
  },
  {
    icon: '/images/home/nft-gallery/cards/wood/wood-icon.svg',
    bgMobile: '/images/home/nft-gallery/cards/wood/wood-bg-mobile.svg',
    bgDesktop: '/images/home/nft-gallery/cards/wood/wood-bg.svg',
    color: '#023129',

    title: 'WoodTitle',
    description: 'WoodDescription',
    motionProps: {
      transition: { duration: 0.5, delay: 1.9 },
      ...flyInAnimation,
    },
    element: ElementType[3],
  },
  {
    icon: '/images/home/nft-gallery/cards/water/water-icon.svg',
    bgMobile: '/images/home/nft-gallery/cards/water/water-bg-mobile.svg',
    bgDesktop: '/images/home/nft-gallery/cards/water/water-bg.svg',
    color: '#11184C',

    title: 'WeathTitle',
    description: 'WeathDescription',
    motionProps: {
      transition: { duration: 0.5, delay: 2.1 },
      ...flyInAnimation,
    },
    element: ElementType[4],
  },
]

