import { useRef } from 'react'

const useDebounceCallback = () => {
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

