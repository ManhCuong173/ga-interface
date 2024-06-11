import { headerItems } from '@/constants/header.constant'
import logo from '@/images/commons/logo.svg'
import { selectActiveSection } from '@/lib/features/home-section/home-section-slice'
import { useAppSelector } from '@/lib/hook'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import ConnectWalletButton from './connect-wallet-button'

export default function DesktopHeader() {
  const path = usePathname()
  const isHomePage = path === '/'
  const activeSection = useAppSelector(selectActiveSection)
  const [show, setShow] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isScrollOverSidebarHeight, setIsScrollOverSidebarHeight] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  useEffect(() => {
    const rootDiv = document.getElementById('root-div')
    if (rootDiv) {
      const handleScroll = () => {
        const currentScrollPos = rootDiv.scrollTop
        const homeBannerSection = document.getElementById('banner')

        if (homeBannerSection && currentScrollPos > homeBannerSection?.clientHeight) {
          setIsScrollOverSidebarHeight(true)
        } else setIsScrollOverSidebarHeight(false)

        if (prevScrollPos > currentScrollPos) {
          setShow(true)
        } else if (prevScrollPos < currentScrollPos) {
          setShow(false)
        }

        setPrevScrollPos(currentScrollPos)
      }

      rootDiv.addEventListener('scroll', handleScroll)

      return () => {
        rootDiv.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isHomePage, prevScrollPos])

  const mode = isHomePage ? (['banner', ''].includes(activeSection) ? 'transparent' : 'solid') : 'solid'

  return (
    <header
      className={`${
        !show && isHomePage
          ? '!-translate-y-full'
          : mode === 'transparent' && !isScrollOverSidebarHeight
            ? 'border border-[#FFF4DD] border-opacity-40 !text-_white backdrop-blur-sm'
            : 'border-[#D4C79C] bg-[#FAF5F0] text-black1'
      } fixed top-0 z-50 hidden h-[67px] w-full origin-top translate-y-0 border-b text-black1 transition-all duration-500 lg:flex lg:h-[67px]`}
    >
      <div className="mx-auto flex h-full w-full max-w-container translate-y-[1px] items-center justify-between px-10">
        <div className="flex h-full items-center gap-8">
          <Link href="/" className="flex items-center gap-[12px]">
            <Image src={logo} alt="" width={48} height={48} />
            <span className="text-xl font-semibold tracking-tighter">GOLDEN APPLE</span>
          </Link>
          <div className="h-full bg-bgAlt w-[1px]" />
          <div className="flex h-full items-center">
            {headerItems.map((item, index) => (
              <Fragment key={item.href}>
                <Link
                  href={item.href}
                  className={`${(item.href === '/' && isHomePage) || (path.includes(item.href) && !isHomePage && item.href !== '/') ? 'border-red-light text-red-light' : 'border-transparent'} flex h-full items-center gap-2 border-b-2 px-6`}
                >
                  <span>{item.label}</span>
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <ConnectWalletButton mode={mode} />
        </div>
      </div>
    </header>
  )
}

