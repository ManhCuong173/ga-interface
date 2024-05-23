import logo from '@/images/commons/mobile-logo-black.png'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import MobileSidebar from './mobile-sidebar'

export default function MobileHeader() {
  const path = usePathname()
  const isHomePage = path === '/'
  const [show, setShow] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

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
          `fixed inset-x-0 top-0 z-[100] origin-top transition-all lg:hidden`,
        )}
      >
        <div className="flex h-[72px] w-full items-center justify-between bg-secondary px-4">
          <Link href="/" className="flex items-center gap-[7.74px]">
            <Image src={logo} alt="" className="h-9 w-[123.14217px]" />
          </Link>
          <MobileSidebar />
        </div>
      </header>
    </>
  )
}

