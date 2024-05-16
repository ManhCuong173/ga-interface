import { appearAnimation } from '@/constants/animation.constant'
import candle from '@/icons/home/candle.svg'
import cornertl from '@/icons/home/corner-tl.svg'
import cornertr from '@/icons/home/corner-tr.svg'
import { convertTimeStampToDate } from '@/lib/crm'
import { crmService } from '@/services/crm.service'
import { CRMChartData } from '@/types/crm'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Transaction from './transaction'
import Volume from './volume'
import { HeadMarkIcon } from '@/components/ui/icons'

export default function CRM() {
  const { data, isLoading } = useQuery({
    queryKey: ['crm-chart-data'],
    queryFn: crmService.getChartData,
  })

  const [dateFormattedData, setDateFormattedData] = useState<CRMChartData[]>([])

  useEffect(() => {
    if (data) {
      setDateFormattedData((_) =>
        data.map((item) => {
          return {
            walletaddress: item.walletaddress,
            feemint: item.feemint,
            timecreate: convertTimeStampToDate(item.timecreate),
          }
        }),
      )
    }
  }, [data])

  return (
    <div id="section-crm" className="snap-center my-24 lg:my-64">
      <div className="w-full flex items-center justify-center px-6">
        <div className="w-full max-w-[1280px]">
          <div className="relative flex  flex-col h-fit max-w-full">
            <div className="flex  items-center justify-evenly w-full  mb-8 lg:mb-14">
              <HeadMarkIcon className="hidden lg:block" />
              <span className="text-2xl lg:text-[40px] font-semibold tracking-[-0.96px] text-red-light lg:text-5xl">
                CRM
              </span>
              <HeadMarkIcon className="hidden lg:block" />
            </div>

            <div className="lg:flex-rowflex-1 flex flex-col gap-8 lg:grid lg:grid-cols-2">
              {isLoading ? (
                <div className="col-span-full text-center">is loading...</div>
              ) : data ? (
                <>
                  <Volume data={dateFormattedData} />
                  <Transaction data={dateFormattedData} />
                </>
              ) : (
                <div className="col-span-full text-center">no data</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
