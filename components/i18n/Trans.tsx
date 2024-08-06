import { useTranslations } from 'next-intl'

const Trans = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations('Content')
  return <> {t(children)}</>
}

export default Trans

