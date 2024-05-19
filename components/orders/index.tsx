import { useDebounce } from '@/hooks/custom/useDebouce'
import React, { useState } from 'react'
import InputField from '../InputField'
import InscribeOrderModal from '../inscribe-order-modal'
import { MintModalLayout } from '../mintNFTs/MintModalLayout'
import { HeadMarkIcon } from '../ui/icons'
import ListOrders from './list'
import SelectStatus from './status'

const MyOrders = () => {
  const [orderID, setOrderID] = useState('')
  const debounceValue = useDebounce(orderID, 500)
  const [statusValue, setStatusValue] = useState('all')

  const handleSearchOrderID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderID(e.target.value)
  }

  const [order, setOrder] = useState('')
  const [showInscribeOrderModal, setShowInscribeOrderModal] = useState(false)

  return (
    <>
      <MintModalLayout className="relative mx-auto mt-8 flex w-full flex-col gap-6 font-ProtoMono font-medium sm:mt-10 lg:w-full lg:max-w-[1280px]">
        <main className="relative z-10 flex flex-col gap-12">
          <div className="flex items-cente gap-[40px] px-[157px]">
            <HeadMarkIcon />
            <p className="text_heading text-center capitalize text-[#4E473F] text-nowrap">my orders</p>
            <HeadMarkIcon />
          </div>

          <div className="flex items-center space-x-2">
            <InputField
              onChange={handleSearchOrderID}
              className="grow border border-stroke lg:h-[44px]"
              placeholder="Search by order ID"
            />
            <SelectStatus statusValue={statusValue} setStatusValue={setStatusValue} />
          </div>
          <ListOrders
            debounceValue={debounceValue}
            status={statusValue}
            setOrder={setOrder}
            setShowInscribeOrderModal={setShowInscribeOrderModal}
          />
        </main>
      </MintModalLayout>
      <InscribeOrderModal
        open={showInscribeOrderModal}
        setOpen={setShowInscribeOrderModal}
        order={order}
        // orderId={order}
        setOrderID={setOrderID}
      />
    </>
  )
}

export default MyOrders

