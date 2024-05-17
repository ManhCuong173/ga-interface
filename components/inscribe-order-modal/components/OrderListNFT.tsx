import { NFT } from '@/types/nft'
import { OrderDetail } from '@/types/orders'
import React from 'react'
import NFTList from './NFTList'

const OrderListNFT: React.FC<{
  orderDetail: OrderDetail
  isLoading: boolean
  onSelectNFT: (nft: NFT) => void
}> = ({ orderDetail, isLoading, onSelectNFT }) => {
  return (
    <div>
      <div className="flex flex-col items-start max-sm:gap-2 mb-5">
        <p className="text-sm font-medium mb-1">
          <span className="font-Roboto text-text-secondary">Order ID:</span> {orderDetail?.id_create}
        </p>
        <div className="flex gap-8">
          <p className="text-sm font-light">
            <span className="font-Roboto text-text-secondary">Quantity:</span> {orderDetail?.mint_list?.length}
          </p>
          <p className="text-sm font-medium text-orange">
            <span className="font-Roboto text-text-secondary mr-1">Status:</span>
            <span className="font-bold"> {orderDetail?.status}</span>
          </p>
        </div>
      </div>
      <NFTList nfts={orderDetail?.mint_list} isLoading={isLoading} onSelectNFT={onSelectNFT} />
    </div>
  )
}

export default OrderListNFT
