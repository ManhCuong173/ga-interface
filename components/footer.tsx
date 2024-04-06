import discord from '@/icons/home/discord.svg'
import twitter from '@/icons/home/twitter.svg'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/images/commons/logo.svg'

export default function Footer() {
  return (
    <footer id='footer' className='flex h-fit snap-center flex-col bg-full lg:bg-none'>
      <div className='relative flex h-fit w-full flex-col items-center bg-[url(/images/footer/background.png)] bg-full'>
        <div className='relative mb-[73.7px] flex w-full flex-col items-start gap-6 p-6 lg:mb-[165px] lg:flex-row lg:justify-between lg:px-20 lg:py-10'>
          <div className='absolute right-6 top-6 flex h-11 gap-[11.4px] lg:hidden'>
            <Link href='' className='h-fit'>
              <button className='flex size-8 items-center justify-center rounded-full border border-_white'>
                <Image src={twitter} alt='' width={14.84} height={14.84} />
              </button>
            </Link>
            <Link href='' className='h-fit'>
              <button className='flex size-8 items-center justify-center rounded-full border border-_white'>
                <Image src={discord} alt='' width={20.81} height={14.91} />
              </button>
            </Link>
          </div>
          <div className='flex flex-col items-start gap-[15px] lg:flex-row lg:gap-[103px]'>
            <Link
              href='/'
              className='flex items-center gap-[8.78px] text-sm font-semibold text-_white lg:gap-[11.37px] lg:text-[28px] lg:leading-[28px]'
            >
              <Image src={logo} alt='' className='size-[29.25px] lg:size-[68.25px]' />
              <span>
                <span className='tracking-[0.06em]'>GOLDEN</span> <br />
                <span className='tracking-[0.24em]'>APPLE</span>
              </span>
            </Link>
            <p className='w-[316.85px ] text-xs font-light leading-[18px] tracking-[0.15px] text-_white lg:w-[379.57px] lg:text-sm lg:leading-[30px]'>
              The world’s first and largest digital marketplace for crypto collectibles and
              non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.
            </p>
          </div>
          <div className='flex flex-col items-end gap-6'>
            <div className='hidden h-11 gap-5 lg:flex'>
              <Link href='' className='h-fit'>
                <button className='flex size-11 items-center justify-center rounded-full border border-_white'>
                  <Image src={twitter} alt='' width={20.4} height={20.4} />
                </button>
              </Link>
              <Link href='' className='h-fit'>
                <button className='flex size-11 items-center justify-center rounded-full border border-_white'>
                  <Image src={discord} alt='' width={28.61} height={20.5} />
                </button>
                ``
              </Link>
            </div>
            <div className='flex gap-[22px] text-xs font-medium leading-6 tracking-[0.03em] text-yellow1 lg:text-base '>
              <Link href=''>Privacy Policy</Link>
              <Link href=''>Terms of service</Link>
            </div>
          </div>
        </div>
      </div>
      <div className='flex h-[34px] items-center justify-center bg-[#131313] text-xs font-light leading-[18px] tracking-[-0.03em] text-yellow1 lg:h-16 lg:text-sm lg:leading-5'>
        @ 2023 by golden apple. All rights reserved.
      </div>
    </footer>
  )
}
