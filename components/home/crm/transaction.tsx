'use client'

import LineChart from '@/components/chart/line-chart'
import Trans from '@/components/i18n/Trans'
import { flyToAnimation } from '@/constants/animation.constant'
import {
  filterTransactionChartDataAuto,
  filterTransactionChartDataByMonth,
  filterTransactionChartDataByWeek,
  filterTransactionChartDataByYear,
} from '@/lib/crm'
import { AllChartData, ChartData } from '@/types/chart'
import { CRMChartData } from '@/types/crm'
import { motion } from 'framer-motion'
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
    label: 'ALL',
  },
]

type Props = {
  data: CRMChartData[]
}

export default function Transaction({ data }: Props) {
  const [activeTab, setActiveTab] = useState('week')
  const [activeYearIndex, setActiveYearIndex] = useState(0)
  const [years, setYears] = useState<number[]>([])

  const [chartData, setChartData] = useState<ChartData<number>>({ labels: [], dataset: [] })
  const [allChartData, setAllChartData] = useState<AllChartData<number>[]>([])

  useEffect(() => {
    if (data.length)
      switch (activeTab) {
        case 'week': {
          setChartData(filterTransactionChartDataByWeek(data))
          break
        }
        case 'month': {
          setChartData(filterTransactionChartDataByMonth(data))
          break
        }
        case 'year': {
          setChartData(filterTransactionChartDataByYear(data))
          break
        }
        case 'all': {
          const response = filterTransactionChartDataAuto(data)

          const _years: number[] = []
          const _allChartDatas: AllChartData<number>[] = []
          response.labels.forEach((label) => {
            const year = Number(label.split(', ')[1])
            !_years.includes(year) && _years.push(year)
          })

          _years.forEach((year) => {
            const _labels: string[] = []
            const _datasets: number[] = []
            response.labels.forEach((label, index) => {
              const splittedLabel = label.split(', ')
              const _year = Number(splittedLabel[1])

              if (_year === year) {
                _labels.push(splittedLabel[0])
                _datasets.push(response.dataset[index])
              }
            })

            _allChartDatas.push({
              year: year,
              data: {
                labels: _labels,
                dataset: _datasets,
              },
            })
          })

          setYears(_years)
          setActiveYearIndex(_years.length - 1)
          setAllChartData(_allChartDatas)
          break
        }
      }
  }, [data, activeTab])

  const chartProps = data
    ? activeTab !== 'all'
      ? { ...chartData }
      : allChartData[activeYearIndex]
        ? { ...allChartData[activeYearIndex].data }
        : { labels: [], dataset: [] }
    : { labels: [], dataset: [] }

  const chartStyle = {
    width: `${chartProps.labels.length * 40.79 + 100}px`,
    minWidth: '100%',
  }

  return (
    <motion.div
      {...flyToAnimation}
      transition={{ duration: 0.4, delay: 1.4 }}
      className="relative flex h-full flex-col items-center justify-center gap-6 rounded-lg bg-white p-4 pb-12 lg:gap-8 lg:px-8 lg:pb-16 lg:pt-12"
      style={{
        boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="racking-[-0.42px] flex w-full flex-col items-start justify-between gap-2 lg:h-[52px] lg:flex-row">
        <span className="text-base font-medium tracking-[-0.48px] text-black1 lg:text-2xl">
          <Trans>Transaction</Trans>
        </span>
        <div className="grid w-full cursor-pointer grid-cols-4 bg-[#FDE8C4] bg-opacity-40 p-1 text-sm text-text-secondary lg:flex lg:w-[unset]">
          {tabs.map((item, index) => (
            <div
              key={item.value}
              className={`${item.value === activeTab ? 'bg-red-light text-white2' : 'bg-transparent'} flex h-10 cursor-pointer items-center rounded px-6 transition-all lg:h-11`}
              onClick={() => {
                setActiveTab(item.value)
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-full overflow-x-auto">
        <LineChart
          key={activeTab + JSON.stringify(chartData) + JSON.stringify(allChartData)}
          style={chartStyle}
          className="h-[208.5px]"
          {...chartProps}
        />
      </div>
      {activeTab === 'all' && (
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 text-xl font-semibold lg:bottom-5">
          <button
            className={`${activeYearIndex <= 0 ? 'hidden' : ''} text-text-secondary`}
            onClick={() => activeYearIndex > 0 && setActiveYearIndex((prev) => prev - 1)}
          >
            {'<'}
          </button>
          <span className="text-black1">{years[activeYearIndex]}</span>
          <button
            className={`${activeYearIndex >= years.length - 1 ? 'hidden' : ''} text-text-secondary`}
            onClick={() => activeYearIndex < years.length - 1 && setActiveYearIndex((prev) => prev + 1)}
          >
            {'>'}
          </button>
        </div>
      )}
    </motion.div>
  )
}

