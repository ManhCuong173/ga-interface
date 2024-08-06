'use client'
import { selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { formatTimeCreate } from '@/lib/time'
import { Paging } from '@/services/core/BaseRequest'
import orderService from '@/services/order.service'
import { OrderDetail, OrderStatus } from '@/types/orders'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Trans from '../i18n/Trans'
import Pagination from '../pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

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

  const { data: orders = null, isFetching } = useQuery<Paging<OrderDetail>>({
    queryKey: ['orders', publicKey, orderId, status, page],
    queryFn: getListOrdersInfo,
    placeholderData: keepPreviousData,
    enabled: Boolean(publicKey),
  })

  const isAvaliableData = orders && orders?.items?.length

  return (
    <div className="flex flex-col overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">
              <Trans>Status</Trans>
            </TableHead>
            <TableHead className="w-[50%]">
              <Trans>Order ID</Trans>
            </TableHead>
            <TableHead className="w-[20%]">
              <Trans>Date</Trans>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isAvaliableData &&
            orders.items.map((order: OrderDetail) => {
              return (
                <TableRow key={`row-orders-info-${order.orderId}`} onClick={() => onSelectOrderId(order.orderId)}>
                  <TableCell
                    className="font-medium"
                    style={{
                      color: colors[order.status as keyof typeof colors],
                    }}
                  >
                    {order.status}
                  </TableCell>
                  <TableCell className="text-sm leading-none text-line whitespace-nowrap">
                    <span>{order.orderId}</span>
                  </TableCell>
                  <TableCell className="text-sm  text-black1  whitespace-nowrap">
                    {formatTimeCreate(order.createdAt)}
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
      {isFetching ? (
        <p className="flex flex-1 h-full items-center justify-center text-center py-20">
          <Trans>Loading my orders</Trans> ...
        </p>
      ) : (
        !isAvaliableData && (
          <p className="flex flex-1 h-full items-center justify-center text-center py-20">
            <Trans>no orders</Trans>
          </p>
        )
      )}

      {orders && orders?.items.length > 0 && (
        <Pagination
          className="px-0"
          itemsPerPage={limitPageSize}
          pageCount={orders.paging?.total || 0}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          setPage={setPage}
        />
      )}
    </div>
  )
}

export default ListOrders

