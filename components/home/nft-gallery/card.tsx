import Trans from '@/components/i18n/Trans'
import { urlRoute } from '@/constants/routes'
import { useLocaleInfo } from '@/hooks/useLocaleInfo'
import { cn } from '@/lib/utils'
import { ElementType } from '@/types/element'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type Props = {
  icon: string
  bgMobile: string
  bgDesktop: string
  color: string

  title?: string
  description: string
  motionProps: any
  element?: ElementType
}

const Card: React.FC<Props> = ({ icon, bgDesktop, bgMobile, color, description, title, motionProps, element }) => {
  const { locale } = useLocaleInfo()

  return (
    <motion.div
      {...motionProps}
      className=" group relative w-full max-w-[400px] lg:max-w-auto mx-auto lg:mx-0 cursor-pointer"
    >
      <div>
        <div className="group relative overflow-hidden lg:h-[417px]">
          <div>
            <Image src={bgDesktop} width={235} height={417} alt="" className="hidden object-cover lg:inline-block" />
            <Image src={bgMobile} width={400} height={200} alt="" className="object-cover lg:hidden" />
          </div>

          <div
            className={cn(
              'absolute top-1/2 left-1/2',
              '-translate-x-1/2 -translate-y-1/2',
              'max-lg:group-hover:left-[15%]',
              'lg:group-hover:top-[20%]',
              'transition-all duration-200 z-10',
              'w-[82px] h-[82px]',
            )}
          >
            <Image src={icon} width={82} height={82} alt="" />
          </div>

          <div
            style={{
              backgroundColor: color,
            }}
            className={cn(
              'absolute max-lg:right-0 bottom-0',
              'transition-all duration-200',
              'max-lg:translate-x-full max-lg:group-hover:translate-x-0',
              'lg:translate-y-full lg:group-hover:translate-y-[10%]',
              'flex items-center justify-center',
              'pl-8 pr-8 w-[80%]  h-full lg:px-[28px]  lg:w-full  lg:h-[85%]',
              'rounded-tl-[20px] rounded-bl-[20px] lg:rounded-tr-[20px]',
            )}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="text-secondary text-sm font-semibold font-Roboto text-left lg:text-center -ml-[1px] lg:mb-2">
                <Trans>{title}</Trans>
              </div>
              <Link
                href={`${urlRoute.marketplace}/?elementId=${element?.id}`}
                className={cn('text-secondary text-xs font-Roboto text-left lg:text-center relative -ml-[1px]')}
              >
                <Trans>{description}</Trans>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
export default Card

