'use client'

import { ButtonImage } from '@/components/button'
import { appearAnimation } from '@/constants/animation.constant'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import WrapperHero from '../WrapperHero'

import { useGATranslation } from '@/components/i18n/hooks'
import useDebounceCallback from '@/hooks/useDebounceCallback'
import ReplayVideoIcon from '@/icons/home/replay-icon.svg'
import SkipVideoIcon from '@/icons/home/skip-icon.svg'
import Image from 'next/image'

export default function DesktopBanner() {
  const [isPauseBannerVideo, setIsPauseBannerVideo] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const t = useGATranslation()
  const debounceCb = useDebounceCallback()

  const handleReplayVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause()
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

  useEffect(() => {
    debounceCb(() => {
      ;(videoRef.current as any).muted = false
    }, 10)
  }, [])

  useEffect(() => {
    return () => {
      videoRef.current?.pause()
    }
  }, [])

  return (
    <div id="banner" className="snap-center relative h-screen w-full ">
      <div className={cn(isPauseBannerVideo ? 'opacity-0' : 'opacity-1')}>
        <video
          className="absolute top-0 left-0 object-cover w-full h-full z-10"
          autoPlay={true}
          loop={true}
          controls={false}
          ref={videoRef}
          muted={true}
        >
          <source src="/video/home-banner-video.mp4" type="video/mp4" className="hidden" />
          Sorry, your browser doesn't support embedded videos.
        </video>
        <div className={cn('absolute bottom-5 right-5 z-20')}>
          <div className="flex items-center justify-center gap-2">
            <ButtonImage
              varirant="outline"
              onClick={() => {
                setIsPauseBannerVideo(true)
                videoRef.current?.pause()
              }}
              className="flex items-center justify-center bg-[rgba(0,0,0,0.40)] rounded-[1000px] backdrop-blur-[5px] w-[120px] h-[42px] border-none hover:bg-[#000] cursor-pointer"
            >
              <Image src={SkipVideoIcon} width={20} height={20} alt="" />
              <p className="text-base font-medium leading-3/2 font-Roboto text-white ml-2">Skip</p>
            </ButtonImage>
            <ButtonImage
              varirant="outline"
              onClick={handleReplayVideo}
              className="replay-button flex items-center justify-center bg-[rgba(0,0,0,0.40)] rounded-[1000px] backdrop-blur-[5px] w-[120px] h-[42px] border-none hover:bg-[#000] cursor-pointer"
            >
              <Image src={ReplayVideoIcon} width={20} height={20} alt="" />
              <p className="text-base font-medium leading-3/2 font-Roboto text-white ml-2">Replay</p>
            </ButtonImage>
          </div>
        </div>
      </div>

      <div
        style={{ opacity: isPauseBannerVideo ? '1' : '0' }}
        className={cn(
          isPauseBannerVideo ? 'after:animate-gradientTopBottom' : '',
          'after:absolute after:content-normal after:left-0 after:top-0 after:w-full after:h-full after:bg-white after:transition-all after:duration-300 overflow-hidden',
        )}
      >
        <WrapperHero src="/images/home/bg-home.svg">
          <div className="relative mx-auto flex flex-1 pt-[72px] h-full max-w-container flex-col items-center justify-center text-_white lg:items-center lg:justify-center lg:pr-[60px] lg:pt-[98px]">
            <div className="space-y-4 text-center">
              {t.rich('CreateYourOwnNFTGalleryDesktop', {
                animation1: (chunks) => (
                  <motion.div {...appearAnimation} transition={{ duration: 0.5, delay: 0.5 }}>
                    {chunks}
                  </motion.div>
                ),
                animation2: (chunks) => (
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
                    {chunks}
                  </motion.div>
                ),
                h1_line1: (chunks) => (
                  <h1 className="w-fit  font-semibold tracking-[0.96px] lg:tracking-[-2.1px]  lg:text-[70px] lg:leading-[84.01px]  hidden lg:inline-block">
                    {chunks}
                  </h1>
                ),
                h1_line2: (chunks) => (
                  <h1 className="hidden lg:inline-block w-fit text-4xl font-semibold tracking-[0.96px] lg:tracking-[-2.1px]  lg:text-[70px] lg:leading-[84.01px] ">
                    {chunks}
                  </h1>
                ),
                span: (chunks) => <span className="bg-[#EF232C] p-2  rounded-xl">{chunks}</span>,
              })}
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
              className="mt-[53px] text-[21px] leadig-[150%] font-[400] font-Roboto text-center text-nowrap"
            >
              {t.rich('Get started with the easiest and most secure platform to buy and collect NFTs', {
                br: () => <br className="hidden" />,
              })}
            </motion.div>
          </div>
        </WrapperHero>
      </div>
    </div>
  )
}

