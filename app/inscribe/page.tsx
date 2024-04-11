'use client'
import Footer from '@/components/footer'
import Inscribe from '@/components/inscribe'
import Introduce from '@/components/introduce'
import MyOrders from '@/components/orders'
import { setBtnToUsdRateData } from '@/lib/features/wallet/fee-slice'
import { selectMintProcess } from '@/lib/features/wallet/mintProcess'
import { useAppDispatch } from '@/lib/hook'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MutableRefObject, Suspense, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

export default function InscribePage() {
  const ref: MutableRefObject<any> = useRef()
  const mintProcessStep = useSelector(selectMintProcess)

  const dispatch = useAppDispatch()

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

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [mintProcessStep])

  return (
    <Suspense>
      <div
        ref={ref}
        className='relative bg-[url(/images/marketplace/background-mg.png)] bg-fixed pb-[170px] pt-[72px] max-sm:px-4 sm:pt-[66px] lg:bg-[url(/images/marketplace/background.png)] bg-cover bg-no-repeat'
      >
        <div className='relative z-10'>
          <Introduce />
          <Inscribe />
          <MyOrders />
        </div>
      </div>
      <Footer />
    </Suspense>
  )
}
