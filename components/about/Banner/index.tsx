'use client'

import WrapperHero from '@/components/home/WrapperHero'
import { appearAnimation } from '@/constants/animation.constant'
import BannerDecor from '@/images/about/banner-nft-decor.svg'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Banner() {
  return (
    <div id="banner" className="snap-center">
      <WrapperHero src="/images/about/banner-bg.svg">
        <div className="flex flex-col w-screen h-screen sm:flex-row lg:justify-center ">
          <div className="w-full flex relative sm:flex-grow order-1 sm:order-2 mt-[calc(3rem_+110px)] px-[30px] lg:px-0">
            <Image src={BannerDecor} className="sm:w-[627px] sm:h-[469px] md:w-[90%]" alt="" />
          </div>
          <div
            className="lg:w-full px-[30px]  flex mt-12 order-2 flex-col lg:items-end 
             sm:w-[70%] sm:mt-[223px] sm:order-1 sm:items-start"
          >
            <div className="flex flex-col items-center sm:items-center lg:items-start">
              <div className="flex justify-center">
                <motion.div
                  {...appearAnimation}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center justify-center "
                >
                  <div className="w-[48px] h-[48px] lg:w-[64px] lg:h-[64px] relative">
                    <Image src="/images/commons/app-logo.png" fill objectFit="cover" alt="" />
                  </div>
                  <div className="ml-3 sm:ml-4 text-xl sm:text-2xl ">Golden Apple</div>
                </motion.div>
              </div>

              <motion.div
                {...appearAnimation}
                transition={{ duration: 0.5, delay: 1 }}
                className="text-[24px] font-semibold leading-[130%] -tracking-[1.35px] text-red-light mt-8 max-w-[312px] text-center
                  sm:text-[30px] lg:text-[45px] sm:min-w-[320px] lg:min-w-[526px] lg:text-left "
              >
                Earn Yield from Your Idle BTC with Golden apple BTC Restaking
              </motion.div>
            </div>
          </div>
        </div>
      </WrapperHero>
    </div>
  )
}

