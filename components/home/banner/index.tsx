import DesktopBanner from './desktop-banner'
import MobileBanner from './mobile.banner'

const HomeBanner = () => {
  return (
    <div className="h-screen w-full">
      <div className="hidden lg:block">
        <DesktopBanner />
      </div>
      <div className="block lg:hidden">
        <MobileBanner />
      </div>
    </div>
  )
}

export default HomeBanner

