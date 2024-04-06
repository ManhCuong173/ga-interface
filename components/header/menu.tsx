'use client'

import chevronDownBlackIcon from '@/icons/header/chevron-down-black.svg'
import chevronDownIcon from '@/icons/header/chevron-down.svg'
import disconnect from '@/icons/header/disconnect.svg'
import farmerBlackIcon from '@/icons/header/farmer-black.svg'
import farmerIcon from '@/icons/header/farmer.svg'
import oldManIcon from '@/icons/header/old-man.svg'
import { selectAddress } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { truncate } from '@/lib/truncate'
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
    <div className='relative'>
      <div
        className='flex items-center gap-2'
        ref={selfRef}
        onClick={() => {
          setShow((prev) => !prev)
        }}
      >
        <span className='flex size-6 items-center justify-center'>
          {mode === 'transparent' ? (
            <Image src={farmerIcon} alt='' width={24} height={24} />
          ) : (
            <Image src={farmerBlackIcon} alt='' width={24} height={24} />
          )}
        </span>
        <span
          className={`${mode === 'transparent' ? 'text-_white' : 'text-black1'} text-base font-medium`}
        >
          {truncate(address, 13, '...')}
        </span>
        <span className='hidden size-6 items-center justify-center lg:flex'>
          {mode === 'transparent' ? (
            <Image src={chevronDownIcon} alt='' width={12} height={6} />
          ) : (
            <Image src={chevronDownBlackIcon} alt='' width={12} height={6} />
          )}
        </span>
      </div>
      <div
        className={`${show ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-50'} absolute -inset-x-3 top-full mt-3 hidden origin-top overflow-hidden rounded-lg border border-text-black_3 text-black1 transition-all duration-300 lg:block`}
        ref={dropdownRef}
        style={{
          boxShadow: '3px 6px 30px 0px rgba(0, 0, 0, 0.12)',
        }}
      >
        <div
          className='flex h-11 items-center justify-start gap-4 bg-white px-4 hover:bg-[#FAF5F0]'
          onClick={handleDisconnect}
        >
          <Image src={disconnect} alt='' />
          <span className='text-sm font-light leading-5 tracking-[-0.42px]'>Disconnect</span>
        </div>
        <div
          className='flex h-11 items-center justify-start gap-4 bg-white px-4 hover:bg-[#FAF5F0]'
          onClick={() => {
            handleNavigate('/profile')
          }}
        >
          <Image src={oldManIcon} alt='' />
          <span className='text-sm font-light leading-5 tracking-[-0.42px]'>User Profile</span>
        </div>
      </div>
    </div>
  )
}
