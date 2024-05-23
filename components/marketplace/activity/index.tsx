import Pagination from '@/components/pagination'
import FilterMarketPlace from '@/components/marketplace/Filter'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { selectAddress } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import activityService from '@/services/activity.service'
import { Paging } from '@/services/core/BaseRequest'
import { Activity } from '@/types/activity'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import ActivityRow from './ActivityRow'

const PAGE_SIZE = 10

const ActivityPage = () => {
  const [page, setPage] = useState(1)
  const [nftIds, setNftIds] = useState<number[]>([-1, 1, 2, 3, 4, 5])
  const address = useAppSelector(selectAddress)

  const [filter, setFilter] = useState({
    number: '',
    order_by: 'asc',
  })

  const { data: activities, isFetching } = useQuery<Paging<Activity> | null>({
    queryKey: ['activities', page, address],
    queryFn: async () => {
      const res = await activityService.getActivities({
        page,
        size: PAGE_SIZE,
        address,
      })
      if (res.data) return res.data
      return null
    },
    enabled: Boolean(address),
    placeholderData: keepPreviousData,
  })

  const isAvaliableData = activities && activities?.items?.length

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col overflow-hidden">
        <FilterMarketPlace nftIds={nftIds} setNftIds={setNftIds} filter={filter} setFilter={setFilter} />

        <Table classNameWrapper="my-10">
          <TableHeader>
            <TableRow className="border-t-0">
              <TableHead className="w-[15%] min-w-[200px]">Item</TableHead>
              <TableHead className="w-[15%] min-w-[130px]">Element</TableHead>
              <TableHead className="w-[20%] min-w-[200px]">Unit Price</TableHead>
              <TableHead className="w-[15%] min-w-[200px]">From</TableHead>
              <TableHead className="w-[15%] min-w-[200px]">To</TableHead>
              <TableHead className="w-[20%] min-w-[200px]">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isAvaliableData &&
              activities.items.map((activity: Activity) => {
                return <ActivityRow activity={activity} />
              })}
          </TableBody>
        </Table>
        {isFetching ? (
          <p className="flex flex-1 h-full items-center justify-center text-center py-20">Loading my orders ...</p>
        ) : (
          !isAvaliableData && (
            <p className="flex flex-1 h-full items-center justify-center text-center py-20">no orders</p>
          )
        )}

        {/* pagination */}
        {Number(activities?.paging?.total) > 0 && (
          <Pagination itemsPerPage={PAGE_SIZE} pageCount={Number(activities?.paging?.total)} setPage={setPage} />
        )}
      </div>
    </div>
  )
}

export default ActivityPage
