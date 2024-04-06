'use client'

import arrowRight from '@/icons/home/arrow-right.svg'
import chineseKnot from '@/icons/home/slogan/chinese-knot.svg'
import cornertl from '@/icons/home/slogan/corner.svg'
import decor from '@/icons/home/slogan/decor.svg'
import { useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import DragonLine from './dragon-line'

const SLOGAN = `"Golden Apple is the GameFi platform for the Bitcoin Ecosystem. Through mapping the
Bitcoin Assets (BRC20, Ordinals NFT and others) to Ethereum (and other Layer2)
networks,"`

export default function Slogan() {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true })
  const [slogan, setSlogan] = useState('')

  const typingSpeed = 40

  useEffect(() => {
    if (isInView) {
      let index = 0

      const interval = setInterval(() => {
        if (index <= SLOGAN.length) {
          setSlogan(SLOGAN.slice(0, index))
          index = index + 1
        }
      }, typingSpeed)

      return () => clearInterval(interval)
    }
  }, [isInView])

  return (
    <div id='section-slogan' className='snap-center'>
      <div className='relative flex aspect-[414/842] px-4 pb-[60px] pt-[33.45px] lg:aspect-[1440/1497] lg:p-0 lg:pt-[1px]'>
        <div className='relative z-[2] mx-auto flex w-full max-w-container items-center'>
          <div className='flex w-fit max-w-full flex-col items-center gap-[265.45px] lg:ml-[93px] lg:gap-9'>
            <div className='max-w-full border-[1.852px] border-[#FACE5D] bg-white/10 p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] lg:backdrop-blur-[5px]'>
              <div
                className='relative flex w-[743px] max-w-full flex-col gap-4 border border-[#FFDFAC] lg:h-[644px]'
                style={{
                  background:
                    'linear-gradient(180deg, #FFF4DD 0%, rgba(255, 244, 221, 0.6) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08))',
                  boxShadow: '0px -9px 59.3px 0px rgba(0, 0, 0, 0.10)',
                }}
              >
                <div className='absolute inset-0 z-[0] bg-[url(/images/home/slogan/slogan-background.png)] bg-full opacity-10 bg-blend-soft-light'></div>
                <div className='relative z-[1] size-full px-2 py-10 lg:gap-8 lg:px-8 lg:py-[60px]'>
                  <Image
                    src={chineseKnot}
                    alt=''
                    className='h-[30.848px] w-[30.848px] lg:h-[60px] lg:w-[60px]'
                    width={60}
                    height={60}
                  />
                  <p
                    ref={ref}
                    className='text-typing my-4 text-[20px] font-semibold capitalize leading-[25.707px] tracking-[-0.03em] text-black1 lg:my-8 lg:h-[350px] lg:text-4xl lg:leading-[50px]'
                  >
                    {slogan}
                  </p>
                  <Image
                    src={decor}
                    alt=''
                    className='h-[22.259px] w-[34.333px] lg:mb-[26.71px] lg:h-[43.294px] lg:w-[66.778px]'
                    width={60}
                    height={60}
                  />
                  <Image
                    src={cornertl}
                    alt=''
                    className='absolute left-2 top-[18.22px] h-[17.323px] w-[38.976px] lg:left-8 lg:top-[18.43px] lg:h-[33.7px] lg:w-[75.8px]'
                  />
                  <Image
                    src={cornertl}
                    alt=''
                    className='absolute bottom-[20.14px] right-[14.97px] h-[17.323px] w-[38.976px] rotate-180 lg:bottom-[18.43px] lg:right-8 lg:h-[33.7px] lg:w-[75.8px]'
                  />
                </div>
              </div>
            </div>
            <Link
              href='/inscribe'
              className='group relative flex h-12 w-[184.615px] items-center justify-center gap-[14.5px] bg-[url(/images/home/button-join-now.png)] bg-full text-sm font-semibold leading-[18.667px] text-yellow1 lg:h-[94.22px] lg:w-[362.39px] lg:text-2xl lg:leading-8'
            >
              <span className='transition-all lg:group-hover:-translate-x-[18.12px]'>Join now</span>
              <Image
                src={arrowRight}
                alt=''
                className='absolute inset-y-0 left-[200.99px] my-auto hidden size-[43.49px] opacity-0 transition-all group-hover:translate-x-[25.71px] group-hover:opacity-100 lg:flex'
              />
            </Link>
          </div>
        </div>
        <div className='absolute bottom-0 right-0'>
          <DragonLine />
        </div>
      </div>
    </div>
  )
}
