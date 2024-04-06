'use client'

import { appearAnimation } from '@/constants/animation.constant'
import discord from '@/icons/home/discord.svg'
import twitter from '@/icons/home/twitter.svg'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Banner() {
  return (
    <div id='banner' className='snap-center'>
      <div className='h-[600px] bg-[url(/images/home/heading.png)] bg-[auto_100%] px-4 pb-[294.26px] lg:h-screen lg:bg-full lg:bg-left-top lg:px-0 lg:pb-[100px]'>
        <div className='relative mx-auto flex h-full max-w-container flex-col items-start justify-end text-_white lg:items-end lg:justify-between lg:pr-[60px] lg:pt-[98px]'>
          <div className='absolute bottom-[calc(-296px+54px)] flex gap-4 lg:relative lg:bottom-0'>
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
          <div className='space-y-4'>
            <motion.div {...appearAnimation} transition={{ duration: 0.5, delay: 1.5 }}>
              <h1
                className='inline-block w-fit !bg-clip-text text-4xl font-medium tracking-[-1.8px] text-transparent lg:text-[64px] lg:leading-[80px] lg:tracking-[-3.2px]'
                style={{
                  background:
                    'linear-gradient(131deg, #FFECCF 8.55%, #FEF396 38.02%, rgba(255, 223, 172, 0.00) 90.09%',
                }}
              >
                golden <span className='text-red-light'>apple</span>
              </h1>
            </motion.div>
            <motion.div
              initial='start'
              whileInView='end'
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2 }}
              variants={{
                start: { opacity: 0 },
                end: { opacity: 1 },
              }}
            >
              <p className='w-[257px] text-sm font-light leading-5 tracking-[-0.42px] lg:w-[440px] lg:leading-[32px]'>
                Golden Apple is the GameFi platform for the Bitcoin Ecosystem. Through mapping the
                Bitcoin Assets (BRC20, Ordinals NFT and others) to Ethereum (and other Layer2)
                networks,
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
