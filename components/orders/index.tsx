import { useDebounce } from '@/hooks/custom/useDebouce'
import { OrderStatus } from '@/types/orders'
import React, { useState } from 'react'
import InputInfoHelp from '../ReceiveAddress/InputInfoHelp'
import InscribeOrderModal from '../inscribe-order-modal'
import { HeadMarkIcon } from '../ui/icons'
import ListOrders from './list'
import SelectStatusOrder from './status'

const MyOrders = () => {
  const [searchOrderId, setOrderId] = useState('')
  const [selectedOrderId, setSelectedOrderId] = useState('')
  const debounceSearchOrderId = useDebounce(searchOrderId, 1500)

  const [selectedOrderStatus, onSelectOrderStatus] = useState<OrderStatus>(OrderStatus.All)

  const handleSearchOrderID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value)
  }

  return (
    <>
      <div className="relative w-full">
        <div className="flex  items-center justify-evenly w-full">
          <HeadMarkIcon className="hidden lg:block" />
          <p className="text-center text-2xl md:text-[32px] text-red-light font-bold">MY ORDERS</p>

          <HeadMarkIcon className="hidden lg:block" />
        </div>

        <div className="flex items-center justify-between w-full space-x-2 my-10 lg:my-20">
          <InputInfoHelp
            hideEndIcon
            className="w-full md:max-w-[400px]"
            classNameInput="placeholder:text-base font-bold"
            placeholder="SEARCH NUMBER"
            onChange={handleSearchOrderID}
          />

          <SelectStatusOrder
            className="max-w-[130px] md:max-w-[200px]"
            selectedOrderStatus={selectedOrderStatus}
            onSelectOrderStatus={onSelectOrderStatus}
          />
        </div>

        <ListOrders orderId={debounceSearchOrderId} status={selectedOrderStatus} onSelectOrderId={setSelectedOrderId} />
      </div>

      {selectedOrderId && (
        <InscribeOrderModal
          isOpen={Boolean(selectedOrderId)}
          orderId={selectedOrderId}
          onClose={() => {
            setSelectedOrderId('')
          }}
        />
      )}
    </>
  )
}

export default MyOrders

