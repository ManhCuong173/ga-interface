import { IconCopy } from '@/components/button'
import Pagination from '@/components/pagination'
import TableComponent from '@/components/ui/table/index'
import { nftTypes } from '@/constants/nft.constant'
import { useDebounce } from '@/hooks/custom/useDebouce'
import iconApple from '@/images/activity/img.png'
import { selectBtnToUsdRateData } from '@/lib/features/wallet/fee-slice'
import { useAppSelector } from '@/lib/hook'
import { formatTime } from '@/lib/time'
import { sliceAddress } from '@/lib/utils'
import { activityService } from '@/services/activity.service'
import { Activity } from '@/types/activity'
import { ColumnProps } from '@/types/table'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useState } from 'react'
import Search from './Search'

const ActivityFC = () => {
  const [value, setValue] = useState('')
  const debounceAddress = useDebounce(value, 200)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10


  const handleGetListActivities = async () => {
    const res = await activityService.getActivity({
      page,
      page_size: PAGE_SIZE,
      address: value,
    })
    return res.data
  }

  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities', page, debounceAddress],
    queryFn: handleGetListActivities,
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData
  })
  const btcUSD = useAppSelector(selectBtnToUsdRateData)

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const columns: Array<ColumnProps<Activity>> = [
    {
      key: 'items',
      title: 'items',
      render: (_, item) => {
        return (
          <div className='relative flex w-[220px] items-center space-x-[10px] pl-4 text-base font-medium text-[#4E473F] lg:w-[300px]'>
            <div>
              {item.nft_link ? (
                <Image
                  loader={() => item.nft_link}
                  src={item.nft_link}
                  alt='icon'
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='h-10 w-10 min-w-10'
                />
              ) : (
                <Image src={iconApple} alt='icon' className='h-10 w-10 min-w-10' />
              )}
            </div>
            <p className='flex flex-col'>
              <span className='text-sm font-light text-[#171717]'>
                {nftTypes.find((nft) => nft.id.toString() === item.nft_id)?.label} APPLE
              </span>
              <span className='text-xs font-light text-[#4E473F]'>
                Inscription #{item.inscription_number}
              </span>
            </p>
          </div>
        )
      },
      renderColumn: (item) => {
        return (
          <p className='relative w-[220px] px-4 text-base font-medium text-[#4E473F] lg:w-[300px]'>
            {item.title}
          </p>
        )
      },
    },
    {
      key: 'price',
      title: 'Unit Price',
      render: (_, item) => {
        return (
          <p className='flex w-[180px] flex-col items-start gap-1 text-base font-light lg:w-[220px]'>
            <span className='text-[#171717]'>{item.price_nft}</span>
            <span className='text-[#4E473F]'>
              ${!isNaN(Number(btcUSD)) ? (item.price_nft * Number(btcUSD)).toFixed(4) : '--'}
            </span>
          </p>
        )
      },
      renderColumn: (item) => {
        return (
          <p className='relative w-[180px] text-base font-medium text-[#4E473F] lg:w-[220px]'>
            {item.title}
          </p>
        )
      },
    },
    {
      key: 'from',
      title: 'From',
      render: (_, item) => {
        return (
          <p className='flex w-[160px] items-center space-x-[10px] text-sm font-light text-[#4E473F] lg:w-[200px] lg:text-base'>
            <span>{sliceAddress(item.address_seller)}</span>
            <IconCopy text={item.address_seller} />
          </p>
        )
      },
      renderColumn: (item) => {
        return (
          <p className='relative w-[160px] text-sm font-medium text-[#4E473F] lg:w-[200px] lg:text-base'>
            {item.title}
          </p>
        )
      },
    },
    {
      key: 'to',
      title: 'To',
      render: (_, item) => {
        return (
          <p className='flex w-[160px] items-center space-x-[10px] text-base font-light text-[#4E473F] lg:w-[200px]'>
            <span>{sliceAddress(item.address_buyer)}</span>
            <IconCopy text={item.address_buyer} />
          </p>
        )
      },
      renderColumn: (item) => {
        return (
          <p className='relative w-[160px] text-base font-medium text-[#4E473F] lg:w-[200px]'>
            {item.title}
          </p>
        )
      },
    },
    {
      key: 'Time',
      title: 'Time',
      render: (_, item) => {
        return (
          <p className='w-[160px] pr-4 text-end text-base font-light text-[#4E473F] lg:grow'>
            {formatTime(item.time_exchange)}
          </p>
        )
      },
      renderColumn: (item) => {
        return (
          <p className='relative w-[160px] text-end text-base font-medium text-[#4E473F] lg:grow'>
            {item.title}
          </p>
        )
      },
    },
  ]

  return (
    <div className='mx-auto max-w-[1440px] bg-[#fff] py-8'>
      <div className='flex items-center space-x-10 px-4 pb-8'>
        <Search onChange={handleChangeSearch} value={value} className='h-[42px] w-[260px]' />
        <span
          onClick={() => {
            setValue('')
          }}
          className='cursor-pointer py-3 text-sm font-medium text-[#2D8B6F]'
        >
          Clear
        </span>
      </div>
      {/* table */}
      <div className='w-full overflow-x-auto'>
        <div className='mx-auto w-[900px] md:w-full'>
          <TableComponent columns={columns} data={activities?.data || []} isLoading={isLoading} />
        </div>
      </div>
      {/* pagination */}
      {Number(activities?.totalPages) > 0 && (
        <Pagination itemsPerPage={PAGE_SIZE} pageCount={Number(activities?.totalPages)} setPage={setPage} />
      )}
    </div>
  )
}

export default ActivityFC
