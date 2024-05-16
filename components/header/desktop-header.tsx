import { headerItems } from '@/constants/header.constant'
import logo from '@/images/commons/logo.svg'
import { selectActiveSection } from '@/lib/features/home-section/home-section-slice'
import { useAppSelector } from '@/lib/hook'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import ConnectWalletButton from './connect-wallet-button'
import LanguageSelect from './language-select'

export default function DesktopHeader() {
  const path = usePathname()
  const isHomePage = path === '/'
  const activeSection = useAppSelector(selectActiveSection)
  const [show, setShow] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    setShow(true)
  }, [])

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

  const mode = isHomePage
    ? ['banner', ''].includes(activeSection)
      ? 'transparent'
      : 'solid'
    : 'solid'

  return (
    <header
      className={`${!show && isHomePage ? '!-translate-y-full' : mode === 'transparent' ? '] border border-[#FFF4DD] border-opacity-40 !text-_white' : 'border-[#D4C79C] bg-[#FAF5F0] text-black1'} fixed top-0 z-50 hidden h-[67px] w-full origin-top translate-y-0 border-b text-black1 transition-all duration-500 lg:flex`}
    >
      <div className='mx-auto flex h-full w-full max-w-container translate-y-[1px] items-center justify-between px-10'>
        <div className='flex h-full items-center gap-8'>
          <Link href='/' className='flex items-center gap-[7.74px]'>
            <Image src={logo} alt='' width={48} height={48} />
            <span className='text-xl font-semibold'>
              GOLDEN <br /> APPLE
            </span>
          </Link>
          <div className='flex h-full items-center'>
            {headerItems.map((item, index) => (
              <Fragment key={item.href}>
                <Link
                  href={item.href}
                  className={`${(item.href === '/' && isHomePage) || (path.includes(item.href) && !isHomePage && item.href !== '/') ? 'border-red-light text-red-light' : 'border-transparent'} flex h-full items-center gap-2 border-b-2 px-6`}
                >
                  {/* {(item.href === '/' && isHomePage) ||
                  (path.includes(item.href) && !isHomePage && item.href !== '/') ? (
                    <Image src={item.activeIcon} alt='' width={24} height={24} />
                  ) : (
                    <div className='relative h-6 w-6'>
                      <Image
                        src={item.icon}
                        alt=''
                        width={24}
                        height={24}
                        className={`${isHomePage && mode === 'transparent' ? 'opacity-100' : 'opacity-0'} absolute inset-0 transition-opacity`}
                      />
                      <Image
                        src={item.blackIcon}
                        alt=''
                        width={24}
                        height={24}
                        className={`${isHomePage && mode === 'transparent' ? 'opacity-0' : 'opacity-100'} absolute inset-0 transition-opacity`}
                      />
                    </div>
                  )} */}
                  <span>{item.label}</span>
                </Link>
                {index !== headerItems.length - 1 && (
                  <div
                    className={`${!isHomePage ? 'bg-black1' : mode === 'transparent' ? 'bg-_white' : 'bg-black1'} h-[21px] w-[1px]`}
                  ></div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-8'>
          <LanguageSelect mode={isHomePage ? mode : 'solid'} />
          <ConnectWalletButton mode={mode} />
        </div>
      </div>
    </header>
  )
}
