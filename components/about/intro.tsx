import Image from 'next/image'
import React from 'react'
import symbol from '@/images/aboutUs/symbol.svg'
import decor from '@/images/aboutUs/decor.png'
import bg_img_mb from '@/images/marketplace/background-mg.png'
import bg_img from '@/images/marketplace/background.png'

const Intro = () => {
  return (
    <div className='relative overflow-y-hidden lg:h-[734px]'>
      <Image src={bg_img} alt='' className='absolute z-0 hidden w-full sm:block' />
      <Image src={bg_img_mb} alt='' className='absolute z-0 w-full sm:hidden' />

      <div className='mx-auto w-full max-w-[1440px] items-center justify-between px-5 py-10 lg:flex lg:h-[750px] lg:px-[158px] relative z-10'>
        <div className='mx-auto'>
            <Image src={symbol} alt='' width={80} className='lg:block hidden' />
            <Image src={symbol} alt='' width={52} className='lg:hidden block' />

          <p className='mt-6 text-[32px] font-semibold leading-9 tracking-[-0.96px] text-black sm:font-medium sm:leading-[44px] lg:text-[48px]'>
            about
          </p>
          <p className='text-[32px] font-semibold leading-9 tracking-[-0.96px] text-[#EF232C] sm:mt-2 sm:leading-[44px] lg:text-[48px]'>
            golden apple
          </p>
          <div className='mt-10 grid h-[321px] max-w-[455px] grid-rows-3 gap-6 text-base font-light leading-6 tracking-[-0.48px] text-black1 sm:mt-11'>
            <p>
              Although the history of NFT on Bitcoin has started even before the existence of the
              Ethereum blockchain,
            </p>
            <p>
              it is still relatively subdued compared to its counterpart. As we believe in the
              overall development of the <span className='text-[#EF232C]'>Bitcoin blockchain</span>,
            </p>
            <p>
              we want to allocate part of our venture to create a project that can bring users in
              the hope that this community will be the seed of a bigger ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Intro
