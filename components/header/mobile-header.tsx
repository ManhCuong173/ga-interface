import { useLocaleInfo } from '@/hooks/useLocaleInfo'
import logo from '@/images/commons/app-logo.png'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ConnectWalletButton from './connect-wallet-button'
import MobileSidebar from './mobile-sidebar'

export default function MobileHeader() {
  const path = usePathname()
  const isHomePage = path === '/'
  const [show, setShow] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const { locale } = useLocaleInfo()

  useEffect(() => {
    const rootDiv = document.getElementById('root-div')
    if (rootDiv) {
      const handleScroll = () => {
        const currentScrollPos = rootDiv.scrollTop
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

  return (
    <>
      <header
        className={cn(
          isHomePage ? (show ? 'scale-y-100' : 'scale-y-0') : '',
          `fixed inset-x-0 top-0 z-[100] origin-top transition-all lg:hidden block`,
        )}
      >
        <div className="flex h-[72px] w-screen overflow-hidden items-center justify-between  gap-2 bg-secondary px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-[7.74px]">
              <Image src={logo} alt="" className="h-[48px] w-[48px]" />
            </Link>
            <div
              className="bg-[rgba(212,199,156,0.30)] rounded-full p-[9px] text-lg 
            font-normal leading-3/2 w-[42px] h-[42px] 
            flex items-center justify-center cursor-pointer 
            hover:opacity-80 transition-all"
            >
              {locale.toUpperCase()}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ConnectWalletButton mode="solid" />
            <MobileSidebar />
          </div>
        </div>
      </header>
    </>
  )
}

