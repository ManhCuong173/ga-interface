import { useDebounce } from '@/hooks/custom/useDebouce'
import React, { useState } from 'react'
import InputField from '../InputField'
import InscribeOrderModal from '../inscribe-order-modal'
import { MintModalLayout } from '../mintNFTs/MintModalLayout'
import ListOrders from './list'
import SelectStatus from './status'

const MyOrders = () => {
  const [orderId, setOrderId] = useState('')
  const debounceValue = useDebounce(orderId, 500)
  const [statusValue, setStatusValue] = useState('all')
  const [showInscribeOrderModal, setShowInscribeOrderModal] = useState(false)

  const handleSearchOrderID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value)
  }

  return (
    <>
      <MintModalLayout className="relative mx-auto mt-8 flex w-full flex-col gap-6 font-ProtoMono font-medium sm:mt-10 lg:w-[800px]">
        <main className="relative z-10 flex flex-col gap-12">
          <p className="text_heading text-center capitalize text-[#4E473F]">my orders</p>

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
            onSelectOrderId={setOrderId}
            setShowInscribeOrderModal={setShowInscribeOrderModal}
          />
        </main>
      </MintModalLayout>

      {showInscribeOrderModal && orderId && (
        <InscribeOrderModal
          isOpen={showInscribeOrderModal}
          orderId={orderId}
          onClose={() => setShowInscribeOrderModal(false)}
        />
      )}
    </>
  )
}

export default MyOrders
