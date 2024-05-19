'use client'

import InscribeContextProvider from '@/context/InscribeContext'
import { useState } from 'react'
import InscribeOrderModal from '../inscribe-order-modal'
import MintForm from '../mintNFTs/MintForm'
import NFTForm from './NftForm'

const Inscribe = () => {
  const [showInscribeOrderModal, setShowInscribeOrderModal] = useState(false)
  const [order, setOrder] = useState<any>()

  return (
    <InscribeContextProvider>
      <div className="relative rounded-xl bg-white mx-auto lg:max-w-[1380px] w-full">
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
              onUpdateOrder={setOrder}
            />
          </div>
        </div>

        <InscribeOrderModal open={showInscribeOrderModal} order={order} setOpen={setShowInscribeOrderModal} />
      </div>
    </InscribeContextProvider>
  )
}
export default Inscribe
