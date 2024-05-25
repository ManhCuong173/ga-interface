'use client'

import disconnect from '@/icons/header/disconnect.svg'
import oldManIcon from '@/icons/header/old-man.svg'
import { selectAddress } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { truncate } from '@/lib/truncate'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type Props = {
  mode: 'transparent' | 'solid'
  handleDisconnect: () => void
}

export default function Menu({ mode, handleDisconnect }: Props) {
  const router = useRouter()

  const address = useAppSelector(selectAddress)

  const selfRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [show, setShow] = useState(false)

  const handleNavigate = (href: string) => {
    setShow(false)
    router.push(href)
  }

  useEffect(() => {
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
  }, [setShow])

  return (
    <div className={cn('relative')}>
      <div
        className="flex items-center gap-2"
        ref={selfRef}
        onClick={() => {
          setShow((prev) => !prev)
        }}
      >
        <div
          className={cn(
            'flex size-6 items-center justify-center',
            mode === 'transparent'
              ? 'bg-[url(/icons/header/farmer-black.svg)] farmer-white-icon'
              : 'bg-[url(/icons/header/farmer.svg)] farmer-icon',
          )}
        />
        <span
          id="connect-wallet-address"
          className={cn(
            ` text-base font-medium leading-[130%] font-Roboto uppercase `,
            mode === 'transparent' ? 'text-white address-item' : 'text-red-light address-item-white',
          )}
        >
          {truncate(address, 13, '...')}
        </span>
        <div
          className={cn(
            'hidden size-6 items-center justify-center lg:flex ',
            mode === 'transparent'
              ? 'bg-[url(/icons/header/chevron-down.svg)] chevron-white-down'
              : 'bg-[url(/icons/header/chevron-down-black.svg)] chevron-down',
            'bg-center bg-no-repeat bg-cover w-3 h-[6px]',
          )}
        />
      </div>
      <div
        className={`${show ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-50'} absolute -inset-x-3 top-full mt-3 hidden origin-top overflow-hidden rounded-lg border border-text-black_3 text-black1 transition-all duration-300 lg:block`}
        ref={dropdownRef}
        style={{
          boxShadow: '3px 6px 30px 0px rgba(0, 0, 0, 0.12)',
        }}
      >
        <div
          className="flex h-11 items-center justify-start gap-4 bg-white px-4 hover:bg-[#FAF5F0]"
          onClick={handleDisconnect}
        >
          <Image src={disconnect} alt="" />
          <span className="text-sm font-light leading-5 tracking-[-0.42px]">Disconnect</span>
        </div>
        <div
          className="flex h-11 items-center justify-start gap-4 bg-white px-4 hover:bg-[#FAF5F0]"
          onClick={() => {
            handleNavigate('/profile')
          }}
        >
          <Image src={oldManIcon} alt="" />
          <span className="text-sm font-light leading-5 tracking-[-0.42px]">User Profile</span>
        </div>
      </div>
    </div>
  )
}

