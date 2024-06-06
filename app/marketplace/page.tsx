'use client'
import Footer from '@/components/footer'
import BannerMarketPlace from '@/components/marketplace/Banner'
import ComingSoon from '@/components/marketplace/ComingSoon'
import TabIndicator from '@/components/marketplace/TabIndicator'
import Activity from '@/components/marketplace/activity'
import Analytic from '@/components/marketplace/analytics'
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
import { useMemo } from 'react'

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
const isComingSoonMode = true

const Marketplace = () => {
  const dispatch = useAppDispatch()
  const params = useSearchParams()
  const router = useRouter()

  const tab = useMemo(() => {
    const tabQuery = params.get('tab')
    return tabs.find((t) => t.title.toLowerCase() === tabQuery?.toLowerCase())?.id || tabs[0].id
  }, [params])

  useQuery({
    queryKey: ['btcPrice'],
    queryFn: async () => {
      const result = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      if (result?.data?.bitcoin?.usd > 0) {
        dispatch(setBtnToUsdRateData(result?.data?.bitcoin?.usd))
      }
    },
  })

  const handleSetTab = (id: number) => {
    router.push(`?tab=${tabs[id - 1].title}`, {
      scroll: false,
    })
  }

  const renderContentByTab = useMemo(() => {
    switch (tab) {
      case 2:
        return <Analytic />
      case 3:
        return <Activity />
      default:
        return <ItemsFC />
    }
  }, [tab])

  return (
    <div className="w-full">
      <BannerMarketPlace />

      <div className="relative">
        <div className="relative z-10 mx-auto px-4 sm:py-10 lg:px-[60px] w-full  lg:max-w-[calc(1280px+120px)]">
          <div className="mx-auto flex w-full items-center gap-[10px] border-b border-bgAlt max-sm:my-4">
            {tabs.map((_tab, index) => {
              return (
                <TabIndicator
                  key={index}
                  isActive={_tab.id === tab}
                  icon={_tab.icon}
                  iconActive={_tab.icon_active}
                  onClick={() => handleSetTab(_tab.id)}
                >
                  {_tab.title}
                </TabIndicator>
              )
            })}
          </div>

          <div className="min-h-[800px] ">{renderContentByTab}</div>
        </div>
        {isComingSoonMode && <ComingSoon />}
      </div>
      <Footer />
    </div>
  )
}

export default Marketplace

