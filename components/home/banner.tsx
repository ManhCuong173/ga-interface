'use client'

import { appearAnimation } from '@/constants/animation.constant'
import { motion } from 'framer-motion'
import WrapperHero from './WrapperHero'

export default function Banner() {
  return (
    <div id="banner" className="snap-center">
      <WrapperHero src="/images/home/bg-home.svg">
        <div className="relative mx-auto flex flex-1 pt-[72px] h-full max-w-container flex-col items-center justify-center text-_white lg:items-center lg:justify-center lg:pr-[60px] lg:pt-[98px]">
          <div className="space-y-4 text-center">
            <motion.div {...appearAnimation} transition={{ duration: 0.5, delay: 0.5 }}>
              <h1 className="w-fit  font-semibold tracking-[0.96px] lg:tracking-[-2.1px]  lg:text-[70px] lg:leading-[84.01px]  hidden lg:inline-block">
                Create your own
              </h1>
              <h1 className="w-fit text-[32px]  font-semibold tracking-[0.96px] lg:tracking-[-2.1px] inline-block lg:hidden">
                Create your
              </h1>
            </motion.div>
            <motion.div
              initial="start"
              whileInView="end"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.75 }}
              variants={{
                start: { opacity: 0 },
                end: { opacity: 1 },
              }}
            >
              <h1 className="hidden lg:inline-block w-fit text-4xl font-semibold tracking-[0.96px] lg:tracking-[-2.1px]  lg:text-[70px] lg:leading-[84.01px] ">
                <span className="background-banner-home-highlight-text p-2  rounded-xl text-red-light">NFT</span> Dream
                Gallery
              </h1>
              <h1 className="w-fit text-[32px]  font-semibold tracking-[0.96px] lg:tracking-[-2.1px] inline-block lg:hidden">
                Own <span className="background-banner-home-highlight-text p-2  rounded-xl  text-red-light">NFT</span>{' '}
                Dream
              </h1>
            </motion.div>
            <motion.div
              initial="start"
              whileInView="end"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2.5 }}
              variants={{
                start: { opacity: 0 },
                end: { opacity: 1 },
              }}
            >
              <h1 className="w-fit text-[32px]  font-semibold tracking-[0.96px] lg:tracking-[-2.1px] inline-block lg:hidden">
                Gallery
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial="start"
            whileInView="end"
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 1 }}
            variants={{
              start: { opacity: 0 },
              end: { opacity: 1 },
            }}
            className="max-w-[269px] mt-[53px] text-[21px] leadig-[150%] font-[400] lg:max-w-[383px] font-Roboto text-center"
          >
            Get started with the easiest and most secure platform to buy and collect NFTs
          </motion.div>
        </div>
      </WrapperHero>
    </div>
  )
}

