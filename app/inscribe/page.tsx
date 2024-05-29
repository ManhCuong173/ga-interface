'use client'
import Footer from '@/components/footer'
import Inscribe from '@/components/inscribe'
import Introduce from '@/components/inscribe/introduce'
import MyOrders from '@/components/orders'
import { setBtnToUsdRateData } from '@/lib/features/wallet/fee-slice'
import { selectMintProcess } from '@/lib/features/wallet/mintProcess'
import { useAppDispatch } from '@/lib/hook'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MutableRefObject, Suspense, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const InscribePage = () => {
  const ref: MutableRefObject<any> = useRef()
  const mintProcessStep = useSelector(selectMintProcess)

  const dispatch = useAppDispatch()

  useQuery({
    queryKey: ['btcPrice'],
    queryFn: async () => {
      const result = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      if (result?.data?.bitcoin?.usd > 0) {
        dispatch(setBtnToUsdRateData(result?.data?.bitcoin?.usd))
      }
    },
  })

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [mintProcessStep])

  return (
    <Suspense>
      <div ref={ref} className="relative pb-[170px] pt-[72px] sm:pt-[66px]">
        <div className="relative z-10">
          <Introduce />
          <div className="mx-auto lg:max-w-[1380px] px-4 ">
            <div className="-mt-[160px] sm:relative sm:right-[-2px] lg:static lg:right-0 lg:-mt-[12%] overflow-hidden mb-20 lg:mb-40">
              <Inscribe />
            </div>
            <MyOrders />
          </div>
        </div>
      </div>
      <Footer />
    </Suspense>
  )
}
export default InscribePage

