import { useLocaleInfo } from '@/hooks/useLocaleInfo'
import chevronDownBlackIcon from '@/icons/header/chevron-down-sm-black.svg'
import chevronDownIcon from '@/icons/header/chevron-down-sm.svg'
import earthBlackIcon from '@/icons/header/earth-black.svg'
import earthIcon from '@/icons/header/earth.svg'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from '@/navigation'
import { Language } from '@/types/language'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Props = {
  mode: 'transparent' | 'solid'
  className?: string
}

const LanguageSelect = ({ mode, className }: Props) => {
  const [show, setShow] = useState(false)
  const { locale } = useLocaleInfo()
  const [language, setLanguage] = useState<Language>(locale as unknown as Language)

  const selfRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const handleChangeLanguge = (lang: Language) => {
    // TODO: add logic to change language here
    setLanguage(lang)
    setShow(false)
    router.replace(pathname, { locale: lang })
  }

  useEffect(() => {
    setLanguage(locale as unknown as Language)
  }, [locale])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selfRef.current &&
        !selfRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'relative flex h-10 cursor-pointer items-center justify-center gap-2.5 px-2.5 text-base font-medium',
          mode === 'transparent' ? 'text-_white' : '',
        )}
        onClick={() => setShow((prev) => !prev)}
        ref={selfRef}
      >
        <span className="relative size-6">
          <Image
            src={earthIcon}
            alt=""
            className={`${mode === 'transparent' ? 'opacity-100' : 'opacity-0'} absolute inset-0 transition-all`}
          />
          <Image
            src={earthBlackIcon}
            alt=""
            className={cn('absolute inset-0 transition-all', mode === 'transparent' ? 'opacity-0' : 'opacity-100')}
          />
        </span>
        <span className="whitespace-nowrap">{language === 'en' ? 'English' : '中国人'}</span>
        <span className="relative size-6">
          <Image
            src={chevronDownIcon}
            alt=""
            className={`${mode === 'transparent' ? 'opacity-100' : 'opacity-0'} absolute inset-0 m-auto transition-all`}
          />
          <Image
            src={chevronDownBlackIcon}
            alt=""
            className={`${mode === 'transparent' ? 'opacity-0' : 'opacity-100'} absolute inset-0 m-auto transition-all`}
          />
        </span>
      </div>
      <div
        className={cn(
          'absolute inset-x-0 top-full mt-2 origin-top overflow-hidden rounded-lg border border-text-black_3 text-black1 transition-all duration-300',
          show ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-50',
        )}
        style={{
          boxShadow: '3px 6px 30px 0px rgba(0, 0, 0, 0.12)',
        }}
        ref={dropdownRef}
      >
        <div
          className="flex h-11 cursor-pointer items-center justify-start gap-4 bg-white px-4 hover:bg-[#FAF5F0]"
          onClick={() => {
            handleChangeLanguge('en')
          }}
        >
          <span className="text-sm font-light leading-5 tracking-[-0.42px]">English</span>
        </div>
        <div
          className="flex h-11 cursor-pointer items-center justify-start gap-4 bg-white px-4 hover:bg-[#FAF5F0]"
          onClick={() => {
            handleChangeLanguge('cn')
          }}
        >
          <span className="text-sm font-light leading-5 tracking-[-0.42px]">中文</span>
        </div>
      </div>
    </div>
  )
}
export default LanguageSelect

