'use client'

import { useRef } from 'react'

export default function DesktopBanner() {
  const videoRef = useRef(null)

  // const handleSkipVideo = (seconds) => {

  // }

  return (
    <div id="banner" className="snap-center relative h-screen w-full ">
      <video
        className="absolute top-0 left-0 object-cover w-full h-full z-10"
        autoPlay={true}
        muted={true}
        loop={true}
        controls={false}
      >
        <source src="/video/home-banner-video.mp4" type="video/mp4" className="hidden" />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
  )
}

