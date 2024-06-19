import { ButtonImage } from '@/components/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRef } from 'react'

import ReplayVideoIcon from '@/icons/home/replay-icon.svg'
import SkipVideoIcon from '@/icons/home/skip-icon.svg'

const MobileBanner = () => {
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

  return (
    <div id="mobile-banner" className="snap-center relative h-screen w-full ">
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
      </div>
    </div>
  )
}

export default MobileBanner

