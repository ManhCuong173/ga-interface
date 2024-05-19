import Pagination from '@/components/pagination'
import TableComponent from '@/components/ui/table'
import avt from '@/images/analytics/avatar.png'
import bgChart from '@/images/analytics/bgChart.png'
import decor from '@/images/marketplace/analytics/decor.png'
import { sliceAddress } from '@/lib/utils'
import { AnalyticsService } from '@/services/analytics.service'
import { Owner } from '@/types/owner'
import { ColumnProps } from '@/types/table'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'

const columns: Array<ColumnProps<Owner>> = [
  {
    key: 'id',
    title: '#',
    render: (_, record) => {
      return (
        <p className='relative flex w-[60px] items-center justify-center text-left'>{record.id}</p>
      )
    },
    renderColumn: (_) => {
      return (
        <p className='relative flex w-[60px] items-center justify-center text-left'>{_.title}</p>
      )
    },
  },
  {
    key: 'name',
    title: 'name',
    render: (_, record) => {
      return (
        <div className='relative flex w-[117px] items-center space-x-[10px] px-4 py-2 text-left text-[#4E473F] md:w-[300px]'>
          {record.avatar ? (
            <Image
              src={record.avatar}
              loader={() => record.avatar}
              alt='avatar'
              width={40}
              height={40}
              className='max-h-10 min-w-10 max-w-10 rounded object-cover'
            />
          ) : (
            <>
              <Image
                src={avt}
                alt='avatar'
                width={40}
                height={40}
                className='min-size-10 max-size-10 rounded'
              />
            </>
          )}
          <span className='ml-[10px] max-w-full truncate text-sm font-light text-[#171717] '>
            {record.name || 'Unknown name'}
          </span>
        </div>
      )
    },
    renderColumn: (_) => {
      return (
        <p className='relative w-[117px] px-4 py-2 font-medium text-[#4E473F] md:w-[300px]'>
          {_.title}
        </p>
      )
    },
  },
  {
    key: 'wallet',
    title: 'wallet',
    render: (_, record) => {
      return (
        <p className='relative w-[185px] text-end font-light text-[#4E473F] md:w-[220px]'>
          {sliceAddress(record.WalletAddress)}
        </p>
      )
    },
    renderColumn: (_) => {
      return (
        <p className='relative w-[185px] text-end font-medium text-[#4E473F] md:w-[220px]'>
          {_.title}
        </p>
      )
    },
  },
  {
    key: 'owned',
    title: 'owned',
    render: (_, record) => {
      return (
        <p className='relative grow text-end font-light text-[#4E473F]'>
          {record.Count.toLocaleString()}
        </p>
      )
    },
    renderColumn: (_) => {
      return <p className='relative grow text-end font-medium text-[#4E473F]'>{_.title}</p>
    },
  },
]

interface Props {
  idnft: string
}

const TopOwners = ({ idnft }: Props) => {
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  const handleGetTopOwners = async () => {
    const res = await AnalyticsService.getTopOwners({
      idnft: idnft,
      page: page.toString(),
      page_size: PAGE_SIZE.toString(),
    })

    return {
      ...res.data,
      data: res.data.data?.map((item, index) => {
        return { ...item, id: index + 1 }
      }),
    }
  }

  const { data: owners, isLoading } = useQuery({
    queryKey: ['top-owners', idnft],
    queryFn: handleGetTopOwners,
  })

  return (
    <div className='relative rounded-lg bg-[#fff] py-4 lg:h-[1200px] lg:py-12 shadow-[0px_4px_15px_0px_rgba(0,0,0,0.06)]'>
      {/* <Image src={bgChart} alt='bgChart' fill priority /> */}

      <div className='relative mx-auto w-full space-y-8 lg:w-[920px]'>
        <div className='flex flex-col gap-4'>
          <Image src={decor} alt='' className='mx-auto h-[28.85px] w-full lg:w-[360.21px]' />
          <h2 className='text-center text-[32px] font-medium uppercase leading-8 text-[#0D0C22]'>
            top 100 Owners
          </h2>
        </div>
        <div className='w-full overflow-x-auto'>
          <div className='mx-auto w-[584px] md:w-full'>
            <TableComponent columns={columns} data={owners?.data || []} isLoading={isLoading} />
          </div>
        </div>

        {Number(owners?.totalPages) > 0 && (
          <Pagination pageCount={page} setPage={setPage} itemsPerPage={PAGE_SIZE} />
        )}
      </div>
    </div>
  )
}

export default TopOwners
