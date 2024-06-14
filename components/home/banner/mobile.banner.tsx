import { appearAnimation } from '@/constants/animation.constant'
import { motion } from 'framer-motion'
import WrapperHero from '../WrapperHero'

const MobileBanner = () => {
  return (
    <div id="banner" className="snap-center relative h-screen w-full ">
      <WrapperHero className="min-h-screen" src="/images/home/home-banner-mobile.svg">
        <div className="absolute top-0 w-full h-full z-20">
          <div className="relative mx-auto flex flex-1 pt-[72px] h-full max-w-container flex-col items-center justify-center text-white lg:items-center lg:justify-center">
            <div className="space-y-4 text-center">
              <motion.div {...appearAnimation} transition={{ duration: 0.5, delay: 0.5 }}>
                <h1 className="w-fit text-[32px] md:text-[50px] font-semibold tracking-[0.96px]  inline-block lg:hidden">
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
                <h1 className="hidden w-fit text-4xl font-semibold tracking-[0.96px]">
                  <span className="background-banner-home-highlight-text p-2  rounded-xl text-red-light">NFT</span>{' '}
                  Dream Gallery
                </h1>
                <h1 className="w-fit text-[32px] font-semibold tracking-[0.96px] inline-block">
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
                <h1 className="w-fit text-[32px] font-semibold tracking-[0.96px] inline-block">Gallery</h1>
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
              className="max-w-[80vw] mt-[53px] text-[16px]  leadig-[150%] font-[400]  font-Roboto text-center text-white"
            >
              Our Golden Apple BRC-20 NFT collection is more than just a digital asset. It represents the five elements
              of nature: Fire, Water, Wood, Metal, and Earth. Each NFT carries unique symbolism, which may bring
              fortune, wealth, and prosperity. Every NFT also serves as a golden ticket, offering a chance to win at
              least 1 BTC.
            </motion.div>
          </div>
        </div>
      </WrapperHero>
    </div>
  )
}

export default MobileBanner

