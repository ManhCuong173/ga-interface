const MobileBanner = () => {
  return (
    <div id="mobile-banner" className="snap-center relative h-screen w-full ">
      <video
        className="absolute top-0 left-0 object-cover w-full h-screen z-10"
        autoPlay={true}
        muted={true}
        loop={true}
        controls={false}
        playsInline={true}
      >
        <source src="/video/home-banner-mobile.mp4" type="video/mp4" className="hidden" />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
  )
}

export default MobileBanner

