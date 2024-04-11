'use client'
import Footer from '@/components/footer'
import BannerMarketPlace from '@/components/marketplace/Banner'
import ComingSoon from '@/components/marketplace/ComingSoon'
import TabIndicator from '@/components/marketplace/TabIndicator'
import ActivityFC from '@/components/marketplace/activity'
import AnalyticsFC from '@/components/marketplace/analytics'
import ItemsFC from '@/components/marketplace/items'
import tab1_active from '@/images/marketplace/tab1-active.svg'
import tab1 from '@/images/marketplace/tab1.svg'
import tab2_active from '@/images/marketplace/tab2-active.svg'
import tab2 from '@/images/marketplace/tab2.svg'
import tab3_active from '@/images/marketplace/tab3-active.svg'
import tab3 from '@/images/marketplace/tab3.svg'
import { setBtnToUsdRateData } from '@/lib/features/wallet/fee-slice'
import { useAppDispatch } from '@/lib/hook'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'

const tabs = [
  {
    id: 1,
    icon: tab1,
    icon_active: tab1_active,
    title: 'items' || null,
  },
  {
    id: 2,
    icon: tab2,
    icon_active: tab2_active,
    title: 'analytics',
  },
  {
    id: 3,
    icon: tab3,
    icon_active: tab3_active,
    title: 'activity',
  },
]

const ENUM_TABS = {
  1: <ItemsFC />,
  2: <AnalyticsFC />,
  3: <ActivityFC />,
}

const Marketplace = () => {
  // Change this to show/hide aut
  const isComingSoonMode = true

  const dispatch = useAppDispatch()
  const router = useRouter()
  const param = useSearchParams().get('tab') || tabs[0].title

  const { data: btnToUsdRateData } = useQuery({
    queryKey: ['btcPrice'],
    queryFn: async () =>
      (
        await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
        )
      ).data.bitcoin.usd,
  })

  dispatch(setBtnToUsdRateData(btnToUsdRateData))

  const handleSetTab = (id: number) => {
    router.push(`?tab=${tabs[id - 1].title}`, {
      scroll: false,
    })
  }

  const handleRenderContent = useCallback(() => {
    const index = tabs.findIndex((item) => item.title === param)
    if (index === -1) return ENUM_TABS[1]
    return ENUM_TABS[(index + 1) as keyof typeof ENUM_TABS]
  }, [param])

  useEffect(() => {
    handleRenderContent()
  }, [param, handleRenderContent])

  return (
    <div className='w-full bg-[url(/images/marketplace/background-mg.png)] bg-fixed lg:bg-[url(/images/marketplace/background.png)] bg-cover bg-no-repeat'>
      <BannerMarketPlace />
      <div className='relative'>
        {isComingSoonMode && <ComingSoon />}
        <div className='relative z-10 mx-auto px-4 sm:py-10 lg:px-[60px]'>
          <div className='mx-auto flex w-full items-center gap-[10px] border-b border-[#D4C79C] max-sm:my-4 lg:max-w-[1440px]'>
            {tabs.map((tab, index) => {
              return (
                <TabIndicator
                  key={index}
                  isActive={tab.title === param}
                  icon={tab.icon}
                  iconActive={tab.icon_active}
                  onClick={() => {
                    handleSetTab(tab.id)
                  }}
                >
                  {tab.title}
                </TabIndicator>
              )
            })}
          </div>

          <div className='min-h-[800px] '>{handleRenderContent()}</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Marketplace
