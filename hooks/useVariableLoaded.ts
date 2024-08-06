/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react'

export function useVariableLoaded<S>(selector: () => S, dependencies = []) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded) return

    const interval = setInterval(() => {
      const instance = selector()

      if (instance) {
        setIsLoaded(true)
      }
    }, 50)

    if (interval) {
      setTimeout(() => {
        clearInterval(interval)
      }, 120000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isLoaded, ...dependencies])

  return useMemo(() => selector(), [isLoaded])
}

