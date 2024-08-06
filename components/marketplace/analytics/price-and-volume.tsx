import MixedChart from '@/components/chart/mixed-chart'
import Trans from '@/components/i18n/Trans'
import decor from '@/images/marketplace/analytics/decor.png'
import { groupTransactionsByDate } from '@/lib/chart'
import {
  filterPriceByMonth,
  filterPriceByWeek,
  filterPriceDataByYear,
  filterVolumeChartDataByWeek,
  filterVolumnChartDataByMonth,
  filterVolumnChartDataByYear,
} from '@/lib/crm'
import { chartService } from '@/services/chart.service'
import { CRMChartData } from '@/types/crm'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const tabs = [
  {
    value: 'week',
    label: '7D',
  },
  {
    value: 'month',
    label: '1M',
  },
  {
    value: 'year',
    label: '1Y',
  },
  {
    value: 'all',
    label: 'All',
  },
]

type Props = {
  backgroundColor: string
  idnft: number
}

type ChartData = {
  labels: string[]
  barChartDataset: number[]
  lineChartDataset: number[]
}

export default function PriceAndVolume({ ...props }: Props) {
  const [activeTab, setActiveTab] = useState('all')

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    barChartDataset: [],
    lineChartDataset: [],
  })

  const { data } = useQuery({
    queryKey: ['chart-data', props.idnft],
    queryFn: () => chartService.getPriceVolume(props.idnft),
  })

  const chartStyle = {
    width: `${chartData.labels.length * 60 + 250}px`,
  }

  useEffect(() => {
    if (data) {
      const convertedData: CRMChartData[] = data.reverse().map((item) => {
        return {
          feemint: item.price_nft,
          timecreate: item.time_exchange * 1000,
          walletaddress: item.address_buyer,
        }
      })

      let labels
      let barChartData
      let lineChartData

      switch (activeTab) {
        case 'week': {
          labels = filterVolumeChartDataByWeek(convertedData).labels
          barChartData = filterVolumeChartDataByWeek(convertedData).dataset
          lineChartData = filterPriceByWeek(convertedData).dataset

          break
        }
        case 'month': {
          labels = filterVolumnChartDataByMonth(convertedData).labels
          barChartData = filterVolumnChartDataByMonth(convertedData).dataset
          lineChartData = filterPriceByMonth(convertedData).dataset

          break
        }
        case 'year': {
          labels = filterVolumnChartDataByYear(convertedData).labels
          barChartData = filterVolumnChartDataByYear(convertedData).dataset
          lineChartData = filterPriceDataByYear(convertedData).dataset
          break
        }
        case 'all': {
          const res = groupTransactionsByDate(data)

          const dates: string[] = []
          const averagePrices: number[] = []
          const sumPrices: number[] = []

          for (const summary of res) {
            dates.push(summary.date)
            averagePrices.push(summary.average_price)
            sumPrices.push(summary.sum_price)
          }

          labels = dates
          barChartData = sumPrices
          lineChartData = averagePrices
        }
      }

      setChartData({
        labels: labels!,
        barChartDataset: barChartData!,
        lineChartDataset: lineChartData!,
      })
    }
  }, [data, activeTab])

  return (
    <div className="flex h-fit w-full flex-col gap-6 rounded-lg bg-white p-4 lg:gap-8 lg:p-[60px]">
      <div className="flex flex-col gap-2.5 lg:gap-4">
        <Image src={decor} alt="" className="mx-auto h-[28.85px] w-[283.92px] object-cover lg:w-[360.21px]" />
        <h2 className="text-center text-2xl font-semibold leading-8 text-[#0D0C22] lg:font-medium">
          <Trans>Price and volume</Trans>
        </h2>
      </div>
      <div className="grid w-full cursor-pointer grid-cols-4 bg-[#FDE8C4] bg-opacity-40 p-1 text-sm text-text-secondary lg:ml-auto lg:flex lg:w-[unset] lg:w-fit">
        {tabs.map((item, index) => (
          <div
            key={item.value}
            className={`${item.value === activeTab ? 'bg-red-light text-white2' : 'bg-transparent'} flex h-10 cursor-pointer items-center justify-center rounded px-6 transition-all lg:h-11`}
            onClick={() => {
              setActiveTab(item.value)
            }}
          >
            <Trans>{item.label}</Trans>
          </div>
        ))}
      </div>
      {/* Desktop chart */}
      <div className="hidden lg:block">
        <MixedChart
          key={props.backgroundColor + chartData.labels + activeTab}
          backgroundColor={props.backgroundColor}
          barChartDataset={chartData.barChartDataset}
          maxBarThickness={100}
          className="h-[250px]"
          labels={chartData.labels}
          lineChartDataset={chartData.lineChartDataset}
        />
      </div>

      {/* Mobile chart */}
      <div className="max-w-full overflow-x-auto lg:hidden">
        <MixedChart
          key={props.backgroundColor + chartData.labels + activeTab}
          barChartDataset={chartData.barChartDataset}
          backgroundColor={props.backgroundColor}
          maxBarThickness={40}
          className="h-[220px]"
          labels={chartData.labels}
          lineChartDataset={chartData.lineChartDataset}
          style={chartStyle as any}
        />
      </div>
    </div>
  )
}

