'use client'

export default function DesktopBanner() {
  return (
    <div id="banner" className="snap-center relative h-screen w-full ">
      <video className="absolute top-0 left-0 object-cover w-full h-full z-10" autoPlay={true} muted={true} loop={true}>
        <source src="/video/home-banner-video.mp4" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
  )
}

