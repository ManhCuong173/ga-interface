import { useEffect, useState } from 'react'
import useDebounceCallback from '../useDebounceCallback'
import { useToggle } from './useToggle'

type UseMediaQueryOptions<T extends boolean> = {
  defaultValue?: boolean
  initializeWithValue?: boolean
  returnedState?: T
}

const IS_SERVER = typeof window === 'undefined'

export function useMediaQuery<T extends boolean>(
  query: string,
  { defaultValue = false, initializeWithValue = true, returnedState }: UseMediaQueryOptions<T> = {},
): T extends true ? { isMatchMedia: boolean; isLoading: boolean } : boolean {
  const [isLoadingQuery, toggleLoading] = useToggle(true)
  const debounceCallback = useDebounceCallback()

  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  // Handles the change event of the media query
  const handleChange = () => {
    setMatches(getMatches(query))
    debounceCallback(() => {
      toggleLoading()
    }, 50)
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query)

    // Trigger at first client-side load and if query changes
    handleChange()

    // Use deprecated `addListener` and `removeListener` to support Safari < 14
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange)
    } else {
      matchMedia.addEventListener('change', handleChange)
    }

    // Cleanup on component unmount
    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange)
      } else {
        matchMedia.removeEventListener('change', handleChange)
      }
    }
  }, [query])

  if (returnedState) {
    return {
      isMatchMedia: matches,
      isLoading: isLoadingQuery,
    } as T extends true ? { isMatchMedia: boolean; isLoading: boolean } : never
  }

  return matches as T extends true ? never : boolean
}

