'use client'
import symbol from '@/images/aboutUs/symbol.svg'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import BannerBG from './BannerBG'
import twitter from '@/images/about/twiiter.svg';
import discord from '@/images/about/discord.svg'

const Banner = () => {
  return (
    <div id={'bannerAbout'} className='relative overflow-y-hidden h-[568px] lg:h-[734px]'>
      <div className='absolute z-0 w-full'>
        <BannerBG />
      </div>
      <div className='relative z-10 mx-auto w-full lg:max-w-[1440px]'>
        {/* <BannerBG /> */}
        <div className='max-sm: absolute top-10 flex h-full w-full justify-between gap-5 px-5 max-sm:flex-col lg:pl-[140px] lg:pr-[85px] max-lg:items-center'>
          <span className='mt-[100px] text-[48px] font-semibold lg:leading-[88%] leading-[60px] tracking-[-2.2px] text-[#EF232C] sm:mt-[211px] sm:text-[84px] lg:text-[110px]'>
            GOLDEN <br className='lg:block hidden' /> APPLE
          </span>
          <div className='flex h-full items-center'></div>
          <div className='relative flex w-fit flex-col items-center gap-[150px] pb-[200px] max-lg:justify-between'>
            <div className='absolute top-0 left-1/2 -translate-x-1/2 hidden lg:flex items-center space-x-4'>
              <Image src={twitter} alt='twitter' />
              <Image src={discord} alt='discord' />
            </div>
            <div className='flex gap-[22px] max-sm:hidden'>
              <motion.div
                initial='start'
                whileInView='end'
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                variants={{
                  start: { y: -100, opacity: 0 },
                  end: { y: 0, opacity: 1 },
                }}
              >
                <Link href='/'>
                  <div className='space-y-[9px]'>
                    <Image src={twitter} alt='' width={34} height={34} />
                  </div>
                </Link>
              </motion.div>
              <motion.div
                initial='start'
                whileInView='end'
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
                variants={{
                  start: { y: -100, opacity: 0 },
                  end: { y: 0, opacity: 1 },
                }}
              >
                <Link href='/'>
                  <div className='space-y-[9px]'>
                    <Image src={discord} alt='' width={34} height={34} />
                  </div>
                </Link>
              </motion.div>
            </div>
            <div className='relative flex flex-col lg:items-start items-center lg:gap-[38px] gap-6'>
              <p
                className='max-w-[350px] border-b-[2px] border-t-[2px] border-[#D4C79C] px-[10px] py-[18px] 
                          text-base font-semibold leading-[155%] tracking-[-0.48px] text-[#4E473F] sm:text-2xl'
              >
                Earn Yield from Your Idle BTC with Golden apple BTC Restaking
              </p>
              <Image src={symbol} alt='' />
              <div className='flex gap-4 pt-5 justify-center sm:hidden'>
                <Link href='/'>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                      <path d="M24.6193 19.8956L34.8579 8.25H32.432L23.5379 18.3596L16.4393 8.25H8.25L18.9869 23.5389L8.25 35.75H10.6759L20.0626 25.0714L27.5607 35.75H35.75L24.6193 19.8956ZM21.2957 23.6731L20.2061 22.1497L11.5507 10.0395H15.2774L22.2646 19.8164L23.3496 21.3398L32.4309 34.0477H28.7042L21.2957 23.6731Z" fill="#4E473F"/>
                    </svg>
                  </div>
                </Link>
                <Link href='/'>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                      <path d="M17.1423 8.80006C16.6716 8.80342 12.8154 8.91269 8.74408 11.9486C8.74408 11.9486 4.40039 19.7904 4.40039 29.4443C4.40039 29.4443 6.93365 33.8032 13.6005 34.015C13.6005 34.015 14.7166 32.6836 15.621 31.5321C11.7917 30.3806 10.3427 27.9886 10.3427 27.9886C10.3427 27.9886 10.6453 28.2004 11.1866 28.5047C11.2168 28.5047 11.2454 28.5366 11.3042 28.5652C11.3967 28.624 11.4858 28.656 11.5766 28.7165C12.3296 29.1401 13.0827 29.4729 13.7787 29.7436C15.0159 30.2596 16.4935 30.7118 18.2148 31.0446C20.4774 31.4683 23.1317 31.6195 26.0247 31.0766C27.5248 30.7974 28.9914 30.3613 30.4003 29.7755C31.6204 29.3147 32.7834 28.7152 33.8665 27.9886C33.8665 27.9886 32.3604 30.4395 28.4083 31.5607C29.3127 32.6802 30.4003 33.9797 30.4003 33.9797C37.0655 33.7679 39.6004 29.4074 39.6004 29.441C39.6004 19.782 35.2567 11.9435 35.2567 11.9435C30.9433 8.70929 26.8097 8.80006 26.8097 8.80006L26.3878 9.28419C31.5148 10.8273 33.8985 13.1 33.8985 13.1C31.0851 11.568 28.0034 10.5915 24.8211 10.2239C22.7943 9.99826 20.7477 10.0186 18.7258 10.2844C18.5459 10.2844 18.3947 10.3163 18.2114 10.3432C17.1558 10.4642 14.5923 10.8273 11.3647 12.2511C10.2502 12.7353 9.58457 13.1 9.58457 13.1C9.58457 13.1 12.0624 10.708 17.4903 9.16484L17.1877 8.80006H17.1423ZM16.3741 19.9703C18.0921 19.9703 19.4823 21.4529 19.4503 23.3003C19.4503 25.1494 18.0921 26.632 16.3741 26.632C14.6847 26.632 13.2979 25.1477 13.2979 23.3003C13.2979 21.4529 14.6528 19.9703 16.3741 19.9703ZM27.3846 19.9703C29.0723 19.9703 30.4608 21.4529 30.4608 23.3003C30.4608 25.1494 29.1009 26.632 27.3846 26.632C25.6935 26.632 24.3084 25.1477 24.3084 23.3003C24.3084 21.4529 25.6633 19.9703 27.3846 19.9703Z" fill="#4E473F"/>
                    </svg>
                  </div>

                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
