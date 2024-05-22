import { useEffect, useRef, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    const delayFunc = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(delayFunc)
    }
  }, [value, delay])

  return debounceValue
}

export const useDebounceCallback = () => {
  const debounceRef = useRef<any>(null)

  const submit = (cb: (...prams: any[]) => void, debounceTime: number) => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      cb()
    }, debounceTime)
    return debounceRef.current
  }

  return submit
}

export default useDebounceCallback

