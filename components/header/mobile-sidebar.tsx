'use client'

import { headerItems } from '@/constants/header.constant'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import WrapperHero from '../home/WrapperHero'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '../ui/drawer'
import ConnectWalletButton from './connect-wallet-button'

const MobileSidebar: React.FC = () => {
  const path = usePathname()

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button>
          <Menu />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <WrapperHero src="/images/home/mobile-background.png" className="py-12 px-7">
          <DrawerClose>
            <button className="absolute right-6 top-6 z-10 outline-none p-2 hover:bg-bgAlt4d hover:rounded-md">
              <X className="fill-black1 w-7 h-7" />
            </button>
          </DrawerClose>
          <div className="flex flex-col">
            <div className="flex w-full flex-col gap-6">
              {[
                ...headerItems,
                {
                  href: '/profile',
                  label: 'My Profile',
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    item.href === path ? 'text-red-light' : 'text-text-black',
                    `flex w-full gap-2 px-6 text-[22px] font-semibold`,
                  )}
                >
                  <DrawerClose>{item.label}</DrawerClose>
                </Link>
              ))}
            </div>
          </div>
          <DrawerFooter className="p-0">
            <ConnectWalletButton mode="solid" />
          </DrawerFooter>
        </WrapperHero>
      </DrawerContent>
    </Drawer>
  )
}
export default MobileSidebar
