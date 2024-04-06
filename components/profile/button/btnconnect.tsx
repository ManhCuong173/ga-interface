import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'
import ic_line from '@/icons/socials/line.svg'

interface PropsButtonConnect {
  icon: StaticImport
  text: string
  onClick?: () => void
  className?: string
  status: boolean | undefined
}

const ButtonConnect = ({
  icon,
  text,
  onClick,
  status,
  className,
  ...props
}: PropsButtonConnect) => {
  return (
    <button
      className={`box-border flex h-10 w-[250px] ${!status ? 'justify-center' : 'justify-between'} items-center gap-2 rounded-full border border-[#E5E4E3] px-4 py-2 text-sm font-light ${className}`}
      onClick={onClick}
      {...props}
    >
      {!status && (
        <>
          <Image src={icon} alt='icon' />
          <span className='max-w-[140px] truncate'>{text}</span>
        </>
      )}
      {status && (
        <>
          <div className='flex items-center space-x-2'>
            <Image src={icon} alt='icon' />
            <Image src={ic_line} alt='iconLine' />
            <span className='max-w-[100px] truncate'>{text}</span>
          </div>

          <button className='text-xs font-light text-[#D4C79C] '>Remove</button>
        </>
      )}
    </button>
  )
}

export default ButtonConnect
