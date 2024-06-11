'use client'

import { appearAnimation } from '@/constants/animation.constant'
import { motion } from 'framer-motion'

export default function Banner() {
  return (
    <div id="banner" className="snap-center relative h-screen w-full ">
      <video className="absolute top-0 left-0 object-cover w-full h-full z-10" autoPlay={true} muted={true} loop={true}>
        <source src="/video/home-banner-video.mp4" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
      <div className="absolute top-0 w-full h-full z-20">
        <div className="relative mx-auto flex flex-1 pt-[72px] h-full max-w-container flex-col items-center justify-center text-white lg:items-center lg:justify-center lg:pr-[60px] lg:pt-[98px]">
          <div className="space-y-4 text-center">
            <motion.div {...appearAnimation} transition={{ duration: 0.5, delay: 0.5 }}>
              <h1 className="w-fit  font-semibold tracking-[0.96px] lg:tracking-[-2.1px]  lg:text-[70px] lg:leading-[84.01px]  hidden lg:inline-block">
                Create your own
              </h1>
              <h1 className="w-fit text-[32px] md:text-[50px] font-semibold tracking-[0.96px] lg:tracking-[-2.1px] inline-block lg:hidden">
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
              <h1 className="w-fit text-[32px] md:text-[50px] font-semibold tracking-[0.96px] lg:tracking-[-2.1px] inline-block lg:hidden">
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
              <h1 className="w-fit text-[32px] md:text-[50px] font-semibold tracking-[0.96px] lg:tracking-[-2.1px] inline-block lg:hidden">
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
            className="max-w-[80vw] mt-[53px] text-[16px] md:text-[18px] lg:text-[19px] leadig-[150%] font-[400] lg:max-w-[720px] font-Roboto text-center text-white"
          >
            Our Golden Apple BRC-20 NFT collection is more than just a digital asset. It represents the five elements of
            nature: Fire, Water, Wood, Metal, and Earth. Each NFT carries unique symbolism, which may bring fortune,
            wealth, and prosperity. Every NFT also serves as a golden ticket, offering a chance to win at least 1 BTC.
          </motion.div>
        </div>
      </div>
    </div>
  )
}

