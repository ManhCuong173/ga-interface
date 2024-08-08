import { ButtonImage } from '@/components/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { useGATranslation } from '@/components/i18n/hooks'
import { appearAnimation } from '@/constants/animation.constant'
import { useToggle } from '@/hooks/custom/useToggle'
import useDebounceCallback from '@/hooks/useDebounceCallback'
import ReplayVideoIcon from '@/icons/home/replay-icon.svg'
import SkipVideoIcon from '@/icons/home/skip-icon.svg'
import { motion } from 'framer-motion'
import WrapperHero from '../WrapperHero'

const MobileBanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPauseBannerVideo, toggle, setIsPauseBannerVideo] = useToggle(false)
  const t = useGATranslation()
  const debounceCb = useDebounceCallback()

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

  const handleReplayVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

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
    <div id="mobile-banner" className="snap-center relative h-screen w-full ">
      <div className={cn(isPauseBannerVideo ? 'opacity-0' : 'opacity-100')}>
        <video
          className="absolute top-0 left-0 object-cover w-full h-screen z-10"
          autoPlay={true}
          muted={true}
          loop={true}
          controls={false}
          playsInline={true}
          ref={videoRef}
        >
          <source src="/video/home-banner-mobile.mp4" type="video/mp4" className="hidden" />
          Sorry, your browser doesn't support embedded videos.
        </video>

        <div className={cn('absolute bottom-5 left-1/2 -translate-x-1/2 z-20')}>
          <div className="flex items-center justify-center gap-2">
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
                className="flex items-center justify-center bg-[rgba(0,0,0,0.40)] rounded-[1000px] backdrop-blur-[5px] w-[120px] h-[42px] border-none hover:bg-[#000] cursor-pointer"
              >
                <Image src={ReplayVideoIcon} width={20} height={20} alt="" />
                <p className="text-base font-medium leading-3/2 font-Roboto text-white ml-2">Replay</p>
              </ButtonImage>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          isPauseBannerVideo ? 'after:animate-gradientTopBottom opacity-100' : 'opacity-0',
          'after:absolute after:content-normal after:left-0 after:top-0 after:w-full after:h-full after:bg-white after:transition-all after:duration-300 overflow-hidden',
        )}
      >
        <WrapperHero src="/images/home/bg-home.svg">
          <div className="relative mx-auto flex flex-1 pt-[72px] h-full max-w-container flex-col items-center justify-center text-_white lg:items-center lg:justify-center lg:pr-[60px] lg:pt-[98px]">
            <div className="space-y-4 text-center">
              {t.rich('CreateYourOwnNFTGalleryMobile', {
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
                h1: (chunks) => (
                  <h1 className="w-fit text-[32px]  font-semibold tracking-[0.96px] lg:tracking-[-2.1px] inline-block lg:hidden">
                    {chunks}
                  </h1>
                ),
                span: (chunks) => <span className="bg-[#EF232C] p-2  rounded-xl">{chunks}</span>,
              })}
            </div>

            <div className="max-w-[269px] mt-[53px] text-[21px] leadig-[150%] font-[400] lg:max-w-[383px] font-Roboto text-center">
              {t.rich('Get started with the easiest and most secure platform to buy and collect NFTs', {
                br: () => <br />,
              })}
            </div>
          </div>
        </WrapperHero>
      </div>
    </div>
  )
}

export default MobileBanner

