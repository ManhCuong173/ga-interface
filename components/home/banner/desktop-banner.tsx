'use client'

import { ButtonImage } from '@/components/button'
import { appearAnimation } from '@/constants/animation.constant'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import WrapperHero from '../WrapperHero'

import ReplayVideoIcon from '@/icons/home/replay-icon.svg'
import SkipVideoIcon from '@/icons/home/skip-icon.svg'
import Image from 'next/image'

export default function DesktopBanner() {
  const [isPauseBannerVideo, setIsPauseBannerVideo] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleSkipVideo = () => {
    if (videoRef.current) videoRef.current.currentTime += 3
  }

  const handleReplayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  useEffect(() => {
    const rootDiv = document.getElementById('root-div')

    if (rootDiv) {
      const handleScroll = () => {
        if (rootDiv.scrollTop > 0) {
          setIsPauseBannerVideo(true)
          ;(videoRef.current as any).pause()
        } else {
          setIsPauseBannerVideo(false)
          ;(videoRef.current as any).play()
        }
      }

      rootDiv.addEventListener('scroll', handleScroll)
      return () => {
        rootDiv.removeEventListener('scroll', handleScroll)
      }
    }
  }, [videoRef])

  return (
    <div id="banner" className="snap-center relative h-screen w-full ">
      <video
        className="absolute top-0 left-0 object-cover w-full h-full z-10"
        autoPlay={true}
        muted={true}
        loop={true}
        controls={false}
        ref={videoRef}
        style={{
          display: isPauseBannerVideo ? 'none' : 'block',
        }}
      >
        <source src="/video/home-banner-video.mp4" type="video/mp4" className="hidden" />
        Sorry, your browser doesn't support embedded videos.
      </video>
      <div className={cn(isPauseBannerVideo ? 'hidden' : 'block', 'absolute bottom-5 right-5 z-20')}>
        <div className="flex items-center justify-center gap-2">
          <ButtonImage
            varirant="outline"
            onClick={handleSkipVideo}
            className="flex items-center justify-center bg-[rgba(0,0,0,0.40)] rounded-[1000px] backdrop-blur-[5px] w-[120px] h-[42px] border-none hover:bg-[#000] cursor-pointer"
          >
            <Image src={SkipVideoIcon} width={20} height={20} alt="" />
            <p className="text-base font-medium leading-3/2 font-Roboto text-white ml-2">Skip</p>
          </ButtonImage>
          <ButtonImage
            varirant="outline"
            onClick={handleReplayVideo}
            className="flex items-center justify-center bg-[rgba(0,0,0,0.40)] rounded-[1000px] backdrop-blur-[5px] w-[120px] h-[42px] border-none hover:bg-[#000] cursor-pointer"
          >
            <Image src={ReplayVideoIcon} width={20} height={20} alt="" />
            <p className="text-base font-medium leading-3/2 font-Roboto text-white ml-2">Replay</p>
          </ButtonImage>
        </div>
      </div>

      <div style={{ opacity: isPauseBannerVideo ? '1' : '0' }} className="animate-fadeOut transition-all duration-300">
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
                  <span className="bg-[#EF232C] p-2  rounded-xl">NFT</span> Dream Gallery
                </h1>
                <h1 className="w-fit text-[32px]  font-semibold tracking-[0.96px] lg:tracking-[-2.1px] inline-block lg:hidden">
                  Own <span className="bg-[#EF232C] p-2  rounded-xl">NFT</span> Dream
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
    </div>
  )
}

