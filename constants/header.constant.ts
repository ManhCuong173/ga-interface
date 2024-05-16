import { HeaderItem } from '@/types/header'

import homeActive from '@/icons/header/home-active.svg'
import homeBlack from '@/icons/header/home-black.svg'
import home from '@/icons/header/home.svg'

import marketplaceActive from '@/icons/header/marketplace-active.svg'
import marketplaceBlack from '@/icons/header/marketplace-black.svg'
import marketplace from '@/icons/header/marketplace.svg'

import aboutActive from '@/icons/header/about-active.svg'
import aboutBlack from '@/icons/header/about-black.svg'
import about from '@/icons/header/about.svg'

import mintActive from '@/icons/header/mint-active.svg'
import mintBlack from '@/icons/header/mint-black.svg'
import mint from '@/icons/header/mint.svg'

export const headerItems: HeaderItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: home,
    blackIcon: homeBlack,
    activeIcon: homeActive,
  },
  {
    href: '/marketplace',
    label: 'Marketplace',
    icon: marketplace,
    blackIcon: marketplaceBlack,
    activeIcon: marketplaceActive,
  },
  {
    href: '/inscribe',
    label: 'Mint',
    icon: mint,
    blackIcon: mintBlack,
    activeIcon: mintActive,
  },
  {
    href: '/about',
    label: 'About',
    icon: about,
    blackIcon: aboutBlack,
    activeIcon: aboutActive,
  },
]
