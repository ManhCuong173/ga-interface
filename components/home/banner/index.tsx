import { useMediaQuery } from '@/hooks/custom/useMediaQuery'
import DesktopBanner from './desktop-banner'
import MobileBanner from './mobile.banner'

const HomeBanner = () => {
  const isTablet = useMediaQuery('(min-width: 640px)')
  return (
    <div>
      {isTablet && <DesktopBanner />}
      {!isTablet && <MobileBanner />}
    </div>
  )
}

export default HomeBanner

