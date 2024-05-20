'use client'
import { selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { formatTimeCreate } from '@/lib/time'
import { cn } from '@/lib/utils'
import { Paging } from '@/services/core/BaseRequest'
import orderService from '@/services/order.service'
import { OrderDetail, OrderStatus } from '@/types/orders'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { HTMLAttributes, useState } from 'react'
import Pagination from '../pagination'

const colors = {
  [OrderStatus.Pending]: '#FDB022',
  [OrderStatus.Inscribing]: '#303FB7',
  [OrderStatus.Minted]: '#2E90FA',
  [OrderStatus.Closed]: '#DC6803',
  [OrderStatus.Error]: '#EF232C',
} as const

interface ListOrderProps {
  orderId: string
  onSelectOrderId: (orderId: string) => void
  status: OrderStatus
}

const limitPageSize = 10

const WrapperRow: React.FC<React.PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({ className, ...props }) => {
  return <div className={cn('grid grid-cols-[1fr_3fr_200px] gap-10', className)} {...props} />
}

const ListOrders = ({ orderId, onSelectOrderId, status }: ListOrderProps) => {
  const publicKey = useAppSelector(selectedPublicKey)
  const [page, setPage] = useState(1)

  const getListOrdersInfo = async () => {
    const result = await orderService.getOrders({
      publicKey: publicKey,
      orderId: orderId,
      status: status,
      size: limitPageSize,
      page: page,
    })

    return result.data as Paging<OrderDetail>
  }

  const { data: orders = null, isLoading } = useQuery<Paging<OrderDetail>>({
    queryKey: ['orders', publicKey, orderId, status, page],
    queryFn: getListOrdersInfo,
    placeholderData: keepPreviousData,
    enabled: Boolean(publicKey),
  })

  return (
    <div className="flex flex-col border rounded-xl border-bgAlt">
      <table>
        <thead className="text-[#9F232D] text-xs font-Roboto py-4 px-10">
          <tr>
            <span>Status</span>
            <span>Order ID</span>
            <span className="text-right">Date</span>
          </tr>
        </thead>

        <div className="nft_list h-[300px] overflow-y-auto overflow-x-hidden">
          {isLoading ? (
            <p className="flex flex-1 h-full items-center justify-center text-center">Loading my orders ...</p>
          ) : orders && orders?.items?.length > 0 ? (
            orders.items.map((order: OrderDetail, index: number) => {
              return (
                <div className="px-7 cursor-pointer" onClick={() => onSelectOrderId(order.orderId)}>
                  <WrapperRow key={index} className="border-t-[1px] border-t-bgAlt py-6">
                    <div
                      style={{
                        color: colors[order.status as keyof typeof colors],
                      }}
                      className="font-medium"
                    >
                      {order.status}
                    </div>
                    <div className="grow font-light text-sm leading-none text-line max-sm:hidden">{order.orderId}</div>
                    <div className="grow font-light text-sm leading-none text-line sm:hidden">
                      {order.orderId.slice(0, 5)}
                      {'...'}
                      {order.orderId.slice(-5)}
                    </div>
                    <div className="text-sm  text-black1">{formatTimeCreate(order.createdAt)}</div>
                  </WrapperRow>
                </div>
              )
            })
          ) : (
            <p className="flex flex-1 h-full items-center justify-center text-center">no orders</p>
          )}
        </div>
      </table>

      {orders && orders?.items.length > 0 && (
        <Pagination itemsPerPage={10} pageCount={orders.paging?.total || 0} setPage={setPage} />
      )}
    </div>
  )
}

export default ListOrders
