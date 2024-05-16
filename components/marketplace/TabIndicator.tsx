import React, { useTransition } from 'react'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

interface Props {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode;
  iconActive: StaticImport;
  icon: StaticImport
}

const TabIndicator = ({ isActive, children, iconActive, icon, onClick }: Props) => {
  
  const [isPending, startTransition] = useTransition();

  if (isActive) {
    return (
      <button
        className={`flex h-[64px] cursor-pointer items-center justify-center gap-[10px] border-b-[4px] border-[#EF232C] px-4 py-4 text-[#EF232C] sm:py-2`}
      >
        <Image src={iconActive} alt='' />
        <span className='text-sm font-medium leading-5 tracking-[-0.42px] sm:text-base sm:leading-6 sm:tracking-[-0.48px]'>
          {children}
        </span>
      </button>
    )
  }

  const setTab = () => {
    startTransition(() => {
      onClick();
    })
  }

  return (
    <>
      <button
        onClick={setTab}
        className={`flex h-[64px] cursor-pointer items-center justify-center gap-[10px] px-4 py-4 text-[rgba(174,153,85,1)] sm:py-2`}
      >
        <Image src={icon} alt='' />
        <span className='text-sm font-medium leading-5 tracking-[-0.42px] sm:text-base sm:leading-6 sm:tracking-[-0.48px]'>
          {children}
        </span>
      </button>
    </>
    // <div className='w-full border-b border-[#D4C79C] flex gap-[10px] max-sm:my-4'>
    //   {tabs.map((item, index) => (
    //     <button
    //       key={index}
    //       className={`sm:py-2 py-4 px-4 justify-center h-[64px] flex gap-[10px] items-center ${index === indexOfTab ? 'border-b-[4px] border-[#EF232C] text-[#EF232C]' : 'text-[rgba(174,153,85,1)]'} cursor-pointer`}
    //       onClick={() => { handleIndexSet(index)}}
    //     >
    //       <Image src={indexOfTab === index ? item?.icon_active : item?.icon} alt='' />
    //       <span className='sm:text-base text-sm font-medium sm:leading-6 leading-5 sm:tracking-[-0.48px] tracking-[-0.42px]'>{item?.title}</span>
    //     </button>
    //   ))}
    // </div>
  )
}

export default TabIndicator
