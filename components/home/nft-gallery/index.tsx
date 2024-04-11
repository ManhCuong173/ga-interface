'use client'

import { appearAnimation } from '@/constants/animation.constant'
import { cards } from '@/constants/gallery-card.constant'
import lantern from '@/icons/home/lantern.svg'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Card from './card'

export default function NFTGallery() {
  return (
    <div id='section-nft-gallery' className='snap-center'>
      <div className='mx-auto flex max-w-[1440px] items-center justify-center lg:h-screen lg:pl-20 lg:pr-6'>
        <div className='relative flex h-fit max-h-full w-[1304px] max-w-full flex-col gap-6 border-[1.852px] border-[#FACE5D] bg-white/10 p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[5px]'>
          <div className='flex flex-col gap-6 bg-[linear-gradient(180deg,#FFF4DD_0%,rgba(255,244,221,0.45)_100%)] px-4 py-6 lg:px-[33px]'>
            <motion.div {...appearAnimation} transition={{ duration: 0.6, delay: 1 }}>
              <div className='flex justify-center gap-2'>
                <span className='flex h-12 w-12 items-center justify-center'>
                  <Image src={lantern} alt='' />
                </span>
                <span className='text-[32px] font-medium tracking-[-0.96px] text-black1 lg:text-5xl'>
                  nft gallery
                </span>
              </div>
            </motion.div>
            <div className='grid h-fit gap-4 lg:grid-cols-5'>
              {cards.map((card, index) => (
                <Card key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
