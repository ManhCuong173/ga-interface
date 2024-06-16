'use client'

import { homePageItems } from '@/constants/home-page-items.constant'
import { selectActiveSection } from '@/lib/features/home-section/home-section-slice'
import { useAppSelector } from '@/lib/hook'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import Trans from './i18n/Trans'

export default function Sidebar() {
  const activeSection = useAppSelector(selectActiveSection)

  return (
    <div className="fixed inset-y-0 right-4 top-[298px] z-10 w-fit flex-col lg:right-[unset] lg:top-0 lg:flex lg:pl-[31.56px] lg:pt-[102px]">
      <div className="flex w-fit flex-col items-center gap-2">
        {homePageItems.map((item, index) => (
          <Fragment key={item.id}>
            <Link
              href={`#${item.id}`}
              className={`${item.id === activeSection ? 'bg-red-light' : 'bg-orange bg-opacity-[0.18] backdrop-blur-[2px] hover:bg-[#E49F5E] hover:bg-opacity-30'} group relative flex h-10 w-10 items-center justify-center rounded-full transition-all`}
            >
              <span className="relative h-6 w-6">
                <Image
                  src={item.activeIcon}
                  alt=""
                  fill
                  className={`${item.id === activeSection ? 'opacity-100' : 'opacity-0'} transition-opacity`}
                />
                <Image
                  src={item.icon}
                  alt=""
                  fill
                  className={`${item.id !== activeSection ? 'opacity-100' : 'opacity-0'} transition-opacity`}
                />
              </span>
              <div className="absolute inset-y-0 left-full my-auto ml-[13px] flex h-7 w-fit origin-left scale-x-0 items-center justify-center whitespace-nowrap rounded-full bg-[#161616] px-4 text-sm text-_white transition-all group-hover:scale-x-100">
                <Trans>{item.label}</Trans>
              </div>
            </Link>
            {index !== homePageItems.length - 1 && <div className="h-4 w-[1px] bg-orange"></div>}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

