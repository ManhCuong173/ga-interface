import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export const useLocaleInfo = () => {
  const [locale, setLocale] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    const fetch = async () => {
      let currentLocale = ''

      switch (pathname) {
        case '/':
          currentLocale = 'en'
          break
        case '/en':
          currentLocale = 'en'
          break
        case '/cn':
          currentLocale = 'cn'
          break
      }
      setLocale(currentLocale)
    }

    fetch()
  }, [pathname])

  return useMemo(() => ({ locale }), [locale])
}

