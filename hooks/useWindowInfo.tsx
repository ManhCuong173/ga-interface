import { useEffect, useMemo, useState } from 'react'

export const useWindowInfo = () => {
  const [gaWindow, setGaWindow] = useState<Window>()

  useEffect(() => {
    if (window) {
      setGaWindow(window)
    }
  }, [])

  return useMemo(() => gaWindow, [gaWindow])
}

