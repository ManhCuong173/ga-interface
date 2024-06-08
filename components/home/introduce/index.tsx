import { ButtonImage } from '@/components/button'
import Counter from '@/components/counter'
import { appearAnimation } from '@/constants/animation.constant'
import { urlRoute } from '@/constants/routes'
import ArtWorkIcon from '@/icons/home/artwork.svg'
import Auction from '@/icons/home/auction.svg'
import CreatorIcon from '@/icons/home/creator.svg'
import NFTIconMobile from '@/icons/home/home-introduce-nft-mobile.svg'
import NFTIcon from '@/icons/home/home-introduce-nft.svg'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import WrapperHero from '../WrapperHero'

export default function Introduce() {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-120px' })
  const [isDisplay, setIsDisplay] = useState(false)

  useEffect(() => {
    if (isInView && !isDisplay) {
      setIsDisplay(true)
    }
  }, [isInView])

  return (
    <div id="section-introduce" className="snap-start" ref={ref}>
      <div className="mx-auto flex flex-col lg:flex-row  max-w-full items-center pt-[50px] lg:pt-0  bg-secondary relative">
        <div className="flex w-full justify-center items-center lg:w-[62%] order-2 lg:order-1 mt-[60px] lg:mt-0 z-10">
          <div className="justify-center flex flex-col items-center lg:items-start p-5 lg:max-w-[400px] w-full lg:w-fit">
            <div className="flex items-center">
              <Image
                src="/images/commons/app-logo.png"
                className="w-[51px] h-[51px] lg:w-[78px] lg:h-[78px]"
                width={78}
                height={78}
                alt=""
              />

              <div className="color-[#4E473F] ml-[16px] text-[20px] lg:text-3xl lg:ml-[22px]">GOLDEN APPLE</div>
            </div>
            <div
              className="
              max-w-[308px] w-full mt-[39px] text-center
              lg:max-w-unset lg:mt-[50px] text-black1 lg:font-Roboto lg:text-base lg:font-[400] lg:text-left lg:w-[400px]
              font-Roboto lg:max-w-unset
              "
            >
              Golden Apple is the GameFi platform for the Bitcoin Ecosystem. Through mapping the Bitcoin Assets (BRC20,
              Ordinals NFT and others) to Ethereum (and other Layer2) networks.
            </div>

            <Link href={urlRoute.inscribe}>
              <ButtonImage
                varirant="primary-asset"
                className="text-lg font-medium text-red-light w-64 h-14 mt-10 lg:mt-[50px] p-0 cursor:pointer"
              >
                <div className="text-white font-Roboto text-base font-medium leading-[150%]">Mint NFT Now</div>
              </ButtonImage>
            </Link>
          </div>
        </div>

        <div className="lg:order-2 flex-grow hidden lg:block">
          <motion.div
            className="relative"
            initial={'start'}
            whileInView={isDisplay ? 'end' : ''}
            transition={{ delay: 0.3, duration: 0.3 }}
            viewport={{
              once: true,
            }}
            variants={{
              start: {
                right: '-100%',
                opacity: 0,
              },
              end: {
                right: '0',
                opacity: 1,
              },
            }}
          >
            <WrapperHero src="/images/home/background-introduce.svg" />
          </motion.div>
        </div>

        <motion.div
          initial={'start'}
          whileInView={'end'}
          transition={{ delay: 0.85, duration: 0.5 }}
          viewport={{
            once: true,
          }}
          variants={{
            start: {
              left: '100%',
              opacity: 0.35,
            },
            end: {
              left: '50%',
              opacity: 1,
            },
          }}
          className="
          z-10
          static lg:absolute lg:top-1/2 lg:-translate-y-1/2 
          lg:left-[50%] w-[275px] h-[296px] lg:w-[36%] 
          lg:h-auto aspect-[514/552] rounded-[30px] lg:rounded-[33px] 
           order-1 "
        >
          <div
            className="p-[8px] w-full h-full bg-[rgba(255,255,255,0.70)] backdrop-blur-[10px] relative rounded-[30px] lg:rounded-[40px] lg:p-4
          border-[#D4C79C] border-[1px]
          "
          >
            <div className="bg-[url(/images/home/bg-introduce-desktop-banner-bg.png)] w-full h-full bg-center bg-cover rounded-[30px] lg:rounded-[35px]" />
            <div className="absolute left-1/2 top-[calc(50%_-_15px)] -translate-x-1/2 -translate-y-1/2 w-[193px] h-[180px] lg:w-[369px] lg:h-[343px] flex items-center justify-center">
              <Image src={NFTIcon} className="hidden lg:block" alt="" />
              <Image src={NFTIconMobile} className="lg:hidden block" alt="" />
            </div>
            <motion.div
              {...appearAnimation}
              transition={{ duration: 0.3, delay: 1.2 }}
              className="absolute py-[3px] pl-[6px] pr-[19px] bg-white rounded-[200px] flex justify-center items-center  
                h-fit w-fit top-[9%] left-[-11%] lg:max-h-unset lg:left-[-19%] 
                lg:w-[243px] lg:h-[82px] shadow-[3px_6px_30px_0px_rgba(0, 0, 0, 0.24)]
                lg:pl-[12px] lg:pr-[29px] lg:py-[9px]
              "
            >
              <Image src={ArtWorkIcon} className="w-[38px] lg:w-[58px] h-[38px] lg:h-[58px]" alt="" />
              <div
                className="flex flex-col font-Roboto ml-[21px] 
                lg:ml-[51px]"
              >
                <div
                  className="
                text-black1 text-[21px] lg:text-[32px] 
                  font-medium leading-[110%] lg:leading-[120%] tracking-[-0.25px]
                  flex items-center justify-center
                  "
                >
                  <Counter value={110} />K <span className="relative">+</span>
                </div>
                <div className="text-xs lg:text-[18px] leading-[110%] lg:leading-[110%]">Artworks</div>
              </div>
            </motion.div>

            <motion.div
              {...appearAnimation}
              transition={{ duration: 0.3, delay: 1.2 }}
              className="absolute py-[4px] pl-[12px] pr-[19px] bg-white rounded-[200px] flex justify-center items-center  
               w-[129px] h-[50px] top-[61%] lg:left-[81%] sm:right-[-23%] right-[-6%]
               lg:max-h-unset 
               lg:h-[82px] lg:w-[216px] shadow-[3px_6px_30px_0px_rgba(0, 0, 0, 0.24)]
               pl-[22px] pr-[6px]
               lg:pl-[38px] lg:pr-[12px] lg:py-[11px]
             "
            >
              <div
                className="flex flex-col font-Roboto 
                mr-[17px]
                lg:mr-[29px]"
              >
                <div
                  className="
                text-black1 text-[21px] lg:text-[32px] 
                  font-medium leading-[110%] lg:leading-[110%] tracking-[-0.25px]
                  "
                >
                  <Counter value={2} />K <span className="relative left-[-2px]">+</span>
                </div>
                <div className="text-xs lg:text-[18px] leading-[110%] lg:leading-[110%]">Creators</div>
              </div>
              <Image src={CreatorIcon} className="w-[38px] lg:w-[58px] h-[38px] lg:h-[58px]" alt="" />
            </motion.div>

            <motion.div
              {...appearAnimation}
              transition={{ duration: 0.3, delay: 1.2 }}
              className="
              absolute 
              lg:py-[9px] lg:pl-[12px] lg:pr-[29px] py-[5px] pl-[5px] pr-[15px]
              bg-white rounded-[200px]
              flex justify-center items-center  
              top-[94%] left-[8%] 
              lg:w-[213px] lg:h-[62px]
              shadow-[3px_6px_30px_0px_rgba(0, 0, 0, 0.24)]
             "
            >
              <Image src={Auction} className="w-[38px] lg:w-[46px] h-[38px] lg:h-[46px]" alt="" />
              <div className="flex flex-col font-Roboto ml-[8px] lg:ml-[28px]">
                <div
                  className="  text-black1 text-[21px] lg:text-[24px] 
                  font-medium leading-[110%] lg:leading-[110%] tracking-[-0.25px]"
                >
                  Auction
                </div>
                <div className="text-xs lg:text-[14px] leading-[100%] lg:leading-[130%]">is coming soon</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

