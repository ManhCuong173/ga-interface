import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

export type Props = {
  icon: string
  bgMobile: string
  bgDesktop: string
  color: string

  description: string
  motionProps: any
}

const Card: React.FC<Props> = ({ icon, bgDesktop, bgMobile, color, description, motionProps }) => {
  return (
    <motion.div {...motionProps} className=" group relative w-full max-w-[400px] lg:max-w-auto mx-auto lg:mx-0 ">
      <div className="group relative overflow-hidden">
        <div>
          <Image src={bgDesktop} width={235} height={417} alt="" className="hidden object-cover lg:inline-block" />
          <Image src={bgMobile} width={400} height={200} alt="" className="object-cover lg:hidden" />
        </div>

        <div
          className={cn(
            'absolute top-1/2 left-1/2',
            '-translate-x-1/2 -translate-y-1/2',
            'max-lg:group-hover:left-[20%]',
            'lg:group-hover:top-[40%]',
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
            'pl-14 pr-10 w-[80%]  h-full lg:px-7  lg:w-full  lg:h-[65%]',
            'rounded-tl-[20px] rounded-bl-[20px] lg:rounded-tr-[20px]',
          )}
        >
          <div className="text-secondary text-sm font-Roboto text-left lg:text-center">{description}</div>
        </div>
      </div>
    </motion.div>
  )
}
export default Card
