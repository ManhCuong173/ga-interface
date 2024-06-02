'use client'

import { headerItems } from '@/constants/header.constant'
import useGetProfile from '@/hooks/api/useGetProfile'
import useLinkSocial from '@/hooks/api/useLinkSocial'
import DiscordIcon from '@/icons/home/discord.svg'
import XIcon from '@/icons/home/twitter.svg'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '../ui/drawer'
import ConnectWalletButton from './connect-wallet-button'

const MobileSidebar: React.FC = () => {
  const path = usePathname()
  const { data: profile, refetch } = useGetProfile()
  const searchParams = useSearchParams()
  const oauth_token = searchParams.get('oauth_token')
  const oauth_verifier = searchParams.get('oauth_verifier')
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const { bindDiscord, bindTwitter, removeDiscord, removeX } = useLinkSocial({ refetch })

  const router = useRouter()
  const pathname = usePathname()

  const remove = (key1: string, key2: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.delete(key1)
    current.delete(key2)
    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  const connectTwitter = () => {
    if (profile?.twitter_connect) {
      remove(String(oauth_token), String(oauth_verifier))
      removeX()
      return
    }
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/authentication/twitter`)
  }
  const connectDiscord = () => {
    if (profile?.discord_connect) {
      removeDiscord()
      return
    }
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/authentication/discord`)
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button>
          <Menu />
        </button>
      </DrawerTrigger>
      <DrawerContent className="">
        <div className="relative w-screen h-screen p-5 animate-fadeOut">
          <DrawerClose>
            <button className="absolute right-[4px] top-2 z-30 outline-none p-2 hover:bg-bgAlt4d hover:rounded-md">
              <X className="fill-black1 w-7 h-7" />
            </button>
          </DrawerClose>
          <div className="absolute inset-0 z-10 ">
            <div className="w-full h-full relative ">
              <Image fill src="/images/home/mobile-background.png" alt="" />
            </div>
          </div>
          <div className="absolute inset-0 z-20 h-full">
            <div className="flex w-full flex-col gap-6 h-full p-4 pt-[64px]">
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
                    `flex w-full gap-2 px-6 text-[24px] font-semibold`,
                  )}
                >
                  <DrawerClose>{item.label}</DrawerClose>
                </Link>
              ))}
              <div className="flex item-centers gap-3 my-5 w-full px-6">
                <button onClick={connectTwitter}>
                  <Image src={XIcon} width={48} height={48} alt="" />
                </button>
                <button onClick={connectDiscord}>
                  <Image src={DiscordIcon} width={48} height={48} alt="" />
                </button>
              </div>
              <DrawerFooter className="p-0">
                <ConnectWalletButton mode="solid" />
              </DrawerFooter>{' '}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
export default MobileSidebar

