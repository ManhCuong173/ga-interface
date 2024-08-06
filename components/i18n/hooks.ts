import { useTranslations } from 'next-intl'

export const useGATranslation = () => {
  const t = useTranslations('Content')
  return t
}
