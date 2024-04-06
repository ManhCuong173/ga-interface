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
    <div id='section-crm' className='snap-center'>
      <div className='mx-auto flex aspect-[414/984] w-[1440px] max-w-full items-center justify-center px-4 pb-[59px] pt-8 lg:aspect-[1440/750] lg:p-[60px_40px_60px_96px] lg:pl-24 lg:pr-10'>
        <div className='max-w-full border-[1.852px] border-[#FACE5D] bg-white/10 p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] lg:p-8 lg:backdrop-blur-[5px]'>
          <div
            className='relative flex h-fit max-w-full flex-col gap-6 bg-cover p-4 lg:gap-8 lg:p-8'
            style={{
              background: 'linear-gradient(180deg, #FFF4DD 0%, rgba(255, 244, 221, 0.45) 100%)',
            }}
          >
            <motion.div
              {...appearAnimation}
              transition={{ duration: 0.4, delay: 1 }}
              className='flex items-center justify-center gap-2'
            >
              <span className='flex h-6 w-6 items-center justify-center lg:h-12 lg:w-12'>
                <Image
                  src={candle}
                  alt=''
                  className='h-[22.222px] w-[11.04px] flex-shrink-0 lg:h-[44.444px] lg:w-[20.081px]'
                />
              </span>
              <span className='text-5xl text-[32px] font-medium leading-[68px] tracking-[-0.96px] text-black1 lg:text-5xl lg:leading-[unset]'>
                CRM
              </span>
            </motion.div>
            <div className='lg:flex-rowflex-1 flex flex-col gap-4 lg:grid lg:grid-cols-2'>
              {isLoading ? (
                <div className='col-span-full text-center'>is loading...</div>
              ) : data ? (
                <>
                  <Volume data={dateFormattedData} />
                  <Transaction data={dateFormattedData} />
                </>
              ) : (
                <div className='col-span-full text-center'>no data</div>
              )}
            </div>
            <Image
              src={cornertl}
              alt=''
              className='absolute left-[18.25px] top-4 h-[36.2222px] w-[81.5px] lg:left-8 lg:top-8 lg:h-[64px] lg:w-[144px]'
            />
            <Image
              src={cornertr}
              alt=''
              className='absolute right-[20.5px] top-4 h-[36.2222px] w-[81.5px] lg:right-8 lg:top-8 lg:h-[64px] lg:w-[144px]'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
