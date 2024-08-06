import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export const useLocaleInfo = () => {
  const [locale, setLocale] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    const fetch = async () => {
      if (pathname.includes('en')) setLocale('en')
      else if (pathname.includes('cn')) setLocale('cn')
    }

    fetch()
  }, [pathname])

  return useMemo(() => ({ locale }), [locale])
}

