'use client'

import { headerItems } from '@/constants/header.constant'
import oldManActiveIcon from '@/icons/header/old-man-active.svg'
import oldManIcon from '@/icons/header/old-man.svg'
import logo from '@/images/commons/mobile-logo-black.png'
import { Language } from '@/types/language'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useState } from 'react'
import ModalContainer from '../ui/modal-container'
import ConnectWalletButton from './connect-wallet-button'
import backgroundImage from '@/images/header/mobile-menu-background.png'

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
      <div
        className='w-[calc(100vw-30px)] bg-white/10 p-2'
        style={{
          border: '1.85px solid #FACE5D',
          boxShadow: '0px 4px 4px 0px #00000040',
        }}
      >
        <div
          className='h-fit w-full bg-full pb-14 pt-[42.95px] backdrop-blur-[5px]'
          style={{
            background: 'linear-gradient(180deg, #FFF4DD 0%, rgba(255, 244, 221, 0.45) 100%)',
          }}
        >
          <div
            className='mx-auto flex w-[305px] flex-col gap-8 bg-full p-[34px] text-text-black'
            style={{
              backgroundImage: `url(${backgroundImage.src})`,
            }}
          >
            <Link href='/' className='mx-auto flex items-center gap-[7.74px]'>
              <Image src={logo} alt='' className='h-9 w-[123.14px]' />
            </Link>
            <ConnectWalletButton mode='solid' />
            <div className='mx-auto flex w-[207.62px] flex-col gap-8'>
              <div className='mx-auto flex h-full w-full flex-col items-center gap-6'>
                {headerItems.map((item, index) => (
                  <Fragment key={index}>
                    <Link
                      href={item.href}
                      className={`${(item.href === '/' && isHomePage) || (path.includes(item.href) && !isHomePage && item.href !== '/') ? ' text-red-light' : 'border-transparent'} flex h-full w-full items-center justify-center gap-2 px-6`}
                    >
                      <span>{item.label}</span>
                    </Link>
                    <div className='h-[1px] w-full bg-line'></div>
                  </Fragment>
                ))}
                <Link
                  href='/profile'
                  className={`${path.includes('/profile') ? ' text-red-light' : 'border-transparent'} flex h-full w-full items-center justify-center gap-2 px-6`}
                >
                  {path.includes('/profile') ? (
                    <Image src={oldManActiveIcon} alt='' width={24} height={24} />
                  ) : (
                    <div className='relative h-6 w-6'>
                      <Image
                        src={oldManIcon}
                        alt=''
                        width={24}
                        height={24}
                        className='absolute inset-0'
                      />
                    </div>
                  )}
                  <span>User Profile</span>
                </Link>
                <div className='grid h-9 w-full grid-cols-2 items-center overflow-hidden rounded-lg border border-line text-black1'>
                  <div
                    className={`${language === 'en' ? 'bg-line' : ''} flex h-full items-center justify-center`}
                    onClick={() => {
                      setLanguage('en')
                    }}
                  >
                    EN
                  </div>
                  <div
                    className={`${language === 'cn' ? 'bg-line' : ''} flex h-full items-center justify-center`}
                    onClick={() => {
                      setLanguage('cn')
                    }}
                  >
                    中国人
                  </div>
                </div>
              </div>
              <div
                className='h-[24.5px] w-full bg-[url(/images/header/button-close.png)] bg-full'
                onClick={onClose}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}
