'use client'
import { selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { formatTimeCreate } from '@/lib/time'
import { orderService } from '@/services/order.service'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Pagination from '../pagination'

const heads = [
  {
    title: 'STATUS',
  },
  {
    title: 'ORDER ID',
  },
  {
    title: 'DATE',
  },
]

const color = {
  pending: '#FDB022',
  inscribing: '#12B76A',
  minted: '#2E90FA',
  closed: '#DC6803',
  error: '#EF232C',
}

interface ListOrderProps {
  debounceValue: string
  onSelectOrderId: (orderId: string) => void
  setShowInscribeOrderModal: any
  status: string
}

const ListOrders = ({ debounceValue, onSelectOrderId, setShowInscribeOrderModal, status }: ListOrderProps) => {
  const publicKey = useAppSelector(selectedPublicKey)
  const [page, setPage] = useState(1)

  const getListOrdersInfo = async () => {
    if (!publicKey) return

    const data = await orderService.filterOrderInfo({
      public_key: publicKey,
      // order_id: debounceValue,
      status: status !== 'all' ? status : '',
      page_size: 10,
      page: page,
    })
    return data
  }

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', publicKey, debounceValue, status, page],
    queryFn: getListOrdersInfo,
    placeholderData: keepPreviousData,
    refetchIntervalInBackground: true,
  })

  return (
    <div>
      <div className="flex items-center justify-between gap-4 rounded border border-[#D1BFC94D] py-2 text-sm font-medium sm:px-4">
        <div className="w-[100px] px-4 text-start sm:w-[120px]">STATUS</div>
        <div className="grow ">ORDER ID</div>
        <div className="w-[113px] px-4 text-end sm:w-[180px]">Date</div>
      </div>

      <div className="nft_list h-[300px] overflow-y-auto overflow-x-hidden">
        {isLoading ? (
          <p className="text-center">Loading my orders ...</p>
        ) : (
          <>
            {orders?.data?.data?.length > 0 ? (
              <>
                {orders?.data?.data.map((order: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="mt-4 flex items-center cursor-pointer justify-between gap-8 rounded bg-[#D1C3BF24] px-4 py-3 text-xs font-medium sm:items-center sm:py-2"
                      onClick={() => {
                        onSelectOrderId(order.id_create)
                        setShowInscribeOrderModal(true)
                      }}
                    >
                      <div
                        style={{
                          color: color[order.status as keyof typeof color],
                        }}
                        className="w-[100px] font-light text-[#FDB022] sm:w-[120px]"
                      >
                        {order.status}
                      </div>
                      <div className="grow font-light text-line max-sm:hidden">{order.id_create}</div>
                      <div className="grow font-light text-line sm:hidden">
                        {order.id_create.slice(0, 5)}
                        {'...'}
                        {order.id_create.slice(-5)}
                      </div>
                      {/* <div className='w-[180px] text-line'>Nov 09,2023-01:24:52</div> */}
                      <div className="w-[113px] text-xs font-light text-line sm:w-[180px]">
                        {formatTimeCreate(order.time_create)}
                      </div>
                    </div>
                  )
                })}
              </>
            ) : (
              <p className="mt-4 text-center">no orders</p>
            )}
          </>
        )}
      </div>

      {orders?.data?.data?.length > 0 && (
        <Pagination itemsPerPage={10} pageCount={orders?.data.totalPages} setPage={setPage} />
      )}
    </div>
  )
}

export default ListOrders

