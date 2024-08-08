import { useMediaQuery } from '@/hooks/custom/useMediaQuery'
import { useVariableLoaded } from '@/hooks/useVariableLoaded'
import { MutableRefObject, useRef } from 'react'

const desktopMediaSource = '/video/home-banner-video.mp4'
const mobileMediaSource = '/video/home-banner-mobile.mp4'

export const useInitVideoBackgroundRef = (): MutableRefObject<HTMLVideoElement> | null => {
  const videoRef = useRef<any>(null)
  const isTabletAndDesktop = useMediaQuery('(min-width: 640px)')
  useVariableLoaded(() => {
    if (window) {
      const videoInstance = window.document.createElement('video')
      videoInstance.src = isTabletAndDesktop ? desktopMediaSource : mobileMediaSource
      videoRef.current = videoInstance
    }
  })

  return videoRef
}

