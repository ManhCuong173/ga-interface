import { useCallback, useEffect, useMemo, useState } from 'react'

type DeviceType = {
  os: 'ios' | 'android' | 'unknown'
  isSupportTouch: boolean
}

const REGEX_SET = {
  isAndroid: /android/i,
  isIOS: /iPad|iPhone|iPod/,
}

const useDetectDeviceInfo: () => DeviceType = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceType>({ os: 'unknown', isSupportTouch: false })

  const checkTouchSupport = useCallback(() => {
    return window && navigator
      ? 'ontouchstart' in window || navigator.maxTouchPoints > 0 || (navigator as any)?.msMaxTouchPoints > 0
      : false
  }, [])

  const getOS = () => {
    const { isAndroid, isIOS } = REGEX_SET
    const userAgent = navigator?.userAgent || navigator?.vendor || (window as any)?.opera
    return isAndroid.test(userAgent) ? 'android' : isIOS.test(userAgent) ? 'ios' : 'unknown'
  }

  useEffect(() => {
    const deviceOs = getOS()
    setDeviceInfo({
      os: deviceOs,
      isSupportTouch: checkTouchSupport(),
    })
  }, [])

  return useMemo(() => deviceInfo, [deviceInfo])
}

export default useDetectDeviceInfo

