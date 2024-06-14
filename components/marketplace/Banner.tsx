'use client'

import { appearAnimation } from '@/constants/animation.constant'
import { motion } from 'framer-motion'
import { ButtonImage } from '../button'
import Counter from '../counter'
import WrapperHero from '../home/WrapperHero'
import Trans from '../i18n/Trans'

const CardInfo: React.FC<{ amount: string; title: string }> = ({ amount, title }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="leading-tight text-[3.6vw] sm:text-[30px] secondary font-medium">
        <Trans>{amount}</Trans>
      </div>
      <div className="leading-tight text-[2.6vw] sm:text-lg secondary font-normal font-Roboto text-nowrap">
        <Trans>{title}</Trans>
      </div>
    </div>
  )
}

const BannerMarketPlace = () => {
  return (
    <div id="banner" className="snap-center">
      <WrapperHero src="/images/home/bg-marketplace.svg">
        <div className="relative mx-auto flex flex-1 h-full max-w-[100vw] overflow-hidden">
          <div className="flex flex-1 items-center justify-center px-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0.7, scale: 0.7 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: false,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            >
              <div className="bg-secondary relative border-[1.852px] lg:backdrop-blur-[5px] lg:max-w-[650px] w-full p-6 ">
                <div className="flex flex-col flex-1 border-[2.8px] border-bgAlt py-11  w-full">
                  <div className="flex flex-col px-2 md:px-10  lg:px-11">
                    <motion.div
                      {...appearAnimation}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <span className="text-2xl lg:text-[45px] leading-tight tracking-[-1.35px] font-bold text-red-light text-center ">
                        <Trans>{'DISCOVER, COLLECT, AND TRADE RARE NFTS'}</Trans>
                      </span>
                    </motion.div>
                  </div>

                  <div className="flex flex-col pt-8 pb-12 px-2 lg:px-2 max-w-[460px] mx-auto">
                    <motion.div
                      {...appearAnimation}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <span className="text-sm font-Roboto font-normal text-black1 lg:text-base text-center leading-3/2">
                        Search for the NFT art that resonates with you
                      </span>
                    </motion.div>
                    <motion.div
                      {...appearAnimation}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <span className="text-sm font-Roboto font-normal text-black1 lg:text-base text-center leading-3/2">
                        Gather the NFTs that match your style
                      </span>
                    </motion.div>
                    <motion.div
                      {...appearAnimation}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <span className="text-sm font-Roboto font-normal text-black1 lg:text-base text-center leading-3/2">
                        Trade NFTs effortlessly and securely in our marketplace
                      </span>
                    </motion.div>
                  </div>

                  <div className="min-h-[8vw]  md:hidden" />

                  <ButtonImage
                    varirant="primary-asset"
                    className="mx-auto scale-150 md:scale-100  -translate-x-1/2  md:translate-x-0 absolute md:relative bottom-[12%] md:bottom-0 left-1/2 md:left-0 w-max md:w-full md:max-w-[480px] min-h-[13vw] md:min-h-[105px] font-medium text-secondary grid grid-cols-3 gap-2 md:gap-6 px-4 md:px-10"
                  >
                    {/* <CardInfo amount="100K+" title="Artworks" /> */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="leading-tight text-[3.6vw] sm:text-[30px] secondary font-medium">
                        <Counter value={100} />
                        K+
                      </div>
                      <div className="leading-tight text-[2.6vw] sm:text-lg secondary font-normal font-Roboto">
                        <Trans>{'Artworks'}</Trans>
                      </div>
                    </div>
                    <CardInfo amount="Auction" title="IsComingSoon" />
                    <div className="flex flex-col items-center justify-center">
                      <div className="leading-tight text-[3.6vw] sm:text-[30px] secondary font-medium">
                        <Counter value={2} />
                        K+
                      </div>
                      <div className="leading-tight text-[2.6vw] sm:text-lg secondary font-normal font-Roboto">
                        <Trans>{'Creators'}</Trans>
                      </div>
                    </div>
                  </ButtonImage>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </WrapperHero>
    </div>
  )
}
export default BannerMarketPlace

