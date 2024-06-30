'use client'

import useDetectDeviceInfo from '@/hooks/custom/useDeviceInfo'
import { useMediaQuery } from '@/hooks/custom/useMediaQuery'
import disconnect from '@/icons/header/disconnect.svg'
import oldManIcon from '@/icons/header/old-man.svg'
import { selectAddress } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { truncate } from '@/lib/truncate'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Trans from '../i18n/Trans'

type Props = {
  mode: 'transparent' | 'solid'
  handleDisconnect: () => void
}

export default function Menu({ mode, handleDisconnect }: Props) {
  const router = useRouter()
  const selfRef = useRef<HTMLDivElement>(null)

  const address = useAppSelector(selectAddress)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { isSupportTouch } = useDetectDeviceInfo()
  const [show, setShow] = useState(false)
  const tablet = useMediaQuery('(min-width: 768px)')

  const handleNavigate = (href: string) => {
    setShow(false)
    router.push(href)
  }

  useEffect(() => {
    if (!tablet) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selfRef.current &&
          !selfRef.current.contains(event.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setShow(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [setShow, !tablet])

  return (
    <div className={cn('relative')}>
      <div
        className="flex items-center gap-2"
        onMouseEnter={() => setShow(true)}
        onClick={() => {
          setShow(true)
        }}
        ref={selfRef}
      >
        <div
          className={cn(
            'flex scale-75 md:scale-100 size-6 items-center justify-center',
            mode === 'transparent'
              ? 'bg-[url(/icons/header/farmer-black.svg)] farmer-white-icon'
              : 'bg-[url(/icons/header/farmer.svg)] farmer-icon',
          )}
        />
        <span
          id="connect-wallet-address"
          className={cn(
            `text-[12px] md:text-base font-medium leading-[130%] font-Roboto uppercase `,
            mode === 'transparent' ? 'text-white address-item' : 'text-red-light address-item-white',
          )}
        >
          {tablet && truncate(address, 13, '...')}
          {!tablet && truncate(address, 8, '...')}
        </span>
        <div
          className={cn(
            'size-6 items-center justify-center lg:flex ',
            mode === 'transparent'
              ? 'bg-[url(/icons/header/chevron-down.svg)] chevron-white-down'
              : 'bg-[url(/icons/header/chevron-down-black.svg)] chevron-down',
            'bg-center bg-no-repeat bg-cover w-3 h-[6px]',
          )}
        />
      </div>
      <div
        className={`${show ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-50'} absolute -inset-x-3 top-full mt-3 origin-top overflow-hidden rounded-lg border border-text-black_3 text-black1 transition-all duration-300 lg:block`}
        style={{
          boxShadow: '3px 6px 30px 0px rgba(0, 0, 0, 0.12)',
        }}
        ref={dropdownRef}
        onMouseLeave={() => setShow(false)}
      >
        <div
          className="flex h-8 md:h-11 items-center justify-start gap-1 md:gap-4 bg-white px-[2px] md:px-4 hover:bg-[#FAF5F0]"
          onClick={handleDisconnect}
        >
          <Image src={disconnect} alt="" />
          <span className="text-[12px] md:text-sm font-light leading-5 tracking-[-0.42px]">
            <Trans>Disconnect</Trans>
          </span>
        </div>
        <div
          className="flex h-8 md:h-11 items-center justify-start gap-1 md:gap-4 bg-white px-[2px] md:px-4 hover:bg-[#FAF5F0]"
          onClick={() => {
            handleNavigate('/profile')
          }}
        >
          <Image src={oldManIcon} alt="" />
          <span className="text-[12px] md:text-sm font-light leading-5 tracking-[-0.42px]">
            <Trans>User Profile</Trans>
          </span>
        </div>
      </div>
    </div>
  )
}

