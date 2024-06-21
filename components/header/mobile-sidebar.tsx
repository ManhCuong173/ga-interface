'use client'

import { headerItems } from '@/constants/header.constant'
import { GaSocialLinkVariantEnums, SocialLinks } from '@/constants/socials'
import { useToggle } from '@/hooks/custom/useToggle'
import { useLocaleInfo } from '@/hooks/useLocaleInfo'
import { useWindowInfo } from '@/hooks/useWindowInfo'
import DiscordIcon from '@/icons/home/discord.svg'
import TelegrameIcon from '@/icons/home/telegram.svg'
import XIcon from '@/icons/home/twitter.svg'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Trans from '../i18n/Trans'

const MobileSidebar: React.FC = () => {
  const path = usePathname()
  const searchParams = useSearchParams()
  const window = useWindowInfo()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, toggle] = useToggle(false)
  const { locale } = useLocaleInfo()

  return (
    <>
      <div onClick={toggle}>
        <button>
          <Menu />
        </button>
      </div>
      <div
        className={cn(
          isOpen ? 'translate-x-0 opacity-1 ' : 'translate-x-[200vw] opacity-0',
          'fixed top-0 bottom-0 left-0 right-0 h-screen w-screen transition-all',
        )}
      >
        <div
          className={isOpen ? 'relative w-screen p-5 animate-fadeOut' : ''}
          style={{
            height: window?.innerHeight || '100vh',
          }}
        >
          <div onClick={toggle}>
            <button className="absolute right-[4px] top-2 z-30 outline-none p-2 hover:bg-bgAlt4d hover:rounded-md">
              <X className="fill-black1 w-7 h-7" />
            </button>
          </div>
          <div className="absolute inset-0 z-10 ">
            <div className="w-full h-full relative ">
              <Image fill src="/images/home/mobile-background.png" alt="" />
            </div>
          </div>
          <div className={cn(isOpen ? 'px-4' : '', 'absolute inset-0 z-20 h-full flex-col justify-between')}>
            <div className="h-[90%]">
              <div className="flex w-full flex-col gap-6 h-full pb-4 pt-[64px]">
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
                    <div onClick={toggle}>
                      <Trans>{item.label}</Trans>
                    </div>
                  </Link>
                ))}
                <div className="flex item-centers gap-3 my-5 w-full px-6">
                  {SocialLinks.filter(
                    (item) =>
                      (item.type === GaSocialLinkVariantEnums.X && locale === 'en') ||
                      (item.type === GaSocialLinkVariantEnums.XChina && locale === 'cn') ||
                      ![GaSocialLinkVariantEnums.X, GaSocialLinkVariantEnums.XChina].includes(item.type),
                  ).map((link) => {
                    const icon =
                      link.type == GaSocialLinkVariantEnums.Discord
                        ? DiscordIcon
                        : [GaSocialLinkVariantEnums.X, GaSocialLinkVariantEnums.XChina].includes(link.type)
                          ? XIcon
                          : TelegrameIcon
                    return (
                      <Link href={link.url} target="_blank" key={link.name}>
                        <Image
                          src={icon}
                          width={48}
                          height={48}
                          alt=""
                          className="hover:opacity-80 transition-all cursor-pointer"
                        />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default MobileSidebar

