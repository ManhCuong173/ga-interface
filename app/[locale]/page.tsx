'use client'

import Footer from '@/components/footer'
import Banner from '@/components/home/banner'
import CRM from '@/components/home/crm'
import Introduce from '@/components/home/introduce'
import LuckyDraw from '@/components/home/lucky-draw'
import NFTGallery from '@/components/home/nft-gallery'
import Slogan from '@/components/home/slogan'
import { REFERRAL_KEY } from '@/constants/auth.constant'
import { selectActiveSection } from '@/lib/features/home-section/home-section-slice'
import { useAppSelector } from '@/lib/hook'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const active = useAppSelector(selectActiveSection)
  const isSnapMode = ['banner', 'section-nft-gallery', 'section-lucky-draw'].includes(active)

  const router = useRouter()
  const searchParams = useSearchParams()
  const refCode = searchParams.get(REFERRAL_KEY)

  useEffect(() => {
    if (!refCode || typeof window === 'undefined') return
    localStorage.setItem(REFERRAL_KEY, refCode)
    window.history.replaceState({}, '', window.location.pathname)
  }, [refCode])

  return (
    <>
      <div id="background" className="fixed inset-x-0 top-0 aspect-[414/2000] w-full lg:aspect-[1442/2440]" />
      <div
        id="root-div"
        className={cn(
          'relative z-10 h-screen max-h-screen w-full overflow-y-auto overflow-x-hidden',
          isSnapMode ? 'snap-y snap-mandatory' : '',
        )}
      >
        <Banner />
        <Introduce />
        <NFTGallery />
        <LuckyDraw />
        <CRM />
        <Slogan />
        <Footer />
      </div>
    </>
  )
}

