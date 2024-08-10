import { useMediaQuery } from '@/hooks/custom/useMediaQuery'
import DesktopBanner from './DesktopBanner'
import MobileBanner from './MobileBanner'

const HomeBanner = () => {
  const { isMatchMedia, isLoading } = useMediaQuery('(min-width: 536px)', { returnedState: true })

  return (
    <div className="h-screen w-full">
      {isMatchMedia && !isLoading && <DesktopBanner />}
      {!isMatchMedia && !isLoading && <MobileBanner />}
    </div>
  )
}

export default HomeBanner

