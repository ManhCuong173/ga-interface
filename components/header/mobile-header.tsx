import { useBitcoinConnected } from '@/context/BitcoinProviderContext/hook'
import { useLocaleInfo } from '@/hooks/useLocaleInfo'
import logo from '@/images/commons/app-logo.png'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import DropdownAction from '../dropdown'
import ConnectWalletButton from './ConnectWalletButton'
import ProfileDropdown from './ProfileDropdown'
import { LanguageSelect } from './desktop-header'
import MobileSidebar from './mobile-sidebar'

export default function MobileHeader() {
  const path = usePathname()
  const isHomePage = path === '/'
  const [show, setShow] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const { locale } = useLocaleInfo()
  const isWalletConnected = useBitcoinConnected()

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
        <div className="flex h-[72px] w-screen items-center justify-between  gap-2 bg-secondary px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-[7.74px]">
              <Image src={logo} alt="" className="h-[48px] w-[48px]" />
            </Link>
            <DropdownAction>
              <LanguageSelect />
            </DropdownAction>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'h-[36px] md:h-[48px] w-[120px] md:w-[180px] rounded-[10px]  border-solid border-[1px] flex justify-center items-center p-[8px_16px] cursor-pointer',
                'border-red-light',
              )}
            >
              {isWalletConnected && <ProfileDropdown mode="solid" />}
              {!isWalletConnected && <ConnectWalletButton mode={'solid'} />}
            </div>
            <MobileSidebar />
          </div>
        </div>
      </header>
    </>
  )
}

