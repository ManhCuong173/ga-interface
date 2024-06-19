import { headerItems } from '@/constants/header.constant'
import { GaSocialLinkVariantEnums, SocialLinks } from '@/constants/socials'
import { useLocaleInfo } from '@/hooks/useLocaleInfo'
import logo from '@/images/commons/logo.svg'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import Trans from '../i18n/Trans'
import ConnectWalletButton from './connect-wallet-button'

export default function DesktopHeader() {
  const path = usePathname()
  const isHomePage = ['/en', '/cn', '/'].includes(path)
  const [show, setShow] = useState(false)
  const [isScrollOverSidebarHeight, setIsScrollOverSidebarHeight] = useState(false)
  const { locale } = useLocaleInfo()
  console.log(
    '%cMyProject%cline:18%clocale',
    'color:#fff;background:#ee6f57;padding:3px;border-radius:2px',
    'color:#fff;background:#1f3c88;padding:3px;border-radius:2px',
    'color:#fff;background:rgb(161, 23, 21);padding:3px;border-radius:2px',
    locale,
  )

  useEffect(() => {
    if (isHomePage) {
      setShow(false)
    } else setShow(true)
  }, [isHomePage])

  useEffect(() => {
    const rootDiv = document.getElementById('root-div')
    if (rootDiv) {
      const handleScroll = () => {
        const currentScrollPos = rootDiv.scrollTop
        const homeBannerSection = document.getElementById('banner')

        if (homeBannerSection && currentScrollPos > homeBannerSection?.clientHeight) {
          setIsScrollOverSidebarHeight(true)
        } else setIsScrollOverSidebarHeight(false)

        if (rootDiv.scrollTop > 0) {
          setShow(true)
        } else setShow(false)
      }

      rootDiv.addEventListener('scroll', handleScroll)

      return () => {
        rootDiv.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isHomePage, path])

  return (
    <header
      className={cn(
        !isScrollOverSidebarHeight ? 'hidden' : 'block',
        'bg-[#FAF5F0] text-black1',
        'fixed top-0 z-50 hidden h-[67px] w-full origin-top translate-y-0 border-b text-black1 transition-all duration-500 lg:flex lg:h-[67px]',
      )}
      style={{
        display: !show ? 'none' : 'flex',
      }}
    >
      <div className="mx-auto flex h-full w-full max-w-container translate-y-[1px] items-center justify-between px-10">
        <div className="flex h-full items-center gap-8">
          <Link href="/" className="flex items-center gap-[12px]">
            <Image src={logo} alt="" width={48} height={48} />
            <span className="text-xl font-semibold tracking-tighter">GOLDEN APPLE</span>
          </Link>

          <div className="flex items-center justify-center gap-4">
            <div
              className="bg-[rgba(212,199,156,0.30)] rounded-full p-[9px] text-lg 
            font-normal leading-3/2 w-[42px] h-[42px] 
            flex items-center justify-center cursor-pointer 
            hover:opacity-80 transition-all"
            >
              {locale.toUpperCase()}
            </div>
            {SocialLinks.filter(
              (item) =>
                (item.type === GaSocialLinkVariantEnums.X && locale === 'en') ||
                (item.type === GaSocialLinkVariantEnums.XChina && locale === 'cn') ||
                ![GaSocialLinkVariantEnums.X, GaSocialLinkVariantEnums.XChina].includes(item.type),
            ).map((link) => {
              return (
                <Link href={link.url} target="_blank">
                  <Image
                    src={link.icon}
                    width={26}
                    height={26}
                    alt=""
                    className="hover:opacity-80 transition-all cursor-pointer"
                  />
                </Link>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex h-full items-center">
            {headerItems.map((item, index) => (
              <Fragment key={item.href}>
                <Link
                  href={item.href}
                  className={`${(item.href === '/' && isHomePage) || (path.includes(item.href) && !isHomePage && item.href !== '/') ? 'border-red-light text-red-light' : 'border-transparent'} flex h-full items-center gap-2 border-b-2 px-6`}
                >
                  <span className="whitespace-nowrap">
                    <Trans>{item.label}</Trans>
                  </span>
                </Link>
              </Fragment>
            ))}
          </div>
          <ConnectWalletButton mode={'solid'} />
        </div>
      </div>
    </header>
  )
}

