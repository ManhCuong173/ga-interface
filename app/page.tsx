'use client'

import Footer from '@/components/footer'
import Banner from '@/components/home/banner'
import CRM from '@/components/home/crm'
import Introduce from '@/components/home/introduce'
import LuckyDraw from '@/components/home/lucky-draw'
import NFTGallery from '@/components/home/nft-gallery'
import Slogan from '@/components/home/slogan'
import Sidebar from '@/components/sidebar'
import { selectActiveSection } from '@/lib/features/home-section/home-section-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { cn } from '@/lib/utils'

export default function Home() {
  const active = useAppSelector(selectActiveSection)
  const dispatch = useAppDispatch()

  const isSnapMode = ['banner', 'section-nft-gallery', 'section-lucky-draw'].includes(active)

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
        <Sidebar />
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

