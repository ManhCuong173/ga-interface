'use client'

import WrapperHero from '@/components/home/WrapperHero'
import BannerDecor from '@/images/about/banner-nft-decor.svg'
import Image from 'next/image'

export default function Banner() {
  return (
    <div id="banner" className="snap-center">
      <WrapperHero src="/images/about/banner-bg.svg" className="pt-[71px] sm:pt-0">
        <div className="flex flex-col w-screen h-screen sm:flex-row  md:justify-between">
          <div className="w-full flex relative sm:flex-grow justify-end order-1 sm:order-2">
            <Image src={BannerDecor} className="w-[300px] sm:w-[471px] sm:h-[416px[" alt="" />
          </div>
          <div
            className="w-full px-[30px]  flex mt-12 order-2 flex-col items-center
          sm:pl-[18%] sm:w-[70%] sm:mt-[223px] sm:order-1 sm:items-start"
          >
            <div className="flex justify-center">
              <div className="flex items-center justify-center h-fit">
                <Image src="/images/commons/app-logo.png" width={64} height={64} alt="" />
                <div className="ml-3 sm:ml-4 text-xl sm:text-2xl ">Golden Apple</div>
              </div>
            </div>

            <div
              className="text-[24px] font-semibold leading-[130%] -tracking-[1.35px] text-red-light mt-8 max-w-[312px] text-center
              sm:text-[30px] lg:text-[45px] sm:min-w-[320px] lg:min-w-[526px] sm:text-left "
            >
              Earn Yield from Your Idle BTC with Golden apple BTC Restaking
            </div>
          </div>
        </div>
      </WrapperHero>
    </div>
  )
}

