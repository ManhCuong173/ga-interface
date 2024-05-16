'use client'

import { headerItems } from '@/constants/header.constant'
import closeModalButton from '@/icons/profile/modal/close-button.svg'
import { Language } from '@/types/language'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useState } from 'react'
import WrapperHero from '../home/WrapperHero'
import ModalContainer from '../ui/modal-container'
import ConnectWalletButton from './connect-wallet-button'

type Props = {
  open: boolean
  onClose: () => void
}

export default function MobileSidebar({ open, onClose }: Props) {
  const path = usePathname()
  const isHomePage = path === '/'

  const [language, setLanguage] = useState<Language>('en')

  return (
    <ModalContainer open={open} handleClose={onClose}>
      <WrapperHero src="/images/home/mobile-background.png">
        <div className="w-screen">
          <div className="h-screen w-full flex flex-col justify-between relative  px-[28px] py-[48px]">
            <button
              onClick={onClose}
              className="absolute right-6 top-6 z-10 outline-none md:right-10 md:top-10 hover:bg-[rgba(212,199,156,0.30)] hover:rounded-md"
            >
              <Image src={closeModalButton} alt="" width={38} height={38} className=" fill-black1 stroke-black1" />
            </button>
            <div className="flex w-[305px] flex-col gap-8 bg-full text-text-black">
              <div className="flex w-[207.62px] flex-col gap-6">
                <div className="flex h-full w-full flex-col gap-6">
                  {headerItems.map((item, index) => (
                    <Fragment key={index}>
                      <Link
                        href={item.href}
                        className={`${(item.href === '/' && isHomePage) || (path.includes(item.href) && !isHomePage && item.href !== '/') ? ' text-red-light' : 'border-transparent'} 
                        flex h-full w-full gap-2 px-6 text-[22px] font-semibold`}
                      >
                        <span>{item.label}</span>
                      </Link>
                    </Fragment>
                  ))}
                  <Link
                    href="/profile"
                    className={`${path.includes('/profile') ? ' text-red-light' : 'border-transparent'} flex h-full w-full gap-2 px-6 text-[22px] font-semibold`}
                  >
                    <span>My Profile</span>
                  </Link>
                </div>
              </div>
            </div>
            <ConnectWalletButton mode="solid" />
          </div>
        </div>
      </WrapperHero>
    </ModalContainer>
  )
}

