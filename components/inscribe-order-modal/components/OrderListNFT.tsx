import Trans from '@/components/i18n/Trans'
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
          <span className="font-Roboto text-text-secondary">
            <Trans>Order ID</Trans>:
          </span>{' '}
          {orderDetail?.orderId}
        </p>
        <div className="flex gap-8">
          <p className="text-sm font-light">
            <span className="font-Roboto text-text-secondary">
              <Trans>Quantity</Trans>:
            </span>{' '}
            {orderDetail?.nfts?.length}
          </p>
          <p className="text-sm font-medium text-orange">
            <span className="font-Roboto text-text-secondary mr-1">
              <Trans>Status:</Trans>
            </span>
            <span className="font-bold">
              <Trans>{orderDetail?.status}</Trans>
            </span>
          </p>
        </div>
      </div>
      <NFTList nfts={orderDetail?.nfts} isLoading={isLoading} onSelectNFT={onSelectNFT} />
    </div>
  )
}

export default OrderListNFT

