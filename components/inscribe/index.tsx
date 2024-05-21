'use client'

import InscribeContextProvider from '@/context/InscribeContext'
import { useState } from 'react'
import InscribeOrderModal from '../inscribe-order-modal'
import MintForm from '../mintNFTs/MintForm'
import NFTForm from './NftForm'

const Inscribe = () => {
  const [showInscribeOrderModal, setShowInscribeOrderModal] = useState(false)
  const [orderId, setOrderId] = useState<string>('')

  return (
    <InscribeContextProvider>
      <div className="relative rounded-lg bg-white w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_450px]">
          <div className="px-4 py-6 xl:p-[40px] border-r-2 border-solid border-bgAlt">
            <p className="text_heading mb-4">Your NFT</p>
            <NFTForm />
          </div>
          <div className="px-4 py-6 xl:p-[40px] flex flex-col">
            <MintForm
              onShowInscribeOrderModal={() => {
                setShowInscribeOrderModal(true)
              }}
              onUpdateOrderId={setOrderId}
            />
          </div>
        </div>

        {showInscribeOrderModal && orderId && (
          <InscribeOrderModal
            isOpen={showInscribeOrderModal}
            orderId={orderId}
            onClose={() => setShowInscribeOrderModal(false)}
          />
        )}
      </div>
    </InscribeContextProvider>
  )
}
export default Inscribe

