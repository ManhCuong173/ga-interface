import { Props as CardProps } from '@/components/home/nft-gallery/card'
import { flyInAnimation } from '@/constants/animation.constant'
import { ElementType } from '@/utils/const'

export const NFTGalleryList: CardProps[] = [
  {
    icon: '/images/home/nft-gallery/cards/fire/fire-icon.svg',
    bgMobile: '/images/home/nft-gallery/cards/fire/fire-bg-mobile.svg',
    bgDesktop: '/images/home/nft-gallery/cards/fire/fire-bg.svg',
    color: '#56090B',

    title: 'The Ignition Your Fortune',
    description:
      '"Embrace its transformative energy and light your path to wealth with a Fire NFT. Let the flames guide you to unparalleled abundance.”',
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

    title: 'The Root of Success',
    description:
      '"Ground your investments with the Earth NFT Collection. Embrace the stability, growth, and nurturing power of the earth, providing a solid foundation for your prosperity. Discover the root of success and let your wealth flourish."',
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

    title: 'The Magnet of Affluence',
    description: 'Embrace the strength, clarity, and allure of metal, drawing wealth and success towards you.” ',
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

    title: 'The Catalyst of Prosperity',
    description:
      'Harness the growth and vitality of the Wood NFT colelction. Embrace its natural strength, adaptability, and the endless possibilities it brings. Watch your prosperity flourish and grow.”',
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

    title: 'The Flow of Wealth',
    description:
      'Experience fluidity and abundance with our Water NFT Collection. Embrace flexibility, adapt to change, and let your prosperity flow effortlessly."',
    motionProps: {
      transition: { duration: 0.5, delay: 2.1 },
      ...flyInAnimation,
    },
    element: ElementType[4],
  },
]

